// import axios from 'axios';
// import React, { useEffect, useState } from 'react';
// import { motion, useScroll, useTransform } from 'framer-motion';
// import { Link } from 'react-router-dom';

// const HotelCard = ({ hotel, isSelected, scrollSpeed }) => {
//   const [photoUrl, setPhotoUrl] = useState();
//   const [rotate, setRotate] = useState({ x: 0, y: 0 });

//   useEffect(() => {
//     hotel && getPlacePhoto(hotel?.HotelName);
//   }, [hotel]);

//   const getPlacePhoto = async (textQuery) => {
//     try {
//       const res = await axios.post('http://localhost:5000/api/places/search-place', { textQuery });
//       const place = res.data.places?.[0];
//       if (!place?.photos?.length) return;
//       const photoRef = place.photos[3]?.name || place.photos[0]?.name;
//       setPhotoUrl(`http://localhost:5000/api/places/photo?name=${photoRef}`);
//     } catch (error) {
//       console.error('Backend place fetch failed:', error);
//     }
//   };

//   const { scrollY } = useScroll();
//   const y = useTransform(scrollY, [0, 500], [0, scrollSpeed * 50]);

//   const handleMouseMove = (e) => {
//     const rect = e.currentTarget.getBoundingClientRect();
//     const x = ((e.clientX - rect.left) / rect.width - 0.5) * 15;
//     const y = ((e.clientY - rect.top) / rect.height - 0.5) * -15;
//     setRotate({ x, y });
//   };

//   const handleMouseLeave = () => setRotate({ x: 0, y: 0 });

//   return (
//     <Link
//       to={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
//         `${hotel.HotelName}, ${hotel.HotelAddress}`
//       )}`}
//       target="_blank"
//     >
//       <motion.div
//         style={{ y }}
//         animate={{
//           rotateX: rotate.y,
//           rotateY: rotate.x,
//           scale: isSelected ? 1.05 : 1,
//         }}
//         transition={{ type: 'spring', stiffness: 150, damping: 15 }}
//         onMouseMove={handleMouseMove}
//         onMouseLeave={handleMouseLeave}
//         className={`relative rounded-2xl overflow-hidden border border-white/10 backdrop-blur-md bg-white/5 shadow-lg hover:shadow-pink-500/20 transition-all duration-500 ${
//           isSelected ? 'ring-2 ring-pink-400' : ''
//         }`}
//       >
//         {/* Image */}
//         <div className="relative">
//           <img
//             className="rounded-t-2xl h-[180px] w-full object-cover transition-transform duration-700 hover:scale-110"
//             src={
//               photoUrl ||
//               'https://plus.unsplash.com/premium_photo-1663076518116-0f0637626edf?q=80&w=1932&auto=format&fit=crop'
//             }
//             alt=""
//           />
//           {/* Glow overlay */}
//           <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
//         </div>

//         {/* Details */}
//         <div className="p-3 flex flex-col gap-2">
//           <h2 className="font-semibold text-cyan-400">{hotel?.HotelName}</h2>
//           <p className="text-xs text-gray-400">📍 {hotel?.HotelAddress}</p>
//           <p className="text-sm font-bold text-pink-400">💸 {hotel?.Price}</p>
//           <p className="text-sm text-yellow-400">⭐ {hotel?.Rating}</p>
//         </div>
//       </motion.div>
//     </Link>
//   );
// };

// export default HotelCard;


// imp

// import React, { useState } from 'react';
// import { motion, useScroll, useTransform } from 'framer-motion';
// import { Link } from 'react-router-dom';

// const HotelCard = ({ hotel, isSelected, scrollSpeed, photoUrl }) => { // <-- Receives photoUrl prop
//   // REMOVED: useState for photoUrl
//   // REMOVED: useEffect for fetching photos
//   // REMOVED: getPlacePhoto function

