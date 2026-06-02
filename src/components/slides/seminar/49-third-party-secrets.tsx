'use client';

import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { motion } from 'framer-motion';
import SlideWrapper from '../../SlideWrapper';
import { mulberry32 } from '@/lib/random';

/**
 * p49: 4-5 取引先・他社の秘密情報 — 秘密保持契約
 *
 * ベーステンプレート: `templates/Cube3D.tsx`
 * キューブを契約書風ドキュメント（薄型ボックス + 条文テキスト）に変更。
 */

const CHAPTER_ACCENT = '#9ee0a8';
const LAW_ACCENT = '#60a5fa';
const DOC_ACCENT = '#c9a84c';

const SLIDE_TITLE_LINE1 = '秘密保持義務は';
const SLIDE_TITLE_LINE2 = '第三者に開示しない義務';
const SLIDE_BODY = '他者の秘密は営業秘密とは扱いが異なる';
const SLIDE_ARTICLE =
  '第2条（秘密保持）1情報受領者は、秘密情報について厳に秘密を保持するものとし、第三者に対し、秘密情報を一切開示または漏洩してはならないものとする。ただし、次のいずれかに該当する場合を除くものとする。';

const CHECKPOINT_HEADING =
  '秘密保持義務を生成AI利用可能にする際のチェックポイントとして';

const CHECKPOINTS = [
  '利用可能サービス及びプランの明記',
  '使用可能外部ツールの明記',
  '出力情報を秘密情報として取扱う義務',
  'ログの保管',
] as const;

// ─── 契約書風 3D ドキュメント ───────────────────────────────────────────────
function ContractDocument({
  titleLines,
  body,
  article,
}: {
  titleLines: readonly [string, string];
  body: string;
  article: string;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const glowRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.x = Math.sin(t * 0.18) * 0.12 + 0.08;
      groupRef.current.rotation.y = t * 0.2;
    }
    if (glowRef.current && glowRef.current.material instanceof THREE.MeshBasicMaterial) {
      glowRef.current.material.opacity = 0.12 + Math.sin(t * 1.4) * 0.04;
    }
  });

  return (
    <group ref={groupRef} position={[1.1, -0.15, 0]}>
      {/* 内側の薄いグロー */}
      <mesh ref={glowRef} scale={[1.02, 1.02, 1.4]}>
        <boxGeometry args={[1.12, 1.85, 0.06]} />
        <meshBasicMaterial color={LAW_ACCENT} transparent opacity={0.12} />
      </mesh>

      {/* 契約書本体（A4 比率の薄型ボックス） */}
      <mesh>
        <boxGeometry args={[1.12, 1.85, 0.05]} />
        <meshStandardMaterial color="#f4efe3" roughness={0.92} metalness={0.02} />
      </mesh>

      {/* 外枠 */}
      <lineSegments>
        <edgesGeometry args={[new THREE.BoxGeometry(1.14, 1.87, 0.07)]} />
        <lineBasicMaterial color={DOC_ACCENT} />
      </lineSegments>

      {/* 内枠（署名欄風） */}
      <lineSegments scale={[0.88, 0.88, 1]}>
        <edgesGeometry args={[new THREE.BoxGeometry(1.14, 1.87, 0.07)]} />
        <lineBasicMaterial color={LAW_ACCENT} transparent opacity={0.45} />
      </lineSegments>

      {/* 表面: 契約書テキスト */}
      <Html
        transform
        distanceFactor={1.35}
        position={[0, 0, 0.036]}
        style={{
          width: '280px',
          pointerEvents: 'none',
          userSelect: 'none',
        }}
      >
        <div
          className="flex flex-col gap-3 rounded-sm px-4 py-4"
          style={{
            background: 'linear-gradient(180deg, #faf6ee 0%, #f0ead8 100%)',
            border: `1px solid ${DOC_ACCENT}66`,
            boxShadow: '0 10px 36px rgba(0,0,0,0.4)',
            fontFamily: '"Yu Mincho", "Hiragino Mincho ProN", Georgia, serif',
          }}
        >
          <p
            style={{
              fontSize: '10px',
              letterSpacing: '0.14em',
              color: '#6b5a2e',
              margin: 0,
              textAlign: 'center',
              borderBottom: `1px solid ${DOC_ACCENT}44`,
              paddingBottom: '6px',
            }}
          >
            秘密保持契約書
          </p>
          <div className="flex flex-col gap-1">
            <span style={{ fontSize: '9px', letterSpacing: '0.12em', color: '#8a7a55' }}>
              タイトル
            </span>
            <p
              style={{
                fontSize: '13px',
                fontWeight: 700,
                color: '#2a2418',
                lineHeight: 1.5,
                margin: 0,
              }}
            >
              {titleLines[0]}
              <br />
              {titleLines[1]}
            </p>
          </div>
          <div className="flex flex-col gap-1">
            <span style={{ fontSize: '9px', letterSpacing: '0.12em', color: '#8a7a55' }}>
              本文
            </span>
            <p
              style={{
                fontSize: '11px',
                color: '#4a4030',
                lineHeight: 1.65,
                margin: 0,
              }}
            >
              {body}
            </p>
          </div>
          <div
            className="flex flex-col gap-1 rounded-sm px-2 py-2"
            style={{
              borderTop: `1px solid ${DOC_ACCENT}33`,
              marginTop: '4px',
              background: 'rgba(12, 12, 18, 0.92)',
            }}
          >
            <p
              style={{
                fontSize: '9px',
                color: '#ffffff',
                lineHeight: 1.7,
                margin: 0,
              }}
            >
              {article}
            </p>
          </div>
          <div className="flex justify-end pt-1">
            <div
              style={{
                width: '56px',
                height: '16px',
                borderBottom: `1px solid ${DOC_ACCENT}`,
                opacity: 0.7,
              }}
            />
          </div>
        </div>
      </Html>

      {/* 背面: 薄い条文ライン */}
      <Html
        transform
        distanceFactor={1.35}
        position={[0, 0, -0.036]}
        rotation={[0, Math.PI, 0]}
        style={{ width: '220px', pointerEvents: 'none', userSelect: 'none' }}
      >
        <div
          className="flex flex-col gap-1.5 px-3 py-3 rounded-sm"
          style={{ background: '#ebe4d4', border: '1px solid #c8bfb0' }}
        >
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              style={{
                height: '2px',
                width: `${65 + (i % 3) * 12}%`,
                background: '#b8aea0',
                borderRadius: '1px',
              }}
            />
          ))}
        </div>
      </Html>

      {/* 角の留め具風アクセント */}
      {([
        [-0.52, 0.86],
        [0.52, 0.86],
        [-0.52, -0.86],
        [0.52, -0.86],
      ] as [number, number][]).map((p, i) => (
        <mesh key={i} position={[p[0], p[1], 0.04]}>
          <circleGeometry args={[0.035, 16]} />
          <meshBasicMaterial color={i % 2 === 0 ? DOC_ACCENT : LAW_ACCENT} />
        </mesh>
      ))}
    </group>
  );
}

