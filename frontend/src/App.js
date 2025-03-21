import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// Theme
import theme from './theme';

// Context Providers
import { AuthProvider, useAuth } from './contexts/AuthContext';

// Layout Components
import MainLayout from './components/Layout/MainLayout';

// Auth Components
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import ForgotPassword from './components/Auth/ForgotPassword';
import Profile from './components/Auth/Profile';

// Dashboard Components
import Dashboard from './components/Dashboard/Dashboard';

// Letter Components
import LetterList from './components/Letters/LetterList';
import LetterForm from './components/Letters/LetterForm';
import LetterDetail from './components/Letters/LetterDetail';

// Subscription Components
import Plans from './components/Subscription/Plans';
import Checkout from './components/Subscription/Checkout';
import SubscriptionStatus from './components/Subscription/SubscriptionStatus';

// Affiliate Components
import AffiliateLinks from './components/Affiliate/AffiliateLinks';

// Support Components
import FAQ from './components/Support/FAQ';
import Contact from './components/Support/Contact';
import TicketList from './components/Support/TicketList';

// Create a PrivateRoute component
const PrivateRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) {
    return <div>Loading...</div>;
  }
  
  return isAuthenticated ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <Router>
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/faq" element={
              <MainLayout>
                <FAQ />
              </MainLayout>
            } />
            <Route path="/contact" element={
              <MainLayout>
                <Contact />
              </MainLayout>
            } />
            
            {/* Protected Routes */}
            <Route path="/" element={
              <PrivateRoute>
                <MainLayout>
                  <Dashboard />
                </MainLayout>
              </PrivateRoute>
            } />
            
            <Route path="/profile" element={
              <PrivateRoute>
                <MainLayout>
                  <Profile />
                </MainLayout>
              </PrivateRoute>
            } />
            
            <Route path="/letters" element={
              <PrivateRoute>
                <MainLayout>
                  <LetterList />
                </MainLayout>
              </PrivateRoute>
            } />
            
            <Route path="/letters/new" element={
              <PrivateRoute>
                <MainLayout>
                  <LetterForm />
                </MainLayout>
              </PrivateRoute>
            } />
            
            <Route path="/letters/:id" element={
              <PrivateRoute>
                <MainLayout>
                  <LetterDetail />
                </MainLayout>
              </PrivateRoute>
            } />
            
            <Route path="/letters/edit/:id" element={
              <PrivateRoute>
                <MainLayout>
                  <LetterForm />
                </MainLayout>
              </PrivateRoute>
            } />
            
            <Route path="/subscription/plans" element={
              <PrivateRoute>
                <MainLayout>
                  <Plans />
                </MainLayout>
              </PrivateRoute>
            } />
            
            <Route path="/subscription/checkout" element={
              <PrivateRoute>
                <MainLayout>
                  <Checkout />
                </MainLayout>
              </PrivateRoute>
            } />
            
            <Route path="/subscription/status" element={
              <PrivateRoute>
                <MainLayout>
                  <SubscriptionStatus />
                </MainLayout>
              </PrivateRoute>
            } />
            
            <Route path="/affiliates" element={
              <PrivateRoute>
                <MainLayout>
                  <AffiliateLinks />
                </MainLayout>
              </PrivateRoute>
            } />

            <Route path="/support/tickets" element={
              <PrivateRoute>
                <MainLayout>
                  <TicketList />
                </MainLayout>
              </PrivateRoute>
            } />
            
            {/* Fallback route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
