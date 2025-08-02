const BASE_URL='https://places.googleapis.com/v1/places:searchText'

import axios from "axios"


const config = {
  headers: {
    'Content-Type': 'application/json',
    'X-Goog-Api-Key': import.meta.env.VITE_GOOGLE_PLACE_API_KEY,
    'X-Goog-FieldMask': 'places.displayName,places.photos,places.id'
  }
};



// export const getPlaceDetails = (data)=> axios.post(BASE_URL,data,config)