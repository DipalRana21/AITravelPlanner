
// most imp current

// import React, { useEffect, useState } from 'react';
// import Header from "../components/ui/custom/Header.jsx";
// import { Input } from "@/components/ui/input";
// import { SelectBudgetOptions, SelectTravelsList } from '@/constants/options.jsx';
// import { Button } from "../components/ui/custom/button";
// import { motion } from "framer-motion";
// import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
// import { toast } from 'sonner';
// import { AiOutlineLoading3Quarters } from "react-icons/ai";
// import { doc, setDoc } from 'firebase/firestore';
// import { db } from '@/firebase.js';
// import { useNavigate } from 'react-router-dom';
// import LoadingScreen from "../components/ui/custom/LoadingScreen.jsx";

// const fadeInUp = {
//   hidden: { opacity: 0, y: 40 },
//   show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
// };

// // ---------- Prompt Builders ----------
// const buildBasePrompt = (formData) => `
// You are a travel planner. Generate valid JSON only. 
// No markdown, no explanations, no text — JSON only.  

// Location: ${formData.location.label}  
// Duration: ${formData.noOfDays} days  
// Number of Travelers: ${formData.traveler}  
// Budget: ${formData.budget}  

// Rules:  
// - Times must cover 8:00 AM – 8:00 PM.  
// - Each day = 4–5 activities, no less.  
// - Activities must have: PlaceName, PlaceDetails, PlaceImageURL, GeoCoordinates, TicketPricing, Time, Rating, TimetoTravel, BestTimeToVisit.  
// `;

// const buildHotelPrompt = (base) => `
// ${base}
// Now generate ONLY "hotels": 4–6 options across luxury, mid-range, budget.  
// Each with: HotelName, HotelAddress, Price, HotelImageURL, GeoCoordinates, Rating, Description.  
// Output valid JSON array only.
// `;

// const buildDayPrompt = (base, day) => `
// ${base}
// Now generate ONLY "Day ${day}" with 4–5 activities from 8AM–8PM.  
// Output format:
// {
//   "day": "${day}",
//   "activities": [ ... ]
// }
// `;

// // ---------- Component ----------
// function TripForm() {
//   const [formData, setFormData] = useState({
//     location: null,
//     noOfDays: '',
//     budget: '',
//     traveler: '',
//   });

//   const [place, setPlace] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleInputChange = (name, value) => {
//     setFormData({
//       ...formData,
//       [name]: value
//     });
//   };

//   useEffect(() => {
//     console.log(formData);
//   }, [formData]);

//   // ---------- Core Fetch Helper ----------
//   const callGemini = async (prompt) => {
//     const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-pro:generateContent?key=${import.meta.env.VITE_GOOGLE_GEMINI_API_KEY}`;

//     const payload = {
//       contents: [{ role: "user", parts: [{ text: prompt }] }]
//     };

//     const response = await fetch(url, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(payload),
//     });

//     const result = await response.json();
//     const resultText = result?.candidates?.[0]?.content?.parts?.[0]?.text;
//     console.log("🧠 Gemini raw result:\n", resultText);
//     return resultText;
//   };


//   // backend way : 2nd method working

// // const callGemini = async (prompt) => {
// //   try {
// //     // Make sure this points to your backend (port 5000)
// //     const response = await fetch("http://localhost:5000/api/gemini/generate", {
// //       method: "POST",
// //       headers: { "Content-Type": "application/json" },
// //       body: JSON.stringify({ prompt }),
// //     });

// //     if (!response.ok) {
// //       console.error("Gemini backend error:", await response.text());
// //       return null;
// //     }

// //     const result = await response.json();
// //     const resultText = result?.candidates?.[0]?.content?.parts?.[0]?.text;

// //     console.log("🧠 Gemini raw result:\n", resultText);
// //     return resultText;
// //   } catch (err) {
// //     console.error("🔥 Gemini fetch error:", err);
// //     return null;
// //   }
// // };


//   // ---------- Generate Trip ----------
//   const onGenerateTrip = async () => {
//     console.log("Generate Trip Clicked ✅");

//     try {
//       if (!formData?.location || !formData.location?.label) {
//         toast("❌ Missing location");
//         return;
//       }
//       if (!formData?.noOfDays?.toString().trim()) {
//         toast("❌ Missing number of days");
//         return;
//       }
//       if (parseInt(formData?.noOfDays) > 14) {
//         toast("❌ Please enter travel days below 15");
//         return;
//       }
//       if (!formData?.budget || !formData?.budget?.toString().trim()) {
//         toast("❌ Missing budget");
//         return;
//       }
//       if (!formData?.traveler || !formData?.traveler?.toString().trim()) {
//         toast("❌ Missing traveler");
//         return;
//       }

