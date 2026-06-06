'use client';

import { type ComponentProps } from 'react';
import { Canvas } from '@react-three/fiber';

/** SlideStage と同じ論理キャンバスサイズ（1440×810 固定） */
export const SLIDE_DESIGN_WIDTH = 1440;
export const SLIDE_DESIGN_HEIGHT = 810;

type SlideDesignCanvasProps = ComponentProps<typeof Canvas>;

/**
 * SlideStage の CSS scale 内で使う Three.js Canvas。
 *
 * R3F のデフォルト resize は getBoundingClientRect() ベースのため、
 * transform: scale() 適用後のビューポート幅（例: 846px）で renderer が
 * サイズ設定され、さらに scale が掛かって 3D が左上に縮小表示される。
 * デザイン解像度で固定し、resize を無効化して二重スケールを防ぐ。
 */
export default function SlideDesignCanvas({
  style,
  gl,
  onCreated,
  ...props
}: SlideDesignCanvasProps) {
  return (
    <Canvas
      {...props}
      resize={{ offsetSize: true }}
      dpr={1}
      style={{
        width: SLIDE_DESIGN_WIDTH,
        height: SLIDE_DESIGN_HEIGHT,
        display: 'block',
        ...style,
      }}
      gl={{ antialias: true, alpha: false, ...gl }}
      onCreated={(state) => {
        state.gl.setSize(SLIDE_DESIGN_WIDTH, SLIDE_DESIGN_HEIGHT, false);
        state.setSize(SLIDE_DESIGN_WIDTH, SLIDE_DESIGN_HEIGHT);
        onCreated?.(state);
      }}
    />
  );
}
