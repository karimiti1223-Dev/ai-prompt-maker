"use client";

import { useEffect, useState } from "react";
import { SavedPrompt } from "@/types";
import { getCategoryById } from "@/lib/categories";
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
        <h1 className="text-xl font-bold text-gray-900">履歴</h1>
        <button
          onClick={() => setOnlyFavorites((v) => !v)}
          className={`rounded-full border px-4 py-2 text-xs font-semibold transition ${
            onlyFavorites
              ? "border-brand-600 bg-brand-600 text-white"
              : "border-gray-300 bg-white text-gray-600"
          }`}
        >
          お気に入りのみ
        </button>
      </div>

      {displayedHistory.length === 0 && (
        <p className="rounded-xl2 border border-dashed border-gray-300 p-6 text-center text-sm text-gray-500">
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
              className="rounded-xl2 border border-gray-200 bg-white p-4 shadow-sm"
            >
              <div className="mb-2 flex items-center justify-between">
                <span className="text-xs font-medium text-brand-600">
                  {category ? `${category.emoji} ${category.label}` : "カテゴリ不明"}
                </span>
                <span className="text-xs text-gray-400">
                  {new Date(item.createdAt).toLocaleString("ja-JP")}
                </span>
              </div>
              <p className="whitespace-pre-wrap text-sm text-gray-800">
                {item.content}
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <button
                  onClick={() => handleCopy(item.id, item.content)}
                  className="rounded-lg bg-brand-600 px-3 py-2 text-xs font-semibold text-white hover:bg-brand-700"
                >
                  {copiedId === item.id ? "コピーしました！" : "コピー"}
                </button>
                <button
                  onClick={() => handleToggleFavorite(item.id)}
                  className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-50"
                >
                  {item.isFavorite ? "★ お気に入り解除" : "☆ お気に入り"}
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-xs font-semibold text-red-500 hover:bg-red-50"
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
