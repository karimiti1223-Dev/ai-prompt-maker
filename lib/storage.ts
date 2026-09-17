import { SavedPrompt } from "@/types";

// ログイン機能なしで履歴・お気に入りを実現するため、ブラウザのlocalStorageを使います。
// キー名は他のサービスと衝突しないように接頭辞をつけています。
const HISTORY_KEY = "ai-prompt-maker:history";

// サーバー(Node.js)側ではwindowが存在しないため、必ずこのチェックを通す。
function isBrowser(): boolean {
  return typeof window !== "undefined";
}

export function getHistory(): SavedPrompt[] {
  if (!isBrowser()) return [];
  try {
    const raw = window.localStorage.getItem(HISTORY_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as SavedPrompt[];
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.error("履歴の読み込みに失敗しました:", error);
    return [];
  }
}

function saveHistory(history: SavedPrompt[]) {
  if (!isBrowser()) return;
  window.localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
}

export function addPromptToHistory(
  categoryId: string,
  content: string
): SavedPrompt {
  const newItem: SavedPrompt = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    categoryId,
    content,
    createdAt: new Date().toISOString(),
    isFavorite: false,
  };
  const history = getHistory();
  // 新しいものを先頭に。保存しすぎないよう直近50件までに制限。
  const updated = [newItem, ...history].slice(0, 50);
  saveHistory(updated);
  return newItem;
}

export function toggleFavorite(id: string): void {
  const history = getHistory();
  const updated = history.map((item) =>
    item.id === id ? { ...item, isFavorite: !item.isFavorite } : item
  );
  saveHistory(updated);
}

export function deleteFromHistory(id: string): void {
  const history = getHistory();
  const updated = history.filter((item) => item.id !== id);
  saveHistory(updated);
}
