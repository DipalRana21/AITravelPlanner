import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '@/firebase';
import Header from '@/components/ui/custom/Header';
import { Button } from '@/components/ui/custom/button';
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

const Booking = () => {
  const { tripId } = useParams();
  const navigate = useNavigate();
  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);

  // State for our booking form
  const [travelerName, setTravelerName] = useState('');
  const [travelerEmail, setTravelerEmail] = useState('');
  const [cardNumber, setCardNumber] = useState('');

  useEffect(() => {
    const getTripData = async () => {
      setLoading(true);
      const docRef = doc(db, 'Trips', tripId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setTrip(docSnap.data());
      } else {
        toast.error('Trip details not found!');
        navigate('/');
      }
      setLoading(false);
    };
    getTripData();
  }, [tripId, navigate]);

  const handleBookingSubmit = async (e) => {
    e.preventDefault();

    if (!travelerName || !travelerEmail || !cardNumber) {
      toast.error('Please fill in all fields.');
      return;
    }

    toast.success('Processing your booking...');
    setLoading(true);

    const bookingId = `TRIPMIND-${Date.now().toString().slice(-6)}`;

    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      toast.error("Please log in again.");
      return;
    }

    const bookingDetails = {
      userId: user.uid,
      bookingId,
      tripId,
      tripLocation: trip.userChoice.location.label,
      tripDays: trip.userChoice.noOfDays,
      tripBudget: trip.userChoice.budget,
      travelerName,
      travelerEmail,
      bookingDate: new Date().toISOString(),
    };

    try {
      // SAVE BOOKING TO FIRESTORE
      await setDoc(doc(db, "Bookings", bookingId), bookingDetails);

      setLoading(false);

      // Navigate to confirmation page (GEMINI PAGE)
      navigate(`/booking-confirmation/${bookingId}`, {
        state: { booking: bookingDetails, tripData: trip },
      });

    } catch (error) {
      console.error(error);
      toast.error("Booking failed.");
      setLoading(false);
    }
  };

  if (loading && !trip) {
    return (
      <div className="min-h-screen bg-[#0e1421] text-white flex items-center justify-center text-2xl">
        Loading Booking Details...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0e1421] dark:bg-[#0f172a] text-white">
      <Header />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto px-6 py-10"
      >
        <h1 className="font-bold text-4xl text-neon-pink mb-4">Confirm Your Booking</h1>
        <p className="text-xl text-neon-cyan mb-8">
          You are booking a {trip?.userChoice.noOfDays}-day trip to {trip?.userChoice.location.label}.
        </p>

        <form onSubmit={handleBookingSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Column 1 */}
          <div className="flex flex-col gap-6 p-6 bg-white/5 rounded-2xl shadow-lg border border-white/10">
            <h2 className="text-2xl font-bold text-neon-green mb-2">Traveler Details</h2>

            <div>
              <label className="text-sm text-gray-400">Full Name</label>
              <Input
                type="text"
                placeholder="John Doe"
                value={travelerName}
                onChange={(e) => setTravelerName(e.target.value)}
                className="mt-2"
              />
            </div>

            <div>
              <label className="text-sm text-gray-400">Email Address</label>
              <Input
                type="email"
                placeholder="john.doe@example.com"
                value={travelerEmail}
                onChange={(e) => setTravelerEmail(e.target.value)}
                className="mt-2"
              />
            </div>

            <h2 className="text-2xl font-bold text-neon-green mt-6 mb-2">Payment (Mock)</h2>
            <p className="text-sm text-gray-500 -mt-4 mb-2">This is for demo only. Do not enter real card details.</p>

            <div>
              <label className="text-sm text-gray-400">Card Number</label>
              <Input
                type="text"
                placeholder="XXXX XXXX XXXX XXXX"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                className="mt-2"
              />
            </div>
          </div>

          {/* Column 2 */}
          <div className="p-6 bg-white/5 rounded-2xl shadow-lg border border-white/10 flex flex-col justify-between">
            <div>
              <h2 className="text-2xl font-bold text-neon-green mb-4">Summary</h2>
              <div className="space-y-3 text-lg">
                <div className="flex justify-between">
                  <span className="text-gray-400">Destination:</span>
                  <span className="font-bold">{trip?.userChoice.location.label}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Duration:</span>
                  <span className="font-bold">{trip?.userChoice.noOfDays} Days</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Budget:</span>
                  <span className="font-bold">{trip?.userChoice.budget}</span>
                </div>
                <div className="flex justify-between border-t border-gray-700 pt-3 mt-3">
                  <span className="text-gray-400">Service Fee:</span>
                  <span className="font-bold">$25.00</span>
                </div>
                <div className="flex justify-between text-2xl">
                  <span className="text-neon-cyan">Total:</span>
                  <span className="font-bold text-neon-cyan">~ {trip?.userChoice.budget}</span>
                </div>
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full mt-8 py-4 text-lg bg-gradient-to-r from-neon-pink to-neon-green text-white font-bold shadow-lg hover:shadow-neon-pulse transition-all duration-300 transform hover:scale-105"
            >
              {loading ? (
                <div className="animate-spin h-5 w-5 border-b-2 rounded-full border-white"></div>
              ) : (
                "Confirm & Pay (Mock)"
              )}
            </Button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default Booking;
