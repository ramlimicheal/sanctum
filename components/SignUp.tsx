import React, { useState } from 'react';
import { 
  Cross, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  User,
  Check,
  Sparkles,
  Chrome,
  Apple,
  BookOpen,
  Heart,
  Users,
  Flame
} from 'lucide-react';
import { ViewState } from '@/types';
import ParticleBackground from './ParticleBackground';

interface SignUpProps {
  onChangeView: (view: ViewState) => void;
}

const SignUp: React.FC<SignUpProps> = ({ onChangeView }) => {
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);

  const spiritualGoals = [
    { id: 'prayer', label: 'Deepen my prayer life', icon: Heart, color: 'text-rose-600', bg: 'bg-rose-50' },
    { id: 'bible', label: 'Read the Bible daily', icon: BookOpen, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { id: 'community', label: 'Connect with believers', icon: Users, color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { id: 'fasting', label: 'Practice spiritual disciplines', icon: Flame, color: 'text-amber-600', bg: 'bg-amber-50' },
  ];

  const passwordRequirements = [
    { label: 'At least 8 characters', met: password.length >= 8 },
    { label: 'Contains a number', met: /\d/.test(password) },
    { label: 'Contains uppercase letter', met: /[A-Z]/.test(password) },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (step === 1) {
      if (password !== confirmPassword) {
        setError('Passwords do not match');
        return;
      }
      if (!passwordRequirements.every(r => r.met)) {
        setError('Please meet all password requirements');
        return;
      }
      if (!agreeTerms) {
        setError('Please agree to the terms and conditions');
        return;
      }
      setStep(2);
      return;
    }
    
    setIsLoading(true);
    
    // Simulate account creation
    setTimeout(() => {
      setIsLoading(false);
      onChangeView(ViewState.DASHBOARD);
    }, 1500);
  };

  const handleSocialSignup = (provider: string) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setStep(2);
    }, 1500);
  };

  const toggleGoal = (goalId: string) => {
    setSelectedGoals(prev => 
      prev.includes(goalId) 
        ? prev.filter(id => id !== goalId)
        : [...prev, goalId]
    );
  };

  return (
    <div className="min-h-screen bg-stone-50 flex relative overflow-hidden">
      <ParticleBackground />
      
      {/* Left Side - Decorative */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-gold-500 via-gold-600 to-amber-600 items-center justify-center p-12 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-20 w-96 h-96 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-amber-300 rounded-full blur-3xl" />
        </div>
        
        <div className="relative z-10 text-center max-w-lg">
          <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-8 border border-white/30">
            <Cross className="text-white" size={40} />
          </div>
          
          <h2 className="text-4xl font-serif text-white mb-6">
            Begin Your Journey to Deeper Faith
          </h2>
          <p className="text-xl text-white/80 mb-8">
            Join thousands of believers who are transforming their spiritual lives through 
            structured prayer, daily devotionals, and community support.
          </p>
          
          <div className="grid grid-cols-2 gap-4 mt-12">
            {[
              { icon: BookOpen, label: 'Daily Devotionals' },
              { icon: Heart, label: 'Prayer Tracking' },
              { icon: Users, label: 'Community' },
              { icon: Flame, label: 'Spiritual Growth' },
            ].map((item, index) => (
              <div 
                key={index}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 flex items-center gap-3"
              >
                <item.icon className="text-white" size={24} />
                <span className="text-white font-medium">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Right Side - Form */}
      <div className="flex-1 flex items-center justify-center p-8 relative z-10">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-8">
            <button 
              onClick={() => onChangeView(ViewState.LANDING)}
              className="flex items-center gap-3 hover:opacity-80 transition-opacity"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-gold-400 to-gold-600 rounded-xl flex items-center justify-center shadow-lg shadow-gold-500/25">
                <Cross className="text-white" size={24} />
              </div>
              <span className="text-2xl font-serif font-semibold text-stone-800">Sanctum AI</span>
            </button>
          </div>
          
          {/* Progress Steps */}
          <div className="flex items-center gap-4 mb-8">
            <div className={`flex items-center gap-2 ${step >= 1 ? 'text-gold-600' : 'text-stone-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                step >= 1 ? 'bg-gold-100 text-gold-700' : 'bg-stone-100 text-stone-500'
              }`}>
                {step > 1 ? <Check size={16} /> : '1'}
              </div>
              <span className="text-sm font-medium">Account</span>
            </div>
            <div className={`flex-1 h-0.5 ${step >= 2 ? 'bg-gold-400' : 'bg-stone-200'}`} />
            <div className={`flex items-center gap-2 ${step >= 2 ? 'text-gold-600' : 'text-stone-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                step >= 2 ? 'bg-gold-100 text-gold-700' : 'bg-stone-100 text-stone-500'
              }`}>
                2
              </div>
              <span className="text-sm font-medium">Goals</span>
            </div>
          </div>
          
          {step === 1 ? (
            <>
              {/* Header */}
              <div className="mb-8">
                <h1 className="text-3xl font-serif text-stone-900 mb-2">Create Your Sanctuary</h1>
                <p className="text-stone-600">
                  Start your spiritual growth journey today. It's free to begin.
                </p>
              </div>
              
              {/* Social Signup */}
              <div className="space-y-3 mb-6">
                <button 
                  onClick={() => handleSocialSignup('google')}
                  disabled={isLoading}
                  className="w-full flex items-center justify-center gap-3 bg-white border border-stone-200 rounded-xl px-4 py-3 font-medium text-stone-700 hover:bg-stone-50 hover:border-stone-300 transition-all disabled:opacity-50"
                >
                  <Chrome size={20} />
                  Sign up with Google
                </button>
                <button 
                  onClick={() => handleSocialSignup('apple')}
                  disabled={isLoading}
                  className="w-full flex items-center justify-center gap-3 bg-stone-900 rounded-xl px-4 py-3 font-medium text-white hover:bg-stone-800 transition-all disabled:opacity-50"
                >
                  <Apple size={20} />
                  Sign up with Apple
                </button>
              </div>
              
              {/* Divider */}
              <div className="flex items-center gap-4 mb-6">
                <div className="flex-1 h-px bg-stone-200" />
                <span className="text-sm text-stone-400">or sign up with email</span>
                <div className="flex-1 h-px bg-stone-200" />
              </div>
              
              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-5">
                {error && (
                  <div className="bg-rose-50 border border-rose-200 text-rose-700 px-4 py-3 rounded-xl text-sm">
                    {error}
                  </div>
                )}
                
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">
                    Full Name
                  </label>
                  <div className="relative">
                    <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your name"
                      required
                      className="w-full pl-12 pr-4 py-3 bg-white border border-stone-200 rounded-xl focus:ring-2 focus:ring-gold-500 focus:border-transparent transition-all placeholder:text-stone-400"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      required
                      className="w-full pl-12 pr-4 py-3 bg-white border border-stone-200 rounded-xl focus:ring-2 focus:ring-gold-500 focus:border-transparent transition-all placeholder:text-stone-400"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Create a password"
                      required
                      className="w-full pl-12 pr-12 py-3 bg-white border border-stone-200 rounded-xl focus:ring-2 focus:ring-gold-500 focus:border-transparent transition-all placeholder:text-stone-400"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 transition-colors"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  
                  {/* Password Requirements */}
                  <div className="mt-3 space-y-1">
                    {passwordRequirements.map((req, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm">
                        <div className={`w-4 h-4 rounded-full flex items-center justify-center ${
                          req.met ? 'bg-emerald-100 text-emerald-600' : 'bg-stone-100 text-stone-400'
                        }`}>
                          <Check size={10} />
                        </div>
                        <span className={req.met ? 'text-emerald-600' : 'text-stone-500'}>
                          {req.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirm your password"
                      required
                      className="w-full pl-12 pr-4 py-3 bg-white border border-stone-200 rounded-xl focus:ring-2 focus:ring-gold-500 focus:border-transparent transition-all placeholder:text-stone-400"
                    />
                  </div>
                </div>
                
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={agreeTerms}
                    onChange={(e) => setAgreeTerms(e.target.checked)}
                    className="w-4 h-4 mt-0.5 rounded border-stone-300 text-gold-600 focus:ring-gold-500"
                  />
                  <span className="text-sm text-stone-600">
                    I agree to the{' '}
                    <a href="#" className="text-gold-600 hover:text-gold-700 font-medium">Terms of Service</a>
                    {' '}and{' '}
                    <a href="#" className="text-gold-600 hover:text-gold-700 font-medium">Privacy Policy</a>
                  </span>
                </label>
                
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-stone-800 to-stone-900 text-white py-3.5 rounded-xl font-medium hover:from-stone-900 hover:to-black transition-all shadow-lg shadow-stone-900/20 flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      Continue
                      <ArrowRight size={18} />
                    </>
                  )}
                </button>
              </form>
            </>
          ) : (
            <>
              {/* Step 2 - Goals */}
              <div className="mb-8">
                <h1 className="text-3xl font-serif text-stone-900 mb-2">Set Your Spiritual Goals</h1>
                <p className="text-stone-600">
                  What would you like to focus on? Select all that apply.
                </p>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-3">
                  {spiritualGoals.map((goal) => (
                    <button
                      key={goal.id}
                      type="button"
                      onClick={() => toggleGoal(goal.id)}
                      className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all ${
                        selectedGoals.includes(goal.id)
                          ? 'border-gold-400 bg-gold-50'
                          : 'border-stone-200 bg-white hover:border-stone-300'
                      }`}
                    >
                      <div className={`w-12 h-12 ${goal.bg} rounded-xl flex items-center justify-center`}>
                        <goal.icon className={goal.color} size={24} />
                      </div>
                      <span className="flex-1 text-left font-medium text-stone-800">{goal.label}</span>
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                        selectedGoals.includes(goal.id)
                          ? 'border-gold-500 bg-gold-500'
                          : 'border-stone-300'
                      }`}>
                        {selectedGoals.includes(goal.id) && (
                          <Check size={14} className="text-white" />
                        )}
                      </div>
                    </button>
                  ))}
                </div>
                
                <div className="bg-stone-100 rounded-xl p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <Sparkles className="text-gold-600" size={20} />
                    <span className="font-medium text-stone-800">Personalized Experience</span>
                  </div>
                  <p className="text-sm text-stone-600">
                    Based on your goals, we'll customize your dashboard with relevant devotionals, 
                    prayer prompts, and community connections.
                  </p>
                </div>
                
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="flex-1 bg-stone-100 text-stone-700 py-3.5 rounded-xl font-medium hover:bg-stone-200 transition-all"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="flex-1 bg-gradient-to-r from-gold-500 to-gold-600 text-white py-3.5 rounded-xl font-medium hover:from-gold-600 hover:to-gold-700 transition-all shadow-lg shadow-gold-500/25 flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {isLoading ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        Start My Journey
                        <ArrowRight size={18} />
                      </>
                    )}
                  </button>
                </div>
              </form>
            </>
          )}
          
          {/* Sign In Link */}
          <p className="text-center mt-8 text-stone-600">
            Already have an account?{' '}
            <button 
              onClick={() => onChangeView(ViewState.SIGNIN)}
              className="text-gold-600 hover:text-gold-700 font-medium transition-colors"
            >
              Sign in
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
