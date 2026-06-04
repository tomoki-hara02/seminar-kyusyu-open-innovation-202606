'use client';

import { motion } from 'framer-motion';
import SlideWrapper from '../../SlideWrapper';

/**
 * p8: 生成AIは異次元の成果を出す。
 *
 * 3D PC メッシュ + パーティクルハローは `DeckBackground variant="aiCapability"`
 * で全画面背景として描画される（seminarSlides.ts 参照）。
 * このスライド本体はテキストオーバーレイのみを担当する。
 */
export default function Slide08AiCapability() {
  return (
    <SlideWrapper>
      <motion.div
        className="relative z-10 flex flex-col items-start gap-4 pointer-events-none"
        style={{ position: 'absolute', top: '10%', left: '5%', maxWidth: '42%' }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut', delay: 0.25 }}
      >
        <span className="text-[10px] tracking-[0.32em] uppercase text-white/40">
          AI Capability
        </span>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white leading-snug">
          生成AIは無形業務領域において
          <br />
          <span className="bg-gradient-to-r from-[#2952D9] to-[#4FACF7] bg-clip-text text-transparent">
            異次元の成果を出す
          </span>
        </h2>
        <div className="w-10 h-px bg-gradient-to-r from-[#4F8EF7] to-transparent" />
        <p className="text-sm md:text-base text-white/60 leading-relaxed font-light">
          便利ツールではなく、
          <br />
          <span className="text-white font-semibold">能力の桁が変わる道具</span>
          である
        </p>
      </motion.div>

      <motion.div
        className="absolute bottom-8 right-8 flex items-center gap-2 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.0 }}
      >
        <motion.span
          className="w-1.5 h-1.5 rounded-full bg-[#88bbff]"
          animate={{ opacity: [1, 0.3, 1] }}
          transition={{ duration: 1.4, repeat: Infinity }}
        />
        <span className="text-[10px] tracking-[0.22em] uppercase text-white/40">
          AI × Business
        </span>
      </motion.div>
    </SlideWrapper>
  );
}
