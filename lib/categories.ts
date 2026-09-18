import { Category, ResponseStyle } from "@/types";

// カテゴリを増やしたいときは、この配列に1つオブジェクトを追加するだけでOKです。
// トップページ・作成画面・SEOページなど、アプリ全体がこの配列を参照します。
export const categories: Category[] = [
  {
    id: "chatgpt",
    label: "ChatGPT",
    description: "ChatGPTに頼みたいことを整理してプロンプトを作ります。",
  },
  {
    id: "claude",
    label: "Claude",
    description: "Claudeに頼みたいことを整理してプロンプトを作ります。",
  },
  {
    id: "gemini",
    label: "Gemini",
    description: "Geminiに頼みたいことを整理してプロンプトを作ります。",
  },
  {
    id: "image-generation",
    label: "画像生成",
    description: "画像生成AI向けのプロンプトを作ります。",
  },
  {
    id: "video-generation",
    label: "動画生成",
    description: "動画生成AI向けのプロンプトを作ります。",
  },
  {
    id: "programming",
    label: "プログラミング",
    description: "コードを書いてもらう・直してもらうためのプロンプトを作ります。",
  },
  {
    id: "game-development",
    label: "ゲーム制作",
    description: "ゲーム制作に関するアイデアや実装の相談プロンプトを作ります。",
  },
  {
    id: "writing",
    label: "文章作成",
    description: "文章の作成・要約・改善のためのプロンプトを作ります。",
  },
  {
    id: "study",
    label: "勉強",
    description: "学習や勉強のサポートを頼むプロンプトを作ります。",
  },
  {
    id: "work",
    label: "仕事",
    description: "仕事のタスクを手伝ってもらうプロンプトを作ります。",
  },
  {
    id: "idea",
    label: "アイデア出し",
    description: "アイデア出し・ブレインストーミング用のプロンプトを作ります。",
  },
];

export function getCategoryById(id: string): Category | undefined {
  return categories.find((c) => c.id === id);
}

// 質問2「どんな回答がほしいですか？」で使う選択肢(複数選択可能)
export const responseStyles: ResponseStyle[] = [
  { id: "beginner", label: "初心者向け" },
  { id: "professional", label: "専門的" },
  { id: "with-examples", label: "具体例付き" },
  { id: "bullet-points", label: "箇条書き" },
  { id: "step-by-step", label: "手順形式" },
  { id: "short", label: "短く" },
  { id: "detailed", label: "詳しく" },
];
