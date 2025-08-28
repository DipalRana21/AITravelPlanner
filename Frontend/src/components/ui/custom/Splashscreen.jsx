import React from 'react';
import { motion } from 'framer-motion';
import AnimatedLogo from './AnimatedLogo';

export default function Splashscreen() {
  return (
    <div className="relative w-full h-screen overflow-hidden bg-[#0b0c2a]">
      {/* 🌌 Cosmic Starfield Background */}
      <div className="absolute inset-0 z-0 bg-[url('/assets/starfield.gif')] bg-cover bg-center opacity-40 animate-slowPan pointer-events-none" />

      {/* 🌫️ Nebula Blurs */}
      <div className="absolute left-[10%] top-[30%] w-[300px] h-[300px] bg-indigo-600 opacity-[0.03] rounded-full blur-[140px]" />
      <div className="absolute right-[15%] bottom-[25%] w-[400px] h-[400px] bg-purple-400 opacity-[0.04] rounded-full blur-[160px]" />

      {/* 🌩️ Lightning Pulses */}
      <div className="absolute top-0 left-0 w-64 h-64 pointer-events-none animate-lightningPulse" />
      <div className="absolute bottom-0 right-0 w-64 h-64 pointer-events-none animate-lightningPulse delay-[3s]" />

      {/* 🧙 Floating Runes */}
      {Array.from({ length: 6 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-white text-3xl opacity-20 pointer-events-none select-none"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            rotate: 0,
          }}
          animate={{
            y: ['0%', '-10%', '0%'],
            rotate: [0, 360],
          }}
          transition={{
            duration: 20 + Math.random() * 10,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          style={{
            fontFamily: 'serif',
          }}
        >
          ᚠ
        </motion.div>
      ))}

      {/* 🌀 Animated Logo Entrance */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2, ease: 'easeOut' }}
        className="relative z-10 flex items-center justify-center h-full"
      >
        <motion.div
          className="drop-shadow-[0_0_35px_rgba(255,0,255,0.3)] scale-[1.02]"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          <AnimatedLogo />
        </motion.div>
      </motion.div>
    </div>
  );
}
