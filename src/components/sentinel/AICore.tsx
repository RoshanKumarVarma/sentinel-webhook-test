import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

interface OrbProps {
  healthScore: number;
  isSimulating: boolean;
}

function CoreSphere({ healthScore, isSimulating }: OrbProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  const color = useMemo(() => {
    if (isSimulating) return new THREE.Color(0xff3333);
    if (healthScore > 70) return new THREE.Color(0x00e5ff);
    if (healthScore > 40) return new THREE.Color(0xffaa00);
    return new THREE.Color(0xff3333);
  }, [healthScore, isSimulating]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.y = t * 0.3;
      meshRef.current.rotation.x = Math.sin(t * 0.2) * 0.1;
    }
    if (glowRef.current) {
      const scale = 1.3 + Math.sin(t * 2) * 0.1;
      glowRef.current.scale.setScalar(scale);
    }
    if (ringRef.current) {
      ringRef.current.rotation.z = t * 0.5;
      ringRef.current.rotation.x = Math.PI / 2 + Math.sin(t * 0.3) * 0.2;
    }
  });

  return (
    <group>
      {/* Outer glow */}
      <Sphere ref={glowRef} args={[1.4, 32, 32]}>
        <meshBasicMaterial color={color} transparent opacity={0.05} />
      </Sphere>

      {/* Main orb */}
      <Sphere ref={meshRef} args={[1, 64, 64]}>
        <MeshDistortMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.5}
          roughness={0.2}
          metalness={0.8}
          distort={isSimulating ? 0.6 : 0.3}
          speed={isSimulating ? 4 : 2}
          transparent
          opacity={0.9}
        />
      </Sphere>

      {/* Ring */}
      <mesh ref={ringRef}>
        <torusGeometry args={[1.8, 0.02, 16, 100]} />
        <meshBasicMaterial color={color} transparent opacity={0.4} />
      </mesh>

      {/* Second ring */}
      <mesh rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[2.0, 0.015, 16, 100]} />
        <meshBasicMaterial color={color} transparent opacity={0.2} />
      </mesh>

      {/* Particles */}
      <Particles color={color} count={200} />
    </group>
  );
}

function Particles({ color, count }: { color: THREE.Color; count: number }) {
  const points = useRef<THREE.Points>(null);
  
  const particlePositions = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 2 + Math.random() * 1.5;
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
    }
    return positions;
  }, [count]);

  useFrame((state) => {
    if (points.current) {
      points.current.rotation.y = state.clock.getElapsedTime() * 0.1;
    }
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[particlePositions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial color={color} size={0.02} transparent opacity={0.6} sizeAttenuation />
    </points>
  );
}

export default function AICore({ healthScore, isSimulating }: OrbProps) {
  return (
    <div className="w-full h-full">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={0.5} />
        <pointLight position={[-10, -10, -10]} intensity={0.3} color="#00e5ff" />
        <CoreSphere healthScore={healthScore} isSimulating={isSimulating} />
      </Canvas>
    </div>
  );
}
