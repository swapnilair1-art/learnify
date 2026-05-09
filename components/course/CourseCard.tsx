"use client";
import React from 'react';
import Link from 'next/link';

export default function CourseCard({ course }: { course: any }) {
  return (
    <div className="card flex flex-col justify-between h-40">
      <div>
        <div className="text-sm text-slate-500">Course</div>
        <h3 className="text-lg font-semibold mt-1">{course.title}</h3>
        <p className="mt-2 text-slate-600 text-sm">{course.description}</p>
      </div>
      <div className="flex items-center justify-between mt-4">
        <Link href={`/courses/${course.slug}`} className="text-focus-blue font-medium">Open Course</Link>
        <div className="text-sm text-slate-500">5 days</div>
      </div>
    </div>
  );
}
