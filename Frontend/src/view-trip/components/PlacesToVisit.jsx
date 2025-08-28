import React from "react";
import PlaceCard from "./PlaceCard";

const PlacesToVisit = ({ trip }) => {
  return (
    <div className="mt-5">
      {/* Section Title */}
      <h2 className="font-bold text-2xl mb-4 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-pink-400 to-purple-400">
        ✨ Places to Visit
      </h2>

      <div>
        {Array.isArray(trip?.tripData?.itinerary) &&
        trip.tripData.itinerary.length > 0 ? (
          trip.tripData.itinerary.map((item, index) => {
            // Flexible handling of "Day" field
            const dayNumber = item?.Day || item?.day || index + 1;

            return (
              <div
                key={index}
                className="mt-6 p-5 rounded-xl bg-gradient-to-b from-[#0a0a0a] to-gray-900 shadow-lg shadow-black/40 border border-gray-800"
              >
                {/* Day Header */}
                <h2 className="font-semibold text-lg text-green-400 mb-4">
                  Day {dayNumber}
                </h2>

                {/* Places / Activities */}
                <div className="grid md:grid-cols-2 gap-5">
                  {Array.isArray(item?.places || item?.activities) &&
                  (item.places?.length > 0 || item.activities?.length > 0) ? (
                    (item.places || item.activities).map((place, i) => (
                      <div
                        key={i}
                        className="p-3 rounded-lg bg-[#111827] border border-gray-700 shadow-md hover:shadow-cyan-400/30 transition-all duration-300"
                      >
                        <h2 className="font-medium text-sm text-pink-400 mb-2">
                          {place?.Time || "⏰ Time not specified"}
                        </h2>
                        <PlaceCard place={place} />
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 italic">
                      No places listed for this day.
                    </p>
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-gray-500 italic">No itinerary found.</p>
        )}
      </div>
    </div>
  );
};

export default PlacesToVisit;
