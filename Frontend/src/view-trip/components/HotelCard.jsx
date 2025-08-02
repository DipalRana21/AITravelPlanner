import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const HotelCard = ({hotel}) => {

     const [photoUrl,setPhotoUrl] = useState();
    
        useEffect(() => {
            hotel && getPlacePhoto(hotel?.HotelName);
        }, [hotel])
    
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
    <Link to={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${hotel.HotelName}, ${hotel.HotelAddress}`)}` } target="_blank">


                <div className='hover:scale-105 transition-all cursor-pointer'>
                    <img className="rounded-xl h-[180px] w-full object-cover" src={ photoUrl ? photoUrl : "https://plus.unsplash.com/premium_photo-1663076518116-0f0637626edf?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"} alt="" />

                    <div className='my-2 flex flex-col gap-2'>
                        <h2 className='font-medium '>{hotel?.HotelName}</h2>
                        <h2 className='text-xs text-gray-500'>📍{hotel?.HotelAddress}</h2>
                        <h2 className='text-sm font-bold'>💸 {hotel?.Price} </h2>
                        <h2 className='text-sm '>⭐{hotel?.Rating}</h2>
                    </div>
                </div>
                </Link>
  )
}

export default HotelCard