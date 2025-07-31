import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "./button.jsx";
import TypingText from "./TypingText.jsx";
import TrustedBy from "./TrustedBy.jsx";
import { motion } from "framer-motion";
import HowItWorks from './HowItWorks.jsx';
// import ambientSound from './assets/ambient.mp3'; // Optional: add your ambient.mp3 file here

export default function Hero() {
  // Optional: ambient sound autoplay
  /*
  useEffect(() => {
    const audio = new Audio(ambientSound);
    audio.volume = 0.1;
    audio.loop = true;
    audio.play().catch(() => {});
  }, []);
  */

  return (
    <section className="relative bg-gradient-to-b from-[#0e1421] to-[#1c263b] dark:from-[#0f172a] dark:to-[#0f172a] text-white dark:text-gray-100 min-h-screen flex items-center overflow-hidden">

      {/* 🌍 Rotating Planet SVG */}
      <div className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none">
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="w-full h-full animate-spin-slow opacity-[0.03] scale-[4]">
          <defs>
            <radialGradient id="planetGradient" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#1e3a8a"/>
              <stop offset="100%" stopColor="#0f172a"/>
            </radialGradient>
          </defs>
          <circle cx="50" cy="50" r="40" fill="url(#planetGradient)" />
        </svg>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-20 text-center flex flex-col items-center justify-center z-10">

        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          className="text-5xl md:text-7xl font-extrabold tracking-tight leading-tight bg-clip-text text-transparent bg-gradient-to-r from-[#FF6B6B] via-[#FFA41B] to-[#FFD93D] drop-shadow-[0_5px_25px_rgba(255,255,255,0.15)]"
        >
          Your Dream Trip.
          <br className="hidden md:inline" />
          <span className="text-4xl md:text-6xl block mt-2 text-cyan-400 glow-sm">
            Orchestrated by AI.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.7 }}
          className="mt-6 text-lg md:text-xl text-gray-400 max-w-2xl leading-relaxed"
        >
          Destinations selected. Itineraries optimized.
          <br /><span className="text-white font-medium"> You just exist —</span> we’ll code the stars to guide your path.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.7 }}
          className="mt-2 text-sm uppercase tracking-widest text-gray-500"
        >
          The future of travel isn't booked. It's generated.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="z-10"
        >
          <Link to="/create-trip">
            <Button
              variant="default"
              size="lg"
              className="mt-10 px-8 py-4 rounded-full bg-gradient-to-r from-pink-500 via-fuchsia-500 to-indigo-500 text-white text-lg font-semibold shadow-[0_0_40px_rgba(255,0,255,0.3)] hover:scale-105 transition-transform duration-300 flex items-center justify-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-2 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2a10 10 0 100 20 10 10 0 000-20zM2 12h20M12 2c2 3 2 9 0 12-2-3-2-9 0-12z" />
              </svg>
              Summon My Journey
            </Button>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-8"
        >
          <TypingText text="Initializing dream module for Tokyo..." />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="mt-14 w-full"
        >
          <TrustedBy />
        </motion.div>
      </div>

      {/* Subtle background pulse behind the scene */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[600px] h-[600px] bg-cyan-500 opacity-[0.04] rounded-full blur-3xl z-0 animate-pulse-slow" />
    
    </section>
  );
}
