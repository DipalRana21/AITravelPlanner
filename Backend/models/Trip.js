import mongoose from "mongoose";

const tripSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  destination: String,
  duration: Number,
  travelers: Number,
  budget: String,
  bestTimeToVisit: String,

  plan: [
    {
      date: String, // e.g., "Day 1"
      activities: [
        {
          time: String,
          activity: String,
          notes: String
        }
      ]
    }
  ],

  hotels: [
    {
      hotelName: String,
      hotelAddress: String,
      price: String,
      imageUrl: String,
      geoCoordinates: {
        latitude: Number,
        longitude: Number,
      },
      rating: Number,
      description: String,
    }
  ],

  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("Trip", tripSchema);
