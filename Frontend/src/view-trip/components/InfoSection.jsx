import { Button } from '@/components/ui/custom/button'
import React, { useEffect, useState } from 'react'
import { IoIosSend } from "react-icons/io";
import axios from 'axios';

const PHOTO_REF_URL = `https://places.googleapis.com/v1/{NAME}/media?maxHeightPx=600&maxWidthPx=600&key=${import.meta.env.VITE_GOOGLE_PLACE_API_KEY}`

const InfoSection = ({ trip }) => {
  const [photoUrl, setPhotoUrl] = useState();

  useEffect(() => {
    trip && getPlacePhoto(trip.userChoice.location?.label);
  }, [trip]);

  const getPlacePhoto = async (textQuery) => {
    try {
      const res = await axios.post('http://localhost:5000/api/places/search-place', {
        textQuery,
      });

      const place = res.data.places?.[0];

      if (!place || !place.photos || place.photos.length === 0) {
        console.warn('No photos found for place.');
        return;
      }

      const photoRef = place.photos[3].name;
      const photoUrl = `http://localhost:5000/api/places/photo?name=${photoRef}`;
      setPhotoUrl(photoUrl);

      console.log('✅ Generated Photo URL:', photoUrl);
    } catch (error) {
      console.error('Backend place fetch failed:', error);
    }
  };

  return (
    <div className="bg-[#111827] rounded-xl overflow-hidden shadow-lg">
      {/* Image */}
      <img
        src={photoUrl ? photoUrl : "https://plus.unsplash.com/premium_photo-1663076518116-0f0637626edf?q=80&w=1932&auto=format&fit=crop"}
        alt=""
        className="h-[340px] w-full object-cover"
      />

      {/* Content */}
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

        {/* Action button (no glow) */}
        <Button className="bg-gradient-to-r from-neon-cyan to-neon-pink text-white">
          <IoIosSend />
        </Button>
      </div>
    </div>
  );
};

export default InfoSection;
