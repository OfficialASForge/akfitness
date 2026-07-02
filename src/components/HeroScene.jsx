import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import {
  OrbitControls,
  Float,
  MeshDistortMaterial,
  Stars,
  Sparkles,
  useGLTF,
  useAnimations,
} from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";

function EnergyBall({ position, scale, color }) {
  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <mesh position={position} scale={scale}>
        <sphereGeometry args={[1, 64, 64]} />
        <MeshDistortMaterial
          color={color}
          distort={0.35}
          speed={2}
        />
      </mesh>
    </Float>
  );
}

function FireParticles() {
  const group = useRef();

  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y =
        state.clock.elapsedTime * 0.04;
    }
  });

  return (
    <group ref={group}>
      {Array.from({ length: 40 }).map((_, i) => (
        <mesh
          key={i}
          position={[
            (Math.random() - 0.5) * 10,
            Math.random() * 6 - 2,
            (Math.random() - 0.5) * 10,
          ]}
        >
          <sphereGeometry args={[0.03, 8, 8]} />
          <meshBasicMaterial
            color={i % 2 ? "#ff6a00" : "#ffd166"}
          />
        </mesh>
      ))}
    </group>
  );
}
function CameraMotion() {
  useFrame((state) => {
    const t = state.clock.elapsedTime;

    state.camera.position.x = Math.sin(t * 0.25) * 0.18;
    state.camera.position.y = 0.55 + Math.sin(t * 0.5) * 0.05;

    state.camera.lookAt(0, 0.25, 0);
  });

  return null;
}

function EnergyRing() {
  const ring = useRef();

  useFrame((state) => {
    if (ring.current) {
      ring.current.rotation.z = state.clock.elapsedTime * 0.7;
    }
  });

  return (
    <mesh
      ref={ring}
      position={[0, -2.0, 0]}
      rotation={[Math.PI / 2, 0, 0]}
     >
      <torusGeometry args={[1.8, 0.08, 32, 200]} />

      <meshBasicMaterial
        color="#ff7a00"
        transparent
        opacity={0.9}
      />
    </mesh>
  );
}

function EnergyPlatform() {
  const platform = useRef();

 useFrame((state) => {
  if (platform.current) {
    platform.current.rotation.z =
      state.clock.elapsedTime * 0.15;

    const glow =
      0.85 + Math.sin(state.clock.elapsedTime * 3) * 0.15;

    // Outer Ring
    platform.current.children[1].material.opacity = glow;

    // Inner Ring
    platform.current.children[2].material.opacity =
      0.6 + Math.sin(state.clock.elapsedTime * 3) * 0.2;

      platform.current.children[3].material.opacity =
     0.25 + Math.sin(state.clock.elapsedTime * 2.5) * 0.08;
  }
});

  return (
    <group
      ref={platform}
      position={[0, -2.15, -1.2]}
      rotation={[-1.2, 0, 0]}
    >
      {/* Glow Disc */}
      <mesh>
  <circleGeometry args={[1.55, 64]} />
  <meshBasicMaterial
    color="#ff8c00"
    transparent
    opacity={0.75}
    toneMapped={false}
  />
</mesh>

      {/* Outer Ring */}
      <mesh>
      <ringGeometry args={[2.05, 2.32, 128]} />
      <meshBasicMaterial
  color="#ffd54a"
  transparent
  opacity={1}
  toneMapped={false}
/>
     </mesh>

      {/* Inner Ring */}
      <mesh position={[0, 0, 0.002]}>
        <ringGeometry args={[1.45, 1.55, 128]} />
        <meshBasicMaterial
          color="#ffd166"
          transparent
          opacity={0.8}
        />
      </mesh>

      <mesh position={[0, 0, 0.003]}>
  <ringGeometry args={[1.75, 1.82, 128]} />
  <meshBasicMaterial
    color="#ffae00"
    transparent
    opacity={0.35}
    toneMapped={false}
  />
</mesh>
    </group>
  );
}

function AuraGlow() {
  const glow = useRef();

  useFrame((state) => {
    if (glow.current) {
      glow.current.material.opacity =
        0.18 + Math.sin(state.clock.elapsedTime * 2) * 0.06;
    }
  });

  return (
    <mesh position={[0, 0.4, -0.9]} ref={glow}>
      <circleGeometry args={[1.6, 64]} />
      <meshBasicMaterial
        color="#ff7a00"
        transparent
        opacity={0.2}
      />
    </mesh>
  );
}

function Fighter() {
  const group = useRef();

  const { scene, animations } =
    useGLTF("/models/goku.glb");

  const { actions } =
    useAnimations(animations, group);

  useEffect(() => {
    if (!actions) return;

    const first =
      Object.values(actions)[0];

    if (first) {
      first.reset();
      first.fadeIn(0.5);
      first.play();
    }
    scene.traverse((child) => {
    console.log(child.name, child.type);
    });
  }, [actions]);

  useFrame((state) => {
    if (group.current) {
      group.current.position.y =
        -1.45 +
        Math.sin(
          state.clock.elapsedTime * 1.5
        ) *
          0.03;
    }
  });

  return (
    <group
      ref={group}
      position={[0, -1.25, 0]}
      scale={1.15}
      rotation={[0, 0.25, 0]}
    >
      <EnergyRing />
      <primitive object={scene} />
    </group>
  );
}
export default function HeroScene() {
  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      camera={{
        position: [0, 0.45, 6.2],
        fov: 38,
      }}
      gl={{
        alpha: true,
        antialias: true,
      }}
    >
      <ambientLight intensity={0.4} color="#ffffff" />
      <directionalLight
      position={[2, 3, 4]}
      intensity={1.4}
      color="#ffb347"
     />

      <spotLight
      position={[4, 6, 5]}
      angle={0.45}
      penumbra={1}
      intensity={180}
      distance={20}
      castShadow
      color="#ff7a00"
     />

      <pointLight
      position={[-5, 2, 4]}
      intensity={40}
      color="#4fc3ff"
     />

      <pointLight
        position={[0, 5, -2]}
        intensity={28}
        color="#ffffff"
      />

      <Stars
        radius={100}
        depth={60}
        count={2500}
        factor={4}
        fade
        speed={0.4}
      />

      <Sparkles
        count={18}
        scale={7}
        size={2}
        speed={0.1}
      />

      <FireParticles />

      <EnergyBall
        position={[-3, 2, -2]}
        scale={0.45}
        color="#ff8800"
      />

      <EnergyBall
        position={[3, -2, -1]}
        scale={0.55}
        color="#ff3300"
      />
      <CameraMotion />
      <EnergyPlatform />
      <AuraGlow />
      <Fighter />
      

      <EffectComposer>
       <Bloom
        intensity={0.9}
        luminanceThreshold={0.18}
        luminanceSmoothing={0.9}
       />
      </EffectComposer>

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        enableRotate={false}
      />
    </Canvas>
  );
}

useGLTF.preload("/models/goku.glb");