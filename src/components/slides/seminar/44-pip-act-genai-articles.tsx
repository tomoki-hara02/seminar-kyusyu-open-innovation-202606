'use client';

import { useLayoutEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SlideWrapper from '../../SlideWrapper';

/**
 * p45: 4-4 個人情報 — 第16条・第17条（条文リファレンス）
 *
 * 左: 第17条（利用目的の特定） / 右: 第16条（個人情報データベース等の定義）
 * ベーステンプレート: `templates/TextHighlight.tsx`（クリックで段階表示）
 */

const CHAPTER_ACCENT = '#9ee0a8';
const LAW_ACCENT = '#60a5fa';
const HIGHLIGHT_COLOR = '#88bbff';

type TextChunk = { text: string; accent?: boolean };
type IndexedChunk = TextChunk & { blockIdx: number };

const LEFT_RAW: TextChunk[][] = [
  [
    { text: '個人情報取扱事業者は、個人情報を取り扱うに当たっては、その' },
    { text: '利用の目的', accent: true },
    { text: '（以下「' },
    { text: '利用目的', accent: true },
    { text: '」という。）を' },
    { text: 'できる限り特定', accent: true },
    { text: 'しなければならない。' },
  ],
  [
    { text: '２　個人情報取扱事業者は、利用目的を変更する場合には、変更前の利用目的と' },
    { text: '関連性を有すると合理的に認められる範囲', accent: true },
    { text: 'を超えて行ってはならない。' },
  ],
];

const RIGHT_RAW: TextChunk[][] = [
  [
    { text: 'この章及び第八章において「' },
    { text: '個人情報データベース等', accent: true },
    {
      text: '」とは、個人情報を含む情報の集合物であって、次に掲げるもの（利用方法からみて個人の権利利益を害するおそれが少ないものとして政令で定めるものを除く。）をいう。',
    },
  ],
  [
    {
      text: '一　特定の個人情報を電子計算機を用いて検索することができるように体系的に構成したもの',
      accent: true,
    },
  ],
  [
    {
      text: '二　前号に掲げるもののほか、特定の個人情報を容易に検索することができるように体系的に構成したものとして政令で定めるもの',
      accent: true,
    },
  ],
  [
    { text: '３　この章において「' },
    { text: '個人データ', accent: true },
    { text: '」とは、' },
    { text: '個人情報データベース等', accent: true },
    { text: 'を構成する個人情報をいう。' },
  ],
];

function indexBlocks(raw: TextChunk[][], startIdx: number) {
  return raw.map((block, i) =>
    block.map((chunk) => ({ ...chunk, blockIdx: startIdx + i }))
  );
}

const LEFT_BLOCKS = indexBlocks(LEFT_RAW, 0);
const RIGHT_BLOCKS = indexBlocks(RIGHT_RAW, LEFT_RAW.length);
const TOTAL_BLOCKS = LEFT_RAW.length + RIGHT_RAW.length;

const PURPOSE_SUPPLEMENT = {
  title: '利用目的について',
  body:
    '個人情報の取扱いによって達成すべき最終的な目的を指し、取扱過程ごとに設定する必要はない。',
  detail:
    '→最終目的から本人が予想できない利用がある場合は具体化する必要がある（例：プロファイリング、防犯カメラから顔認証データ抽出など）',
} as const;

const PERSONAL_DATA_SUPPLEMENT = {
  title: '個人データと第4章2節',
  body: '法第4章2節（22条～30条）は個人データでなければ適用されない。',
  detail:
    '理由：電子化されると、アナログ処理と比較して利益侵害のリスクが上昇するため',
} as const;

function ArticleBlock({
  block,
  activeIdx,
  indented = false,
}: {
  block: IndexedChunk[];
  activeIdx: number;
  indented?: boolean;
}) {
  return (
    <div className={indented ? 'pl-2.5 border-l border-white/10' : ''}>
      {block.map((chunk) => {
        const isActive = chunk.blockIdx === activeIdx;
        const isHidden = chunk.blockIdx > activeIdx;
        return (
          <motion.span
            key={`${chunk.blockIdx}-${chunk.text.slice(0, 12)}`}
            animate={{
              opacity: isHidden ? 0 : isActive ? 1 : 0.22,
              color: chunk.accent ? HIGHLIGHT_COLOR : '#ffffff',
              filter: isActive
                ? chunk.accent
                  ? 'drop-shadow(0 0 6px rgba(79,142,247,0.9))'
                  : 'drop-shadow(0 0 6px rgba(200,220,255,0.7))'
                : 'none',
            }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
          >
            {chunk.text}
          </motion.span>
        );
      })}
    </div>
  );
}

function ArticleSupplement({
  supplement,
  accent = LAW_ACCENT,
}: {
  supplement: { title: string; body: string; detail: string };
  accent?: string;
}) {
  return (
    <motion.div
      className="flex flex-col gap-1.5 w-full shrink-0"
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.15 }}
    >
      <span
        className="font-semibold tracking-wide"
        style={{
          fontSize: 'clamp(9px, 0.78vw, 11px)',
          color: `${accent}cc`,
        }}
      >
        補足 — {supplement.title}
      </span>
      <p
        className="text-white/68 leading-snug"
        style={{ fontSize: 'clamp(10px, 0.88vw, 12px)' }}
      >
        {supplement.body}
      </p>
      <p
        className="text-white/58 leading-snug pl-2 border-l-2"
        style={{
          fontSize: 'clamp(10px, 0.88vw, 12px)',
          borderColor: `${CHAPTER_ACCENT}55`,
        }}
      >
        {supplement.detail}
      </p>
    </motion.div>
  );
}

