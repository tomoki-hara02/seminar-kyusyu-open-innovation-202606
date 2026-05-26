'use client';

import { motion } from 'framer-motion';
import SlideWrapper from '../../SlideWrapper';

const points = [
  {
    number: '01',
    title: '生成AI活用プランの作成',
    description:
      '架空企業をモデルに、現代の生成AI技術を使ってどんなことが可能そうか検討してみましょう。',
    gradient: 'from-[#7B5EA7] to-[#4F8EF7]',
    border: 'border-[#7B5EA7]/30',
  },
  {
    number: '02',
    title: '生成AI社内規程の作成',
    description:
      '生成AIの活用が決まれば社内の活用ルール整備です。様々な生成AIに関連する法令や必要なルールを理解して、生成AIを企業で活用できる環境を構築しましょう。',
    gradient: 'from-[#4F8EF7] to-[#7B5EA7]',
    border: 'border-[#4F8EF7]/30',
  },
  {
    number: '03',
    title: 'その他生成AIに関する法的論点',
    description:
      '社内規程で扱わなかった法的論点や「自社ではなく、取引先が生成AI活用し始めたら？」といった論点を補足的に扱います。',
    gradient: 'from-[#4F8EF7] to-[#FF6B9D]',
    border: 'border-[#FF6B9D]/30',
  },
];

export default function Slide09Agenda() {
  return (
    <SlideWrapper>
      <motion.div
        className="flex flex-col items-center gap-10 text-center w-full max-w-5xl"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
      >
        <div className="flex flex-col items-center gap-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-px bg-gradient-to-r from-transparent to-[#7B5EA7]" />
            <span className="text-xs tracking-[0.4em] uppercase text-white/40 font-light">
              Today&apos;s Agenda
            </span>
            <div className="w-8 h-px bg-gradient-to-l from-transparent to-[#FF6B9D]" />
          </div>
          <h2 className="text-5xl md:text-6xl font-bold tracking-tight text-white">
            本日のテーマ
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 w-full">
          {points.map((point, i) => (
            <motion.div
              key={point.number}
              className={`flex flex-col gap-4 p-7 rounded-2xl bg-white/[0.04] border ${point.border} backdrop-blur-md text-left`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: 'easeOut', delay: 0.25 + i * 0.12 }}
            >
              <span className={`text-4xl font-bold bg-gradient-to-r ${point.gradient} bg-clip-text text-transparent leading-none`}>
                {point.number}
              </span>
              <h3 className="text-base md:text-lg font-bold text-white leading-snug">
                {point.title}
              </h3>
              <p className="text-sm text-white/55 leading-relaxed">
                {point.description}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </SlideWrapper>
  );
}
