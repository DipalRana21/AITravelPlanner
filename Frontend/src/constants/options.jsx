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

// export const AI_PROMPT = "Generate Travel Plan for Location: {location}, for {totalDays} Days for {traveler} with a {budget} budget, give me Hotels options list with HotelName, Hotel address, Price, hotel image url, geo coordinates, rating , descriptions and suggest itinerary with placeName, place Details, Place Image Url, Geocoordinates, ticket pricing, rating, Time travel each of the location for {totalDays} days with each day plan with best time to visit in JSON format.";

// export const AI_PROMPT = `Generate a detailed travel plan in valid JSON format with the following details:

// Location: {location}  
// Duration: {totalDays} days  
// Number of Travelers: {traveler}  
// Budget: {budget}  

// Output should include:

// 1. "hotels": a **comprehensive and varied list of at least 3-4 hotel options** suitable for the given budget. Do not limit to only 2–3 hotels. Include luxury, mid-range, and budget-friendly options if applicable.  Each hotel must include:
//    - HotelName
//    - HotelAddress
//    - Price with appropriate currency
//    - HotelImageURL
//    - GeoCoordinates (latitude, longitude)
//    - Rating
//    - Description

// 2. "itinerary":  a rich, varied itinerary for {totalDays} days. For each day:
//    - Include a diverse list of **at least 3-5 sightseeing places**, unless one place takes the full day due to travel or duration.
//    - Do NOT suggest the same number of places every day.
//    - Vary the types of places (cultural, nature, fun, historical, etc.).
//    - Each day must include:
//      - Day number
//      - Places (each place must contain):
//        - PlaceName
//        - PlaceDetails
//        - PlaceImageURL
//        - GeoCoordinates
//        - TicketPricing
//        - Time
//        - Rating
//        - TimetoTravel
//        - BestTimeToVisit

// Respond ONLY with valid JSON. Do not include markdown, code fences, or any explanation.`;

// latest****


// export const AI_PROMPT = `Generate a detailed travel plan in valid JSON format with the following details:

// Location: {location}  
// Duration: {totalDays} days  
// Number of Travelers: {traveler}  
// Budget: {budget}  

// Output should include:

// 1. "hotels": A **comprehensive and varied list of at least 3-5 hotel options** based on the given budget. Do NOT limit to just 2–3 hotels. Include luxury, mid-range, and budget-friendly options where applicable. Each hotel must include:
//    - HotelName
//    - HotelAddress
//    - Price (with appropriate currency)
//    - HotelImageURL
//    - GeoCoordinates (latitude, longitude)
//    - Rating
//    - Description


// 2. "itinerary": A **fully structured, time-wise itinerary for exactly {totalDays} days (Day 1 to Day {totalDays})**. Follow these rules:
//    - Start each day around **8:00 AM** and end by **10:00 PM**
//    - **Divide the day into 4-6 time blocks** with realistic durations (e.g., 8–10 AM, 10:30–12 PM, 12–1 PM for lunch, etc.)
//    - Do NOT overlap multiple places at the same time
//    - Vary the types of places (historical, nature, cultural, shopping, etc.)
//    - Include appropriate breaks for meals and rest
//    - Avoid repeating the same number or pattern of places each day
//    - If a place requires a full day due to distance or engagement, clearly mention it

// Each day's itinerary must include:
//    - Day number
//    - Places (each place must contain):
//      - PlaceName
//      - PlaceDetails
//      - PlaceImageURL
//      - GeoCoordinates (latitude, longitude)
//      - TicketPricing
//      - Time (e.g., "10:00 AM – 11:30 AM")
//      - Rating
//      - TimetoTravel (from previous location or hotel)
//      - BestTimeToVisit


// Respond ONLY with **valid JSON**. Do NOT include markdown, code fences, or explanations.`;

// *** latest 2
// export const AI_PROMPT = `Generate a detailed travel plan in valid JSON format with the following details:

