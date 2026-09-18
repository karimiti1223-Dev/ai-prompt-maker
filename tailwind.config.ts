import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: "#F2F1EC", // 背景。紙のような落ち着いたオフホワイト
        surface: "#FFFFFF", // カードの面
        ink: "#1B1B18", // 文字色。純黒ではなく少し温かみのある黒
        line: "#DDDAD1", // 罫線・境界線
        signal: "#E4572E", // 唯一のアクセントカラー。CTA・選択状態にのみ使う
        signalDark: "#C7431D",
        success: "#2F6F4F", // コピー完了などの成功表示
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        sans: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      borderRadius: {
        xl2: "0.75rem",
      },
      keyframes: {
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
        "rise-in": {
          "0%": { opacity: "0", transform: "translateY(6px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        blink: "blink 1s step-start infinite",
        "rise-in": "rise-in 0.35s ease-out both",
      },
    },
  },
  plugins: [],
};

export default config;
