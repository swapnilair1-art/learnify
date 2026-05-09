import prisma from '../lib/prisma';
import { callOpenAI } from '../lib/openai';

export async function generateDailyMission(userId: string) {
  // Gather minimal context for Phase 2 scaffold
  const profile = await prisma.userProfile.findUnique({ where: { id: userId } });
  const recentCourses = await prisma.course.findMany({ take: 3 });

  const prompt = `You are Learnify's intelligence engine. Create a single focused daily mission for the learner. User profile: ${profile?.name || 'Unknown'}. Suggest a concise title and a short description, plus a priority score 0-10. Consider the user's recent courses: ${recentCourses.map((c: any) => c.title).join(', ')}.`;

  const response = await callOpenAI([{ role: 'system', content: 'You are an intelligent educational assistant that creates focused, calm, and actionable daily missions for learners.' }, { role: 'user', content: prompt }]);

  const text = response?.choices?.[0]?.message?.content ?? 'Continue learning — review previous lesson.';
  const [titleLine, ...rest] = text.split('\n');
  const title = titleLine?.slice(0, 200) || 'Daily mission';
  const description = rest.join('\n').slice(0, 2000) || text;

  const mission = await prisma.dailyMission.create({
    data: {
      userId,
      title,
      description,
      priority: 5
    }
  });

  return mission;
}

export async function storeAIContext(userId: string, courseId?: string, context?: any, tags: string[] = []) {
  const record = await prisma.aIContext.create({
    data: {
      userId,
      courseId,
      context: context ?? {},
      tags
    }
  });
  return record;
}

export async function detectWeaknesses(userId: string) {
  // Very basic heuristic-based weakness detection scaffold
  // In production this would analyze quiz results, response times, and AI signals.
  const weaknesses = await prisma.weakness.findMany({ where: { userId }, take: 5 });
  if (weaknesses.length > 0) return weaknesses;

  // Fallback: ask AI to propose potential weak areas based on courses
  const courses = await prisma.course.findMany({ take: 5 });
  const prompt = `List up to 3 likely weak topics for a learner who studied these courses: ${courses.map((c: any) => c.title).join(', ')}. Return as plain lines with 'topic - score' (0-1).`;
  const response = await callOpenAI([{ role: 'system', content: 'You are a diagnostic assistant that suggests likely weak topics for a learner.' }, { role: 'user', content: prompt }]);
  const text = response?.choices?.[0]?.message?.content ?? '';

  const lines = text.split('\n').map((l: string) => l.trim()).filter(Boolean).slice(0, 3);
  const created: any[] = [];
  for (const line of lines) {
    const parts = line.split('-').map((p: string) => p.trim());
    const topic = parts[0];
    const score = parseFloat(parts[1]) || 0.5;
    const w = await prisma.weakness.create({ data: { userId, topic, score } });
    created.push(w);
  }

  return created;
}
