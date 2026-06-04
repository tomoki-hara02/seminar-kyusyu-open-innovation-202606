'use client';

import { motion } from 'framer-motion';
import SlideWrapper from '../../SlideWrapper';

/**
 * p60: 4-6 著作物 — Step 1 著作物該当性（創作性）
 *
 * ベーステンプレート: `templates/BentoGrid.tsx`
 * 上段: 著作権法第2条の定義 / 左: 2つの原則 / 右: 注意点2件 / 下: MCPコラム
 */

const CHAPTER_ACCENT = '#9ee0a8';
const LAW_ACCENT = '#60a5fa';
const HIGHLIGHT_COLOR = '#88bbff';
const PRINCIPLE_ACCENT = '#ff7aa8';
const CAUTION_ACCENT = '#fb923c';
const COLUMN_ACCENT = '#c8a8ff';

const MCP_COLUMN = {
  title: 'MCP（Model Context Protocol）は著作権の対象か？',
  body: '「MCPという通信の仕組みや仕様」に沿って独自のシステムを開発・実装すること自体は、著作権の侵害にはならない',
  lawRef: '→著作権法10条３項（確認規定）',
  sdkLabel: '公式SDKやサーバーのソースコード',
  sdkBadge: '対象（ただしOSS）',
  sdkBody:
    'Anthropic社などがGitHubなどで公開しているMCPのSDK（ソフトウェア開発キット）やサーバーの実装コードは、「プログラムの著作物」として著作権の対象です。',
} as const;

const ARTICLE_SUMMARY = '一言でいうと、その人の個性の発露が表現に表れているかどうか';

const PRINCIPLES = [
  {
    heading: 'ありふれた表現は保護されない',
    bullets: ['契約書における契約条項'],
    caseTitle: '「ラストメッセージ in 最終号事件（東京地裁H7.12.18）」',
    caseDesc:
      '→雑誌の出版社の休刊のお知らせを記述した文書について、ありふれた文書であることなどを理由に創作性を否定するなどした事案',
  },
  {
    heading: '保護されるのは具体的な表現でありアイデアではない',
    body: '思想や感情、アイデアの要素は著作権法における独占の対象とはならない。',
  },
] as const;

const CAUTION = {
  heading: '注意点',
  paragraphs: [
    '著作権は他の多くの知的財産権と異なり、無方式主義が採用されています。',
    '商標や特許など登録型の知的財産権との抵触は別途検討が必要です。',
    'また、近時、著作物性が否定された事例においても、民法上の一般不法行為として賠償責任を認める事例が出ています。',
  ],
  caseRef: '（バンドスコア事件：東京高裁令和6年6月19日）',
} as const;

function PrincipleSection({
  item,
  index,
}: {
  item: (typeof PRINCIPLES)[number];
  index: number;
}) {
  return (
    <motion.div
      className="flex flex-col gap-1.5"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.2 + index * 0.1 }}
    >
      <h4
        className="font-bold leading-relaxed"
        style={{ color: PRINCIPLE_ACCENT, fontSize: 'clamp(14px, 1.25vw, 18px)' }}
      >
        【{item.heading}】
      </h4>

      {'bullets' in item && (
        <ul className="flex flex-col gap-0.5">
          {item.bullets.map((b) => (
            <li
              key={b}
              className="text-white/80 leading-relaxed"
              style={{ fontSize: 'clamp(13px, 1.15vw, 17px)' }}
            >
              ・{b}
            </li>
          ))}
        </ul>
      )}

      {'body' in item && (
        <p
          className="text-white/80 leading-relaxed"
          style={{ fontSize: 'clamp(13px, 1.15vw, 17px)' }}
        >
          {item.body}
        </p>
      )}

      {'caseTitle' in item && (
        <>
          <p
            className="text-white/65 leading-relaxed"
            style={{ fontSize: 'clamp(13px, 1.08vw, 17px)' }}
          >
            {item.caseTitle}
          </p>
          <p
            className="text-white/55 leading-relaxed"
            style={{ fontSize: 'clamp(13px, 1.05vw, 16px)' }}
          >
            {item.caseDesc}
          </p>
        </>
      )}

    </motion.div>
  );
}

