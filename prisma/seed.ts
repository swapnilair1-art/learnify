import prisma from '../lib/prisma';

async function main() {
  if (!process.env.DATABASE_URL) {
    console.warn('DATABASE_URL not set — skipping seed. To run seed, set DATABASE_URL or start local Postgres via `docker-compose up -d` and update .env.local');
    return;
  }

  const courses = [
    {
      slug: 'numpy-mastery',
      title: 'NumPy Mastery',
      description: 'Master arrays, indexing, broadcasting and advanced NumPy techniques.'
    },
    {
      slug: 'matplotlib-mastery',
      title: 'Matplotlib Mastery',
      description: 'Design elegant visualizations, subplots, and storytelling with Matplotlib.'
    },
    {
      slug: 'pandas-mastery',
      title: 'Pandas Mastery',
      description: 'Learn DataFrames, cleaning, grouping, merging and real-world analytics.'
    }
  ];

  for (const c of courses) {
    const up = await prisma.course.upsert({
      where: { slug: c.slug },
      update: {},
      create: {
        slug: c.slug,
        title: c.title,
        description: c.description,
        days: {
          create: Array.from({ length: 5 }).map((_, i) => ({
            day: i + 1,
            title: `Day ${i + 1}`,
            content: `## ${c.title} — Day ${i + 1}\\nContent goes here.`,
            locked: i !== 0,
            order: i + 1
          }))
        }
      }
    });
    console.log('Upserted course', up.slug);
  }

  // demo user profile
  const demo = await prisma.userProfile.upsert({
    where: { email: 'demo@learnify.test' },
    update: {},
    create: {
      name: 'Demo Learner',
      email: 'demo@learnify.test',
      role: 'STUDENT'
    }
  });

  console.log({ demoId: demo.id });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
