'use client';

import { useEffect, useState, type ReactNode } from 'react';

const DESIGN_WIDTH = 1440;
const DESIGN_HEIGHT = 810;

interface SlideStageProps {
  children: ReactNode;
}

/**
 * 1440×810 を論理キャンバスとしてスライドを描画し、
 * ビューポート全体に対して uniform scale でフィットさせるラッパー。
 *
 * 1440×810 は既存スライドが自然なサイズ感（max-w-5xl ≒ 1024px、text-6xl ≒ 60px）で
 * 馴染む 16:9 のキャンバスサイズ。各スライドの内側は 1440×810 固定の前提で書いてよく、
 * FHD では scale≒1.33、4K では scale=2.67 で uniform に拡大される。
 * 16:9 と異なるアスペクト比のディスプレイではレターボックス（黒帯）になる。
 */
export default function SlideStage({ children }: SlideStageProps) {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const updateScale = () => {
      const sx = window.innerWidth / DESIGN_WIDTH;
      const sy = window.innerHeight / DESIGN_HEIGHT;
      setScale(Math.min(sx, sy));
    };
    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, []);

  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
      <div
        className="relative shrink-0"
        style={{
          width: DESIGN_WIDTH,
          height: DESIGN_HEIGHT,
          transform: `scale(${scale})`,
          transformOrigin: 'center center',
        }}
      >
        {children}
      </div>
    </div>
  );
}