// ─── 周囲のパーティクル ─────────────────────────────────────────────────────
function ParticleHalo({ count = 1200 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);

  const geo = useMemo(() => {
    const rand = mulberry32(0x4e5a6b ^ count);
    const g = new THREE.BufferGeometry();
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const palette = [
      new THREE.Color(CHAPTER_ACCENT),
      new THREE.Color(LAW_ACCENT),
      new THREE.Color(DOC_ACCENT),
    ];
    for (let i = 0; i < count; i++) {
      const theta = rand() * Math.PI * 2;
      const phi = Math.acos(2 * rand() - 1);
      const r = 2.4 + rand() * 1.6;
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
      const c = palette[i % palette.length];
      col[i * 3] = c.r;
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
      ref.current.rotation.x = clock.getElapsedTime() * 0.025;
    }
  });

  return (
    <points ref={ref} geometry={geo}>
      <pointsMaterial vertexColors size={0.028} sizeAttenuation transparent opacity={0.55} />
    </points>
  );
}

export default function Slide48ThirdPartySecrets() {
  return (
    <SlideWrapper>
      <div className="absolute inset-0 z-0">
        <Canvas
          camera={{ position: [3.2, 0.4, 4.2], fov: 50 }}
          gl={{ antialias: true, alpha: false }}
          style={{ background: '#0a0a0f' }}
        >
          <color attach="background" args={['#0a0a0f']} />
          <ambientLight intensity={0.55} />
          <directionalLight position={[4, 6, 5]} intensity={0.85} color="#fff8ee" />
          <pointLight position={[-3, 2, 2]} intensity={0.35} color={LAW_ACCENT} />
          <ContractDocument
            titleLines={[SLIDE_TITLE_LINE1, SLIDE_TITLE_LINE2]}
            body={SLIDE_BODY}
            article={SLIDE_ARTICLE}
          />
          <ParticleHalo count={1100} />
        </Canvas>
      </div>

      {/* オーバーレイ見出し（Cube3D テンプレートと同構成） */}
      <motion.div
        className="absolute z-20 flex flex-col items-start gap-3 w-full max-w-3xl pointer-events-none"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut', delay: 0.2 }}
        style={{ top: '12%', left: '8%' }}
      >
        <span className="text-[10px] tracking-[0.22em] uppercase text-white/40">
          4-5 · 取引先・他社の秘密情報
        </span>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-snug">
          {SLIDE_TITLE_LINE1}
          <br />
          {SLIDE_TITLE_LINE2}
        </h2>
        <p className="text-sm md:text-base text-white leading-relaxed mt-2 max-w-md">
          {SLIDE_BODY}
        </p>
        <p
          className="text-xs md:text-sm text-white leading-relaxed mt-4 max-w-2xl pl-3 border-l-2"
          style={{ borderColor: `${LAW_ACCENT}66` }}
        >
          {SLIDE_ARTICLE}
        </p>

        <div className="flex flex-col gap-3 mt-5 max-w-2xl">
          <p className="text-xs md:text-sm text-white leading-relaxed">
            {CHECKPOINT_HEADING}
          </p>
          <ul className="flex flex-col gap-2.5">
            {CHECKPOINTS.map((item, i) => (
              <motion.li
                key={item}
                className="flex items-start gap-2 text-xs md:text-sm text-white leading-relaxed"
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.35 + i * 0.07 }}
              >
                <span className="shrink-0" style={{ color: CHAPTER_ACCENT }}>
                  ・
                </span>
                <span>{item}</span>
              </motion.li>
            ))}
          </ul>
        </div>
      </motion.div>

      {/* 右下ラベル */}
      <motion.div
        className="absolute bottom-8 right-8 flex items-center gap-2 z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.9 }}
      >
        <motion.span
          className="w-1.5 h-1.5 rounded-full"
          style={{ background: CHAPTER_ACCENT }}
          animate={{ opacity: [1, 0.3, 1] }}
          transition={{ duration: 1.4, repeat: Infinity }}
        />
        <span
          className="tracking-[0.22em] uppercase text-white/40"
          style={{ fontSize: 'clamp(9px, 0.85vw, 11px)' }}
        >
          NDA · Contract
        </span>
      </motion.div>
    </SlideWrapper>
  );
}
