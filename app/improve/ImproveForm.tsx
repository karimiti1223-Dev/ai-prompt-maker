"use client";

import { useState } from "react";

type Props = {
  initialPrompt?: string;
};

export default function ImproveForm({ initialPrompt = "" }: Props) {
  const [original, setOriginal] = useState(initialPrompt);
  const [improved, setImproved] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  async function handleImprove() {
    if (!original.trim()) {
      setErrorMessage("改善したいプロンプトを入力してください。");
      return;
    }
    setErrorMessage(null);
    setIsLoading(true);

    try {
      const res = await fetch("/api/improve-prompt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ originalPrompt: original }),
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error || "改善に失敗しました。");
      }

      setImproved(data.prompt as string);
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "予期しないエラーが発生しました。"
      );
    } finally {
      setIsLoading(false);
    }
  }

  async function handleCopy() {
    if (!improved) return;
    await navigator.clipboard.writeText(improved);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-xl font-bold text-gray-900">プロンプトを改善する</h1>
        <p className="mt-1 text-sm text-gray-500">
          自分で作ったプロンプトを入力すると、役割・目的・条件・出力形式・制約を整理して改善します。
        </p>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-semibold text-gray-800">
          改善したいプロンプト
        </label>
        <textarea
          value={original}
          onChange={(e) => setOriginal(e.target.value)}
          placeholder="例: ゲームのアイデアを考えて"
          rows={5}
          className="w-full rounded-lg border border-gray-300 p-3 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
        />
      </div>

      {errorMessage && (
        <p className="rounded-lg bg-red-50 p-3 text-sm text-red-600">
          {errorMessage}
        </p>
      )}

      <button
        onClick={handleImprove}
        disabled={isLoading}
        className="w-full rounded-full bg-brand-600 px-6 py-4 text-base font-bold text-white shadow-md transition hover:bg-brand-700 active:scale-[0.98] disabled:opacity-50"
      >
        {isLoading ? "改善中…" : "このプロンプトを改善する"}
      </button>

      {improved && (
        <div className="rounded-xl2 border border-gray-200 bg-white p-4 shadow-sm">
          <h2 className="mb-2 text-sm font-semibold text-gray-500">
            改善されたプロンプト
          </h2>
          <p className="whitespace-pre-wrap rounded-lg bg-gray-50 p-3 text-sm leading-relaxed text-gray-800">
            {improved}
          </p>
          <button
            onClick={handleCopy}
            className="mt-4 rounded-lg bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-700 active:scale-[0.98]"
          >
            {copied ? "コピーしました！" : "コピー"}
          </button>
        </div>
      )}
    </div>
  );
}
