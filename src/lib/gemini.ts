/**
 * Serverless helper for Google Gemini API
 * Runs exclusively on server-side Next.js route handlers
 */

// Models verified working as of 2026-11-26:
// 200 OK: gemini-3.5-flash-lite, gemini-3.5-flash
// 503 (temporary overload): gemini-3.6-flash, gemini-3.8-flash
// 404 (discontinued): gemini-2.5-flash, gemini-2.0-flash, gemini-1.5-flash
const FALLBACK_MODELS = [
  'gemini-3.5-flash-lite',
  'gemini-3.5-flash',
  'gemini-3.6-flash',
  'gemini-3.8-flash',
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

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 8000);

      let res: Response;
      try {
        res = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
          signal: controller.signal,
        });
      } finally {
        clearTimeout(timeoutId);
      }

      if (!res.ok) {
        const errorText = await res.text();
        lastError = new Error(`Model ${model} returned ${res.status}: ${errorText}`);
        continue;
      }

      const data = await res.json();
      // Extract text safely: exclude internal thinking parts (thought: true),
      // while keeping answer parts even if they carry a thoughtSignature
      const parts: Array<{ text?: string; thought?: boolean }> =
        data?.candidates?.[0]?.content?.parts ?? [];
      const text = parts
        .filter((p) => p.text !== undefined && p.thought !== true)
        .map((p) => p.text as string)
        .join('');
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
