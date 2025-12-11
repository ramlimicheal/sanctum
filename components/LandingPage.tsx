import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { 
  Sparkles, 
  BookOpen, 
  Heart, 
  Users, 
  Flame, 
  Star, 
  ArrowRight, 
  Check, 
  Play,
  Quote,
  ChevronDown,
  Shield,
  Clock,
  Target,
  MessageCircle,
  TrendingUp,
  Award,
  Globe,
  Sun,
  Cross,
  Compass,
  Feather,
  Bell,
  Lightbulb,
  Sunrise,
  HandHeart,
  BookMarked,
  Milestone,
  CheckCircle2,
  ArrowDown,
  Menu,
  X,
  Mountain,
  Mail,
  Utensils
} from 'lucide-react';
import { ViewState } from '@/types';
import ParticleBackground from './ParticleBackground';

interface LandingPageProps {
  onChangeView: (view: ViewState) => void;
}

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 }
  }
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } }
};

const LandingPage: React.FC<LandingPageProps> = ({ onChangeView }) => {
  const [scrolled, setScrolled] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const heroRef = useRef<HTMLDivElement>(null);
  const dashboardRef = useRef<HTMLDivElement>(null);
  const isDashboardInView = useInView(dashboardRef, { once: true, margin: "-100px" });
  
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  
  const dashboardY = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const dashboardOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const coreFeatures = [
    {
      icon: BookOpen,
      title: 'Bible Reader',
      description: 'Multiple translations, bookmarks, highlighting, and personalized daily reading plans.',
      details: ['Multiple translations', 'Verse highlighting', 'Audio Bible', 'Cross-references']
    },
    {
      icon: Heart,
      title: 'Prayer Architect',
      description: 'Build structured prayers using the ACTS method with AI-powered scripture suggestions.',
      details: ['ACTS framework', 'AI scripture integration', 'Prayer templates', 'Voice-to-text']
    },
    {
      icon: Flame,
      title: 'Fasting Tracker',
      description: 'Track your fasting journey with guided plans and spiritual reflections.',
      details: ['Multiple fasting types', 'Health monitoring', 'Spiritual reflections', 'Community events']
    },
    {
      icon: Users,
      title: 'Community Prayer',
      description: 'Join believers worldwide. Share requests and celebrate answered prayers.',
      details: ['Anonymous requests', 'Prayer chains', 'Global prayer wall', 'Celebrations']
    },
    {
      icon: Star,
      title: 'Testimony Journal',
      description: 'Document God\'s faithfulness. Record answered prayers and breakthroughs.',
      details: ['Timeline view', 'Photo attachments', 'Share with community', 'Reminders']
    },
    {
      icon: Target,
      title: 'Vision Wall',
      description: 'Visualize your God-given dreams and spiritual goals.',
      details: ['Visual goal boards', 'Scripture affirmations', 'Progress tracking', 'Milestones']
    }
  ];

  const problemsSolved = [
    { problem: "Inconsistent Prayer Life", solution: "Structured tools with reminders and streak tracking", icon: Clock },
    { problem: "Feeling Spiritually Isolated", solution: "Connect with a global community of believers", icon: Users },
    { problem: "Difficulty Understanding Scripture", solution: "AI-powered insights and cross-references", icon: Lightbulb },
    { problem: "Forgetting God's Faithfulness", solution: "Testimony journal to remember answered prayers", icon: BookMarked },
    { problem: "Lack of Spiritual Direction", solution: "Purpose alignment tools and devotionals", icon: Compass },
    { problem: "Struggling with Disciplines", solution: "Gamified tracking and community support", icon: Mountain }
  ];

  const testimonials = [
    {
      quote: "Theolyte has completely transformed my prayer life. The ACTS method helped me develop a deeper relationship with God.",
      author: "Sarah Mitchell",
      role: "Youth Pastor",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80"
    },
    {
      quote: "The community prayer feature connected me with believers worldwide during my cancer journey. Knowing thousands were praying gave me strength.",
      author: "David Kim",
      role: "Small Group Leader",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80"
    },
    {
      quote: "Finally, an app that takes spiritual growth seriously. It's like having a personal spiritual director in my pocket.",
      author: "Grace Okonkwo",
      role: "Ministry Director",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80"
    }
  ];

  const stats = [
    { value: '50K+', label: 'Active Believers', icon: Users },
    { value: '1M+', label: 'Prayers Lifted', icon: Heart },
    { value: '100K+', label: 'Testimonies Shared', icon: Star },
    { value: '150+', label: 'Countries Reached', icon: Globe }
  ];

  const pricingPlans = [
    {
      name: 'Free',
      price: '$0',
      period: 'forever',
      description: 'Perfect for starting your journey',
      features: ['Daily devotionals', 'Basic prayer tracking', 'Bible reader (KJV)', 'Personal journal', 'Community prayer wall'],
      cta: 'Get Started Free',
      highlighted: false
    },
    {
      name: 'Believer',
      price: '$9.99',
      period: '/month',
      description: 'For dedicated disciples',
      features: ['Everything in Free', 'AI-powered insights', 'All Bible translations', 'Advanced fasting tracker', 'Prayer analytics', 'Offline access', 'Priority support'],
      cta: 'Start Free Trial',
      highlighted: true
    },
    {
      name: 'Ministry',
      price: '$29.99',
      period: '/month',
      description: 'For churches and groups',
      features: ['Everything in Believer', 'Up to 50 members', 'Group prayer chains', 'Ministry dashboard', 'Custom branding', 'Dedicated support'],
      cta: 'Contact Sales',
      highlighted: false
    }
  ];

  const faqs = [
    { question: "What makes Theolyte different?", answer: "Theolyte combines AI with time-tested spiritual disciplines. Our AI enhances your relationship with God by suggesting relevant scriptures and helping build consistent prayer habits." },
    { question: "Is my prayer data private?", answer: "Absolutely. All data is encrypted end-to-end. We never sell your data. You can make prayer requests anonymous when sharing with the community." },
    { question: "Can I use Theolyte offline?", answer: "Yes! Believer and Ministry subscribers can download devotionals, Bible passages, and prayer history for offline access." },
    { question: "Is Theolyte suitable for my church?", answer: "Yes! Our Ministry plan is designed for churches and small groups with shared prayer chains, group devotionals, and engagement tracking." }
  ];

  const journeySteps = [
    { step: '01', title: 'Create Your Sanctuary', description: 'Sign up and personalize your spiritual dashboard.', icon: Shield },
    { step: '02', title: 'Build Daily Habits', description: 'Follow guided devotionals and track your prayer streaks.', icon: Clock },
    { step: '03', title: 'Grow Together', description: 'Connect with believers and experience community prayer.', icon: TrendingUp }
  ];

  // Dashboard animation states
  const [dashboardAnimated, setDashboardAnimated] = useState(false);
  
  useEffect(() => {
    if (isDashboardInView && !dashboardAnimated) {
      setDashboardAnimated(true);
    }
  }, [isDashboardInView, dashboardAnimated]);

  return (
    <div className="min-h-screen bg-stone-50 overflow-x-hidden overflow-y-auto">
      <ParticleBackground />
      
      {/* Navigation */}
      <motion.nav 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm' : 'bg-white/80 backdrop-blur-sm'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <motion.div 
            className="flex items-center gap-3"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <div className="w-10 h-10 bg-stone-900 rounded-xl flex items-center justify-center">
              <Cross className="text-gold-400" size={20} />
            </div>
            <span className="text-2xl font-serif font-semibold text-stone-800">Theolyte</span>
          </motion.div>
          
          <div className="hidden md:flex items-center gap-8">
            {['Features', 'Testimonials', 'Pricing', 'FAQ'].map((item, index) => (
              <motion.a 
                key={item}
                href={`#${item.toLowerCase()}`} 
                className="text-stone-600 hover:text-stone-900 transition-colors text-sm font-medium"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -2 }}
              >
                {item}
              </motion.a>
            ))}
          </div>
          
          <div className="flex items-center gap-3">
            <motion.button 
              onClick={() => onChangeView(ViewState.SIGNIN)}
              className="hidden sm:block text-stone-600 hover:text-stone-900 font-medium transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Sign In
            </motion.button>
            <motion.button 
              onClick={() => onChangeView(ViewState.SIGNUP)}
              className="bg-stone-900 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-stone-800 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get Started
            </motion.button>
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-stone-600"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-stone-100 px-6 py-4 space-y-4"
          >
            {['Features', 'Testimonials', 'Pricing', 'FAQ'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="block text-stone-600 hover:text-stone-900">{item}</a>
            ))}
            <button onClick={() => onChangeView(ViewState.SIGNIN)} className="block text-stone-800 font-medium">Sign In</button>
          </motion.div>
        )}
      </motion.nav>

      {/* Hero Section */}
      <section ref={heroRef} className="relative pt-28 pb-16 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            className="text-center max-w-3xl mx-auto mb-12"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.p 
              variants={fadeInUp}
              className="text-gold-600 font-medium mb-4 text-sm tracking-wide uppercase"
            >
              Trusted by 50,000+ believers worldwide
            </motion.p>
            
            <motion.h1 
              variants={fadeInUp}
              className="text-4xl md:text-6xl font-serif text-stone-900 mb-6 leading-tight"
            >
              Your Personal
              <br />
              <span className="text-stone-600">Spiritual Growth Companion</span>
            </motion.h1>
            
            <motion.p 
              variants={fadeInUp}
              className="text-lg text-stone-500 mb-8 max-w-2xl mx-auto leading-relaxed"
            >
              Deepen your faith through structured prayer, daily devotionals, 
              Bible study, and a global community of believers.
            </motion.p>
            
            <motion.div 
              variants={fadeInUp}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <motion.button 
                onClick={() => onChangeView(ViewState.SIGNUP)}
                className="bg-stone-900 text-white px-8 py-3.5 rounded-lg font-medium hover:bg-stone-800 transition-colors flex items-center gap-2"
                whileHover={{ scale: 1.05, boxShadow: "0 10px 30px -10px rgba(0,0,0,0.3)" }}
                whileTap={{ scale: 0.95 }}
              >
                Start Your Journey Free
                <ArrowRight size={18} />
              </motion.button>
              <motion.button 
                className="flex items-center gap-3 text-stone-600 hover:text-stone-900 font-medium px-6 py-3.5 transition-colors"
                whileHover={{ scale: 1.05 }}
              >
                <motion.div 
                  className="w-10 h-10 bg-stone-100 rounded-full flex items-center justify-center"
                  whileHover={{ scale: 1.1, backgroundColor: "#f5f5f4" }}
                >
                  <Play size={16} className="text-stone-600 ml-0.5" />
                </motion.div>
                Watch Demo
              </motion.button>
            </motion.div>

            <motion.p 
              variants={fadeInUp}
              className="text-stone-400 text-sm mt-6"
            >
              No credit card required
            </motion.p>
          </motion.div>
          
          {/* Animated Dashboard Preview */}
          <motion.div 
            ref={dashboardRef}
            className="relative max-w-5xl mx-auto"
            style={{ y: dashboardY, opacity: dashboardOpacity }}
          >
            <motion.div 
              className="bg-white rounded-2xl shadow-2xl shadow-stone-900/10 border border-stone-200 overflow-hidden"
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={isDashboardInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              {/* Browser Chrome */}
              <div className="bg-stone-100 px-4 py-3 flex items-center gap-2 border-b border-stone-200">
                <motion.div 
                  className="w-3 h-3 rounded-full bg-rose-400"
                  initial={{ scale: 0 }}
                  animate={isDashboardInView ? { scale: 1 } : {}}
                  transition={{ delay: 0.3 }}
                />
                <motion.div 
                  className="w-3 h-3 rounded-full bg-amber-400"
                  initial={{ scale: 0 }}
                  animate={isDashboardInView ? { scale: 1 } : {}}
                  transition={{ delay: 0.4 }}
                />
                <motion.div 
                  className="w-3 h-3 rounded-full bg-emerald-400"
                  initial={{ scale: 0 }}
                  animate={isDashboardInView ? { scale: 1 } : {}}
                  transition={{ delay: 0.5 }}
                />
                <span className="ml-4 text-sm text-stone-500">Theolyte Dashboard</span>
              </div>
              
              <div className="flex">
                {/* Sidebar Preview */}
                <motion.div 
                  className="hidden lg:block w-64 bg-stone-900 p-4 border-r border-stone-800"
                  initial={{ x: -50, opacity: 0 }}
                  animate={isDashboardInView ? { x: 0, opacity: 1 } : {}}
                  transition={{ delay: 0.4, duration: 0.6 }}
                >
                  <div className="flex items-center gap-3 mb-8">
                    <motion.div 
                      className="w-10 h-10 bg-gradient-to-br from-gold-400 to-gold-600 rounded-xl flex items-center justify-center"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                      <Cross className="text-white" size={18} />
                    </motion.div>
                    <span className="text-white font-serif font-semibold">Theolyte</span>
                  </div>
                  
                  <div className="space-y-1">
                    {[
                      { icon: Sun, label: 'Dashboard', active: true },
                      { icon: Heart, label: 'Prayer Architect', active: false },
                      { icon: BookOpen, label: 'Bible Reader', active: false },
                      { icon: Sunrise, label: 'Devotionals', active: false },
                      { icon: Flame, label: 'Fasting Tracker', active: false },
                      { icon: Users, label: 'Community', active: false },
                      { icon: Star, label: 'Testimonies', active: false },
                      { icon: Feather, label: 'Journal', active: false },
                      { icon: Target, label: 'Vision Wall', active: false }
                    ].map((item, index) => (
                      <motion.div 
                        key={item.label}
                        className={`flex items-center gap-3 px-3 py-2.5 rounded-lg ${
                          item.active ? 'bg-gold-500/20 text-gold-400' : 'text-stone-400 hover:bg-white/5'
                        }`}
                        initial={{ x: -20, opacity: 0 }}
                        animate={isDashboardInView ? { x: 0, opacity: 1 } : {}}
                        transition={{ delay: 0.5 + index * 0.05 }}
                        whileHover={{ x: 4 }}
                      >
                        <item.icon size={18} />
                        <span className="text-sm font-medium">{item.label}</span>
                      </motion.div>
                    ))}
                  </div>
                  
                  <motion.div 
                    className="mt-8 p-3 bg-gradient-to-br from-indigo-600 to-indigo-700 rounded-xl"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isDashboardInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 1 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <p className="text-xs text-indigo-200 mb-1">Upgrade to Pro</p>
                    <p className="text-sm text-white font-medium">Unlock AI Features</p>
                  </motion.div>
                </motion.div>
                
                {/* Main Dashboard Content */}
                <motion.div 
                  className="flex-1 p-6 bg-gradient-to-br from-stone-50 to-white"
                  initial={{ opacity: 0 }}
                  animate={isDashboardInView ? { opacity: 1 } : {}}
                  transition={{ delay: 0.6 }}
                >
                  {/* Header */}
                  <motion.div 
                    className="flex items-center justify-between mb-6"
                    initial={{ y: -20, opacity: 0 }}
                    animate={isDashboardInView ? { y: 0, opacity: 1 } : {}}
                    transition={{ delay: 0.7 }}
                  >
                    <div>
                      <div className="flex items-center gap-2 text-amber-600 mb-1">
                        <Sun size={16} />
                        <span className="text-sm font-medium">Good Morning, Sarah</span>
                      </div>
                      <h2 className="text-2xl font-serif text-stone-800">Begin your day with purpose.</h2>
                    </div>
                    <div className="flex items-center gap-3">
                      <motion.div 
                        className="bg-gradient-to-br from-orange-500 to-amber-600 px-4 py-2 rounded-xl text-white"
                        whileHover={{ scale: 1.05 }}
                        initial={{ scale: 0 }}
                        animate={isDashboardInView ? { scale: 1 } : {}}
                        transition={{ delay: 0.9, type: "spring" }}
                      >
                        <div className="flex items-center gap-2">
                          <Flame size={18} className="text-yellow-200" />
                          <div>
                            <p className="text-xs text-orange-100">Streak</p>
                            <p className="text-lg font-serif">21 Days</p>
                          </div>
                        </div>
                      </motion.div>
                      <motion.div 
                        className="bg-white px-4 py-2 rounded-xl border border-stone-200"
                        initial={{ scale: 0 }}
                        animate={isDashboardInView ? { scale: 1 } : {}}
                        transition={{ delay: 1, type: "spring" }}
                      >
                        <p className="text-xs text-stone-400">Next Prayer</p>
                        <p className="text-sm font-medium text-stone-800">12:00 PM</p>
                      </motion.div>
                    </div>
                  </motion.div>
                  
                  {/* Active Devotional Banner */}
                  <motion.div 
                    className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl p-3 flex items-center justify-between mb-6"
                    initial={{ x: 50, opacity: 0 }}
                    animate={isDashboardInView ? { x: 0, opacity: 1 } : {}}
                    transition={{ delay: 0.8 }}
                    whileHover={{ scale: 1.01 }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
                        <BookOpen size={18} className="text-amber-600" />
                      </div>
                      <div>
                        <p className="text-xs text-amber-600 font-medium">Continue Reading</p>
                        <p className="text-sm font-semibold text-stone-800">30 Days of Prayer</p>
                      </div>
                    </div>
                    <span className="text-xs text-stone-500">Day 12 of 30</span>
                  </motion.div>
                  
                  <div className="grid grid-cols-3 gap-4">
                    {/* Main Prayer Card */}
                    <motion.div 
                      className="col-span-2 bg-gradient-to-br from-stone-800 to-stone-900 rounded-xl p-6 text-white relative overflow-hidden cursor-pointer"
                      initial={{ y: 30, opacity: 0 }}
                      animate={isDashboardInView ? { y: 0, opacity: 1 } : {}}
                      transition={{ delay: 0.9 }}
                      whileHover={{ scale: 1.02, boxShadow: "0 20px 40px -20px rgba(0,0,0,0.4)" }}
                    >
                      <motion.div 
                        className="absolute top-0 right-0 w-32 h-32 bg-gold-500/10 rounded-full blur-2xl -mr-8 -mt-8"
                        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
                        transition={{ duration: 4, repeat: Infinity }}
                      />
                      <div className="relative z-10">
                        <div className="flex items-center gap-2 mb-3 text-gold-400">
                          <Sun size={16} />
                          <span className="text-xs font-semibold uppercase tracking-wider">Morning Manna</span>
                        </div>
                        <h3 className="text-xl font-serif mb-2">Architect your prayer.</h3>
                        <p className="text-sm text-stone-400 mb-4">Enter a guided session using the A.C.T.S. model.</p>
                        <motion.button 
                          className="bg-gold-600 hover:bg-gold-500 text-stone-900 px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          Start Session <ArrowRight size={14} />
                        </motion.button>
                      </div>
                    </motion.div>
                    
                    {/* Daily Verse */}
                    <motion.div 
                      className="bg-white rounded-xl p-4 border border-stone-200 flex flex-col justify-center"
                      initial={{ y: 30, opacity: 0 }}
                      animate={isDashboardInView ? { y: 0, opacity: 1 } : {}}
                      transition={{ delay: 1 }}
                      whileHover={{ scale: 1.02 }}
                    >
                      <Quote className="text-stone-200 w-8 h-8 mb-2" />
                      <p className="text-sm font-serif text-stone-700 italic leading-relaxed mb-2">
                        "Trust in the LORD with all your heart..."
                      </p>
                      <span className="text-xs text-gold-600 font-medium">Proverbs 3:5</span>
                    </motion.div>
                    
                    {/* Stats Row */}
                    {[
                      { icon: TrendingUp, label: 'This Week', value: '4.5 hrs', sub: 'Prayer time', color: 'text-emerald-600' },
                      { icon: Users, label: 'Community', value: '1,247', sub: 'Praying for you', color: 'text-indigo-600' },
                      { icon: Star, label: 'Testimonies', value: '23', sub: 'Answered prayers', color: 'text-rose-600' }
                    ].map((stat, index) => (
                      <motion.div 
                        key={stat.label}
                        className="bg-white rounded-xl p-4 border border-stone-200"
                        initial={{ y: 30, opacity: 0 }}
                        animate={isDashboardInView ? { y: 0, opacity: 1 } : {}}
                        transition={{ delay: 1.1 + index * 0.1 }}
                        whileHover={{ scale: 1.05, y: -5 }}
                      >
                        <div className={`flex items-center gap-2 ${stat.color} mb-2`}>
                          <stat.icon size={14} />
                          <span className="text-xs font-medium">{stat.label}</span>
                        </div>
                        <p className="text-2xl font-serif text-stone-800">{stat.value}</p>
                        <p className="text-xs text-stone-500">{stat.sub}</p>
                      </motion.div>
                    ))}
                    
                    {/* Weekly Chart Preview */}
                    <motion.div 
                      className="col-span-2 bg-white rounded-xl p-4 border border-stone-200"
                      initial={{ y: 30, opacity: 0 }}
                      animate={isDashboardInView ? { y: 0, opacity: 1 } : {}}
                      transition={{ delay: 1.4 }}
                    >
                      <div className="flex justify-between items-center mb-4">
                        <div>
                          <h4 className="text-sm font-medium text-stone-800">Spiritual Rhythms</h4>
                          <p className="text-xs text-stone-400">Prayer consistency</p>
                        </div>
                        <span className="text-xs text-emerald-600 font-medium">+12% this week</span>
                      </div>
                      <div className="flex items-end gap-2 h-20">
                        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => (
                          <motion.div 
                            key={day} 
                            className="flex-1 flex flex-col items-center gap-1"
                            initial={{ scaleY: 0 }}
                            animate={isDashboardInView ? { scaleY: 1 } : {}}
                            transition={{ delay: 1.5 + i * 0.05, duration: 0.4 }}
                            style={{ originY: 1 }}
                          >
                            <motion.div 
                              className={`w-full rounded-t ${i === 3 ? 'bg-gold-500' : 'bg-stone-200'}`}
                              style={{ height: `${[40, 60, 45, 80, 55, 70, 50][i]}%` }}
                              whileHover={{ backgroundColor: i === 3 ? '#b4941f' : '#d6d3d1' }}
                            />
                            <span className="text-[10px] text-stone-400">{day}</span>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                    
                    {/* Quick Actions */}
                    <motion.div 
                      className="bg-white rounded-xl p-4 border border-stone-200"
                      initial={{ y: 30, opacity: 0 }}
                      animate={isDashboardInView ? { y: 0, opacity: 1 } : {}}
                      transition={{ delay: 1.5 }}
                    >
                      <p className="text-xs font-medium text-stone-600 mb-3">Quick Actions</p>
                      <div className="space-y-2">
                        {[
                          { icon: BookOpen, label: 'Read Bible' },
                          { icon: Feather, label: 'Write Journal' },
                          { icon: Users, label: 'Community' }
                        ].map((action, index) => (
                          <motion.div 
                            key={action.label}
                            className="flex items-center gap-2 text-xs text-stone-700 p-2 bg-stone-50 rounded-lg cursor-pointer"
                            whileHover={{ backgroundColor: '#f5f5f4', x: 4 }}
                            initial={{ x: -10, opacity: 0 }}
                            animate={isDashboardInView ? { x: 0, opacity: 1 } : {}}
                            transition={{ delay: 1.6 + index * 0.1 }}
                          >
                            <action.icon size={12} /> {action.label}
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div 
            className="flex justify-center mt-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
          >
            <motion.a 
              href="#stats" 
              className="flex flex-col items-center text-stone-400 hover:text-stone-600 transition-colors"
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <span className="text-sm mb-2">Learn More</span>
              <ArrowDown size={20} />
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section id="stats" className="py-16 px-6 bg-white border-y border-stone-100">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            {stats.map((stat, index) => (
              <motion.div 
                key={index} 
                className="text-center"
                variants={fadeInUp}
              >
                <motion.p 
                  className="text-3xl md:text-4xl font-serif text-stone-900 mb-1"
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, type: "spring" }}
                >
                  {stat.value}
                </motion.p>
                <p className="text-stone-500 text-sm">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Problems We Solve */}
      <section className="py-16 px-6 bg-stone-50">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            className="text-center mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <p className="text-gold-600 font-medium mb-2 text-sm tracking-wide uppercase">We Understand</p>
            <h2 className="text-3xl md:text-4xl font-serif text-stone-900">
              Common Challenges We Help You Overcome
            </h2>
          </motion.div>
          
          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
          >
            {problemsSolved.map((item, index) => (
              <motion.div 
                key={index}
                className="bg-white rounded-lg p-5 border border-stone-200"
                variants={fadeInUp}
                whileHover={{ y: -5, boxShadow: "0 10px 30px -15px rgba(0,0,0,0.1)" }}
              >
                <motion.div 
                  className="w-10 h-10 bg-stone-100 rounded-lg flex items-center justify-center mb-3"
                  whileHover={{ scale: 1.1, backgroundColor: "#fef3c7" }}
                >
                  <item.icon className="text-stone-600" size={20} />
                </motion.div>
                <h3 className="font-semibold text-stone-800 mb-1">{item.problem}</h3>
                <p className="text-stone-500 text-sm">{item.solution}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            className="text-center mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <p className="text-gold-600 font-medium mb-2 text-sm tracking-wide uppercase">Features</p>
            <h2 className="text-3xl md:text-4xl font-serif text-stone-900">
              Everything You Need for Spiritual Growth
            </h2>
          </motion.div>
          
          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-5"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
          >
            {coreFeatures.map((feature, index) => (
              <motion.div 
                key={index}
                className="bg-stone-50 rounded-lg p-6 border border-stone-100 hover:border-stone-200 transition-colors"
                variants={fadeInUp}
                whileHover={{ y: -8, boxShadow: "0 20px 40px -20px rgba(0,0,0,0.1)" }}
              >
                <motion.div 
                  className="w-11 h-11 bg-stone-900 rounded-lg flex items-center justify-center mb-4"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <feature.icon className="text-gold-400" size={22} />
                </motion.div>
                <h3 className="text-lg font-semibold text-stone-900 mb-2">{feature.title}</h3>
                <p className="text-stone-500 text-sm leading-relaxed mb-4">{feature.description}</p>
                <ul className="space-y-1.5">
                  {feature.details.map((detail, dIndex) => (
                    <motion.li 
                      key={dIndex} 
                      className="flex items-center gap-2 text-xs text-stone-400"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: dIndex * 0.1 }}
                    >
                      <CheckCircle2 size={12} className="text-stone-400" />
                      {detail}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-6 bg-stone-50">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            className="text-center mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <p className="text-gold-600 font-medium mb-2 text-sm tracking-wide uppercase">How It Works</p>
            <h2 className="text-3xl md:text-4xl font-serif text-stone-900">
              Your Journey to Deeper Faith
            </h2>
          </motion.div>
          
          <motion.div 
            className="grid md:grid-cols-3 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {journeySteps.map((item, index) => (
              <motion.div key={index} className="relative" variants={fadeInUp}>
                <motion.div 
                  className="bg-white rounded-lg p-6 border border-stone-200"
                  whileHover={{ y: -5, boxShadow: "0 15px 30px -15px rgba(0,0,0,0.1)" }}
                >
                  <div className="text-4xl font-serif text-stone-200 mb-3">{item.step}</div>
                  <motion.div 
                    className="w-10 h-10 bg-stone-900 rounded-lg flex items-center justify-center mb-3"
                    whileHover={{ scale: 1.1 }}
                  >
                    <item.icon className="text-gold-400" size={20} />
                  </motion.div>
                  <h3 className="text-lg font-semibold text-stone-900 mb-2">{item.title}</h3>
                  <p className="text-stone-500 text-sm">{item.description}</p>
                </motion.div>
                {index < 2 && (
                  <motion.div 
                    className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-10"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                  >
                    <ArrowRight className="text-stone-300" size={20} />
                  </motion.div>
                )}
              </motion.div>
            ))}
          </motion.div>

          <motion.div 
            className="text-center mt-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <motion.button 
              onClick={() => onChangeView(ViewState.SIGNUP)}
              className="bg-stone-900 text-white px-8 py-3.5 rounded-lg font-medium hover:bg-stone-800 transition-colors inline-flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Begin Your Journey
              <ArrowRight size={18} />
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-16 px-6 bg-stone-900 text-white">
        <div className="max-w-4xl mx-auto">
          <motion.div 
            className="text-center mb-10"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <p className="text-gold-400 font-medium mb-2 text-sm tracking-wide uppercase">Testimonials</p>
            <h2 className="text-3xl md:text-4xl font-serif">
              Loved by Believers Worldwide
            </h2>
          </motion.div>
          
          <motion.div 
            className="bg-stone-800 rounded-lg p-8"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <Quote className="text-stone-700 mb-4" size={32} />
            <motion.p 
              key={activeTestimonial}
              className="text-xl md:text-2xl font-serif text-white/90 mb-6 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              "{testimonials[activeTestimonial].quote}"
            </motion.p>
            <motion.div 
              className="flex items-center gap-3"
              key={`author-${activeTestimonial}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <img 
                src={testimonials[activeTestimonial].avatar} 
                alt={testimonials[activeTestimonial].author}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <p className="font-medium text-white">{testimonials[activeTestimonial].author}</p>
                <p className="text-stone-400 text-sm">{testimonials[activeTestimonial].role}</p>
              </div>
            </motion.div>
          </motion.div>
          
          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => setActiveTestimonial(index)}
                className={`h-2 rounded-full transition-all ${
                  index === activeTestimonial ? 'bg-gold-500 w-6' : 'bg-stone-700 w-2'
                }`}
                whileHover={{ scale: 1.2 }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-16 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <motion.div 
            className="text-center mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <p className="text-gold-600 font-medium mb-2 text-sm tracking-wide uppercase">Pricing</p>
            <h2 className="text-3xl md:text-4xl font-serif text-stone-900">
              Choose Your Path
            </h2>
          </motion.div>
          
          <motion.div 
            className="grid md:grid-cols-3 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {pricingPlans.map((plan, index) => (
              <motion.div 
                key={index}
                className={`rounded-lg p-6 ${
                  plan.highlighted 
                    ? 'bg-stone-900 text-white ring-2 ring-gold-500' 
                    : 'bg-stone-50 border border-stone-200'
                }`}
                variants={fadeInUp}
                whileHover={{ y: -10, boxShadow: plan.highlighted ? "0 25px 50px -12px rgba(0,0,0,0.4)" : "0 20px 40px -20px rgba(0,0,0,0.1)" }}
              >
                {plan.highlighted && (
                  <motion.div 
                    className="bg-gold-500 text-stone-900 text-xs font-semibold px-3 py-1 rounded-full inline-block mb-3"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", delay: 0.3 }}
                  >
                    Most Popular
                  </motion.div>
                )}
                <h3 className={`text-lg font-semibold mb-1 ${plan.highlighted ? 'text-white' : 'text-stone-900'}`}>
                  {plan.name}
                </h3>
                <div className="flex items-baseline gap-1 mb-1">
                  <span className={`text-3xl font-serif ${plan.highlighted ? 'text-white' : 'text-stone-900'}`}>
                    {plan.price}
                  </span>
                  <span className={plan.highlighted ? 'text-stone-400' : 'text-stone-500'}>
                    {plan.period}
                  </span>
                </div>
                <p className={`text-sm mb-5 ${plan.highlighted ? 'text-stone-400' : 'text-stone-500'}`}>
                  {plan.description}
                </p>
                <ul className="space-y-2 mb-6">
                  {plan.features.map((feature, fIndex) => (
                    <motion.li 
                      key={fIndex} 
                      className="flex items-center gap-2 text-sm"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: fIndex * 0.05 }}
                    >
                      <Check size={14} className={plan.highlighted ? 'text-gold-400' : 'text-stone-400'} />
                      <span className={plan.highlighted ? 'text-stone-300' : 'text-stone-600'}>{feature}</span>
                    </motion.li>
                  ))}
                </ul>
                <motion.button 
                  onClick={() => onChangeView(ViewState.SIGNUP)}
                  className={`w-full py-2.5 rounded-lg font-medium transition-colors ${
                    plan.highlighted 
                      ? 'bg-gold-500 text-stone-900 hover:bg-gold-400' 
                      : 'bg-stone-900 text-white hover:bg-stone-800'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {plan.cta}
                </motion.button>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-16 px-6 bg-stone-50">
        <div className="max-w-2xl mx-auto">
          <motion.div 
            className="text-center mb-10"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <p className="text-gold-600 font-medium mb-2 text-sm tracking-wide uppercase">FAQ</p>
            <h2 className="text-3xl md:text-4xl font-serif text-stone-900">
              Frequently Asked Questions
            </h2>
          </motion.div>
          
          <motion.div 
            className="space-y-3"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {faqs.map((faq, index) => (
              <motion.div 
                key={index}
                className="bg-white rounded-lg border border-stone-200 overflow-hidden"
                variants={fadeInUp}
              >
                <motion.button
                  onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                  className="w-full flex items-center justify-between p-5 text-left"
                  whileHover={{ backgroundColor: "#fafaf9" }}
                >
                  <span className="font-medium text-stone-900 pr-4">{faq.question}</span>
                  <motion.div
                    animate={{ rotate: activeFaq === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown size={18} className="text-stone-400 flex-shrink-0" />
                  </motion.div>
                </motion.button>
                <motion.div
                  initial={false}
                  animate={{ 
                    height: activeFaq === index ? "auto" : 0,
                    opacity: activeFaq === index ? 1 : 0
                  }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="px-5 pb-5">
                    <p className="text-stone-500 text-sm leading-relaxed">{faq.answer}</p>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6 bg-white">
        <motion.div 
          className="max-w-3xl mx-auto text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <motion.div 
            className="w-14 h-14 bg-stone-900 rounded-xl flex items-center justify-center mx-auto mb-6"
            variants={scaleIn}
            whileHover={{ scale: 1.1, rotate: 5 }}
          >
            <Cross className="text-gold-400" size={28} />
          </motion.div>
          <motion.h2 
            className="text-3xl md:text-4xl font-serif text-stone-900 mb-4"
            variants={fadeInUp}
          >
            Ready to Transform Your Spiritual Life?
          </motion.h2>
          <motion.p 
            className="text-stone-500 mb-8 max-w-xl mx-auto"
            variants={fadeInUp}
          >
            Join thousands of believers deepening their faith and experiencing God's presence like never before.
          </motion.p>
          <motion.button 
            onClick={() => onChangeView(ViewState.SIGNUP)}
            className="bg-stone-900 text-white px-8 py-3.5 rounded-lg font-medium hover:bg-stone-800 transition-colors inline-flex items-center gap-2"
            variants={fadeInUp}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Start Your Free Journey
            <ArrowRight size={18} />
          </motion.button>
          <motion.p 
            className="text-stone-400 text-sm mt-4"
            variants={fadeInUp}
          >
            No credit card required
          </motion.p>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="bg-stone-900 text-white py-12 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Mobile App Section */}
          <motion.div 
            className="bg-stone-800 rounded-lg p-6 mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="grid md:grid-cols-2 gap-6 items-center">
              <div>
                <h3 className="text-xl font-serif mb-2">
                  Take Your Faith Journey Everywhere
                </h3>
                <p className="text-stone-400 text-sm mb-4">
                  Download the Theolyte mobile app for iOS and Android.
                </p>
                <div className="flex flex-wrap gap-3">
                  <motion.a 
                    href="#" 
                    className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg border border-stone-700"
                    whileHover={{ scale: 1.05, backgroundColor: "#1c1917" }}
                  >
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                    </svg>
                    <div className="text-left">
                      <p className="text-[9px] text-stone-400 leading-none">Download on the</p>
                      <p className="text-sm font-medium leading-tight">App Store</p>
                    </div>
                  </motion.a>
                  
                  <motion.a 
                    href="#" 
                    className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg border border-stone-700"
                    whileHover={{ scale: 1.05, backgroundColor: "#1c1917" }}
                  >
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
                    </svg>
                    <div className="text-left">
                      <p className="text-[9px] text-stone-400 leading-none">GET IT ON</p>
                      <p className="text-sm font-medium leading-tight">Google Play</p>
                    </div>
                  </motion.a>
                </div>
              </div>
              
              {/* Phone Mockup */}
              <div className="hidden md:flex justify-center">
                <motion.div 
                  className="w-40 h-80 bg-stone-950 rounded-3xl p-2 border-4 border-stone-700"
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                >
                  <div className="w-full h-full bg-stone-900 rounded-2xl overflow-hidden p-3">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-6 h-6 bg-gold-500 rounded-md flex items-center justify-center">
                        <Cross className="text-white" size={10} />
                      </div>
                      <span className="text-white text-xs font-serif">Theolyte</span>
                    </div>
                    <div className="bg-stone-800 rounded-lg p-2 mb-2">
                      <p className="text-[8px] text-gold-400">Daily Verse</p>
                      <p className="text-[9px] text-white/70 italic">"Trust in the LORD..."</p>
                    </div>
                    <motion.div 
                      className="bg-gold-500 rounded-lg p-2 mb-2"
                      animate={{ scale: [1, 1.02, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <div className="flex items-center gap-1">
                        <Flame size={10} className="text-white" />
                        <span className="text-[10px] text-white font-medium">21 Day Streak</span>
                      </div>
                    </motion.div>
                    <div className="space-y-1">
                      {['Pray', 'Read', 'Community'].map((item) => (
                        <div key={item} className="bg-stone-800 rounded p-1.5 flex items-center gap-1">
                          <div className="w-3 h-3 bg-stone-700 rounded" />
                          <span className="text-[9px] text-stone-400">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gold-500 rounded-lg flex items-center justify-center">
                  <Cross className="text-white" size={16} />
                </div>
                <span className="font-serif font-semibold">Theolyte</span>
              </div>
              <p className="text-stone-400 text-sm">
                Empowering believers to deepen their faith through technology and community.
              </p>
            </div>
            
            {[
              { title: 'Product', links: ['Features', 'Pricing', 'iOS App', 'Android App'] },
              { title: 'Resources', links: ['Blog', 'Devotionals', 'Prayer Guides', 'Help Center'] },
              { title: 'Company', links: ['About Us', 'Privacy Policy', 'Terms of Service'] }
            ].map((section) => (
              <div key={section.title}>
                <h4 className="font-medium mb-3 text-sm">{section.title}</h4>
                <ul className="space-y-2 text-stone-400 text-sm">
                  {section.links.map((link) => (
                    <li key={link}>
                      <motion.a 
                        href="#" 
                        className="hover:text-white transition-colors"
                        whileHover={{ x: 4 }}
                      >
                        {link}
                      </motion.a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          
          <div className="border-t border-stone-800 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-stone-500 text-sm">
              © 2024 Theolyte. All rights reserved.
            </p>
            <p className="text-stone-600 text-sm italic">
              "Draw near to God, and He will draw near to you." — James 4:8
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
