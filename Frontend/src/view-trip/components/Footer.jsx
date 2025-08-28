import React from "react";
import { motion } from "framer-motion";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-full bg-gradient-to-b from-[#0e1421] to-[#1c263b] 
                 dark:from-[#0f172a] dark:to-[#0f172a] 
                 text-white dark:text-gray-100 py-6"
    >
      <div className="max-w-6xl mx-auto px-4">
        {/* Top section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-center md:text-left">
            <h2 className="text-xl font-semibold text-indigo-400">TripMind</h2>
            <p className="text-sm text-gray-400">
              Explore the world with personalized travel plans.
            </p>
          </div>

          {/* Links */}
          <div className="flex gap-6 text-sm text-gray-300">
            <a href="/about" className="hover:text-indigo-400">About</a>
            <a href="/contact" className="hover:text-indigo-400">Contact</a>
            <a href="/privacy" className="hover:text-indigo-400">Privacy</a>
          </div>

          {/* Social icons */}
          <div className="flex gap-4 text-lg">
            <a href="#" className="hover:text-indigo-400"><FaFacebook /></a>
            <a href="#" className="hover:text-indigo-400"><FaTwitter /></a>
            <a href="#" className="hover:text-indigo-400"><FaInstagram /></a>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 my-4"></div>

        {/* Bottom */}
        <div className="text-center text-sm text-gray-500">
          Created By <span className="font-semibold text-indigo-400">TripMind Owner</span> © {new Date().getFullYear()}
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
