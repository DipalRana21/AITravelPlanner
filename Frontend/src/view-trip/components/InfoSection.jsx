import { Button } from '@/components/ui/custom/button'
// import { getPlaceDetails } from '@/service/GlobalAPI';
import React, { useEffect, useState } from 'react'
import { IoIosSend } from "react-icons/io";
import axios from 'axios';

const PHOTO_REF_URL=`https://places.googleapis.com/v1/{NAME}/media?maxHeightPx=600&maxWidthPx=600&key=${import.meta.env.VITE_GOOGLE_PLACE_API_KEY}`


const InfoSection = ({ trip }) => {

    const [photoUrl,setPhotoUrl] = useState();

    useEffect(() => {
        trip && getPlacePhoto(trip.userChoice.location?.label);
    }, [trip])

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
        <div>
            <img src={ photoUrl ? photoUrl : "https://plus.unsplash.com/premium_photo-1663076518116-0f0637626edf?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"} alt="" className='h-[340px] w-full object-cover rounded-xl' />


            <div className='flex justify-between items-center'>
                <div className='my-5 flex flex-col gap-2 '>
                    {trip && trip.userChoice && (
                        <>
                            <h2 className="font-bold text-2xl">{trip.userChoice.location?.label}</h2>

                            <div className="flex gap-5">
                                <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-lg ">
                                    📅 {trip.userChoice.noOfDays} Days
                                </h2>

                                <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-lg ">
                                    💸 {trip.userChoice.budget}
                                </h2>

                                <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-lg ">
                                    🥂 No. Of Travelers: {trip.userChoice.traveler}
                                </h2>
                            </div>
                        </>
                    )}

                </div>

                <Button><IoIosSend /></Button>
            </div>





        </div>
    )
}

export default InfoSection