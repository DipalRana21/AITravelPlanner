import React, { useEffect, useState } from 'react';
import Header from "../components/ui/custom/Header.jsx";
import { Input } from "@/components/ui/input";
import { AI_PROMPT, SelectBudgetOptions, SelectTravelsList } from '@/constants/options.jsx';
import { Button } from "../components/ui/custom/button";
import { motion } from "framer-motion";
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { toast } from 'sonner';
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { doc, setDoc } from 'firebase/firestore';
import { db } from '@/firebase.js';
import { useNavigate } from 'react-router-dom';
import LoadingScreen from "../components/ui/custom/LoadingScreen.jsx";

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

function TripForm() {
  const [formData, setFormData] = useState({
    location: null,
    noOfDays: '',
    budget: '',
    traveler: '',
  });

  const [place, setPlace] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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

    // Validation
    if (!formData?.location || !formData.location?.label) {
      toast("❌ Missing location");
      return;
    }
    if (!formData?.noOfDays?.toString().trim()) {
      toast("❌ Missing number of days");
      return;
    }
    if (parseInt(formData?.noOfDays) > 14) {
      toast("❌ Please enter travel days below 15");
      return;
    }
    if (!formData?.budget || !formData?.budget?.toString().trim()) {
      toast("❌ Missing budget");
      return;
    }
    if (!formData?.traveler || !formData?.traveler?.toString().trim()) {
      toast("❌ Missing traveler");
      return;
    }

    toast("✅ Ready to go!");
    setLoading(true);

    const FINAL_PROMPT = AI_PROMPT
      .replace('{location}', formData?.location?.label)
      .replace('{totalDays}', formData?.noOfDays)
      .replace('{traveler}', formData?.traveler)
      .replace('{budget}', formData?.budget)
      .replace('{totalDays}', formData?.noOfDays);

    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent?key=${import.meta.env.VITE_GOOGLE_GEMINI_API_KEY}`;
      const payload = {
        contents: [{ role: "user", parts: [{ text: FINAL_PROMPT }] }]
      };

      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      const resultText = result?.candidates?.[0]?.content?.parts?.[0]?.text;

      console.log("🧠 Gemini raw result:\n", resultText);

      if (resultText) {
        await SaveAITrip(resultText);
      } else {
        toast("❌ No trip generated");
        setLoading(false);
      }
    } catch (err) {
      console.error("❌ Gemini fetch failed:", err);
      toast("Something went wrong!");
      setLoading(false);
    }
  };

  const SaveAITrip = async (TripData) => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || !user.email) {
      console.error("User not found in localStorage");
      setLoading(false);
      return;
    }

    const docId = Date.now().toString();
    let parsedTrip;

    try {
      TripData = TripData.trim();
      if (TripData.startsWith("```json") || TripData.startsWith("```")) {
        TripData = TripData.replace(/```(?:json)?/, "").replace(/```$/, "").trim();
      }
      const safeJSON = TripData.replace(/([{,]\s*)([a-zA-Z0-9_]+)(\s*:)/g, '$1"$2"$3');
      parsedTrip = JSON.parse(safeJSON);
    } catch (err) {
      console.error("❌ JSON Parse Error:", err.message);
      toast("Invalid trip data received");
      setLoading(false);
      return;
    }

    await setDoc(doc(db, "Trips", docId), {
      userChoice: formData,
      tripData: parsedTrip,
      userEmail: user.email,
      id: docId,
      createdAt: new Date(),
    });

    console.log("✅ Trip saved to Firebase successfully!");
    setLoading(false);
    navigate(`/view-trip/${docId}`);
  };

  return (
    <div className="bg-dark-bg dark:bg-white text-white dark:text-black min-h-screen">
      {loading && <LoadingScreen text="SYNTHESIZING ITINERARY..."/>}

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
          {/* Location */}
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

          {/* Days */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h2 className='text-xl font-semibold mb-2'>How many days are you planning your trip?</h2>
            <Input type="number" placeholder={'Ex.3'}
              onChange={(e) => handleInputChange('noOfDays', e.target.value)} />
          </motion.div>

          {/* Budget */}
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

          {/* Traveler */}
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

          {/* Button */}
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
