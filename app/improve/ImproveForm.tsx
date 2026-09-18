"use client";

import { useState } from "react";
import TypewriterText from "@/components/TypewriterText";

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
    <div className="flex flex-col gap-7">
      <div>
        <h1 className="font-display text-xl font-bold text-ink">プロンプトを改善する</h1>
        <p className="mt-2 text-sm text-ink/60">
          自分で作ったプロンプトを入力すると、役割・目的・条件・出力形式・制約を整理して改善します。
        </p>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-semibold text-ink">
          改善したいプロンプト
        </label>
        <textarea
          value={original}
          onChange={(e) => setOriginal(e.target.value)}
          placeholder="例: ゲームのアイデアを考えて"
          rows={5}
          className="w-full rounded-lg border border-line bg-surface p-3 text-sm text-ink placeholder:text-ink/30 focus:border-ink focus:outline-none"
        />
      </div>

      {errorMessage && (
        <p className="rounded-lg border border-signal/30 bg-signal/5 p-3 text-sm text-signalDark">
          {errorMessage}
        </p>
      )}

      <button
        onClick={handleImprove}
        disabled={isLoading}
        className="w-full rounded-full bg-ink px-6 py-4 text-base font-semibold text-paper transition-colors hover:bg-signal active:scale-[0.98] disabled:opacity-50"
      >
        {isLoading ? "改善中…" : "このプロンプトを改善する"}
      </button>

      {improved && (
        <div className="animate-rise-in rounded-xl2 border border-line bg-surface p-4">
          <h2 className="mb-2 text-xs font-semibold uppercase tracking-wide text-ink/40">
            改善されたプロンプト
          </h2>
          <TypewriterText
            key={improved}
            text={improved}
            className="whitespace-pre-wrap rounded-lg border border-line bg-paper p-3 font-mono text-[13px] leading-relaxed text-ink"
          />
          <button
            onClick={handleCopy}
            className={`mt-4 rounded-lg px-4 py-2.5 text-sm font-semibold transition-colors active:scale-[0.98] ${
              copied ? "bg-success text-paper" : "bg-ink text-paper hover:bg-signal"
            }`}
          >
            {copied ? "コピーしました！" : "コピー"}
          </button>
        </div>
      )}
    </div>
  );
}
