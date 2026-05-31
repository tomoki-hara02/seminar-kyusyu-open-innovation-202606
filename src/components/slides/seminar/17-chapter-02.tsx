'use client';

import { motion } from 'framer-motion';
import SlideWrapper from '../../SlideWrapper';

/**
 * p20: Chapter 02 — 生成AI社内規程の作成（前編）
 *
 * ベーステンプレート: `templates/ChapterDivider.tsx`
 *
 * 番号は「02」、サブタイトルに「前編」を示す副題と
 * パートの内容（社内運用のための全体像解説）を添える。
 */

const CHAPTER = {
  number: '02',
  label: 'Chapter',
  part: '前編',
  title: '生成AI社内規程の作成',
  subtitle:
    '社内でどんな規程・ルールが必要か。全体像を解説します。',
};

export default function Slide20Chapter02() {
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
                'linear-gradient(160deg, #c8a8ff 0%, #4F8EF7 55%, #FF6B9D 100%)',
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

          {/* 前編：大きく目立つ表示 */}
          <motion.span
            className="font-extrabold tracking-tight leading-none select-none"
            style={{
              fontSize: 'clamp(2.5rem, 6vw, 5rem)',
              background: 'linear-gradient(120deg, #c8a8ff 0%, #4F8EF7 100%)',
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
              {[
                'AI事業者ガイドラインの基本理念',
                'リスクベースアプローチ',
                '4つの分析セグメントで論点を整理する',
              ].map((item, i) => (
                <motion.div
                  key={item}
                  className="flex items-center gap-2"
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.85 + i * 0.08 }}
                >
                  <span
                    className="shrink-0 w-1.5 h-1.5 rounded-full"
                    style={{ background: '#c8a8ff' }}
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
