'use client';

import { motion } from 'framer-motion';
import SlideWrapper from '../../SlideWrapper';

/**
 * p54: 4-6 著作物 — 第47条の5 条文解説
 *
 * ベーステンプレート: `52-copyright-article-30-4.tsx`
 */

const LAW_ACCENT = '#60a5fa';
const HIGHLIGHT_ACCENT = '#f7c46c';
const CHAPTER_ACCENT = '#9ee0a8';
const CAUTION_ACCENT = '#f87171';
const DIAGRAM_LABEL = '#fca5a5';
const SOURCE_ACCENT = '#fb923c';

const EXAMPLE_STEPS = [
  '生成AIを用いてWeb検索を行う場合やRAG検索を行う場合',
  'プロンプトに「生成AIにおけるMCP利用についてサマリーを作って、サマリー内には、tAiL.法律事務所の記事があれば適宜重要箇所を引用して」と入力',
  '生成AIは、出力の一部にtAiL.法律事務所の記事を引用する',
] as const;

const EXAMPLE_CONCLUSIONS = [
  {
    text: '著作権法第30条の4は、享受目的があるため適用されない。',
    accent: CAUTION_ACCENT,
  },
  {
    text: 'しかし、第47条の5により、軽微利用であれば許容される余地がある。',
    accent: HIGHLIGHT_ACCENT,
  },
] as const;

const ARTICLE_SUBTITLE =
  '（電子計算機による情報処理及びその結果の提供に付随する軽微利用等）';

const ARTICLE_ITEMS = [
  '電子計算機を用いて、検索により求める情報（以下この号において「検索情報」という。）が記録された著作物の題号又は著作者名、送信可能化された検索情報に係る送信元識別符号（自動公衆送信の送信元を識別するための文字、番号、記号その他の符号をいう。第113条第2項及び第4項において同じ。）その他の検索情報の特定又は所在に関する情報を検索し、及びその結果を提供すること。',
  '電子計算機による情報解析を行い、及びその結果を提供すること。',
  '前2号に掲げるもののほか、電子計算機による情報処理により、新たな知見又は情報を創出し、及びその結果を提供する行為であつて、国民生活の利便性の向上に寄与するものとして政令で定めるもの',
] as const;

function ArticleLeadParagraph() {
  const hl = (text: string) => (
    <span
      style={{
        color: HIGHLIGHT_ACCENT,
        fontWeight: 700,
        background: `${HIGHLIGHT_ACCENT}18`,
        boxDecorationBreak: 'clone',
        WebkitBoxDecorationBreak: 'clone',
      }}
    >
      {text}
    </span>
  );

  return (
    <p
      className="text-white/85 leading-relaxed"
      style={{ fontSize: 'clamp(13px, 1.15vw, 17px)' }}
    >
      電子計算機を用いた情報処理により新たな知見又は情報を創出することによつて著作物の利用の促進に資する
      {hl('次の各号に掲げる行為を行う者')}
      （当該行為の一部を行う者を含み、当該行為を政令で定める基準に従つて行う者に限る。）
      {hl('は、公衆への提供等')}
      （公衆への提供又は提示をいい、送信可能化を含む。以下同じ。）
      {hl('が行われた著作物')}
      （以下この条及び次条第2項第2号において「公衆提供等著作物」という。）（公表された著作物又は送信可能化された著作物に限る。）
      {hl('について、')}
      当該各号に掲げる行為の目的上必要と認められる限度において、当該行為に付随して、いずれの方法によるかを問わず、
      {hl('利用')}
      （当該公衆提供等著作物のうちその利用に供される部分の占める割合、その利用に供される部分の量、その利用に供される際の表示の精度その他の要素に照らし軽微なものに限る。以下この条において「軽微利用」という。）
      {hl('を行うことができる。')}
      {hl('ただし、')}
      当該公衆提供等著作物に係る公衆への提供等が著作権を侵害するものであること（国外で行われた公衆への提供等にあつては、国内で行われたとしたならば著作権の侵害となるべきものであること）を知りながら当該軽微利用を行う場合その他
      {hl(
        '当該公衆提供等著作物の種類及び用途並びに当該軽微利用の態様に照らし著作権者の利益を不当に害することとなる場合は、この限りでない。'
      )}
    </p>
  );
}

