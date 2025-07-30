// Splashscreen.jsx

import React, { useEffect, useState, useRef } from "react";
import * as THREE from "three";
import GLOBE from "vanta/dist/vanta.globe.min";

import AnimatedLogo from "./AnimatedLogo";

export default function Splashscreen() {
  const [vantaEffect, setVantaEffect] = useState(null);
  const vantaRef = useRef(null);

  useEffect(() => {
    if (!vantaEffect) {
     setVantaEffect(
  GLOBE({
    el: vantaRef.current,
    THREE,
    color: 0xffffff,
    backgroundColor: 0x0f172a,
    size: 1.2,
    mouseControls: true,
    touchControls: true,
    scale: 1,
    scaleMobile: 1,
  })
);

    }

    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);

  return (
    <div ref={vantaRef} className="min-h-screen w-full bg-gradient-to-b from-[#0f172a] to-[#1e293b] relative">
      <div className="absolute inset-0 z-10 flex items-center justify-center">
        <AnimatedLogo />
      </div>
    </div>
  );
}