//       toast("✅ Ready to go!");
//       setLoading(true);

//       // Base prompt
//       const base = buildBasePrompt(formData);

//       // Hotels
//       const hotelsRaw = await callGemini(buildHotelPrompt(base));

//       // Days
//       const dayResults = await Promise.all(
//         Array.from({ length: parseInt(formData.noOfDays) }, (_, i) =>
//           callGemini(buildDayPrompt(base, i + 1))
//         )
//       );

//       const tripData = {
//         hotels: safeParse(hotelsRaw),
//         itinerary: dayResults.map(d => safeParse(d)),
//       };

//       await SaveAITrip(tripData);
//     } catch (err) {
//       console.error("🔥 Error in onGenerateTrip:", err);
//       toast("Something went wrong!");
//       setLoading(false);
//     }
//   };

//   // ---------- JSON Parsing ----------
//   const safeParse = (raw) => {
//     if (!raw) return null;
//     try {
//       let txt = raw.trim();
//       if (txt.startsWith("```json") || txt.startsWith("```")) {
//         txt = txt.replace(/```(?:json)?/, "").replace(/```$/, "").trim();
//       }
//       const safeJSON = txt.replace(/([{,]\s*)([a-zA-Z0-9_]+)(\s*:)/g, '$1"$2"$3');
//       return JSON.parse(safeJSON);
//     } catch (err) {
//       console.error("❌ JSON Parse Error:", err.message, raw);
//       return null;
//     }
//   };

//   // ---------- Save ----------
//   const SaveAITrip = async (TripData) => {
//     const user = JSON.parse(localStorage.getItem("user"));
//     if (!user || !user.email) {
//       console.error("User not found in localStorage");
//       setLoading(false);
//       return;
//     }

//     const docId = Date.now().toString();

//     await setDoc(doc(db, "Trips", docId), {
//       userChoice: formData,
//       tripData: TripData,
//       userEmail: user.email,
//       id: docId,
//       createdAt: new Date(),
//     });

//     console.log("✅ Trip saved to Firebase successfully!");
//     setLoading(false);
//     navigate(`/view-trip/${docId}`);
//   };

//   // ---------- Render ----------
//   return (
//     <div className="bg-dark-bg dark:bg-white text-white dark:text-black min-h-screen">
//       {loading && <LoadingScreen text="SYNTHESIZING ITINERARY..." />}

//       <Header />
//       <div className='sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-10'>
//         <motion.h2
//           className='font-bold text-3xl text-neon-pink'
//           initial="hidden"
//           whileInView="show"
//           viewport={{ once: true }}
//           variants={fadeInUp}
//         >
//           Tell us your travel preference 🏕️🌴
//         </motion.h2>

//         <motion.p
//           className='mt-3 text-neon-cyan text-xl'
//           initial="hidden"
//           whileInView="show"
//           viewport={{ once: true }}
//           variants={fadeInUp}
//         >
//           Just provide some basic information and our trip planner will generate a customized itinerary based on your preference
//         </motion.p>

//         <div className='mt-16 flex flex-col gap-8'>
//           {/* Location */}
//           <motion.div
//             initial="hidden"
//             whileInView="show"
//             viewport={{ once: true }}
//             variants={fadeInUp}
//           >
//             <h2 className='text-xl font-semibold mb-2'>What is destination of choice?</h2>
//             <GooglePlacesAutocomplete
//               apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
//               selectProps={{
//                 value: place,
//                 onChange: (v) => {
//                   setPlace(v);
//                   handleInputChange('location', v);
//                 },
//                 classNamePrefix: "google-places",
//                 styles: {
//                   control: (base) => ({
//                     ...base,
//                     backgroundColor: "#000",
//                     borderColor: "#2dd4bf",
//                     color: "#67e8f9",
//                     borderRadius: "0.375rem",
//                     padding: "0.25rem",
//                     fontSize: "1rem",
//                     boxShadow: "0 0 5px #0ff",
//                     transition: "0.3s",
//                   }),
//                   input: (base) => ({ ...base, color: "#67e8f9" }),
//                   singleValue: (base) => ({ ...base, color: "#67e8f9" }),
//                   menu: (base) => ({
//                     ...base,
//                     backgroundColor: "#0f172a",
//                     borderRadius: "0.5rem",
//                     marginTop: "4px",
//                     padding: "0.25rem 0",
//                   }),
//                   option: (base, state) => ({
//                     ...base,
//                     backgroundColor: state.isFocused ? "#2dd4bf" : "#0f172a",
//                     color: state.isFocused ? "#0f172a" : "#67e8f9",
//                     padding: "0.75rem 1rem",
//                     cursor: "pointer",
//                     transition: "all 0.2s",
//                   }),
//                 },
//               }}
//             />
//           </motion.div>

