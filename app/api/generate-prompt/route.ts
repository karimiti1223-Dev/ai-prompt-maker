import { NextRequest, NextResponse } from "next/server";
import { callAI } from "@/lib/ai/provider";
import { toUserFacingError, AIError } from "@/lib/ai/errors";
import { buildSystemPrompt, buildUserPrompt } from "@/lib/promptBuilder";
import { GeneratePromptRequest, GeneratePromptResponse } from "@/types";

// このファイルはサーバー側でのみ実行されます(Next.jsのAPI Routes)。
// ブラウザから直接Gemini APIを呼ぶのではなく、必ずこのエンドポイントを経由させることで、
// APIキーをフロントエンドに一切公開しない構造にしています。

// 画像はbase64化すると元のファイルより33%ほど大きくなるため、
// 3MBの画像(クライアント側の上限)を想定して少し余裕を持った上限にしている。
const MAX_IMAGE_DATA_URL_LENGTH = 4_500_000;

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

    let image: { mimeType: string; data: string } | undefined;

    if (answers.referenceImage) {
      const { dataUrl, mimeType } = answers.referenceImage;

      if (dataUrl.length > MAX_IMAGE_DATA_URL_LENGTH) {
        throw new AIError("画像サイズが大きすぎます。", "payload_too_large");
      }

      // "data:image/png;base64,xxxxx" の "xxxxx" 部分だけを取り出す
      const base64Data = dataUrl.split(",")[1];
      if (base64Data) {
        image = { mimeType, data: base64Data };
      }
    }

    const systemPrompt = buildSystemPrompt(Boolean(image));
    const userPrompt = buildUserPrompt(answers);

    const generatedPrompt = await callAI({ systemPrompt, userPrompt, image });

    const responseBody: GeneratePromptResponse = { prompt: generatedPrompt };
    return NextResponse.json(responseBody);
  } catch (error) {
    // エラー内容をサーバーのログには出しつつ、ユーザーには種類分けした分かりやすいメッセージだけ返す。
    console.error("[generate-prompt] エラー:", error);
    const { message, status } = toUserFacingError(error);
    return NextResponse.json({ error: message }, { status });
  }
}