function DocumentIcon({
  color,
  width = 44,
  height = 52,
  lines = 4,
}: {
  color: string;
  width?: number;
  height?: number;
  lines?: number;
}) {
  const lineYs = Array.from({ length: lines }, (_, i) => 16 + i * 8);
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 44 52"
      fill="none"
      aria-hidden
      className="shrink-0"
    >
      <rect
        x="3"
        y="2"
        width="38"
        height="48"
        rx="3"
        fill={`${color}18`}
        stroke={color}
        strokeWidth="2"
      />
      {lineYs.map((y) => (
        <line
          key={y}
          x1="10"
          y1={y}
          x2="34"
          y2={y}
          stroke={color}
          strokeWidth="1.75"
          strokeLinecap="round"
          opacity="0.65"
        />
      ))}
    </svg>
  );
}

function MinorUseDiagram() {
  return (
    <div
      className="shrink-0 rounded-lg border px-2.5 py-2.5"
      style={{
        borderColor: 'rgba(255,255,255,0.12)',
        background: 'rgba(0,0,0,0.18)',
      }}
    >
      <span
        className="font-bold text-white block mb-2"
        style={{ fontSize: 'clamp(12px, 1.1vw, 15px)' }}
      >
        【出力内容】軽微利用の3要素
      </span>

      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2 min-h-[7rem] md:min-h-[7.75rem]">
        {/* 左: 出力 */}
        <div
          className="relative flex flex-col items-center justify-end gap-1 rounded-md border px-2 py-2.5 h-full min-h-[6.5rem]"
          style={{
            borderColor: `${LAW_ACCENT}66`,
            background: `${LAW_ACCENT}0a`,
          }}
        >
          <span
            className="absolute top-1.5 left-2 font-bold leading-none"
            style={{ color: LAW_ACCENT, fontSize: 'clamp(10px, 0.92vw, 13px)' }}
          >
            出力
          </span>
          <div
            className="absolute inset-2 rounded border border-dashed pointer-events-none"
            style={{ borderColor: `${LAW_ACCENT}28` }}
            aria-hidden
          />
          <DocumentIcon color={LAW_ACCENT} width={34} height={40} lines={3} />
          <span
            className="font-bold text-center leading-snug"
            style={{ color: DIAGRAM_LABEL, fontSize: 'clamp(10px, 0.88vw, 12px)' }}
          >
            ②全体に対する割合
          </span>
        </div>

        {/* 中央: ③ + 矢印 */}
        <div className="flex flex-col items-center gap-1 px-1 shrink-0 self-center">
          <span
            className="font-bold text-center leading-snug max-w-[5.5rem]"
            style={{ color: DIAGRAM_LABEL, fontSize: 'clamp(10px, 0.88vw, 12px)' }}
          >
            ③出力時の
            <br />
            変化の度合い
          </span>
          <svg width="56" height="22" viewBox="0 0 56 22" fill="none" aria-hidden>
            <path
              d="M54 11H12M12 11L20 5M12 11L20 17"
              stroke={LAW_ACCENT}
              strokeWidth="2.25"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M48 7C40 15 28 7 20 11"
              stroke={`${LAW_ACCENT}55`}
              strokeWidth="1.5"
              strokeDasharray="2.5 2.5"
              strokeLinecap="round"
            />
          </svg>
        </div>

        {/* 右: 著作物 */}
        <div className="flex flex-col items-center justify-end gap-1 py-1.5">
          <div className="relative">
            <DocumentIcon color={SOURCE_ACCENT} width={42} height={50} lines={4} />
            <div
              className="absolute left-1 right-1 bottom-1.5 rounded-sm border-2"
              style={{
                height: '28%',
                borderColor: SOURCE_ACCENT,
                background: `${SOURCE_ACCENT}33`,
              }}
              aria-hidden
            />
          </div>
          <span
            className="font-bold text-center leading-snug"
            style={{ color: DIAGRAM_LABEL, fontSize: 'clamp(10px, 0.88vw, 12px)' }}
          >
            ①どの程度
            <br />
            使われたか
          </span>
        </div>
      </div>
    </div>
  );
}

function FlowArrow() {
  return (
    <span
      className="flex justify-center leading-none py-0.5"
      style={{ color: LAW_ACCENT, fontSize: 'clamp(14px, 1.2vw, 18px)' }}
      aria-hidden
    >
      ↓
    </span>
  );
}

