'use client';

import { useMemo } from 'react';
import { motion } from 'framer-motion';
import SlideWrapper from '../../SlideWrapper';

/**
 * p33: 1-1 基本方針 — 考えるべき項目
 *
 * ベーステンプレート: `templates/KeywordCloud.tsx`
 * - フォントサイズ / opacity / アニメーションはテンプレート準拠
 * - 日本語の文字数に応じて配置角度・半径のみ調整
 */

const KEYWORDS = [
  '人間中心',
  '安全性',
  '公平性',
  'プライバシー保護',
  'セキュリティ確保',
  '透明性',
  'アカウンタビリティ',
  '教育・リテラシー',
  '公正競争確保',
  'イノベーション',
];

const PALETTE = ['#60a5fa', '#88bbff', '#c8a8ff', '#ffffff'];

/** 中央見出しとの重なりを避ける最小半径（%） */
const MIN_RADIUS = 26;

function estimateHalfWidthPct(kw: string, sizeRem: number): number {
  return kw.length * sizeRem * 0.68 + 1.2;
}

function estimateHalfHeightPct(sizeRem: number): number {
  return sizeRem * 0.9 + 1;
}

/** 長い語ほど上下方向（|cos| が小さい）スロットを割り当て */
function assignAnglesByLength(keywords: string[]): Map<string, number> {
  const n = keywords.length;
  const baseAngles = Array.from({ length: n }, (_, i) => {
    const slot = i / n - 0.25;
    return slot * Math.PI * 2;
  });

  const slots = baseAngles
    .map((angle, idx) => ({ idx, angle, sideRisk: Math.abs(Math.cos(angle)) }))
    .sort((a, b) => a.sideRisk - b.sideRisk);

  const ordered = [...keywords].sort((a, b) => b.length - a.length);
  const angleByKeyword = new Map<string, number>();

  ordered.forEach((kw, rank) => {
    angleByKeyword.set(kw, slots[rank].angle);
  });

  return angleByKeyword;
}

function fitPosition(
  x: number,
  y: number,
  kw: string,
  sizeRem: number
): { x: number; y: number } {
  const halfW = estimateHalfWidthPct(kw, sizeRem);
  const halfH = estimateHalfHeightPct(sizeRem);

  let nextX = Math.min(100 - halfW, Math.max(halfW, x));
  let nextY = Math.min(100 - halfH, Math.max(halfH, y));

  const dx = nextX - 50;
  const dy = nextY - 50;
  const dist = Math.hypot(dx, dy);

  if (dist < MIN_RADIUS && dist > 0) {
    const scale = MIN_RADIUS / dist;
    nextX = 50 + dx * scale;
    nextY = 50 + dy * scale;
  }

  return { x: nextX, y: nextY };
}

export default function Slide33BasicPolicyKeywords() {
  const angleByKeyword = useMemo(() => assignAnglesByLength(KEYWORDS), []);

  const placed = useMemo(() => {
    return KEYWORDS.map((kw, i) => {
      const seed = (i * 9301 + 49297) % 233280;
      const r1 = seed / 233280;
      const r2 = ((seed * 7) % 233280) / 233280;
      const r3 = ((seed * 13) % 233280) / 233280;
      const r4 = ((seed * 17) % 233280) / 233280;

      const baseAngle = angleByKeyword.get(kw) ?? i * (Math.PI * 2 / KEYWORDS.length);
      const angle = baseAngle + r1 * 0.6;

      // テンプレート準拠: rx 28–42%, ry 22–36%
      let rx = 28 + r2 * 14;
      let ry = 22 + r3 * 14;

      // 文字数に応じて半径のみ調整（フォントサイズは変えない）
      const sideWeight = Math.abs(Math.cos(angle));
      if (sideWeight > 0.55) {
        const sidePenalty = Math.max(0, kw.length - 3) * 1.1;
        rx = Math.max(24, rx - sidePenalty);
      } else if (kw.length >= 8) {
        rx = Math.max(26, rx - 2);
        ry = Math.max(20, ry - 1);
      }

      // テンプレート準拠: 1.0rem – 3.6rem
      let size = 1.0 + r4 * 2.6;
      if (kw === '公正競争確保') {
        size = Math.min(3.6, size + 0.35);
      }
      const opacity = 0.4 + r2 * 0.55;
      const color = PALETTE[Math.floor(r3 * PALETTE.length)];
      const driftD = r1 * 4;

      let x = 50 + Math.cos(angle) * rx;
      let y = 50 + Math.sin(angle) * ry;

      const dx = x - 50;
      const dy = y - 50;
      const dist = Math.hypot(dx, dy);
      if (dist < MIN_RADIUS && dist > 0) {
        const scale = MIN_RADIUS / dist;
        x = 50 + dx * scale;
        y = 50 + dy * scale;
      }

      const fitted = fitPosition(x, y, kw, size);
      x = fitted.x;
      y = fitted.y;

      if (kw === 'イノベーション') {
        const idx = x - 50;
        const idy = y - 50;
        const idist = Math.hypot(idx, idy);
        if (idist > 0) {
          const inset = 8;
          const newDist = Math.max(MIN_RADIUS, idist - inset);
          x = 50 + (idx / idist) * newDist;
          y = 50 + (idy / idist) * newDist;
        }
      }

      return { kw, x, y, size, opacity, color, driftD };
    });
  }, [angleByKeyword]);

  return (
    <SlideWrapper>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {placed.map((p, i) => (
          <motion.span
            key={p.kw}
            className="absolute font-bold tracking-tight select-none whitespace-nowrap"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              fontSize: `${p.size}rem`,
              color: p.color,
              opacity: p.opacity,
              transform: 'translate(-50%, -50%)',
              filter: `drop-shadow(0 0 12px ${p.color}55)`,
            }}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{
              opacity: p.opacity,
              scale: 1,
              y: [0, -8, 0],
            }}
            transition={{
              opacity: { duration: 0.8, delay: 0.05 * i },
              scale: { duration: 0.8, delay: 0.05 * i, ease: 'easeOut' },
              y: {
                duration: 4 + p.driftD,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: p.driftD,
              },
            }}
          >
            {p.kw}
          </motion.span>
        ))}
      </div>

      <motion.div
        className="relative z-10 flex flex-col items-center gap-4 text-center max-w-2xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.6 }}
      >
        <span className="text-[10px] tracking-[0.32em] uppercase text-white/40">
          1-1 · 基本方針
        </span>
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white leading-snug">
          基本方針で
          <br />
          考えるべき項目
        </h2>
        <p className="text-xs md:text-sm text-white/45 leading-relaxed mt-2 max-w-md">
          AI事業者ガイドラインより
        </p>
      </motion.div>
    </SlideWrapper>
  );
}
