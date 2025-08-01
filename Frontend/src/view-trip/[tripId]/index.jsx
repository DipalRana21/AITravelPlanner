import { db } from '@/firebase';
import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'sonner';
import InfoSection from '../components/InfoSection';
import Hotels from '../components/Hotels';
import PlacesToVisit from '../components/PlacesToVisit';
import Footer from '../components/Footer';

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
      console.log("Document: ", docSnap.data());
      setTrip(docSnap.data());

    }
    else {
      console.log("No such document");
      toast("No trip found");
    }

  }
  return (
    <div className='p-10 md:px-20 lg:px-44 xl:px-56'>
      {/* Information section */}

      <InfoSection trip={trip} />

      {/* Recommended hotels */}
      <Hotels trip={trip}/>

      {/* Daily Plan */}
      <PlacesToVisit trip={trip} />

      {/* Footer */}
      <Footer trip={trip}/>
    </div>
  )
}

export default Viewtrip