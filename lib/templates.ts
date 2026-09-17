import { Template } from "@/types";

// テンプレートを増やしたいときは、この配列にオブジェクトを追加するだけでOKです。
export const templates: Template[] = [
  // ゲーム制作
  {
    id: "game-idea",
    categoryId: "game-development",
    title: "ゲームアイデアを考える",
    description: "作りたいジャンルを伝えて、ゲームのアイデアを出してもらいます。",
    baseAnswers: {
      goal: "Robloxでゲームを作りたい",
      responseStyleIds: ["beginner", "bullet-points", "with-examples"],
    },
  },
  {
    id: "game-system",
    categoryId: "game-development",
    title: "ゲームシステムを考える",
    description: "ゲームの基本システムやルールを整理してもらいます。",
    baseAnswers: {
      goal: "自分のゲームのシステム(ルール・進行方法)を考えたい",
      responseStyleIds: ["step-by-step", "with-examples"],
    },
  },
  {
    id: "game-character",
    categoryId: "game-development",
    title: "キャラクターを作る",
    description: "ゲームに登場するキャラクターの設定を考えてもらいます。",
    baseAnswers: {
      goal: "ゲームに登場するキャラクターの設定を考えたい",
      responseStyleIds: ["with-examples", "detailed"],
    },
  },
  {
    id: "game-story",
    categoryId: "game-development",
    title: "ストーリーを作る",
    description: "ゲームのストーリーやシナリオの案を考えてもらいます。",
    baseAnswers: {
      goal: "ゲームのストーリーを考えたい",
      responseStyleIds: ["with-examples"],
    },
  },
  {
    id: "game-bug",
    categoryId: "game-development",
    title: "バグを調査する",
    description: "ゲームで起きている不具合の原因を一緒に調べてもらいます。",
    baseAnswers: {
      goal: "ゲームで発生しているバグの原因を調査したい",
      responseStyleIds: ["step-by-step", "detailed"],
    },
  },
  {
    id: "game-code-explain",
    categoryId: "game-development",
    title: "コードを説明してもらう",
    description: "ゲームのコードの意味をわかりやすく説明してもらいます。",
    baseAnswers: {
      goal: "自分の書いたゲームのコードを説明してほしい",
      responseStyleIds: ["beginner", "step-by-step"],
    },
  },

  // プログラミング
  {
    id: "code-write",
    categoryId: "programming",
    title: "コードを書く",
    description: "実現したい機能を伝えてコードを書いてもらいます。",
    baseAnswers: {
      goal: "実現したい機能のコードを書いてほしい",
      responseStyleIds: ["with-examples", "detailed"],
    },
  },
  {
    id: "code-explain",
    categoryId: "programming",
    title: "コードを説明する",
    description: "書かれているコードの意味を説明してもらいます。",
    baseAnswers: {
      goal: "このコードが何をしているか説明してほしい",
      responseStyleIds: ["beginner", "step-by-step"],
    },
  },
  {
    id: "code-error",
    categoryId: "programming",
    title: "エラーを解決する",
    description: "発生しているエラーの原因と解決方法を教えてもらいます。",
    baseAnswers: {
      goal: "発生しているエラーを解決したい",
      responseStyleIds: ["step-by-step", "detailed"],
    },
  },
  {
    id: "code-improve",
    categoryId: "programming",
    title: "コードを改善する",
    description: "動いているコードをより良い書き方に改善してもらいます。",
    baseAnswers: {
      goal: "動いているコードをより良い書き方に改善したい",
      responseStyleIds: ["with-examples"],
    },
  },
  {
    id: "code-refactor",
    categoryId: "programming",
    title: "リファクタリングする",
    description: "コードの構造を整理し読みやすくしてもらいます。",
    baseAnswers: {
      goal: "コードをリファクタリングして読みやすくしたい",
      responseStyleIds: ["step-by-step", "detailed"],
    },
  },

  // 文章
  {
    id: "writing-article",
    categoryId: "writing",
    title: "記事を書く",
    description: "テーマを伝えて記事の下書きを書いてもらいます。",
    baseAnswers: {
      goal: "記事のテーマに沿って文章を書いてほしい",
      responseStyleIds: ["detailed"],
    },
  },
  {
    id: "writing-summary",
    categoryId: "writing",
    title: "文章を要約する",
    description: "長い文章を短くまとめてもらいます。",
    baseAnswers: {
      goal: "長い文章を要約してほしい",
      responseStyleIds: ["short", "bullet-points"],
    },
  },
  {
    id: "writing-improve",
    categoryId: "writing",
    title: "文章を改善する",
    description: "書いた文章をより読みやすく改善してもらいます。",
    baseAnswers: {
      goal: "書いた文章をより読みやすく改善してほしい",
      responseStyleIds: ["with-examples"],
    },
  },
  {
    id: "writing-title",
    categoryId: "writing",
    title: "タイトルを考える",
    description: "内容に合うタイトル案をいくつか考えてもらいます。",
    baseAnswers: {
      goal: "文章の内容に合うタイトルをいくつか考えてほしい",
      responseStyleIds: ["bullet-points", "short"],
    },
  },
  {
    id: "writing-sns",
    categoryId: "writing",
    title: "SNS投稿を考える",
    description: "SNSに投稿する文章の案を考えてもらいます。",
    baseAnswers: {
      goal: "SNSに投稿する文章を考えてほしい",
      responseStyleIds: ["short", "with-examples"],
    },
  },

  // 画像生成
  {
    id: "image-character",
    categoryId: "image-generation",
    title: "キャラクターデザイン",
    description: "画像生成AI向けのキャラクターデザインのプロンプトを作ります。",
    baseAnswers: {
      goal: "オリジナルキャラクターのデザイン画像を生成したい",
      responseStyleIds: ["detailed", "with-examples"],
    },
  },
  {
    id: "image-background",
    categoryId: "image-generation",
    title: "背景",
    description: "背景画像を生成するためのプロンプトを作ります。",
    baseAnswers: {
      goal: "作品に使う背景画像を生成したい",
      responseStyleIds: ["detailed"],
    },
  },
  {
    id: "image-icon",
    categoryId: "image-generation",
    title: "アイコン",
    description: "アイコン用の画像を生成するためのプロンプトを作ります。",
    baseAnswers: {
      goal: "SNSやアプリで使うアイコン画像を生成したい",
      responseStyleIds: ["short"],
    },
  },
  {
    id: "image-thumbnail",
    categoryId: "image-generation",
    title: "サムネイル",
    description: "動画や記事のサムネイル画像を生成するためのプロンプトを作ります。",
    baseAnswers: {
      goal: "動画のサムネイル画像を生成したい",
      responseStyleIds: ["with-examples"],
    },
  },
  {
    id: "image-logo",
    categoryId: "image-generation",
    title: "ロゴ",
    description: "ロゴ画像を生成するためのプロンプトを作ります。",
    baseAnswers: {
      goal: "サービスのロゴ画像を生成したい",
      responseStyleIds: ["detailed"],
    },
  },
];

export function getTemplatesByCategory(categoryId: string): Template[] {
  return templates.filter((t) => t.categoryId === categoryId);
}

export function getTemplateById(id: string): Template | undefined {
  return templates.find((t) => t.id === id);
}
