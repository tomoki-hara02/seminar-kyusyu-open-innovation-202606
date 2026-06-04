'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SlideWrapper from '../../SlideWrapper';

/**
 * p31: 社内生成AI利用規程の目次（カードホイール）
 *
 * - 左側に条項一覧（目次サイドバー）
 * - 右側に CardWheel をカスタマイズした観覧車ビュー
 * - サイドバーの項目クリックでホイールをジャンプ、
 *   ホイール側を回すとサイドバーの該当行がハイライト
 *
 * カード内容や詳細は後続スライドで個別に詰める想定の「目次スライド」。
 */

import {
  INTERNAL_RULE_CARDS as CARDS,
  groupRuleCards,
} from '@/data/internal-rules-cards';

// ─── ホイール幾何 ───────────────────────────────────────────────────────────
const CARD_W = 200;
const CARD_H = 290;
const RADIUS = 1700;
const STEP_DEG = 12;
const VISIBLE_RANGE_DEG = 60;
const WHEEL_SENSITIVITY = 0.045;

// ─── component ──────────────────────────────────────────────────────────────

export default function Slide31InternalRulesToc() {
  // card[0] が中央になる初期値: rawCenter = centerOffset + angle/STEP_DEG = 0
  //   → angle = -centerOffset * STEP_DEG
  const [angle, setAngle] = useState(() => -((CARDS.length - 1) / 2) * STEP_DEG);
  const containerRef = useRef<HTMLDivElement>(null);
  const sidebarItemRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const sidebarScrollRef = useRef<HTMLDivElement>(null);

  const n = CARDS.length;
  const fullCycle = n * STEP_DEG; // n=25 → 300°, /2=150° > VISIBLE_RANGE_DEG なのでラップ可
  const centerOffset = (n - 1) / 2;

  // ─── 中央のカード ──────────────────────────────────────────────────
  // 各カードの screen 上の最終角 = wrapperAngle - angle。
  // 中央（screen angle = 0）になるのは wrapperAngle = angle のとき。
  // i = centerOffset + angle / STEP_DEG。
  const rawCenter = centerOffset + angle / STEP_DEG;
  const currentIdx = ((Math.round(rawCenter) % n) + n) % n;
  const currentCard = CARDS[currentIdx];
  const cyclePos = ((rawCenter % n) + n) % n;
  const progressPercent = (cyclePos / n) * 100;

  // ─── 入力ハンドラ ───────────────────────────────────────────────────
  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.stopPropagation();
    setAngle((a) => a + e.deltaY * WHEEL_SENSITIVITY);
  }, []);

  const touchY = useRef<number | null>(null);
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchY.current = e.touches[0].clientY;
  }, []);
  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (touchY.current == null) return;
    const dy = touchY.current - e.touches[0].clientY;
    touchY.current = e.touches[0].clientY;
    setAngle((a) => a + dy * 0.16);
  }, []);

  // 矢印キー
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const handleKey = (e: KeyboardEvent) => {
      if (!el.matches(':hover')) return;
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        setAngle((a) => a + STEP_DEG);
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        setAngle((a) => a - STEP_DEG);
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  // ─── 指定カードへジャンプ ─────────────────────────────────────────
  // rawCenter = centerOffset + angle/STEP_DEG = targetIdx を満たす angle:
  //   angle = (targetIdx - centerOffset) * STEP_DEG
  const goToCard = useCallback(
    (targetIdx: number) => {
      const targetBase = (targetIdx - centerOffset) * STEP_DEG;
      setAngle((a) => {
        const k = Math.round((a - targetBase) / fullCycle);
        return targetBase + k * fullCycle;
      });
    },
    [centerOffset, fullCycle]
  );

  // ホイールが回ったらサイドバーの該当行を自動スクロール
  useEffect(() => {
    const node = sidebarItemRefs.current[CARDS[currentIdx].id];
    const scroller = sidebarScrollRef.current;
    if (!node || !scroller) return;
    const nodeTop = node.offsetTop;
    const nodeBottom = nodeTop + node.offsetHeight;
    const viewTop = scroller.scrollTop;
    const viewBottom = viewTop + scroller.clientHeight;
    if (nodeTop < viewTop || nodeBottom > viewBottom) {
      scroller.scrollTo({
        top: nodeTop - scroller.clientHeight / 2 + node.offsetHeight / 2,
        behavior: 'smooth',
      });
    }
  }, [currentIdx]);

  // ─── ラッパー角の計算（無限循環） ───────────────────────────────────
  function computeWrapperAngle(i: number): number {
    const natural = (i - centerOffset) * STEP_DEG;
    const k = Math.round((angle - natural) / fullCycle);
    return natural + k * fullCycle;
  }

  const grouped = useMemo(() => groupRuleCards(), []);

  return (
    <SlideWrapper>
      <div
        ref={containerRef}
        className="absolute inset-0 overflow-hidden flex"
        onWheel={handleWheel}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
      >
        {/* ── 左サイドバー ── */}
        <motion.aside
          className="relative shrink-0 flex flex-col gap-3 border-r border-white/10 z-40 backdrop-blur-xl"
          style={{
            width: 290,
            background:
              'linear-gradient(90deg, rgba(8,8,16,0.96) 0%, rgba(10,10,18,0.94) 70%, rgba(10,10,18,0.88) 100%)',
            boxShadow: '8px 0 28px rgba(0,0,0,0.55)',
          }}
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
        >
          {/* サイドバーヘッダー */}
          <div className="px-6 pt-7 pb-3 shrink-0">
            <span className="text-[10px] tracking-[0.32em] uppercase text-white/40">
              Table of Contents
            </span>
            <h3 className="mt-2 text-lg font-bold tracking-tight text-white leading-snug">
              社内生成AI<br />利用規程
            </h3>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-[10px] font-mono tabular-nums text-white/35">
                {String(currentIdx + 1).padStart(2, '0')}
                <span className="text-white/20"> / {String(n).padStart(2, '0')}</span>
              </span>
              <span className="text-[9px] tracking-widest uppercase text-white/30">
                {currentCard.group}
              </span>
            </div>
          </div>

          <div
            ref={sidebarScrollRef}
            className="flex-1 min-h-0 overflow-y-auto px-3 pb-6 scrollbar-thin"
          >
            <div className="flex flex-col gap-3">
              {grouped.map((g) => (
                <div key={g.group} className="flex flex-col gap-1">
                  {/* グループラベル */}
                  <div className="flex items-center gap-2 px-2 pt-1">
                    <span
                      className="w-1 h-3 rounded-sm"
                      style={{ background: g.accent }}
                    />
                    <span
                      className="text-[9px] tracking-[0.28em] uppercase font-bold"
                      style={{ color: g.accent }}
                    >
                      {g.group}
                    </span>
                  </div>

                  {g.items.map(({ card, idx }) => {
                    const isActive = idx === currentIdx;
                    return (
                      <button
                        key={card.id}
                        ref={(el) => {
                          sidebarItemRefs.current[card.id] = el;
                        }}
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          goToCard(idx);
                        }}
                        className={`relative flex items-start gap-2.5 w-full px-2.5 py-2 rounded-lg text-left transition-all duration-150 border ${
                          isActive
                            ? 'bg-white/[0.08] border-white/20'
                            : 'border-transparent hover:bg-white/[0.04] hover:border-white/10'
                        }`}
                      >
                        {/* アクセントバー */}
                        <span
                          className="shrink-0 w-1 self-stretch rounded-full"
                          style={{
                            background: card.accent,
                            opacity: isActive ? 1 : 0.35,
                          }}
                        />
                        {/* 番号 */}
                        <span
                          className="shrink-0 mt-0.5 text-[10px] font-mono tabular-nums w-8 text-right"
                          style={{
                            color: isActive ? card.accent : 'rgba(255,255,255,0.35)',
                          }}
                        >
                          {card.number}
                        </span>
                        {/* タイトル */}
                        <span
                          className={`text-[12px] leading-snug flex-1 min-w-0 ${
                            isActive ? 'text-white font-semibold' : 'text-white/65'
                          }`}
                        >
                          {card.title}
                        </span>
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </motion.aside>

        {/* ── 右側：ホイール本体 ── */}
        <div className="relative flex-1 min-w-0">
          {/* タイトル */}
          <motion.div
            className="absolute top-7 inset-x-0 z-30 pointer-events-none"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <div className="flex flex-col items-center gap-2">
              <h2
                className="font-bold tracking-tight text-white leading-none"
                style={{ fontSize: 'clamp(20px, 2.3vw, 30px)' }}
              >
                社内生成AI利用規程
                <span
                  className="bg-clip-text text-transparent ml-1"
                  style={{
                    backgroundImage:
                      'linear-gradient(90deg, #88bbff 0%, #c8a8ff 50%, #ffaacc 100%)',
                  }}
                >
                  項目一覧
                </span>
              </h2>
              <div className="w-16 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />
            </div>
          </motion.div>

          {/* ホイール観覧車 */}
          <div
            className="absolute left-1/2 top-1/2"
            style={{
              width: 0,
              height: 0,
              transform: `translate(-50%, ${RADIUS + 40}px)`,
            }}
          >
            <motion.div
              style={{ transformOrigin: '50% 50%' }}
              animate={{ rotate: -angle }}
              transition={{ type: 'spring', stiffness: 110, damping: 22 }}
            >
              {CARDS.map((card, i) => {
                const wrapperAngle = computeWrapperAngle(i);
                const screenAngle = wrapperAngle - angle;
                const dist = Math.abs(screenAngle);

                const visibility =
                  dist > VISIBLE_RANGE_DEG
                    ? 0
                    : Math.max(0, 1 - dist / VISIBLE_RANGE_DEG);
                const scale = 0.76 + 0.24 * visibility;
                const isActive = i === currentIdx;

                return (
                  <div
                    key={card.id}
                    className="absolute"
                    style={{
                      width: CARD_W,
                      height: CARD_H,
                      left: -CARD_W / 2,
                      top: -CARD_H / 2,
                      transformOrigin: '50% 50%',
                      transform: `rotate(${wrapperAngle}deg) translateY(-${RADIUS}px)`,
                    }}
                  >
                    <motion.div
                      className="relative w-full h-full"
                      style={{
                        opacity: visibility,
                        filter: isActive ? 'none' : `saturate(${0.55 + 0.45 * visibility})`,
                      }}
                      animate={{ scale }}
                      transition={{ type: 'spring', stiffness: 200, damping: 24 }}
                    >
                      {/* カード本体 */}
                      <div
                        className="absolute inset-0 rounded-md overflow-hidden cursor-pointer"
                        style={{
                          background: `linear-gradient(155deg, ${card.gradient[0]} 0%, ${card.gradient[1]} 100%)`,
                          boxShadow: isActive
                            ? `0 32px 90px rgba(0,0,0,0.72), 0 0 0 1px ${card.accent}AA, 0 0 80px ${card.accent}33`
                            : '0 14px 44px rgba(0,0,0,0.5)',
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                          goToCard(i);
                        }}
                      >
                        {/* 光と影 */}
                        <div
                          className="absolute inset-0 mix-blend-overlay opacity-60 pointer-events-none"
                          style={{
                            background:
                              'radial-gradient(circle at 28% 28%, rgba(255,255,255,0.55), transparent 60%), radial-gradient(circle at 72% 78%, rgba(0,0,0,0.45), transparent 65%)',
                          }}
                        />
                        {/* ノイズ */}
                        <div
                          className="absolute inset-0 mix-blend-soft-light pointer-events-none"
                          style={{
                            background:
                              'repeating-linear-gradient(45deg, rgba(255,255,255,0.03) 0 2px, transparent 2px 6px)',
                            opacity: 0.6,
                          }}
                        />

                        {/* タイトル（カードの主役） */}
                        <div className="absolute inset-0 flex items-center justify-center px-5 pointer-events-none">
                          <span
                            className="font-bold text-white text-center tracking-tight"
                            style={{
                              fontSize:
                                card.title.length > 14
                                  ? 17
                                  : card.title.length > 9
                                  ? 21
                                  : 26,
                              lineHeight: 1.35,
                              textShadow:
                                '0 2px 10px rgba(0,0,0,0.45), 0 0 22px rgba(0,0,0,0.25)',
                            }}
                          >
                            {card.title}
                          </span>
                        </div>

                        {/* 下辺アクセントライン */}
                        <div
                          className="absolute left-0 right-0 bottom-0 h-[3px]"
                          style={{
                            background: `linear-gradient(90deg, transparent, ${card.accent}, transparent)`,
                            opacity: isActive ? 1 : 0.6,
                          }}
                        />
                      </div>
                    </motion.div>
                  </div>
                );
              })}
            </motion.div>
          </div>

          {/* 下部進捗バー & 現在カード詳細 */}
          <motion.div
            className="absolute bottom-6 inset-x-0 z-30 pointer-events-none px-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <div className="flex flex-col items-center gap-3">
              {/* チャプター番号 & 条番号 & タイトル */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentCard.id}
                  className="flex flex-col items-center gap-1"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* チャプター行 */}
                  <div className="flex items-center gap-3">
                    <span
                      className="font-mono font-bold tracking-widest uppercase"
                      style={{ color: currentCard.accent, fontSize: 22 }}
                    >
                      Chapter {currentCard.chapter}
                    </span>
                    <span
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ background: currentCard.accent }}
                    />
                    <span className="tracking-widest text-white/50 uppercase font-semibold" style={{ fontSize: 18 }}>
                      {currentCard.group}
                    </span>
                  </div>
                  {/* 条番号 + タイトル行 */}
                  <div className="flex items-baseline gap-3">
                    <span
                      className="font-mono tabular-nums font-bold"
                      style={{ color: currentCard.accent, fontSize: 18 }}
                    >
                      {currentCard.number}
                    </span>
                    <span
                      className="font-bold text-white tracking-tight"
                      style={{ fontSize: 28 }}
                    >
                      {currentCard.title}
                    </span>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* 進捗バー */}
              <div className="flex items-center gap-3 text-[10px] font-mono text-white/45 tabular-nums">
                <span style={{ color: currentCard.accent }} className="font-bold">
                  {String(currentIdx + 1).padStart(2, '0')}
                </span>
                <div className="relative w-56 h-px bg-white/12">
                  <motion.div
                    className="absolute top-0 left-0 h-full"
                    style={{ backgroundColor: currentCard.accent }}
                    animate={{ width: `${progressPercent}%` }}
                    transition={{ type: 'spring', stiffness: 150, damping: 22 }}
                  />
                </div>
                <span>{String(n).padStart(2, '0')}</span>
              </div>

              <p className="text-[9px] tracking-[0.32em] uppercase text-white/30">
                Scroll · Swipe · Arrow Keys · Tap Card or List
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </SlideWrapper>
  );
}
