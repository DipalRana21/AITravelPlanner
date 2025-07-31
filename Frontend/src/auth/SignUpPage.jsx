import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import GoogleAuthButton from '../components/GoogleAuthButton.jsx'; // adjust the path as needed
import { useGoogleLogin } from '@react-oauth/google';
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '@/firebase.js';


export default function SignUpPage() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
//     try {
//    await axios.post(
//   'http://localhost:5000/api/users/signup',
//   formData,
//   { withCredentials: true }
// ).then((res) => {
//   localStorage.setItem("user", JSON.stringify(res.data.user)); // ✅ Save full user object
//   navigate('/');
// });


//     } catch (error) {
//        console.error("Signup error:", error);
//       alert(error.response?.data?.message || 'Signup failed');
//     }

 try {
    const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
    const user = userCredential.user;

    // await updateProfile(user, { displayName: formData.name });

    localStorage.setItem("user", JSON.stringify({
      uid: user.uid,
      email: user.email,
      // displayName: user.displayName,
    }));
    navigate('/');
  } catch (error) {
    console.error("Firebase signup failed:", error);
    alert(error.message);
  }
  };


// const handleGoogleLogin = useGoogleLogin({
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

//       localStorage.setItem("userId", backendRes.data.user);
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
      <div className="hidden md:flex w-1/2 bg-gradient-to-br from-neon-pink to-neon-green items-center justify-center p-10">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-extrabold tracking-tight">Start Your Journey</h1>
          <p className="text-lg text-white/80">Join our travel community and plan personalized trips like never before.</p>
          <img src="/b.svg" alt="Travel" className="max-w-xs mx-auto" />
        </div>
      </div>

      <div className="w-full md:w-1/2 p-8 md:p-16 flex items-center justify-center">
        <div className="w-full max-w-md space-y-6">
          <h2 className="text-3xl font-bold text-neon-pink text-center">Create Your Account</h2>
          <p className="text-sm text-gray-400 text-center">It's quick and easy.</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 rounded bg-[#0f172a] border border-gray-700"
            />
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
              placeholder="Create Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-3 rounded bg-[#0f172a] border border-gray-700"
            />

            <button type="submit" className="w-full py-3 rounded bg-gradient-to-r from-neon-pink to-neon-green text-white font-semibold">
              Sign Up
            </button>

            <GoogleAuthButton onClick={handleGoogleLogin} />
    


          </form>

          <p className="text-center text-sm text-gray-400">
            Already have an account?{' '}
            <Link to="/auth" className="text-neon-green hover:underline">Sign in here</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
