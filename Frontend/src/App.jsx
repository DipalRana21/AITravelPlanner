// src/App.jsx
import { Routes, Route } from 'react-router-dom';

import Hero from './components/ui/custom/Hero';
import HowItWorks from './components/ui/custom/HowItWorks';
import Header from './components/ui/custom/Header';
import AuthPage from './auth/AuthPage';
import Home from './Home';

function App() {
  return (
   
      <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
        <Header />
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/auth" element={<AuthPage />} />
        </Routes>
      </div>

  );
}

export default App;
