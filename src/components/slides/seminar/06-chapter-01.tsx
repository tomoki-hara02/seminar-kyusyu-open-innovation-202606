'use client';

import { motion } from 'framer-motion';
import SlideWrapper from '../../SlideWrapper';

const CHAPTER = {
  number: '01',
  label: 'Chapter',
  title: 'ホットトピックと生成AI活用プラン',
  subtitle:
    'ホットトピックを概観したうえで、MIT 論文と弁護士事務所の実例から、活用プランの組み立て方を見ていきます。',
};

export default function Slide06Chapter01() {
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
          className="flex min-w-0 flex-1 flex-col justify-center gap-4 max-w-3xl md:h-full"
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
          <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight tracking-tight whitespace-nowrap">
            {CHAPTER.title}
          </h2>
          <p className="text-sm md:text-base text-white/50 leading-relaxed">
            {CHAPTER.subtitle}
          </p>
        </motion.div>
      </motion.div>
    </SlideWrapper>
  );
}
