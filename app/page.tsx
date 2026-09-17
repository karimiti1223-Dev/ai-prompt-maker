import Link from "next/link";
import CategoryGrid from "@/components/CategoryGrid";
import { articles } from "@/lib/articles";

export default function TopPage() {
  return (
    <div className="flex flex-col items-center gap-10 pt-6 text-center">
      <div className="flex flex-col items-center gap-3">
        <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
          AIプロンプトメーカー
        </h1>
        <p className="text-sm text-gray-500 sm:text-base">
          AIへの頼み方が分からなくても、質問に答えるだけ。
        </p>
      </div>

      <Link
        href="/create"
        className="w-full max-w-xs rounded-full bg-brand-600 px-8 py-4 text-base font-bold text-white shadow-md transition hover:bg-brand-700 active:scale-[0.98] sm:w-auto"
      >
        プロンプトを作る
      </Link>

      <div className="w-full text-left">
        <h2 className="mb-3 text-sm font-semibold text-gray-500">
          何にAIを使いますか？
        </h2>
        <CategoryGrid />
      </div>

      <div className="w-full text-left">
        <h2 className="mb-3 text-sm font-semibold text-gray-500">
          プロンプト例を見る
        </h2>
        <div className="flex flex-col gap-2">
          {articles.map((article) => (
            <Link
              key={article.slug}
              href={`/prompt/${article.slug}`}
              className="rounded-xl2 border border-gray-200 bg-white p-3 text-sm text-gray-700 transition hover:border-brand-300 hover:shadow-md"
            >
              {article.title}
            </Link>
          ))}
        </div>
      </div>

      <div className="w-full rounded-xl2 border border-gray-200 bg-white p-5 text-left">
        <h2 className="mb-1 text-sm font-semibold text-gray-800">
          プロンプトってなに？
        </h2>
        <p className="mb-3 text-sm text-gray-500">
          「プロンプト」とは、AIに送る指示文のことです。何を・どう伝えるかで、
          AIの回答の質が大きく変わります。
        </p>
        <Link
          href="/guide"
          className="text-sm font-medium text-brand-600 hover:underline"
        >
          初心者向けガイドを見る →
        </Link>
      </div>
    </div>
  );
}
