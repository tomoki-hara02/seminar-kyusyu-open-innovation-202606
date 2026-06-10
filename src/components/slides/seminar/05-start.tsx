'use client';

import { motion } from 'framer-motion';
import SlideWrapper from '../../SlideWrapper';

/**
 * p5: では、始めましょう。
 *
 * Chapter 01 へ入る前の導入トランジション。
 * （旧版にあった「セミナーの楽しみ方」3 Tips はタイトル p1 へ移設）
 */
export default function Slide05Start() {
  return (
    <SlideWrapper>
      <motion.div
        className="flex flex-col items-center w-full max-w-3xl gap-4 text-center"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeInOut' }}
      >
        <span className="text-[10px] tracking-[0.32em] uppercase text-white/40">
          Ready to begin?
        </span>
        <h2 className="text-5xl md:text-6xl font-bold tracking-tight text-white leading-tight">
          では、始めましょう。
        </h2>
      </motion.div>
    </SlideWrapper>
  );
}
