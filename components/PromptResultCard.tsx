"use client";

import { useState } from "react";
import Link from "next/link";
import { addPromptToHistory } from "@/lib/storage";
import TypewriterText from "./TypewriterText";

type Props = {
  prompt: string;
  categoryId: string;
  onRegenerate: () => void;
  isRegenerating: boolean;
};

export default function PromptResultCard({
  prompt,
  categoryId,
  onRegenerate,
  isRegenerating,
}: Props) {
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(prompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("コピーに失敗しました:", error);
      alert("コピーに失敗しました。手動で選択してコピーしてください。");
    }
  }

  function handleSave() {
    addPromptToHistory(categoryId, prompt);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  async function handleShare() {
    if (navigator.share) {
      try {
        await navigator.share({ text: prompt });
      } catch {
        // ユーザーが共有をキャンセルした場合などは何もしない
      }
    } else {
      await handleCopy();
      alert("お使いの環境では共有機能が使えないため、代わりにコピーしました。");
    }
  }

  return (
    <div className="animate-rise-in rounded-xl2 border border-line bg-surface p-4">
      <h2 className="mb-2 text-xs font-semibold uppercase tracking-wide text-ink/40">
        生成されたプロンプト
      </h2>

      {/* ユーザー入力を含むAI生成テキストを危険なHTMLとして描画しないよう、
          dangerouslySetInnerHTMLは使わずプレーンテキストとして表示する */}
      <TypewriterText
        key={prompt}
        text={prompt}
        className="whitespace-pre-wrap rounded-lg border border-line bg-paper p-3 font-mono text-[13px] leading-relaxed text-ink"
      />

      <div className="mt-4 grid grid-cols-2 gap-2 sm:flex sm:flex-wrap">
        <button
          onClick={handleCopy}
          className={`rounded-lg px-4 py-2.5 text-sm font-semibold transition-colors active:scale-[0.98] ${
            copied ? "bg-success text-paper" : "bg-ink text-paper hover:bg-signal"
          }`}
        >
          {copied ? "コピーしました！" : "コピー"}
        </button>
        <button
          onClick={onRegenerate}
          disabled={isRegenerating}
          className="rounded-lg border border-line bg-surface px-4 py-2.5 text-sm font-semibold text-ink transition-colors hover:border-ink active:scale-[0.98] disabled:opacity-50"
        >
          {isRegenerating ? "生成中…" : "もう一度生成"}
        </button>
        <Link
          href={`/improve?prompt=${encodeURIComponent(prompt)}`}
          className="col-span-2 rounded-lg border border-line bg-surface px-4 py-2.5 text-center text-sm font-semibold text-ink transition-colors hover:border-ink active:scale-[0.98] sm:col-span-1"
        >
          改善する
        </Link>
        <button
          onClick={handleSave}
          className={`rounded-lg border px-4 py-2.5 text-sm font-semibold transition-colors active:scale-[0.98] ${
            saved
              ? "border-success text-success"
              : "border-line bg-surface text-ink hover:border-ink"
          }`}
        >
          {saved ? "保存しました" : "保存"}
        </button>
        <button
          onClick={handleShare}
          className="rounded-lg border border-line bg-surface px-4 py-2.5 text-sm font-semibold text-ink transition-colors hover:border-ink active:scale-[0.98]"
        >
          共有
        </button>
      </div>
    </div>
  );
}
