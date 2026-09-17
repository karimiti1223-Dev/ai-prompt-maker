import type { Metadata } from "next";
import Header from "@/components/Header";
import "./globals.css";

export const metadata: Metadata = {
  title: "AIプロンプトメーカー | 質問に答えるだけでAIへの指示文が完成",
  description:
    "AIへの頼み方が分からなくても、質問に答えるだけで高品質なプロンプトを作成できます。ChatGPT、Claude、Gemini、画像生成AIなど幅広く対応。",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body>
        <Header />
        <main className="mx-auto min-h-screen max-w-3xl px-4 pb-16 pt-6">
          {children}
        </main>
      </body>
    </html>
  );
}
