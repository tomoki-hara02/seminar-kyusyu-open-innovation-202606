'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import SlideWrapper from '../../SlideWrapper';

/**
 * 活用方法を複数紹介した後の「デモギャラリー」スライド。
 *
 * - DeckOverview と同じ 3D ファン配置 + ホイールスクロールでめくれるカード
 * - 各カードは生成AIで作った成果物の画像（実物デモ）
 * - クリックで focused 状態 → そのカードだけを画像全面で大きく表示
 * - もう一度クリック / Esc で focused 解除（スライド遷移は行わない）
 *
 * 画像を増やすときは下記 GALLERY 配列に追加するだけ。
 */
type GalleryItem = {
  src: string;
  alt: string;
  title: string;
  category: string;
  accent: string;
};

const GALLERY: GalleryItem[] = [
  {
    src: '/CRM_1.png',
    alt: 'CRM ダッシュボード 全体サマリー',
    title: 'CRM ダッシュボード — 全体サマリー',
    category: '顧客管理',
    accent: '#88bbff',
  },
  {
    src: '/CRM_02.png',
    alt: 'CRM ダッシュボード 顧客別活動履歴',
    title: 'CRM ダッシュボード — 顧客別 活動履歴',
    category: '顧客管理',
    accent: '#c8a8ff',
  },
  {
    src: '/Webmarketing_01.png',
    alt: 'Webアナリティクス ダッシュボード GA4・GSC 連携',
    title: 'Webアナリティクス — GA4 × GSC 統合ビュー',
    category: 'Webマーケティング',
    accent: '#ffaacc',
  },
  {
    src: '/Webmarketing_02.png',
    alt: 'Webアナリティクス GSC 検索クエリ TOP10 と改善提案',
    title: 'Webアナリティクス — クエリ分析 × AI改善提案',
    category: 'Webマーケティング',
    accent: '#9ee0a8',
  },
  {
    src: '/Financial_01.png',
    alt: 'Financial Dashboard 売上・粗利・完全達成率と月次推移',
    title: 'Financial Dashboard — 売上・粗利・ウォーターフォール',
    category: '財務管理',
    accent: '#f7c46c',
  },
  {
    src: '/financial_02.png',
    alt: 'Financial Dashboard 売上・費用構成と月次収支推移',
    title: 'Financial Dashboard — 費用構成 × 月次収支推移',
    category: '財務管理',
    accent: '#ffaacc',
  },
  // 後続のデモ画像が増えたらここに push:
  // { src: '/xxx.png', alt: '...', title: '...', category: '...', accent: '#88bbff' },
];

// アクセントカラー（インデックスで循環）
const ACCENTS = [
  '#c8a8ff',
  '#88bbff',
  '#ffaacc',
  '#4FACF7',
  '#7B5EA7',
  '#FF6B9D',
];

// カード基本サイズ（16:9）
const CARD_W = 660;
const CARD_H = Math.round((CARD_W * 9) / 16);

// 3D ファン配置パラメーター
const STEP_X = 135;
const STEP_Y = -85;
const STEP_Z = -90;
const STEP_SCALE = 0.07;
const MIN_SCALE = 0.5;
const ROT_Y = -22;
const ROT_Z = -6;

const WHEEL_SENSITIVITY = 0.0035;
const CARD_BASE_OPACITY = 0.78;

function getCardLayout(relPos: number, anyFocused: boolean) {
  const visibility =
    relPos < -0.6 ? 0 : relPos < 0 ? Math.max(0, 1 + relPos / 0.6) : 1;
  const opacity = anyFocused
    ? visibility * 0.12
    : visibility * CARD_BASE_OPACITY;

  const scale = Math.max(MIN_SCALE, 1 - relPos * STEP_SCALE);
  return {
    x: relPos * STEP_X - CARD_W / 2,
    y: relPos * STEP_Y - CARD_H / 2,
    z: relPos * STEP_Z,
    scale,
    rotateY: ROT_Y,
    rotateZ: ROT_Z,
    opacity,
  };
}

