import { NextResponse } from 'next/server';
import { generateDailyMission } from '../../../../services/intelligence';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { userId } = body;
    if (!userId) return NextResponse.json({ error: 'userId required' }, { status: 400 });

    const mission = await generateDailyMission(userId);
    return NextResponse.json({ mission });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || String(err) }, { status: 500 });
  }
}
