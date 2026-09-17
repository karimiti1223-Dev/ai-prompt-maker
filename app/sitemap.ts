import { MetadataRoute } from "next";
import { articles } from "@/lib/articles";
import { categories } from "@/lib/categories";

// デプロイ後は、実際に公開するURLに書き換えてください(例: https://ai-prompt-maker.vercel.app)
const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    "",
    "/create",
    "/improve",
    "/templates",
    "/history",
    "/guide",
    "/guide/how-to-write",
    "/guide/tips",
  ].map((path) => ({
    url: `${BASE_URL}${path}`,
    lastModified: new Date(),
  }));

  const categoryPages = categories.map((category) => ({
    url: `${BASE_URL}/create/${category.id}`,
    lastModified: new Date(),
  }));

  const articlePages = articles.map((article) => ({
    url: `${BASE_URL}/prompt/${article.slug}`,
    lastModified: new Date(),
  }));

  return [...staticPages, ...categoryPages, ...articlePages];
}
