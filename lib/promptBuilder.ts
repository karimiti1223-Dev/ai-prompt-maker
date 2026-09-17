import { PromptAnswers } from "@/types";
import { getCategoryById, responseStyles } from "./categories";

// 質問への回答から、「Gemini自身に良いプロンプトを作らせるための指示文」を組み立てます。
// つまりこのアプリは、ユーザーの回答 → AIへの依頼文(メタプロンプト) → 完成したプロンプト
// という2段構えになっています。

export function buildSystemPrompt(): string {
  return [
    "あなたはプロンプトエンジニアリングの専門家です。",
    "ユーザーが入力した情報をもとに、別のAI(ChatGPT、Claude、Geminiなど)にそのまま貼り付けて使える",
    "「完成されたプロンプト」を1つ作成してください。",
    "",
    "ルール:",
    "・出力は完成したプロンプト本文のみにしてください。前置きや解説は不要です。",
    "・プロンプトの中に「あなたは〜の専門家です」のような役割設定を含めてください。",
    "・ユーザーが指定した回答スタイル(初心者向け、箇条書きなど)を反映してください。",
    "・ユーザーが指定した条件があれば、必ず守るべき制約として含めてください。",
    "・日本語で出力してください。",
  ].join("\n");
}

export function buildUserPrompt(answers: PromptAnswers): string {
  const category = getCategoryById(answers.categoryId);
  const selectedStyles = responseStyles
    .filter((s) => answers.responseStyleIds.includes(s.id))
    .map((s) => s.label);

  const lines: string[] = [];

  lines.push(`カテゴリ: ${category ? category.label : "指定なし"}`);
  lines.push(`やりたいこと: ${answers.goal}`);

  if (selectedStyles.length > 0) {
    lines.push(`希望する回答スタイル: ${selectedStyles.join("、")}`);
  }

  if (answers.constraints.trim()) {
    lines.push(`AIに守ってほしい条件: ${answers.constraints}`);
  }

  if (answers.extraNotes.trim()) {
    lines.push(`その他伝えたいこと: ${answers.extraNotes}`);
  }

  lines.push("");
  lines.push("上記の内容から、完成されたプロンプトを1つ作成してください。");

  return lines.join("\n");
}

// 「プロンプト改善機能」用のプロンプト組み立て
export function buildImproveSystemPrompt(): string {
  return [
    "あなたはプロンプトエンジニアリングの専門家です。",
    "ユーザーが入力した、まだ整理されていないプロンプトを改善してください。",
    "",
    "改善後のプロンプトには、可能な範囲で次の要素を整理して含めてください:",
    "・AIの役割",
    "・目的",
    "・条件",
    "・出力形式",
    "・制約",
    "",
    "重要なルール:",
    "・ユーザーの意図を大きく変更しないでください。あくまで『整理』と『補強』にとどめてください。",
    "・出力は改善後のプロンプト本文のみにしてください。前置きや解説は不要です。",
    "・日本語で出力してください。",
  ].join("\n");
}

export function buildImproveUserPrompt(originalPrompt: string): string {
  return [
    "以下のプロンプトを改善してください。",
    "",
    "【元のプロンプト】",
    originalPrompt,
  ].join("\n");
}
