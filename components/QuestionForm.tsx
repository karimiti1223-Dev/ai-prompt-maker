"use client";

import { useRef, useState } from "react";
import { Category, PromptAnswers } from "@/types";
import { responseStyles } from "@/lib/categories";
import { CategoryIcon } from "./icons";
import PromptResultCard from "./PromptResultCard";
import GeneratingScreen from "./GeneratingScreen";

type Props = {
  category: Category;
  initialAnswers?: Partial<Omit<PromptAnswers, "categoryId">>;
};

// base64化すると元のファイルより約3割大きくなり、Vercelのリクエストサイズ上限(目安4.5MB)に
// 収まるよう、元ファイルは3MBまでに制限しておく。
const MAX_IMAGE_BYTES = 3 * 1024 * 1024; // 3MB

export default function QuestionForm({ category, initialAnswers }: Props) {
  const [goal, setGoal] = useState(initialAnswers?.goal ?? "");
  const [selectedStyles, setSelectedStyles] = useState<string[]>(
    initialAnswers?.responseStyleIds ?? []
  );
  const [constraints, setConstraints] = useState(
    initialAnswers?.constraints ?? ""
  );
  const [extraNotes, setExtraNotes] = useState(initialAnswers?.extraNotes ?? "");

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageDataUrl, setImageDataUrl] = useState<string | null>(null);
  const [imageMimeType, setImageMimeType] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [result, setResult] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  function toggleStyle(id: string) {
    setSelectedStyles((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  }

  function handleImageSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > MAX_IMAGE_BYTES) {
      setErrorMessage("画像のサイズが大きすぎます。3MB以下の画像を選んでください。");
      return;
    }

    setErrorMessage(null);
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      setImageDataUrl(dataUrl);
      setImagePreview(dataUrl);
      setImageMimeType(file.type);
    };
    reader.readAsDataURL(file);
  }

  function handleRemoveImage() {
    setImageDataUrl(null);
    setImagePreview(null);
    setImageMimeType(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
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
      referenceImage:
        imageDataUrl && imageMimeType
          ? { dataUrl: imageDataUrl, mimeType: imageMimeType }
          : undefined,
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

  // 生成中(初回・もう一度生成のどちらも)は、質問フォームの代わりに
  // 画面全体をローディング画面に切り替える。
  if (isLoading) {
    return (
      <div className="flex flex-col gap-7">
        <div className="flex items-center gap-2">
          <CategoryIcon categoryId={category.id} className="h-5 w-5 text-signal" />
          <span className="text-sm font-medium text-ink/60">{category.label}</span>
        </div>
        <GeneratingScreen />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-7">
      <div className="flex items-center gap-2">
        <CategoryIcon categoryId={category.id} className="h-5 w-5 text-signal" />
        <span className="text-sm font-medium text-ink/60">{category.label}</span>
      </div>
      <h1 className="font-display text-xl font-bold text-ink">
        質問に答えてプロンプトを作りましょう
      </h1>

      {/* 質問1 */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-semibold text-ink">
          何をしたいですか？
        </label>
        <textarea
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
          placeholder={`例: ${category.description}`}
          rows={3}
          className="w-full rounded-lg border border-line bg-surface p-3 text-sm text-ink placeholder:text-ink/30 focus:border-ink focus:outline-none"
        />
      </div>

      {/* 画像添付(任意) */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-semibold text-ink">
          参考にしてほしい画像があれば添付できます(任意)
        </label>
        <p className="text-xs text-ink/50">
          添付した画像の内容(構図・色・雰囲気など)をAIが見て、プロンプトに反映します。3MBまで。
        </p>

        {imagePreview ? (
          <div className="flex items-center gap-3 rounded-lg border border-line bg-surface p-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={imagePreview}
              alt="添付した参考画像のプレビュー"
              className="h-16 w-16 rounded-md border border-line object-cover"
            />
            <button
              type="button"
              onClick={handleRemoveImage}
              className="rounded-lg border border-line px-3 py-2 text-xs font-semibold text-ink transition-colors hover:border-signal hover:text-signal"
            >
              画像を削除
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="rounded-lg border border-dashed border-line bg-surface px-4 py-4 text-sm text-ink/50 transition-colors hover:border-ink hover:text-ink"
          >
            タップして画像を選ぶ
          </button>
        )}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleImageSelect}
          className="hidden"
        />
      </div>

      {/* 質問2 */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-semibold text-ink">
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
                className={`rounded-full border px-4 py-2 text-sm transition-colors active:scale-[0.98] ${
                  isSelected
                    ? "border-ink bg-ink text-paper"
                    : "border-line bg-surface text-ink hover:border-ink"
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
        <label className="text-sm font-semibold text-ink">
          AIに守ってほしい条件はありますか？(任意)
        </label>
        <textarea
          value={constraints}
          onChange={(e) => setConstraints(e.target.value)}
          placeholder="例: 専門用語には簡単な説明をつけてほしい"
          rows={2}
          className="w-full rounded-lg border border-line bg-surface p-3 text-sm text-ink placeholder:text-ink/30 focus:border-ink focus:outline-none"
        />
      </div>

      {/* 質問4 */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-semibold text-ink">
          その他に伝えたいこと(任意)
        </label>
        <textarea
          value={extraNotes}
          onChange={(e) => setExtraNotes(e.target.value)}
          placeholder="例: 5つ案を出してほしい"
          rows={2}
          className="w-full rounded-lg border border-line bg-surface p-3 text-sm text-ink placeholder:text-ink/30 focus:border-ink focus:outline-none"
        />
      </div>

      {errorMessage && (
        <p className="rounded-lg border border-signal/30 bg-signal/5 p-3 text-sm text-signalDark">
          {errorMessage}
        </p>
      )}

      <button
        onClick={handleGenerate}
        className="w-full rounded-full bg-ink px-6 py-4 text-base font-semibold text-paper transition-colors hover:bg-signal active:scale-[0.98]"
      >
        プロンプトを生成
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
