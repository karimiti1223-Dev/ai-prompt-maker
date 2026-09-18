import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-10 border-b border-line bg-paper/95 backdrop-blur">
      <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-3">
        <Link
          href="/"
          className="font-display text-base font-bold tracking-tight text-ink"
        >
          AIプロンプトメーカー
        </Link>
        <nav className="flex items-center gap-4 text-sm text-ink/60">
          <Link href="/templates" className="hidden transition-colors hover:text-signal sm:inline">
            テンプレート
          </Link>
          <Link href="/history" className="transition-colors hover:text-signal">
            履歴
          </Link>
          <Link href="/guide" className="transition-colors hover:text-signal">
            使い方
          </Link>
        </nav>
      </div>
    </header>
  );
}
