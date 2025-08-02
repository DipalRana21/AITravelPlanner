import React from 'react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import CreateTrip from './create-trip'
import AuthPage from './auth/AuthPage.jsx'
import SignUpPage from './auth/SignUpPage.jsx'

import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom'

import { GoogleOAuthProvider } from '@react-oauth/google'
import { Toaster } from "@/components/ui/sonner"
import Viewtrip from './view-trip/[tripId]/index.jsx'



// ✅ Environment variable (must start with VITE_)
const clientId = import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID;


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/create-trip',
    element: <CreateTrip />,
  },
  {
    path: '/auth',
    element: <AuthPage />,
  },
  {
    path: '/signup',
    element: <SignUpPage />,
  },

  {
    path:'/view-trip/:tripId',
    element:<Viewtrip />
  }



]);


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={clientId}>
      <Toaster position="top-right" richColors /> 
      <RouterProvider router={router} />
    </GoogleOAuthProvider>
  </StrictMode>
);
