import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ProtectedRoute } from './components/ProtectedRoute';

// Pages
import { Home } from './pages/Home';
import { About } from './pages/About';
import { HowItWorks } from './pages/HowItWorks';
import { Departments } from './pages/Departments';
import { ContactUs } from './pages/ContactUs';
import { FAQ } from './pages/FAQ';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { GrievanceTrack } from './pages/GrievanceTrack';
import { CitizenDashboard } from './pages/CitizenDashboard';
import { GrievanceSubmit } from './pages/GrievanceSubmit';
import { GrievanceDetail } from './pages/GrievanceDetail';
import { CMODashboard } from './pages/CMODashboard';
import { OfficerDashboard } from './pages/OfficerDashboard';

export const App: React.FC = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
          <Navbar />
          <main className="flex-1">
            <Routes>
              {/* Public Pages */}
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/how-it-works" element={<HowItWorks />} />
              <Route path="/departments" element={<Departments />} />
              <Route path="/contact" element={<ContactUs />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/track" element={<GrievanceTrack />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              {/* Citizen Routes */}
              <Route
                path="/citizen-dashboard"
                element={
                  <ProtectedRoute allowedRoles={['CITIZEN']}>
                    <CitizenDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/citizen/submit"
                element={
                  <ProtectedRoute allowedRoles={['CITIZEN']}>
                    <GrievanceSubmit />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/citizen/grievance/:id"
                element={
                  <ProtectedRoute allowedRoles={['CITIZEN']}>
                    <GrievanceDetail />
                  </ProtectedRoute>
                }
              />

              {/* CMO Admin Routes */}
              <Route
                path="/cmo-dashboard"
                element={
                  <ProtectedRoute allowedRoles={['CMO_ADMIN']}>
                    <CMODashboard />
                  </ProtectedRoute>
                }
              />

              {/* Department Officer Routes */}
              <Route
                path="/officer-dashboard"
                element={
                  <ProtectedRoute allowedRoles={['DEPARTMENT_OFFICER']}>
                    <OfficerDashboard />
                  </ProtectedRoute>
                }
              />

              {/* Fallback */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