//           {/* Days */}
//           <motion.div
//             initial="hidden"
//             whileInView="show"
//             viewport={{ once: true }}
//             variants={fadeInUp}
//           >
//             <h2 className='text-xl font-semibold mb-2'>How many days are you planning your trip?</h2>
//             <Input
//               type="number"
//               placeholder={'Ex.3'}
//               onChange={(e) => handleInputChange('noOfDays', e.target.value)}
//             />
//           </motion.div>

//           {/* Budget */}
//           <motion.div
//             initial="hidden"
//             whileInView="show"
//             viewport={{ once: true }}
//             variants={fadeInUp}
//           >
//             <h2 className='text-xl font-semibold mb-4'>What is your Budget for the trip?</h2>
//             <div className='grid grid-cols-1 md:grid-cols-3 gap-5'>
//               {SelectBudgetOptions.map((item, index) => (
//                 <motion.div
//                   key={index}
//                   onClick={() => handleInputChange('budget', item.title)}
//                   variants={fadeInUp}
//                   className={`p-5 border rounded-xl transition-all
//                     ${formData?.budget === item.title
//                       ? 'border-neon-pink shadow-neon-pulse scale-105'
//                       : 'border-gray-600 dark:border-gray-300 hover:border-neon-cyan hover:shadow-neon-pulse hover:scale-105'}
//                     bg-[#1a1f2e] dark:bg-gray-100 dark:text-black`}
//                 >
//                   <div className="text-neon-green text-3xl mb-2">{item.icon}</div>
//                   <h2 className='font-bold text-lg text-white'>{item.title}</h2>
//                   <p className='text-gray-400'>{item.desc}</p>
//                 </motion.div>
//               ))}
//             </div>
//           </motion.div>

//           {/* Traveler */}
//           <motion.div
//             initial="hidden"
//             whileInView="show"
//             viewport={{ once: true }}
//             variants={fadeInUp}
//           >
//             <h2 className='text-xl font-semibold my-4'>Who do you plan to travel with on your next adventure?</h2>
//             <div className='grid grid-cols-1 md:grid-cols-3 gap-5'>
//               {SelectTravelsList.map((item, index) => (
//                 <motion.div
//                   key={index}
//                   onClick={() => handleInputChange('traveler', item.people)}
//                   variants={fadeInUp}
//                   className={`p-5 border rounded-xl transition-all bg-[#1a1f2e] 
//                     ${formData?.traveler === item.people
//                       ? 'border-neon-cyan shadow-neon-pulse scale-105'
//                       : 'border-gray-600 hover:border-neon-pink hover:shadow-neon-pulse hover:scale-105'}`}
//                 >
//                   <div className="text-neon-pink text-3xl mb-2">{item.icon}</div>
//                   <h2 className='font-bold text-lg text-white'>{item.title}</h2>
//                   <p className='text-gray-400'>{item.desc}</p>
//                 </motion.div>
//               ))}
//             </div>
//           </motion.div>

//           {/* Button */}
//           <motion.div
//             className='text-right'
//             initial="hidden"
//             whileInView="show"
//             viewport={{ once: true }}
//             variants={fadeInUp}
//           >
//             <Button
//               disabled={loading}
//               className='my-10 bg-gradient-to-r from-neon-pink to-neon-green text-white px-6 py-2 rounded-full hover:shadow-neon-pulse transition-all'
//               onClick={onGenerateTrip}
//             >
//               {loading
//                 ? <AiOutlineLoading3Quarters className='h-7 w-7 animate-spin' />
//                 : "Generate Trip"}
//             </Button>
//           </motion.div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default TripForm;


// src/CreateTrip.jsx (or TripForm.jsx if that's your file name)

