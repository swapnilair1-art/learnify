import { NextResponse } from 'next/server';
import { callOpenAI } from '../../../../lib/openai';
import prisma from '../../../../lib/prisma';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { userId, messages } = body;
    if (!userId || !messages) return NextResponse.json({ error: 'userId and messages required' }, { status: 400 });

    // Fetch latest AI context for the user and include as system message if available
    const ctx = await prisma.aIContext.findFirst({ where: { userId }, orderBy: { updatedAt: 'desc' } });
    const systemMsg = ctx?.context ? { role: 'system', content: `User context: ${JSON.stringify(ctx.context)}` } : null;

    const allMessages = [] as Array<{ role: string; content: string }>;
    if (systemMsg) allMessages.push(systemMsg);
    allMessages.push(...messages);

    const response = await callOpenAI(allMessages, { max_tokens: 800, temperature: 0.15 });
    return NextResponse.json({ result: response });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || String(err) }, { status: 500 });
  }
}
