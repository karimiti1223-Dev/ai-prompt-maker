import { callGemini } from "./gemini";

// このファイルが「どのAIを使うか」を決める唯一の場所です。
// 将来OpenAIやClaude APIに切り替えたいときは、
// 1. lib/ai/openai.ts のようなファイルを新しく作り
// 2. 下の callAI 関数の中で呼び分けるだけで対応できます。
// API Routes側(app/api/...)はこの callAI 関数しか知らないので、
// プロバイダーを切り替えてもAPI Routesのコードは変更不要です。

export type AIMessage = {
  systemPrompt: string; // AIへの役割指示
  userPrompt: string; // ユーザーからの実際の依頼内容
};

export async function callAI(message: AIMessage): Promise<string> {
  const provider = process.env.AI_PROVIDER || "gemini";

  switch (provider) {
    case "gemini":
      return callGemini(message);
    // case "openai":
    //   return callOpenAI(message);
    // case "claude":
    //   return callClaude(message);
    default:
      throw new Error(`未対応のAIプロバイダーです: ${provider}`);
  }
}
