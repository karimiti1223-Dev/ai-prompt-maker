import Link from "next/link";

const guideLinks = [
  {
    href: "/guide/how-to-write",
    title: "良いプロンプトの作り方",
    description: "AIに伝わりやすい指示文の基本を解説します。",
  },
  {
    href: "/guide/tips",
    title: "AIへの質問のコツ",
    description: "回答の質を上げるための小さな工夫を紹介します。",
  },
];

export default function GuideIndexPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-xl font-bold text-gray-900">プロンプトってなに？</h1>
        <p className="mt-2 text-sm leading-relaxed text-gray-600">
          「プロンプト」とは、ChatGPTやClaude、Geminiなどの AI
          に送る指示文のことです。人に何かをお願いするときと同じで、
          「誰に」「何を」「どんな形で」頼むかによって、返ってくる答えの質が大きく変わります。
        </p>
        <p className="mt-3 text-sm leading-relaxed text-gray-600">
          このサービスは、その「何を」「どんな形で」の部分を質問形式で整理し、
          AIに伝わりやすいプロンプトを自動で組み立てるツールです。
        </p>
      </div>

      <div className="flex flex-col gap-3">
        {guideLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="rounded-xl2 border border-gray-200 bg-white p-4 transition hover:border-brand-300 hover:shadow-md"
          >
            <p className="text-sm font-semibold text-gray-800">{link.title}</p>
            <p className="mt-0.5 text-xs text-gray-500">{link.description}</p>
          </Link>
        ))}
      </div>

      <Link
        href="/create"
        className="w-full rounded-full bg-brand-600 px-6 py-4 text-center text-base font-bold text-white shadow-md transition hover:bg-brand-700"
      >
        早速プロンプトを作ってみる
      </Link>
    </div>
  );
}
