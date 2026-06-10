'use client';

import { motion } from 'framer-motion';
import SlideWrapper from '../../SlideWrapper';
import { RelatedRuleLink } from '../../ui';

/**
 * p63: 4-6 著作物 — 第30条の4 条文解説 + 文化審議会の考え方
 *
 * ベーステンプレート: `templates/TextHighlight.tsx` / `50-copyright-work-definition.tsx`
 */

const CHAPTER_ACCENT = '#9ee0a8';
const LAW_ACCENT = '#60a5fa';
const HIGHLIGHT_ACCENT = '#f7c46c';

const ARTICLE_SUBTITLE =
  '（著作物に表現された思想又は感情の享受を目的としない利用）';

const ARTICLE_LEAD =
  '著作物は、次に掲げる場合その他の当該著作物に表現された思想又は感情を自ら享受し又は他人に享受させることを目的としない場合には、その必要と認められる限度において、いずれの方法によるかを問わず、利用することができる。ただし、当該著作物の種類及び用途並びに当該利用の態様に照らし著作権者の利益を不当に害することとなる場合は、この限りでない。';

const ARTICLE_ITEMS = [
  '著作物の録音、録画その他の利用に係る技術の開発又は実用化のための試験の用に供する場合',
  '情報解析（多数の著作物その他の大量の情報から、当該情報を構成する言語、音、影像その他の要素に係る情報を抽出し、比較、分類その他の解析を行うことをいう。第47条の5第1項第2号において同じ。）の用に供する場合',
  '前2号に掲げる場合のほか、著作物の表現についての人の知覚による認識を伴うことなく当該著作物を電子計算機による情報処理の過程における利用その他の利用（プログラムの著作物にあっては、当該著作物の電子計算機における実行を除く。）に供する場合',
] as const;

const ARTICLE_SUMMARY =
  '一言でいうと・・・著作物の個性の発露（表現）を享受するのは生成AIだけの時はセーフ、人間が含まれるならアウト';

const SOURCE_URL =
  'https://www.bunka.go.jp/seisaku/bunkashingikai/chosakuken/pdf/94037901_01.pdf';
const SOURCE_PREFIX = '文化審議会著作権分科会法制度小委員会';
const SOURCE_LINK_LABEL = 'AIと著作権に関する考え方について';

const COMMENTARY_HEADING = '生成指示のための生成AIへの著作物の入力について';

const COMMENTARY_POINTS = [
  '生成AIに対して生成の指示をする際は、プロンプトと呼ばれる複数の単語又は文章や、画像等を生成AIに入力する場合があり、入力に当たっては、著作物の複製等が生じる場合がある。',
  'この生成AIに対する入力は、生成物の生成のため、入力されたプロンプトを情報解析するものであるため、これに伴う著作物の複製等については、法第30条の4の適用が考えられる。',
  'ただし、生成AIに対する入力に用いた既存の著作物と類似する生成物を生成させる目的で当該著作物を入力する行為は、生成AIによる情報解析に用いる目的の他、入力した著作物に表現された思想又は感情を享受する目的も併存すると考えられるため、法第30条の4は適用されないと考えられる。',
] as const;

export default function Slide63CopyrightArticle304() {
  return (
    <SlideWrapper>
      <motion.div
        className="flex flex-col gap-3 md:gap-3.5 w-full max-w-6xl h-full justify-center py-5 md:py-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex flex-col gap-1 shrink-0">
          <span
            className="tracking-[0.32em] uppercase text-white/40"
            style={{ fontSize: 'clamp(13px, 1.15vw, 17px)' }}
          >
            4-6 · 著作物 · 第30条の4
          </span>
          <h2
            className="font-bold tracking-tight text-white leading-snug"
            style={{ fontSize: 'clamp(18px, 1.9vw, 28px)' }}
          >
            {ARTICLE_SUBTITLE}
          </h2>
          <div className="flex flex-wrap gap-2 pt-1.5">
            <RelatedRuleLink
              targetId="70-unrecognized-copyright-output"
              label="関連: 5-3 出力側の著作権（依拠性）"
              accent="#88bbff"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 md:gap-3.5 items-start">
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
                第30条の4
              </span>
              <span
                className="text-white/40"
                style={{ fontSize: 'clamp(11px, 1vw, 14px)' }}
              >
                著作権法
              </span>
            </div>

            <p
              className="text-white/85 leading-relaxed"
              style={{ fontSize: 'clamp(13px, 1.15vw, 17px)' }}
            >
              {ARTICLE_LEAD}
            </p>

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

          {/* 右: 文化審議会の考え方 */}
          <motion.div
            className="flex flex-col gap-2 px-3 py-2.5 md:px-3.5 md:py-3 rounded-xl border"
            style={{
              borderColor: `${LAW_ACCENT}44`,
              background: `linear-gradient(160deg, ${LAW_ACCENT}0a 0%, rgba(255,255,255,0.02) 100%)`,
            }}
            initial={{ opacity: 0, x: 14 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.18 }}
          >
            <p
              className="tracking-[0.12em] text-white/45 leading-relaxed"
              style={{ fontSize: 'clamp(11px, 1.02vw, 14px)' }}
            >
              {SOURCE_PREFIX}「
              <a
                href={SOURCE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#88bbff] hover:text-[#a8d4ff] underline underline-offset-2 transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                {SOURCE_LINK_LABEL}
              </a>
              」
            </p>

            <h3
              className="font-bold text-white leading-snug"
              style={{ fontSize: 'clamp(14px, 1.25vw, 18px)' }}
            >
              {COMMENTARY_HEADING}
            </h3>

            <ul className="flex flex-col gap-2">
              {COMMENTARY_POINTS.map((point, i) => (
                <motion.li
                  key={point}
                  className="flex items-start gap-2"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.28 + i * 0.08 }}
                >
                  <span
                    className="shrink-0 font-bold leading-relaxed"
                    style={{ color: CHAPTER_ACCENT, fontSize: 'clamp(13px, 1.15vw, 17px)' }}
                  >
                    ○
                  </span>
                  <span
                    className="text-white/80 leading-relaxed min-w-0"
                    style={{ fontSize: 'clamp(13px, 1.15vw, 17px)' }}
                  >
                    {point}
                  </span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* 2枠の下: 一言まとめ */}
        <motion.div
          className="shrink-0 flex flex-col items-center gap-1 px-3 py-2.5 md:px-4 md:py-3 rounded-xl border"
          style={{
            borderColor: `${HIGHLIGHT_ACCENT}44`,
            background: `linear-gradient(90deg, ${HIGHLIGHT_ACCENT}10 0%, rgba(255,255,255,0.02) 100%)`,
          }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
        >
          <span
            className="leading-none"
            style={{ color: HIGHLIGHT_ACCENT, fontSize: 'clamp(16px, 1.4vw, 21px)' }}
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
        </motion.div>
      </motion.div>
    </SlideWrapper>
  );
}
