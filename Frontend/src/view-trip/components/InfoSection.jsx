// import { Button } from '@/components/ui/custom/button'
// import React, { useEffect, useState } from 'react'
// import { IoIosSend } from "react-icons/io";
// import axios from 'axios';

// const PHOTO_REF_URL = `https://places.googleapis.com/v1/{NAME}/media?maxHeightPx=600&maxWidthPx=600&key=${import.meta.env.VITE_GOOGLE_PLACE_API_KEY}`

// const InfoSection = ({ trip }) => {
//   const [photoUrl, setPhotoUrl] = useState();

//   useEffect(() => {
//     trip && getPlacePhoto(trip.userChoice.location?.label);
//   }, [trip]);

//   const getPlacePhoto = async (textQuery) => {
//     try {
//       const res = await axios.post('http://localhost:5000/api/places/search-place', {
//         textQuery,
//       });

//       const place = res.data.places?.[0];

//       if (!place || !place.photos || place.photos.length === 0) {
//         console.warn('No photos found for place.');
//         return;
//       }

//       const photoRef = place.photos[3].name;
//       const photoUrl = `http://localhost:5000/api/places/photo?name=${photoRef}`;
//       setPhotoUrl(photoUrl);

//       console.log('✅ Generated Photo URL:', photoUrl);
//     } catch (error) {
//       console.error('Backend place fetch failed:', error);
//     }
//   };

//   return (
//     <div className="bg-[#111827] rounded-xl overflow-hidden shadow-lg">
//       {/* Image */}
//       <img
//         src={photoUrl ? photoUrl : "https://plus.unsplash.com/premium_photo-1663076518116-0f0637626edf?q=80&w=1932&auto=format&fit=crop"}
//         alt=""
//         className="h-[340px] w-full object-cover"
//       />

//       {/* Content */}
//       <div className="flex justify-between items-center px-4 py-5">
//         <div className="flex flex-col gap-3">
//           {trip && trip.userChoice && (
//             <>
//               <h2 className="font-bold text-2xl text-neon-cyan">{trip.userChoice.location?.label}</h2>
//               <div className="flex flex-wrap gap-3">
//                 <span className="px-3 py-1 text-sm rounded-full border border-neon-cyan text-neon-cyan bg-black/40">
//                   📅 {trip.userChoice.noOfDays} Days
//                 </span>
//                 <span className="px-3 py-1 text-sm rounded-full border border-neon-pink text-neon-pink bg-black/40">
//                   💸 {trip.userChoice.budget}
//                 </span>
//                 <span className="px-3 py-1 text-sm rounded-full border border-yellow-400 text-yellow-400 bg-black/40">
//                   🥂 No. Of Travelers: {trip.userChoice.traveler}
//                 </span>
//               </div>
//             </>
//           )}
//         </div>

//         {/* Action button (no glow) */}
//         <Button className="bg-gradient-to-r from-neon-cyan to-neon-pink text-white">
//           <IoIosSend />
//         </Button>
//       </div>
//     </div>
//   );
// };

// export default InfoSection;


// src/components/InfoSection.jsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { IoIosSend } from "react-icons/io";
import { Button } from '@/components/ui/custom/button';

const InfoSection = ({ trip }) => {
  // State to hold all photo URLs and the current index for the carousel
  const [photoUrls, setPhotoUrls] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (trip?.userChoice?.location?.label) {
      getPlacePhotos(trip.userChoice.location.label);
    }
  }, [trip]);

  // Fetches ALL photos for the destination
  const getPlacePhotos = async (textQuery) => {
    try {
      const res = await axios.post('http://localhost:5000/api/places/search-place', {
        textQuery,
      });

      const place = res.data.places?.[0];
      if (!place?.photos?.length) {
        console.warn('No photos found for the main destination.');
        return;
      }
      
      // Create an array of all photo URLs
      const urls = place.photos.map(
        (p) => `http://localhost:5000/api/places/photo?name=${p.name}`
      );
      setPhotoUrls(urls);

    } catch (error) {
      console.error('Backend place fetch failed for InfoSection:', error);
    }
  };

  // Auto-carousel timer effect, adapted from your PlaceCard.jsx
  useEffect(() => {
    if (photoUrls.length > 1) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) =>
          prevIndex === photoUrls.length - 1 ? 0 : prevIndex + 1
        );
      }, 4000); // A slightly slower 4-second interval for the main image
      return () => clearInterval(interval);
    }
  }, [photoUrls]);

  return (
    <div className="bg-[#111827] rounded-xl overflow-hidden shadow-lg">
      {/* --- START OF UPDATED IMAGE SECTION --- */}
      <div className="relative w-full h-[340px] bg-black">
        <div
          className="flex transition-transform duration-700 ease-in-out h-full w-full"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {(photoUrls.length ? photoUrls : ["https://plus.unsplash.com/premium_photo-1663076518116-0f0637626edf?q=80&w=1932&auto=format&fit=crop"])
            .map((imgSrc, index) => (
              <img
                key={index}
                src={imgSrc}
                alt={`${trip?.userChoice?.location?.label || 'Destination'} image ${index + 1}`}
                className="w-full h-full object-cover flex-shrink-0"
              />
            ))}
        </div>

        {/* Dots for carousel navigation */}
        {photoUrls.length > 1 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
            {photoUrls.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  index === currentIndex ? 'bg-white scale-110' : 'bg-white/50'
                }`}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
      {/* --- END OF UPDATED IMAGE SECTION --- */}

      {/* Content (unchanged) */}
      <div className="flex justify-between items-center px-4 py-5">
        <div className="flex flex-col gap-3">
          {trip && trip.userChoice && (
            <>
              <h2 className="font-bold text-2xl text-neon-cyan">{trip.userChoice.location?.label}</h2>
              <div className="flex flex-wrap gap-3">
                <span className="px-3 py-1 text-sm rounded-full border border-neon-cyan text-neon-cyan bg-black/40">
                  📅 {trip.userChoice.noOfDays} Days
                </span>
                <span className="px-3 py-1 text-sm rounded-full border border-neon-pink text-neon-pink bg-black/40">
                  💸 {trip.userChoice.budget}
                </span>
                <span className="px-3 py-1 text-sm rounded-full border border-yellow-400 text-yellow-400 bg-black/40">
                  🥂 No. Of Travelers: {trip.userChoice.traveler}
                </span>
              </div>
            </>
          )}
        </div>
        <Button className="bg-gradient-to-r from-neon-cyan to-neon-pink text-white">
          <IoIosSend />
        </Button>
      </div>
    </div>
  );
};

export default InfoSection;