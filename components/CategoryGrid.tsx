import Link from "next/link";
import { categories } from "@/lib/categories";
import { CategoryIcon } from "./icons";

export default function CategoryGrid() {
  return (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
      {categories.map((category) => (
        <Link
          key={category.id}
          href={`/create/${category.id}`}
          className="group flex flex-col items-start gap-3 rounded-xl2 border border-line bg-surface px-4 py-4 transition-colors hover:border-ink active:scale-[0.98]"
        >
          <CategoryIcon
            categoryId={category.id}
            className="h-5 w-5 text-ink/70 transition-colors group-hover:text-signal"
          />
          <span className="text-sm font-medium text-ink">
            {category.label}
          </span>
        </Link>
      ))}
    </div>
  );
}
