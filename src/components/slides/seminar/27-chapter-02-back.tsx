'use client';

import { motion } from 'framer-motion';
import SlideWrapper from '../../SlideWrapper';

/**
 * p24: Chapter 02 — 生成AI社内規程の作成（後編）
 *
 * ベーステンプレート: `templates/ChapterDivider.tsx`
 *
 * 「後編」を大きく目立たせ、各論として扱うトピックを列挙。
 */

const CHAPTER = {
  number: '02',
  label: 'Chapter',
  part: '後編',
  title: '生成AI社内規程の作成',
  subtitle:
    '全体像を踏まえ、社内生成AI利用規程の各論へ。実際の条文・運用フローに落とし込みます。',
};

const TOPICS = [
  '各種利用規約の個別条項の検討',
];

export default function Slide24Chapter02Back() {
  return (
    <SlideWrapper>
      <motion.div
        className="relative flex flex-col md:flex-row w-full max-w-6xl h-[min(72vh,760px)] items-center justify-center md:justify-start gap-8 md:gap-16 px-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        {/* 巨大な番号 — 左カラム中央に固定 */}
        <div className="flex shrink-0 items-center justify-center md:h-full">
          <motion.span
            className="block font-extrabold tracking-tighter leading-[0.85] select-none"
            style={{
              fontSize: 'clamp(8rem, 22vw, 20rem)',
              background:
                'linear-gradient(160deg, #ffaacc 0%, #FF6B9D 55%, #c8a8ff 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
          >
            {CHAPTER.number}
          </motion.span>
        </div>

        {/* 右側のテキスト — 右カラム中央に固定 */}
        <motion.div
          className="flex min-w-0 flex-1 flex-col justify-center gap-4 max-w-md md:h-full"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-px bg-white/30" />
            <span className="text-[10px] tracking-[0.32em] uppercase text-white/40">
              {CHAPTER.label}
            </span>
          </div>

          {/* 後編：大きく目立つ表示 */}
          <motion.span
            className="font-extrabold tracking-tight leading-none select-none"
            style={{
              fontSize: 'clamp(2.5rem, 6vw, 5rem)',
              background: 'linear-gradient(120deg, #FF6B9D 0%, #ffaacc 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            {CHAPTER.part}
          </motion.span>

          <h2 className="text-2xl md:text-3xl font-bold text-white leading-tight tracking-tight whitespace-nowrap">
            {CHAPTER.title}
          </h2>

          <p className="text-sm md:text-base text-white/50 leading-relaxed">
            {CHAPTER.subtitle}
          </p>

          {/* このパートのスコープ */}
          <motion.div
            className="flex flex-col gap-1.5 pt-1"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <span className="text-[10px] tracking-[0.28em] uppercase text-white/30">
              このパートの内容
            </span>
            <div className="flex flex-col gap-1">
              {TOPICS.map((item, i) => (
                <motion.div
                  key={item}
                  className="flex items-center gap-2"
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.85 + i * 0.08 }}
                >
                  <span
                    className="shrink-0 w-1.5 h-1.5 rounded-full"
                    style={{ background: '#FF6B9D' }}
                  />
                  <span className="text-sm text-white/65">{item}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </SlideWrapper>
  );
}
