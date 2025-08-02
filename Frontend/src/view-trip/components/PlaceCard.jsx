import { Button } from '@/components/ui/custom/button'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { FaMapLocationDot } from "react-icons/fa6";
import { Link } from 'react-router-dom';

const PlaceCard = ({place}) => {

    const [photoUrl,setPhotoUrl] = useState();
  
      useEffect(() => {
          place && getPlacePhoto(place.PlaceName);
      }, [place])
  
      const getPlacePhoto = async (textQuery) => {
  
          try {
              const res= await axios.post('http://localhost:5000/api/places/search-place', {
        textQuery,
      });
  
      const place = res.data.places?.[0];
  
       if (!place || !place.photos || place.photos.length === 0) {
        console.warn('No photos found for place.');
        return;
      }
  
      const photoRef= place.photos[3].name
      const photoUrl = `http://localhost:5000/api/places/photo?name=${photoRef}`;
  
      setPhotoUrl(photoUrl);
        console.log('✅ Generated Photo URL:', photoUrl);
  
          } catch (error) {
              console.error('Backend place fetch failed:', error);
     
          }
       
        
      }
  

  return (

    <Link to={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${place.PlaceName}`)}` } target="_blank">
    <div className=' flex gap-5 border rounded-xl p-3 mt-2 hover:scale-105 transition-all hover:shadow-md cursor-pointer '>
           <img className="w-[130px] h-[130px] rounded-xl object-cover" src={ photoUrl ? photoUrl : "https://plus.unsplash.com/premium_photo-1663076518116-0f0637626edf?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"} alt="" />

           <div>
            <h2 className='font-bold text-lg'>{place.PlaceName}</h2>
            <p className='text-sm text-gray-400'>{place.PlaceDetails}</p>
            <h2 className='mt-2'>🕚{place.TimetoTravel}</h2>
          

           </div>
    </div>
    </Link>
  )
}

export default PlaceCard