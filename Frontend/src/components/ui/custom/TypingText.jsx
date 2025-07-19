import React, { useEffect, useState } from "react";

export default function TypingText({ text = "Planning your trip to Tokyo..." }) {
  const [displayedText, setDisplayedText] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + text.charAt(index));
        setIndex(index + 1);
      }, 60); // typing speed
      return () => clearTimeout(timeout);
    }
  }, [index, text]);

  return (
    <p className="mt-10 text-center text-cyan-300 text-xl font-mono">
      {displayedText}
      <span className="animate-pulse">|</span>
    </p>
  );
}
