import Link from "next/link";
import CategoryGrid from "@/components/CategoryGrid";
import { articles } from "@/lib/articles";

export default function TopPage() {
  return (
    <div className="flex flex-col gap-12 pt-8">
      <div className="flex flex-col gap-4">
        <h1 className="font-display text-3xl font-bold leading-tight text-ink sm:text-4xl">
          AIプロンプトメーカー
        </h1>
        <p className="text-sm text-ink/60 sm:text-base">
          AIへの頼み方が分からなくても、質問に答えるだけ。
        </p>
      </div>

      <Link
        href="/create"
        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-ink px-8 py-4 text-base font-semibold text-paper transition-colors hover:bg-signal active:scale-[0.98] sm:w-auto"
      >
        プロンプトを作る
        <span
          aria-hidden
          className="inline-block h-4 w-[2px] animate-blink bg-paper"
        />
      </Link>

      <div>
        <h2 className="mb-3 text-xs font-semibold uppercase tracking-wide text-ink/40">
          何にAIを使いますか
        </h2>
        <CategoryGrid />
      </div>

      <div>
        <h2 className="mb-3 text-xs font-semibold uppercase tracking-wide text-ink/40">
          プロンプト例を見る
        </h2>
        <div className="flex flex-col divide-y divide-line border-y border-line">
          {articles.map((article) => (
            <Link
              key={article.slug}
              href={`/prompt/${article.slug}`}
              className="py-3 text-sm text-ink underline decoration-line decoration-1 underline-offset-4 transition-colors hover:text-signal hover:decoration-signal"
            >
              {article.title}
            </Link>
          ))}
        </div>
      </div>

      <div className="rounded-xl2 border border-line bg-surface p-5">
        <h2 className="mb-1 text-sm font-semibold text-ink">
          プロンプトってなに？
        </h2>
        <p className="mb-3 text-sm leading-relaxed text-ink/60">
          「プロンプト」とは、AIに送る指示文のことです。何を・どう伝えるかで、
          AIの回答の質が大きく変わります。
        </p>
        <Link
          href="/guide"
          className="text-sm font-medium text-signal hover:underline"
        >
          初心者向けガイドを見る
        </Link>
      </div>
    </div>
  );
}
