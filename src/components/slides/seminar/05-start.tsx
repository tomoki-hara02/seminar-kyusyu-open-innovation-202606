'use client';

import { motion } from 'framer-motion';
import SlideWrapper from '../../SlideWrapper';

export default function Slide05Start() {
  return (
    <SlideWrapper>
      <motion.div
        className="flex flex-col items-center gap-10 text-center"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeInOut', delay: 0.1 }}
      >
        <div className="flex flex-col items-center gap-4">
          <span className="text-sm font-medium tracking-[0.2em] text-white/40 uppercase">
            Ready to begin?
          </span>
          <h2 className="text-6xl md:text-7xl font-bold tracking-tight text-white">
            では、始めましょう！
          </h2>
        </div>
      </motion.div>
    </SlideWrapper>
  );
}
