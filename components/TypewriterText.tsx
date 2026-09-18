"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  text: string;
  className?: string;
};

// 「AIへの指示文が組み上がっていく」ことを一度だけ演出します。
// 文字数が多いと時間がかかりすぎるため、1回のtickで複数文字ずつ進めます。
export default function TypewriterText({ text, className }: Props) {
  const [visibleCount, setVisibleCount] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const textRef = useRef(text);

  useEffect(() => {
    textRef.current = text;
    setVisibleCount(0);
    setIsDone(false);

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion || !text) {
      setVisibleCount(text.length);
      setIsDone(true);
      return;
    }

    // 全体でおおよそ0.6〜1.2秒に収まるよう、文字数に応じて一度に進める量を調整する
    const step = Math.max(1, Math.ceil(text.length / 60));
    const intervalId = window.setInterval(() => {
      setVisibleCount((current) => {
        const next = current + step;
        if (next >= textRef.current.length) {
          window.clearInterval(intervalId);
          setIsDone(true);
          return textRef.current.length;
        }
        return next;
      });
    }, 16);

    return () => window.clearInterval(intervalId);
  }, [text]);

  return (
    <p className={className}>
      {text.slice(0, visibleCount)}
      {!isDone && (
        <span
          aria-hidden
          className="ml-0.5 inline-block h-4 w-[2px] translate-y-0.5 animate-blink bg-ink align-middle"
        />
      )}
    </p>
  );
}
