// import { Link, useNavigate } from 'react-router-dom';
// import { Button } from './button.jsx';
// import { Sun, Moon } from 'lucide-react';
// import { useEffect, useState } from 'react';
// import axios from 'axios'; // make sure this is iported
// import TripMindSVG from "../../../assets/tripmind-logo.svg"; 
// export default function Header() {
//   const navigate = useNavigate();
//   const [isDark, setIsDark] = useState(false);

//   useEffect(() => {
//     const isDarkMode = document.documentElement.classList.contains('dark');
//     setIsDark(isDarkMode);
//   }, []);

//   const toggleTheme = () => {
//     document.documentElement.classList.toggle('dark');
//     setIsDark(prev => !prev);
//   };

//   const handleLogout = async () => {
//     try {
//       await axios.get("http://localhost:5000/api/users/logout", {
//         withCredentials: true,
//       });
//       navigate("/auth");
//     } catch (error) {
//       console.error('Logout failed:', error);
//     }
//   };

//   return (
//     <header className="sticky top-0 z-50 bg-gradient-to-r from-[#0f172a] via-[#1e293b] to-[#0f172a] dark:from-gray-100 dark:via-gray-300 dark:to-gray-100 text-white dark:text-black px-6 py-4 shadow-lg flex justify-between items-center">
      
//       <div className="flex items-center gap-4">
       
//         <img src={TripMindSVG} alt="Logo" className="h-10 w-auto" />

//         {/* 🌗 Dark mode toggle button */}
//         <button
//           onClick={toggleTheme}
//           className="p-2 rounded-full border border-white dark:border-black bg-black dark:bg-white text-white dark:text-black hover:scale-110 transition"
//           title="Toggle Theme"
//         >
//           {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
//         </button>
//       </div>

//       <div>
//         <Button
//           variant="dopamine"
//           size="sm"
//           onClick={handleLogout}
//           className="rounded-full px-5 shadow-md hover:scale-105 transition-transform duration-200"
//         >
//           Logout
//         </Button>
//       </div>
//     </header>
//   );
// }


// src/components/Header.jsx

import { Link, useNavigate } from 'react-router-dom';
import { Button } from './button.jsx';
import { Sun, Moon, UserRound } from 'lucide-react'; // Import UserRound icon
import { useEffect, useState } from 'react';
import axios from 'axios';
import TripMindSVG from "../../../assets/tripmind-logo.svg";
import { getAuth, onAuthStateChanged } from 'firebase/auth'; // Import Firebase Auth
import { app } from '@/firebase'; // Import your Firebase app instance

export default function Header() {
  const navigate = useNavigate();
  const [isDark, setIsDark] = useState(false);
  const [user, setUser] = useState(null); // State to hold user data

  // Effect to check for dark mode
  useEffect(() => {
    const isDarkMode = document.documentElement.classList.contains('dark');
    setIsDark(isDarkMode);
  }, []);

  // Effect to listen for Firebase auth state changes
  useEffect(() => {
    const auth = getAuth(app);
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    // Cleanup subscription on component unmount
    return () => unsubscribe();
  }, []);

  const toggleTheme = () => {
    document.documentElement.classList.toggle('dark');
    setIsDark(prev => !prev);
  };

  const handleLogout = async () => {
    try {
      await axios.get("http://localhost:5000/api/users/logout", {
        withCredentials: true,
      });
      navigate("/auth");
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-[#0f172a] via-[#1e293b] to-[#0f172a] dark:from-gray-100 dark:via-gray-300 dark:to-gray-100 text-white dark:text-black px-6 py-4 shadow-lg flex justify-between items-center">
      
      {/* Left side: Logo and Theme Toggle */}
      <div className="flex items-center gap-4">
        <img src={TripMindSVG} alt="Logo" className="h-10 w-auto" />
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full border border-white dark:border-black bg-black dark:bg-white text-white dark:text-black hover:scale-110 transition"
          title="Toggle Theme"
        >
          {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
      </div>

      {/* Right side: Actions */}
      <div className="flex items-center gap-4">
        {/* My Trips Button */}
        <Link to="/my-trips">
          <Button
          variant="dopamine"
            size="sm"
            className="rounded-full px-5 shadow-md hover:scale-105 transition-transform duration-200"
            // className="rounded-full px-5  shadow-cyan-400/80 border-cyan-400 text-black bg-cyan-400 hover:bg-cyan-400 hover:text-slate-900 hover:shadow-lg hover:shadow-cyan-400/50 font-semibold transition-all duration-300 transform hover:scale-105"
          >
            My Trips
          </Button>
        </Link>
        
        {/* Profile Icon/Image */}
         <div className="h-10 w-10 rounded-full bg-indigo-600 dark:bg-indigo-500 flex items-center justify-center overflow-hidden border-2 border-white/50 font-bold text-white text-lg">
          {user ? (
            user.photoURL ? (
              <img 
                src={user.photoURL.replace('http://', 'https://')} 
                alt={user.displayName || 'Profile'}
                className="h-full w-full object-cover" 
                referrerPolicy="no-referrer" // <-- ADD THIS ATTRIBUTE
              />
            ) : (
              <span>
                {user.displayName?.charAt(0).toUpperCase() || user.email?.charAt(0).toUpperCase()}
              </span>
            )
          ) : (
            <UserRound className="h-6 w-6 text-slate-400" />
          )}
        </div>
        
        {/* Logout Button */}
        <Button
          variant="dopamine"
          size="sm"
          onClick={handleLogout}
          className="rounded-full px-5 shadow-md hover:scale-105 transition-transform duration-200"
        >
          Logout
        </Button>
      </div>
    </header>
  );
}