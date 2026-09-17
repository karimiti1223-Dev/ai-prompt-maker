import { NextRequest, NextResponse } from "next/server";
import { callAI } from "@/lib/ai/provider";
import { buildSystemPrompt, buildUserPrompt } from "@/lib/promptBuilder";
import { GeneratePromptRequest, GeneratePromptResponse } from "@/types";

// このファイルはサーバー側でのみ実行されます(Next.jsのAPI Routes)。
// ブラウザから直接Gemini APIを呼ぶのではなく、必ずこのエンドポイントを経由させることで、
// APIキーをフロントエンドに一切公開しない構造にしています。

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as GeneratePromptRequest;
    const { answers } = body;

    // 最低限の入力チェック。ここで弾いておくことで、無駄なAPI呼び出しを防ぐ(=コスト削減)。
    if (!answers || !answers.goal || !answers.goal.trim()) {
      return NextResponse.json(
        { error: "「何をしたいですか？」の入力が必要です。" },
        { status: 400 }
      );
    }

    const systemPrompt = buildSystemPrompt();
    const userPrompt = buildUserPrompt(answers);

    const generatedPrompt = await callAI({ systemPrompt, userPrompt });

    const responseBody: GeneratePromptResponse = { prompt: generatedPrompt };
    return NextResponse.json(responseBody);
  } catch (error) {
    // エラー内容をサーバーのログには出しつつ、ユーザーには分かりやすいメッセージだけ返す。
    console.error("[generate-prompt] エラー:", error);
    return NextResponse.json(
      { error: "プロンプトの生成に失敗しました。時間をおいて再度お試しください。" },
      { status: 500 }
    );
  }
}