function ApplicationExampleColumn() {
  return (
    <motion.div
      className="flex flex-col gap-1.5 px-3 py-2.5 md:px-3.5 md:py-3 rounded-xl border min-h-0"
      style={{
        borderColor: `${LAW_ACCENT}44`,
        background: `linear-gradient(160deg, ${LAW_ACCENT}0a 0%, rgba(255,255,255,0.02) 100%)`,
      }}
      initial={{ opacity: 0, x: 14 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.18 }}
    >
      <h3
        className="font-bold shrink-0"
        style={{ color: CHAPTER_ACCENT, fontSize: 'clamp(14px, 1.25vw, 18px)' }}
      >
        適用例として
      </h3>

      <div className="flex flex-col gap-0 min-h-0">
        {EXAMPLE_STEPS.map((step, i) => (
          <div key={step} className="flex flex-col gap-0">
            <motion.p
              className="text-white/85 leading-snug rounded-lg border px-2 py-1.5"
              style={{
                fontSize: 'clamp(11px, 0.95vw, 14px)',
                borderColor: `${LAW_ACCENT}33`,
                background: 'rgba(255,255,255,0.03)',
              }}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.24 + i * 0.08 }}
            >
              {step}
            </motion.p>
            {i < EXAMPLE_STEPS.length - 1 && <FlowArrow />}
          </div>
        ))}
      </div>

      <div className="h-px bg-white/8 shrink-0" />

      <div className="flex flex-col gap-1 shrink-0">
        <p
          className="text-white/70 leading-snug"
          style={{ fontSize: 'clamp(12px, 1.05vw, 15px)' }}
        >
          ここで、
        </p>
        <ul className="flex flex-col gap-1.5 list-none">
          {EXAMPLE_CONCLUSIONS.map((item, i) => (
            <motion.li
              key={item.text}
              className="flex items-start gap-2 rounded-lg border px-2 py-1.5"
              style={{
                borderColor: `${item.accent}44`,
                background: `${item.accent}0c`,
              }}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.48 + i * 0.08 }}
            >
              <span
                className="shrink-0 font-bold leading-relaxed"
                style={{ color: item.accent, fontSize: 'clamp(12px, 1.05vw, 15px)' }}
              >
                ○
              </span>
              <span
                className="text-white leading-snug min-w-0 font-semibold"
                style={{ fontSize: 'clamp(12px, 1.05vw, 15px)' }}
              >
                {item.text}
              </span>
            </motion.li>
          ))}
        </ul>
      </div>

      <div className="h-px bg-white/8 shrink-0" />

      <MinorUseDiagram />
    </motion.div>
  );
}

export default function Slide53CopyrightArticle475() {
  return (
    <SlideWrapper>
      <motion.div
        className="flex flex-col gap-3 md:gap-3.5 w-full max-w-6xl h-full justify-center py-5 md:py-6 overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex flex-col gap-1 shrink-0">
          <span
            className="tracking-[0.32em] uppercase text-white/40"
            style={{ fontSize: 'clamp(12px, 1.15vw, 16px)' }}
          >
            4-6 · 著作物 · 第47条の5
          </span>
          <h2
            className="font-bold tracking-tight text-white leading-snug"
            style={{ fontSize: 'clamp(18px, 1.9vw, 28px)' }}
          >
            {ARTICLE_SUBTITLE}
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 md:gap-3.5 items-stretch">
          {/* 左: 条文 */}
          <motion.div
            className="flex flex-col gap-2 px-3 py-2.5 md:px-3.5 md:py-3 rounded-xl border"
            style={{
              borderColor: `${HIGHLIGHT_ACCENT}55`,
              background: `linear-gradient(160deg, ${HIGHLIGHT_ACCENT}0c 0%, rgba(255,255,255,0.02) 100%)`,
            }}
            initial={{ opacity: 0, x: -14 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="flex items-baseline gap-2 flex-wrap">
              <span
                className="font-bold font-mono"
                style={{ color: HIGHLIGHT_ACCENT, fontSize: 'clamp(15px, 1.3vw, 19px)' }}
              >
                第47条の5
              </span>
              <span
                className="text-white/40"
                style={{ fontSize: 'clamp(11px, 1vw, 14px)' }}
              >
                著作権法
              </span>
            </div>

            <ArticleLeadParagraph />

            <ol className="flex flex-col gap-2 list-none counter-reset-none">
              {ARTICLE_ITEMS.map((item, i) => (
                <li key={item} className="flex gap-2">
                  <span
                    className="shrink-0 font-mono font-semibold tabular-nums"
                    style={{ color: LAW_ACCENT, fontSize: 'clamp(13px, 1.15vw, 17px)' }}
                  >
                    {i + 1}
                  </span>
                  <span
                    className="text-white/80 leading-relaxed min-w-0"
                    style={{ fontSize: 'clamp(13px, 1.15vw, 17px)' }}
                  >
                    {item}
                  </span>
                </li>
              ))}
            </ol>
          </motion.div>

          {/* 右: 適用例 */}
          <ApplicationExampleColumn />
        </div>
      </motion.div>
    </SlideWrapper>
  );
}
