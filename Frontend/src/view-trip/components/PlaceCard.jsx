// import { Button } from '@/components/ui/custom/button';
// import axios from 'axios';
// import React, { useEffect, useState } from 'react';
// import { FaMapLocationDot } from "react-icons/fa6";
// import { Link } from 'react-router-dom';

// const PlaceCard = ({ place }) => {
//   const [photos, setPhotos] = useState([]);
//   const [currentIndex, setCurrentIndex] = useState(0);

//   useEffect(() => {
//     place && getPlacePhotos(place.PlaceName);
//   }, [place]);

//   const getPlacePhotos = async (textQuery) => {
//     try {
//       const res = await axios.post('http://localhost:5000/api/places/search-place', {
//         textQuery,
//       });

//       const foundPlace = res.data.places?.[0];
//       if (!foundPlace?.photos?.length) {
//         console.warn('No photos found for place.');
//         return;
//       }

//       const urls = foundPlace.photos.map(
//         (p) => `http://localhost:5000/api/places/photo?name=${p.name}`
//       );

//       setPhotos(urls);
//       console.log('✅ Generated Photo URLs:', urls);
//     } catch (error) {
//       console.error('Backend place fetch failed:', error);
//     }
//   };

//   // Auto carousel effect
//   useEffect(() => {
//     if (photos.length > 1) {
//       const interval = setInterval(() => {
//         setCurrentIndex((prev) =>
//           prev === photos.length - 1 ? 0 : prev + 1
//         );
//       }, 3000);
//       return () => clearInterval(interval);
//     }
//   }, [photos]);

//   return (
//     <Link
//       to={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${place.PlaceName}`)}`}
//       target="_blank"
//     >
//       <div className="flex gap-5 rounded-xl p-4 mt-3 bg-[#111827] border border-gray-700 hover:border-neon-cyan hover:shadow-neon-cyan/40 transition-all hover:scale-[1.02] cursor-pointer">
        
//         {/* Carousel Container */}
//         <div className="relative w-[200px] h-[200px] rounded-xl overflow-hidden border border-gray-800">
//           <div
//             className="flex transition-transform duration-700 ease-in-out h-full w-full"
//             style={{ transform: `translateX(-${currentIndex * 100}%)` }}
//           >
//             {(photos.length ? photos : [
//               "https://plus.unsplash.com/premium_photo-1663076518116-0f0637626edf?q=80&w=1932&auto=format&fit=crop"
//             ]).map((img, idx) => (
//               <img
//                 key={idx}
//                 src={img}
//                 alt=""
//                 className="w-full h-full object-cover flex-shrink-0"
//               />
//             ))}
//           </div>

//           {/* Dots */}
//           {photos.length > 1 && (
//             <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
//               {photos.map((_, idx) => (
//                 <button
//                   key={idx}
//                   onClick={(e) => {
//                     e.preventDefault();
//                     setCurrentIndex(idx);
//                   }}
//                   className={`w-2 h-2 rounded-full ${
//                     idx === currentIndex ? 'bg-white' : 'bg-gray-400'
//                   }`}
//                 />
//               ))}
//             </div>
//           )}
//         </div>

//         {/* Text Content */}
//         <div className="flex flex-col justify-between flex-1">
//           <div>
//             <h2 className="font-bold text-xl text-neon-cyan">{place.PlaceName}</h2>
//             <p className="text-base text-gray-400">{place.PlaceDetails}</p>
//             <h2 className="mt-3 text-neon-pink">🕚 {place.TimetoTravel}</h2>
//           </div>
//           <div className="mt-3 text-neon-green flex items-center gap-1">
//             <FaMapLocationDot />
//             <span className="text-sm">View on Map</span>
//           </div>
//         </div>
//       </div>
//     </Link>
//   );
// };

// export default PlaceCard;


// src/components/PlaceCard.jsx
//imp

import React, { useEffect, useState } from 'react';
import { FaMapLocationDot } from "react-icons/fa6";
import { Link } from 'react-router-dom';

const PlaceCard = ({ place, photos }) => { // <-- Receives photos prop
  // REMOVED: useState for photos
  // REMOVED: useEffect for fetching photos
  // REMOVED: getPlacePhotos function

  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto carousel effect
  useEffect(() => {
    if (photos.length > 1) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) =>
          prev === photos.length - 1 ? 0 : prev + 1
        );
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [photos]);

  return (
    <Link
      to={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place.PlaceName)}`}
      target="_blank"
      rel="noopener noreferrer" // Good practice for security
    >
      <div className="flex gap-5 rounded-xl p-4 mt-3 bg-[#111827] border border-gray-700 hover:border-neon-cyan hover:shadow-neon-cyan/40 transition-all hover:scale-[1.02] cursor-pointer">
        
        {/* Carousel Container */}
        <div className="relative w-[200px] h-[200px] rounded-xl overflow-hidden border border-gray-800">
          <div
            className="flex transition-transform duration-700 ease-in-out h-full w-full"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {(photos.length ? photos : [
              "https://plus.unsplash.com/premium_photo-1663076518116-0f0637626edf?q=80&w=1932&auto=format&fit=crop"
            ]).map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={place.PlaceName}
                className="w-full h-full object-cover flex-shrink-0"
              />
            ))}
          </div>

          {/* Dots */}
          {photos.length > 1 && (
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
              {photos.map((_, idx) => (
                <button
                  key={idx}
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentIndex(idx);
                  }}
                  className={`w-2 h-2 rounded-full ${
                    idx === currentIndex ? 'bg-white' : 'bg-gray-400'
                  }`}
                  aria-label={`Go to image ${idx + 1}`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Text Content (Unchanged) */}
        <div className="flex flex-col justify-between flex-1">
          <div>
            <h2 className="font-bold text-xl text-neon-cyan">{place.PlaceName}</h2>
            <p className="text-base text-gray-400">{place.PlaceDetails}</p>
            <h2 className="mt-3 text-neon-pink">🕚 {place.TimetoTravel}</h2>
          </div>
          <div className="mt-3 text-neon-green flex items-center gap-1">
            <FaMapLocationDot />
            <span className="text-sm">View on Map</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PlaceCard;