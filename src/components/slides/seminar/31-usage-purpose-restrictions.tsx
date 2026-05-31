'use client';

import { motion } from 'framer-motion';
import SlideWrapper from '../../SlideWrapper';

/**
 * p32: 1-2 利用目的 — 生成AI利用規約による制限
 *
 * ベーステンプレート: `templates/FurtherReading.tsx`
 */

interface RestrictionSection {
  badge: string;
  title: string;
  color: string;
  examples: string[];
  domains?: string[];
}

const SECTIONS: RestrictionSection[] = [
  {
    badge: '保護',
    title: '人々の保護',
    color: '#ff7aa8',
    examples: [
      '脅迫、威嚇、嫌がらせ、中傷',
      '有資格者の適切な関与なく、資格を要する個別の助言（法律や医療に関する助言など）を提供する行為',
    ],
  },
  {
    badge: 'Privacy',
    title: 'プライバシーの尊重',
    color: '#c8a8ff',
    examples: [
      '本人の同意なく、ある人物の肖像（写真のようにリアルな画像や声を含む）を使用し、本物と誤認させる可能性のある使用',
      '社会的行動、個人の特性、生体データに基づく個人の評価・分類（社会的スコアリング、プロファイリング、機微な属性の推測を含む）',
      '職場や教育の場における個人の感情に関する推測（医療上又は安全上の理由で必要な場合を除く）',
    ],
  },
  {
    badge: 'Minor',
    title: '未成年者の安全確保',
    color: '#88bbff',
    examples: [
      '未成年者に対し、心身に有害なダイエットや運動を推奨する行為',
      '未成年者の体型や外見を揶揄したり、レッテルを貼ったりする行為',
    ],
  },
  {
    badge: 'Decision',
    title: '人々の意思決定の尊重',
    color: '#60a5fa',
    examples: [
      '機密性の高い領域での重大な意思決定の、人間の確認のない自動化',
    ],
    domains: [
      '重要インフラ',
      '教育',
      '住居',
      '雇用',
      '金融活動・与信',
      '保険',
      '法律',
      '医療',
      '重要な行政サービス',
      '製品安全コンポーネント',
      '国家安全保障',
      '移住',
      '法執行',
    ],
  },
];

function SectionCard({ section, index }: { section: RestrictionSection; index: number }) {
  return (
    <motion.div
      className="flex flex-col gap-2.5 px-4 py-3.5 rounded-xl bg-white/[0.04] border border-white/10 min-h-0 min-w-0 overflow-hidden"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.12 + index * 0.08 }}
    >
      <div className="flex items-start gap-3 shrink-0">
        <div
          className="shrink-0 min-w-[4.5rem] text-[9px] tracking-widest uppercase text-center py-1 px-2 rounded-md border leading-tight"
          style={{
            color: section.color,
            borderColor: `${section.color}66`,
            background: `${section.color}11`,
          }}
        >
          {section.badge}
        </div>
        <p
          className="font-bold text-white leading-snug pt-0.5"
          style={{ fontSize: 'clamp(14px, 1.25vw, 18px)' }}
        >
          {section.title}
        </p>
      </div>

      <div className="flex flex-col gap-1.5 pl-1 min-h-0 overflow-hidden">
        <span
          className="text-white/35 tracking-wider"
          style={{ fontSize: 'clamp(10px, 0.85vw, 12px)' }}
        >
          例）
        </span>
        {section.examples.map((example) => (
          <div
            key={example}
            className="grid grid-cols-[1em_1fr] gap-x-1.5 items-start"
          >
            <span
              className="shrink-0 leading-none pt-0.5"
              style={{ color: section.color, fontSize: 'clamp(12px, 1vw, 14px)' }}
            >
              ·
            </span>
            <p
              className="text-white/72 leading-snug"
              style={{ fontSize: 'clamp(12px, 1.05vw, 14.5px)' }}
            >
              {example}
            </p>
          </div>
        ))}

        {section.domains && (
          <div className="flex flex-wrap gap-1.5 pt-1">
            {section.domains.map((domain) => (
              <span
                key={domain}
                className="px-2 py-0.5 rounded-md border text-white/65 leading-snug"
                style={{
                  fontSize: 'clamp(10px, 0.85vw, 12.5px)',
                  borderColor: `${section.color}44`,
                  background: `${section.color}0d`,
                }}
              >
                {domain}
              </span>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default function Slide31UsagePurposeRestrictions() {
  return (
    <SlideWrapper>
      <motion.div
        className="flex flex-col gap-5 w-full h-full max-w-6xl px-2 py-4 pt-14 min-h-0"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex flex-col gap-2 shrink-0">
          <span
            className="tracking-[0.32em] uppercase text-white/40"
            style={{ fontSize: 'clamp(9px, 0.9vw, 12px)' }}
          >
            1-2 · 利用目的 · Prohibited Use Cases
          </span>
          <h2
            className="font-bold tracking-tight text-white leading-tight"
            style={{ fontSize: 'clamp(22px, 2.6vw, 40px)' }}
          >
            生成AI利用規約による制限
          </h2>
          <p
            className="text-white/50 leading-relaxed"
            style={{ fontSize: 'clamp(13px, 1.1vw, 16px)' }}
          >
            次のようなユースケースは認められていない
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 flex-1 min-h-0 auto-rows-fr">
          {SECTIONS.map((section, i) => (
            <SectionCard key={section.title} section={section} index={i} />
          ))}
        </div>
      </motion.div>
    </SlideWrapper>
  );
}
