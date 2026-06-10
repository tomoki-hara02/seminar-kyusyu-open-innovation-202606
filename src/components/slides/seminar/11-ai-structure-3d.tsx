'use client';

import { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import SlideDesignCanvas, { SLIDE_DESIGN_HEIGHT, SLIDE_DESIGN_WIDTH } from '@/components/SlideDesignCanvas';
import * as THREE from 'three';
import { motion } from 'framer-motion';
import SlideWrapper from '../../SlideWrapper';
import { mulberry32 } from '@/lib/random';

const LEFT_X  = -2.8;
const RIGHT_X =  2.8;
const FLOW_Y  =  0.2;

// ─── 左：OCRScan3D と同じスマホ（縦に立ててカメラ側を向く） ───────────────
function SourcePhone() {
  const groupRef = useRef<THREE.Group>(null);
  const glowRef  = useRef<THREE.Mesh>(null);
  const emitRef  = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.position.y = FLOW_Y + Math.sin(t * 0.7) * 0.05;
      groupRef.current.rotation.y = 0.25 + Math.sin(t * 0.4) * 0.04;
    }
    if (glowRef.current && glowRef.current.material instanceof THREE.MeshBasicMaterial) {
      glowRef.current.material.opacity = 0.45 + Math.sin(t * 2.4) * 0.12;
    }
    if (emitRef.current && emitRef.current.material instanceof THREE.MeshBasicMaterial) {
      emitRef.current.material.opacity = 0.5 + Math.sin(t * 3.6) * 0.3;
    }
  });

  return (
    <group ref={groupRef} position={[LEFT_X, FLOW_Y, 0]} rotation={[0, 0.25, 0]}>
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

      {/* スクリーンの全体グロー */}
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

      {/* 送信中を示すバー（緑→青の点滅でアップロード感） */}
      <mesh ref={emitRef} position={[0, -0.78, 0.047]}>
        <planeGeometry args={[0.7, 0.045]} />
        <meshBasicMaterial
          color="#88bbff"
          transparent
          opacity={0.7}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* スピーカーグリル */}
      <mesh position={[0, 0.92, 0.047]}>
        <planeGeometry args={[0.12, 0.018]} />
        <meshBasicMaterial color="#2a2a36" />
      </mesh>
    </group>
  );
}

// ─── 中央：Claude コア（多層の発光オーブ） ────────────────────────────────
function ClaudeCore() {
  const wireRef  = useRef<THREE.Group>(null);
  const ringRef  = useRef<THREE.Mesh>(null);
  const glowRef  = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (wireRef.current) {
      wireRef.current.rotation.y = t * 0.28;
      wireRef.current.rotation.x = t * 0.12;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z = -t * 0.6;
    }
    if (glowRef.current && glowRef.current.material instanceof THREE.MeshBasicMaterial) {
      glowRef.current.material.opacity = 0.32 + Math.sin(t * 2.2) * 0.12;
    }
  });

  return (
    <group position={[0, FLOW_Y + 0.05, 0]}>
      {/* 外殻：多面体のワイヤフレーム */}
      <group ref={wireRef}>
        <lineSegments>
          <edgesGeometry args={[new THREE.IcosahedronGeometry(1.0, 1)]} />
          <lineBasicMaterial color="#c8a8ff" transparent opacity={0.7} />
        </lineSegments>
        <lineSegments scale={[0.75, 0.75, 0.75]}>
          <edgesGeometry args={[new THREE.IcosahedronGeometry(1.0, 0)]} />
          <lineBasicMaterial color="#88bbff" transparent opacity={0.5} />
        </lineSegments>
      </group>

      {/* 多層の発光スフィア */}
      <mesh>
        <sphereGeometry args={[0.72, 32, 32]} />
        <meshBasicMaterial color="#7B5EA7" transparent opacity={0.18} />
      </mesh>
      <mesh ref={glowRef}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshBasicMaterial
          color="#4F8EF7"
          transparent
          opacity={0.4}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.28, 32, 32]} />
        <meshBasicMaterial
          color="#ffffff"
          transparent
          opacity={0.75}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* 周回する単一リング — 処理中の感じを補強 */}
      <mesh ref={ringRef} rotation={[Math.PI / 2.3, 0.3, 0]}>
        <torusGeometry args={[1.25, 0.012, 8, 96]} />
        <meshBasicMaterial color="#ffaacc" transparent opacity={0.55} />
      </mesh>
    </group>
  );
}

