import { Routes, Route } from 'react-router-dom';
import Hero from './components/ui/custom/Hero';
import Header from './components/ui/custom/Header';
import AuthPage from './auth/AuthPage'; // or whatever you named your SignIn UI page

function App() {
  return (
    <div className="min-h-screen">
      <Header />
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/auth" element={<AuthPage />} />
      </Routes>
    </div>


  );
}

export default App;
