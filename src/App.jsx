import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import FluidCursor from "./components/common/FluidCursor";

import "./assets/styles/main.scss";

// Lazy-loaded pages
const Home = lazy(() => import("./components/home/Home"));
const About = lazy(() => import("./components/about/About"));
const Services = lazy(() => import("./components/services/Services"));
const Portfolio = lazy(() => import("./components/portfolio/Portfolio"));
const Contact = lazy(() => import("./components/contact/ContactNew"));
const Booking = lazy(() => import("./components/booking/Booking"));
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
      {/* 🔥 SINGLE SOURCE OF TRUTH */}
      <Suspense>
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
                  <Route path="/booking" element={<Booking />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </AnimatePresence>
            </main>

            <Footer />
            {/* <TawkTo /> */}
          </div>
        )}
      </Suspense>
    </Router>
  );
}

export default App;
