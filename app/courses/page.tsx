import prisma from '../../lib/prisma';
import CourseCard from '../../components/course/CourseCard';
import sampleCourses from '../../data/sample-courses.json';

export default async function CoursesPage() {
  let courses: any[] = [];
  try {
    courses = await prisma.course.findMany({ orderBy: { title: 'asc' } });
  } catch (err) {
    // Database not available — fall back to local sample data
    courses = sampleCourses as any[];
  }

  return (
    <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
      {courses.map((c: any) => (
        <CourseCard key={c.slug ?? c.id} course={c} />
      ))}
    </div>
  );
}
