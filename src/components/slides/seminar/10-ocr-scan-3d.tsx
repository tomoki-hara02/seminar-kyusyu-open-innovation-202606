'use client';

import { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import SlideDesignCanvas, { SLIDE_DESIGN_HEIGHT, SLIDE_DESIGN_WIDTH } from '@/components/SlideDesignCanvas';
import * as THREE from 'three';
import { motion } from 'framer-motion';
import SlideWrapper from '../../SlideWrapper';
import { mulberry32 } from '@/lib/random';

const CARD_W = 2.6;
const CARD_H = 1.6;

// ─── 名刺（地面に伏せて置かれている） ───────────────────────────────────────
function BusinessCard() {
  const beamRef = useRef<THREE.Mesh>(null);
  const frameRef = useRef<THREE.LineSegments>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (beamRef.current) {
      beamRef.current.position.x = Math.sin(t * 0.9) * (CARD_W * 0.4);
      if (beamRef.current.material instanceof THREE.MeshBasicMaterial) {
        beamRef.current.material.opacity = 0.55 + Math.sin(t * 3) * 0.18;
      }
    }
    if (frameRef.current && frameRef.current.material instanceof THREE.LineBasicMaterial) {
      frameRef.current.material.opacity = 0.55 + Math.sin(t * 1.6) * 0.2;
    }
  });

  return (
    <group rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0.45]}>
      {/* Card base */}
      <mesh>
        <boxGeometry args={[CARD_W, CARD_H, 0.04]} />
        <meshBasicMaterial color="#f3ecdf" />
      </mesh>

      {/* TODO: 名刺の氏名行 */}
      <mesh position={[-0.4, 0.46, 0.025]}>
        <planeGeometry args={[1.5, 0.18]} />
        <meshBasicMaterial color="#1a1a2f" />
      </mesh>

      {/* TODO: 肩書き・連絡先などの行 */}
      {[
        { y:  0.20, w: 1.0,  c: '#52526a' },
        { y: -0.02, w: 1.4,  c: '#52526a' },
        { y: -0.22, w: 1.25, c: '#52526a' },
        { y: -0.42, w: 1.55, c: '#4F8EF7' },
      ].map((r, i) => (
        <mesh key={i} position={[-0.3, r.y, 0.025]}>
          <planeGeometry args={[r.w, 0.07]} />
          <meshBasicMaterial color={r.c} />
        </mesh>
      ))}

      {/* TODO: 事務所ロゴ枠（左肩） */}
      <mesh position={[-1.0, 0.46, 0.025]}>
        <planeGeometry args={[0.34, 0.34]} />
        <meshBasicMaterial color="#7B5EA7" />
      </mesh>

      {/* OCR 検出フレーム — 名刺の少し内側を囲む */}
      <lineSegments ref={frameRef} position={[0, 0, 0.03]}>
        <edgesGeometry args={[new THREE.PlaneGeometry(CARD_W * 0.94, CARD_H * 0.88)]} />
        <lineBasicMaterial color="#88bbff" transparent opacity={0.7} />
      </lineSegments>

      {/* 四隅のコーナーマーカー（OCR の検出枠っぽさ） */}
      {([
        [-CARD_W * 0.42,  CARD_H * 0.4],
        [ CARD_W * 0.42,  CARD_H * 0.4],
        [-CARD_W * 0.42, -CARD_H * 0.4],
        [ CARD_W * 0.42, -CARD_H * 0.4],
      ] as [number, number][]).map((p, i) => {
        const sx = Math.sign(p[0]);
        const sy = Math.sign(p[1]);
        return (
          <group key={i} position={[p[0], p[1], 0.03]}>
            <mesh position={[-sx * 0.08, 0, 0]}>
              <planeGeometry args={[0.18, 0.025]} />
              <meshBasicMaterial color="#88bbff" />
            </mesh>
            <mesh position={[0, -sy * 0.08, 0]}>
              <planeGeometry args={[0.025, 0.18]} />
              <meshBasicMaterial color="#88bbff" />
            </mesh>
          </group>
        );
      })}

      {/* スキャンビーム — カードの上を左右にスイープ */}
      <mesh ref={beamRef} position={[0, 0, 0.04]}>
        <planeGeometry args={[0.05, CARD_H * 0.92]} />
        <meshBasicMaterial
          color="#88bbff"
          transparent
          opacity={0.6}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
}

