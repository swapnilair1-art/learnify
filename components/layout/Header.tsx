export default function Header() {
  return (
    <header className="flex items-center justify-between px-6 py-4 border-b bg-white">
      <div className="flex items-center gap-3">
        <div className="rounded-md w-9 h-9 bg-focus-blue/10 flex items-center justify-center font-semibold text-focus-blue">L</div>
        <div className="text-lg font-semibold">Learnify</div>
      </div>
      <div className="flex items-center gap-4">
        <button className="text-sm text-slate-600">Streak: 4</button>
        <div className="w-8 h-8 rounded-full bg-slate-200" />
      </div>
    </header>
  );
}
