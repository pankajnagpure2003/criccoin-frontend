import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  UserPlus,
  Package,
  Coins,
  LayoutDashboard,
  Network,
  Globe2,
  ChevronRight,
} from 'lucide-react';
import {
  fadeUp,
  staggerContainerVariants,
  staggerItemVariants,
  DEFAULT_VIEWPORT,
} from '../utils/motion';

const steps = [
  {
    step: '1',
    title: 'Create Your Account',
    details: 'Register, complete your profile, and finish any required verification.',
    icon: UserPlus,
  },
  {
    step: '2',
    title: 'Choose Your Package',
    details: 'Explore the available participation packages and review the applicable terms.',
    icon: Package,
  },
  {
    step: '3',
    title: 'Receive CRIC Tokens',
    details: 'Token allocation is calculated using the approved CRICCOIN price at the time of the confirmed transaction.',
    icon: Coins,
  },
  {
    step: '4',
    title: 'Manage Your Tokens',
    details: 'View your available balance, token transactions, and optional 12-month holding status.',
    icon: LayoutDashboard,
  },
  {
    step: '5',
    title: 'Build Your Network',
    details: 'Access your referral dashboard and track eligible community activity across up to 10 levels.',
    icon: Network,
  },
  {
    step: '6',
    title: 'Explore the Ecosystem',
    details: 'Discover permitted cricket games, competitions, collectibles, merchandise, events, and community experiences.',
    icon: Globe2,
  },
];

export default function HowItWorks() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section id="how-it-works" className="relative py-12 md:py-14 lg:py-16 bg-[#080808] overflow-hidden">
      {/* Background ambient gold flare */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#D4AF37]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-10xl mx-auto px-4 sm:px-10 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <motion.div {...fadeUp(0, 15)} className="mb-3">
          <span className="section-label">
            HOW IT WORKS
          </span>
        </motion.div>

        <motion.h2 {...fadeUp(0.08, 20)} className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-3">
          Your Journey with <span className="gold-gradient-text">CRICCOIN</span>
        </motion.h2>
        <motion.p {...fadeUp(0.16, 18)} className="text-sm sm:text-base text-[#C6C6C6] mb-12 max-w-2xl font-normal">
          A simple process to get started and explore the cricket ecosystem.
        </motion.p>

        {/* 6 Steps Horizontal Flow (Desktop / Tablet / Mobile) */}
        <motion.div
          variants={staggerContainerVariants(0.07, 0.2)}
          initial="hidden"
          whileInView="visible"
          viewport={DEFAULT_VIEWPORT}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 relative"
        >
          {steps.map((item, index) => {
            const Icon = item.icon;
            const isSelected = activeStep === index;

            return (
              <motion.div
                key={item.step}
                variants={staggerItemVariants(20)}
                whileHover={{ y: -4, transition: { duration: 0.25 } }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveStep(index)}
                className={`relative flex flex-col p-5 rounded-2xl cursor-pointer transition-all duration-300 ${
                  isSelected
                    ? 'bg-gradient-to-br from-[#201A0D] via-[#14120C] to-[#090908] border-2 border-[#FFD76A] shadow-[0_8px_30px_rgba(212,175,55,0.25)] -translate-y-1'
                    : 'bg-gradient-to-br from-[#19150B] via-[#100F0B] to-[#080808] border-2 border-[#8A6720]/70 hover:border-[#D4AF37]'
                }`}
              >
                {/* Step Number in Glowing Circle */}
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#FFD76A] to-[#C89228] text-black font-heading font-extrabold text-sm flex items-center justify-center shadow-md shadow-[#D4AF37]/30">
                    {item.step}
                  </div>

                  {/* Desktop connector chevron */}
                  {index < steps.length - 1 && (
                    <div className="hidden lg:flex text-[#D4AF37]/50">
                      <ChevronRight size={18} />
                    </div>
                  )}
                </div>

                {/* Step Icon */}
                <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center text-[#FFD76A] mb-3">
                  <Icon size={20} />
                </div>

                {/* Step Title */}
                <h3 className="font-heading text-sm font-bold text-white mb-2 leading-snug">
                  {item.title}
                </h3>

                {/* Step Details */}
                <p className="text-sm text-[#C6C6C6]/85 leading-relaxed flex-grow">
                  {item.details}
                </p>

                {/* Active Indicator dot */}
                {isSelected && (
                  <div className="mt-4 pt-2 border-t border-[#D4AF37]/30 flex items-center gap-1.5 text-[11px] font-semibold text-[#FFD76A]">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#FFD76A] animate-ping" />
                    <span>Active Step</span>
                  </div>
                )}
              </motion.div>
            );
          })}
        </motion.div>

        {/* Selected Step Deep Dive Banner */}
        <motion.div {...fadeUp(0.2, 20)} className="mt-8 p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-[#1A160B] via-[#100F0B] to-[#080808] border-2 border-[#8A6720]/70 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/15 border border-[#D4AF37]/40 flex items-center justify-center text-[#FFD76A] flex-shrink-0">
              {(() => {
                const ActiveIcon = steps[activeStep].icon;
                return <ActiveIcon size={24} />;
              })()}
            </div>
            <div>
              <div className="text-[11px] uppercase font-bold tracking-wider text-[#D4AF37]">
                Step {steps[activeStep].step} Breakdown
              </div>
              <h4 className="font-heading text-base sm:text-lg font-bold text-white">
                {steps[activeStep].title}
              </h4>
              <p className="text-xs sm:text-sm text-[#C6C6C6] mt-0.5">
                {steps[activeStep].details}
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              const el = document.getElementById('signup');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="btn-primary !text-xs !py-2 !px-5 whitespace-nowrap self-end sm:self-center"
          >
            Get Started Now
          </button>
        </motion.div>

        {/* Legal Disclaimer Note */}
        <div className="mt-8 p-3.5 rounded-xl bg-gradient-to-br from-[#17140B] via-[#100F0B] to-[#080808] border-2 border-[#76591D]/60 text-center">
          {/* <p className="text-xs text-[#C6C6C6]/70 leading-relaxed flex items-center justify-center gap-2">
            <ShieldAlert size={14} className="text-[#D4AF37] flex-shrink-0" />
            <span>
              Token allocation, holding terms, and referral compensation are subject to approved program rules and applicable eligibility requirements.
            </span>
          </p> */}
        </div>

      </div>
    </section>
  );
}
