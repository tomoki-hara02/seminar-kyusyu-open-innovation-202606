'use client';

import { useEffect, useCallback, useId, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import type { SlideEntry } from '@/config/slide-entry';

// ─── helpers ──────────────────────────────────────────────────────────────────

/**
 * `title` が未設定のときのフォールバック表示名。
 * コンポーネント関数名（PascalCase）を読みやすい英語表記に変換する。
 *   "LiveInference"  → "Live Inference"
 *   "QAClosing"      → "QA Closing"
 *   "Cube3D"         → "Cube 3D"
 */
function fallbackName(entry: SlideEntry): string {
  const raw =
    (entry.Component as { displayName?: string }).displayName ??
    entry.Component.name ??
    entry.id;
  return raw
    .replace(/([a-z\d])([A-Z])/g, '$1 $2')
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1 $2')
    .trim();
}

function entryLabel(entry: SlideEntry): string {
  return entry.title ?? fallbackName(entry);
}

// ─── chapter labels ───────────────────────────────────────────────────────────

interface ChapterLabel {
  /** 章番号やキーを表す英字表記（例: "Opening" / "Chapter 01"） */
  display: string;
  /** 章の和文サブタイトル */
  subtitle?: string;
}

/**
 * 章キー（`SlideEntry.chapter`）→ 表示用ラベルのマップ。
 * 未登録キーが来た場合は `chapter` 文字列をそのまま英字表記として扱う。
 */
const CHAPTER_LABELS: Record<string, ChapterLabel> = {
  opening: { display: 'Opening', subtitle: 'イントロダクション' },
  'chapter-01': { display: 'Chapter 01', subtitle: '生成AI活用プランの作成' },
  'chapter-02-front': { display: 'Chapter 02 前編', subtitle: '生成AI社内規程 — 全体像' },
  'chapter-02-back':  { display: 'Chapter 02 後編', subtitle: '生成AI社内規程 — 各論' },
  'chapter-03': {
    display: 'Chapter 03',
    subtitle: 'その他生成AIに関する法的論点',
  },
  closing: { display: 'Closing', subtitle: '本セミナーのまとめ' },
};

// ─── fallback categories（chapter 未設定時の旧グルーピング）────────────────────

interface CategoryBoundary {
  fromIndex: number;
  label: string;
}

const FALLBACK_CATEGORIES: CategoryBoundary[] = [
  { fromIndex: 0, label: 'Core Slides' },
  { fromIndex: 21, label: 'Extra Materials' },
  { fromIndex: 31, label: 'Dev Tools' },
  { fromIndex: 38, label: 'Endings' },
  { fromIndex: 43, label: 'Speaker · Office' },
];

interface ChapterGroup {
  key: string;
  display: string;
  subtitle?: string;
  fromIndex: number;
  entries: { entry: SlideEntry; globalIndex: number }[];
}

/**
 * `entries` を `chapter` キー単位でグルーピングする。
 * `chapter` が一つも設定されていない場合は `null` を返し、呼び出し側で旧仕様に
 * フォールバックする。
 */
function groupByChapter(entries: SlideEntry[]): ChapterGroup[] | null {
  const hasChapter = entries.some((e) => !!e.chapter);
  if (!hasChapter) return null;

  const groups: ChapterGroup[] = [];
  let current: ChapterGroup | null = null;

  entries.forEach((entry, idx) => {
    const key = entry.chapter ?? '__misc__';
    if (!current || current.key !== key) {
      const label = CHAPTER_LABELS[key] ?? { display: key };
      current = {
        key,
        display: label.display,
        subtitle: label.subtitle,
        fromIndex: idx,
        entries: [],
      };
      groups.push(current);
    }
    current.entries.push({ entry, globalIndex: idx });
  });

  return groups;
}

// ─── props ────────────────────────────────────────────────────────────────────

const TRIGGER_BASE_CLASS =
  'flex shrink-0 items-center gap-2 px-3 py-2 rounded-xl border transition-all duration-200 text-xs font-medium tracking-wide';

interface TableOfContentsProps {
  entries: SlideEntry[];
  currentIndex: number;
  onNavigate: (index: number) => void;
  isOpen: boolean;
  onToggle: () => void;
  onShowBreak: () => void;
  /** 親のツールバー内に並べるときは true（fixed 配置しない） */
  inlineTrigger?: boolean;
}

// ─── TOC overlay ──────────────────────────────────────────────────────────────

export default function TableOfContents({
  entries,
  currentIndex,
  onNavigate,
  isOpen,
  onToggle,
  onShowBreak,
  inlineTrigger = false,
}: TableOfContentsProps) {
  const dialogId = useId();
  const dialogTitleId = `${dialogId}-title`;
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  const chapters = useMemo(() => groupByChapter(entries), [entries]);

  const currentChapterKey = useMemo(() => {
    if (!chapters) return null;
    const found = chapters.find((c) =>
      c.entries.some((e) => e.globalIndex === currentIndex)
    );
    return found?.key ?? chapters[0]?.key ?? null;
  }, [chapters, currentIndex]);

  // 章ナビでフィルタするカレント章（null = 全章表示）
  const [activeChapter, setActiveChapter] = useState<string | null>(null);

  // パネルを開いた瞬間、現在いる章にフォーカスを合わせる
  useEffect(() => {
    if (isOpen) setActiveChapter(null);
  }, [isOpen]);

  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onToggle();
    },
    [isOpen, onToggle]
  );
  useEffect(() => {
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [handleKey]);

  // パネル開閉時のフォーカス管理
  useEffect(() => {
    if (isOpen) {
      const t = setTimeout(() => closeButtonRef.current?.focus(), 50);
      return () => clearTimeout(t);
    }
    triggerRef.current?.focus();
  }, [isOpen]);

  // 開いたら現在のスライドの章セクションが画面上部に来るようスクロール
  useEffect(() => {
    if (!isOpen || !chapters || !currentChapterKey) return;
    const t = setTimeout(() => {
      const node = sectionRefs.current[currentChapterKey];
      if (node && scrollRef.current) {
        scrollRef.current.scrollTo({
          top: node.offsetTop - 8,
          behavior: 'smooth',
        });
      }
    }, 220);
    return () => clearTimeout(t);
  }, [isOpen, chapters, currentChapterKey]);

  // Focus trap（Tab を Modal 内に閉じ込める）
  const handleTrapTab = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.key !== 'Tab' || !panelRef.current) return;
      const focusables = panelRef.current.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const active = document.activeElement;
      if (e.shiftKey && active === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    },
    []
  );

  // 章ナビ → 該当章へスクロール（or その章だけ表示）
  const handleChapterJump = useCallback(
    (key: string) => {
      setActiveChapter((prev) => (prev === key ? null : key));
      const node = sectionRefs.current[key];
      if (node && scrollRef.current) {
        scrollRef.current.scrollTo({
          top: node.offsetTop - 8,
          behavior: 'smooth',
        });
      }
    },
    []
  );

  const visibleChapters = useMemo(() => {
    if (!chapters) return null;
    if (!activeChapter) return chapters;
    return chapters.filter((c) => c.key === activeChapter);
  }, [chapters, activeChapter]);

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onToggle();
        }}
        aria-label={isOpen ? '目次を閉じる' : '目次を開く'}
        aria-expanded={isOpen}
        aria-controls={dialogId}
        className={`${TRIGGER_BASE_CLASS} ${
          inlineTrigger ? '' : 'fixed top-6 left-6 z-30'
        } ${
          isOpen
            ? 'bg-white/10 border-white/30 text-white'
            : 'bg-white/5 border-white/10 text-white/50 hover:bg-white/10 hover:text-white/80 hover:border-white/20'
        }`}
      >
        <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
          <rect x="1" y="1" width="6" height="6" rx="1" />
          <rect x="9" y="1" width="6" height="6" rx="1" />
          <rect x="1" y="9" width="6" height="6" rx="1" />
          <rect x="9" y="9" width="6" height="6" rx="1" />
        </svg>
        <span className="hidden sm:inline">目次</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              key="toc-backdrop"
              className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => {
                e.stopPropagation();
                onToggle();
              }}
              aria-hidden="true"
            />

            <motion.div
              key="toc-panel"
              ref={panelRef}
              id={dialogId}
              role="dialog"
              aria-modal="true"
              aria-labelledby={dialogTitleId}
              className="fixed inset-x-0 top-0 bottom-0 z-50 flex flex-col"
              style={{ maxWidth: 1040, margin: '0 auto' }}
              initial={{ opacity: 0, y: -24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -24 }}
              transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
              onClick={(e) => e.stopPropagation()}
              onKeyDown={handleTrapTab}
            >
              {/* ── ヘッダー ── */}
              <div className="flex items-center justify-between px-6 pt-6 pb-3 shrink-0">
                <div className="flex items-baseline gap-3">
                  <span
                    id={dialogTitleId}
                    className="text-white font-semibold tracking-tight text-lg"
                  >
                    目次
                  </span>
                  <span className="text-[11px] text-white/30 font-mono tabular-nums">
                    {entries.length} slides
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onShowBreak();
                      onToggle();
                    }}
                    className="flex items-center gap-2 px-3 py-2 rounded-xl border border-white/10 bg-white/5
                      text-white/60 text-xs font-medium tracking-wide
                      hover:bg-white/10 hover:text-white hover:border-white/20 transition-all duration-200"
                    aria-label="休憩スライドを表示"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                      <circle cx="12" cy="12" r="9" />
                      <path strokeLinecap="round" d="M12 7v5l3 2" />
                    </svg>
                    <span>休憩</span>
                  </button>
                  <button
                    ref={closeButtonRef}
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggle();
                    }}
                    className="p-2 rounded-lg text-white/40 hover:text-white hover:bg-white/10 transition-all"
                    aria-label="目次を閉じる"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                      <path strokeLinecap="round" d="M18 6L6 18M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* ── 章ナビ（Opening → Chapter 01 → ...） ── */}
              {chapters && (
                <div className="px-6 pb-4 shrink-0">
                  <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-thin pb-1">
                    {chapters.map((c, i) => {
                      const isCurrentChapter = c.key === currentChapterKey;
                      const isActive = activeChapter === c.key;
                      return (
                        <div key={c.key} className="flex items-center gap-1.5 shrink-0">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleChapterJump(c.key);
                            }}
                            aria-pressed={isActive}
                            className={`group flex flex-col items-start gap-0.5 px-3 py-1.5 rounded-lg border text-left transition-all duration-150
                              ${
                                isActive
                                  ? 'bg-white/15 border-white/40 text-white'
                                  : isCurrentChapter
                                  ? 'bg-white/8 border-white/25 text-white/90 hover:bg-white/12'
                                  : 'bg-white/[0.03] border-white/8 text-white/55 hover:bg-white/[0.08] hover:border-white/20 hover:text-white/85'
                              }`}
                          >
                            <span className="flex items-center gap-1.5">
                              <span className="text-[11px] font-semibold tracking-wide">
                                {c.display}
                              </span>
                              {isCurrentChapter && (
                                <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B9D]" aria-hidden="true" />
                              )}
                            </span>
                            {c.subtitle && (
                              <span className="text-[10px] text-white/45 leading-tight whitespace-nowrap">
                                {c.subtitle}
                              </span>
                            )}
                          </button>
                          {i < chapters.length - 1 && (
                            <span
                              className="text-white/25 text-sm select-none"
                              aria-hidden="true"
                            >
                              →
                            </span>
                          )}
                        </div>
                      );
                    })}
                    {activeChapter && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveChapter(null);
                        }}
                        className="ml-2 shrink-0 text-[10px] tracking-wider uppercase text-white/40 hover:text-white/80 transition-colors px-2 py-1 rounded-md border border-white/10 hover:border-white/30"
                      >
                        All
                      </button>
                    )}
                  </div>
                </div>
              )}

              {/* ── スクロール領域 ── */}
              <div
                ref={scrollRef}
                className="flex-1 overflow-y-auto px-6 pb-8 scrollbar-thin"
              >
                {chapters && visibleChapters ? (
                  visibleChapters.map((chapter) => (
                    <section
                      key={chapter.key}
                      ref={(el) => {
                        sectionRefs.current[chapter.key] = el;
                      }}
                      className="mb-8 scroll-mt-2"
                    >
                      {/* 章ヘッダー */}
                      <div className="flex items-baseline gap-3 mb-3 sticky top-0 z-[1] bg-black/60 backdrop-blur-md py-2 -mx-2 px-2 rounded-md">
                        <span className="text-[11px] font-semibold tracking-[0.24em] uppercase text-white/70">
                          {chapter.display}
                        </span>
                        {chapter.subtitle && (
                          <span className="text-[12px] text-white/45">
                            {chapter.subtitle}
                          </span>
                        )}
                        <span className="ml-auto text-[10px] font-mono tabular-nums text-white/30">
                          {chapter.entries.length} slides
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {chapter.entries.map(({ entry, globalIndex }) => {
                          const isCurrent = globalIndex === currentIndex;
                          const label = entryLabel(entry);
                          return (
                            <button
                              key={entry.id}
                              type="button"
                              onClick={() => {
                                onNavigate(globalIndex);
                                onToggle();
                              }}
                              aria-current={isCurrent ? 'page' : undefined}
                              aria-label={`スライド ${globalIndex + 1}: ${label}`}
                              className={`group relative flex items-start gap-3 p-3 rounded-xl
                                border text-left transition-all duration-150
                                ${
                                  isCurrent
                                    ? 'bg-white/10 border-white/30 text-white'
                                    : 'bg-white/[0.03] border-white/8 text-white/75 hover:bg-white/[0.07] hover:border-white/20 hover:text-white'
                                }`}
                            >
                              {/* ナンバー（左） */}
                              <span
                                className={`shrink-0 mt-0.5 text-[11px] font-mono tabular-nums w-7 text-right
                                  ${isCurrent ? 'text-white/70' : 'text-white/30 group-hover:text-white/50'}`}
                              >
                                {String(globalIndex + 1).padStart(2, '0')}
                              </span>

                              <div className="flex-1 min-w-0 flex flex-col gap-0.5">
                                {/* 日本語タイトル */}
                                <span className="text-[13px] font-medium leading-snug break-words">
                                  {label}
                                </span>
                                {/* 補助情報 */}
                                {entry.background && (
                                  <span className="text-[10px] tracking-wide text-white/30 uppercase">
                                    ✦ {entry.background}
                                  </span>
                                )}
                              </div>

                              {/* 現在のスライド印 */}
                              {isCurrent && (
                                <span
                                  className="absolute top-2.5 right-2.5 w-1.5 h-1.5 rounded-full bg-[#FF6B9D]"
                                  aria-hidden="true"
                                />
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </section>
                  ))
                ) : (
                  // ── 旧仕様（chapter 未設定）フォールバック ──
                  FALLBACK_CATEGORIES.map((cat, ci) => {
                    const catEntries = entries.slice(
                      cat.fromIndex,
                      FALLBACK_CATEGORIES[ci + 1]?.fromIndex ?? entries.length
                    );
                    return (
                      <section key={cat.label} className="mb-8">
                        <p className="text-[10px] tracking-[0.28em] uppercase text-white/30 mb-3">
                          {cat.label}
                        </p>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                          {catEntries.map((entry, localIdx) => {
                            const globalIdx = cat.fromIndex + localIdx;
                            const isCurrent = globalIdx === currentIndex;
                            const name = entryLabel(entry);
                            return (
                              <button
                                key={entry.id}
                                type="button"
                                onClick={() => {
                                  onNavigate(globalIdx);
                                  onToggle();
                                }}
                                aria-current={isCurrent ? 'page' : undefined}
                                aria-label={`スライド ${globalIdx + 1}: ${name}`}
                                className={`group relative flex flex-col items-start gap-1.5 p-3 rounded-xl
                                  border text-left transition-all duration-150
                                  ${
                                    isCurrent
                                      ? 'bg-white/10 border-white/30 text-white'
                                      : 'bg-white/[0.03] border-white/8 text-white/60 hover:bg-white/[0.07] hover:border-white/20 hover:text-white/90'
                                  }`}
                              >
                                {isCurrent && (
                                  <span className="absolute top-2.5 right-2.5 w-1.5 h-1.5 rounded-full bg-white" />
                                )}
                                <span className={`text-[10px] font-mono tabular-nums ${isCurrent ? 'text-white/50' : 'text-white/25'}`}>
                                  {String(globalIdx + 1).padStart(2, '0')}
                                </span>
                                <span className="text-[13px] font-medium leading-snug">
                                  {name}
                                </span>
                                {entry.background && (
                                  <span className="text-[9px] tracking-wide text-white/25 uppercase">
                                    ✦ {entry.background}
                                  </span>
                                )}
                              </button>
                            );
                          })}
                        </div>
                      </section>
                    );
                  })
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
