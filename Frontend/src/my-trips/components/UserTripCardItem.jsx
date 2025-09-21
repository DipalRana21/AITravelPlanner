// import axios from 'axios';
// import React, { useEffect, useState } from 'react'
// import { Link } from 'react-router-dom';

// const UserTripCardItem = ({ trip }) => {


//     const [photoUrl, setPhotoUrl] = useState();

//     useEffect(() => {
//         trip && getPlacePhoto(trip.userChoice.location?.label);
//     }, [trip]);

//     const getPlacePhoto = async (textQuery) => {
//         try {
//             const res = await axios.post('http://localhost:5000/api/places/search-place', {
//                 textQuery,
//             });

//             const place = res.data.places?.[0];

//             if (!place || !place.photos || place.photos.length === 0) {
//                 console.warn('No photos found for place.');
//                 return;
//             }

//             const photoRef = place.photos[3].name;
//             const photoUrl = `http://localhost:5000/api/places/photo?name=${photoRef}`;
//             setPhotoUrl(photoUrl);

//             console.log('✅ Generated Photo URL:', photoUrl);
//         } catch (error) {
//             console.error('Backend place fetch failed:', error);
//         }
//     };

//     return (
//         <Link to={'/view-trip/' + trip?.id} >
//             <div className='hover:scale-105 transition-all'>
//                 <img src={photoUrl ? photoUrl : "https://plus.unsplash.com/premium_photo-1663076518116-0f0637626edf?q=80&w=1932&auto=format&fit=crop"} alt="" className="object-cover rounded-xl h-[220px] " />

//                 <div>
//                     <h2 className='font-bold text-lg'>
//                         {trip?.userChoice?.location?.label}
//                     </h2>

//                     <h2 className='text-sm text-gray-500'>{trip?.userChoice.noOfDays} Days trip with {trip?.userChoice?.budget} Budget</h2>

//                 </div>
//             </div>
//         </Link>
//     )
// }

// export default UserTripCardItem


import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { MapPin, Calendar } from 'lucide-react';

const UserTripCardItem = ({ trip }) => {
  const [photoUrl, setPhotoUrl] = useState('');

  useEffect(() => {
    if (trip?.userChoice?.location?.label) {
      getPlacePhoto(trip.userChoice.location.label);
    }
  }, [trip]);

  const getPlacePhoto = async (textQuery) => {
    try {
      const res = await axios.post('http://localhost:5000/api/places/search-place', { textQuery });
      const place = res.data.places?.[0];
      if (place?.photos?.length) {
        const url = `http://localhost:5000/api/places/photo?name=${place.photos[0].name}`;
        setPhotoUrl(url);
      }
    } catch (error) {
      console.error('Failed to fetch photo for trip card:', error);
    }
  };

  const fallbackImage = "https://images.unsplash.com/photo-1516483638261-f4db93095676?q=80&w=1974&auto=format&fit=crop";

  return (
    <Link to={`/view-trip/${trip.id}`}>
      <div className="group relative h-[280px] w-full bg-slate-900 rounded-xl overflow-hidden shadow-lg border border-gray-800 transition-all duration-300 hover:shadow-cyan-400/40 hover:scale-105">
        <img
          src={photoUrl || fallbackImage}
          alt={trip.userChoice?.location?.label}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
        
        {/* Content */}
        <div className="absolute bottom-0 left-0 p-4 w-full">
          <h3 className="font-bold text-lg text-white truncate">{trip.userChoice?.location?.label}</h3>
          <div className="flex items-center justify-between text-sm text-gray-300 mt-2">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-neon-cyan" />
              <span>{trip.userChoice?.noOfDays} Days</span>
            </div>
            <div className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-neon-pink" />
              <span>{trip.userChoice?.budget}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default UserTripCardItem;