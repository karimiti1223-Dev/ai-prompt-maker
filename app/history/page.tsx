"use client";

import { useEffect, useState } from "react";
import { SavedPrompt } from "@/types";
import { getCategoryById } from "@/lib/categories";
import { CategoryIcon } from "@/components/icons";
import {
  getHistory,
  toggleFavorite,
  deleteFromHistory,
} from "@/lib/storage";

export default function HistoryPage() {
  const [history, setHistory] = useState<SavedPrompt[]>([]);
  const [onlyFavorites, setOnlyFavorites] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // localStorageはブラウザにしかないため、ページ読み込み後(クライアント側)で取得する
  useEffect(() => {
    setHistory(getHistory());
  }, []);

  function handleToggleFavorite(id: string) {
    toggleFavorite(id);
    setHistory(getHistory());
  }

  function handleDelete(id: string) {
    deleteFromHistory(id);
    setHistory(getHistory());
  }

  async function handleCopy(id: string, content: string) {
    await navigator.clipboard.writeText(content);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  }

  const displayedHistory = onlyFavorites
    ? history.filter((h) => h.isFavorite)
    : history;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-xl font-bold text-ink">履歴</h1>
        <button
          onClick={() => setOnlyFavorites((v) => !v)}
          className={`rounded-full border px-4 py-2 text-xs font-semibold transition-colors ${
            onlyFavorites
              ? "border-ink bg-ink text-paper"
              : "border-line bg-surface text-ink/60"
          }`}
        >
          お気に入りのみ
        </button>
      </div>

      {displayedHistory.length === 0 && (
        <p className="rounded-xl2 border border-dashed border-line p-6 text-center text-sm text-ink/50">
          {onlyFavorites
            ? "お気に入りに保存したプロンプトはまだありません。"
            : "保存したプロンプトはまだありません。作成画面の「保存」ボタンから追加できます。"}
        </p>
      )}

      <div className="flex flex-col gap-3">
        {displayedHistory.map((item) => {
          const category = getCategoryById(item.categoryId);
          return (
            <div
              key={item.id}
              className="rounded-xl2 border border-line bg-surface p-4"
            >
              <div className="mb-2 flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-xs font-medium text-ink/60">
                  {category && (
                    <CategoryIcon categoryId={category.id} className="h-3.5 w-3.5" />
                  )}
                  {category ? category.label : "カテゴリ不明"}
                </span>
                <span className="text-xs text-ink/30">
                  {new Date(item.createdAt).toLocaleString("ja-JP")}
                </span>
              </div>
              <p className="whitespace-pre-wrap font-mono text-[13px] leading-relaxed text-ink">
                {item.content}
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <button
                  onClick={() => handleCopy(item.id, item.content)}
                  className={`rounded-lg px-3 py-2 text-xs font-semibold transition-colors ${
                    copiedId === item.id
                      ? "bg-success text-paper"
                      : "bg-ink text-paper hover:bg-signal"
                  }`}
                >
                  {copiedId === item.id ? "コピーしました！" : "コピー"}
                </button>
                <button
                  onClick={() => handleToggleFavorite(item.id)}
                  className="rounded-lg border border-line bg-surface px-3 py-2 text-xs font-semibold text-ink transition-colors hover:border-ink"
                >
                  {item.isFavorite ? "お気に入り解除" : "お気に入り"}
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="rounded-lg border border-line bg-surface px-3 py-2 text-xs font-semibold text-signalDark transition-colors hover:border-signal"
                >
                  削除
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
