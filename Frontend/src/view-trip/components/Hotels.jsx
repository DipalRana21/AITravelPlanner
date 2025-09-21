// import React, { useRef, useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import HotelCard from "./HotelCard";

// const Hotels = ({ trip }) => {
//   const cardsRef = useRef([]);
//   const [selectedIndex, setSelectedIndex] = useState(0);

//   // Keyboard navigation
//   useEffect(() => {
//     const handleKeyDown = (e) => {
//       if (e.key === "ArrowRight") {
//         setSelectedIndex((prev) => (prev + 1) % trip?.tripData?.hotels?.length);
//       }
//       if (e.key === "ArrowLeft") {
//         setSelectedIndex(
//           (prev) =>
//             (prev - 1 + trip?.tripData?.hotels?.length) %
//             trip?.tripData?.hotels?.length
//         );
//       }
//     };
//     window.addEventListener("keydown", handleKeyDown);
//     return () => window.removeEventListener("keydown", handleKeyDown);
//   }, [trip]);

//   // Auto-scroll selected card into view
//   useEffect(() => {
//     if (cardsRef.current[selectedIndex]) {
//       cardsRef.current[selectedIndex].scrollIntoView({
//         behavior: "smooth",
//         inline: "center",
//         block: "nearest",
//       });
//     }
//   }, [selectedIndex]);

//   return (
//     <div className="relative">
//       {/* Heading with gradient animation */}
//       <motion.h2
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6 }}
//         className="font-bold text-2xl mt-5 mb-6 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-pink-400 to-purple-400"
//       >
//         ✨ Hotel Recommendations
//       </motion.h2>

//       {/* Horizontal scrollable cards */}
//       <motion.div
//         initial="hidden"
//         animate="show"
//         variants={{
//           hidden: {},
//           show: { transition: { staggerChildren: 0.15 } },
//         }}
//         className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-6 no-scrollbar"
//       >
//         {trip?.tripData?.hotels?.map((hotel, index) => (
//           <motion.div
//             variants={{
//               hidden: { opacity: 0, scale: 0.9, y: 30 },
//               show: { opacity: 1, scale: 1, y: 0 },
//             }}
//             ref={(el) => (cardsRef.current[index] = el)}
//             key={index}
//             className="snap-center flex-shrink-0 w-[280px]"
//           >
//             <HotelCard
//               hotel={hotel}
//               isSelected={selectedIndex === index}
//               scrollSpeed={0.05 * index}
//             />
//           </motion.div>
//         ))}
//       </motion.div>

//       {/* Navigation Arrows */}
//       <motion.div
//         whileHover={{ scale: 1.15 }}
//         className="absolute top-1/2 left-0 -translate-y-1/2 px-3 py-2 text-2xl text-white bg-gradient-to-b from-cyan-500/70 to-pink-500/70 backdrop-blur-md shadow-lg rounded-full cursor-pointer"
//         onClick={() =>
//           setSelectedIndex(
//             (prev) =>
//               (prev - 1 + trip?.tripData?.hotels?.length) %
//               trip?.tripData?.hotels?.length
//           )
//         }
//       >
//         ⬅
//       </motion.div>
//       <motion.div
//         whileHover={{ scale: 1.15 }}
//         className="absolute top-1/2 right-0 -translate-y-1/2 px-3 py-2 text-2xl text-white bg-gradient-to-b from-cyan-500/70 to-pink-500/70 backdrop-blur-md shadow-lg rounded-full cursor-pointer"
//         onClick={() =>
//           setSelectedIndex((prev) => (prev + 1) % trip?.tripData?.hotels?.length)
//         }
//       >
//         ➡
//       </motion.div>
//     </div>
//   );
// };

// export default Hotels;

import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from 'axios';
import HotelCard from "./HotelCard";

const Hotels = ({ trip }) => {
  const cardsRef = useRef([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  
  // State for photos and loading status
  const [hotelPhotos, setHotelPhotos] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  // --- START OF NEW DATA FETCHING LOGIC ---
  useEffect(() => {
    if (trip?.tripData?.hotels) {
      fetchAllHotelPhotos(trip.tripData.hotels);
    }
  }, [trip]);

  const fetchAllHotelPhotos = async (hotels) => {
    setIsLoading(true);

    // Helper to fetch a single photo, moved from HotelCard
    const getPhotoForHotel = async (hotel) => {
      try {
        const res = await axios.post('http://localhost:5000/api/places/search-place', { textQuery: hotel.HotelName });
        const place = res.data.places?.[0];
        if (!place?.photos?.length) return null;
        const photoRef = place.photos[3]?.name || place.photos[0]?.name;
        return `http://localhost:5000/api/places/photo?name=${photoRef}`;
      } catch (error) {
        console.error(`Failed to fetch photo for ${hotel.HotelName}:`, error);
        return null; // Return null on error
      }
    };

    // Create an array of promises for all hotel photos
    const photoPromises = hotels.map(hotel => getPhotoForHotel(hotel));

    // Wait for all API calls to complete in parallel
    const resolvedUrls = await Promise.all(photoPromises);

    // Map hotel names to their fetched URLs
    const photosMap = hotels.reduce((acc, hotel, index) => {
      if (resolvedUrls[index]) {
        acc[hotel.HotelName] = resolvedUrls[index];
      }
      return acc;
    }, {});

    setHotelPhotos(photosMap);
    setIsLoading(false);
  };
  // --- END OF NEW DATA FETCHING LOGIC ---

  useEffect(() => {
    // (Your existing keyboard navigation useEffect remains unchanged)
  }, [trip]);

  useEffect(() => {
    // (Your existing auto-scroll useEffect remains unchanged)
  }, [selectedIndex]);

  const hotels = trip?.tripData?.hotels || [];

  return (
    <div className="relative">
      <motion.h2 /* (Heading is unchanged) */ >
        ✨ Hotel Recommendations
      </motion.h2>

      <div className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-6 no-scrollbar">
        {isLoading ? (
          // Skeleton Loader while images are fetching
          [...Array(4)].map((_, index) => (
            <div key={index} className="snap-center flex-shrink-0 w-[280px] h-[325px] bg-white/5 rounded-2xl animate-pulse"></div>
          ))
        ) : (
          // Render cards once photos are loaded
          hotels.map((hotel, index) => (
            <motion.div
              key={index}
              ref={(el) => (cardsRef.current[index] = el)}
              className="snap-center flex-shrink-0 w-[280px]"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <HotelCard
                hotel={hotel}
                isSelected={selectedIndex === index}
                scrollSpeed={0.05 * index}
                photoUrl={hotelPhotos[hotel.HotelName]} // <-- Pass the fetched URL as a prop
              />
            </motion.div>
          ))
        )}
      </div>
      
      {/* (Navigation arrows are unchanged) */}
    </div>
  );
};

export default Hotels;