// ─── 右：構造化された JSON 風のパネル ─────────────────────────────────────
function StructuredPanel() {
  const ref = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (ref.current) {
      const t = clock.getElapsedTime();
      ref.current.position.y = FLOW_Y + Math.sin(t * 0.7) * 0.04;
      ref.current.rotation.y = -0.32 + Math.sin(t * 0.3) * 0.04;
    }
  });

  // TODO: 抽出されたフィールド（左がキー、右が値の長さ）
  const rows = [
    { key: 0.78, val: 0.85 }, // name
    { key: 0.55, val: 0.95 }, // company
    { key: 0.62, val: 0.5  }, // title
    { key: 0.45, val: 0.78 }, // phone
    { key: 0.38, val: 0.90 }, // email
    { key: 0.62, val: 1.05 }, // address
    { key: 0.50, val: 0.42 }, // department
  ];

  return (
    <group ref={ref} position={[RIGHT_X, FLOW_Y, 0]} rotation={[0, -0.32, 0]}>
      {/* パネル背景 */}
      <mesh>
        <planeGeometry args={[2.1, 2.5]} />
        <meshBasicMaterial color="#0d0d18" transparent opacity={0.9} />
      </mesh>
      <lineSegments>
        <edgesGeometry args={[new THREE.PlaneGeometry(2.1, 2.5)]} />
        <lineBasicMaterial color="#88bbff" transparent opacity={0.55} />
      </lineSegments>

      {/* ヘッダ帯 */}
      <mesh position={[0, 1.1, 0.01]}>
        <planeGeometry args={[1.95, 0.1]} />
        <meshBasicMaterial color="#4F8EF7" />
      </mesh>
      <mesh position={[-0.78, 1.1, 0.012]}>
        <planeGeometry args={[0.32, 0.05]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>

      {/* 開きブレース */}
      <mesh position={[-0.95, 0.92, 0.01]}>
        <planeGeometry args={[0.05, 0.05]} />
        <meshBasicMaterial color="#c8a8ff" />
      </mesh>

      {/* JSON 行 */}
      {rows.map((r, i) => {
        const y = 0.78 - i * 0.21;
        return (
          <group key={i} position={[0, y, 0.01]}>
            {/* インデント点 */}
            <mesh position={[-0.86, 0, 0]}>
              <circleGeometry args={[0.022, 14]} />
              <meshBasicMaterial color="#88bbff" />
            </mesh>
            {/* "key" */}
            <mesh position={[-0.86 + 0.04 + r.key / 2, 0, 0]}>
              <planeGeometry args={[r.key, 0.06]} />
              <meshBasicMaterial color="#c8a8ff" />
            </mesh>
            {/* ":" */}
            <mesh position={[-0.86 + 0.04 + r.key + 0.05, 0, 0]}>
              <planeGeometry args={[0.02, 0.06]} />
              <meshBasicMaterial color="#ffffff" />
            </mesh>
            {/* "value" */}
            <mesh position={[-0.86 + 0.04 + r.key + 0.12 + r.val / 2, 0, 0]}>
              <planeGeometry args={[r.val, 0.06]} />
              <meshBasicMaterial color="#dcdce6" />
            </mesh>
          </group>
        );
      })}

      {/* 閉じブレース */}
      <mesh position={[-0.95, 0.78 - rows.length * 0.21 + 0.02, 0.01]}>
        <planeGeometry args={[0.05, 0.05]} />
        <meshBasicMaterial color="#c8a8ff" />
      </mesh>

      {/* ステータス：完了バー（下端） */}
      <mesh position={[0, -1.13, 0.01]}>
        <planeGeometry args={[1.95, 0.06]} />
        <meshBasicMaterial color="#9ee0a8" transparent opacity={0.85} />
      </mesh>
    </group>
  );
}

// ─── 左→中央 / 中央→右 を流れるデータパケット ────────────────────────────
function DataStream({
  from,
  to,
  count,
  seed,
  color,
  speed = 0.45,
}: {
  from: [number, number, number];
  to: [number, number, number];
  count: number;
  seed: number;
  color: string;
  speed?: number;
}) {
  const packetsRef = useRef<THREE.Group>(null);

  const offsets = useMemo(() => {
    const rand = mulberry32(seed);
    return Array.from({ length: count }, () => rand());
  }, [count, seed]);

  const lineGeo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setFromPoints([new THREE.Vector3(...from), new THREE.Vector3(...to)]);
    return g;
  }, [from, to]);

  useEffect(() => () => lineGeo.dispose(), [lineGeo]);

  useFrame(({ clock }) => {
    if (!packetsRef.current) return;
    const t = clock.getElapsedTime();
    packetsRef.current.children.forEach((child, i) => {
      const phase = (t * speed + offsets[i]) % 1;
      child.position.x = from[0] + (to[0] - from[0]) * phase;
      child.position.y =
        from[1] + (to[1] - from[1]) * phase + Math.sin(phase * Math.PI * 2.5) * 0.05;
      child.position.z = from[2] + (to[2] - from[2]) * phase;
      const visible = Math.sin(phase * Math.PI);
      if (child instanceof THREE.Mesh && child.material instanceof THREE.MeshBasicMaterial) {
        child.material.opacity = visible;
      }
      child.scale.setScalar(0.5 + visible * 0.9);
    });
  });

  return (
    <group>
      {/* 流路のベースライン（細く薄い） */}
      <lineSegments geometry={lineGeo}>
        <lineBasicMaterial color={color} transparent opacity={0.25} />
      </lineSegments>

      {/* パケット粒 */}
      <group ref={packetsRef}>
        {offsets.map((_, i) => (
          <mesh key={i}>
            <sphereGeometry args={[0.05, 14, 14]} />
            <meshBasicMaterial
              color={color}
              transparent
              opacity={0}
              blending={THREE.AdditiveBlending}
            />
          </mesh>
        ))}
      </group>
    </group>
  );
}

