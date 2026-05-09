import Card from '../../components/ui/Card';
import ChatPanel from '../../components/ai/ChatPanel';
import { use } from 'react';

export default function DashboardPage() {
  return (
    <div className="max-w-7xl mx-auto grid gap-6 grid-cols-1 md:grid-cols-3">
      <Card className="md:col-span-2">
        <h3 className="text-lg font-medium">Daily Mission</h3>
        <p className="mt-2 text-slate-600">Complete NumPy Day 3 + Revise Matplotlib Day 2</p>
      </Card>
      <div className="space-y-6">
        <Card>
          <h3 className="text-lg font-medium">Progress</h3>
          <p className="mt-2 text-slate-600">Weekly consistency 4/7</p>
        </Card>

        <Card>
          <h3 className="text-lg font-medium mb-3">AI Mentor</h3>
          {/* Using demo userId until auth wiring complete */}
          <ChatPanel userId={process.env.NEXT_PUBLIC_DEMO_USER_ID ?? 'demo'} />
        </Card>
      </div>
    </div>
  );
}
