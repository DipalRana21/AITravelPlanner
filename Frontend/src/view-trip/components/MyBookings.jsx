import React, { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/firebase";
import Header from "@/components/ui/custom/Header";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchBookings = async () => {
      if (!user) return;

      const q = query(
        collection(db, "Bookings"),
        where("userId", "==", user.uid)
      );

      const snap = await getDocs(q);
      const list = [];
      snap.forEach((doc) => list.push(doc.data()));

      setBookings(list);
    };

    fetchBookings();
  }, []);

  return (
    <div className="min-h-screen bg-[#0e1421] text-white">
      <Header />

      <div className="px-6 py-10 max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-neon-green">My Bookings</h1>

        {bookings.length === 0 ? (
          <p className="text-gray-400">You haven't booked any trips yet.</p>
        ) : (
          <div className="grid gap-6">
            {bookings.map((b) => (
              <motion.div
                key={b.bookingId}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-6 rounded-2xl bg-white/5 border border-white/10 shadow-xl"
              >
                <h2 className="text-2xl font-bold text-neon-cyan">
                  {b.tripLocation}
                </h2>

                <p className="text-gray-400">{b.tripDays} Day Trip</p>
                <p className="text-gray-400">Booking ID: {b.bookingId}</p>
                <p className="text-gray-400">
                  Booked on: {new Date(b.bookingDate).toLocaleString()}
                </p>

                <Link
                  to={`/booking-confirmation/${b.bookingId}`}
                  state={{ booking: b }}
                >
                  <button className="mt-4 px-4 py-2 rounded bg-neon-pink text-white font-bold hover:bg-neon-green transition">
                    View Ticket
                  </button>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBookings;
