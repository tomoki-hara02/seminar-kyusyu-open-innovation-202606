'use client';

import { useCallback, useEffect, useId, useMemo, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import type { SlideEntry } from '@/config/slide-entry';
import InternalRulesTocStrip from '@/components/InternalRulesTocStrip';
import { buildRulesTocSlideIndexMap } from '@/lib/internal-rules-navigation';

const TRIGGER_BASE_CLASS =
  'flex shrink-0 items-center gap-2 px-3 py-2 rounded-xl border transition-all duration-200 text-xs font-medium tracking-wide';

interface InternalRulesTocOverlayProps {
  entries: SlideEntry[];
  currentIndex: number;
  isOpen: boolean;
  onToggle: () => void;
  onNavigate: (index: number) => void;
  /** 親のツールバー内に並べるときは true（fixed 配置しない） */
  inlineTrigger?: boolean;
}

export default function InternalRulesTocOverlay({
  entries,
  currentIndex,
  isOpen,
  onToggle,
  onNavigate,
  inlineTrigger = false,
}: InternalRulesTocOverlayProps) {
  const dialogId = useId();
  const dialogTitleId = `${dialogId}-title`;
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const rulesSlideIndexMap = useMemo(
    () => buildRulesTocSlideIndexMap(entries),
    [entries]
  );

  const currentRulesToc = entries[currentIndex]?.rulesToc;

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

  useEffect(() => {
    if (isOpen) {
      const t = setTimeout(() => closeButtonRef.current?.focus(), 50);
      return () => clearTimeout(t);
    }
    triggerRef.current?.focus();
  }, [isOpen]);

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

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onToggle();
        }}
        aria-label={isOpen ? '社内規程目次を閉じる' : '社内規程目次を開く'}
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
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
          <path strokeLinecap="round" d="M2 4h12M2 8h12M2 12h8" />
          <circle cx="12.5" cy="12" r="2.5" fill="currentColor" stroke="none" />
        </svg>
        <span className="hidden sm:inline">社内規程目次</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              key="rules-toc-backdrop"
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
              key="rules-toc-panel"
              ref={panelRef}
              id={dialogId}
              role="dialog"
              aria-modal="true"
              aria-labelledby={dialogTitleId}
              className="fixed inset-x-0 top-0 bottom-0 z-50 flex flex-col"
              style={{ maxWidth: 720, margin: '0 auto' }}
              initial={{ opacity: 0, y: -24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -24 }}
              transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
              onClick={(e) => e.stopPropagation()}
              onKeyDown={handleTrapTab}
            >
              <div className="flex items-center justify-between px-6 pt-6 pb-4 shrink-0">
                <span
                  id={dialogTitleId}
                  className="text-white font-semibold tracking-tight text-lg"
                >
                  社内規程目次
                </span>
                <button
                  ref={closeButtonRef}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggle();
                  }}
                  className="p-2 rounded-lg text-white/40 hover:text-white hover:bg-white/10 transition-all"
                  aria-label="社内規程目次を閉じる"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                    <path strokeLinecap="round" d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="flex-1 overflow-y-auto px-6 pb-8 scrollbar-thin">
                <InternalRulesTocStrip
                  currentRulesToc={currentRulesToc}
                  slideIndexByRuleId={rulesSlideIndexMap}
                  onNavigate={(index) => {
                    onNavigate(index);
                    onToggle();
                  }}
                  embedded={false}
                />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
