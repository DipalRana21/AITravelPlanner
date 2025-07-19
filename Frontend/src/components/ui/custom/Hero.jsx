import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "./button.jsx";
import TypingText from "./TypingText.jsx";
import TrustedBy from "./TrustedBy.jsx";


export default function Hero() {
  return (
    <section className="bg-gradient-to-b from-[#0e1421] to-[#1c263b] w-full py-24 px-6 text-white min-h-screen">
      <div className="max-w-5xl mx-auto flex flex-col items-center text-center">
        
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight tracking-tight">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#FF6B6B] to-[#FFD93D] drop-shadow-sm">
            What if AI Could Plan Your Dream Trip? 
          </span>
        </h1>

        <p className="mt-4 text-lg md:text-xl text-gray-300 max-w-2xl">
          Turn your wanderlust into a personalized journey — instantly.
        </p>

        <p className="mt-4 text-xl text-gray-400 max-w-2xl">
          Just tell us where you're going — we'll handle the rest. Smart. Effortless. Yours.
        </p>

        <Link to="/create-trip">
          <Button
            variant="default"
            size="lg"
            className="mt-8 animate-pulse hover:scale-105 transition-transform duration-300 bg-gradient-to-r from-cyan-400 to-blue-500 text-white shadow-xl"
          >
            🌍 Plan My Trip Now
          </Button>
        </Link>
        <TypingText text="Planning your trip to Tokyo..." />
        
        <TrustedBy/>
      </div>
      

    </section>
  );
}
