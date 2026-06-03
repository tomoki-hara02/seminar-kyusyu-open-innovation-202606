'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import SlideWrapper from '../../SlideWrapper';
import { ACCENTS } from '@/theme/colors';

/**
 * p1: 「生成AIを"安心して使い倒す"ためのルールづくり入門」
 * 主催: tAiL. 法律事務所
 *
 * 本番投影用のタイトルスライド。タイトルと主催だけを大きく見せる構成。
 */
export default function Slide01Title() {
  return (
    <SlideWrapper>
      <motion.div
        className="flex flex-col items-center gap-10 text-center w-full max-w-5xl px-8"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 }}
      >
        {/* 上部の小さなアイブロウ */}
        <motion.div
          className="flex items-center gap-3"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <span
            className="w-8 h-px"
            style={{
              background: `linear-gradient(90deg, transparent, ${ACCENTS.purple})`,
            }}
          />
          <span className="text-[10px] tracking-[0.4em] uppercase text-white/50 font-light">
            Seminar
          </span>
          <span
            className="w-8 h-px"
            style={{
              background: `linear-gradient(270deg, transparent, ${ACCENTS.pink})`,
            }}
          />
        </motion.div>

        {/* メインタイトル */}
        <motion.h1
          className="text-4xl md:text-6xl font-bold tracking-tight leading-[1.25] text-white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          生成AIを
          <span
            className="bg-clip-text text-transparent"
            style={{
              backgroundImage: `linear-gradient(90deg, ${ACCENTS.purple}, ${ACCENTS.blue}, ${ACCENTS.pink})`,
            }}
          >
            “安心して使い倒す”
          </span>
          ための
          <br />
          ルールづくり入門
        </motion.h1>

        {/* 区切り線 */}
        <motion.div
          className="w-24 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, ease: 'easeInOut', delay: 0.7 }}
        />

        {/* 主催 */}
        <motion.div
          className="flex flex-col items-center gap-3"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.9 }}
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
            <span className="text-lg md:text-xl font-semibold tracking-wider text-white/85">
              tAiL. 法律事務所
            </span>
          </div>
        </motion.div>
      </motion.div>
    </SlideWrapper>
  );
}
