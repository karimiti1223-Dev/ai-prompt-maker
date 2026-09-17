"use client";

import { useState } from "react";
import { Category, PromptAnswers } from "@/types";
import { responseStyles } from "@/lib/categories";
import PromptResultCard from "./PromptResultCard";

type Props = {
  category: Category;
  initialAnswers?: Partial<Omit<PromptAnswers, "categoryId">>;
};

export default function QuestionForm({ category, initialAnswers }: Props) {
  const [goal, setGoal] = useState(initialAnswers?.goal ?? "");
  const [selectedStyles, setSelectedStyles] = useState<string[]>(
    initialAnswers?.responseStyleIds ?? []
  );
  const [constraints, setConstraints] = useState(
    initialAnswers?.constraints ?? ""
  );
  const [extraNotes, setExtraNotes] = useState(initialAnswers?.extraNotes ?? "");

  const [result, setResult] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  function toggleStyle(id: string) {
    setSelectedStyles((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  }

  async function handleGenerate() {
    if (!goal.trim()) {
      setErrorMessage("「何をしたいですか？」を入力してください。");
      return;
    }

    setErrorMessage(null);
    setIsLoading(true);

    const answers: PromptAnswers = {
      categoryId: category.id,
      goal,
      responseStyleIds: selectedStyles,
      constraints,
      extraNotes,
    };

    try {
      const res = await fetch("/api/generate-prompt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error || "生成に失敗しました。");
      }

      setResult(data.prompt as string);
    } catch (error) {
      console.error(error);
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "予期しないエラーが発生しました。"
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <p className="text-xs font-medium text-brand-600">
          {category.emoji} {category.label}
        </p>
        <h1 className="mt-1 text-xl font-bold text-gray-900">
          質問に答えてプロンプトを作りましょう
        </h1>
      </div>

      {/* 質問1 */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-semibold text-gray-800">
          何をしたいですか？
        </label>
        <textarea
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
          placeholder={`例: ${category.description}`}
          rows={3}
          className="w-full rounded-lg border border-gray-300 p-3 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
        />
      </div>

      {/* 質問2 */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-semibold text-gray-800">
          どんな回答がほしいですか？(複数選択可)
        </label>
        <div className="flex flex-wrap gap-2">
          {responseStyles.map((style) => {
            const isSelected = selectedStyles.includes(style.id);
            return (
              <button
                key={style.id}
                type="button"
                onClick={() => toggleStyle(style.id)}
                className={`rounded-full border px-4 py-2 text-sm transition active:scale-[0.98] ${
                  isSelected
                    ? "border-brand-600 bg-brand-600 text-white"
                    : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                }`}
              >
                {style.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* 質問3 */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-semibold text-gray-800">
          AIに守ってほしい条件はありますか？(任意)
        </label>
        <textarea
          value={constraints}
          onChange={(e) => setConstraints(e.target.value)}
          placeholder="例: 専門用語には簡単な説明をつけてほしい"
          rows={2}
          className="w-full rounded-lg border border-gray-300 p-3 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
        />
      </div>

      {/* 質問4 */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-semibold text-gray-800">
          その他に伝えたいこと(任意)
        </label>
        <textarea
          value={extraNotes}
          onChange={(e) => setExtraNotes(e.target.value)}
          placeholder="例: 5つ案を出してほしい"
          rows={2}
          className="w-full rounded-lg border border-gray-300 p-3 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
        />
      </div>

      {errorMessage && (
        <p className="rounded-lg bg-red-50 p-3 text-sm text-red-600">
          {errorMessage}
        </p>
      )}

      <button
        onClick={handleGenerate}
        disabled={isLoading}
        className="w-full rounded-full bg-brand-600 px-6 py-4 text-base font-bold text-white shadow-md transition hover:bg-brand-700 active:scale-[0.98] disabled:opacity-50"
      >
        {isLoading ? "生成中…" : "プロンプトを生成"}
      </button>

      {result && (
        <PromptResultCard
          prompt={result}
          categoryId={category.id}
          onRegenerate={handleGenerate}
          isRegenerating={isLoading}
        />
      )}
    </div>
  );
}