export default function Slide60CopyrightWorkDefinition() {
  return (
    <SlideWrapper>
      <motion.div
        className="flex flex-col gap-3 md:gap-3.5 w-full max-w-6xl h-full justify-center py-6 md:py-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* ヘッダー */}
        <div className="flex flex-col gap-1 shrink-0">
          <span
            className="tracking-[0.32em] uppercase text-white/40"
            style={{ fontSize: 'clamp(10px, 0.9vw, 12px)' }}
          >
            4-6 · 著作物 · Step 1
          </span>
          <h2
            className="font-bold tracking-tight text-white leading-tight"
            style={{ fontSize: 'clamp(20px, 2.2vw, 34px)' }}
          >
            対象物が著作物に該当するか
            <span style={{ color: CHAPTER_ACCENT }} className="ml-2">
              （創作性）
            </span>
          </h2>
        </div>

        {/* 定義バー（Bento 上段） */}
        <motion.div
          className="shrink-0 flex flex-col gap-0.5 px-3 py-2.5 md:px-3.5 md:py-3 rounded-xl border"
          style={{
            borderColor: `${LAW_ACCENT}44`,
            background: `linear-gradient(135deg, ${LAW_ACCENT}10 0%, rgba(255,255,255,0.02) 100%)`,
          }}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.08 }}
        >
          <span
            className="tracking-[0.18em] text-white/40"
            style={{ fontSize: 'clamp(11px, 1vw, 14px)' }}
          >
            （定義）第2条
          </span>
          <p
            className="text-white/85 leading-relaxed"
            style={{ fontSize: 'clamp(13px, 1.2vw, 18px)' }}
          >
            一　著作物　思想又は感情を
            <span
              className="font-semibold underline underline-offset-4 decoration-2"
              style={{ color: HIGHLIGHT_COLOR, textDecorationColor: `${HIGHLIGHT_COLOR}88` }}
            >
              創作的に表現
            </span>
            したものであって、文芸、学術、美術又は音楽の範囲に属するものをいう。
          </p>

          <div className="flex flex-col items-center gap-1 pt-1">
            <span
              className="leading-none"
              style={{ color: HIGHLIGHT_COLOR, fontSize: 'clamp(14px, 1.2vw, 18px)' }}
              aria-hidden
            >
              ↓
            </span>
            <p
              className="text-white leading-relaxed text-center w-full"
              style={{ fontSize: 'clamp(14px, 1.25vw, 18px)' }}
            >
              {ARTICLE_SUMMARY}
            </p>
          </div>
        </motion.div>

        {/* メイングリッド: 左 原則 / 右 注意点 */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.65fr_1fr] gap-2.5 md:gap-3 items-start">
          {/* 左: 2つの原則 */}
          <motion.div
            className="flex flex-col gap-3 px-3 py-2.5 md:px-3.5 md:py-3 rounded-xl border self-start"
            style={{
              borderColor: `${LAW_ACCENT}55`,
              background: `linear-gradient(160deg, ${LAW_ACCENT}0a 0%, rgba(255,255,255,0.02) 100%)`,
            }}
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            {PRINCIPLES.map((item, i) => (
              <div key={item.heading}>
                <PrincipleSection item={item} index={i} />
                {i < PRINCIPLES.length - 1 && (
                  <div className="mt-3 h-px bg-white/8" />
                )}
              </div>
            ))}
          </motion.div>

          {/* 右: 注意点（統合） */}
          <motion.div
            className="flex flex-col gap-1.5 px-3 py-2.5 md:px-3.5 md:py-3 rounded-xl border self-start"
            style={{
              borderColor: `${CAUTION_ACCENT}44`,
              background: `linear-gradient(160deg, ${CAUTION_ACCENT}0c 0%, rgba(255,255,255,0.02) 100%)`,
            }}
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.22 }}
          >
            <h4
              className="font-bold"
              style={{ color: CAUTION_ACCENT, fontSize: 'clamp(14px, 1.25vw, 18px)' }}
            >
              【{CAUTION.heading}】
            </h4>
            <div className="flex flex-col gap-1.5">
              {CAUTION.paragraphs.map((p) => (
                <p
                  key={p}
                  className="text-white/80 leading-relaxed"
                  style={{ fontSize: 'clamp(13px, 1.12vw, 16px)' }}
                >
                  {p}
                </p>
              ))}
              <p
                className="text-white/55 leading-relaxed"
                style={{ fontSize: 'clamp(14px, 1.25vw, 18px)' }}
              >
                {CAUTION.caseRef}
              </p>
            </div>
          </motion.div>
        </div>

        {/* コラム: MCP と著作物性 */}
        <motion.div
          className="shrink-0 flex flex-col gap-1.5 px-3 py-2.5 md:px-4 md:py-3 rounded-xl border"
          style={{
            borderColor: `${COLUMN_ACCENT}55`,
            background: `linear-gradient(90deg, ${COLUMN_ACCENT}12 0%, rgba(255,255,255,0.02) 100%)`,
            boxShadow: `0 0 24px -8px ${COLUMN_ACCENT}33`,
          }}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.38 }}
        >
          <div className="flex items-center gap-3">
            <span
              className="shrink-0 font-mono tracking-[0.2em] uppercase px-2 py-1 rounded-md border"
              style={{
                color: COLUMN_ACCENT,
                borderColor: `${COLUMN_ACCENT}55`,
                background: `${COLUMN_ACCENT}14`,
                fontSize: 'clamp(10px, 0.78vw, 11px)',
              }}
            >
              Column
            </span>
            <p
              className="font-semibold text-white leading-relaxed min-w-0"
              style={{ fontSize: 'clamp(14px, 1.25vw, 18px)' }}
            >
              {MCP_COLUMN.title}
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-1">
              <p
                className="text-white/80 leading-relaxed"
                style={{ fontSize: 'clamp(13px, 1.15vw, 17px)' }}
              >
                {MCP_COLUMN.body}
              </p>
              <p
                className="leading-relaxed"
                style={{ color: LAW_ACCENT, fontSize: 'clamp(13px, 1.08vw, 17px)' }}
              >
                {MCP_COLUMN.lawRef}
              </p>
            </div>

            <div className="h-px bg-white/8" />

            <div className="flex flex-col gap-1">
              <p
                className="font-semibold leading-relaxed"
                style={{ fontSize: 'clamp(13px, 1.15vw, 17px)' }}
              >
                <span className="text-white">{MCP_COLUMN.sdkLabel}：</span>
                <span style={{ color: CHAPTER_ACCENT }}>【{MCP_COLUMN.sdkBadge}】</span>
              </p>
              <p
                className="text-white/80 leading-relaxed"
                style={{ fontSize: 'clamp(13px, 1.15vw, 17px)' }}
              >
                {MCP_COLUMN.sdkBody}
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </SlideWrapper>
  );
}
