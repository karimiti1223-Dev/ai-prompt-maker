import CategoryGrid from "@/components/CategoryGrid";

export default function CreateIndexPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-xl font-bold text-gray-900">
          何にAIを使いますか？
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          カテゴリを選ぶと、質問画面に進みます。
        </p>
      </div>
      <CategoryGrid />
    </div>
  );
}
