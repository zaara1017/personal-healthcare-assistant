import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import HealthProfile from './pages/HealthProfile'
import Medications from './pages/Medications'
import Appointments from './pages/Appointements'
import HealthChat from './pages/HealthChat'
import EmergencyContacts from './pages/EmergencyContacts'
import EmergencyQR from './pages/EmergencyQR'
import EmergencyProfilePublic from './pages/EmergencyProfilePublic'
import ProtectedRoute from './components/ProtectedRoute'




function App() {
  return (
   <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50">
      <Navbar />
      <main>
        <Routes>
          <Route path="/ai-chat" 
          element={
            <ProtectedRoute>
              <HealthChat />
              </ProtectedRoute>
        } />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <HealthProfile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/medications"
            element={
              <ProtectedRoute>
                <Medications />
              </ProtectedRoute>
            }
          />
          <Route
            path="/appointments"
            element={
              <ProtectedRoute>
                <Appointments />
              </ProtectedRoute>
            }
          />
          <Route path="/emergency-contacts" element={<ProtectedRoute><EmergencyContacts /></ProtectedRoute>} />
          <Route path="/emergency-qr" element={<ProtectedRoute><EmergencyQR /></ProtectedRoute>} />
          <Route path="/emergency/:userId" element={<EmergencyProfilePublic />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </main>
    </div>
  )
}

export default App