// AI呼び出しで起きたエラーの種類を区別するためのクラス。
// 「なぜ失敗したか」によって、ユーザーに見せるメッセージを変えられるようにします。

export type AIErrorCode =
  | "rate_limited" // アクセスが集中している(無料枠の上限など)
  | "invalid_request" // 入力内容に問題がある
  | "unauthorized" // APIキーの設定に問題がある
  | "not_found" // AIモデルの指定に問題がある
  | "payload_too_large" // 送信データ(画像など)が大きすぎる
  | "unknown"; // その他

export class AIError extends Error {
  code: AIErrorCode;

  constructor(message: string, code: AIErrorCode) {
    super(message);
    this.name = "AIError";
    this.code = code;
  }
}

// HTTPステータスコードから、エラーの種類を判定する
export function codeFromStatus(status: number): AIErrorCode {
  if (status === 429) return "rate_limited";
  if (status === 400) return "invalid_request";
  if (status === 401 || status === 403) return "unauthorized";
  if (status === 404) return "not_found";
  if (status === 413) return "payload_too_large";
  return "unknown";
}

// API Route側で、ユーザーに見せる日本語メッセージとHTTPステータスに変換する
export function toUserFacingError(error: unknown): {
  message: string;
  status: number;
} {
  if (error instanceof AIError) {
    switch (error.code) {
      case "rate_limited":
        return {
          message:
            "現在アクセスが集中していて、AIからの応答が受け取れませんでした。1分ほど待ってからもう一度お試しください。",
          status: 429,
        };
      case "invalid_request":
        return {
          message:
            "入力内容に問題があるようです。文字数を短くするか、内容を見直してもう一度お試しください。",
          status: 400,
        };
      case "unauthorized":
        return {
          message:
            "AIサービスへの接続設定に問題があります。サイト管理者にAPIキーの設定を確認してもらってください。",
          status: 500,
        };
      case "not_found":
        return {
          message:
            "AIモデルの設定に問題があります。サイト管理者に確認してもらってください。",
          status: 500,
        };
      case "payload_too_large":
        return {
          message:
            "添付した画像のサイズが大きすぎます。4MB以下の画像でもう一度お試しください。",
          status: 413,
        };
      default:
        return {
          message: "プロンプトの生成に失敗しました。時間をおいて再度お試しください。",
          status: 500,
        };
    }
  }

  return {
    message: "予期しないエラーが発生しました。時間をおいて再度お試しください。",
    status: 500,
  };
}
