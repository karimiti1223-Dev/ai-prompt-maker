import CategoryGrid from "@/components/CategoryGrid";

export default function CreateIndexPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-display text-xl font-bold text-ink">
          何にAIを使いますか？
        </h1>
        <p className="mt-1 text-sm text-ink/60">
          カテゴリを選ぶと、質問画面に進みます。
        </p>
      </div>
      <CategoryGrid />
    </div>
  );
}
