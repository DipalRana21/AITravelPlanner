import express from "express";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();

router.get("/get-local-events", async (req, res) => {
  try {
    const { city } = req.query;
    console.log("💡 /get-local-events called with city:", city);

    if (!city) {
      console.warn("⚠️ City is missing in request");
      return res.status(400).json({ message: "City is required" });
    }

    const apiKey = process.env.TICKETMASTER_API_KEY;
    console.log("🔑 Using Ticketmaster API Key:", apiKey ? "YES" : "NO");

    const response = await axios.get(
      "https://app.ticketmaster.com/discovery/v2/events.json",
      {
        params: {
          apikey: apiKey,
          city,
          size: 5,
          sort: "date,asc",
        },
      }
    );

    console.log("📦 Ticketmaster raw response received");

    const events = response.data._embedded?.events || [];
    console.log(`📅 Number of events fetched: ${events.length}`);

    const formattedEvents = events.map((event) => ({
      name: event.name,
      date: event.dates?.start?.localDate,
      time: event.dates?.start?.localTime,
      image: event.images?.[0]?.url || "https://via.placeholder.com/200",
      venue: event._embedded?.venues?.[0]?.name || "Unknown venue",
      url: event.url,
    }));

    res.json({ events: formattedEvents });
  } catch (error) {
    console.error("❌ Error fetching events:", error.response?.data || error.message);
    res.status(500).json({ message: "Failed to fetch local events" });
  }
});

export default router;
