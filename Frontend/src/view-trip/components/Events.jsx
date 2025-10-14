import React from 'react';
import { motion } from 'framer-motion';
import { FaTicketAlt } from "react-icons/fa";

const Events = ({ trip }) => {
  const events = trip?.tripData?.events;

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { staggerChildren: 0.1 } },
  };

  if (!events || events.length === 0) {
    return (
      <div className="mt-5">
        <h2 className="font-bold text-2xl mb-4 text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400">
          🎟️ Live Events Happening
        </h2>
        <div className="p-5 rounded-xl bg-gradient-to-br from-gray-900 to-[#111827] shadow-lg shadow-black/40 border border-gray-800 text-center">
          <p className="text-gray-400">No major ticketed events were found for this destination in our system.</p>
          <p className="text-gray-500 text-sm mt-2">Event listings are most common in large metropolitan areas.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-5">
      <h2 className="font-bold text-2xl mb-4 text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400">
        🎟️ Live Events Happening
      </h2>
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        animate="show"
        className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      >
        {events.map((event, index) => (
          <motion.a
            key={index}
            href={event.url}
            target="_blank"
            rel="noopener noreferrer"
            variants={fadeInUp}
            className="block rounded-xl bg-gradient-to-br from-gray-900 to-[#111827] shadow-lg shadow-black/40 border border-gray-800 hover:border-pink-500 hover:shadow-pink-500/30 transition-all transform hover:-translate-y-1 overflow-hidden" // Added overflow-hidden
          >
            {event.imageUrl && (
              <div className="relative h-40 w-full bg-gray-800 flex items-center justify-center"> {/* Image container */}
                <img
                  src={event.imageUrl}
                  alt={event.name}
                  className="w-full h-full object-cover" // Ensure image covers the area
                />
              </div>
            )}
            <div className="p-5"> {/* Text content padding */}
              <h3 className="font-bold text-lg text-neon-pink mb-2 truncate">{event.name}</h3>
              <p className="text-gray-400 text-sm mb-1"><strong>Venue:</strong> {event.venue}</p>
              <p className="text-gray-400 text-sm mb-4"><strong>Date:</strong> {event.date}</p>
              <div className="flex items-center gap-2 text-neon-cyan text-sm font-semibold">
                <FaTicketAlt />
                <span>View Tickets</span>
              </div>
            </div>
          </motion.a>
        ))}
      </motion.div>
    </div>
  );
};

export default Events;