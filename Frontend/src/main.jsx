import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import CreateTrip from './create-trip';
import AuthPage from './auth/AuthPage.jsx';
import SignUpPage from './auth/SignUpPage.jsx';


import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom'

// Define router with routes
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  // Example of another route:
  {
    path: '/create-trip',
    element: <CreateTrip />, // Make sure to import CreateTrip component
  },
   {
    path: '/auth',
    element: <AuthPage/>, // 👈 Add this
  },
   { path: '/signup', element: <SignUpPage /> },
])

// Mount the router
createRoot(document.getElementById('root')).render(
  <StrictMode>
    
    <RouterProvider router={router} />
  </StrictMode>
)


