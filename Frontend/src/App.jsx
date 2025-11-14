// src/App.jsx
import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useEffect } from "react";

import SplashScreen from './components/ui/custom/SplashScreen';
import Header from './components/ui/custom/Header';

import AuthPage from './auth/AuthPage';
import Home from './Home';


function App() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 3000); // 3s splash
    return () => clearTimeout(timer);
  }, []); 

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      {showSplash ? (
        <SplashScreen />
      ) : (
        <>
       <Header /> 
          <Routes>
             <Route path="/" element={<Home />} />
            <Route path="/auth" element={<AuthPage />} />

          </Routes>

        </>
      )}
    </div>
  );
}


export default App;