// ─── スマートフォン（カード上空でわずかに傾いてホバー） ─────────────────────
function Smartphone() {
  const groupRef = useRef<THREE.Group>(null);
  const glowRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.position.y = 1.55 + Math.sin(t * 0.7) * 0.05;
      groupRef.current.rotation.z = Math.sin(t * 0.4) * 0.04;
    }
    if (glowRef.current && glowRef.current.material instanceof THREE.MeshBasicMaterial) {
      glowRef.current.material.opacity = 0.42 + Math.sin(t * 2.4) * 0.12;
    }
  });

  return (
    <group
      ref={groupRef}
      position={[0, 1.55, 0.45]}
      // 画面がカメラ側にわずかに傾くよう、フラットから 0.55rad ほど起こす
      rotation={[-Math.PI / 2 + 0.55, 0, 0]}
    >
      {/* 本体 */}
      <mesh>
        <boxGeometry args={[1.1, 2.0, 0.08]} />
        <meshBasicMaterial color="#15151c" />
      </mesh>
      <lineSegments>
        <edgesGeometry args={[new THREE.BoxGeometry(1.1, 2.0, 0.08)]} />
        <lineBasicMaterial color="#88bbff" transparent opacity={0.45} />
      </lineSegments>

      {/* スクリーン地 */}
      <mesh position={[0, 0, 0.045]}>
        <planeGeometry args={[0.98, 1.82]} />
        <meshBasicMaterial color="#0a0a14" />
      </mesh>

      {/* スクリーンの全体グロー（青く点滅） */}
      <mesh ref={glowRef} position={[0, 0, 0.046]}>
        <planeGeometry args={[0.98, 1.82]} />
        <meshBasicMaterial
          color="#4F8EF7"
          transparent
          opacity={0.45}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* スクリーン内：カードのプレビュー */}
      <mesh position={[0, 0.45, 0.047]}>
        <planeGeometry args={[0.82, 0.5]} />
        <meshBasicMaterial color="#f3ecdf" />
      </mesh>
      <mesh position={[-0.05, 0.5, 0.048]}>
        <planeGeometry args={[0.4, 0.05]} />
        <meshBasicMaterial color="#1a1a2f" />
      </mesh>
      {[0.42, 0.36, 0.30].map((y, i) => (
        <mesh key={i} position={[-0.05, y, 0.048]}>
          <planeGeometry args={[0.3 + i * 0.06, 0.02]} />
          <meshBasicMaterial color="#52526a" />
        </mesh>
      ))}

      {/* スクリーン内：抽出結果セクションのヘッダ */}
      <mesh position={[0, 0.08, 0.047]}>
        <planeGeometry args={[0.9, 0.04]} />
        <meshBasicMaterial color="#4F8EF7" />
      </mesh>

      {/* スクリーン内：抽出結果（ラベル + 値）の行 */}
      {[-0.06, -0.20, -0.34, -0.48, -0.62].map((y, i) => (
        <group key={i} position={[0, y, 0.047]}>
          <mesh position={[-0.3, 0, 0]}>
            <planeGeometry args={[0.22, 0.05]} />
            <meshBasicMaterial color="#88bbff" transparent opacity={0.85} />
          </mesh>
          <mesh position={[0.18, 0, 0]}>
            <planeGeometry args={[0.46, 0.05]} />
            <meshBasicMaterial color="#c8c8d8" />
          </mesh>
        </group>
      ))}

      {/* 完了バー（下部の進捗風） */}
      <mesh position={[0, -0.78, 0.047]}>
        <planeGeometry args={[0.7, 0.045]} />
        <meshBasicMaterial color="#9ee0a8" />
      </mesh>

      {/* スピーカーグリル */}
      <mesh position={[0, 0.92, 0.047]}>
        <planeGeometry args={[0.12, 0.018]} />
        <meshBasicMaterial color="#2a2a36" />
      </mesh>
    </group>
  );
}

// ─── OCR で抽出されたデータ片が、名刺からスマホへ立ち上る ─────────────────
function OCRFragments({ count = 22 }: { count?: number }) {
  const ref = useRef<THREE.Group>(null);

  const fragments = useMemo(() => {
    const rand = mulberry32(0xa8c5d2 ^ count);
    const palette = ['#88bbff', '#c8a8ff', '#ffaacc'];
    return Array.from({ length: count }, () => ({
      offset: rand() * 3,
      startX: (rand() - 0.5) * (CARD_W * 0.8),
      startZ: 0.45 + (rand() - 0.5) * (CARD_H * 0.7),
      width: 0.12 + rand() * 0.22,
      speed: 0.32 + rand() * 0.28,
      color: palette[Math.floor(rand() * palette.length)],
    }));
  }, [count]);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    ref.current.children.forEach((child, i) => {
      const f = fragments[i];
      const phase = ((t + f.offset) * f.speed) % 1;
      child.position.y = 0.06 + phase * 1.35;
      child.position.x = f.startX + Math.sin((t + f.offset) * 0.5) * 0.05;
      // 上昇するにつれてスマホの位置に向かって少し中央へ寄せる
      child.position.z = f.startZ * (1 - phase * 0.35);
      const visible = Math.sin(phase * Math.PI);
      if (child instanceof THREE.Mesh && child.material instanceof THREE.MeshBasicMaterial) {
        child.material.opacity = visible * 0.9;
      }
      child.scale.set(1, 0.5 + visible * 0.7, 1);
    });
  });

  return (
    <group ref={ref}>
      {fragments.map((f, i) => (
        <mesh key={i} position={[f.startX, 0.06, f.startZ]}>
          <planeGeometry args={[f.width, 0.03]} />
          <meshBasicMaterial
            color={f.color}
            transparent
            opacity={0}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      ))}
    </group>
  );
}

