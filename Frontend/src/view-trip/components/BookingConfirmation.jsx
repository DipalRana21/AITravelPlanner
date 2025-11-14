// src/pages/BookingConfirmation.jsx

import React from 'react';
import { useLocation, Link, Navigate, useNavigate } from 'react-router-dom';
import Header from '@/components/ui/custom/Header'; // Adjust path
import { Button } from '@/components/ui/custom/button'; // Adjust path
import { motion } from 'framer-motion';

// A free generic QR code image. You can host your own.
const MOCK_QR_CODE_URL = 'https://i.imgur.com/gAav0gJ.png';

const BookingConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Get the booking details passed via router state
  const { booking, tripData } = location.state || {};

  // If someone lands here directly without booking, redirect them
  if (!booking) {
    return <Navigate to="/" replace />;
  }

  // Find the first hotel for the ticket
  const firstHotel = tripData?.tripData?.hotels?.[0] || { HotelName: 'Hotel Not Selected' };
  
  return (
    <div className="min-h-screen bg-[#0e1421] dark:bg-[#0f172a] text-white">
      <Header />
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto px-6 py-10"
      >
        <div className="text-center mb-10">
          <h1 className="font-bold text-4xl text-neon-green mb-3">Booking Confirmed!</h1>
          <p className="text-xl text-gray-300">Your artificial ticket is ready. Thank you for using TripMind.</p>
          <p className="text-lg text-neon-cyan font-bold mt-2">Booking ID: {booking.bookingId}</p>
        </div>

        {/* The Artificial Ticket */}
        <div className="bg-gradient-to-br from-gray-900 to-[#111827] rounded-2xl shadow-2xl shadow-black/50 border border-neon-cyan/50 overflow-hidden">
          {/* Ticket Header */}
          <div className="p-6 bg-black/30">
            <h2 className="text-3xl font-bold text-neon-cyan">{booking.tripLocation}</h2>
            <p className="text-lg text-gray-400">{booking.tripDays} Day Adventure</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3">
            {/* Main Details */}
            <div className="md:col-span-2 p-6 space-y-4 border-r-0 md:border-r border-dashed border-gray-700">
              <h3 className="text-xl font-semibold text-neon-pink">Traveler Details</h3>
              <div>
                <span className="text-sm text-gray-500 block">NAME</span>
                <span className="text-lg font-medium">{booking.travelerName}</span>
              </div>
              <div>
                <span className="text-sm text-gray-500 block">EMAIL</span>
                <span className="text-lg font-medium">{booking.travelerEmail}</span>
              </div>

              <h3 className="text-xl font-semibold text-neon-pink mt-6">Booking Summary</h3>
              <div>
                <span className="text-sm text-gray-500 block">PRIMARY HOTEL (MOCK)</span>
                <span className="text-lg font-medium">{firstHotel.HotelName}</span>
              </div>
              <div>
                <span className="text-sm text-gray-500 block">TRIP BUDGET</span>
                <span className="text-lg font-medium">{booking.tripBudget}</span>
              </div>
            </div>

            {/* QR Code Section */}
            <div className="p-6 flex flex-col items-center justify-center text-center">
              <img src={MOCK_QR_CODE_URL} alt="Mock QR Code" className="w-40 h-40 rounded-lg bg-white p-2" />
              <p className="text-sm text-gray-400 mt-4">Scan this mock code at check-in</p>
              <p className="text-xs text-gray-600 mt-1">ID: {booking.bookingId}</p>
            </div>
          </div>

          {/* Ticket Footer */}
          <div className="p-4 bg-black/30 text-center text-xs text-gray-500 border-t border-gray-700">
            This is a mock ticket for project demonstration purposes only.
          </div>
        </div>

        <div className="text-center mt-10">
          <Link to="/">
            <Button
              size="lg"
              className="rounded-full px-8 py-3 bg-neon-cyan text-black font-bold shadow-lg hover:shadow-neon-cyan/50 transition-all duration-300 transform hover:scale-105"
            >
              Back to Home
            </Button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default BookingConfirmation;