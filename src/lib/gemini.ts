/**
 * Serverless helper for Google Gemini API
 * Runs exclusively on server-side Next.js route handlers
 */

const FALLBACK_MODELS = [
  'gemini-2.5-flash',
  'gemini-1.5-flash',
  'gemini-2.0-flash',
  'gemini-2.5-pro'
];

interface GeminiMessage {
  role?: 'user' | 'model';
  parts: Array<{ text: string }>;
}

export async function callGemini(
  prompt: string,
  systemInstruction?: string,
  history?: Array<{ role: 'user' | 'model'; text: string }>
): Promise<string> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === 'dien_api_key_cua_ban_vao_day') {
    throw new Error('CHUA_CO_API_KEY: Vui lòng cấu hình GEMINI_API_KEY trên Vercel hoặc file .env.local.');
  }

  const contents: GeminiMessage[] = [];

  if (history && history.length > 0) {
    for (const h of history) {
      contents.push({
        role: h.role,
        parts: [{ text: h.text }]
      });
    }
  }

  contents.push({
    role: 'user',
    parts: [{ text: prompt }]
  });

  let lastError: any = null;

  for (const model of FALLBACK_MODELS) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
      const payload: any = {
        contents,
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 2048,
        }
      };

      if (systemInstruction) {
        payload.systemInstruction = {
          parts: [{ text: systemInstruction }]
        };
      }

      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        const errorText = await res.text();
        lastError = new Error(`Model ${model} returned ${res.status}: ${errorText}`);
        continue;
      }

      const data = await res.json();
      const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (text) {
        return text;
      }
    } catch (err: any) {
      lastError = err;
      continue;
    }
  }

  throw lastError || new Error('Không thể kết nối tới Gemini API qua các model có sẵn.');
}
