import { db } from '@/firebase';
import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';
import InfoSection from '../components/InfoSection';
import Hotels from '../components/Hotels';
import PlacesToVisit from '../components/PlacesToVisit';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';

const Viewtrip = () => {
  const { tripId } = useParams();
  const [trip, setTrip] = useState();

  useEffect(() => {
    tripId && getTripData();
  }, [tripId]);

  const getTripData = async () => {
    const docRef = doc(db, 'Trips', tripId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log('Document: ', docSnap.data());
      setTrip(docSnap.data());
    } else {
      console.log('No such document');
      toast.error('No trip found');
    }
  };

  return (
    <div className="relative min-h-screen font-exo text-gray-100 overflow-hidden">
      {/* Background gradient layers */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0e1421] via-[#1b2439] to-[#1c263b] dark:from-[#0f172a] dark:to-[#0f172a]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-500/10 via-transparent to-transparent"></div>

      {/* Content container */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="relative z-10 px-6 md:px-20 lg:px-36 xl:px-48"
      >
        {/* Info Section */}
        <section className="mb-12 backdrop-blur-md bg-white/5 rounded-2xl p-6 shadow-lg shadow-black/30 border border-white/10">
          <InfoSection trip={trip} />
        </section>

        {/* Hotels Section */}
        <section className="mb-12 backdrop-blur-md bg-white/5 rounded-2xl p-6 shadow-lg shadow-black/30 border border-white/10">
          <Hotels trip={trip} />
        </section>

        {/* Places to Visit Section */}
        <section className="mb-20 backdrop-blur-md bg-white/5 rounded-2xl p-6 shadow-lg shadow-black/30 border border-white/10">
          <PlacesToVisit trip={trip} />
        </section>

        {/* Footer */}
        <Footer />
      </motion.div>

      {/* Floating glow accents */}
      <div className="pointer-events-none absolute -top-32 -left-32 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl"></div>
      <div className="pointer-events-none absolute bottom-0 right-0 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl"></div>
    </div>
  );
};

export default Viewtrip;