// import React, { useEffect, useState } from 'react';
// import Header from "../components/ui/custom/Header.jsx";
// import { Input } from "@/components/ui/input";
// // --- UPDATED IMPORT ---
// import { SelectBudgetOptions, SelectTravelsList, SelectPersonalityOptions } from '@/constants/options.jsx';
// import { Button } from "../components/ui/custom/button";
// import { motion } from "framer-motion";
// import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
// import { toast } from 'sonner';
// import { AiOutlineLoading3Quarters } from "react-icons/ai";
// import { doc, setDoc } from 'firebase/firestore';
// import { db } from '@/firebase.js';
// import { useNavigate } from 'react-router-dom';
// import LoadingScreen from "../components/ui/custom/LoadingScreen.jsx";

// const fadeInUp = {
//   hidden: { opacity: 0, y: 40 },
//   show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
// };

// // ---------- Prompt Builders ----------
// const buildBasePrompt = (formData) => `
// You are a travel planner. Generate valid JSON only. 
// No markdown, no explanations, no text — JSON only.  

// Location: ${formData.location.label}  
// Duration: ${formData.noOfDays} days  
// Number of Travelers: ${formData.traveler}  
// Budget: ${formData.budget}  
// // --- NEW: Personality Added to Prompt ---
// Personality Type: ${formData.personality} 

// Rules:  
// - Times must cover 8:00 AM – 8:00 PM.  
// - Each day = 4–5 activities, no less.  
// - Activities must have: PlaceName, PlaceDetails, PlaceImageURL, GeoCoordinates, TicketPricing, Time, Rating, TimetoTravel, BestTimeToVisit.  
// `;

// const buildHotelPrompt = (base) => `
// ${base}
// Now generate ONLY "hotels": 4–6 options across luxury, mid-range, budget.  
// Each with: HotelName, HotelAddress, Price, HotelImageURL, GeoCoordinates, Rating, Description.  
// Output valid JSON array only.
// `;

// const buildDayPrompt = (base, day) => `
// ${base}
// Now generate ONLY "Day ${day}" with 4–5 activities from 8AM–8PM.  
// Output format:
// {
//   "day": "${day}",
//   "activities": [ ... ]
// }
// `;

// // ---------- Component ----------
// function TripForm() {
//   const [formData, setFormData] = useState({
//     location: null,
//     noOfDays: '',
//     budget: '',
//     traveler: '',
//     // --- NEW: Add personality to formData state ---
//     personality: '', 
//   });

//   const [place, setPlace] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleInputChange = (name, value) => {
//     setFormData({
//       ...formData,
//       [name]: value
//     });
//   };

//   useEffect(() => {
//     console.log(formData);
//   }, [formData]);

//   // ---------- Core Fetch Helper (unchanged) ----------
//   const callGemini = async (prompt) => {
//     const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-pro:generateContent?key=${import.meta.env.VITE_GOOGLE_GEMINI_API_KEY}`;
//     const payload = {
//       contents: [{ role: "user", parts: [{ text: prompt }] }]
//     };

//     const response = await fetch(url, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(payload),
//     });

//     const result = await response.json();
//     const resultText = result?.candidates?.[0]?.content?.parts?.[0]?.text;
//     console.log("🧠 Gemini raw result:\n", resultText);
//     return resultText;
//   };

//   // ---------- Generate Trip ----------
//   const onGenerateTrip = async () => {
//     console.log("Generate Trip Clicked ✅");

//     try {
//       if (!formData?.location || !formData.location?.label) {
//         toast("❌ Missing location");
//         return;
//       }
//       if (!formData?.noOfDays?.toString().trim()) {
//         toast("❌ Missing number of days");
//         return;
//       }
//       if (parseInt(formData?.noOfDays) > 14) {
//         toast("❌ Please enter travel days below 15");
//         return;
//       }
//       if (!formData?.budget || !formData?.budget?.toString().trim()) {
//         toast("❌ Missing budget");
//         return;
//       }
//       if (!formData?.traveler || !formData?.traveler?.toString().trim()) {
//         toast("❌ Missing traveler");
//         return;
//       }
  

//       toast("✅ Ready to go!");
//       setLoading(true);

//       // Base prompt
//       const base = buildBasePrompt(formData);

//       // Hotels
//       const hotelsRaw = await callGemini(buildHotelPrompt(base));

//       // Days
//       const dayResults = await Promise.all(
//         Array.from({ length: parseInt(formData.noOfDays) }, (_, i) =>
//           callGemini(buildDayPrompt(base, i + 1))
//         )
//       );

