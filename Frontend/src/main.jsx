import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

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
  // {
  //   path: '/create-trip',
  //   element: <CreateTrip />, // Make sure to import CreateTrip component
  // }
])

// Mount the router
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