//   const [rotate, setRotate] = useState({ x: 0, y: 0 });
//   const { scrollY } = useScroll();
//   const y = useTransform(scrollY, [0, 500], [0, scrollSpeed * 50]);

//   const handleMouseMove = (e) => {
//     const rect = e.currentTarget.getBoundingClientRect();
//     const x = ((e.clientX - rect.left) / rect.width - 0.5) * 15;
//     const y = ((e.clientY - rect.top) / rect.height - 0.5) * -15;
//     setRotate({ x, y });
//   };

//   const handleMouseLeave = () => setRotate({ x: 0, y: 0 });

//   return (
//     <Link
//       to={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
//         `${hotel.HotelName}, ${hotel.HotelAddress}`
//       )}`}
//       target="_blank"
//       rel="noopener noreferrer"
//     >
//       <motion.div
//         style={{ y }}
//         animate={{
//           rotateX: rotate.y,
//           rotateY: rotate.x,
//           scale: isSelected ? 1.05 : 1,
//         }}
//         transition={{ type: 'spring', stiffness: 150, damping: 15 }}
//         onMouseMove={handleMouseMove}
//         onMouseLeave={handleMouseLeave}
//         className={`relative rounded-2xl overflow-hidden border border-white/10 backdrop-blur-md bg-white/5 shadow-lg hover:shadow-pink-500/20 transition-all duration-500 ${
//           isSelected ? 'ring-2 ring-pink-400' : ''
//         }`}
//       >
//         {/* Image */}
//         <div className="relative">
//           <img
//             className="rounded-t-2xl h-[180px] w-full object-cover transition-transform duration-700 hover:scale-110"
//             src={ // <-- Use the photoUrl prop directly
//               photoUrl ||
//               'https://plus.unsplash.com/premium_photo-1663076518116-0f0637626edf?q=80&w=1932&auto=format&fit=crop'
//             }
//             alt={hotel.HotelName}
//           />
//           <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
//         </div>

//         {/* Details (unchanged) */}
//         <div className="p-3 flex flex-col gap-2">
//           <h2 className="font-semibold text-cyan-400">{hotel?.HotelName}</h2>
//           <p className="text-xs text-gray-400">📍 {hotel?.HotelAddress}</p>
//           <p className="text-sm font-bold text-pink-400">💸 {hotel?.Price}</p>
//           <p className="text-sm text-yellow-400">⭐ {hotel?.Rating}</p>
//         </div>
//       </motion.div>
//     </Link>
//   );
// };

// export default HotelCard;


import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const HotelCard = ({ hotel, isSelected, photoUrl }) => {
  return (
    <Link
      to={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        `${hotel.HotelName}, ${hotel.HotelAddress}`
      )}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      <motion.div
        transition={{ type: 'spring', stiffness: 150, damping: 15 }}
        className={`relative rounded-2xl overflow-hidden border border-white/10 backdrop-blur-md bg-white/5 shadow-lg 
                    hover:border-pink-400 hover:shadow-pink-500/30 hover:scale-105 
                    transition-all duration-300 cursor-pointer ${
                      isSelected ? '' : ''
                    }`}
      >
        {/* Image */}
        <div className="relative">
          <img
            className="rounded-t-2xl h-[180px] w-full object-cover"
            src={
              photoUrl ||
              'https://plus.unsplash.com/premium_photo-1663076518116-0f0637626edf?q=80&w=1932&auto-format&fit=crop'
            }
            alt={hotel.HotelName}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
        </div>

        {/* Details */}
        <div className="p-3 flex flex-col gap-2">
          <h2 className="font-semibold text-cyan-400">{hotel?.HotelName}</h2>
          <p className="text-xs text-gray-400">📍 {hotel?.HotelAddress}</p>
          <p className="text-sm font-bold text-pink-400">💸 {hotel?.Price}</p>
          <p className="text-sm text-yellow-400">⭐ {hotel?.Rating}</p>
        </div>
      </motion.div>
    </Link>
  );
};

export default HotelCard;