//       const tripData = {
//         hotels: safeParse(hotelsRaw),
//         itinerary: dayResults.map(d => safeParse(d)),
//       };

//       await SaveAITrip(tripData);
//     } catch (err) {
//       console.error("🔥 Error in onGenerateTrip:", err);
//       toast("Something went wrong!");
//       setLoading(false);
//     }
//   };

//   // ---------- JSON Parsing (unchanged) ----------
//   const safeParse = (raw) => {
//     if (!raw) return null;
//     try {
//       let txt = raw.trim();
//       if (txt.startsWith("```json") || txt.startsWith("```")) {
//         txt = txt.replace(/```(?:json)?/, "").replace(/```$/, "").trim();
//       }
//       const safeJSON = txt.replace(/([{,]\s*)([a-zA-Z0-9_]+)(\s*:)/g, '$1"$2"$3');
//       return JSON.parse(safeJSON);
//     } catch (err) {
//       console.error("❌ JSON Parse Error:", err.message, raw);
//       return null;
//     }
//   };

//   // ---------- Save (unchanged) ----------
//   const SaveAITrip = async (TripData) => {
//     const user = JSON.parse(localStorage.getItem("user"));
//     if (!user || !user.email) {
//       console.error("User not found in localStorage");
//       setLoading(false);
//       return;
//     }

//     const docId = Date.now().toString();

//     await setDoc(doc(db, "Trips", docId), {
//       userChoice: formData,
//       tripData: TripData,
//       userEmail: user.email,
//       id: docId,
//       createdAt: new Date(),
//     });

//     console.log("✅ Trip saved to Firebase successfully!");
//     setLoading(false);
//     navigate(`/view-trip/${docId}`);
//   };

//   // ---------- Render ----------
//   return (
//     <div className="bg-dark-bg dark:bg-white text-white dark:text-black min-h-screen">
//       {loading && <LoadingScreen text="SYNTHESIZING ITINERARY..." />}

//       <Header />
//       <div className='sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-10'>
//         <motion.h2
//           className='font-bold text-3xl text-neon-pink'
//           initial="hidden"
//           whileInView="show"
//           viewport={{ once: true }}
//           variants={fadeInUp}
//         >
//           Tell us your travel preference 🏕️🌴
//         </motion.h2>

//         <motion.p
//           className='mt-3 text-neon-cyan text-xl'
//           initial="hidden"
//           whileInView="show"
//           viewport={{ once: true }}
//           variants={fadeInUp}
//         >
//           Just provide some basic information and our trip planner will generate a customized itinerary based on your preference
//         </motion.p>

//         <div className='mt-16 flex flex-col gap-8'>
//           {/* Location (unchanged) */}
//           <motion.div
//             initial="hidden"
//             whileInView="show"
//             viewport={{ once: true }}
//             variants={fadeInUp}
//           >
//             <h2 className='text-xl font-semibold mb-2'>What is destination of choice?</h2>
//             <GooglePlacesAutocomplete
//               apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
//               selectProps={{
//                 value: place,
//                 onChange: (v) => {
//                   setPlace(v);
//                   handleInputChange('location', v);
//                 },
//                 classNamePrefix: "google-places",
//                 styles: {
//                   control: (base) => ({
//                     ...base,
//                     backgroundColor: "#000",
//                     borderColor: "#2dd4bf",
//                     color: "#67e8f9",
//                     borderRadius: "0.375rem",
//                     padding: "0.25rem",
//                     fontSize: "1rem",
//                     boxShadow: "0 0 5px #0ff",
//                     transition: "0.3s",
//                   }),
//                   input: (base) => ({ ...base, color: "#67e8f9" }),
//                   singleValue: (base) => ({ ...base, color: "#67e8f9" }),
//                   menu: (base) => ({
//                     ...base,
//                     backgroundColor: "#0f172a",
//                     borderRadius: "0.5rem",
//                     marginTop: "4px",
//                     padding: "0.25rem 0",
//                   }),
//                   option: (base, state) => ({
//                     ...base,
//                     backgroundColor: state.isFocused ? "#2dd4bf" : "#0f172a",
//                     color: state.isFocused ? "#0f172a" : "#67e8f9",
//                     padding: "0.75rem 1rem",
//                     cursor: "pointer",
//                     transition: "all 0.2s",
//                   }),
//                 },
//               }}
//             />
//           </motion.div>

