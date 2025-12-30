import React, { Suspense, lazy, useEffect } from 'react';
import FluidCursor from './components/common/FluidCursor';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { useAuth } from './context/AuthContext';

// Import global styles
import './assets/styles/main.scss';

// Lazy load components
const Home = lazy(() => import('./components/home/Home'));
const About = lazy(() => import('./components/about/About'));
const Services = lazy(() => import('./components/services/Services'));
const Portfolio = lazy(() => import('./components/portfolio/Portfolio'));
const Contact = lazy(() => import('./components/contact/ContactNew'));
const AuthPage = lazy(() => import('./components/auth/AuthPage'));
const NotFound = lazy(() => import('./components/common/NotFound'));
const Booking = lazy(() => import('./components/booking/Booking'));
const TawkTo = lazy(() => import('./components/common/TawkTo'));
const ScrollToTop = lazy(() => import('./components/common/ScrollToTop'));

// Layout components
const Header = lazy(() => import('./components/layout/Header'));
const Footer = lazy(() => import('./components/layout/Footer'));

// Loading component
const Loading = () => (
  <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
    <div className="spinner-border" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  </div>
);

const CursorLayer = () => {
  const location = useLocation();
  const hideCursor = location.pathname === '/auth';
  if (hideCursor) return null;
  return <FluidCursor />;
};

function App() {
  const ProtectedRoute = ({ children }) => {
    const { isAuthenticated } = useAuth();
    const location = useLocation();

    if (isAuthenticated) return children;

    return (
      <Navigate
        to="/auth"
        replace
        state={{ from: location.pathname }}
      />
    );
  };

  // Handle page refresh
  useEffect(() => {
    window.onbeforeunload = function () {
      window.scrollTo(0, 0);
    };
    return () => {
      window.onbeforeunload = null;
    };
  }, []);

  return (
    <Router>
      <div className="App">
        <CursorLayer />
        <Suspense fallback={<Loading />}>
          <ScrollToTop />
          <Header />
          <main>
            <AnimatePresence mode="wait">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/services" element={<Services />} />
                <Route path="/portfolio" element={<Portfolio />} />
                <Route
                  path="/booking"
                  element={
                    <ProtectedRoute>
                      <Booking />
                    </ProtectedRoute>
                  }
                />
                <Route path="/contact" element={<Contact />} />
                <Route path="/auth" element={<AuthPage />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </AnimatePresence>
          </main>
          <Footer />
          <TawkTo />
        </Suspense>
      </div>
    </Router>
  );
}

export default App;
