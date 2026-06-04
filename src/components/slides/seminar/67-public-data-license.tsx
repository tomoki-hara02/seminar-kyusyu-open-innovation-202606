'use client';

import { motion } from 'framer-motion';
import SlideWrapper from '../../SlideWrapper';

/**
 * p67: 4-6 著作物 — 公共データ利用規約（第1.0版）
 *
 * ベーステンプレート: `65-copyright-article-30-4.tsx`
 */

const CHAPTER_ACCENT = '#9ee0a8';
const LAW_ACCENT = '#60a5fa';
const HIGHLIGHT_ACCENT = '#f7c46c';

const PDL_URL =
  'https://www.digital.go.jp/resources/open_data/public_data_license_v1.0';
const PDL_TITLE = '公共データ利用規約（第1.0版）';

const INTRO_BEFORE =
  '国又は地方公共団体等の公的機関が著作権者である著作物について、広く二次利用を認める形で著作物の利用に対する考えを示すに当たり、できるだけ分かりやすく統一的なものとするため、';
const INTRO_HIGHLIGHT =
  '各府省又は地方公共団体等の公的機関のウェブサイトの利用規約の本文として定めます。';

const SECTION1_HEADING = '1. 当ウェブサイトのコンテンツの利用について';

const SECTION1_BODY =
  '当ウェブサイトで公開している情報（以下「コンテンツ」といいます。）は、別の利用ルールが適用されるコンテンツを除き、どなたでも以下の1.1.から1.7.に定める利用ルール（以下「本利用ルール」といいます。）に従って、複製、公衆送信、翻訳・変形等の翻案等、自由に利用できます（本利用ルールに従って利用できるコンテンツを、以下「本コンテンツ」といいます。）。商用利用も可能です。';

export default function Slide67PublicDataLicense() {
  return (
    <SlideWrapper>
      <motion.div
        className="flex flex-col gap-3 md:gap-4 w-full max-w-6xl h-full justify-center py-5 md:py-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex flex-col gap-1 shrink-0">
          <span
            className="tracking-[0.32em] uppercase text-white/40"
            style={{ fontSize: 'clamp(13px, 1.15vw, 17px)' }}
          >
            4-6 · 著作物 · 公的データの二次利用
          </span>
          <h2
            className="font-bold tracking-tight leading-snug"
            style={{ fontSize: 'clamp(20px, 2.1vw, 32px)' }}
          >
            <a
              href={PDL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#88bbff] hover:text-[#a8d4ff] underline underline-offset-4 decoration-2 transition-colors"
              style={{ textDecorationColor: `${LAW_ACCENT}88` }}
              onClick={(e) => e.stopPropagation()}
            >
              {PDL_TITLE}
            </a>
          </h2>
          <span
            className="text-white/35 tracking-wide"
            style={{ fontSize: 'clamp(10px, 0.9vw, 13px)' }}
          >
            出典：デジタル庁
          </span>
        </div>

        <motion.div
          className="flex flex-col gap-3 px-3 py-3 md:px-4 md:py-4 rounded-xl border"
          style={{
            borderColor: `${LAW_ACCENT}55`,
            background: `linear-gradient(160deg, ${LAW_ACCENT}0c 0%, rgba(255,255,255,0.02) 100%)`,
          }}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.12 }}
        >
          <p
            className="text-white/85 leading-relaxed"
            style={{ fontSize: 'clamp(14px, 1.25vw, 18px)' }}
          >
            {INTRO_BEFORE}
            <span
              style={{
                color: HIGHLIGHT_ACCENT,
                fontWeight: 700,
                background: `${HIGHLIGHT_ACCENT}18`,
                boxDecorationBreak: 'clone',
                WebkitBoxDecorationBreak: 'clone',
              }}
            >
              {INTRO_HIGHLIGHT}
            </span>
          </p>

          <div className="h-px bg-white/10 shrink-0" />

          <div className="flex flex-col gap-2">
            <h3
              className="font-bold leading-snug"
              style={{ color: CHAPTER_ACCENT, fontSize: 'clamp(15px, 1.35vw, 20px)' }}
            >
              {SECTION1_HEADING}
            </h3>
            <p
              className="text-white/85 leading-relaxed"
              style={{ fontSize: 'clamp(14px, 1.25vw, 18px)' }}
            >
              {SECTION1_BODY}
            </p>
          </div>
        </motion.div>
      </motion.div>
    </SlideWrapper>
  );
}
