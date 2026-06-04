'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SlideWrapper from '../../SlideWrapper';

/**
 * p34: 1-2 利用目的 — 使用可能な領域と関連規程
 *
 * クリックで関連規程を適用し、内側の使用可能領域が狭まるギミック。
 */

const USABLE_ACCENT = '#9ee0a8';
const CHAPTER_ACCENT = '#60a5fa';
const STEP_LOCK_MS = 520;
const INSET_TRANSITION = { duration: 0.48, ease: [0.4, 0, 0.2, 1] as const };

type Edge = 'top' | 'right' | 'bottom' | 'left';

interface RegulationConstraint {
  id: string;
  name: string;
  shortNote: string;
  edge: Edge;
  insetPct: number;
  accent: string;
}

const REGULATIONS: RegulationConstraint[] = [
  {
    id: 'privacy',
    name: 'プライバシーポリシー',
    shortNote: '個人情報の利用目的・取扱い範囲',
    edge: 'top',
    insetPct: 13,
    accent: '#c8a8ff',
  },
  {
    id: 'tos',
    name: '利用規約',
    shortNote: '生成AI・SaaS 等のサービス上限',
    edge: 'right',
    insetPct: 15,
    accent: '#88bbff',
  },
  {
    id: 'security',
    name: 'セキュリティ',
    shortNote: '情報セキュリティポリシー・秘密情報の取扱い',
    edge: 'bottom',
    insetPct: 13,
    accent: '#f7c46c',
  },
  {
    id: 'partner-contract',
    name: '取引先との契約関係',
    shortNote: '取引先との秘匿義務・利用範囲の制約',
    edge: 'left',
    insetPct: 16,
    accent: '#9ee0a8',
  },
  {
    id: 'work-rules',
    name: '就業規則・社内倫理規程',
    shortNote: '職務上の利用範囲・禁止行為',
    edge: 'top',
    insetPct: 9,
    accent: '#ff7aa8',
  },
];

const REGULATION_COUNT = REGULATIONS.length;

function cumulativeInsets(activeCount: number) {
  let top = 0;
  let right = 0;
  let bottom = 0;
  let left = 0;

  for (let i = 0; i < activeCount; i++) {
    const reg = REGULATIONS[i];
    switch (reg.edge) {
      case 'top':
        top += reg.insetPct;
        break;
      case 'right':
        right += reg.insetPct;
        break;
      case 'bottom':
        bottom += reg.insetPct;
        break;
      case 'left':
        left += reg.insetPct;
        break;
    }
  }

  return { top, right, bottom, left };
}

function edgeOffsetBefore(index: number): number {
  const edge = REGULATIONS[index].edge;
  let offset = 0;
  for (let i = 0; i < index; i++) {
    if (REGULATIONS[i].edge === edge) offset += REGULATIONS[i].insetPct;
  }
  return offset;
}

