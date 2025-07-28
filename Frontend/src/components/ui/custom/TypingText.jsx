import React, { useEffect, useState } from "react";

const randomChar = () => {
  const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
  return chars[Math.floor(Math.random() * chars.length)];
};

export default function TypingText({ text = "Planning your trip to Tokyo..." }) {
  const [displayedText, setDisplayedText] = useState("");
  const [index, setIndex] = useState(0);
  const [ghostChar, setGhostChar] = useState("");

  useEffect(() => {
    if (index < text.length) {
      const timeout = setTimeout(() => {
        setGhostChar(randomChar());

        setTimeout(() => {
          setDisplayedText((prev) => prev + text.charAt(index));
          setIndex((i) => i + 1);
          setGhostChar(""); // clear ghost character
        }, 50);
      }, 70); // slightly random speed for organic feel

      return () => clearTimeout(timeout);
    }
  }, [index, text]);

  return (
    <p className="mt-10 text-center font-mono text-xl md:text-2xl text-cyan-300 relative select-none">
      <span className="tracking-wider drop-shadow-[0_0_5px_rgba(0,255,255,0.5)]">
        {displayedText}
      </span>
      {ghostChar && (
        <span className="text-cyan-500 animate-ping absolute">
          {ghostChar}
        </span>
      )}
      <span className="text-cyan-400 animate-pulse ml-1">|</span>
    </p>
  );
}
