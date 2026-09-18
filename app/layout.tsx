import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import Header from "@/components/Header";
import "./globals.css";

// 見出し・ロゴ用: 幾何学的で少し無機質な、AIツールらしい書体
const displayFont = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "700"],
});

// 本文・UI用: 日本語は自動でシステムフォントにフォールバックする
const bodyFont = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600"],
});

// 生成されたプロンプト表示専用: 「AIに渡す指示文」であることを視覚的に示す等幅体
const monoFont = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500"],
});

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
    <html
      lang="ja"
      className={`${displayFont.variable} ${bodyFont.variable} ${monoFont.variable}`}
    >
      <body>
        <Header />
        <main className="mx-auto min-h-screen max-w-3xl px-4 pb-16 pt-6">
          {children}
        </main>
      </body>
    </html>
  );
}
