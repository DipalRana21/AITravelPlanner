import React from 'react'
import PlaceCard from './PlaceCard'

const PlacesToVisit = ({ trip }) => {
    return (
        <div className='mt-5'>

            <h2 className='font-bold text-lg'>Places to visit</h2>

            <div>
                {trip?.tripData?.itinerary.map((item, index) => (

                    <div className='mt-5'>
                        <h2 className='font-medium text-lg '>Day {item.day}</h2>

                        <div className='grid md:grid-cols-2 gap-5'>
                            {item.places.map((place, index) => (
                                <div >
                                    <h2 className='font-medium text-sm text-orange-600'>{place.Time}</h2>

                                    <PlaceCard place={place} />
                                </div>
                            ))}
                        </div>

                    </div>
                ))}
            </div>
        </div>
    )
}

export default PlacesToVisit