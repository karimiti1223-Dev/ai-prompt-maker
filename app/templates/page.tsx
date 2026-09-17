import Link from "next/link";
import { categories } from "@/lib/categories";
import { getTemplatesByCategory } from "@/lib/templates";

export default function TemplatesPage() {
  const categoriesWithTemplates = categories.filter(
    (c) => getTemplatesByCategory(c.id).length > 0
  );

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-xl font-bold text-gray-900">テンプレート</h1>
        <p className="mt-1 text-sm text-gray-500">
          よくある目的から選ぶと、質問の入力欄にあらかじめ内容が入った状態で始められます。
        </p>
      </div>

      {categoriesWithTemplates.map((category) => {
        const items = getTemplatesByCategory(category.id);
        return (
          <div key={category.id}>
            <h2 className="mb-2 flex items-center gap-1 text-sm font-semibold text-gray-700">
              <span>{category.emoji}</span>
              <span>{category.label}</span>
            </h2>
            <div className="flex flex-col gap-2">
              {items.map((template) => (
                <Link
                  key={template.id}
                  href={`/create/${category.id}?template=${template.id}`}
                  className="rounded-xl2 border border-gray-200 bg-white p-4 transition hover:border-brand-300 hover:shadow-md active:scale-[0.99]"
                >
                  <p className="text-sm font-semibold text-gray-800">
                    {template.title}
                  </p>
                  <p className="mt-0.5 text-xs text-gray-500">
                    {template.description}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