//           {/* Days (unchanged) */}
//           <motion.div
//             initial="hidden"
//             whileInView="show"
//             viewport={{ once: true }}
//             variants={fadeInUp}
//           >
//             <h2 className='text-xl font-semibold mb-2'>How many days are you planning your trip?</h2>
//             <Input
//               type="number"
//               placeholder={'Ex.3'}
//               onChange={(e) => handleInputChange('noOfDays', e.target.value)}
//             />
//           </motion.div>

//           {/* Budget (unchanged) */}
//           <motion.div
//             initial="hidden"
//             whileInView="show"
//             viewport={{ once: true }}
//             variants={fadeInUp}
//           >
//             <h2 className='text-xl font-semibold mb-4'>What is your Budget for the trip?</h2>
//             <div className='grid grid-cols-1 md:grid-cols-3 gap-5'>
//               {SelectBudgetOptions.map((item, index) => (
//                 <motion.div
//                   key={index}
//                   onClick={() => handleInputChange('budget', item.title)}
//                   variants={fadeInUp}
//                   className={`p-5 border rounded-xl transition-all
//                     ${formData?.budget === item.title
//                       ? 'border-neon-pink shadow-neon-pulse scale-105'
//                       : 'border-gray-600 dark:border-gray-300 hover:border-neon-cyan hover:shadow-neon-pulse hover:scale-105'}
//                     bg-[#1a1f2e] dark:bg-gray-100 dark:text-black`}
//                 >
//                   <div className="text-neon-green text-3xl mb-2">{item.icon}</div>
//                   <h2 className='font-bold text-lg text-white'>{item.title}</h2>
//                   <p className='text-gray-400'>{item.desc}</p>
//                 </motion.div>
//               ))}
//             </div>
//           </motion.div>

//           {/* Traveler (unchanged) */}
//           <motion.div
//             initial="hidden"
//             whileInView="show"
//             viewport={{ once: true }}
//             variants={fadeInUp}
//           >
//             <h2 className='text-xl font-semibold my-4'>Who do you plan to travel with on your next adventure?</h2>
//             <div className='grid grid-cols-1 md:grid-cols-3 gap-5'>
//               {SelectTravelsList.map((item, index) => (
//                 <motion.div
//                   key={index}
//                   onClick={() => handleInputChange('traveler', item.people)}
//                   variants={fadeInUp}
//                   className={`p-5 border rounded-xl transition-all bg-[#1a1f2e] 
//                     ${formData?.traveler === item.people
//                       ? 'border-neon-cyan shadow-neon-pulse scale-105'
//                       : 'border-gray-600 hover:border-neon-pink hover:shadow-neon-pulse hover:scale-105'}`}
//                 >
//                   <div className="text-neon-pink text-3xl mb-2">{item.icon}</div>
//                   <h2 className='font-bold text-lg text-white'>{item.title}</h2>
//                   <p className='text-gray-400'>{item.desc}</p>
//                 </motion.div>
//               ))}
//             </div>
//           </motion.div>

//           {/* --- NEW: Personality Selection --- */}
//           <motion.div
//             initial="hidden"
//             whileInView="show"
//             viewport={{ once: true }}
//             variants={fadeInUp}
//           >
//             <h2 className='text-xl font-semibold my-4'>What's your travel personality?</h2>
//             <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5'>
//               {SelectPersonalityOptions.map((item, index) => (
//                 <motion.div
//                   key={index}
//                   onClick={() => handleInputChange('personality', item.type)}
//                   variants={fadeInUp}
//                   className={`p-5 border rounded-xl transition-all bg-[#1a1f2e] 
//                     ${formData?.personality === item.type
//                       ? 'border-neon-pink shadow-neon-pulse scale-105' // Highlight with pink for personality
//                       : 'border-gray-600 hover:border-neon-cyan hover:shadow-neon-pulse hover:scale-105'}`}
//                 >
//                   <div className="text-neon-green text-3xl mb-2">{item.icon}</div>
//                   <h2 className='font-bold text-lg text-white'>{item.title}</h2>
//                   <p className='text-gray-400'>{item.desc}</p>
//                 </motion.div>
//               ))}
//             </div>
//           </motion.div>

//           {/* Button (unchanged) */}
//           <motion.div
//             className='text-right'
//             initial="hidden"
//             whileInView="show"
//             viewport={{ once: true }}
//             variants={fadeInUp}
//           >
//             <Button
//               disabled={loading}
//               className='my-10 bg-gradient-to-r from-neon-pink to-neon-green text-white px-6 py-2 rounded-full hover:shadow-neon-pulse transition-all'
//               onClick={onGenerateTrip}
//             >
//               {loading
//                 ? <AiOutlineLoading3Quarters className='h-7 w-7 animate-spin' />
//                 : "Generate Trip"}
//             </Button>
//           </motion.div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default TripForm;



