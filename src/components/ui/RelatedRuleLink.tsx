'use client';

import { usePresentationContext } from '@/context/presentation';

export interface RelatedRuleLinkProps {
  /** ジャンプ先スライドの id（seminarSlideRegistry の id と一致させる） */
  targetId: string;
  /** ボタンに表示するラベル */
  label: string;
  /** アクセントカラー（HEX） */
  accent?: string;
  className?: string;
}

/**
 * 関連規程リンク — 別スライドへ相互ジャンプする「鎖（リンク）マーク」付きボタン。
 *
 * 例: p38「アカウントごとのアクセス制限」⇄ p42「SSO連携（技術的）」を双方向に接続。
 * クリックで `usePresentationContext().goToId(targetId)` を呼び該当スライドへ移動する。
 */
export default function RelatedRuleLink({
  targetId,
  label,
  accent = '#88bbff',
  className = '',
}: RelatedRuleLinkProps) {
  const { goToId } = usePresentationContext();

  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        goToId(targetId);
      }}
      className={`group inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border font-semibold transition-all w-fit max-w-full ${className}`}
      style={{
        color: accent,
        borderColor: `${accent}66`,
        background: `${accent}14`,
        fontSize: 'clamp(10px, 0.8vw, 12px)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = `${accent}26`;
        e.currentTarget.style.borderColor = `${accent}aa`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = `${accent}14`;
        e.currentTarget.style.borderColor = `${accent}66`;
      }}
      aria-label={`関連規程へ移動: ${label}`}
    >
      {/* 鎖（リンク）マーク */}
      <svg
        width="13"
        height="13"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
        className="shrink-0 transition-transform group-hover:rotate-12"
      >
        <path d="M9 17H7A5 5 0 0 1 7 7h2" />
        <path d="M15 7h2a5 5 0 1 1 0 10h-2" />
        <line x1="8" y1="12" x2="16" y2="12" />
      </svg>
      <span className="truncate">{label}</span>
    </button>
  );
}
