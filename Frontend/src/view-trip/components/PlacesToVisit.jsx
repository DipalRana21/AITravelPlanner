// import React from "react";
// import PlaceCard from "./PlaceCard";

// const PlacesToVisit = ({ trip }) => {
//   return (
//     <div className="mt-5">
//       {/* Section Title */}
//       <h2 className="font-bold text-2xl mb-4 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-pink-400 to-purple-400">
//         ✨ Places to Visit
//       </h2>

//       <div>
//         {Array.isArray(trip?.tripData?.itinerary) &&
//         trip.tripData.itinerary.length > 0 ? (
//           trip.tripData.itinerary.map((item, index) => {
//             // Flexible handling of "Day" field
//             const dayNumber = item?.Day || item?.day || index + 1;

//             return (
//               <div
//                 key={index}
//                 className="mt-6 p-5 rounded-xl bg-gradient-to-b from-[#0a0a0a] to-gray-900 shadow-lg shadow-black/40 border border-gray-800"
//               >
//                 {/* Day Header */}
//                 <h2 className="font-semibold text-lg text-green-400 mb-4">
//                   Day {dayNumber}
//                 </h2>

//                 {/* Places / Activities */}
//                 <div className="grid md:grid-cols-2 gap-5">
//                   {Array.isArray(item?.places || item?.activities) &&
//                   (item.places?.length > 0 || item.activities?.length > 0) ? (
//                     (item.places || item.activities).map((place, i) => (
//                       <div
//                         key={i}
//                         className="p-3 rounded-lg bg-[#111827] border border-gray-700 shadow-md hover:shadow-cyan-400/30 transition-all duration-300"
//                       >
//                         <h2 className="font-medium text-sm text-pink-400 mb-2">
//                           {place?.Time || "⏰ Time not specified"}
//                         </h2>
//                         <PlaceCard place={place} />
//                       </div>
//                     ))
//                   ) : (
//                     <p className="text-gray-500 italic">
//                       No places listed for this day.
//                     </p>
//                   )}
//                 </div>
//               </div>
//             );
//           })
//         ) : (
//           <p className="text-gray-500 italic">No itinerary found.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default PlacesToVisit;



// src/components/PlacesToVisit.jsx
//imp

import React, { useState, useEffect } from "react";
import axios from 'axios';
import PlaceCard from "./PlaceCard";

const PlacesToVisit = ({ trip }) => {
  const [placePhotos, setPlacePhotos] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  // --- START OF NEW DATA FETCHING LOGIC ---
  useEffect(() => {
    if (trip?.tripData?.itinerary) {
      fetchAllPlacePhotos(trip.tripData.itinerary);
    }
  }, [trip]);

  const fetchAllPlacePhotos = async (itinerary) => {
    setIsLoading(true);

    // Flatten the itinerary to get a single list of all places
    const allPlaces = itinerary.flatMap(day => day.places || day.activities || []);

    const getPhotosForPlace = async (place) => {
      try {
        const res = await axios.post('http://localhost:5000/api/places/search-place', {
          textQuery: place.PlaceName,
        });
        const foundPlace = res.data.places?.[0];
        if (!foundPlace?.photos?.length) return []; // Return empty array if no photos
        return foundPlace.photos.map(p => `http://localhost:5000/api/places/photo?name=${p.name}`);
      } catch (error) {
        console.error(`Failed to fetch photos for ${place.PlaceName}:`, error);
        return [];
      }
    };

    const photoPromises = allPlaces.map(place => getPhotosForPlace(place));
    const resolvedPhotoArrays = await Promise.all(photoPromises);

    const photosMap = allPlaces.reduce((acc, place, index) => {
      acc[place.PlaceName] = resolvedPhotoArrays[index];
      return acc;
    }, {});

    setPlacePhotos(photosMap);
    setIsLoading(false);
  };
  // --- END OF NEW DATA FETCHING LOGIC ---

  const itinerary = trip?.tripData?.itinerary;

  if (isLoading) {
    // --- Skeleton Loader ---
    return (
      <div className="mt-5">
        <h2 className="font-bold text-2xl mb-4 h-8 w-48 bg-slate-800 rounded-md animate-pulse"></h2>
        <div className="mt-6 p-5 rounded-xl bg-gradient-to-b from-[#0a0a0a] to-gray-900">
          <h2 className="font-semibold text-lg h-6 w-24 bg-slate-800 rounded-md animate-pulse mb-4"></h2>
          <div className="grid md:grid-cols-2 gap-5">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="h-[220px] bg-[#111827] border border-gray-700 rounded-lg animate-pulse"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-5">
      <h2 className="font-bold text-2xl mb-4 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-pink-400 to-purple-400">
        ✨ Places to Visit
      </h2>
      <div>
        {itinerary?.length > 0 ? (
          itinerary.map((item, index) => {
            const dayNumber = item?.Day || item?.day || index + 1;
            const activities = item.places || item.activities || [];
            return (
              <div key={index} className="mt-6 p-5 rounded-xl bg-gradient-to-b from-[#0a0a0a] to-gray-900 shadow-lg shadow-black/40 border border-gray-800">
                <h2 className="font-semibold text-lg text-green-400 mb-4">Day {dayNumber}</h2>
                <div className="grid md:grid-cols-2 gap-5">
                  {activities.length > 0 ? (
                    activities.map((place, i) => (
                      <div key={i} className="p-3 rounded-lg bg-[#111827] border border-gray-700 shadow-md">
                        <h2 className="font-medium text-sm text-pink-400 mb-2">
                          {place?.Time || "⏰ Time not specified"}
                        </h2>
                        <PlaceCard 
                          place={place} 
                          photos={placePhotos[place.PlaceName] || []} // <-- Pass photos as a prop
                        />
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 italic">No places listed for this day.</p>
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-gray-500 italic">No itinerary found.</p>
        )}
      </div>
    </div>
  );
};

export default PlacesToVisit;
