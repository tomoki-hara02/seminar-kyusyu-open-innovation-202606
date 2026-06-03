'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SlideWrapper from '../../SlideWrapper';

/**
 * p22: 経産省「AI事業者ガイドライン 1.2版」— リスクベースアプローチの引用
 *
 * ベーステンプレート: `templates/TextHighlight.tsx`
 *
 * - クリックごとに 1 文ずつ表示
 * - 「リスクベースアプローチ」に #f7c46c のアクセントカラーを付与
 */

type Part = { text: string; accent?: boolean };
type Sentence = { parts: Part[] };

const SENTENCES: Sentence[] = [
  {
    parts: [
      {
        text: 'AIの利用は、その分野とその利用形態によっては、社会に対して大きなリスクを生じさせ、そのリスクに伴う社会的な軋轢により、AIの利活用自体が阻害される可能性がある。',
      },
    ],
  },
  {
    parts: [
      {
        text: '一方で、過度な対策を講じることは、同様にAI活用自体又はAI活用によって得られる便益を阻害してしまう可能性がある。',
      },
    ],
  },
  {
    parts: [
      {
        text: 'このような中、当該利用分野における利用形態に伴って生じうるリスクの大きさ（危害の大きさ及びその蓋然性）を把握したうえで、その対策の程度をリスクの大きさに対応させる「',
      },
      { text: 'リスクベースアプローチ', accent: true },
      { text: '」が重要となる。' },
    ],
  },
  {
    parts: [
      { text: '本ガイドラインでは、この「' },
      { text: 'リスクベースアプローチ', accent: true },
      { text: '」にもとづく企業における対策の方向を記載している。' },
    ],
  },
  {
    parts: [
      { text: 'なお、この「' },
      { text: 'リスクベースアプローチ', accent: true },
      { text: '」の考え方は、AI先進国間で広く共有されているものである。' },
    ],
  },
];

const TOTAL = SENTENCES.length;
const ACCENT_COLOR = '#f7c46c';

export default function Slide22GuidelinesText() {
  // -1 = まだ何も表示していない。クリックで +1 ずつ進む（ブロック単位）
  const [activeIdx, setActiveIdx] = useState(-1);

  const isFinished = activeIdx >= TOTAL - 1;

  const handleClick = (e: React.MouseEvent) => {
    if (isFinished) return;
    e.stopPropagation();
    setActiveIdx((i) => i + 1);
  };

  return (
    <div className="absolute inset-0" onClick={handleClick}>
      <SlideWrapper>
        <motion.div
          className="flex flex-col items-start gap-4 w-full max-w-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: 'easeInOut' }}
        >
          {/* ── ヘッダー ── */}
          <div className="flex flex-col gap-0.5">
            <span className="text-[10px] tracking-[0.22em] uppercase text-white/30">
              経産省
            </span>
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-bold tracking-tight text-white">
                「AI事業者ガイドライン（1.2版）」
              </span>
              <a
                href="https://www.meti.go.jp/shingikai/mono_info_service/ai_shakai_jisso/pdf/20260331_1.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] text-[#f7c46c]/60 hover:text-[#f7c46c] underline underline-offset-2 leading-none transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                資料はこちら
              </a>
            </div>
          </div>

          {/* ── 区切り線 ── */}
          <div className="w-full h-px bg-white/8" />

          {/* ── 本文（1文ずつ表示） ── */}
          <div className="flex flex-col gap-3 text-sm leading-[1.95]">
            {SENTENCES.map((sentence, bi) => {
              const isHidden  = bi > activeIdx;
              const isActive  = bi === activeIdx;
              const isPast    = bi < activeIdx;

              return (
                <motion.div
                  key={bi}
                  className=""
                  animate={{ opacity: isHidden ? 0 : isActive ? 1 : 0.28 }}
                  transition={{ duration: 0.22, ease: 'easeOut' }}
                >
                  {sentence.parts.map((part, pi) => (
                    <motion.span
                      key={pi}
                      style={{
                        color: part.accent ? ACCENT_COLOR : undefined,
                      }}
                      animate={{
                        filter:
                          isActive && part.accent
                            ? `drop-shadow(0 0 8px ${ACCENT_COLOR}cc)`
                            : isActive
                            ? 'drop-shadow(0 0 5px rgba(200,220,255,0.6))'
                            : 'none',
                        color:
                          part.accent
                            ? ACCENT_COLOR
                            : isPast || isActive
                            ? '#ffffff'
                            : '#ffffff',
                      }}
                      transition={{ duration: 0.18, ease: 'easeOut' }}
                    >
                      {part.text}
                    </motion.span>
                  ))}
                </motion.div>
              );
            })}
          </div>

          {/* ── フッター ── */}
          <div className="flex items-center gap-2 mt-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#f7c46c]/60" />
            <span className="text-[11px] text-white/25 tracking-wide">
              リスクの大きさに応じて対策の程度を変える ＝ リスクベースアプローチ
            </span>
          </div>
        </motion.div>

        {/* ── クリックヒント ── */}
        <AnimatePresence>
          {!isFinished && (
            <motion.div
              className="fixed bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 text-white/20 text-xs tracking-widest pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <span className="inline-block w-3 h-px bg-white/20" />
              クリックで次の文へ
              <span className="inline-block w-3 h-px bg-white/20" />
            </motion.div>
          )}
        </AnimatePresence>
      </SlideWrapper>
    </div>
  );
}
