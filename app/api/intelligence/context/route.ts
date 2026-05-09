import { NextResponse } from 'next/server';
import { storeAIContext } from '../../../../services/intelligence';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { userId, courseId, context, tags } = body;
    if (!userId) return NextResponse.json({ error: 'userId required' }, { status: 400 });

    const record = await storeAIContext(userId, courseId, context, tags ?? []);
    return NextResponse.json({ record });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || String(err) }, { status: 500 });
  }
}