// ─── 周囲を漂うパーティクル（Cube3D と同系） ──────────────────────────────
function ParticleHalo({ count = 1100 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);

  const geo = useMemo(() => {
    const rand = mulberry32(0x9b7c41 ^ count);
    const g = new THREE.BufferGeometry();
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const palette = [
      new THREE.Color('#88bbff'),
      new THREE.Color('#c8a8ff'),
      new THREE.Color('#ffaacc'),
    ];
    for (let i = 0; i < count; i++) {
      const theta = rand() * Math.PI * 2;
      const phi = Math.acos(2 * rand() - 1);
      const r = 3.0 + rand() * 2.6;
      pos[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.7 + 0.6;
      pos[i * 3 + 2] = r * Math.cos(phi);
      const c = palette[i % palette.length];
      col[i * 3]     = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }
    g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    g.setAttribute('color', new THREE.BufferAttribute(col, 3));
    return g;
  }, [count]);

  useEffect(() => () => geo.dispose(), [geo]);

  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.y = -clock.getElapsedTime() * 0.05;
      ref.current.rotation.x =  clock.getElapsedTime() * 0.02;
    }
  });

  return (
    <points ref={ref} geometry={geo}>
      <pointsMaterial vertexColors size={0.028} sizeAttenuation transparent opacity={0.6} />
    </points>
  );
}

// ─── 名刺の下にうっすら広がるグロー（地面側からの照り返し） ──────────────
function GroundGlow() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.05, 0.45]}>
      <planeGeometry args={[6, 4]} />
      <meshBasicMaterial
        color="#4F8EF7"
        transparent
        opacity={0.07}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}

export default function Slide10OcrScan3D() {
  return (
    <SlideWrapper>
      <div
        className="absolute z-0 overflow-hidden"
        style={{ left: 0, top: 0, width: SLIDE_DESIGN_WIDTH, height: SLIDE_DESIGN_HEIGHT }}
      >
        <SlideDesignCanvas
          camera={{ position: [2.4, 2.0, 5.2], fov: 48 }}
          style={{ background: '#0a0a0f' }}
          onCreated={({ camera }) => camera.lookAt(1.4, 0.55, 0.4)}
        >
          <color attach="background" args={['#0a0a0f']} />
          <group position={[1.5, 0, 0]}>
            <GroundGlow />
            <BusinessCard />
            <OCRFragments count={22} />
            <Smartphone />
          </group>
          <ParticleHalo count={1100} />
        </SlideDesignCanvas>
      </div>

      {/* 左テキスト領域の可読性用グラデーション */}
      <div
        className="absolute inset-y-0 left-0 z-10 w-[58%] pointer-events-none"
        style={{
          background:
            'linear-gradient(90deg, rgba(10,10,15,0.96) 0%, rgba(10,10,15,0.72) 55%, transparent 100%)',
        }}
      />

      <motion.div
        className="absolute z-20 flex flex-col items-start gap-3 w-full max-w-xl pointer-events-none"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut', delay: 0.2 }}
        style={{ top: '12%', left: '8%' }}
      >
        <span className="text-[10px] tracking-[0.22em] uppercase text-white/40">
          実例① · 名刺 OCR
        </span>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-snug">
          名刺をかざすだけで
          <br />
          構造化データに
        </h2>
        <p className="text-sm md:text-base text-white leading-relaxed mt-2 max-w-md">
          スマートフォンのカメラが文字を読み取り、氏名・連絡先・所属を瞬時に抽出
        </p>
      </motion.div>

      <motion.div
        className="absolute bottom-8 right-8 flex items-center gap-2 z-20 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.9 }}
      >
        <motion.span
          className="w-1.5 h-1.5 rounded-full bg-[#88bbff]"
          animate={{ opacity: [1, 0.3, 1] }}
          transition={{ duration: 1.4, repeat: Infinity }}
        />
        <span
          className="tracking-[0.22em] uppercase text-white/40"
          style={{ fontSize: 'clamp(10px, 0.85vw, 11px)' }}
        >
          Scan · Recognize · Structure
        </span>
      </motion.div>
    </SlideWrapper>
  );
}
