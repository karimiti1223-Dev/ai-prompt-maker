import { AIMessage } from "./provider";
import { AIError, codeFromStatus } from "./errors";

// Gemini APIを呼び出す関数。
// 重要: この関数は「サーバー側(API Route)」からしか呼ばれません。
// process.env.GEMINI_API_KEY はブラウザには一切送られないので安全です。

const GEMINI_MODEL = "gemini-3.6-flash";
const GEMINI_ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;

export async function callGemini(message: AIMessage): Promise<string> {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    throw new AIError(
      "GEMINI_API_KEYが設定されていません。.env.localを確認してください。",
      "unauthorized"
    );
  }

  // テキストに加えて、画像が添付されている場合はinlineDataとして一緒に送る。
  // Geminiはこの形式で「画像を見ながら文章を生成する」ことができる。
  const parts: Record<string, unknown>[] = [{ text: message.userPrompt }];
  if (message.image) {
    parts.push({
      inlineData: {
        mimeType: message.image.mimeType,
        data: message.image.data,
      },
    });
  }

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
          parts,
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
    // 詳しい内容はサーバーのログにだけ残す(ユーザーには種類分けしたメッセージを見せる)
    console.error(
      `[Gemini] status=${response.status} body=${errorText}`
    );
    throw new AIError(
      `Gemini APIの呼び出しに失敗しました (status: ${response.status})`,
      codeFromStatus(response.status)
    );
  }

  const data = await response.json();

  const text: string | undefined =
    data?.candidates?.[0]?.content?.parts?.[0]?.text;

  if (!text) {
    throw new AIError(
      "Gemini APIから有効な応答が得られませんでした。",
      "unknown"
    );
  }

  return text.trim();
}
