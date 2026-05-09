import prisma from '../../../lib/prisma';
import Card from '../../../components/ui/Card';
import sampleCourses from '../../../data/sample-courses.json';

type Props = { params: { slug: string } };

export default async function CoursePage({ params }: Props) {
  let course: any = null;
  try {
    course = await prisma.course.findUnique({ where: { slug: params.slug }, include: { days: { orderBy: { order: 'asc' } } } });
  } catch (err) {
    // DB unavailable — fallback to sample data
    const arr = sampleCourses as any[];
    course = arr.find((c) => c.slug === params.slug) ?? null;
  }

  if (!course) return <div className="max-w-4xl mx-auto">Course not found</div>;

  return (
    <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6">
      <div className="md:col-span-2">
        <Card>
          <h2 className="text-2xl font-semibold">{course.title}</h2>
          <p className="text-slate-600 mt-2">{course.description}</p>
        </Card>

        <div className="mt-6 space-y-4">
          {course.days.map((d: any) => (
            <Card key={d.id} className="flex items-center justify-between">
              <div>
                <div className="text-sm text-slate-500">Day {d.day}</div>
                <div className="font-medium">{d.title}</div>
              </div>
              <div>
                <button className="px-3 py-1 rounded-md bg-focus-blue text-white">Open</button>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <aside>
        <Card>
          <h4 className="font-semibold">Course Overview</h4>
          <p className="text-sm text-slate-600 mt-2">Progression and quick links.</p>
        </Card>
      </aside>
    </div>
  );
}
