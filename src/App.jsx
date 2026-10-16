import { useState, useEffect } from 'react';
import { motion, AnimatePresence, MotionConfig } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import HowItWorks from './components/HowItWorks';
import TokenPackages from './components/TokenPackages';
import Ecosystem from './components/Ecosystem';
import Roadmap from './components/Roadmap';
import JoinCommunity from './components/JoinCommunity';
import Footer from './components/Footer';
import GoldSeparator from './components/GoldSeparator';
import LegalModal from './components/LegalModal';
import { ArrowUp, Sparkles, X } from 'lucide-react';

function scrollToId(id) {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

export default function App() {
  const [legalModal, setLegalModal] = useState({ isOpen: false, type: null });
  const [showTopAnnouncement, setShowTopAnnouncement] = useState(true);
  const [showFloatingTop, setShowFloatingTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowFloatingTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const openLegalModal = (type) => {
    setLegalModal({ isOpen: true, type });
  };

  const closeLegalModal = () => {
    setLegalModal({ isOpen: false, type: null });
  };

  const handleOpenAuth = () => {
    scrollToId('signup');
  };

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen bg-[#050606] text-white flex flex-col font-sans selection:bg-[#D4AF37]/30 selection:text-white">
        
        {/* Top Cricket Ecosystem Announcement Bar */}
        <AnimatePresence>
          {showTopAnnouncement && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="relative z-50 bg-gradient-to-r from-[#171510] via-[#2A2312] to-[#171510] border-b border-[#D4AF37]/30 py-2 px-4 text-center text-[11px] sm:text-xs font-medium text-[#FFD76A] flex items-center justify-center gap-2 overflow-hidden"
            >
              <Sparkles size={13} className="text-[#FFD76A] flex-shrink-0" />
              <span>
                <strong>CRICCOIN Ecosystem Architecture:</strong> 12-Month Holding, 10-Level Referral Network & Digital Cricket Innovation.
              </span>
              <button
                onClick={() => setShowTopAnnouncement(false)}
                className="ml-2 text-white/50 hover:text-white transition-colors"
                aria-label="Dismiss Announcement"
              >
                <X size={13} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Navbar */}
        <Navbar onOpenAuth={handleOpenAuth} />

        {/* Main Content Sections strictly in recommended order:
            Home → About Us → How It Works → Token → Ecosystem → Roadmap → Join Now → Footer */}
        <main className="flex-grow">
          
          {/* 1. Home — Hero Section */}
          <Hero
            onExplore={() => scrollToId('ecosystem')}
          />
          <GoldSeparator />

          {/* 2. About Us */}
          <About />
          <GoldSeparator />

          {/* 3. How It Works */}
          <HowItWorks />
          <GoldSeparator />

          {/* 4. Token — CRICCOIN & Participation Packages */}
          <TokenPackages onExplore={() => handleOpenAuth('signup')} />
          <GoldSeparator />

          {/* 5. Ecosystem */}
          <Ecosystem />
          <GoldSeparator />

          {/* 6. Roadmap */}
          <Roadmap />
          <GoldSeparator />

          {/* 7. Join Now Community Banner */}
          <JoinCommunity
            onLogin={() => handleOpenAuth('login')}
            onSignup={() => handleOpenAuth('signup')}
          />
          <GoldSeparator />

          {/* 8. Sign Up & Login Interactive Portal (temporarily hidden)
          <SignupForm
            activeTab={activeAuthTab}
            onOpenLegal={openLegalModal}
          />
          */}
        </main>

        <GoldSeparator />

        {/* Footer */}
        <Footer
          onOpenLegal={openLegalModal}
          onScrollTo={scrollToId}
        />

        {/* Interactive Legal Modals for Terms, Privacy, Risk, Compliance */}
        <LegalModal
          isOpen={legalModal.isOpen}
          type={legalModal.type}
          onClose={closeLegalModal}
        />

        {/* Floating Back to Top Button */}
        <AnimatePresence>
          {showFloatingTop && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 10 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="fixed bottom-6 right-6 z-40 w-11 h-11 rounded-full bg-[#12110E]/90 border border-[#D4AF37]/50 text-[#FFD76A] backdrop-blur-md shadow-2xl flex items-center justify-center hover:bg-[#D4AF37] hover:text-black transition-all focus:outline-none"
              aria-label="Scroll to top"
            >
              <ArrowUp size={18} />
            </motion.button>
          )}
        </AnimatePresence>

      </div>
    </MotionConfig>
  );
}
