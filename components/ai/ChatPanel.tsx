"use client";
import React, { useState } from 'react';

type Message = { role: 'user' | 'assistant' | 'system'; content: string };

export default function ChatPanel({ userId }: { userId: string }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  async function send() {
    if (!input.trim()) return;
    const userMsg: Message = { role: 'user', content: input };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, messages: newMessages })
      });
      const json = await res.json();
      const aiContent = json?.result?.choices?.[0]?.message?.content ?? 'No response';
      setMessages((m) => [...m, { role: 'assistant', content: aiContent }] as Message[]);
    } catch (err) {
      setMessages((m) => [...m, { role: 'assistant', content: 'Something went wrong.' }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-sm p-4">
      <div className="h-64 overflow-auto space-y-3 mb-3">
        {messages.map((m, i) => (
          <div key={i} className={m.role === 'user' ? 'text-right' : 'text-left'}>
            <div className={`inline-block p-2 rounded-md ${m.role === 'user' ? 'bg-focus-blue text-white' : 'bg-slate-100 text-slate-800'}`}>
              {m.content}
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask the AI mentor..." className="flex-1 border rounded-md px-3 py-2" />
        <button onClick={send} disabled={loading} className="px-3 py-2 rounded-md bg-focus-blue text-white">{loading ? '...' : 'Ask'}</button>
      </div>
    </div>
  );
}
