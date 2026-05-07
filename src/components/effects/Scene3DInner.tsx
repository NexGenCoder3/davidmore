import { Canvas, useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import type { Mesh, Group } from 'three';

function Wireframe() {
  const group = useRef<Group>(null);
  useFrame((_, dt) => {
    if (!group.current) return;
    group.current.rotation.x += dt * 0.06;
    group.current.rotation.y += dt * 0.09;
  });
  return (
    <group ref={group}>
      <mesh>
        <icosahedronGeometry args={[2.4, 1]} />
        <meshBasicMaterial color="#22c55e" wireframe transparent opacity={0.55} />
      </mesh>
      <mesh scale={1.4}>
        <icosahedronGeometry args={[2.4, 0]} />
        <meshBasicMaterial color="#22c55e" wireframe transparent opacity={0.18} />
      </mesh>
    </group>
  );
}

function Particles() {
  const ref = useRef<Mesh>(null);
  useFrame((_, dt) => {
    if (ref.current) ref.current.rotation.y += dt * 0.03;
  });
  return (
    <mesh ref={ref}>
      <torusKnotGeometry args={[5, 0.05, 128, 8]} />
      <meshBasicMaterial color="#22c55e" transparent opacity={0.25} wireframe />
    </mesh>
  );
}

export default function Scene3DInner() {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 6], fov: 60 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'low-power' }}
    >
      <ambientLight intensity={0.4} />
      <Wireframe />
      <Particles />
    </Canvas>
  );
}
