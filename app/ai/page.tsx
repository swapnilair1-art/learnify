import ChatPanel from '../../components/ai/ChatPanel';

export default function AIPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">AI Mentor</h1>
      <p className="text-slate-600 mb-4">Ask the AI mentor for concept explanations, quizzes, or project help.</p>
      <ChatPanel userId={process.env.NEXT_PUBLIC_DEMO_USER_ID ?? 'demo'} />
    </div>
  );
}
