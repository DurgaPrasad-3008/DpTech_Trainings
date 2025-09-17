import React, { useRef } from 'react';
import { FaWhatsapp } from 'react-icons/fa';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Benefits from './components/Benefits';
import Courses from './components/Courses';
import About from './components/About';
import TrustSection from './components/TrustSection';
import FoundingBatchSection from './components/FoundingBatchSection';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  const tapTimeout = useRef(null);
  const tapCount = useRef(0);

 const handleTap = () => {
  tapCount.current += 1;

  if (tapCount.current === 2) {
    // ✅ Double tap: scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
    clearTimeout(tapTimeout.current);
    tapCount.current = 0;
  } else {
    // ✅ Single tap: open dialer
    tapTimeout.current = setTimeout(() => {
      window.location.href = 'tel:7731878344';
      tapCount.current = 0;
    }, 300); // 300ms wait for second tap
  }
};


  return (
    <div className="min-h-screen bg-white relative">
      <Navbar />
      <main>
        <Hero />
        <Benefits />
        <Courses />
        <About />
        <TrustSection />
        <FoundingBatchSection />
        <Contact />
      </main>
      <Footer />

      {/* ✅ WhatsApp Floating Button */}
      <a
        href="https://wa.me/7731878344"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-colors"
        aria-label="Contact on WhatsApp"
      >
        <FaWhatsapp size={28} />
      </a>

      {/* ✅ Custom Floating Logo: single tap = home, double tap = call */}
      <div
        onClick={handleTap}
        className="fixed bottom-24 right-6 z-40 bg-white p-[3px] rounded-full shadow-lg hover:scale-105 transition-transform cursor-pointer"
        aria-label="DP Custom Logo"
      >
        <img
          src={`${import.meta.env.BASE_URL}images/dp-icon.jpg.jpg`}
          alt="DP Logo"
          className="w-14 h-14 rounded-full object-cover"
        />

      </div>
    </div>
  );
}

export default App;
