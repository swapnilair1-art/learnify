import Link from 'next/link';

export default function Sidebar() {
  return (
    <aside className="hidden md:block w-64 bg-white border-r">
      <nav className="p-4">
        <ul className="space-y-2">
          <li>
            <Link href="/dashboard" className="text-slate-700 hover:text-focus-blue">Dashboard</Link>
          </li>
          <li>
            <Link href="/courses" className="text-slate-700 hover:text-focus-blue">Courses</Link>
          </li>
          <li>
            <Link href="/ai" className="text-slate-700 hover:text-focus-blue">AI Mentor</Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
