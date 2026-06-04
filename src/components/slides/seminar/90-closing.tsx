'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import SlideWrapper from '../../SlideWrapper';
import { ACCENTS } from '@/theme/colors';

/**
 * p90: クロージング — ご清聴ありがとうございました。
 *
 * 背景は `seminarSlides` の `background: 'logoParticles'`（ロゴパーティクル）。
 */

export default function Slide90Closing() {
  return (
    <SlideWrapper>
      <div className="relative z-10 flex flex-col items-center justify-center gap-8 md:gap-10 text-center w-full h-full max-w-4xl mx-auto px-6 md:px-8 pointer-events-none">
        <motion.div
          className="flex items-center gap-3"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <span
            className="w-10 h-px"
            style={{
              background: `linear-gradient(90deg, transparent, ${ACCENTS.purple})`,
            }}
          />
          <span className="text-[10px] tracking-[0.4em] uppercase text-white/50 font-light">
            Thank You
          </span>
          <span
            className="w-10 h-px"
            style={{
              background: `linear-gradient(270deg, transparent, ${ACCENTS.pink})`,
            }}
          />
        </motion.div>

        <motion.h1
          className="font-bold tracking-tight leading-[1.2] text-white drop-shadow-[0_2px_24px_rgba(0,0,0,0.65)]"
          style={{ fontSize: 'clamp(28px, 3.4vw, 52px)' }}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35 }}
        >
          ご清聴
          <span
            className="bg-clip-text text-transparent"
            style={{
              backgroundImage: `linear-gradient(90deg, ${ACCENTS.purple}, ${ACCENTS.blue}, ${ACCENTS.pink})`,
            }}
          >
            ありがとうございました
          </span>
        </motion.h1>

        <motion.div
          className="flex flex-col items-center gap-3 max-w-lg"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.55 }}
        >
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
          <p
            className="text-white/85 leading-relaxed font-light drop-shadow-[0_1px_12px_rgba(0,0,0,0.5)]"
            style={{ fontSize: 'clamp(14px, 1.25vw, 18px)' }}
          >
            ビジネスを止めずにリスクをコントロールし、
            <br />
            <span className="text-white font-semibold">
              「安全に攻める」ための法務
            </span>
            を、これからもご一緒に。
          </p>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
        </motion.div>

        <motion.div
          className="flex flex-col items-center gap-3 pointer-events-auto"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.75 }}
        >
          <p className="text-[10px] tracking-[0.35em] uppercase text-white/35">
            Presented by
          </p>
          <div className="flex items-center gap-4">
            <Image
              src="/logo.png"
              alt="tAiL. 法律事務所"
              width={48}
              height={48}
              className="opacity-90 object-contain"
              priority
            />
            <span
              className="font-semibold tracking-wider text-white/90"
              style={{ fontSize: 'clamp(15px, 1.35vw, 20px)' }}
            >
              tAiL. 法律事務所
            </span>
          </div>
          <p
            className="text-white/45 tracking-widest font-light"
            style={{ fontSize: 'clamp(10px, 0.92vw, 12px)' }}
          >
            team AI &amp; Legal · 福岡県弁護士会
          </p>
          <a
            href="https://tail-legal.jp/"
            className="font-mono text-white/55 tracking-wide hover:text-white transition-colors"
            style={{ fontSize: 'clamp(13px, 0.95vw, 15px)' }}
          >
            tail-legal.jp
          </a>
        </motion.div>
      </div>
    </SlideWrapper>
  );
}
