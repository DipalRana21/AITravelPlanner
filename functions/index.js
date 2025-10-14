
const { onCall, HttpsError } = require("firebase-functions/v2/https");
const { setGlobalOptions } = require("firebase-functions/v2");
const admin = require("firebase-admin");
const axios = require("axios");

admin.initializeApp();

// Set runtime options
setGlobalOptions({ timeoutSeconds: 300, memory: "1GiB" });

const callGemini = async (prompt, apiKey) => {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`; // Using gemini-2.5-flash as agreed
    const payload = { contents: [{ role: "user", parts: [{ text: prompt }] }] };
    const response = await axios.post(url, payload);
    return response.data?.candidates?.[0]?.content?.parts?.[0]?.text;
};

const safeParse = (raw) => {
    if (!raw) return null;
    try {
        let txt = raw.trim().replace(/^```(?:json)?\s*|```\s*$/g, "");
        return JSON.parse(txt);
    } catch (err) {
        console.error("JSON Parse Error:", err.message);
        return null;
    }
};

exports.generateTripWithEvents = onCall({ cors: true }, async (request) => {
    console.log("Function triggered. Validating input...");
    if (!request.data || !request.data.formData) {
        throw new HttpsError('invalid-argument', 'Request is missing required "formData" field.');
    }
    const { formData } = request.data;
    console.log("Received formData:", JSON.stringify(formData));

    // --- Input Validation ---
    if (!formData.location || !formData.location.label || !formData.noOfDays || !formData.budget || !formData.traveler || !formData.personality) {
        throw new HttpsError('invalid-argument', 'One or more required fields in formData are missing.');
    }

    console.log("Fetching API keys from environment...");
    const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
    const TICKETMASTER_API_KEY = process.env.TICKETMASTER_API_KEY;

    // --- API Key Validation ---
    if (!GEMINI_API_KEY) {
        console.error("CRITICAL: GEMINI_API_KEY environment variable is not set!");
        throw new HttpsError('internal', 'Server configuration error: Missing Gemini API Key.');
    }
    if (!TICKETMASTER_API_KEY) {
        console.error("CRITICAL: TICKETMASTER_API_KEY environment variable is not set!");
        throw new HttpsError('internal', 'Server configuration error: Missing Ticketmaster API Key.');
    }
    console.log("API keys loaded successfully.");

    let events = [];
    try {
        const city = formData.location.label.split(',')[0];
        const eventUrl = `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${TICKETMASTER_API_KEY}&city=${city}&classificationName=Music,Sports,Arts%26Theatre&sort=date,asc`;
        const eventResponse = await axios.get(eventUrl);
        if (eventResponse.data._embedded && eventResponse.data._embedded.events) {
            events = eventResponse.data._embedded.events.slice(0, 5).map(e => ({
                name: e.name,
                date: e.dates.start.localDate,
                venue: e._embedded.venues[0].name,
                url: e.url,
                imageUrl: e.images?.[0]?.url || 'https://via.placeholder.com/400x200?text=Event+Image' // <-- NEW: Grab the image URL
            }));
        }
    } catch (error) {
        console.warn("Could not fetch Ticketmaster events:", error.message);
    }

    try {
        console.log("Building prompts for Gemini...");
        const basePrompt = `You are a travel planner. Generate valid JSON only. No markdown, no explanations, no text — JSON only. Location: ${formData.location.label}, Duration: ${formData.noOfDays} days, Number of Travelers: ${formData.traveler}, Budget: ${formData.budget}, Personality Type: ${formData.personality}. Rules: Times must cover 8:00 AM – 8:00 PM. Each day = 4–5 activities, no less. Activities must have: PlaceName, PlaceDetails, GeoCoordinates, TicketPricing, Time, Rating, TimetoTravel.`;
        const enhancedPrompt = `${basePrompt}\n---\nCONTEXT: To make the itinerary better, consider these real-time events happening in the area. If any of these events match the traveler's personality, integrate one or two directly into the daily plan. Available Events: ${JSON.stringify(events)}`;
        const buildHotelPrompt = (base) => `${base}\nNow generate ONLY "hotels": 4–6 options across luxury, mid-range, budget. Each with: HotelName, HotelAddress, Price, HotelImageURL, GeoCoordinates, Rating, Description. Output valid JSON array only.`;
        const buildDayPrompt = (base, day) => `${base}\nNow generate ONLY "Day ${day}" with 4–5 activities from 8AM–8PM. Output format: {"day": "${day}", "activities": [ ... ]}`;

        console.log("Calling Gemini API...");
        const hotelsRawPromise = callGemini(buildHotelPrompt(basePrompt), GEMINI_API_KEY);
        const dayPromises = Array.from({ length: parseInt(formData.noOfDays) }, (_, i) => callGemini(buildDayPrompt(enhancedPrompt, i + 1), GEMINI_API_KEY));
        const [hotelsRaw, ...dayResultsRaw] = await Promise.all([hotelsRawPromise, ...dayPromises]);
        console.log("Successfully received data from Gemini.");

        const tripData = {
            hotels: safeParse(hotelsRaw),
            itinerary: dayResultsRaw.map(d => safeParse(d)),
            events: events,
        };
        return { success: true, tripData: tripData };

    } catch (error) {
        console.error("--- FATAL ERROR DURING GEMINI CALL ---");
        if (error.response) {
            console.error("Gemini API Response Error Status:", error.response.status);
            console.error("Gemini API Response Data:", JSON.stringify(error.response.data));
        } else {
            console.error("Error message:", error.message);
        }
        throw new HttpsError('internal', 'Failed to generate trip data from AI.');
    }
});