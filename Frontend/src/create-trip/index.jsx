import React, { useEffect, useState } from 'react';
import Header from "../components/ui/custom/Header.jsx";
import { Input } from "@/components/ui/input";
import { AI_PROMPT, SelectBudgetOptions, SelectTravelsList } from '@/constants/options.jsx';
import { Button } from "../components/ui/custom/button";
import { motion } from "framer-motion";
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import {FcGoogle} from "react-icons/fc";
import axios from "axios";
import { toast } from 'sonner';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useGoogleLogin } from '@react-oauth/google';
import { sendPromptToGemini } from '@/service/AIModel.jsx';


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

  const [opendialog,setOpenDialog] =useState();

  const handleInputChange = (name, value) => {

    setFormData({
      ...formData,
      [name]: value
    }

    )
  }

  useEffect(() => {
    console.log(formData);
  }, [formData])




  const login=useGoogleLogin({
    onSuccess:(codeResp)=> getUserProfile(codeResp),
    onError:(error)=>console.log(error)
  })

  const onGenerateTrip= async()=>{

     console.log("Generate Trip Clicked ✅");
 
    
  try {
 
    if (!formData?.location || !formData.location?.label) {
      toast("❌ Missing location");
      return;
    }

    if (!formData?.noOfDays?.toString().trim() ) {
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

    toast("✅ Trip input looks good!");
  } catch (err) {
    console.error("🔥 Error in onGenerateTrip:", err);
    toast("Something went wrong!");
  }


  const FINAL_PROMPT=AI_PROMPT
  .replace('{location}', formData?.location?.label)
  .replace('{totalDays}', formData?.noOfDays)
  .replace('{traveler}', formData?.traveler)
  .replace('{budget}',formData?.budget)
   .replace('{totalDays}', formData?.noOfDays)

    console.log(FINAL_PROMPT)

const result = await sendPromptToGemini(FINAL_PROMPT);
if (result) {
  console.log("🧾 Final Travel Plan:\n", result);
  // You can optionally parse and display this in UI
}

  }

 

  return (
    <div className="bg-dark-bg min-h-screen text-white font-exo">
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

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h2 className='text-xl font-semibold mb-2'>What is destination of choice?</h2>
            {/* GooglePlacesAutocomplete goes here */}

            <GooglePlacesAutocomplete
              apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
              selectProps={{
                place,
                onChange: (v) => { setPlace(v); handleInputChange('location', v) }
              }} />

          </motion.div>

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
                  className={`p-5 border rounded-xl transition-all bg-[#1a1f2e] 
  ${formData?.budget === item.title
                      ? 'border-neon-pink shadow-neon-pulse scale-105'
                      : 'border-gray-600 hover:border-neon-cyan hover:shadow-neon-pulse hover:scale-105'}`}
                >
                  <div className="text-neon-green text-3xl mb-2">{item.icon}</div>
                  <h2 className='font-bold text-lg text-white'>{item.title}</h2>
                  <p className='text-gray-400'>{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

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

          <motion.div
            className='text-right'
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <Button className='my-10 bg-gradient-to-r from-neon-pink to-neon-green text-white px-6 py-2 rounded-full hover:shadow-neon-pulse transition-all'
            onClick={onGenerateTrip}>
              Generate Trip
            </Button>

          </motion.div>

        </div>
      </div>
    </div>
  )
}

export default TripForm;
