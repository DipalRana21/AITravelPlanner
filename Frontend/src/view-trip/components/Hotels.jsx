import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import HotelCard from "./HotelCard";

const Hotels = ({ trip }) => {
  const cardsRef = useRef([]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowRight") {
        setSelectedIndex((prev) => (prev + 1) % trip?.tripData?.hotels?.length);
      }
      if (e.key === "ArrowLeft") {
        setSelectedIndex(
          (prev) =>
            (prev - 1 + trip?.tripData?.hotels?.length) %
            trip?.tripData?.hotels?.length
        );
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [trip]);

  useEffect(() => {
    if (cardsRef.current[selectedIndex]) {
      cardsRef.current[selectedIndex].scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    }
  }, [selectedIndex]);

  return (
    <div className="relative">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="font-bold text-2xl mt-5 mb-6 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-pink-400 to-purple-400"
      >
        ✨ Hotel Recommendations
      </motion.h2>

      <motion.div
        initial="hidden"
        animate="show"
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.15 } },
        }}
        className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-6 no-scrollbar"
      >
        {trip?.tripData?.hotels?.map((hotel, index) => (
          <motion.div
            variants={{
              hidden: { opacity: 0, scale: 0.9, y: 30 },
              show: { opacity: 1, scale: 1, y: 0 },
            }}
            ref={(el) => (cardsRef.current[index] = el)}
            key={index}
            className="snap-center flex-shrink-0 w-[280px]"
          >
            <HotelCard
              hotel={hotel}
              isSelected={selectedIndex === index}
              scrollSpeed={0.05 * index}
            />
          </motion.div>
        ))}
      </motion.div>

      {/* Navigation Arrows */}
      <motion.div
        whileHover={{ scale: 1.15 }}
        className="absolute top-1/2 left-0 -translate-y-1/2 px-3 py-2 text-2xl text-white bg-gradient-to-b from-cyan-500/70 to-pink-500/70 backdrop-blur-md shadow-lg rounded-full cursor-pointer"
        onClick={() =>
          setSelectedIndex(
            (prev) =>
              (prev - 1 + trip?.tripData?.hotels?.length) %
              trip?.tripData?.hotels?.length
          )
        }
      >
        ⬅
      </motion.div>
      <motion.div
        whileHover={{ scale: 1.15 }}
        className="absolute top-1/2 right-0 -translate-y-1/2 px-3 py-2 text-2xl text-white bg-gradient-to-b from-cyan-500/70 to-pink-500/70 backdrop-blur-md shadow-lg rounded-full cursor-pointer"
        onClick={() =>
          setSelectedIndex((prev) => (prev + 1) % trip?.tripData?.hotels?.length)
        }
      >
        ➡
      </motion.div>
    </div>
  );
};

export default Hotels;
