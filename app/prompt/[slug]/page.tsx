import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { articles, getArticleBySlug } from "@/lib/articles";
import { getCategoryById } from "@/lib/categories";

type Props = {
  params: { slug: string };
};

// ビルド時に/prompt/chatgpt などのページをあらかじめ生成しておく(検索エンジンに強い静的ページ)
export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

// ページごとに検索結果へ表示されるタイトル・説明文を設定する
export function generateMetadata({ params }: Props): Metadata {
  const article = getArticleBySlug(params.slug);
  if (!article) return {};

  return {
    title: `${article.title} | AIプロンプトメーカー`,
    description: article.metaDescription,
  };
}

export default function ArticlePage({ params }: Props) {
  const article = getArticleBySlug(params.slug);
  if (!article) {
    notFound();
  }

  const category = getCategoryById(article.categoryId);

  return (
    <article className="flex flex-col gap-6">
      <div>
        <p className="text-xs font-medium text-brand-600">
          {article.searchIntent}
        </p>
        <h1 className="mt-1 text-xl font-bold text-gray-900">
          {article.title}
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-gray-600">
          {article.intro}
        </p>
      </div>

      <div className="flex flex-col gap-3">
        {article.examplePrompts.map((example, index) => (
          <div
            key={index}
            className="rounded-xl2 border border-gray-200 bg-white p-4"
          >
            <p className="mb-2 text-sm font-semibold text-gray-800">
              {example.title}
            </p>
            <p className="whitespace-pre-wrap rounded-lg bg-gray-50 p-3 text-sm leading-relaxed text-gray-700">
              {example.body}
            </p>
          </div>
        ))}
      </div>

      {category && (
        <Link
          href={`/create/${category.id}`}
          className="w-full rounded-full bg-brand-600 px-6 py-4 text-center text-base font-bold text-white shadow-md transition hover:bg-brand-700"
        >
          自分専用のプロンプトを作る
        </Link>
      )}
    </article>
  );
}
