// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.jsx'
// import CreateTrip from './create-trip';
// import AuthPage from './auth/AuthPage.jsx';
// import SignUpPage from './auth/SignUpPage.jsx';
// import React from "react";



// import {
//   createBrowserRouter,
//   RouterProvider,
// } from 'react-router-dom'
// import { GoogleOAuthProvider } from '@react-oauth/google';

// // Define router with routes
// const router = createBrowserRouter([
//   {
//     path: '/',
//     element: <App />,
//   },
//   // Example of another route:
//   {
//     path: '/create-trip',
//     element: <CreateTrip />, // Make sure to import CreateTrip component
//   },
//    {
//     path: '/auth',
//     element: <AuthPage/>, // 👈 Add this
//   },
//    { path: '/signup', element: <SignUpPage /> },
// ])

// // Mount the router
// // createRoot(document.getElementById('root')).render(
// //   <StrictMode>
// //     <GoogleOAuthProvider clientId={import.meta.env.GOOGLE_AUTH_CLIENT_ID}>
// //       <RouterProvider router={router} />
// //     </GoogleOAuthProvider>
    
// //   </StrictMode>
// // )

// const clientId = import.meta.env.GOOGLE_AUTH_CLIENT_ID;

// createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <GoogleOAuthProvider clientId={clientId}>
//       <App />
//     </GoogleOAuthProvider>
//   </React.StrictMode>
// );


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
]);


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={clientId}>
      <RouterProvider router={router} />
    </GoogleOAuthProvider>
  </StrictMode>
);
