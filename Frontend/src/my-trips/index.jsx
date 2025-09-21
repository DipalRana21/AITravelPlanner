// import { db } from '@/firebase';
// import { collection, getDocs, query, where } from 'firebase/firestore';
// import React, { useEffect, useState } from 'react'
// import { Link, useNavigate } from 'react-router-dom';
// import UserTripCardItem from './components/UserTripCardItem';

// const MyTrips = ({trip}) => {

  
//   const navigate = useNavigate();

//   const [userTrips, setUserTrips] = useState([]);

//   useEffect(() => {
//     GetUserTrips();
//   }, []);

//   // For fetching all the trips from the firebase stored data

//   const GetUserTrips = async () => {
//     const user = JSON.parse(localStorage.getItem('user'));


//     if (!user) {
//       navigate('/');
//       return;
//     }

 

//     const q = query(collection(db, "Trips"), where('userEmail', '==', user?.email));

//     const querySnapshot = await getDocs(q);
//       setUserTrips([]);
//     querySnapshot.forEach((doc) => {
//       // doc.data() is never undefined for query doc snapshots
//       console.log(doc.id, " => ", doc.data());
//       setUserTrips(prev => [...prev, doc.data()])
//     });

//   }

//   return (

    
//     <div className='px-5 sm:px-10 md:px-32 lg:px-56 xl:px-72 mt-10'>
//         <h2 className='font-bold text-3xl'>My Trips</h2>

//         <div className='grid grid-cols-2 mt-10 md:grid-cols-3 gap-5'>
//           {userTrips?.length>0 ?  userTrips.map((trip,index)=> (
//             <UserTripCardItem trip={trip}/>
//           ))
//         : [1,2,3,4,5,6].map((item,index)=>(
//           <div key={index} className='h-[220px] w-full bg-slate-200 animate-puilse rounded-xl '>

//           </div>
//         ))}
//         </div>
//     </div>

//   )
// }

// export default MyTrips


import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db, auth } from '@/firebase'; // Import auth from firebase
import { onAuthStateChanged } from 'firebase/auth';

import Header from '@/components/ui/custom/Header'; // Adjust path if needed
import UserTripCardItem from './components/UserTripCardItem';
import { Button } from '@/components/ui/custom/button';

const MyTrips = () => {
  const navigate = useNavigate();
  const [userTrips, setUserTrips] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Use onAuthStateChanged for a reliable way to get the current user
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        getUserTrips(user);
      } else {
        // If no user is signed in, redirect to auth page
        navigate('/auth');
      }
    });
    return () => unsubscribe(); // Cleanup subscription
  }, [navigate]);

  const getUserTrips = async (user) => {
    setLoading(true);
    setUserTrips([]); // Clear previous trips before fetching
    
    if (!user?.email) return;

    const q = query(collection(db, "Trips"), where('userEmail', '==', user.email));
    const querySnapshot = await getDocs(q);
    
    const trips = [];
    querySnapshot.forEach((doc) => {
      trips.push(doc.data());
    });

    setUserTrips(trips);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#0e1421] text-white">
      <Header />
      <div className='px-5 sm:px-10 md:px-32 lg:px-56 xl:px-72 py-10'>
        <h2 className='font-extrabold text-4xl text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-pink-400 to-purple-400 mb-12'>
          My Trips
        </h2>

        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8'>
          {loading ? (
            // Dark-themed loading skeletons
            [...Array(6)].map((_, index) => (
              <div key={index} className='h-[280px] w-full bg-slate-800/60 animate-pulse rounded-xl'></div>
            ))
          ) : userTrips.length > 0 ? (
            // Render user trips
            userTrips.map((trip, index) => (
              <UserTripCardItem trip={trip} key={index} />
            ))
          ) : (
            // "No Trips Found" state
            <div className="col-span-full text-center py-20 bg-[#111827] rounded-xl border border-gray-800">
              <h3 className="text-2xl font-bold text-gray-400 mb-4">No Trips Found</h3>
              <p className="text-gray-500 mb-6">You haven't planned any trips yet. Let's create one!</p>
              <Button onClick={() => navigate('/create-trip')} className="bg-gradient-to-r from-neon-cyan to-neon-pink text-white">
                Plan a New Trip
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyTrips;