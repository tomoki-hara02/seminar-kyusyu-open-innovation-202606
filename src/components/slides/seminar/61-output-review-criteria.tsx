'use client';

import { motion } from 'framer-motion';
import SlideWrapper from '../../SlideWrapper';

/**
 * p61: 5-5 出力情報 — 出力利用時の社内審査基準
 */

const OUTPUT_ACCENT = '#ff9966';
const OUTPUT_GRAD: [string, string] = ['#f17a45', '#c64823'];
const LAW_ACCENT = '#60a5fa';
const HIGHLIGHT_ACCENT = '#f7c46c';

const SECTIONS = [
  {
    num: '01',
    title: '審査担当者',
    accent: LAW_ACCENT,
    items: ['法務部', '統括責任者 など'],
    list: false,
  },
  {
    num: '02',
    title: '審査資料',
    accent: '#88bbff',
    items: [
      '対象生成物を生成させたスレッド（プロンプト）情報',
      '対象生成物',
    ],
    list: true,
  },
  {
    num: '03',
    title: '審査方法（例）',
    accent: '#c8a8ff',
    items: [
      { label: 'プロンプト', desc: '入力情報に他者権利付着物が含まれているか' },
      { label: '画像', desc: '画像検索で類似画像が出てくるか否か' },
    ],
    list: 'paired' as const,
  },
  {
    num: '04',
    title: '利用方法の指定',
    accent: HIGHLIGHT_ACCENT,
    items: [
      'リスクベースアプローチから許容できる範囲で生成物利用を活用',
    ],
    list: false,
    highlight: true,
  },
] as const;

function ReviewSection({
  section,
  index,
}: {
  section: (typeof SECTIONS)[number];
  index: number;
}) {
  return (
    <motion.div
      className="relative flex flex-col gap-2 px-4 py-2.5 md:py-3 rounded-xl border overflow-hidden shrink-0"
      style={{
        borderColor: `${section.accent}44`,
        background: section.highlight
          ? `linear-gradient(135deg, ${section.accent}14 0%, rgba(255,255,255,0.02) 100%)`
          : 'rgba(255,255,255,0.03)',
      }}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.12 + index * 0.07 }}
    >
      <div
        className="absolute left-0 top-0 bottom-0 w-1"
        style={{ background: section.accent, boxShadow: `0 0 10px ${section.accent}55` }}
      />

      <div className="flex items-center gap-2.5 ml-1">
        <span
          className="shrink-0 font-mono font-bold tabular-nums"
          style={{ color: section.accent, fontSize: 'clamp(12px, 1vw, 15px)' }}
        >
          {section.num}
        </span>
        <h3
          className="font-bold text-white leading-snug"
          style={{ fontSize: 'clamp(13px, 1.15vw, 17px)' }}
        >
          {section.title}
        </h3>
      </div>

      <div className="ml-1 pl-0.5">
        {section.list === true && (
          <ul className="flex flex-col gap-1.5">
            {section.items.map((item) => (
              <li
                key={item}
                className="flex items-start gap-2 text-white/80 leading-snug"
                style={{ fontSize: 'clamp(11px, 0.95vw, 14px)' }}
              >
                <span className="shrink-0 text-white/35 mt-0.5">－</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        )}

        {section.list === 'paired' && (
          <div className="flex flex-col gap-2">
            {section.items.map((item) => (
              <div
                key={item.label}
                className="flex flex-row items-baseline gap-2 px-2.5 py-2 rounded-lg border"
                style={{
                  borderColor: `${section.accent}33`,
                  background: `${section.accent}0a`,
                }}
              >
                <span
                  className="shrink-0 font-semibold"
                  style={{ color: section.accent, fontSize: 'clamp(11px, 0.95vw, 13px)' }}
                >
                  {item.label}：
                </span>
                <span
                  className="text-white/80 leading-snug"
                  style={{ fontSize: 'clamp(11px, 0.95vw, 14px)' }}
                >
                  {item.desc}
                </span>
              </div>
            ))}
          </div>
        )}

        {!section.list && (
          <p
            className={`leading-snug ${section.highlight ? 'font-semibold' : ''}`}
            style={{
              color: section.highlight ? section.accent : 'rgba(255,255,255,0.8)',
              fontSize: 'clamp(11px, 0.95vw, 14px)',
            }}
          >
            {section.items.join(' · ')}
          </p>
        )}
      </div>
    </motion.div>
  );
}

export default function Slide61OutputReviewCriteria() {
  return (
    <SlideWrapper>
      <motion.div
        className="flex flex-col gap-3 md:gap-4 w-full max-w-6xl h-full justify-center py-4 md:py-5"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex flex-col gap-1 shrink-0">
          <span
            className="tracking-[0.32em] uppercase text-white/40"
            style={{ fontSize: 'clamp(10px, 0.95vw, 13px)' }}
          >
            5-5 · 出力情報 · 社内審査
          </span>
          <h2
            className="font-bold tracking-tight text-white leading-tight"
            style={{ fontSize: 'clamp(20px, 2.1vw, 32px)' }}
          >
            出力情報を
            <span
              className="bg-clip-text text-transparent mx-1"
              style={{
                backgroundImage: `linear-gradient(90deg, ${OUTPUT_GRAD[0]} 0%, ${OUTPUT_GRAD[1]} 100%)`,
              }}
            >
              社内外で利用する場合
            </span>
            の審査基準
          </h2>
        </div>

        <div className="flex flex-col gap-2 md:gap-2.5 w-full max-w-3xl">
          {SECTIONS.map((section, i) => (
            <ReviewSection key={section.num} section={section} index={i} />
          ))}
        </div>
      </motion.div>
    </SlideWrapper>
  );
}
