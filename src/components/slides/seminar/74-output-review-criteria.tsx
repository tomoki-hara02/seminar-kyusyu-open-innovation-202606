'use client';

import { motion } from 'framer-motion';
import SlideWrapper from '../../SlideWrapper';

/**
 * p74: 5-5 出力情報 — 社内外利用時の審査基準
 *
 * 「全件個別審査は非現実的」を前提に、2つのリソース最適化戦略を主軸に据え、
 * その上で「個別審査が必要なケース」の構成要素（担当者・資料・方法・利用指定）を示す。
 */

const OUTPUT_GRAD: [string, string] = ['#f17a45', '#c64823'];
const LAW_ACCENT = '#60a5fa';
const SECTION_ACCENT = '#9ee0a8';
const HIGHLIGHT_ACCENT = '#f7c46c';
const SCOPE_ACCENT = '#88bbff';
const SYSTEM_ACCENT = SECTION_ACCENT;

const STRATEGIES = [
  {
    badge: '①',
    title: '対象を絞る',
    headline: '法的な権利義務が付着する類型にリソースを集中',
    detail:
      '個人情報・著作権・営業秘密・守秘義務契約 …「外形上のリスク」がある出力に絞り込む。全件個別審査は現場の負担が大きく、続かない。',
    examples: ['個情法上の個人データ', '他者の著作物の影響', '営業秘密／NDA対象'],
    accent: SCOPE_ACCENT,
  },
  {
    badge: '②',
    title: '仕組みで代替',
    headline: '手順が整っているなら、仕組みの審査のみで足りる',
    detail:
      '入力ガイドライン・プロンプト規程・HITL・ログ運用が整備されていれば、出力1件ずつの個別審査ではなく「仕組みが回っているか」の定期審査で運用できる場合がある。',
    examples: ['入力規程＋ガード', 'HITL の組込み', 'ログ自動取得・保管'],
    accent: SYSTEM_ACCENT,
  },
] as const;

const REVIEW_ELEMENTS = [
  {
    num: '01',
    title: '審査担当者',
    accent: LAW_ACCENT,
    body: '法務部 ／ 統括責任者 など',
  },
  {
    num: '02',
    title: '審査資料',
    accent: '#88bbff',
    body: '生成スレッド（プロンプト）＋ 対象生成物',
  },
  {
    num: '03',
    title: '審査方法',
    accent: '#c8a8ff',
    body: 'プロンプト：他者権利付着の有無 ／ 画像：類似画像検索 など',
  },
  {
    num: '04',
    title: '利用方法の指定',
    accent: HIGHLIGHT_ACCENT,
    body: 'リスクベースアプローチで許容できる範囲を指定して活用',
    highlight: true,
  },
] as const;

function StrategyCard({
  strategy,
  index,
}: {
  strategy: (typeof STRATEGIES)[number];
  index: number;
}) {
  return (
    <motion.div
      className="relative flex flex-col gap-2.5 p-4 md:p-5 rounded-2xl border h-full"
      style={{
        borderColor: `${strategy.accent}55`,
        background: `linear-gradient(160deg, ${strategy.accent}14 0%, rgba(255,255,255,0.02) 100%)`,
        boxShadow: `0 0 32px -12px ${strategy.accent}33`,
      }}
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.12 + index * 0.1 }}
    >
      <div className="flex items-center gap-2.5">
        <span
          className="shrink-0 flex items-center justify-center w-8 h-8 md:w-9 md:h-9 rounded-lg border font-bold"
          style={{
            color: strategy.accent,
            borderColor: `${strategy.accent}66`,
            background: `${strategy.accent}18`,
            fontSize: 'clamp(13px, 1.1vw, 16px)',
          }}
        >
          {strategy.badge}
        </span>
        <h3
          className="font-bold text-white leading-tight"
          style={{ fontSize: 'clamp(16px, 1.4vw, 22px)' }}
        >
          {strategy.title}
        </h3>
      </div>

      <p
        className="font-semibold leading-snug"
        style={{ color: strategy.accent, fontSize: 'clamp(12px, 1.05vw, 15px)' }}
      >
        {strategy.headline}
      </p>

      <p
        className="text-white/65 leading-relaxed"
        style={{ fontSize: 'clamp(11px, 0.92vw, 13px)' }}
      >
        {strategy.detail}
      </p>

      <div
        className="mt-auto pt-2.5 border-t flex flex-wrap gap-1.5"
        style={{ borderColor: `${strategy.accent}33` }}
      >
        {strategy.examples.map((ex) => (
          <span
            key={ex}
            className="px-2 py-0.5 rounded font-semibold"
            style={{
              color: strategy.accent,
              background: `${strategy.accent}14`,
              border: `1px solid ${strategy.accent}40`,
              fontSize: 'clamp(10px, 0.85vw, 12px)',
            }}
          >
            {ex}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

function ReviewElementCard({
  element,
  index,
}: {
  element: (typeof REVIEW_ELEMENTS)[number];
  index: number;
}) {
  const highlight = 'highlight' in element && element.highlight;
  return (
    <motion.div
      className="relative flex flex-col gap-1 px-3 py-2.5 rounded-xl border overflow-hidden h-full"
      style={{
        borderColor: highlight ? `${element.accent}77` : `${element.accent}40`,
        background: highlight
          ? `linear-gradient(135deg, ${element.accent}20 0%, rgba(255,255,255,0.02) 100%)`
          : 'rgba(255,255,255,0.025)',
        boxShadow: highlight ? `0 0 20px -8px ${element.accent}55` : undefined,
      }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.55 + index * 0.06 }}
    >
      <div
        className="absolute left-0 top-0 bottom-0 w-1"
        style={{ background: element.accent, boxShadow: `0 0 10px ${element.accent}55` }}
      />
      <div className="ml-1 flex items-baseline gap-2">
        <span
          className="shrink-0 font-mono font-bold tabular-nums"
          style={{ color: element.accent, fontSize: 'clamp(11px, 0.95vw, 13px)' }}
        >
          {element.num}
        </span>
        <h4
          className="font-bold text-white leading-snug"
          style={{ fontSize: 'clamp(12px, 1.05vw, 15px)' }}
        >
          {element.title}
        </h4>
      </div>
      <p
        className="ml-1 text-white/72 leading-snug"
        style={{ fontSize: 'clamp(10.5px, 0.9vw, 12.5px)' }}
      >
        {element.body}
      </p>
    </motion.div>
  );
}

export default function Slide74OutputReviewCriteria() {
  return (
    <SlideWrapper>
      <motion.div
        className="flex flex-col gap-4 md:gap-5 w-full max-w-6xl py-6 md:py-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex flex-col gap-1.5 shrink-0">
          <span
            className="tracking-[0.32em] uppercase text-white/40"
            style={{ fontSize: 'clamp(10px, 0.95vw, 13px)' }}
          >
            5-5 · 出力情報 · 社内審査
          </span>
          <h2
            className="font-bold tracking-tight text-white leading-tight"
            style={{ fontSize: 'clamp(20px, 2.2vw, 32px)' }}
          >
            出力の社内外利用 —
            <span
              className="bg-clip-text text-transparent mx-1.5"
              style={{
                backgroundImage: `linear-gradient(90deg, ${OUTPUT_GRAD[0]} 0%, ${OUTPUT_GRAD[1]} 100%)`,
              }}
            >
              審査リソースをどう絞るか
            </span>
          </h2>
          <p
            className="text-white/50 leading-snug"
            style={{ fontSize: 'clamp(11px, 0.95vw, 13px)' }}
          >
            全件を個別審査するのは現実的でない — 対象を絞り、仕組みで代替するのが基本姿勢
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 items-stretch">
          {STRATEGIES.map((s, i) => (
            <StrategyCard key={s.badge} strategy={s} index={i} />
          ))}
        </div>

        <motion.div
          className="flex flex-col gap-2.5 shrink-0"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <div className="flex items-center gap-2 px-1">
            <span
              className="tracking-[0.2em] uppercase font-semibold text-white/50"
              style={{ fontSize: 'clamp(9px, 0.78vw, 11px)' }}
            >
              それでも個別審査が必要なケースの構成
            </span>
            <div className="flex-1 h-px bg-white/10" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 md:gap-3 items-stretch">
            {REVIEW_ELEMENTS.map((el, i) => (
              <ReviewElementCard key={el.num} element={el} index={i} />
            ))}
          </div>
        </motion.div>
      </motion.div>
    </SlideWrapper>
  );
}