// Location: {location}  
// Duration: {totalDays} days  
// Number of Travelers: {traveler}  
// Budget: {budget}  

// Output should include:

// 1. "hotels": Provide a **comprehensive list of 4–6 hotel options** (not less). Include options from luxury, mid-range, and budget categories. Each hotel must have:
//    - HotelName
//    - HotelAddress
//    - Price (with appropriate currency)
//    - HotelImageURL
//    - GeoCoordinates (latitude, longitude)
//    - Rating
//    - Description

// 2. "itinerary": Create a **day-wise itinerary for EXACTLY {totalDays} days (Day 1 to Day {totalDays})**. This is mandatory — do not skip or merge days.
//    - Each day must contain 4–6 unique **time blocks** (e.g., "8:00 AM – 10:00 AM", "10:30 AM – 12:00 PM", "12:00 PM – 1:00 PM for lunch", etc.).
//    - Activities should cover a **variety of experiences** (nature, cultural, shopping, food, leisure, etc.).
//    - Ensure meals and rest breaks are included.
//    - If a place needs most of the day (e.g., long travel or full-day tour), mention it clearly but still keep day count consistent.
//    - Do NOT repeat the same structure or just give 1 place per day.
//    - Make sure there are no overlapping times.

  
// Each place inside "itinerary" must include:
//  "places": an array of places (each place must contain):
//    - PlaceName
//    - PlaceDetails
//    - PlaceImageURL
//    - GeoCoordinates (latitude, longitude)
//    - TicketPricing
//    - Time (e.g., "10:00 AM – 11:30 AM")
//    - Rating
//    - TimetoTravel (from previous location or hotel)
//    - BestTimeToVisit

//   The final response must be valid JSON only — no extra text, no explanations, no markdown.`;


// ***imp: 1 min

export const AI_PROMPT = `Generate a detailed travel plan in valid JSON format with the following details:

Location: {location}  
Duration: {totalDays} days  
Number of Travelers: {traveler}  
Budget: {budget}  

Output must be **valid JSON only** (no explanations, no markdown).  

The response must include:

1. "hotels": Provide 4–6 hotel options across luxury, mid-range, and budget categories.  
   Each hotel must include:  
   - HotelName  
   - HotelAddress  
   - Price (with appropriate currency)  
   - HotelImageURL  
   - GeoCoordinates (latitude, longitude)  
   - Rating  
   - Description  

2. "itinerary": A **day-wise itinerary for EXACTLY {totalDays} days (Day 1 to Day {totalDays})**.  
   - Each day **MUST have 4-5 activities** inside an array called "activities".  
   - Each activity must cover a **continuous non-overlapping time block** starting from around **8:00 AM until at least 8:00 PM**.  
   - Every activity must have a realistic **start time and end time** (no vague ranges).   
   - Remaining blocks must be sightseeing, adventure, or cultural activities.  
   - If an activity takes the whole day (e.g., trekking, long journey), still divide it into **sub-blocks** such as "Morning Trekking Session", "Lunch Break", "Afternoon Trekking", "Dinner and Rest".  
   - Absolutely **NO day can have less than 4 blocks**.  

Each day must be formatted as:  
{
  "day": "1",
  "activities": [
    {
      "PlaceName": "...",
      "PlaceDetails": "...",
      "PlaceImageURL": "...",
      "GeoCoordinates": { "latitude": ..., "longitude": ... },
      "TicketPricing": "...",
      "Time": "8:00 AM – 10:00 AM",
      "Rating": "...",
      "TimetoTravel": "15 mins from Hotel XYZ",
      "BestTimeToVisit": "Morning"
    },
    ...
  ]
}

STRICT RULES:  
- Do not leave any day empty.  
- Every day MUST have 4-5 activities, no exceptions.  
- Activities must cover **the full span of the day (8:00 AM – 8:00 PM)** with realistic times.  
- No vague durations like "half-day" or "explore city all day".  
- Final output must be valid JSON only — no text, no markdown, no explanations.`;