import React, { useEffect, useState } from 'react';
import Header from "../components/ui/custom/Header.jsx";
import { Input } from "@/components/ui/input";
// --- UPDATED IMPORT ---
import { SelectBudgetOptions, SelectTravelsList, SelectPersonalityOptions } from '@/constants/options.jsx';
import { Button } from "../components/ui/custom/button";
import { motion } from "framer-motion";
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { toast } from 'sonner';
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { doc, setDoc } from 'firebase/firestore';
import { db, functions } from '@/firebase.js';
import { useNavigate } from 'react-router-dom';
import LoadingScreen from "../components/ui/custom/LoadingScreen.jsx";
import { httpsCallable } from 'firebase/functions';

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};



// ---------- Component ----------
function TripForm() {
  const [formData, setFormData] = useState({
    location: null,
    noOfDays: '',
    budget: '',
    traveler: '',
    // --- NEW: Add personality to formData state ---
    personality: '', 
  });

  const [place, setPlace] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

   // The httpsCallable function to your new backend logic
  const generateTripWithEvents = httpsCallable(functions, 'generateTripWithEvents');

  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value
    });
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  

  const onGenerateTrip = async () => {
    console.log("Generate Trip Clicked ✅");

    // --- Validation (Keep your existing validation logic) ---
    if (!formData?.location?.label) { toast("❌ Missing location"); return; }
    if (!formData?.noOfDays?.toString().trim()) { toast("❌ Missing number of days"); return; }
    if (parseInt(formData?.noOfDays) > 14) { toast("❌ Please enter travel days below 15"); return; }
    if (!formData?.budget) { toast("❌ Missing budget"); return; }
    if (!formData?.traveler) { toast("❌ Missing traveler"); return; }
    if (!formData?.personality) { toast("❌ Missing personality"); return; }
    
    toast("✅ Calling the AI... this may take a moment!");
    setLoading(true);

    try {
      // --- SINGLE, SECURE CALL TO YOUR FIREBASE FUNCTION ---
      const result = await generateTripWithEvents({ formData });
      
      const { success, tripData } = result.data;

      if (success && tripData) {
        console.log("✅ Trip data received from Firebase Function:", tripData);
        await saveTripToFirestore(tripData);
      } else {
        throw new Error("Trip generation failed. Received no data.");
      }

    } catch (err) {
      console.error("🔥 Error calling Firebase Function:", err);
      toast("Something went wrong! " + err.message);
      setLoading(false);
    }
  };



  // ---------- Save (unchanged) ----------
   const saveTripToFirestore = async (tripData) => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || !user.email) {
      console.error("User not found in localStorage");
      setLoading(false);
      return;
    }
    
    const docId = Date.now().toString();

    await setDoc(doc(db, "Trips", docId), {
      userChoice: formData,
      tripData: tripData, // The complete data from your function
      userEmail: user.email,
      id: docId,
      createdAt: new Date(),
    });

    console.log("✅ Trip saved to Firebase successfully!");
    setLoading(false);
    navigate(`/view-trip/${docId}`);
  };

  // ---------- Render ----------
  return (
    <div className="bg-dark-bg dark:bg-white text-white dark:text-black min-h-screen">
      {loading && <LoadingScreen text="SYNTHESIZING ITINERARY..." />}

      <Header />
      <div className='sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-10'>
        <motion.h2
          className='font-bold text-3xl text-neon-pink'
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          Tell us your travel preference 🏕️🌴
        </motion.h2>

        <motion.p
          className='mt-3 text-neon-cyan text-xl'
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          Just provide some basic information and our trip planner will generate a customized itinerary based on your preference
        </motion.p>

        <div className='mt-16 flex flex-col gap-8'>
          {/* Location (unchanged) */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h2 className='text-xl font-semibold mb-2'>What is destination of choice?</h2>
            <GooglePlacesAutocomplete
              apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
              selectProps={{
                value: place,
                onChange: (v) => {
                  setPlace(v);
                  handleInputChange('location', v);
                },
                classNamePrefix: "google-places",
                styles: {
                  control: (base) => ({
                    ...base,
                    backgroundColor: "#000",
                    borderColor: "#2dd4bf",
                    color: "#67e8f9",
                    borderRadius: "0.375rem",
                    padding: "0.25rem",
                    fontSize: "1rem",
                    boxShadow: "0 0 5px #0ff",
                    transition: "0.3s",
                  }),
                  input: (base) => ({ ...base, color: "#67e8f9" }),
                  singleValue: (base) => ({ ...base, color: "#67e8f9" }),
                  menu: (base) => ({
                    ...base,
                    backgroundColor: "#0f172a",
                    borderRadius: "0.5rem",
                    marginTop: "4px",
                    padding: "0.25rem 0",
                  }),
                  option: (base, state) => ({
                    ...base,
                    backgroundColor: state.isFocused ? "#2dd4bf" : "#0f172a",
                    color: state.isFocused ? "#0f172a" : "#67e8f9",
                    padding: "0.75rem 1rem",
                    cursor: "pointer",
                    transition: "all 0.2s",
                  }),
                },
              }}
            />
          </motion.div>

          {/* Days (unchanged) */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h2 className='text-xl font-semibold mb-2'>How many days are you planning your trip?</h2>
            <Input
              type="number"
              placeholder={'Ex.3'}
              onChange={(e) => handleInputChange('noOfDays', e.target.value)}
            />
          </motion.div>

          {/* Budget (unchanged) */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h2 className='text-xl font-semibold mb-4'>What is your Budget for the trip?</h2>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-5'>
              {SelectBudgetOptions.map((item, index) => (
                <motion.div
                  key={index}
                  onClick={() => handleInputChange('budget', item.title)}
                  variants={fadeInUp}
                  className={`p-5 border rounded-xl transition-all
                    ${formData?.budget === item.title
                      ? 'border-neon-pink shadow-neon-pulse scale-105'
                      : 'border-gray-600 dark:border-gray-300 hover:border-neon-cyan hover:shadow-neon-pulse hover:scale-105'}
                    bg-[#1a1f2e] dark:bg-gray-100 dark:text-black`}
                >
                  <div className="text-neon-green text-3xl mb-2">{item.icon}</div>
                  <h2 className='font-bold text-lg text-white'>{item.title}</h2>
                  <p className='text-gray-400'>{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Traveler (unchanged) */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h2 className='text-xl font-semibold my-4'>Who do you plan to travel with on your next adventure?</h2>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-5'>
              {SelectTravelsList.map((item, index) => (
                <motion.div
                  key={index}
                  onClick={() => handleInputChange('traveler', item.people)}
                  variants={fadeInUp}
                  className={`p-5 border rounded-xl transition-all bg-[#1a1f2e] 
                    ${formData?.traveler === item.people
                      ? 'border-neon-cyan shadow-neon-pulse scale-105'
                      : 'border-gray-600 hover:border-neon-pink hover:shadow-neon-pulse hover:scale-105'}`}
                >
                  <div className="text-neon-pink text-3xl mb-2">{item.icon}</div>
                  <h2 className='font-bold text-lg text-white'>{item.title}</h2>
                  <p className='text-gray-400'>{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* --- NEW: Personality Selection --- */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h2 className='text-xl font-semibold my-4'>What's your travel personality?</h2>
            <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5'>
              {SelectPersonalityOptions.map((item, index) => (
                <motion.div
                  key={index}
                  onClick={() => handleInputChange('personality', item.type)}
                  variants={fadeInUp}
                  className={`p-5 border rounded-xl transition-all bg-[#1a1f2e] 
                    ${formData?.personality === item.type
                      ? 'border-neon-pink shadow-neon-pulse scale-105' // Highlight with pink for personality
                      : 'border-gray-600 hover:border-neon-cyan hover:shadow-neon-pulse hover:scale-105'}`}
                >
                  <div className="text-neon-green text-3xl mb-2">{item.icon}</div>
                  <h2 className='font-bold text-lg text-white'>{item.title}</h2>
                  <p className='text-gray-400'>{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Button (unchanged) */}
          <motion.div
            className='text-right'
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <Button
              disabled={loading}
              className='my-10 bg-gradient-to-r from-neon-pink to-neon-green text-white px-6 py-2 rounded-full hover:shadow-neon-pulse transition-all'
              onClick={onGenerateTrip}
            >
              {loading
                ? <AiOutlineLoading3Quarters className='h-7 w-7 animate-spin' />
                : "Generate Trip"}
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default TripForm;