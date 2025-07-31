// src/constants/options.jsx
import { FaUser, FaUsers, FaChild, FaWallet, FaBalanceScale, FaCrown } from "react-icons/fa";

export const SelectTravelsList = [
  {
    id: 1,
    title: 'Just Me',
    desc: 'A sole traveler in exploration',
    icon: <FaUser />,
    people: '1 Person'
  },
  {
    id: 2,
    title: 'A Couple',
    desc: 'Two travelers in tandem',
    icon: <FaUsers />,
    people: '2 People'
  },
  {
    id: 3,
    title: 'Family',
    desc: 'A group of fun-loving adventurers',
    icon: <FaChild />,
    people: '3 to 5 People'
  }
];

export const SelectBudgetOptions = [
  {
    id: 1,
    title: 'Budget',
    desc: 'Keep it cost-effective',
    icon: <FaWallet />
  },
  {
    id: 2,
    title: 'Moderate',
    desc: 'Keep cost on the average side',
    icon: <FaBalanceScale />
  },
  {
    id: 3,
    title: 'Luxury',
    desc: 'Don’t worry about cost',
    icon: <FaCrown />
  }
];

export const AI_PROMPT = "Generate Travel Plan for Location: {location}, for {totalDays} Days for {traveler} with a {budget} budget, give me Hotels options list with HotelName, Hotel address, Price, hotel image url, geo coordinates, rating , descriptions and suggest itinerary with placeName, place Details, Place Image Url, Geocoordinates, ticket pricing, rating, Time travel each of the location for {totalDays} days with each day plan with best time to visit in JSON format.";


    
// export const AI_PROMPT ="Generate Travel Plan for Location: {location}, for {totalDays} Days for {traveler} with a {budget} budget. Give me a JSON response only (no explanation or markdown) that includes:1. Hotels list: each with hotelName, hotelAddress, price, hotelImageUrl, geoCoordinates (latitude, longitude), rating, and description.2. Itinerary plan for each day (total {totalDays} days): each day should include day number, placeName, placeDetails, placeImageUrl, geoCoordinates (latitude, longitude), ticketPricing, rating, timeTravel, and bestTimeToVisit.Return the response as strict valid JSON (all property names in **double quotes**, no markdown, no extra commentary, no line breaks in strings). JSON only."
