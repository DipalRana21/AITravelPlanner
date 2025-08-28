// import React from 'react'
// import PlaceCard from './PlaceCard'

// const PlacesToVisit = ({ trip }) => {
//     return (
//         <div className='mt-5'>

//             <h2 className='font-bold text-lg'>Places to visit</h2>

//             <div>
//                 {trip?.tripData?.itinerary.map((item, index) => (

//                     <div className='mt-5'>
//                         <h2 className='font-medium text-lg '>Day {item.day}</h2>

//                         <div className='grid md:grid-cols-2 gap-5'>
//                             {item.places.map((place, index) => (
//                                 <div >
//                                     <h2 className='font-medium text-sm text-orange-600'>{place.Time}</h2>

//                                     <PlaceCard place={place} />
//                                 </div>
//                             ))}
//                         </div>

//                     </div>
//                 ))}
//             </div>
//         </div>
//     )
// }

// export default PlacesToVisit


import React from 'react';
import PlaceCard from './PlaceCard';

const PlacesToVisit = ({ trip }) => {
  return (
    <div className="mt-5">
      {/* Section Title */}
      <h2 className="font-bold text-2xl text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-neon-pink">
        Places to Visit
      </h2>

      <div>
        {Array.isArray(trip?.tripData?.itinerary) && trip.tripData.itinerary.length > 0 ? (
          trip.tripData.itinerary.map((item, index) => (
            <div
              key={index}
              className="mt-6 p-4 rounded-xl bg-gradient-to-b from-[#0a0a0a] to-dark-bg shadow-lg shadow-black/40 border border-gray-800"
            >
              {/* Day Header */}
              <h2 className="font-semibold text-lg text-neon-green mb-4">
                Day {item.Day}
              </h2>

              {/* Places Grid */}
              <div className="grid md:grid-cols-2 gap-5">
                {Array.isArray(item?.places) && item.places.length > 0 ? (
                  item.places.map((place, placeIndex) => (
                    <div key={placeIndex} className="p-3 rounded-lg bg-[#111827] border border-gray-700 shadow-md hover:shadow-neon-cyan/40 transition-all duration-300">
                      <h2 className="font-medium text-sm text-neon-pink mb-2">
                        {place?.Time || 'Time not specified'}
                      </h2>
                      <PlaceCard place={place} />
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 italic">No places listed for this day.</p>
                )}
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 italic">No itinerary found.</p>
        )}
      </div>
    </div>
  );
};

export default PlacesToVisit;