function LegalArticlePanel({
  lawLabel,
  articleLabel,
  subtitle,
  blocks,
  activeIdx,
  accent = LAW_ACCENT,
  indentFrom = 1,
  indentTo,
  panelRef,
  minHeight,
}: {
  lawLabel: string;
  articleLabel: string;
  subtitle: string;
  blocks: IndexedChunk[][];
  activeIdx: number;
  accent?: string;
  indentFrom?: number;
  indentTo?: number;
  panelRef?: React.RefObject<HTMLDivElement | null>;
  minHeight?: number;
}) {
  return (
    <div
      ref={panelRef}
      className="w-full flex flex-col rounded-xl border shrink-0"
      style={{
        minHeight: minHeight,
        borderColor: `${accent}44`,
        background: `linear-gradient(160deg, ${accent}10 0%, rgba(255,255,255,0.02) 100%)`,
      }}
    >
      <div className="flex flex-col gap-2 p-3.5 md:p-4 flex-1 h-full">
        <div className="flex flex-col gap-0.5 shrink-0">
          <span
            className="tracking-[0.18em] uppercase text-white/30"
            style={{ fontSize: 'clamp(9px, 0.78vw, 11px)' }}
          >
            {lawLabel}
          </span>
          <div className="flex items-baseline gap-2 flex-wrap">
            <span
              className="font-bold tracking-tight text-white tabular-nums"
              style={{ fontSize: 'clamp(16px, 1.3vw, 21px)' }}
            >
              {articleLabel}
            </span>
            <span
              className="text-white/30 leading-none"
              style={{ fontSize: 'clamp(10px, 0.85vw, 12px)' }}
            >
              {subtitle}
            </span>
          </div>
        </div>

        <div className="w-full h-px bg-white/8 shrink-0" />

        <div
          className="flex flex-col gap-2 leading-[1.75] flex-1"
          style={{ fontSize: 'clamp(11.5px, 0.95vw, 13.5px)' }}
        >
          {blocks.map((block, i) => (
            <ArticleBlock
              key={block[0]?.blockIdx ?? i}
              block={block}
              activeIdx={activeIdx}
              indented={
                i >= indentFrom && (indentTo === undefined || i <= indentTo)
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Slide44PipActGenaiArticles() {
  const [activeIdx, setActiveIdx] = useState(-1);
  const [matchedPanelHeight, setMatchedPanelHeight] = useState<number>();
  const article16Ref = useRef<HTMLDivElement>(null);
  const isFinished = activeIdx >= TOTAL_BLOCKS - 1;

  useLayoutEffect(() => {
    const el = article16Ref.current;
    if (!el) return;

    const syncHeight = () => setMatchedPanelHeight(el.offsetHeight);

    syncHeight();
    const observer = new ResizeObserver(syncHeight);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const handleClick = (e: React.MouseEvent) => {
    if (isFinished) return;
    e.stopPropagation();
    setActiveIdx((i) => i + 1);
  };

  return (
    <div className="absolute inset-0" onClick={handleClick}>
      <SlideWrapper>
        <motion.div
          className="flex flex-col gap-2.5 w-full max-w-6xl pt-8 min-h-0 flex-1 items-center justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex flex-col gap-1 shrink-0">
            <span
              className="tracking-[0.32em] uppercase text-white/40"
              style={{ fontSize: 'clamp(9px, 0.9vw, 12px)' }}
            >
              4-4 · 個人情報 · 条文リファレンス
            </span>
            <h2
              className="font-bold tracking-tight text-white leading-tight"
              style={{ fontSize: 'clamp(20px, 2.2vw, 32px)' }}
            >
              個人情報保護法と
              <span
                className="bg-clip-text text-transparent ml-2"
                style={{
                  backgroundImage: `linear-gradient(90deg, ${LAW_ACCENT} 0%, ${CHAPTER_ACCENT} 100%)`,
                }}
              >
                生成AIの論点
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 md:gap-x-5 gap-y-2.5 w-full shrink-0">
            <div className="flex flex-col gap-2.5">
              <LegalArticlePanel
                lawLabel="個人情報保護法"
                articleLabel="17条"
                subtitle="利用目的の特定"
                blocks={LEFT_BLOCKS}
                activeIdx={activeIdx}
                minHeight={matchedPanelHeight}
              />
              <ArticleSupplement supplement={PURPOSE_SUPPLEMENT} />
            </div>
            <div className="flex flex-col gap-2.5">
              <LegalArticlePanel
                lawLabel="個人情報保護法"
                articleLabel="16条"
                subtitle="定義（個人情報データベース等）"
                blocks={RIGHT_BLOCKS}
                activeIdx={activeIdx}
                indentFrom={1}
                indentTo={2}
                panelRef={article16Ref}
              />
              <ArticleSupplement supplement={PERSONAL_DATA_SUPPLEMENT} accent="#7dd3fc" />
            </div>
          </div>
        </motion.div>

        <AnimatePresence>
          {!isFinished && (
            <motion.div
              className="fixed bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 text-white/20 tracking-widest pointer-events-none"
              style={{ fontSize: 'clamp(9px, 0.78vw, 11px)' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <span className="inline-block w-3 h-px bg-white/20" />
              クリックで次の項へ
              <span className="inline-block w-3 h-px bg-white/20" />
            </motion.div>
          )}
        </AnimatePresence>
      </SlideWrapper>
    </div>
  );
}
