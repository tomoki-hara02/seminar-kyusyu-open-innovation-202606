'use client';

import { motion } from 'framer-motion';
import SlideWrapper from '../../SlideWrapper';

/** p83: 業務での活用用途 TOP7 — 横棒グラフ（タイトル・中見出し・注記付き） */

const GRADIENT = 'linear-gradient(90deg, #60a5fa 0%, #88bbff 45%, #c8a8ff 100%)';

type TopUse = {
  rank: number;
  usage: string;
  sub: string;
  pct: number;
  pctLabel: string;
  comment: string;
  accent: string;
  estimated?: boolean;
};

const TOP7: TopUse[] = [
  {
    rank: 1,
    usage: '文書作成・議事録',
    sub: '企画書・報告書・議事録',
    pct: 63.1,
    pctLabel: '63.1%',
    comment: '最多。初期導入の定番',
    accent: '#60a5fa',
  },
  {
    rank: 2,
    usage: '情報収集・要約',
    sub: 'リサーチ・サマリー生成',
    pct: 51.4,
    pctLabel: '51.4%',
    comment: '半数超が活用',
    accent: '#88bbff',
  },
  {
    rank: 3,
    usage: 'アイデア出し',
    sub: 'ブレインストーミング',
    pct: 37.4,
    pctLabel: '37.4%',
    comment: '企画・マーケで人気',
    accent: '#c8a8ff',
  },
  {
    rank: 4,
    usage: '翻訳',
    sub: '多言語対応・英文作成',
    pct: 30,
    pctLabel: '約30%',
    comment: 'グローバル対応で需要',
    accent: '#f7c46c',
    estimated: true,
  },
  {
    rank: 5,
    usage: 'プログラミング',
    sub: 'コード生成・デバッグ',
    pct: 25,
    pctLabel: '約25%',
    comment: 'エンジニア職で急拡大',
    accent: '#ffaacc',
    estimated: true,
  },
  {
    rank: 6,
    usage: '画像・資料生成',
    sub: 'スライド・ビジュアル',
    pct: 20,
    pctLabel: '約20%',
    comment: 'クリエイティブ職中心',
    accent: '#9ee0a8',
    estimated: true,
  },
  {
    rank: 7,
    usage: '法務・専門領域',
    sub: '契約書・コンプライアンス',
    pct: 14,
    pctLabel: '約14%',
    comment: '専門特化型へ拡大中',
    accent: '#ff9966',
    estimated: true,
  },
];

const FOOTNOTES = [
  '1〜3位（63.1%・51.4%・37.4%）はコーレ株式会社調査の公表値。',
  '4〜7位（約30%・25%・20%・14%）は複数調査の傾向値から推計した概算値で、特定調査の公表値ではありません。',
] as const;

function BarRow({ item, delay }: { item: TopUse; delay: number }) {
  return (
    <motion.div
      className="grid grid-cols-[2rem_minmax(0,1fr)_4rem] gap-x-3 gap-y-0.5 items-center"
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay }}
    >
      <span
        className="font-mono font-bold tabular-nums text-center row-span-2 self-center"
        style={{ color: item.accent, fontSize: 'clamp(13px, 1.1vw, 16px)' }}
      >
        {item.rank}
      </span>

      <div className="flex flex-col gap-0.5 min-w-0 col-start-2">
        <div className="flex items-baseline gap-2 min-w-0 flex-wrap">
          <span
            className="font-bold text-white leading-tight"
            style={{ fontSize: 'clamp(13px, 1.05vw, 16px)' }}
          >
            {item.usage}
          </span>
          <span
            className="text-white/50 leading-tight"
            style={{ fontSize: 'clamp(10px, 0.85vw, 12px)' }}
          >
            {item.sub}
          </span>
          {item.estimated && (
            <span
              className="shrink-0 font-mono tracking-wider px-1 py-px rounded border border-dashed"
              style={{
                color: `${item.accent}cc`,
                borderColor: `${item.accent}44`,
                fontSize: 'clamp(10px, 0.68vw, 9px)',
              }}
            >
              推計
            </span>
          )}
        </div>
        <div className="h-2.5 md:h-3 rounded-full bg-white/[0.06] overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{
              background: item.estimated
                ? `repeating-linear-gradient(90deg, ${item.accent}99 0, ${item.accent}99 8px, ${item.accent}55 8px, ${item.accent}55 13px)`
                : `linear-gradient(90deg, ${item.accent}aa, ${item.accent})`,
              boxShadow: item.estimated ? undefined : `0 0 10px ${item.accent}44`,
            }}
            initial={{ width: 0 }}
            animate={{ width: `${item.pct}%` }}
            transition={{ duration: 0.75, delay: delay + 0.08, ease: 'easeOut' }}
          />
        </div>
        <span
          className="text-white/42 leading-snug"
          style={{ fontSize: 'clamp(10px, 0.75vw, 11px)' }}
        >
          {item.comment}
        </span>
      </div>

      <span
        className="font-bold tabular-nums text-right row-span-2 self-center"
        style={{ color: item.accent, fontSize: 'clamp(13px, 1.05vw, 16px)' }}
      >
        {item.pctLabel}
      </span>
    </motion.div>
  );
}

export default function Slide83AiUseTop7() {
  return (
    <SlideWrapper>
      <motion.div
        className="flex flex-col w-full h-full max-w-5xl px-2 py-4 pt-12 gap-3 md:gap-4"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="shrink-0 flex flex-col gap-1">
          <span
            className="tracking-[0.28em] uppercase text-white/35"
            style={{ fontSize: 'clamp(10px, 0.85vw, 11px)' }}
          >
            活用実態 · 企業管理職調査
          </span>
          <h2
            className="font-bold tracking-tight text-white leading-tight"
            style={{ fontSize: 'clamp(20px, 2.3vw, 32px)' }}
          >
            業務での活用用途
            <span className="bg-clip-text text-transparent ml-1.5" style={{ backgroundImage: GRADIENT }}>
              TOP7
            </span>
            <span
              className="text-white/55 font-semibold ml-1.5"
              style={{ fontSize: 'clamp(13px, 1.05vw, 17px)' }}
            >
              （複数回答）
            </span>
          </h2>
          <p
            className="text-white/45 leading-snug"
            style={{ fontSize: 'clamp(10px, 0.82vw, 11px)' }}
          >
            出典：コーレ株式会社「企業の生成AI利用実態調査」2026年1月（管理職・マネージャー n=1,008）
          </p>
        </div>

        <div className="flex items-center gap-2 px-0.5 shrink-0">
          <span
            className="tracking-[0.18em] uppercase font-semibold text-white/40"
            style={{ fontSize: 'clamp(10px, 0.78vw, 11px)' }}
          >
            順位 × 割合
          </span>
          <div className="flex-1 h-px bg-white/10" />
        </div>

        <div className="flex-1 min-h-0 flex flex-col justify-center gap-3 md:gap-3.5">
          {TOP7.map((item, i) => (
            <BarRow key={item.rank} item={item} delay={0.1 + i * 0.06} />
          ))}
        </div>

        <motion.div
          className="shrink-0 flex flex-col gap-0.5 pt-2 border-t border-white/10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.45, delay: 0.75 }}
        >
          {FOOTNOTES.map((note, i) => (
            <p
              key={i}
              className="text-white/32 leading-snug"
              style={{ fontSize: 'clamp(10px, 0.7vw, 10px)' }}
            >
              ※{note}
            </p>
          ))}
        </motion.div>
      </motion.div>
    </SlideWrapper>
  );
}
