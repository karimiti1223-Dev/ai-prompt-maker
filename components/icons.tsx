// 絵文字を使わず、カテゴリごとに意味の伝わる線画アイコンを用意します。
// すべて同じ線の太さ・角の丸みで統一し、AIプロンプトメーカー独自の見た目にしています。

type IconProps = {
  className?: string;
};

const common = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function ChatIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...common}>
      <path d="M4 5.5h16v10H9.5L5 19v-3.5H4v-10Z" />
      <path d="M8 9.5h8M8 12.5h5" />
    </svg>
  );
}

export function SparkIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...common}>
      <path d="M12 3v5M12 16v5M3 12h5M16 12h5M6.5 6.5l3 3M14.5 14.5l3 3M17.5 6.5l-3 3M9.5 14.5l-3 3" />
    </svg>
  );
}

export function TwinIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...common}>
      <path d="M9 4 5 12l4 8 4-8-4-8Z" />
      <path d="M17 8l-2.5 4 2.5 4 2.5-4-2.5-4Z" />
    </svg>
  );
}

export function ImageIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...common}>
      <rect x="3.5" y="5" width="17" height="14" rx="1" />
      <circle cx="9" cy="10" r="1.5" />
      <path d="M3.5 16.5 9 12l3 2.5 3-3.5 5.5 5.5" />
    </svg>
  );
}

export function PlayIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...common}>
      <rect x="3.5" y="5" width="17" height="14" rx="1" />
      <path d="M10.5 9.5v5l4-2.5-4-2.5Z" />
    </svg>
  );
}

export function CodeIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...common}>
      <path d="M9 8.5 4.5 12 9 15.5M15 8.5l4.5 3.5-4.5 3.5M13.5 6l-3 12" />
    </svg>
  );
}

export function DiceIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...common}>
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <circle cx="8.5" cy="8.5" r="1" fill="currentColor" stroke="none" />
      <circle cx="15.5" cy="8.5" r="1" fill="currentColor" stroke="none" />
      <circle cx="12" cy="12" r="1" fill="currentColor" stroke="none" />
      <circle cx="8.5" cy="15.5" r="1" fill="currentColor" stroke="none" />
      <circle cx="15.5" cy="15.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function PenIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...common}>
      <path d="M5 19l1-4L15.5 5.5a1.6 1.6 0 0 1 2.3 0l0.7.7a1.6 1.6 0 0 1 0 2.3L9 19l-4 1Z" />
      <path d="M13.5 7.5l3 3" />
    </svg>
  );
}

export function BookIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...common}>
      <path d="M4 5.5c2-1 5-1 7 0v13c-2-1-5-1-7 0v-13Z" />
      <path d="M20 5.5c-2-1-5-1-7 0v13c2-1 5-1 7 0v-13Z" />
    </svg>
  );
}

export function BriefcaseIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...common}>
      <rect x="3.5" y="8" width="17" height="11" rx="1.5" />
      <path d="M8.5 8V6a1.5 1.5 0 0 1 1.5-1.5h4A1.5 1.5 0 0 1 15.5 6v2M3.5 13h17" />
    </svg>
  );
}

export function BurstIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...common}>
      <circle cx="12" cy="12" r="3.5" />
      <path d="M12 3.5v2M12 18.5v2M3.5 12h2M18.5 12h2M6 6l1.4 1.4M16.6 16.6 18 18M18 6l-1.4 1.4M7.4 16.6 6 18" />
    </svg>
  );
}

const iconByCategory: Record<string, (props: IconProps) => JSX.Element> = {
  chatgpt: ChatIcon,
  claude: SparkIcon,
  gemini: TwinIcon,
  "image-generation": ImageIcon,
  "video-generation": PlayIcon,
  programming: CodeIcon,
  "game-development": DiceIcon,
  writing: PenIcon,
  study: BookIcon,
  work: BriefcaseIcon,
  idea: BurstIcon,
};

export function CategoryIcon({
  categoryId,
  className,
}: {
  categoryId: string;
  className?: string;
}) {
  const Icon = iconByCategory[categoryId] ?? SparkIcon;
  return <Icon className={className} />;
}
