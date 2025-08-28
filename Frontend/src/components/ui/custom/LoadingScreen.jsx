// src/components/ui/custom/LoadingOverlay3D.jsx
import React, { Suspense, useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Float,
  OrbitControls,
  Sparkles,
  Environment,
  MeshWobbleMaterial,
} from "@react-three/drei";

// --- Neon Torus
function NeonTorus({ color = "#39ff14", accent = "#ff4ecb" }) {
  const ref = useRef();
  useFrame((state, delta) => {
    ref.current.rotation.y += delta * 0.25;
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.15) * 0.05;
  });

  return (
    <Float floatIntensity={0.6} rotationIntensity={0.2}>
      <mesh ref={ref} scale={[1.2, 1.2, 1.2]}>
        <torusGeometry args={[1.25, 0.28, 64, 128]} />
        <MeshWobbleMaterial
          factor={0.25}
          speed={1}
          color={color}
          emissive={accent}
          emissiveIntensity={1}
          roughness={0.15}
          metalness={0.8}
        />
      </mesh>
    </Float>
  );
}

// --- Inner Core
function InnerCore() {
  const ref = useRef();
  useFrame((state) => {
    ref.current.rotation.z = state.clock.elapsedTime * -0.35;
  });
  return (
    <Float floatIntensity={0.4} rotationIntensity={0.2}>
      <mesh ref={ref} scale={[0.55, 0.55, 0.55]}>
        <icosahedronGeometry args={[0.6, 2]} />
        <MeshWobbleMaterial
          factor={1.0}
          speed={0.9}
          color={"#ff9a5a"}
          emissive={"#00ffff"}
          emissiveIntensity={0.85}
          roughness={0.2}
          metalness={0.9}
        />
      </mesh>
    </Float>
  );
}

// --- Holographic Globe 🌍
function HoloGlobe() {
  const ref = useRef();
  useFrame((state, delta) => {
    ref.current.rotation.y += delta * 0.12;
  });

  return (
    <mesh ref={ref} scale={[1.6, 1.6, 1.6]} position={[0, -1.4, -1]}>
      <sphereGeometry args={[1, 64, 64]} />
      <meshStandardMaterial
        color="#111122"
        emissive="#39ff14"
        emissiveIntensity={0.25}
        wireframe
        transparent
        opacity={0.4}
      />
    </mesh>
  );
}

// --- Typewriter shimmer text
function TypewriterText({ text }) {
  const [displayed, setDisplayed] = useState("");
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayed(text.slice(0, i + 1));
      i++;
      if (i >= text.length) clearInterval(interval);
    }, 50);
    return () => clearInterval(interval);
  }, [text]);

  return (
    <div
      style={{
        fontFamily: "Inter, sans-serif",
        fontSize: 22,
        fontWeight: 600,
        letterSpacing: 1.5,
        color: "#67e8f9",
        textShadow: "0 0 12px rgba(0,255,200,0.25)",
        minHeight: 30, // keeps layout stable while text changes
      }}
    >
      {displayed}
      <span className="blink">|</span>
      <style>{`
        .blink {
          animation: blink 1s step-start infinite;
        }
        @keyframes blink {
          50% { opacity: 0; }
        }
      `}</style>
    </div>
  );
}

// --- Liquid progress bar
function HoloProgressBar() {
  return (
    <div
      style={{
        width: 380,
        height: 12,
        margin: "22px auto 0",
        borderRadius: 999,
        background:
          "linear-gradient(90deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))",
        overflow: "hidden",
        boxShadow: "inset 0 1px 2px rgba(0,0,0,0.6)",
      }}
    >
      <div
        style={{
          width: "40%",
          height: "100%",
          background:
            "linear-gradient(90deg, rgba(57,255,20,0.85), rgba(255,78,203,0.9), rgba(0,255,200,0.8))",
          animation: "waveMove 2.2s ease-in-out infinite",
          borderRadius: 999,
          filter: "blur(1px)",
        }}
      />
      <style>{`
        @keyframes waveMove {
          0% { transform: translateX(-50%) scaleX(0.9); }
          50% { transform: translateX(120%) scaleX(1.05); }
          100% { transform: translateX(250%) scaleX(0.9); }
        }
      `}</style>
    </div>
  );
}