export default function Slide07DemoGallery() {
  const [progress, setProgress] = useState(0);
  const [focused, setFocused] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const cards = GALLERY;
  const n = cards.length;
  const minP = -0.4;
  const maxP = n - 0.6;

  // ホイール
  const handleWheel = useCallback(
    (e: React.WheelEvent) => {
      e.stopPropagation();
      const delta = e.deltaY * WHEEL_SENSITIVITY;
      setProgress((p) => Math.max(minP, Math.min(p + delta, maxP)));
      setFocused(null);
    },
    [minP, maxP]
  );

  // タッチ
  const touchY = useRef<number | null>(null);
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchY.current = e.touches[0].clientY;
  }, []);
  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (touchY.current == null) return;
      const dy = touchY.current - e.touches[0].clientY;
      touchY.current = e.touches[0].clientY;
      setProgress((p) => Math.max(minP, Math.min(p + dy * 0.012, maxP)));
      setFocused(null);
    },
    [minP, maxP]
  );

  // キー（ホバー中のみ ↑↓ で送る + Esc で focused 解除）
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && focused !== null) {
        e.preventDefault();
        setFocused(null);
        return;
      }
      if (!el.matches(':hover')) return;
      if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        e.preventDefault();
        setProgress((p) => Math.min(p + 1, maxP));
        setFocused(null);
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault();
        setProgress((p) => Math.max(p - 1, minP));
        setFocused(null);
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [minP, maxP, focused]);

  const handleBackdropClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setFocused(null);
  }, []);

  return (
    <SlideWrapper>
      {/* ─── ヘッダー（上部） ─── */}
      <motion.div
        className="absolute top-14 inset-x-0 flex flex-col items-center gap-1.5 z-30 pointer-events-none"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: focused !== null ? 0.18 : 1, y: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut', delay: 0.1 }}
      >
        <div className="flex items-center gap-3">
          <div className="w-6 h-px bg-gradient-to-r from-transparent to-[#7B5EA7]" />
          <span className="text-[10px] tracking-[0.34em] uppercase text-white/35">
            Demo Gallery
          </span>
          <div className="w-6 h-px bg-gradient-to-l from-transparent to-[#4F8EF7]" />
        </div>
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white">
          活用事例の
          <span
            className="bg-clip-text text-transparent ml-1"
            style={{
              backgroundImage:
                'linear-gradient(90deg, #88bbff 0%, #c8a8ff 60%, #ffaacc 100%)',
            }}
          >
            完成イメージ
          </span>
        </h2>

        {/* Generated with Claude バッジ */}
        <div
          className="mt-2 flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/15 pointer-events-auto"
          style={{
            background:
              'linear-gradient(135deg, rgba(200,168,255,0.12) 0%, rgba(79,142,247,0.08) 100%)',
            boxShadow: '0 0 24px -8px rgba(200,168,255,0.3)',
          }}
        >
          <span className="text-[10px] text-white/40 tracking-widest uppercase">
            Generated with
          </span>
          <span
            className="text-xs font-bold bg-clip-text text-transparent"
            style={{ backgroundImage: 'linear-gradient(90deg, #c8a8ff, #88bbff)' }}
          >
            Claude
          </span>
        </div>
      </motion.div>

      {/* ─── 3D ファンエリア ─── */}
      <div
        ref={containerRef}
        className="absolute inset-0"
        style={{ perspective: '1700px', perspectiveOrigin: '50% 55%' }}
        onWheel={handleWheel}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onClick={handleBackdropClick}
      >
        <div
          style={{
            position: 'absolute',
            left: '50%',
            top: '54%',
            transformStyle: 'preserve-3d',
          }}
        >
          {cards.map((card, i) => {
            const relPos = i - progress;
            const isFocused = focused === i;
            const accent = card.accent ?? ACCENTS[i % ACCENTS.length];
            const layout = getCardLayout(relPos, focused !== null);
            // 拡大中はカードへのクリックを無効化（フルスクリーンOverlayで管理）
            const interactable = focused === null && relPos > -0.5 && layout.opacity > 0.05;

            return (
              <motion.button
                key={card.src}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  if (!interactable) return;
                  // クリックで拡大表示 / もう一度で解除（スライド遷移はしない）
                  setFocused((curr) => (curr === i ? null : i));
                }}
                aria-label={
                  isFocused
                    ? `${card.title} を閉じる`
                    : `${card.title} を拡大表示`
                }
                aria-expanded={isFocused}
                disabled={!interactable}
                className="absolute rounded-2xl overflow-hidden"
                style={{
                  width: CARD_W,
                  height: CARD_H,
                  background:
                    'linear-gradient(145deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.015) 100%)',
                  border: `1px solid ${isFocused ? accent + 'AA' : `${accent}33`}`,
                  boxShadow: isFocused
                    ? `0 50px 120px rgba(0,0,0,0.9), 0 0 100px ${accent}55`
                    : `0 16px 60px rgba(0,0,0,0.55), 0 0 30px -10px ${accent}33`,
                  cursor: interactable ? 'pointer' : 'default',
                  pointerEvents: interactable ? 'auto' : 'none',
                }}
                animate={{
                  x: layout.x,
                  y: layout.y,
                  z: layout.z,
                  scale: layout.scale,
                  rotateY: layout.rotateY,
                  rotateZ: layout.rotateZ,
                  opacity: layout.opacity,
                  zIndex: isFocused ? 100 : 50 - Math.max(0, Math.floor(relPos)),
                }}
                transition={{
                  type: 'spring',
                  stiffness: 200,
                  damping: 28,
                  mass: 0.7,
                }}
              >
                {/* フォーカス時のグロー */}
                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: `radial-gradient(ellipse at 50% 50%, ${accent}38, transparent 70%)`,
                  }}
                  animate={{ opacity: isFocused ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                />

                {/* 画像エリア */}
                <div
                  className="absolute"
                  style={{
                    top: 48, left: 12, right: 12, bottom: 12,
                    borderRadius: 12,
                    overflow: 'hidden',
                    background: 'rgba(0,0,0,0.3)',
                  }}
                >
                  <Image
                    src={card.src}
                    alt={card.alt}
                    fill
                    sizes="800px"
                    className="object-contain"
                    priority={i < 2}
                  />
                </div>

                {/* 上部メタ */}
                <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-5 py-3 pointer-events-none">
                  <div className="flex items-center gap-2 min-w-0">
                    <span
                      className="w-1.5 h-1.5 rounded-full shrink-0"
                      style={{ background: accent, boxShadow: `0 0 8px ${accent}` }}
                    />
                    <span
                      className="text-[10px] font-mono tracking-[0.28em] uppercase shrink-0"
                      style={{ color: accent }}
                    >
                      {card.category} · {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <span className="text-[10px] text-white/35 tracking-wider">
                    クリックで拡大
                  </span>
                </div>

                {/* 下辺アクセントライン */}
                <div
                  className="absolute bottom-0 left-0 right-0 pointer-events-none transition-all"
                  style={{
                    height: isFocused ? 4 : 2,
                    background: `linear-gradient(90deg, ${accent} 0%, ${accent}00 ${
                      isFocused ? '90%' : '55%'
                    })`,
                  }}
                />
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* ─── フルスクリーンオーバーレイ（選択時） ─── */}
      <AnimatePresence>
        {focused !== null && (
          <motion.div
            key="fullscreen"
            className="fixed inset-0 z-[200] flex items-center justify-center"
            style={{ background: 'rgba(4,5,12,0.96)', cursor: 'zoom-out' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            onClick={handleBackdropClick}
            onDoubleClick={handleBackdropClick}
          >
            {/* 画像（contain で全体表示） */}
            <motion.div
              className="relative w-full h-full p-10"
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              onClick={(e) => e.stopPropagation()}
              onDoubleClick={handleBackdropClick}
            >
              <Image
                src={GALLERY[focused].src}
                alt={GALLERY[focused].alt}
                fill
                sizes="100vw"
                className="object-contain"
                priority
              />
            </motion.div>

            {/* 下部タイトルバー */}
            <motion.div
              className="absolute bottom-0 left-0 right-0 px-8 py-5 flex items-center justify-between pointer-events-none"
              style={{
                background: 'linear-gradient(0deg, rgba(4,5,12,0.9) 0%, transparent 100%)',
              }}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <div className="flex items-center gap-3">
                <span
                  className="w-2 h-2 rounded-full shrink-0"
                  style={{
                    background: GALLERY[focused].accent,
                    boxShadow: `0 0 12px ${GALLERY[focused].accent}`,
                  }}
                />
                <span className="text-sm font-bold tracking-wide" style={{ color: GALLERY[focused].accent }}>
                  {GALLERY[focused].title}
                </span>
              </div>
                <div className="flex items-center gap-2 text-[11px] text-white/40">
                  <kbd className="px-2 py-0.5 rounded border border-white/20 font-mono text-[10px]">Esc</kbd>
                  <span>/ ダブルクリック / 背景クリックで閉じる</span>
                </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── 操作ヒント（下部） ─── */}
      <motion.div
        className="absolute bottom-6 inset-x-0 flex items-center justify-center gap-3 text-[10px] text-white/25 tracking-widest pointer-events-none z-30"
        initial={{ opacity: 0 }}
        animate={{ opacity: focused !== null ? 0.5 : 1 }}
        transition={{ duration: 0.4 }}
      >
        <span>⇅ Scroll でめくる</span>
        <span className="text-white/15">·</span>
        <span>カードクリックで拡大</span>
        <span className="text-white/15">·</span>
        <span>Esc / 背景クリックで戻る</span>
      </motion.div>
    </SlideWrapper>
  );
}
