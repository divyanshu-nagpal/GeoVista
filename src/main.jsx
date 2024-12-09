import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import CreateTrip from './pages/create-trip'
import Header from './components/custom/Header'
import { Toaster } from './components/ui/toaster'
import { GoogleOAuthProvider } from '@react-oauth/google';
import Viewtrip from './pages/view-trip/[tripId]'
import MyTrips from './pages/my-trips'
import DashboardHome from './pages/home-page'
import LocationDetector from './pages/image-detector/LocationDetector'
import DashboardFooter from './components/custom/Footer'
import ProtectedRoute from './components/custom/ProtectedRoute'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />
  },
  {
    path: '/create-trip',
    element: (
      <ProtectedRoute>
        <CreateTrip />
      </ProtectedRoute>
    )
  },
  {
    path: '/home-page',
    element: (
      <ProtectedRoute>
        <DashboardHome />
      </ProtectedRoute>
    )
  },
  {
    path: '/view-trip/:tripId',
    element: (
      <ProtectedRoute>
        <Viewtrip />
      </ProtectedRoute>
    )
  },
  {
    path: '/my-trips',
    element: (
      <ProtectedRoute>
        <MyTrips />
      </ProtectedRoute>
    )
  },
  {
    path: '/image-detect',
    element: (
      <ProtectedRoute>
        <LocationDetector />
      </ProtectedRoute>
    )
  },
  // Default fallback route
  {
    path: '*',
    element: <App />,

  },
])


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID}>
      <Header router={router}/>
      <Toaster/>
      <RouterProvider router={router} />
      <DashboardFooter router={router}/>
    </GoogleOAuthProvider>
  </StrictMode>,
)