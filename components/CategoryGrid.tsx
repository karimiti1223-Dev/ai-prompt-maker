import Link from "next/link";
import { categories } from "@/lib/categories";

export default function CategoryGrid() {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
      {categories.map((category) => (
        <Link
          key={category.id}
          href={`/create/${category.id}`}
          className="flex flex-col items-center justify-center gap-1 rounded-xl2 border border-gray-200 bg-white px-3 py-5 text-center shadow-sm transition hover:border-brand-300 hover:shadow-md active:scale-[0.98]"
        >
          <span className="text-2xl">{category.emoji}</span>
          <span className="text-sm font-medium text-gray-800">
            {category.label}
          </span>
        </Link>
      ))}
    </div>
  );
}
