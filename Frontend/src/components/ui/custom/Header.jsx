import { Link, useNavigate } from 'react-router-dom';
import { Button } from './button.jsx';
import { Sun, Moon } from 'lucide-react';
import { useEffect, useState } from 'react';
import axios from 'axios'; // make sure this is iported

export default function Header() {
  const navigate = useNavigate();
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const isDarkMode = document.documentElement.classList.contains('dark');
    setIsDark(isDarkMode);
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
      
      <div className="flex items-center gap-4">
       
        <img src="/logoipsum-custom-logo.svg" alt="Logo" className="h-10 w-auto" />

        {/* 🌗 Dark mode toggle button */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full border border-white dark:border-black bg-black dark:bg-white text-white dark:text-black hover:scale-110 transition"
          title="Toggle Theme"
        >
          {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
      </div>

      <div>
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
