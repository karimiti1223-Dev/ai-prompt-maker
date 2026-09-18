import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { articles, getArticleBySlug } from "@/lib/articles";
import { getCategoryById } from "@/lib/categories";
import { CategoryIcon } from "@/components/icons";

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
    <article className="flex flex-col gap-7">
      <div>
        {category && (
          <div className="mb-2 flex items-center gap-2">
            <CategoryIcon categoryId={category.id} className="h-4 w-4 text-signal" />
            <p className="text-xs font-semibold uppercase tracking-wide text-ink/40">
              {article.searchIntent}
            </p>
          </div>
        )}
        <h1 className="font-display text-xl font-bold text-ink">
          {article.title}
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-ink/60">
          {article.intro}
        </p>
      </div>

      <div className="flex flex-col gap-3">
        {article.examplePrompts.map((example, index) => (
          <div
            key={index}
            className="rounded-xl2 border border-line bg-surface p-4"
          >
            <p className="mb-2 text-sm font-semibold text-ink">
              {example.title}
            </p>
            <p className="whitespace-pre-wrap rounded-lg border border-line bg-paper p-3 font-mono text-[13px] leading-relaxed text-ink">
              {example.body}
            </p>
          </div>
        ))}
      </div>

      {category && (
        <Link
          href={`/create/${category.id}`}
          className="w-full rounded-full bg-ink px-6 py-4 text-center text-base font-semibold text-paper transition-colors hover:bg-signal"
        >
          自分専用のプロンプトを作る
        </Link>
      )}
    </article>
  );
}
