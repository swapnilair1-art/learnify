export async function callOpenAI(messages: Array<{ role: string; content: string }>, opts?: { max_tokens?: number; temperature?: number }) {
  const apiKey = process.env.OPENAI_API_KEY;

  // Development fallback: return a canned response when no API key is present
  if (!apiKey) {
    return {
      id: 'dev-fallback',
      object: 'chat.completion',
      choices: [
        {
          index: 0,
          message: {
            role: 'assistant',
            content: `(dev) Suggested mission: Review key concepts and practice examples.`
          }
        }
      ]
    };
  }

  const body = {
    model: 'gpt-4o-mini',
    messages,
    max_tokens: opts?.max_tokens ?? 512,
    temperature: opts?.temperature ?? 0.2
  };

  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`
    },
    body: JSON.stringify(body)
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`OpenAI error: ${res.status} ${text}`);
  }

  const json = await res.json();
  return json;
}
