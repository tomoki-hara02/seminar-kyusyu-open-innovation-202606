'use client';

import { motion } from 'framer-motion';
import SlideWrapper from '../../SlideWrapper';

/**
 * p5: 令和8年改正個人情報保護法 — 12の改正項目（閣議決定案の概要）
 */

const LAW_ACCENT = '#60a5fa';
const GRADIENT = `linear-gradient(90deg, ${LAW_ACCENT} 0%, #88bbff 45%, #c8a8ff 100%)`;

type AmendmentItem = {
  badge: string;
  text: string;
};

type Category = {
  num: number;
  title: string;
  accent: string;
  items: AmendmentItem[];
};

const CATEGORIES: Category[] = [
  {
    num: 1,
    title: 'データ利活用の推進',
    accent: '#60a5fa',
    items: [
      {
        badge: '①',
        text: '統計作成等目的による同意不要の新設（AI開発等含む）',
      },
      {
        badge: '②',
        text: '同意取得の例外要件を緩和（本人意思不反の場合等）',
      },
    ],
  },
  {
    num: 2,
    title: 'リスク対応規律',
    accent: '#88bbff',
    items: [
      { badge: '③', text: '子ども（16歳未満）の個人情報規制を明確化・厳格化' },
      { badge: '④', text: '顔特徴データ等（特定生体個人情報）の規律を新設' },
      { badge: '⑤', text: '委託先の義務整備（目的外利用禁止・義務免除条件）' },
      { badge: '⑥', text: '漏えい時の本人通知義務を緩和（権利侵害おそれ小の場合）' },
    ],
  },
  {
    num: 3,
    title: '不適正利用等の防止',
    accent: '#f7c46c',
    items: [
      {
        badge: '⑦',
        text: '連絡可能個人関連情報（電話番号・メール・Cookie等）の不正利用・取得禁止',
      },
      { badge: '⑧', text: 'オプトアウト提供時に提供先の身元・目的確認を義務化' },
    ],
  },
  {
    num: 4,
    title: '規律遵守の実効性確保',
    accent: '#9ee0a8',
    items: [
      { badge: '⑨', text: '勧告・命令の発動要件を緩和・柔軟化' },
      { badge: '⑩', text: '違反を補助する第三者（クラウド事業者等）への要請根拠を法定' },
      {
        badge: '⑪',
        text: '罰則を強化・拡大（法定刑引上げ＋加害目的の取得も処罰対象に）',
      },
      { badge: '⑫', text: '課徴金制度を導入（違反行為で得た利益相当額）' },
    ],
  },
];

const META = [
  { label: '対象', value: '民間部門 中心' },
  { label: '施行見込み', value: '公布後 2年以内' },
  { label: '国会', value: '第221回特別国会 審議中' },
] as const;

function AmendmentRow({
  item,
  accent,
  delay,
}: {
  item: AmendmentItem;
  accent: string;
  delay: number;
}) {
  return (
    <motion.li
      className="flex items-start gap-2 min-w-0"
      initial={{ opacity: 0, x: -6 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.35, delay }}
    >
      <span
        className="shrink-0 font-bold leading-none pt-px"
        style={{ color: accent, fontSize: 'clamp(14px, 1.25vw, 16px)' }}
      >
        {item.badge}
      </span>
      <span
        className="text-white/82 leading-snug"
        style={{ fontSize: 'clamp(13px, 1.12vw, 15px)' }}
      >
        {item.text}
      </span>
    </motion.li>
  );
}

function CategoryCard({ category, baseDelay }: { category: Category; baseDelay: number }) {
  return (
    <motion.section
      className="flex flex-col gap-1.5 md:gap-2 p-2.5 md:p-3 rounded-xl border min-h-0 overflow-hidden"
      style={{
        borderColor: `${category.accent}33`,
        background: `linear-gradient(145deg, ${category.accent}10 0%, rgba(255,255,255,0.02) 100%)`,
      }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: baseDelay }}
    >
      <div className="flex items-center gap-2 shrink-0">
        <span
          className="shrink-0 font-mono font-bold rounded border leading-none px-1.5 py-0.5"
          style={{
            color: category.accent,
            borderColor: `${category.accent}55`,
            background: `${category.accent}14`,
            fontSize: 'clamp(12px, 1.05vw, 14px)',
          }}
        >
          {category.num}
        </span>
        <h3
          className="font-bold text-white leading-tight"
          style={{ fontSize: 'clamp(14px, 1.25vw, 16.5px)' }}
        >
          {category.title}
        </h3>
      </div>
      <ul className="flex flex-col gap-1 md:gap-1.5 flex-1 min-h-0">
        {category.items.map((item, i) => (
          <AmendmentRow
            key={item.badge}
            item={item}
            accent={category.accent}
            delay={baseDelay + 0.06 + i * 0.04}
          />
        ))}
      </ul>
    </motion.section>
  );
}

export default function Slide05PipAmendment2026() {
  return (
    <SlideWrapper>
      <motion.div
        className="flex flex-col w-full h-full max-w-7xl px-2 py-4 pt-12 gap-2.5 md:gap-3"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: 'easeInOut' }}
      >
        <div className="shrink-0 flex flex-col gap-1">
          <span
            className="tracking-[0.28em] uppercase text-white/35"
            style={{ fontSize: 'clamp(9px, 0.85vw, 11px)' }}
          >
            個人情報保護法 · 改正概要
          </span>
          <h2
            className="font-bold tracking-tight text-white leading-tight"
            style={{ fontSize: 'clamp(20px, 2.4vw, 34px)' }}
          >
            令和8年改正
            <span className="bg-clip-text text-transparent ml-1.5" style={{ backgroundImage: GRADIENT }}>
              個人情報保護法
            </span>
            <span className="text-white/90 ml-1.5" style={{ fontSize: 'clamp(16px, 1.9vw, 28px)' }}>
              12の改正項目
            </span>
          </h2>
          <p
            className="text-white/50 tracking-wide"
            style={{ fontSize: 'clamp(10px, 0.88vw, 12px)' }}
          >
            2026年4月7日閣議決定　／　公布から原則2年以内施行
          </p>
        </div>

        <div className="flex-1 min-h-0 grid grid-cols-2 grid-rows-2 gap-2 md:gap-2.5">
          {CATEGORIES.map((cat, i) => (
            <CategoryCard key={cat.num} category={cat} baseDelay={0.12 + i * 0.08} />
          ))}
        </div>

        <motion.div
          className="shrink-0 grid grid-cols-3 gap-2 md:gap-3"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.5 }}
        >
          {META.map((m) => (
            <div
              key={m.label}
              className="flex flex-col gap-0.5 px-2.5 py-2 rounded-lg border border-white/10 bg-white/[0.03]"
            >
              <span
                className="tracking-[0.2em] uppercase text-white/35"
                style={{ fontSize: 'clamp(8px, 0.72vw, 10px)' }}
              >
                {m.label}
              </span>
              <span
                className="font-semibold text-white/85 leading-snug"
                style={{ fontSize: 'clamp(10px, 0.88vw, 12px)' }}
              >
                {m.value}
              </span>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </SlideWrapper>
  );
}
