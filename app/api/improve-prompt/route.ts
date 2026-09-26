import { NextRequest, NextResponse } from "next/server";
import { callAI } from "@/lib/ai/provider";
import { toUserFacingError } from "@/lib/ai/errors";
import {
  buildImproveSystemPrompt,
  buildImproveUserPrompt,
} from "@/lib/promptBuilder";
import { ImprovePromptRequest, ImprovePromptResponse } from "@/types";

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as ImprovePromptRequest;
    const { originalPrompt } = body;

    if (!originalPrompt || !originalPrompt.trim()) {
      return NextResponse.json(
        { error: "改善したいプロンプトを入力してください。" },
        { status: 400 }
      );
    }

    const systemPrompt = buildImproveSystemPrompt();
    const userPrompt = buildImproveUserPrompt(originalPrompt);

    const improvedPrompt = await callAI({ systemPrompt, userPrompt });

    const responseBody: ImprovePromptResponse = { prompt: improvedPrompt };
    return NextResponse.json(responseBody);
  } catch (error) {
    console.error("[improve-prompt] エラー:", error);
    const { message, status } = toUserFacingError(error);
    return NextResponse.json({ error: message }, { status });
  }
}
