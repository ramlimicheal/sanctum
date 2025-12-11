import React, { useState } from 'react';
import { 
  Cross, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  Sparkles,
  Chrome,
  Apple
} from 'lucide-react';
import { ViewState } from '@/types';
import ParticleBackground from './ParticleBackground';

interface SignInProps {
  onChangeView: (view: ViewState) => void;
}

const SignIn: React.FC<SignInProps> = ({ onChangeView }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    // Simulate authentication
    setTimeout(() => {
      setIsLoading(false);
      // For demo, just navigate to dashboard
      onChangeView(ViewState.DASHBOARD);
    }, 1500);
  };

  const handleSocialLogin = (provider: string) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onChangeView(ViewState.DASHBOARD);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-stone-50 flex relative overflow-hidden">
      <ParticleBackground />
      
      {/* Left Side - Form */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-6 md:p-8 relative z-10">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-6 md:mb-8">
            <button 
              onClick={() => onChangeView(ViewState.LANDING)}
              className="flex items-center gap-3 hover:opacity-80 transition-opacity"
            >
              <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-gold-400 to-gold-600 rounded-xl flex items-center justify-center shadow-lg shadow-gold-500/25">
                <Cross className="text-white" size={20} />
              </div>
              <span className="text-xl md:text-2xl font-serif font-semibold text-stone-800">Theolyte</span>
            </button>
          </div>
          
          {/* Header */}
          <div className="mb-6 md:mb-8">
            <h1 className="text-2xl md:text-3xl font-serif text-stone-900 mb-2">Welcome Back</h1>
            <p className="text-stone-600 text-sm md:text-base">
              Continue your spiritual journey. Sign in to access your sanctuary.
            </p>
          </div>
          
          {/* Social Login */}
          <div className="space-y-3 mb-6">
            <button 
              onClick={() => handleSocialLogin('google')}
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-3 bg-white border border-stone-200 rounded-xl px-4 py-2.5 md:py-3 font-medium text-stone-700 hover:bg-stone-50 hover:border-stone-300 transition-all disabled:opacity-50 text-sm md:text-base"
            >
              <Chrome size={18} />
              Continue with Google
            </button>
            <button 
              onClick={() => handleSocialLogin('apple')}
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-3 bg-stone-900 rounded-xl px-4 py-2.5 md:py-3 font-medium text-white hover:bg-stone-800 transition-all disabled:opacity-50 text-sm md:text-base"
            >
              <Apple size={18} />
              Continue with Apple
            </button>
          </div>
          
          {/* Divider */}
          <div className="flex items-center gap-4 mb-6">
            <div className="flex-1 h-px bg-stone-200" />
            <span className="text-xs md:text-sm text-stone-400">or sign in with email</span>
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
                  placeholder="Enter your password"
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
            </div>
            
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-stone-300 text-gold-600 focus:ring-gold-500"
                />
                <span className="text-sm text-stone-600">Remember me</span>
              </label>
              <button 
                type="button"
                className="text-sm text-gold-600 hover:text-gold-700 font-medium transition-colors"
              >
                Forgot password?
              </button>
            </div>
            
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-stone-800 to-stone-900 text-white py-3.5 rounded-xl font-medium hover:from-stone-900 hover:to-black transition-all shadow-lg shadow-stone-900/20 flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Sign In
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>
          
          {/* Sign Up Link */}
          <p className="text-center mt-8 text-stone-600">
            Don't have an account?{' '}
            <button 
              onClick={() => onChangeView(ViewState.SIGNUP)}
              className="text-gold-600 hover:text-gold-700 font-medium transition-colors"
            >
              Create one free
            </button>
          </p>
        </div>
      </div>
      
      {/* Right Side - Decorative */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-stone-900 via-stone-800 to-stone-900 items-center justify-center p-12 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-20 w-96 h-96 bg-gold-400 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-indigo-400 rounded-full blur-3xl" />
        </div>
        
        <div className="relative z-10 text-center max-w-lg">
          <div className="w-20 h-20 bg-gradient-to-br from-gold-400 to-gold-600 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-xl shadow-gold-500/30">
            <Sparkles className="text-white" size={40} />
          </div>
          
          <h2 className="text-4xl font-serif text-white mb-6">
            "Draw near to God, and He will draw near to you."
          </h2>
          <p className="text-xl text-stone-400 mb-4">— James 4:8</p>
          
          <div className="mt-12 bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
            <div className="flex items-center gap-4 mb-4">
              <img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80" 
                alt="User"
                className="w-12 h-12 rounded-full object-cover border-2 border-gold-400"
              />
              <div className="text-left">
                <p className="text-white font-medium">Michael R.</p>
                <p className="text-stone-400 text-sm">Prayer Warrior</p>
              </div>
            </div>
            <p className="text-stone-300 text-left italic">
              "Theolyte has become my daily companion for prayer and devotion. 
              The structured approach has transformed my spiritual life."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