function ConstraintBand({ reg, index }: { reg: RegulationConstraint; index: number }) {
  const offset = edgeOffsetBefore(index);
  const base =
    'absolute flex items-center justify-center overflow-hidden border backdrop-blur-sm px-2 py-1.5 text-center leading-snug pointer-events-none';

  const style = {
    borderColor: `${reg.accent}55`,
    background: `linear-gradient(135deg, ${reg.accent}28 0%, ${reg.accent}08 100%)`,
    boxShadow: `inset 0 0 24px ${reg.accent}18`,
  };

  const label = (
    <>
      <p
        className="font-bold text-white leading-tight"
        style={{ fontSize: 'clamp(13px, 0.95vw, 14px)' }}
      >
        {reg.name}
      </p>
      <p
        className="text-white/55 mt-0.5"
        style={{ fontSize: 'clamp(10px, 0.78vw, 11px)' }}
      >
        {reg.shortNote}
      </p>
    </>
  );

  const bandTransition = { duration: 0.4, ease: 'easeOut' as const };

  switch (reg.edge) {
    case 'top':
      return (
        <motion.div
          className={`${base} left-0 right-0 border-b`}
          style={{ ...style, top: `${offset}%`, height: `${reg.insetPct}%` }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={bandTransition}
        >
          {label}
        </motion.div>
      );
    case 'right':
      return (
        <motion.div
          className={`${base} top-0 bottom-0 border-l`}
          style={{ ...style, right: `${offset}%`, width: `${reg.insetPct}%` }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={bandTransition}
        >
          <div className="max-w-[8rem]">{label}</div>
        </motion.div>
      );
    case 'bottom':
      return (
        <motion.div
          className={`${base} left-0 right-0 border-t`}
          style={{ ...style, bottom: `${offset}%`, height: `${reg.insetPct}%` }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={bandTransition}
        >
          {label}
        </motion.div>
      );
    case 'left':
      return (
        <motion.div
          className={`${base} top-0 bottom-0 border-r`}
          style={{ ...style, left: `${offset}%`, width: `${reg.insetPct}%` }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={bandTransition}
        >
          <div className="max-w-[8rem]">{label}</div>
        </motion.div>
      );
  }
}

function UsableAreaDiagram({ activeCount }: { activeCount: number }) {
  const insets = useMemo(() => cumulativeInsets(activeCount), [activeCount]);
  const isInitial = activeCount === 0;
  const isFinished = activeCount >= REGULATION_COUNT;
  const activeRegs = useMemo(
    () => REGULATIONS.slice(0, activeCount),
    [activeCount]
  );

  return (
    <div className="flex flex-col gap-2 w-full h-full min-h-0 pointer-events-none">
      <p
        className="font-bold text-white/90 tracking-wide shrink-0"
        style={{ fontSize: 'clamp(14px, 1.35vw, 20px)' }}
      >
        生成AI使用可能な領域
        {isFinished && (
          <span
            className="text-white/45 font-normal ml-2"
            style={{ fontSize: 'clamp(13px, 0.9vw, 14px)' }}
          >
            → 社内で設定できる利用目的
          </span>
        )}
      </p>

      <div
        className="relative flex-1 min-h-[14rem] md:min-h-[18rem] rounded-[2rem] md:rounded-[2.5rem] border-2 overflow-hidden"
        style={{
          borderColor: `${USABLE_ACCENT}99`,
          boxShadow: `0 0 48px ${USABLE_ACCENT}22, inset 0 0 60px ${USABLE_ACCENT}08`,
          background: 'rgba(255,255,255,0.02)',
        }}
      >
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        />

        {activeRegs.map((reg, i) => (
          <ConstraintBand key={reg.id} reg={reg} index={i} />
        ))}

        <motion.div
          className="absolute flex flex-col items-center justify-center rounded-2xl md:rounded-3xl border-2 border-dashed overflow-hidden pointer-events-none"
          style={{
            borderColor: isInitial ? `${USABLE_ACCENT}88` : `${CHAPTER_ACCENT}99`,
            background: isInitial
              ? `${USABLE_ACCENT}0a`
              : `linear-gradient(160deg, ${CHAPTER_ACCENT}14 0%, rgba(255,255,255,0.03) 100%)`,
            boxShadow: isInitial ? 'none' : `0 0 32px ${CHAPTER_ACCENT}33`,
          }}
          initial={false}
          animate={{
            top: `${insets.top}%`,
            right: `${insets.right}%`,
            bottom: `${insets.bottom}%`,
            left: `${insets.left}%`,
          }}
          transition={INSET_TRANSITION}
        >
          <div className="flex flex-col items-center gap-1.5 px-4 text-center">
            <span
              className="font-bold"
              style={{
                color: isInitial ? USABLE_ACCENT : CHAPTER_ACCENT,
                fontSize: 'clamp(13px, 1.2vw, 18px)',
                filter: `drop-shadow(0 0 12px ${isInitial ? USABLE_ACCENT : CHAPTER_ACCENT}66)`,
              }}
            >
              {isInitial ? '理論上の最大範囲' : '社内で設定できる利用目的'}
            </span>
            <AnimatePresence initial={false}>
              {!isInitial && (
                <motion.p
                  key="hint"
                  className="text-white/50 leading-snug max-w-[16rem]"
                  style={{ fontSize: 'clamp(13px, 0.88vw, 14px)' }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  関連規程・契約の枠内でのみ定義可能
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function RegulationSidebar({ activeCount }: { activeCount: number }) {
  return (
    <div className="flex flex-col gap-2 min-w-0 shrink-0 w-full md:w-[13.5rem] lg:w-[15rem] pointer-events-none">
      <p
        className="font-bold text-white/70 tracking-wide"
        style={{ fontSize: 'clamp(13px, 1vw, 14px)' }}
      >
        上限となる関連規程
      </p>
      <ul className="flex flex-col gap-1.5" aria-live="polite">
        {REGULATIONS.map((reg, i) => {
          const isActive = i < activeCount;
          const isNext = i === activeCount;
          return (
            <li
              key={reg.id}
              className={`flex items-start gap-2 px-2.5 py-2 rounded-lg border min-w-0 transition-colors duration-300 ${
                isNext ? 'regulation-next-pulse' : ''
              }`}
              style={{
                borderColor: isActive ? `${reg.accent}55` : isNext ? `${reg.accent}33` : 'rgba(255,255,255,0.08)',
                background: isActive
                  ? `${reg.accent}12`
                  : isNext
                    ? 'rgba(255,255,255,0.03)'
                    : 'transparent',
                opacity: isActive || isNext ? 1 : 0.35,
                ['--pulse-color' as string]: `${reg.accent}44`,
              }}
            >
              <span
                className="shrink-0 mt-0.5 font-mono tabular-nums"
                style={{
                  color: isActive ? reg.accent : 'rgba(255,255,255,0.25)',
                  fontSize: 'clamp(10px, 0.85vw, 12px)',
                }}
              >
                {isActive ? '✓' : String(i + 1).padStart(2, '0')}
              </span>
              <div className="min-w-0">
                <p
                  className="font-semibold leading-snug text-white"
                  style={{ fontSize: 'clamp(13px, 0.92vw, 14px)' }}
                >
                  {reg.name}
                </p>
                <p
                  className="text-white/45 leading-snug mt-0.5"
                  style={{ fontSize: 'clamp(11px, 0.85vw, 12px)' }}
                >
                  {reg.shortNote}
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default function Slide34UsagePurposeRestrictions() {
  const [activeCount, setActiveCount] = useState(0);
  const isFinished = activeCount >= REGULATION_COUNT;
  const stepLockRef = useRef(false);
  const lockTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const releaseLockLater = useCallback(() => {
    if (lockTimerRef.current) clearTimeout(lockTimerRef.current);
    lockTimerRef.current = setTimeout(() => {
      stepLockRef.current = false;
      lockTimerRef.current = null;
    }, STEP_LOCK_MS);
  }, []);

  const advanceStep = useCallback(() => {
    if (stepLockRef.current) return false;

    let didAdvance = false;
    setActiveCount((n) => {
      if (n >= REGULATION_COUNT) return n;
      didAdvance = true;
      return n + 1;
    });

    if (!didAdvance) return false;

    stepLockRef.current = true;
    releaseLockLater();
    return true;
  }, [releaseLockLater]);

  const handleOverlayClick = useCallback(
    (e: React.MouseEvent) => {
      if (isFinished) return;
      e.stopPropagation();
      e.preventDefault();
      advanceStep();
    },
    [isFinished, advanceStep]
  );

  useEffect(() => {
    return () => {
      if (lockTimerRef.current) clearTimeout(lockTimerRef.current);
    };
  }, []);

  useEffect(() => {
    if (isFinished) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== ' ' && e.key !== 'ArrowRight' && e.key !== 'Enter') return;
      e.preventDefault();
      e.stopImmediatePropagation();
      advanceStep();
    };

    window.addEventListener('keydown', onKeyDown, { capture: true });
    return () => window.removeEventListener('keydown', onKeyDown, { capture: true });
  }, [isFinished, advanceStep]);

  return (
    <SlideWrapper>
      <motion.div
        className="relative flex flex-col gap-3 w-full h-full max-w-6xl px-2 py-4 pt-14 min-h-0"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex flex-col gap-1.5 shrink-0 pointer-events-none">
          <span
            className="tracking-[0.32em] uppercase text-white/40"
            style={{ fontSize: 'clamp(10px, 0.9vw, 12px)' }}
          >
            1-2 · 利用目的 · Usable Scope
          </span>
          <h2
            className="font-bold tracking-tight text-white leading-tight"
            style={{ fontSize: 'clamp(22px, 2.6vw, 40px)' }}
          >
            利用目的を定める
            <span
              className="bg-clip-text text-transparent ml-2"
              style={{
                backgroundImage: `linear-gradient(90deg, ${USABLE_ACCENT} 0%, ${CHAPTER_ACCENT} 100%)`,
              }}
            >
              上限と射程
            </span>
          </h2>
          <p
            className="text-white/50 leading-relaxed"
            style={{ fontSize: 'clamp(13px, 1.05vw, 16px)' }}
          >
            関連規程により、社内で設定できる利用目的の領域は狭まる
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 flex-1 min-h-0 pointer-events-none">
          <div className="flex-1 min-h-0 min-w-0">
            <UsableAreaDiagram activeCount={activeCount} />
          </div>
          <RegulationSidebar activeCount={activeCount} />
        </div>
      </motion.div>

      <AnimatePresence>
        {!isFinished && (
          <motion.button
            type="button"
            className="absolute inset-0 z-30 cursor-pointer border-0 bg-transparent p-0"
            aria-label="クリックで次の関連規程を適用"
            onClick={handleOverlayClick}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {!isFinished && (
          <motion.div
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40 flex items-center gap-2 text-white/25 tracking-widest pointer-events-none"
            style={{ fontSize: 'clamp(10px, 0.78vw, 11px)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <span className="inline-block w-3 h-px bg-white/20" />
            クリック / Space で関連規程を適用（{activeCount}/{REGULATION_COUNT}）
            <span className="inline-block w-3 h-px bg-white/20" />
          </motion.div>
        )}
      </AnimatePresence>
    </SlideWrapper>
  );
}
