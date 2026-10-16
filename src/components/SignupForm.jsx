import { useState } from 'react';
import { Eye, EyeOff, CheckCircle2, AlertCircle, Loader2, LogIn, UserPlus, Copy, Check } from 'lucide-react';

const COUNTRIES = [
  { code: '', label: 'Select your country' },
  { code: 'IN', label: 'India 🇮🇳' },
  { code: 'AU', label: 'Australia 🇦🇺' },
  { code: 'GB', label: 'United Kingdom / England 🇬🇧' },
  { code: 'ZA', label: 'South Africa 🇿🇦' },
  { code: 'NZ', label: 'New Zealand 🇳🇿' },
  { code: 'PK', label: 'Pakistan 🇵🇰' },
  { code: 'LK', label: 'Sri Lanka 🇱🇰' },
  { code: 'AE', label: 'United Arab Emirates 🇦🇪' },
  { code: 'BD', label: 'Bangladesh 🇧🇩' },
  { code: 'AF', label: 'Afghanistan 🇦🇫' },
  { code: 'US', label: 'United States 🇺🇸' },
  { code: 'CA', label: 'Canada 🇨🇦' },
  { code: 'SG', label: 'Singapore 🇸🇬' },
  { code: 'OTHER', label: 'Other Country' },
];

export default function SignupForm({ activeTab = 'signup', onOpenLegal }) {
  const [tab, setTab] = useState(activeTab); // 'signup' | 'login'
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  // Sign up state
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    mobile: '',
    country: '',
    password: '',
    confirmPassword: '',
    referralCode: '',
  });

  // Checkboxes
  const [agreements, setAgreements] = useState({
    terms: false,
    risk: false,
    age: false,
  });

  // Login state
  const [loginData, setLoginData] = useState({
    emailOrMobile: '',
    password: '',
    rememberMe: true,
  });

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submittedUser, setSubmittedUser] = useState(null);
  const [copiedReferral, setCopiedReferral] = useState(false);

  const calculatePasswordStrength = (pass) => {
    let score = 0;
    if (pass.length >= 8) score++;
    if (/[a-zA-Z]/.test(pass)) score++;
    if (/[0-9]/.test(pass)) score++;
    if (/[^a-zA-Z0-9]/.test(pass)) score++;
    return score;
  };

  const passStrength = calculatePasswordStrength(formData.password);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setAgreements((prev) => ({ ...prev, [name]: checked }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const validateSignup = () => {
    const errs = {};
    if (!formData.fullName.trim()) errs.fullName = 'Full Name is required.';
    if (!formData.email.trim() || !formData.email.includes('@')) {
      errs.email = 'Valid Email Address is required.';
    }
    if (!formData.mobile.trim()) errs.mobile = 'Mobile Number is required.';
    if (!formData.country || formData.country === '') {
      errs.country = 'Please select your country.';
    }
    if (formData.password.length < 8) {
      errs.password = 'Password must be at least 8 characters.';
    } else if (passStrength < 3) {
      errs.password = 'Password must include letters, numbers, and a symbol.';
    }
    if (formData.password !== formData.confirmPassword) {
      errs.confirmPassword = 'Passwords do not match.';
    }
    if (!agreements.terms) {
      errs.terms = 'You must agree to the Terms & Conditions and Privacy Policy.';
    }
    if (!agreements.risk) {
      errs.risk = 'You must acknowledge the Risk Disclosure.';
    }
    if (!agreements.age) {
      errs.age = 'You must confirm that you are of legal age.';
    }
    return errs;
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateSignup();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmittedUser({
        name: formData.fullName,
        email: formData.email,
        country: formData.country,
        referralCode: 'CRIC-' + Math.random().toString(36).substring(2, 7).toUpperCase(),
      });
    }, 1200);
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const errs = {};
    if (!loginData.emailOrMobile.trim()) {
      errs.loginId = 'Email or mobile number is required.';
    }
    if (!loginData.password) {
      errs.loginPassword = 'Password is required.';
    }
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmittedUser({
        name: loginData.emailOrMobile.split('@')[0] || 'Cricket Fan',
        email: loginData.emailOrMobile,
        country: 'Global Member',
        referralCode: 'CRIC-VIP88',
      });
    }, 1000);
  };

  const copyReferral = (code) => {
    navigator.clipboard?.writeText(code);
    setCopiedReferral(true);
    setTimeout(() => setCopiedReferral(false), 2000);
  };

  return (
    <section id="signup" className="relative py-20 lg:py-28 bg-[#070707] overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[#D4AF37]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-10">
          <span className="section-label mb-2">
            JOIN / SIGN UP
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-3">
            Create Your <span className="gold-gradient-text">CRICCOIN Account</span>
          </h2>
          <p className="text-sm sm:text-base text-[#C6C6C6] max-w-xl mx-auto font-normal">
            Join the cricket community, manage your token activity, and explore the CRICCOIN ecosystem.
            Registration takes only a few minutes.
          </p>

          {/* Tab Selector Capsule */}
          <div className="inline-flex p-1.5 rounded-full bg-black/60 border border-[#D4AF37]/30 backdrop-blur-md mt-6 shadow-inner">
            <button
              onClick={() => { setTab('signup'); setErrors({}); }}
              className={`flex items-center gap-2 px-6 py-2 rounded-full text-xs sm:text-sm font-bold transition-all ${
                tab === 'signup'
                  ? 'bg-gradient-to-r from-[#FFD76A] to-[#D4AF37] text-black shadow-md'
                  : 'text-[#C6C6C6] hover:text-white'
              }`}
            >
              <UserPlus size={15} />
              <span>Create Account</span>
            </button>
            <button
              onClick={() => { setTab('login'); setErrors({}); }}
              className={`flex items-center gap-2 px-6 py-2 rounded-full text-xs sm:text-sm font-bold transition-all ${
                tab === 'login'
                  ? 'bg-gradient-to-r from-[#FFD76A] to-[#D4AF37] text-black shadow-md'
                  : 'text-[#C6C6C6] hover:text-white'
              }`}
            >
              <LogIn size={15} />
              <span>Login to Account</span>
            </button>
          </div>
        </div>

        {/* Success Modal / Card if submitted */}
        {submittedUser ? (
          <div className="p-8 rounded-2xl bg-gradient-to-b from-[#14130F] to-[#0A0A09] border border-[#FFD76A]/50 shadow-2xl text-center">
            <div className="w-16 h-16 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/50 flex items-center justify-center text-[#FFD76A] mx-auto mb-4">
              <CheckCircle2 size={36} />
            </div>
            
            <span className="text-xs font-bold text-[#FFD76A] tracking-wider uppercase block mb-1">
              Welcome to CRICCOIN
            </span>
            <h3 className="font-heading text-2xl font-bold text-white mb-2">
              Hello, {submittedUser.name}!
            </h3>
            <p className="text-sm text-[#C6C6C6] max-w-md mx-auto mb-6">
              Your account has been initialized. A verification link has been sent to{' '}
              <strong className="text-white">{submittedUser.email}</strong>.
            </p>

            {/* Simulated Dashboard Preview Card */}
            <div className="p-5 rounded-xl bg-black/60 border border-[#D4AF37]/30 text-left max-w-lg mx-auto mb-6">
              <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-3">
                <span className="text-xs text-[#C6C6C6]">Your Referral Code</span>
                <button
                  onClick={() => copyReferral(submittedUser.referralCode)}
                  className="flex items-center gap-1.5 text-xs font-bold text-[#FFD76A] hover:underline"
                >
                  {copiedReferral ? <Check size={13} /> : <Copy size={13} />}
                  <span>{submittedUser.referralCode}</span>
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-[#C6C6C6]/70 block">Available Balance</span>
                  <span className="font-heading font-bold text-white text-base">0.00 CRIC</span>
                </div>
                <div>
                  <span className="text-[#C6C6C6]/70 block">Holding Status</span>
                  <span className="font-bold text-[#FFD76A]">Eligible for 12-Month</span>
                </div>
              </div>
            </div>

            <div className="flex justify-center gap-3">
              <button
                onClick={() => setSubmittedUser(null)}
                className="btn-secondary !text-xs !py-2 !px-6"
              >
                Log Out / Switch
              </button>
              <button
                onClick={() => {
                  const el = document.getElementById('token');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                  setSubmittedUser(null);
                }}
                className="btn-primary !text-xs !py-2 !px-6"
              >
                Explore Participation Packages
              </button>
            </div>
          </div>
        ) : tab === 'signup' ? (
          
          /* SIGN UP FORM */
          <div className="p-6 sm:p-10 rounded-2xl bg-gradient-to-b from-[#14130F] to-[#0A0A09] border border-[#D4AF37]/30 shadow-2xl">
            <form onSubmit={handleSignupSubmit} className="space-y-5" noValidate>
              
              {/* Row 1: Full Name & Email Address */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold text-[#C6C6C6] uppercase tracking-wider mb-1.5">
                    Full Name <span className="text-[#D4AF37]">*</span>
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="Enter your name as per official ID"
                    className={`w-full px-4 py-2.5 rounded-xl bg-black/60 border text-sm text-white placeholder-white/30 focus:outline-none transition-colors ${
                      errors.fullName ? 'border-red-500' : 'border-[#D4AF37]/30 focus:border-[#FFD76A]'
                    }`}
                  />
                  <p className="text-[11px] text-[#C6C6C6]/60 mt-1">
                    Enter your name as per your official ID.
                  </p>
                  {errors.fullName && (
                    <p className="text-xs text-red-400 mt-1 flex items-center gap-1">
                      <AlertCircle size={12} /> {errors.fullName}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#C6C6C6] uppercase tracking-wider mb-1.5">
                    Email Address <span className="text-[#D4AF37]">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="name@example.com"
                    className={`w-full px-4 py-2.5 rounded-xl bg-black/60 border text-sm text-white placeholder-white/30 focus:outline-none transition-colors ${
                      errors.email ? 'border-red-500' : 'border-[#D4AF37]/30 focus:border-[#FFD76A]'
                    }`}
                  />
                  <p className="text-[11px] text-[#C6C6C6]/60 mt-1">
                    We will send a verification link to this email.
                  </p>
                  {errors.email && (
                    <p className="text-xs text-red-400 mt-1 flex items-center gap-1">
                      <AlertCircle size={12} /> {errors.email}
                    </p>
                  )}
                </div>
              </div>

              {/* Row 2: Mobile Number & Country */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold text-[#C6C6C6] uppercase tracking-wider mb-1.5">
                    Mobile Number <span className="text-[#D4AF37]">*</span>
                  </label>
                  <input
                    type="tel"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleInputChange}
                    placeholder="+91 / +44 / +1 Mobile Number"
                    className={`w-full px-4 py-2.5 rounded-xl bg-black/60 border text-sm text-white placeholder-white/30 focus:outline-none transition-colors ${
                      errors.mobile ? 'border-red-500' : 'border-[#D4AF37]/30 focus:border-[#FFD76A]'
                    }`}
                  />
                  <p className="text-[11px] text-[#C6C6C6]/60 mt-1">
                    Used for account security and OTP verification.
                  </p>
                  {errors.mobile && (
                    <p className="text-xs text-red-400 mt-1 flex items-center gap-1">
                      <AlertCircle size={12} /> {errors.mobile}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#C6C6C6] uppercase tracking-wider mb-1.5">
                    Country <span className="text-[#D4AF37]">*</span>
                  </label>
                  <select
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2.5 rounded-xl bg-black/80 border text-sm text-white focus:outline-none transition-colors ${
                      errors.country ? 'border-red-500' : 'border-[#D4AF37]/30 focus:border-[#FFD76A]'
                    }`}
                  >
                    {COUNTRIES.map((c) => (
                      <option key={c.code} value={c.code} className="bg-[#10100E] text-white">
                        {c.label}
                      </option>
                    ))}
                  </select>
                  <p className="text-[11px] text-[#C6C6C6]/60 mt-1">
                    Participation depends on availability in your region.
                  </p>
                  {errors.country && (
                    <p className="text-xs text-red-400 mt-1 flex items-center gap-1">
                      <AlertCircle size={12} /> {errors.country}
                    </p>
                  )}
                </div>
              </div>

              {/* Row 3: Password & Confirm Password */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold text-[#C6C6C6] uppercase tracking-wider mb-1.5">
                    Password <span className="text-[#D4AF37]">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      placeholder="Minimum 8 characters"
                      className={`w-full px-4 py-2.5 pr-10 rounded-xl bg-black/60 border text-sm text-white placeholder-white/30 focus:outline-none transition-colors ${
                        errors.password ? 'border-red-500' : 'border-[#D4AF37]/30 focus:border-[#FFD76A]'
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-white"
                      tabIndex={-1}
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                  
                  {/* Strength Bar */}
                  {formData.password && (
                    <div className="mt-2 flex items-center gap-1.5">
                      <div className="flex-1 h-1 rounded-full bg-white/10 overflow-hidden">
                        <div
                          className={`h-full transition-all ${
                            passStrength <= 1
                              ? 'w-1/4 bg-red-500'
                              : passStrength === 2
                              ? 'w-2/4 bg-amber-500'
                              : passStrength === 3
                              ? 'w-3/4 bg-yellow-400'
                              : 'w-full bg-emerald-400'
                          }`}
                        />
                      </div>
                      <span className="text-[10px] text-[#C6C6C6]">
                        {passStrength <= 1
                          ? 'Weak'
                          : passStrength === 2
                          ? 'Fair'
                          : passStrength === 3
                          ? 'Good'
                          : 'Strong'}
                      </span>
                    </div>
                  )}

                  <p className="text-[11px] text-[#C6C6C6]/60 mt-1">
                    Minimum 8 characters, with letters, numbers and a symbol.
                  </p>
                  {errors.password && (
                    <p className="text-xs text-red-400 mt-1 flex items-center gap-1">
                      <AlertCircle size={12} /> {errors.password}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#C6C6C6] uppercase tracking-wider mb-1.5">
                    Confirm Password <span className="text-[#D4AF37]">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      placeholder="Re-enter your password"
                      className={`w-full px-4 py-2.5 pr-10 rounded-xl bg-black/60 border text-sm text-white placeholder-white/30 focus:outline-none transition-colors ${
                        errors.confirmPassword ? 'border-red-500' : 'border-[#D4AF37]/30 focus:border-[#FFD76A]'
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-white"
                      tabIndex={-1}
                    >
                      {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                  <p className="text-[11px] text-[#C6C6C6]/60 mt-1">
                    Re-enter your password to confirm.
                  </p>
                  {errors.confirmPassword && (
                    <p className="text-xs text-red-400 mt-1 flex items-center gap-1">
                      <AlertCircle size={12} /> {errors.confirmPassword}
                    </p>
                  )}
                </div>
              </div>

              {/* Referral Code (Optional) */}
              <div>
                <label className="block text-xs font-semibold text-[#C6C6C6] uppercase tracking-wider mb-1.5">
                  Referral Code <span className="text-white/40 font-normal lowercase">(optional)</span>
                </label>
                <input
                  type="text"
                  name="referralCode"
                  value={formData.referralCode}
                  onChange={handleInputChange}
                  placeholder="e.g. CRIC-VIP888"
                  className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-[#D4AF37]/30 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#FFD76A] transition-colors"
                />
                <p className="text-[11px] text-[#C6C6C6]/60 mt-1">
                  Enter the code shared by the member who invited you.
                </p>
              </div>

              {/* 3 Required Agreements */}
              <div className="pt-2 space-y-3 border-t border-white/10">
                <label className="flex items-start gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    name="terms"
                    checked={agreements.terms}
                    onChange={handleCheckboxChange}
                    className="w-4 h-4 rounded border-[#D4AF37] accent-[#D4AF37] mt-0.5"
                  />
                  <span className="text-xs text-[#C6C6C6] leading-relaxed group-hover:text-white transition-colors">
                    I agree to the{' '}
                    <button
                      type="button"
                      onClick={(e) => { e.preventDefault(); onOpenLegal?.('terms'); }}
                      className="text-[#FFD76A] underline hover:text-white"
                    >
                      Terms & Conditions
                    </button>{' '}
                    and{' '}
                    <button
                      type="button"
                      onClick={(e) => { e.preventDefault(); onOpenLegal?.('privacy'); }}
                      className="text-[#FFD76A] underline hover:text-white"
                    >
                      Privacy Policy
                    </button>.
                  </span>
                </label>
                {errors.terms && (
                  <p className="text-xs text-red-400 ml-7 flex items-center gap-1">
                    <AlertCircle size={12} /> {errors.terms}
                  </p>
                )}

                <label className="flex items-start gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    name="risk"
                    checked={agreements.risk}
                    onChange={handleCheckboxChange}
                    className="w-4 h-4 rounded border-[#D4AF37] accent-[#D4AF37] mt-0.5"
                  />
                  <span className="text-xs text-[#C6C6C6] leading-relaxed group-hover:text-white transition-colors">
                    I have read the{' '}
                    <button
                      type="button"
                      onClick={(e) => { e.preventDefault(); onOpenLegal?.('risk'); }}
                      className="text-[#FFD76A] underline hover:text-white"
                    >
                      Risk Disclosure
                    </button>{' '}
                    and understand that token ownership does not guarantee profits or fixed returns.
                  </span>
                </label>
                {errors.risk && (
                  <p className="text-xs text-red-400 ml-7 flex items-center gap-1">
                    <AlertCircle size={12} /> {errors.risk}
                  </p>
                )}

                <label className="flex items-start gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    name="age"
                    checked={agreements.age}
                    onChange={handleCheckboxChange}
                    className="w-4 h-4 rounded border-[#D4AF37] accent-[#D4AF37] mt-0.5"
                  />
                  <span className="text-xs text-[#C6C6C6] leading-relaxed group-hover:text-white transition-colors">
                    I confirm that I am of legal age and that participation is permitted in my country.
                  </span>
                </label>
                {errors.age && (
                  <p className="text-xs text-red-400 ml-7 flex items-center gap-1">
                    <AlertCircle size={12} /> {errors.age}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={submitting}
                  className="btn-primary w-full !py-3 !text-sm !font-bold flex items-center justify-center gap-2"
                >
                  {submitting ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      <span>Creating Account...</span>
                    </>
                  ) : (
                    <>
                      <span>Create My Account</span>
                      {/* <Sparkles size={16} /> */}
                    </>
                  )}
                </button>
              </div>

              <div className="text-center pt-2">
                <p className="text-xs text-[#C6C6C6]">
                  Already have an account?{' '}
                  <button
                    type="button"
                    onClick={() => setTab('login')}
                    className="text-[#FFD76A] font-bold hover:underline"
                  >
                    Login to Account
                  </button>
                </p>
              </div>

            </form>
          </div>
        ) : (
          
          /* LOGIN FORM */
          <div className="p-6 sm:p-10 rounded-2xl bg-gradient-to-b from-[#14130F] to-[#0A0A09] border border-[#D4AF37]/30 shadow-2xl">
            <form onSubmit={handleLoginSubmit} className="space-y-5" noValidate>
              
              <div>
                <label className="block text-xs font-semibold text-[#C6C6C6] uppercase tracking-wider mb-1.5">
                  Email Address or Mobile <span className="text-[#D4AF37]">*</span>
                </label>
                <input
                  type="text"
                  value={loginData.emailOrMobile}
                  onChange={(e) => setLoginData({ ...loginData, emailOrMobile: e.target.value })}
                  placeholder="name@example.com or +1234567890"
                  className={`w-full px-4 py-2.5 rounded-xl bg-black/60 border text-sm text-white placeholder-white/30 focus:outline-none transition-colors ${
                    errors.loginId ? 'border-red-500' : 'border-[#D4AF37]/30 focus:border-[#FFD76A]'
                  }`}
                />
                {errors.loginId && (
                  <p className="text-xs text-red-400 mt-1 flex items-center gap-1">
                    <AlertCircle size={12} /> {errors.loginId}
                  </p>
                )}
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-semibold text-[#C6C6C6] uppercase tracking-wider">
                    Password <span className="text-[#D4AF37]">*</span>
                  </label>
                  <a href="#signup" onClick={() => alert('Password reset verification link sent.')} className="text-[11px] text-[#FFD76A] hover:underline">
                    Forgot Password?
                  </a>
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={loginData.password}
                    onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                    placeholder="Enter your account password"
                    className={`w-full px-4 py-2.5 pr-10 rounded-xl bg-black/60 border text-sm text-white placeholder-white/30 focus:outline-none transition-colors ${
                      errors.loginPassword ? 'border-red-500' : 'border-[#D4AF37]/30 focus:border-[#FFD76A]'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-white"
                    tabIndex={-1}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {errors.loginPassword && (
                  <p className="text-xs text-red-400 mt-1 flex items-center gap-1">
                    <AlertCircle size={12} /> {errors.loginPassword}
                  </p>
                )}
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer text-xs text-[#C6C6C6]">
                  <input
                    type="checkbox"
                    checked={loginData.rememberMe}
                    onChange={(e) => setLoginData({ ...loginData, rememberMe: e.target.checked })}
                    className="w-4 h-4 rounded border-[#D4AF37] accent-[#D4AF37]"
                  />
                  <span>Remember my device</span>
                </label>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={submitting}
                  className="btn-primary w-full !py-3 !text-sm !font-bold flex items-center justify-center gap-2"
                >
                  {submitting ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      <span>Authenticating...</span>
                    </>
                  ) : (
                    <>
                      <span>Login to CRICCOIN</span>
                      <LogIn size={16} />
                    </>
                  )}
                </button>
              </div>

              <div className="text-center pt-2">
                <p className="text-xs text-[#C6C6C6]">
                  New to CRICCOIN?{' '}
                  <button
                    type="button"
                    onClick={() => setTab('signup')}
                    className="text-[#FFD76A] font-bold hover:underline"
                  >
                    Join Now — Create Account
                  </button>
                </p>
              </div>

            </form>
          </div>
        )}

      </div>
    </section>
  );
}
