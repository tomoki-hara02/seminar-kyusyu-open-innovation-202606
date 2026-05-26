'use client';

import React from 'react';
import { motion } from 'framer-motion';
import SlideWrapper from '../../SlideWrapper';

/**
 * ワークショップ用 架空企業：ギャップを埋める社長の考え。
 * 5 つの KPI ギャップに対する社長の改善イメージを 5 カードで提示。
 */

type Gap = {
  badge: string;
  area: string;
  title: string;
  delta: string;
  accent: string;
  ideas: string[];
  Icon: React.FC<{ color: string; size?: number }>;
};

const IconRevenue: React.FC<{ color: string; size?: number }> = ({ color, size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="1" x2="12" y2="23" />
    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
  </svg>
);
const IconProfit: React.FC<{ color: string; size?: number }> = ({ color, size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 17 9 11 13 15 21 7" />
    <polyline points="14 7 21 7 21 14" />
  </svg>
);
const IconCart: React.FC<{ color: string; size?: number }> = ({ color, size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
  </svg>
);
const IconUsers: React.FC<{ color: string; size?: number }> = ({ color, size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);
const IconClock: React.FC<{ color: string; size?: number }> = ({ color, size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
  </svg>
);

const GAPS: Gap[] = [
  {
    badge: '01',
    area: 'TOP LINE',
    title: '売上高',
    delta: '+3.5億円',
    accent: '#88bbff',
    Icon: IconRevenue,
    ideas: [
      'EC事業の顧客接点を厚くしリピート購買・客単価を引き上げる',
      '自社ブランドを首都圏 百貨店POPUP で露出させ域外顧客を獲得',
      'OEMは既存 3社依存を抜けて新規開拓を進める',
    ],
  },
  {
    badge: '02',
    area: 'PROFIT',
    title: '経常利益',
    delta: '+6,000万円',
    accent: '#9ee0a8',
    Icon: IconProfit,
    ideas: [
      '仕入先見直し・量産効果で生地/副資材コスト を下げ原価率を圧縮',
      '物流費を最適化（出荷集約・配送ルート見直し）',
      'シーズン在庫の早期消化と発注精度向上で在庫ロスを削減',
      '受発注の手戻り・クレーム対応の再加工・特急便コスト を削る',
    ],
  },
  {
    badge: '03',
    area: 'CHANNEL MIX',
    title: 'EC売上比率',
    delta: '20% → 30%',
    accent: '#c8a8ff',
    Icon: IconCart,
    ideas: [
      'EC専用商品 を拡充',
      '既存EC顧客との関係性を深め、リピート購入 を促進',
      'SNS発信の頻度と質を上げ、新規顧客流入を増やす',
      '広告運用効率（CPA・ROAS）を改善',
    ],
  },
  {
    badge: '04',
    area: 'PRODUCTIVITY',
    title: '1人あたり粗利',
    delta: '+180万円',
    accent: '#f7c46c',
    Icon: IconUsers,
    ideas: [
      '人を増やさず、今の 85名で売上と粗利を伸ばす',
      '単純作業（転記・集計・問合せ対応）の時間を削減',
      '企画・接客・営業開拓 など付加価値業務に時間を振り向ける',
      '粗利率の高い自社ブランド比率を上げる',
    ],
  },
  {
    badge: '05',
    area: 'SPEED',
    title: '新規商品リードタイム',
    delta: '4〜6ヶ月 → 3ヶ月以内',
    accent: '#7bd3ff',
    Icon: IconClock,
    ideas: [
      '企画プロセスの初期段階（アイデア出し・絞り込み）を高速化',
      '試作判断の意思決定を早める',
      'サンプル生産から本生産への移行をスムーズに',
    ],
  },
];

export default function Slide16FictionalGapPlan() {
  return (
    <SlideWrapper>
      <motion.div
        className="flex flex-col w-full h-full max-w-6xl px-2 py-4 pt-14 gap-3"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: 'easeInOut' }}
      >
        {/* ヘッダー */}
        <div className="shrink-0 flex items-end gap-4">
          <div className="flex flex-col gap-1">
            <span
              className="tracking-[0.22em] uppercase text-white/30"
              style={{ fontSize: 'clamp(10px, 1vw, 14px)' }}
            >
              Workshop · Company Profile · 3/3
            </span>
            <h2
              className="font-bold tracking-tight text-white leading-tight whitespace-nowrap"
              style={{ fontSize: 'clamp(22px, 3.2vw, 48px)' }}
            >
              ギャップを埋めるための
              <span
                className="bg-clip-text text-transparent ml-2"
                style={{ backgroundImage: 'linear-gradient(90deg, #88bbff 0%, #c8a8ff 60%, #ffaacc 100%)' }}
              >
                社長の考え
              </span>
            </h2>
          </div>
        </div>

        {/* 5 横長カード */}
        <div className="flex flex-col gap-2 flex-1 min-h-0">
          {GAPS.map((g, i) => (
            <motion.div
              key={g.badge}
              className="flex flex-row items-stretch rounded-xl border overflow-hidden flex-1 min-h-0"
              style={{ borderColor: `${g.accent}44` }}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.15 + i * 0.08, ease: 'easeOut' }}
            >
              {/* 左：番号 + アイコン + KPI名 + ギャップ */}
              <div
                className="flex flex-col justify-evenly px-4 py-1.5 shrink-0 min-h-0 overflow-hidden"
                style={{
                  width: 'clamp(160px, 18vw, 240px)',
                  background: `linear-gradient(135deg, ${g.accent}22 0%, ${g.accent}08 100%)`,
                  borderRight: `1px solid ${g.accent}30`,
                }}
              >
                <div className="flex items-center justify-between">
                  <span
                    className="font-mono tracking-[0.28em] uppercase"
                    style={{ color: g.accent, fontSize: 'clamp(9px, 0.9vw, 13px)' }}
                  >
                    {g.area}
                  </span>
                  <div
                    className="rounded-full flex items-center justify-center shrink-0"
                    style={{
                      width: 'clamp(28px, 2.8vw, 40px)',
                      height: 'clamp(28px, 2.8vw, 40px)',
                      background: `linear-gradient(135deg, ${g.accent}33, ${g.accent}10)`,
                      border: `1px solid ${g.accent}55`,
                    }}
                  >
                    <g.Icon color={g.accent} size={Math.round(16 * 1.2)} />
                  </div>
                </div>
                <h3
                  className="font-bold text-white leading-tight"
                  style={{ fontSize: 'clamp(13px, 1.5vw, 20px)' }}
                >
                  {g.title}
                </h3>
              </div>

              {/* 右：改善アイデアリスト */}
              <div
                className="flex flex-col justify-evenly px-4 py-1.5 flex-1 min-w-0 min-h-0 overflow-hidden"
                style={{
                  background: `linear-gradient(90deg, ${g.accent}08 0%, transparent 50%)`,
                }}
              >
                {g.ideas.map((idea, ii) => (
                  <motion.div
                    key={ii}
                    className="flex items-start gap-2"
                    initial={{ opacity: 0, x: 12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.4 + i * 0.08 + ii * 0.06 }}
                  >
                    <span
                      className="shrink-0 font-bold leading-snug"
                      style={{ color: g.accent, fontSize: 'clamp(11px, 1.1vw, 15px)' }}
                    >
                      ▸
                    </span>
                    <p
                      className="leading-snug text-white/80"
                      style={{ fontSize: 'clamp(12px, 1.2vw, 16px)' }}
                    >
                      {idea}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

      </motion.div>
    </SlideWrapper>
  );
}
