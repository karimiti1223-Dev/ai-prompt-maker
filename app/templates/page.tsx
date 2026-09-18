import Link from "next/link";
import { categories } from "@/lib/categories";
import { getTemplatesByCategory } from "@/lib/templates";
import { CategoryIcon } from "@/components/icons";

export default function TemplatesPage() {
  const categoriesWithTemplates = categories.filter(
    (c) => getTemplatesByCategory(c.id).length > 0
  );

  return (
    <div className="flex flex-col gap-10">
      <div>
        <h1 className="font-display text-xl font-bold text-ink">テンプレート</h1>
        <p className="mt-2 text-sm text-ink/60">
          よくある目的から選ぶと、質問の入力欄にあらかじめ内容が入った状態で始められます。
        </p>
      </div>

      {categoriesWithTemplates.map((category) => {
        const items = getTemplatesByCategory(category.id);
        return (
          <div key={category.id}>
            <h2 className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-ink/40">
              <CategoryIcon categoryId={category.id} className="h-4 w-4" />
              {category.label}
            </h2>
            <div className="flex flex-col gap-2">
              {items.map((template) => (
                <Link
                  key={template.id}
                  href={`/create/${category.id}?template=${template.id}`}
                  className="rounded-xl2 border border-line bg-surface p-4 transition-colors hover:border-ink active:scale-[0.99]"
                >
                  <p className="text-sm font-semibold text-ink">
                    {template.title}
                  </p>
                  <p className="mt-0.5 text-xs text-ink/50">
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
