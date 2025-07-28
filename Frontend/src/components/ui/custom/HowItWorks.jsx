import React from "react";
import { MapPin, Brain, CalendarCheck, Rocket } from "lucide-react";
import { motion } from "framer-motion";

const steps = [
  {
    icon: <MapPin size={36} />,
    title: "Picks Destinations",
    desc: "Our AI understands your preferences and suggests perfect places.",
  },
  {
    icon: <Brain size={36} />,
    title: "Plans Intelligently",
    desc: "Smart planning powered by real-time data and local insights.",
  },
  {
    icon: <CalendarCheck size={36} />,
    title: "Builds Itinerary",
    desc: "Day-by-day plans designed for balance, joy, and discovery.",
  },
  {
    icon: <Rocket size={36} />,
    title: "You Just Go",
    desc: "No hassle, no stress. Just show up and let it flow.",
  },
];

export default function HowItWorks() {
  return (
    <section className="relative z-10 py-24 bg-gradient-to-b from-[#1c263b] to-[#0f172a] dark:from-gray-100 dark:to-white text-white dark:text-black">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
          How It Works
        </h2>
        <p className="mb-12 text-gray-400 dark:text-gray-600 max-w-2xl mx-auto text-lg">
          Let AI handle the chaos of planning — and deliver pure experience.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15, duration: 0.6 }}
              viewport={{ once: true }}
              className="p-6 rounded-2xl backdrop-blur-md bg-white/5 dark:bg-black/5 border border-white/10 dark:border-black/10 shadow-lg hover:scale-105 transition-transform duration-300"
            >
              <div className="mb-4 text-cyan-400 dark:text-blue-600">{step.icon}</div>
              <h3 className="text-xl font-bold mb-2">{step.title}</h3>
              <p className="text-sm text-gray-300 dark:text-gray-700">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
