import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

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

// Create a PrivateRoute component
const PrivateRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) {
    return <div>Loading...</div>;
  }
  
  return isAuthenticated ? children : <Navigate to="/login" />;
};

// Create theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#1a237e', // Deep navy blue
    },
    secondary: {
      main: '#2e7d32', // Green for growth
    },
    background: {
      default: '#f5f5f5',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 500,
    },
    h2: {
      fontWeight: 500,
    },
    h3: {
      fontWeight: 500,
    },
  },
});

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
            
            {/* Fallback route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
