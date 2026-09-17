// カテゴリ(ChatGPT、Claude、ゲーム制作 など)
export type Category = {
  id: string; // URLにも使うID。例: "game-development"
  label: string; // 画面に表示する名前。例: "ゲーム制作"
  emoji: string; // 目印になる絵文字(画像を使わず軽量にするため)
  description: string; // カテゴリの簡単な説明
};

// 回答スタイルの選択肢(質問2で複数選択する)
export type ResponseStyle = {
  id: string;
  label: string;
};

// ユーザーが質問画面で入力する内容
export type PromptAnswers = {
  categoryId: string;
  goal: string; // 質問1: 何をしたいか
  responseStyleIds: string[]; // 質問2: 複数選択
  constraints: string; // 質問3: 守ってほしい条件
  extraNotes: string; // 質問4: その他伝えたいこと
};

// AI生成APIへのリクエスト
export type GeneratePromptRequest = {
  answers: PromptAnswers;
};

// AI生成APIからのレスポンス
export type GeneratePromptResponse = {
  prompt: string;
};

// プロンプト改善APIへのリクエスト
export type ImprovePromptRequest = {
  originalPrompt: string;
};

export type ImprovePromptResponse = {
  prompt: string;
};

// 履歴・お気に入りとして保存する1件分のデータ
export type SavedPrompt = {
  id: string;
  categoryId: string;
  content: string;
  createdAt: string; // ISO文字列
  isFavorite: boolean;
};

// テンプレート(質問画面にあらかじめ値を入れておくためのデータ)
export type Template = {
  id: string;
  categoryId: string;
  title: string; // 例: "ゲームアイデアを考える"
  description: string;
  baseAnswers: Partial<Omit<PromptAnswers, "categoryId">>;
};
