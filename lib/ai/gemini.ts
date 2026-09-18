import { AIMessage } from "./provider";

// Gemini APIを呼び出す関数。
// 重要: この関数は「サーバー側(API Route)」からしか呼ばれません。
// process.env.GEMINI_API_KEY はブラウザには一切送られないので安全です。

const GEMINI_MODEL = "gemini-3.6-flash";
const GEMINI_ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;

export async function callGemini(message: AIMessage): Promise<string> {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error(
      "GEMINI_API_KEYが設定されていません。.env.localを確認してください。"
    );
  }

  // Gemini APIは systemInstruction と contents を分けて渡せます。
  const response = await fetch(`${GEMINI_ENDPOINT}?key=${apiKey}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      systemInstruction: {
        parts: [{ text: message.systemPrompt }],
      },
      contents: [
        {
          role: "user",
          parts: [{ text: message.userPrompt }],
        },
      ],
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 2048,
        thinkingConfig: {
          thinkingBudget: 0,
        },
      },
    }),
    // Vercelなどのサーバーレス環境でタイムアウトしすぎないよう注意。
    cache: "no-store",
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `Gemini APIの呼び出しに失敗しました (status: ${response.status}): ${errorText}`
    );
  }

  const data = await response.json();

  const text: string | undefined =
    data?.candidates?.[0]?.content?.parts?.[0]?.text;

  if (!text) {
    throw new Error(
      "Gemini APIから有効な応答が得られませんでした。レスポンス内容を確認してください。"
    );
  }

  return text.trim();
}
