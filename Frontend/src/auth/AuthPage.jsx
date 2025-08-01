

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import GoogleAuthButton from '@/components/GoogleAuthButton';
import { useGoogleLogin } from '@react-oauth/google';
import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth } from '@/firebase';

export default function SignInPage() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
//     try {
//   await axios.post(
//   'http://localhost:5000/api/users/login',
//   formData,
//   { withCredentials: true }
// ).then((res) => {
//   localStorage.setItem("user", JSON.stringify(res.data.user)); // ✅ Save full user object
//   navigate('/');
// });

 
//     } catch (error) {
//       alert(error.response?.data?.message || 'Login failed');
//     }

 try {
    const userCredential = await signInWithEmailAndPassword(auth, formData.email, formData.password);
    const user = userCredential.user;
    localStorage.setItem("user", JSON.stringify({
      uid: user.uid,
      email: user.email,
    }));
    navigate('/');
  } catch (error) {
    console.error("Firebase login failed:", error);
    alert(error.message);
  }
  };

//  const handleGoogleLogin = useGoogleLogin({
//   onSuccess: async (tokenResponse) => {
//     try {
  
//       const googleRes = await axios.get(
//         `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenResponse.access_token}`,
//         {
//           headers: {
//             Authorization: `Bearer ${tokenResponse.access_token}`,
//             Accept: 'application/json',
//           },
//         }
//       );

//       const { email, name, id: googleId } = googleRes.data;

//       // Send to your backend to register/login the user
//       const backendRes = await axios.post(
//         'http://localhost:5000/api/users/google', 
//         { email, name, googleId },
//         { withCredentials: true } 
//       );

//       // Save backend returned user to localStorage (optional)
//       localStorage.setItem('user', JSON.stringify(backendRes.data.user));


//       navigate('/');
//     } catch (error) {
//       console.error('Google login failed', error);
//     }
//   },
//   onError: (error) => console.log('Google OAuth Error', error),
// });


const handleGoogleLogin = async () => {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    localStorage.setItem("user", JSON.stringify({
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
    }));
    navigate('/');
  } catch (error) {
    console.error("Firebase Google login failed:", error);
    alert(error.message);
  }
};

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-dark-bg text-white">
      <div className="hidden md:flex w-1/2 bg-gradient-to-br from-neon-green to-neon-pink items-center justify-center p-10">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-extrabold tracking-tight">Welcome Back</h1>
          <p className="text-lg text-white/80">Continue your journey and explore personalized trip plans.</p>
          <img src="/a.svg" alt="Sign In Travel" className="max-w-xs mx-auto" />
        </div>
      </div>

      <div className="w-full md:w-1/2 p-8 md:p-16 flex items-center justify-center">
        <div className="w-full max-w-md space-y-6">
          <h2 className="text-3xl font-bold text-neon-green text-center">Sign In</h2>
          <p className="text-sm text-gray-400 text-center">Welcome back, explorer 👋</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 rounded bg-[#0f172a] border border-gray-700"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-3 rounded bg-[#0f172a] border border-gray-700"
            />

            <button type="submit" className="w-full py-3 rounded bg-gradient-to-r from-neon-green to-neon-pink text-white font-semibold">
              Sign In
            </button>

             <GoogleAuthButton onClick={handleGoogleLogin} />
          </form>

          <p className="text-center text-sm text-gray-400">
            Don’t have an account?{' '}
            <Link to="/signup" className="text-neon-pink hover:underline">Create free account</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
