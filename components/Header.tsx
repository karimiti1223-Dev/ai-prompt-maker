import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-10 border-b border-gray-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-3">
        <Link href="/" className="text-base font-bold text-brand-700">
          AIプロンプトメーカー
        </Link>
        <nav className="flex items-center gap-3 text-sm text-gray-600">
          <Link href="/templates" className="hidden sm:inline hover:text-brand-600">
            テンプレート
          </Link>
          <Link href="/history" className="hover:text-brand-600">
            履歴
          </Link>
          <Link href="/guide" className="hover:text-brand-600">
            使い方
          </Link>
        </nav>
      </div>
    </header>
  );
}
