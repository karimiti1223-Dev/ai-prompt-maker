// 生成中に、質問フォームの代わりに画面全体に表示するローディング画面。
export default function GeneratingScreen() {
  return (
    <div className="animate-rise-in flex flex-col items-center gap-6 rounded-xl2 border border-line bg-surface px-6 py-20 text-center">
      <p className="font-mono text-sm text-ink/60">
        AIが指示文を組み立てています…
      </p>
      <div className="h-1.5 w-full max-w-xs overflow-hidden rounded-full bg-line">
        <div className="h-full w-2/5 rounded-full bg-ink animate-progress-slide" />
      </div>
      <p className="text-xs text-ink/40">
        通常は数秒〜十数秒で完了します
      </p>
    </div>
  );
}
