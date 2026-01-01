import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { AuthProvider } from "./context/AuthContext";

import FluidCursor from "./components/common/FluidCursor";
import LoadingPage from "./components/common/LoadingPage";
import ProtectedRoute from "./components/common/ProtectedRoute";

import "./assets/styles/main.scss";

// Lazy-loaded pages
const Home = lazy(() => import("./components/home/Home"));
const About = lazy(() => import("./components/about/About"));
const Services = lazy(() => import("./components/services/Services"));
const Portfolio = lazy(() => import("./components/portfolio/Portfolio"));
const MobileAppDashboardDetails = lazy(() => import("./components/portfolio/MobileAppDashboardDetails"));
const MarketingWebsiteDetails = lazy(() => import("./components/portfolio/MarketingWebsiteDetails"));
const EcommerceDetails = lazy(() => import("./components/portfolio/EcommerceDetails"));
const WebApplicationDetails = lazy(() => import("./components/portfolio/WebApplicationDetails"));
const Contact = lazy(() => import("./components/contact/ContactNew"));
const Booking = lazy(() => import("./components/booking/Booking"));
const AuthPage = lazy(() => import("./components/auth/AuthPage"));
const NotFound = lazy(() => import("./components/common/NotFound"));
const TawkTo = lazy(() => import("./components/common/TawkTo"));
const ScrollToTop = lazy(() => import("./components/common/ScrollToTop"));
const Maintenance = lazy(() => import("./components/common/Maintenance"));

// Layout
const Header = lazy(() => import("./components/layout/Header"));
const Footer = lazy(() => import("./components/layout/Footer"));

function App() {
  const isMaintenanceMode = false;

  return (
    <Router>
      <AuthProvider>
        <Suspense fallback={<LoadingPage />}>
          {isMaintenanceMode ? (
            <Maintenance />
          ) : (
            <div className="App">
              <FluidCursor />
              <ScrollToTop />
              <Header />

              <main>
                <AnimatePresence mode="wait">
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/services" element={<Services />} />
                    <Route path="/portfolio" element={<Portfolio />} />
                    <Route path="/portfolio/mobile-app-dashboard" element={<MobileAppDashboardDetails />} />
                    <Route path="/portfolio/marketing-website" element={<MarketingWebsiteDetails />} />
                    <Route path="/portfolio/ecommerce-platform" element={<EcommerceDetails />} />
                    <Route path="/portfolio/web-application" element={<WebApplicationDetails />} />
                    <Route 
                      path="/booking" 
                      element={
                        <ProtectedRoute>
                          <Booking />
                        </ProtectedRoute>
                      } 
                    />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/login" element={<AuthPage initialMode="login" />} />
                    <Route path="/signup" element={<AuthPage initialMode="signup" />} />
                    <Route path="/loading" element={<LoadingPage />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </AnimatePresence>
              </main>

              <Footer />
              {/* <TawkTo /> */}
            </div>
          )}
        </Suspense>
      </AuthProvider>
    </Router>
  );
}

export default App;
