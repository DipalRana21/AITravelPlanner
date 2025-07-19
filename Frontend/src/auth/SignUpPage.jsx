import React from 'react';
import { Link } from 'react-router-dom';

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-dark-bg text-white">
      
      {/* Side Panel */}
      <div className="hidden md:flex w-1/2 bg-gradient-to-br from-neon-pink to-neon-green items-center justify-center p-10">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-extrabold tracking-tight">Start Your Journey</h1>
          <p className="text-lg text-white/80">
            Join our travel community and plan personalized trips like never before.
          </p>
          <img src="/b.svg" alt="Travel" className="max-w-xs mx-auto" />
        </div>
      </div>

      {/* Form Section */}
      <div className="w-full md:w-1/2 p-8 md:p-16 flex items-center justify-center">
        <div className="w-full max-w-md space-y-6">
          <h2 className="text-3xl font-bold text-neon-pink text-center">Create Your Account</h2>
          <p className="text-sm text-gray-400 text-center">It's quick and easy.</p>

          <form className="space-y-4">
            <input
              type="text"
              placeholder="Full Name"
              className="w-full p-3 rounded bg-[#0f172a] border border-gray-700 focus:outline-none focus:ring-2 focus:ring-neon-pink"
            />
            <input
              type="email"
              placeholder="Email Address"
              className="w-full p-3 rounded bg-[#0f172a] border border-gray-700 focus:outline-none focus:ring-2 focus:ring-neon-pink"
            />
            <input
              type="password"
              placeholder="Create Password"
              className="w-full p-3 rounded bg-[#0f172a] border border-gray-700 focus:outline-none focus:ring-2 focus:ring-neon-pink"
            />

            <button
              type="submit"
              className="w-full py-3 rounded bg-gradient-to-r from-neon-pink to-neon-green text-white font-semibold hover:shadow-neon-pulse transition-all"
            >
              Sign Up
            </button>
          </form>

          <p className="text-center text-sm text-gray-400">
            Already have an account?{' '}
            <Link to="/auth" className="text-neon-green hover:underline">
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