// ─── 周囲を漂うパーティクル ────────────────────────────────────────────────
function ParticleHalo({ count = 1100 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);

  const geo = useMemo(() => {
    const rand = mulberry32(0xe1a73f ^ count);
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
      const r = 4.0 + rand() * 2.6;
      pos[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.7;
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
      ref.current.rotation.y = -clock.getElapsedTime() * 0.04;
      ref.current.rotation.x =  clock.getElapsedTime() * 0.02;
    }
  });

  return (
    <points ref={ref} geometry={geo}>
      <pointsMaterial vertexColors size={0.026} sizeAttenuation transparent opacity={0.55} />
    </points>
  );
}

export default function Slide11AiStructure3d() {
  return (
    <SlideWrapper>
      {/* 3D 背景：1440×810 にフルブリード */}
      <div
        className="absolute z-0 overflow-hidden"
        style={{ left: 0, top: 0, width: SLIDE_DESIGN_WIDTH, height: SLIDE_DESIGN_HEIGHT }}
      >
        <SlideDesignCanvas
          camera={{ position: [0, 1.35, 7.2], fov: 50 }}
          style={{ background: '#0a0a0f' }}
          onCreated={({ camera }) => camera.lookAt(0, 0.15, 0)}
        >
          <color attach="background" args={['#0a0a0f']} />

          <SourcePhone />
          <DataStream
            from={[LEFT_X + 0.7, FLOW_Y + 0.05, 0.05]}
            to={[-1.0, FLOW_Y + 0.05, 0]}
            count={10}
            seed={0xa1c7}
            color="#88bbff"
            speed={0.5}
          />
          <ClaudeCore />
          <DataStream
            from={[1.0, FLOW_Y + 0.05, 0]}
            to={[RIGHT_X - 1.0, FLOW_Y, 0]}
            count={10}
            seed={0x55d3}
            color="#c8a8ff"
            speed={0.55}
          />
          <StructuredPanel />
          <ParticleHalo count={1100} />
        </SlideDesignCanvas>
      </div>

      <div
        className="absolute inset-y-0 left-0 z-10 w-[52%] pointer-events-none"
        style={{
          background:
            'linear-gradient(90deg, rgba(10,10,15,0.96) 0%, rgba(10,10,15,0.65) 50%, transparent 100%)',
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
          実例② · 構造化
        </span>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-snug">
          AIでデータ整形
        </h2>
        <p className="text-sm md:text-base text-white leading-relaxed mt-2 max-w-md">
          氏名・連絡先・所属を構造化スキーマに正規化して返します
        </p>
      </motion.div>

      <div
        className="absolute z-20 flex items-center justify-between pointer-events-none"
        style={{ left: '14%', right: '14%', bottom: '11%' }}
      >
        <span
          className="tracking-[0.22em] uppercase text-white/45"
          style={{ fontSize: 'clamp(10px, 0.85vw, 11px)' }}
        >
          Raw OCR
        </span>
        <span
          className="tracking-[0.28em] uppercase text-white/80"
          style={{ fontSize: 'clamp(11px, 0.95vw, 13px)' }}
        >
          Claude
        </span>
        <span
          className="tracking-[0.22em] uppercase text-white/45"
          style={{ fontSize: 'clamp(10px, 0.85vw, 11px)' }}
        >
          Structured JSON
        </span>
      </div>

      <motion.div
        className="absolute bottom-8 right-8 flex items-center gap-2 z-20 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.9 }}
      >
        <motion.span
          className="w-1.5 h-1.5 rounded-full bg-[#c8a8ff]"
          animate={{ opacity: [1, 0.3, 1] }}
          transition={{ duration: 1.4, repeat: Infinity }}
        />
        <span
          className="tracking-[0.22em] uppercase text-white/40"
          style={{ fontSize: 'clamp(10px, 0.85vw, 11px)' }}
        >
          Send · Reason · Structure
        </span>
      </motion.div>
    </SlideWrapper>
  );
}