export default function LoadingOverlay3D() {
  // ✨ Dynamic status messages
  const messages = [
    "Synthesizing your itinerary...",
    "Scanning flight paths across galaxies...",
    "Booking your AI-generated tickets...",
    "Unlocking hidden gems in your destinations...",
    "Optimizing travel routes through neural nets...",
    "Packing your virtual suitcase...",
    "Almost there... Finalizing your perfect journey!",
  ];

  const [currentMessage, setCurrentMessage] = useState(messages[0]);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      i = (i + 1) % messages.length;
      setCurrentMessage(messages[i]);
    }, 4000); // change every 4 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center"
      style={{
        background:
          "radial-gradient(circle at center, rgba(5,10,20,0.95) 0%, rgba(10,15,25,0.98) 40%, rgba(6,10,18,1) 100%)",
        backdropFilter: "blur(6px)",
      }}
    >
      {/* Ambient gradient overlays */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at 20% 30%, rgba(57,255,20,0.05), transparent 60%), radial-gradient(circle at 80% 70%, rgba(255,78,203,0.07), transparent 60%)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          width: "min(1200px, 95vw)",
          height: "min(750px, 80vh)",
          position: "relative",
        }}
      >
        <div style={{ position: "absolute", inset: 0 }}>
          <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
            <Suspense fallback={null}>
              <ambientLight intensity={0.6} />
              <directionalLight intensity={0.5} position={[5, 5, 5]} />
              <spotLight intensity={0.7} position={[-8, 10, -10]} />

              <color attach="background" args={["#050505"]} />
              <Environment background={false} files="/hdr/dark_studio_1k.hdr" />

              {/* Neon Torus + Core */}
              <group position={[0, 0.5, 0]}>
                <NeonTorus />
                <InnerCore />
              </group>

              {/* Globe */}
              <HoloGlobe />

              {/* Particles */}
              <Sparkles
                count={100}
                size={5}
                scale={[8, 5, 8]}
                speed={0.4}
                color={"#39ff14"}
              />
              <Sparkles
                count={50}
                size={3}
                scale={[10, 6, 10]}
                speed={0.2}
                color={"#ff4ecb"}
              />

              <OrbitControls
                enableZoom={false}
                enablePan={false}
                enableRotate={false}
              />
            </Suspense>
          </Canvas>
        </div>

        {/* Foreground */}
        <div
          style={{
            position: "relative",
            zIndex: 10,
            textAlign: "center",
            marginTop: "15%",
          }}
        >
          {/* Branding badge */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 14,
              padding: "16px 28px",
              borderRadius: 30,
              background: "rgba(255,255,255,0.03)",
              boxShadow:
                "0 8px 40px rgba(0,0,0,0.6), inset 0 -3px 16px rgba(0,0,0,0.3)",
              backdropFilter: "blur(6px)",
            }}
          >
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: "50%",
                background:
                  "linear-gradient(135deg,#ff4ecb,#39ff14 70%, #00eaff)",
                boxShadow:
                  "0 0 20px rgba(255,78,203,0.6), 0 0 40px rgba(57,255,20,0.4)",
              }}
            />
            <div style={{ textAlign: "left" }}>
              <div
                style={{
                  fontWeight: 700,
                  color: "#fff",
                  fontSize: 20,
                  letterSpacing: 0.5,
                }}
              >
                TripMind
              </div>
              <div
                style={{
                  fontSize: 13,
                  color: "rgba(255,255,255,0.65)",
                }}
              >
                AI Travel Planner
              </div>
            </div>
          </div>

          {/* Holographic typing text */}
          <div style={{ marginTop: 32 }}>
            <TypewriterText text={currentMessage} />
            <HoloProgressBar />
          </div>
        </div>
      </div>
    </div>
  );
}
