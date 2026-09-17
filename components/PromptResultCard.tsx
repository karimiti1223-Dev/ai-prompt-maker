"use client";

import { useState } from "react";
import Link from "next/link";
import { addPromptToHistory } from "@/lib/storage";

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
      // 共有APIが使えない環境(主にPCブラウザ)ではコピーで代用
      await handleCopy();
      alert("お使いの環境では共有機能が使えないため、代わりにコピーしました。");
    }
  }

  return (
    <div className="rounded-xl2 border border-gray-200 bg-white p-4 shadow-sm">
      <h2 className="mb-2 text-sm font-semibold text-gray-500">
        生成されたプロンプト
      </h2>

      {/* ユーザー入力を含むAI生成テキストを危険なHTMLとして描画しないよう、
          dangerouslySetInnerHTMLは使わずプレーンテキストとして表示する */}
      <p className="whitespace-pre-wrap rounded-lg bg-gray-50 p-3 text-sm leading-relaxed text-gray-800">
        {prompt}
      </p>

      <div className="mt-4 grid grid-cols-2 gap-2 sm:flex sm:flex-wrap">
        <button
          onClick={handleCopy}
          className="rounded-lg bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-700 active:scale-[0.98]"
        >
          {copied ? "コピーしました！" : "コピー"}
        </button>
        <button
          onClick={onRegenerate}
          disabled={isRegenerating}
          className="rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 active:scale-[0.98] disabled:opacity-50"
        >
          {isRegenerating ? "生成中…" : "もう一度生成"}
        </button>
        <Link
          href={`/improve?prompt=${encodeURIComponent(prompt)}`}
          className="col-span-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-center text-sm font-semibold text-gray-700 transition hover:bg-gray-50 active:scale-[0.98] sm:col-span-1"
        >
          改善する
        </Link>
        <button
          onClick={handleSave}
          className="rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 active:scale-[0.98]"
        >
          {saved ? "保存しました" : "保存"}
        </button>
        <button
          onClick={handleShare}
          className="rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 active:scale-[0.98]"
        >
          共有
        </button>
      </div>
    </div>
  );
}
