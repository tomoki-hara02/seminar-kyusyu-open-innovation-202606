'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * p8（生成AIは異次元の成果を出す）専用の全画面背景。
 *
 * - `<DeckBackground variant="aiCapability" />` から呼ばれる
 * - PC メッシュ + 周囲のパーティクルハロー
 * - `fixed inset-0` で SlideStage の外側に置くことで、画面比率に関わらず
 *   背景が画面全体に行き渡る（letterbox の黒帯と境界が出ない）
 */

function PCMesh() {
  const groupRef = useRef<THREE.Group>(null);
  const screenGlowRef = useRef<THREE.Mesh>(null);

  const kbGeo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    const pts: number[] = [];
    for (let row = 0; row < 4; row++) {
      const z = -0.38 + row * 0.26;
      pts.push(-0.78, 0.06, z,  0.78, 0.06, z);
    }
    for (let col = 0; col < 6; col++) {
      const x = -0.78 + col * 0.312;
      pts.push(x, 0.06, -0.38,  x, 0.06, 0.38);
    }
    g.setAttribute('position', new THREE.Float32BufferAttribute(pts, 3));
    return g;
  }, []);

  const screenContentGeo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    const pts: number[] = [];
    pts.push(-0.72, 0.50, 0.05,  0.72, 0.50, 0.05);
    pts.push(-0.72, 0.36, 0.05,  0.72, 0.36, 0.05);
    const rows = [0.18, 0.02, -0.14, -0.30, -0.44];
    const widths = [1.1, 0.8, 1.0, 0.6, 0.9];
    rows.forEach((y, i) => {
      const hw = widths[i] / 2;
      pts.push(-hw, y, 0.05,  hw, y, 0.05);
    });
    pts.push(-0.45, 0.36, 0.05, -0.45, -0.52, 0.05);
    g.setAttribute('position', new THREE.Float32BufferAttribute(pts, 3));
    return g;
  }, []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.18;
      groupRef.current.rotation.x = Math.sin(t * 0.28) * 0.06;
    }
    if (screenGlowRef.current && screenGlowRef.current.material instanceof THREE.MeshBasicMaterial) {
      screenGlowRef.current.material.opacity = 0.15 + Math.sin(t * 1.3) * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      <group position={[0, -0.5, 0]}>
        <mesh>
          <boxGeometry args={[1.85, 0.1, 1.25]} />
          <meshBasicMaterial color="#4F8EF7" transparent opacity={0.1} />
        </mesh>
        <lineSegments>
          <edgesGeometry args={[new THREE.BoxGeometry(1.85, 0.1, 1.25)]} />
          <lineBasicMaterial color="#88bbff" />
        </lineSegments>
        <lineSegments geometry={kbGeo}>
          <lineBasicMaterial color="#c8a8ff" transparent opacity={0.4} />
        </lineSegments>
        <group position={[0, 0.06, 0.35]}>
          <lineSegments>
            <edgesGeometry args={[new THREE.BoxGeometry(0.55, 0.02, 0.32)]} />
            <lineBasicMaterial color="#88bbff" transparent opacity={0.5} />
          </lineSegments>
        </group>
      </group>

      <group position={[0, 0.27, -0.62]} rotation={[-0.28, 0, 0]}>
        <mesh ref={screenGlowRef}>
          <boxGeometry args={[1.85, 1.22, 0.06]} />
          <meshBasicMaterial color="#4F8EF7" transparent opacity={0.15} />
        </mesh>
        <lineSegments>
          <edgesGeometry args={[new THREE.BoxGeometry(1.85, 1.22, 0.06)]} />
          <lineBasicMaterial color="#88bbff" />
        </lineSegments>
        <lineSegments>
          <edgesGeometry args={[new THREE.BoxGeometry(1.62, 1.0, 0.07)]} />
          <lineBasicMaterial color="#c8a8ff" transparent opacity={0.55} />
        </lineSegments>
        <lineSegments geometry={screenContentGeo}>
          <lineBasicMaterial color="#88bbff" transparent opacity={0.5} />
        </lineSegments>
        <mesh position={[0, 0.58, 0.04]}>
          <sphereGeometry args={[0.03, 16, 16]} />
          <meshBasicMaterial color="#88bbff" />
        </mesh>
      </group>

      {([
        [-0.925, -0.5, -0.625],
        [ 0.925, -0.5, -0.625],
        [-0.925, -0.5,  0.625],
        [ 0.925, -0.5,  0.625],
      ] as [number, number, number][]).map((p, i) => (
        <mesh key={i} position={p}>
          <sphereGeometry args={[0.035, 16, 16]} />
          <meshBasicMaterial color={i % 2 === 0 ? '#FF6B9D' : '#88bbff'} />
        </mesh>
      ))}

      {([
        [-0.925,  0.885, -0.62],
        [ 0.925,  0.885, -0.62],
        [-0.925, -0.335, -0.62],
        [ 0.925, -0.335, -0.62],
      ] as [number, number, number][]).map((p, i) => (
        <mesh key={`sc-${i}`} position={p}>
          <sphereGeometry args={[0.03, 16, 16]} />
          <meshBasicMaterial color={i % 2 === 0 ? '#c8a8ff' : '#4FACF7'} />
        </mesh>
      ))}
    </group>
  );
}

function ParticleHalo({ count = 1400 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);

  const geo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const palette = [
      new THREE.Color('#c8a8ff'),
      new THREE.Color('#88bbff'),
      new THREE.Color('#ffaacc'),
    ];
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi   = Math.acos(2 * Math.random() - 1);
      const r     = 2.6 + Math.random() * 1.8;
      pos[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
      const c = palette[i % palette.length];
      col[i * 3] = c.r; col[i * 3 + 1] = c.g; col[i * 3 + 2] = c.b;
    }
    g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    g.setAttribute('color',    new THREE.BufferAttribute(col, 3));
    return g;
  }, [count]);

  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.y = -clock.getElapsedTime() * 0.06;
      ref.current.rotation.x =  clock.getElapsedTime() * 0.03;
    }
  });

  return (
    <points ref={ref} geometry={geo}>
      <pointsMaterial vertexColors size={0.03} sizeAttenuation transparent opacity={0.65} />
    </points>
  );
}

export default function AiCapabilityBackground() {
  return (
    <div className="fixed inset-0 z-0">
      <Canvas
        camera={{ position: [2.8, 1.4, 4.2], fov: 50 }}
        gl={{ antialias: true, alpha: false }}
        style={{ background: '#0a0a0f' }}
      >
        <color attach="background" args={['#0a0a0f']} />
        <PCMesh />
        <ParticleHalo count={1400} />
      </Canvas>
    </div>
  );
}
