import React, { useState } from 'react';
import Header from "../components/ui/custom/Header.jsx";
import { Input } from "@/components/ui/input";
import { SelectBudgetOptions, SelectTravelsList } from '@/constants/options.jsx';
import { Button } from "../components/ui/custom/button.jsx";
import { motion } from "framer-motion";

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

function TripForm() {
  const [formData, setFormData] = useState([]);

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
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h2 className='text-xl font-semibold mb-2'>How many days are you planning your trip?</h2>
            <Input type="number" placeholder={'Ex.3'} />
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
                  variants={fadeInUp}
                  className='p-5 border border-neon-pink rounded-xl hover:shadow-neon-pulse hover:scale-105 transition-all bg-[#1a1f2e]'
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
                  variants={fadeInUp}
                  className='p-5 border border-neon-cyan rounded-xl hover:shadow-neon-pulse hover:scale-105 transition-all bg-[#1a1f2e]'
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
            <Button className='my-10 bg-gradient-to-r from-neon-pink to-neon-green text-white px-6 py-2 rounded-full hover:shadow-neon-pulse transition-all'>
              Generate Trip
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default TripForm;
