import React, { useState, useEffect } from 'react';
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
  Zap,
  Shield,
  Clock,
  Target,
  MessageCircle,
  TrendingUp,
  Award,
  Globe,
  Smartphone,
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
  Mountain
} from 'lucide-react';
import { ViewState } from '@/types';
import ParticleBackground from './ParticleBackground';

interface LandingPageProps {
  onChangeView: (view: ViewState) => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onChangeView }) => {
  const [scrolled, setScrolled] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

  // Core Features - What the app does
  const coreFeatures = [
    {
      icon: BookOpen,
      title: 'Bible Reader',
      description: 'Immerse yourself in Scripture with multiple translations, bookmarks, highlighting, and personalized daily reading plans that adapt to your pace.',
      color: 'text-emerald-600',
      bg: 'bg-emerald-50',
      details: ['Multiple translations (KJV, NIV, ESV, NLT)', 'Verse highlighting & notes', 'Audio Bible option', 'Cross-references']
    },
    {
      icon: Heart,
      title: 'Prayer Architect',
      description: 'Build structured, meaningful prayers using the ACTS method (Adoration, Confession, Thanksgiving, Supplication) with AI-powered scripture suggestions.',
      color: 'text-rose-600',
      bg: 'bg-rose-50',
      details: ['ACTS prayer framework', 'AI scripture integration', 'Prayer templates', 'Voice-to-text prayer']
    },
    {
      icon: Flame,
      title: 'Fasting Tracker',
      description: 'Track your fasting journey with guided plans for Daniel Fast, water fast, and intermittent fasting. Get health tips and spiritual insights.',
      color: 'text-amber-600',
      bg: 'bg-amber-50',
      details: ['Multiple fasting types', 'Health monitoring', 'Spiritual reflections', 'Community fasting events']
    },
    {
      icon: Users,
      title: 'Community Prayer',
      description: 'Join a global community of believers lifting prayers together. Share requests anonymously, pray for others, and celebrate answered prayers.',
      color: 'text-indigo-600',
      bg: 'bg-indigo-50',
      details: ['Anonymous prayer requests', 'Prayer chains', 'Global prayer wall', 'Answered prayer celebrations']
    },
    {
      icon: Star,
      title: 'Testimony Journal',
      description: 'Document God\'s faithfulness in your life. Record answered prayers, spiritual breakthroughs, and moments of divine intervention.',
      color: 'text-yellow-600',
      bg: 'bg-yellow-50',
      details: ['Timeline view', 'Photo attachments', 'Share with community', 'Anniversary reminders']
    },
    {
      icon: Target,
      title: 'Vision Wall',
      description: 'Create a visual board of your God-given dreams and spiritual goals. Track progress and stay aligned with your divine purpose.',
      color: 'text-purple-600',
      bg: 'bg-purple-50',
      details: ['Visual goal boards', 'Scripture affirmations', 'Progress tracking', 'Goal milestones']
    },
    {
      icon: Sunrise,
      title: 'Daily Devotionals',
      description: 'Start each day with AI-curated devotionals personalized to your spiritual journey, struggles, and growth areas.',
      color: 'text-orange-600',
      bg: 'bg-orange-50',
      details: ['Personalized content', 'Multiple devotional plans', 'Reflection prompts', 'Daily verse delivery']
    },
    {
      icon: Feather,
      title: 'Journal Weaver',
      description: 'A sacred space for spiritual journaling. Write prayers, reflections, and insights with guided prompts and scripture integration.',
      color: 'text-teal-600',
      bg: 'bg-teal-50',
      details: ['Guided prompts', 'Mood tracking', 'Scripture linking', 'Private & secure']
    },
    {
      icon: Compass,
      title: 'Purpose Aligner',
      description: 'Discover and align with your God-given purpose through guided exercises, spiritual gifts assessments, and calling exploration.',
      color: 'text-cyan-600',
      bg: 'bg-cyan-50',
      details: ['Spiritual gifts test', 'Calling discovery', 'Life purpose mapping', 'Mentor matching']
    }
  ];

  // Problems the app solves
  const problemsSolved = [
    {
      problem: "Inconsistent Prayer Life",
      solution: "Structured prayer tools with reminders and streak tracking keep you accountable",
      icon: Clock
    },
    {
      problem: "Feeling Spiritually Isolated",
      solution: "Connect with a global community of believers who pray for and with you",
      icon: Users
    },
    {
      problem: "Difficulty Understanding Scripture",
      solution: "AI-powered insights and cross-references make the Bible accessible",
      icon: Lightbulb
    },
    {
      problem: "Forgetting God's Faithfulness",
      solution: "Testimony journal helps you remember and celebrate answered prayers",
      icon: BookMarked
    },
    {
      problem: "Lack of Spiritual Direction",
      solution: "Purpose alignment tools and devotionals guide your spiritual growth",
      icon: Compass
    },
    {
      problem: "Struggling with Spiritual Disciplines",
      solution: "Gamified tracking and community support make disciplines enjoyable",
      icon: Mountain
    }
  ];

  const testimonials = [
    {
      quote: "Sanctum AI has completely transformed my prayer life. The ACTS method helped me develop a deeper, more structured relationship with God. I've maintained a 90-day prayer streak!",
      author: "Sarah Mitchell",
      role: "Youth Pastor, Grace Community Church",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80",
      location: "Austin, TX"
    },
    {
      quote: "The community prayer feature connected me with believers worldwide during my cancer journey. Knowing thousands were praying for me gave me strength I never knew I had.",
      author: "David Kim",
      role: "Small Group Leader",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80",
      location: "Seoul, South Korea"
    },
    {
      quote: "Finally, an app that takes spiritual growth seriously. The devotional plans and Bible reader are beautifully designed. It's like having a personal spiritual director in my pocket.",
      author: "Grace Okonkwo",
      role: "Ministry Director",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80",
      location: "Lagos, Nigeria"
    },
    {
      quote: "The fasting tracker helped our church complete a 21-day corporate fast. The community features kept everyone encouraged and accountable throughout the journey.",
      author: "Pastor Michael Chen",
      role: "Senior Pastor, New Life Fellowship",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80",
      location: "Vancouver, Canada"
    },
    {
      quote: "I've tried many Christian apps, but Sanctum AI is different. The AI-powered scripture suggestions during prayer time always seem to speak directly to my situation.",
      author: "Rebecca Thompson",
      role: "Worship Leader",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&q=80",
      location: "Nashville, TN"
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
      description: 'Perfect for starting your spiritual journey',
      features: [
        'Daily devotionals',
        'Basic prayer tracking',
        'Bible reader (KJV)',
        'Personal journal',
        'Community prayer wall',
        '7-day prayer history'
      ],
      cta: 'Get Started Free',
      highlighted: false
    },
    {
      name: 'Believer',
      price: '$9.99',
      period: '/month',
      description: 'For dedicated disciples seeking deeper growth',
      features: [
        'Everything in Free',
        'AI-powered prayer insights',
        'All Bible translations',
        'Advanced fasting tracker',
        'Unlimited testimonies',
        'Prayer analytics & insights',
        'Offline access',
        'Audio Bible',
        'Priority support'
      ],
      cta: 'Start 7-Day Free Trial',
      highlighted: true
    },
    {
      name: 'Ministry',
      price: '$29.99',
      period: '/month',
      description: 'For churches and small groups',
      features: [
        'Everything in Believer',
        'Up to 50 members',
        'Group prayer chains',
        'Shared devotional plans',
        'Ministry dashboard',
        'Member analytics',
        'Custom branding',
        'API access',
        'Dedicated support'
      ],
      cta: 'Contact Sales',
      highlighted: false
    }
  ];

  const faqs = [
    {
      question: "What makes Sanctum AI different from other Christian apps?",
      answer: "Sanctum AI combines the power of artificial intelligence with time-tested spiritual disciplines. Our AI doesn't replace your relationship with God—it enhances it by suggesting relevant scriptures, providing personalized devotionals, and helping you build consistent prayer habits. Plus, our global community feature connects you with believers worldwide for mutual encouragement and prayer support."
    },
    {
      question: "Is my prayer data private and secure?",
      answer: "Absolutely. Your spiritual journey is sacred, and we treat it that way. All prayer entries, journal writings, and personal data are encrypted end-to-end. We never sell your data or use it for advertising. You can also choose to make prayer requests anonymous when sharing with the community."
    },
    {
      question: "Can I use Sanctum AI offline?",
      answer: "Yes! Believer and Ministry plan subscribers can download devotionals, Bible passages, and their prayer history for offline access. Perfect for retreats, mission trips, or areas with limited connectivity."
    },
    {
      question: "How does the AI-powered prayer feature work?",
      answer: "When you write a prayer or share a concern, our AI analyzes the themes and emotions to suggest relevant Bible verses, prayers from Scripture, and devotional content. It's like having a concordance that understands context. The AI learns your preferences over time to provide increasingly personalized suggestions."
    },
    {
      question: "Is Sanctum AI suitable for my church or small group?",
      answer: "Absolutely! Our Ministry plan is designed specifically for churches and small groups. You can create shared prayer chains, assign devotional plans to your group, track engagement, and foster community through our group features. Many churches use Sanctum AI for corporate fasting events and prayer initiatives."
    },
    {
      question: "What denominations is Sanctum AI designed for?",
      answer: "Sanctum AI is designed for all Christians, regardless of denomination. Our content focuses on core Christian beliefs and practices that unite believers across traditions. You can customize your experience based on your theological preferences and devotional style."
    }
  ];

  const journeySteps = [
    {
      step: '01',
      title: 'Create Your Sanctuary',
      description: 'Sign up in seconds and personalize your spiritual dashboard. Set your prayer times, choose your Bible translation, and define your spiritual goals.',
      icon: Shield,
      color: 'from-gold-400 to-gold-600'
    },
    {
      step: '02',
      title: 'Build Daily Habits',
      description: 'Follow guided devotionals, track your prayer streaks, and develop consistent spiritual disciplines. Our gentle reminders keep you on track without being intrusive.',
      icon: Clock,
      color: 'from-emerald-400 to-emerald-600'
    },
    {
      step: '03',
      title: 'Grow Together',
      description: 'Connect with believers worldwide, share testimonies, and experience the power of community prayer. Your faith journey is better when shared.',
      icon: TrendingUp,
      color: 'from-indigo-400 to-indigo-600'
    }
  ];

  return (
    <div className="min-h-screen bg-stone-50 overflow-x-hidden overflow-y-auto">
      <ParticleBackground />
      
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-gold-400 to-gold-600 rounded-xl flex items-center justify-center shadow-lg">
              <Cross className="text-white" size={20} />
            </div>
            <span className="text-2xl font-serif font-semibold text-stone-800">Sanctum AI</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            <a href="#what-is" className="text-stone-600 hover:text-stone-900 transition-colors">What is Sanctum?</a>
            <a href="#features" className="text-stone-600 hover:text-stone-900 transition-colors">Features</a>
            <a href="#testimonials" className="text-stone-600 hover:text-stone-900 transition-colors">Testimonials</a>
            <a href="#pricing" className="text-stone-600 hover:text-stone-900 transition-colors">Pricing</a>
            <a href="#faq" className="text-stone-600 hover:text-stone-900 transition-colors">FAQ</a>
          </div>
          
          <div className="flex items-center gap-4">
            <button 
              onClick={() => onChangeView(ViewState.SIGNIN)}
              className="hidden sm:block text-stone-600 hover:text-stone-900 font-medium transition-colors"
            >
              Sign In
            </button>
            <button 
              onClick={() => onChangeView(ViewState.SIGNUP)}
              className="bg-gradient-to-r from-gold-500 to-gold-600 text-white px-5 py-2.5 rounded-xl font-medium hover:from-gold-600 hover:to-gold-700 transition-all shadow-lg shadow-gold-500/25 hover:shadow-gold-500/40"
            >
              Get Started
            </button>
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-stone-600"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-stone-200 px-6 py-4 space-y-4">
            <a href="#what-is" className="block text-stone-600 hover:text-stone-900">What is Sanctum?</a>
            <a href="#features" className="block text-stone-600 hover:text-stone-900">Features</a>
            <a href="#testimonials" className="block text-stone-600 hover:text-stone-900">Testimonials</a>
            <a href="#pricing" className="block text-stone-600 hover:text-stone-900">Pricing</a>
            <a href="#faq" className="block text-stone-600 hover:text-stone-900">FAQ</a>
            <button 
              onClick={() => onChangeView(ViewState.SIGNIN)}
              className="block text-gold-600 font-medium"
            >
              Sign In
            </button>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gold-50/50 via-transparent to-transparent" />
        
        {/* Decorative Elements */}
        <div className="absolute top-40 left-10 w-72 h-72 bg-gold-200/30 rounded-full blur-3xl" />
        <div className="absolute top-60 right-10 w-96 h-96 bg-indigo-200/20 rounded-full blur-3xl" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-gold-100 text-gold-700 px-4 py-2 rounded-full text-sm font-medium mb-8">
              <Sparkles size={16} />
              <span>Trusted by 50,000+ believers worldwide</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-serif text-stone-900 mb-6 leading-tight">
              Your Personal
              <br />
              <span className="bg-gradient-to-r from-gold-500 to-gold-700 bg-clip-text text-transparent">
                Spiritual Growth Companion
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-stone-600 mb-10 max-w-3xl mx-auto leading-relaxed">
              Sanctum AI is the all-in-one platform that helps Christians deepen their faith through 
              <span className="text-stone-800 font-medium"> structured prayer</span>, 
              <span className="text-stone-800 font-medium"> daily devotionals</span>, 
              <span className="text-stone-800 font-medium"> Bible study</span>, and 
              <span className="text-stone-800 font-medium"> global community</span>.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
              <button 
                onClick={() => onChangeView(ViewState.SIGNUP)}
                className="group bg-gradient-to-r from-stone-800 to-stone-900 text-white px-8 py-4 rounded-xl font-medium hover:from-stone-900 hover:to-black transition-all shadow-xl shadow-stone-900/20 flex items-center gap-3"
              >
                Start Your Journey Free
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="flex items-center gap-3 text-stone-600 hover:text-stone-900 font-medium px-6 py-4 rounded-xl hover:bg-white/50 transition-all">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
                  <Play size={18} className="text-gold-600 ml-1" />
                </div>
                Watch 2-Min Demo
              </button>
            </div>

            <p className="text-stone-500 text-sm">No credit card required • Free forever plan available</p>
          </div>
          
          {/* Hero Image/Preview - Full Dashboard Preview */}
          <div className="mt-16 relative">
            <div className="absolute inset-0 bg-gradient-to-t from-stone-50 via-transparent to-transparent z-10 pointer-events-none" />
            <div className="bg-white rounded-2xl shadow-2xl shadow-stone-900/10 border border-stone-200 overflow-hidden mx-auto max-w-6xl">
              <div className="bg-stone-100 px-4 py-3 flex items-center gap-2 border-b border-stone-200">
                <div className="w-3 h-3 rounded-full bg-rose-400" />
                <div className="w-3 h-3 rounded-full bg-amber-400" />
                <div className="w-3 h-3 rounded-full bg-emerald-400" />
                <span className="ml-4 text-sm text-stone-500">Sanctum AI Dashboard</span>
                <div className="ml-auto flex items-center gap-2">
                  <span className="text-xs text-stone-400">sanctum.ai/dashboard</span>
                </div>
              </div>
              
              <div className="flex">
                {/* Sidebar Preview */}
                <div className="hidden lg:block w-64 bg-stone-900 p-4 border-r border-stone-800">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-10 h-10 bg-gradient-to-br from-gold-400 to-gold-600 rounded-xl flex items-center justify-center">
                      <Cross className="text-white" size={18} />
                    </div>
                    <span className="text-white font-serif font-semibold">Sanctum AI</span>
                  </div>
                  
                  <div className="space-y-1">
                    <div className="flex items-center gap-3 px-3 py-2.5 bg-gold-500/20 rounded-lg text-gold-400">
                      <Sun size={18} />
                      <span className="text-sm font-medium">Dashboard</span>
                    </div>
                    <div className="flex items-center gap-3 px-3 py-2.5 text-stone-400 hover:bg-white/5 rounded-lg">
                      <Heart size={18} />
                      <span className="text-sm">Prayer Architect</span>
                    </div>
                    <div className="flex items-center gap-3 px-3 py-2.5 text-stone-400 hover:bg-white/5 rounded-lg">
                      <BookOpen size={18} />
                      <span className="text-sm">Bible Reader</span>
                    </div>
                    <div className="flex items-center gap-3 px-3 py-2.5 text-stone-400 hover:bg-white/5 rounded-lg">
                      <Sunrise size={18} />
                      <span className="text-sm">Devotionals</span>
                    </div>
                    <div className="flex items-center gap-3 px-3 py-2.5 text-stone-400 hover:bg-white/5 rounded-lg">
                      <Flame size={18} />
                      <span className="text-sm">Fasting Tracker</span>
                    </div>
                    <div className="flex items-center gap-3 px-3 py-2.5 text-stone-400 hover:bg-white/5 rounded-lg">
                      <Users size={18} />
                      <span className="text-sm">Community</span>
                    </div>
                    <div className="flex items-center gap-3 px-3 py-2.5 text-stone-400 hover:bg-white/5 rounded-lg">
                      <Star size={18} />
                      <span className="text-sm">Testimonies</span>
                    </div>
                    <div className="flex items-center gap-3 px-3 py-2.5 text-stone-400 hover:bg-white/5 rounded-lg">
                      <Feather size={18} />
                      <span className="text-sm">Journal</span>
                    </div>
                    <div className="flex items-center gap-3 px-3 py-2.5 text-stone-400 hover:bg-white/5 rounded-lg">
                      <Target size={18} />
                      <span className="text-sm">Vision Wall</span>
                    </div>
                  </div>
                  
                  <div className="mt-8 p-3 bg-gradient-to-br from-indigo-600 to-indigo-700 rounded-xl">
                    <p className="text-xs text-indigo-200 mb-1">Upgrade to Pro</p>
                    <p className="text-sm text-white font-medium">Unlock AI Features</p>
                  </div>
                </div>
                
                {/* Main Dashboard Content */}
                <div className="flex-1 p-6 bg-gradient-to-br from-stone-50 to-white">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <div className="flex items-center gap-2 text-amber-600 mb-1">
                        <Sun size={16} />
                        <span className="text-sm font-medium">Good Morning, Sarah</span>
                      </div>
                      <h2 className="text-2xl font-serif text-stone-800">Begin your day with purpose.</h2>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="bg-gradient-to-br from-orange-500 to-amber-600 px-4 py-2 rounded-xl text-white">
                        <div className="flex items-center gap-2">
                          <Flame size={18} className="text-yellow-200" />
                          <div>
                            <p className="text-xs text-orange-100">Streak</p>
                            <p className="text-lg font-serif">21 Days</p>
                          </div>
                        </div>
                      </div>
                      <div className="bg-white px-4 py-2 rounded-xl border border-stone-200">
                        <p className="text-xs text-stone-400">Next Prayer</p>
                        <p className="text-sm font-medium text-stone-800">12:00 PM</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Active Devotional Banner */}
                  <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl p-3 flex items-center justify-between mb-6">
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
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4">
                    {/* Main Prayer Card */}
                    <div className="col-span-2 bg-gradient-to-br from-stone-800 to-stone-900 rounded-xl p-6 text-white relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-gold-500/10 rounded-full blur-2xl -mr-8 -mt-8" />
                      <div className="relative z-10">
                        <div className="flex items-center gap-2 mb-3 text-gold-400">
                          <Sun size={16} />
                          <span className="text-xs font-semibold uppercase tracking-wider">Morning Manna</span>
                        </div>
                        <h3 className="text-xl font-serif mb-2">Architect your prayer.</h3>
                        <p className="text-sm text-stone-400 mb-4">Enter a guided session using the A.C.T.S. model.</p>
                        <button className="bg-gold-600 hover:bg-gold-500 text-stone-900 px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2">
                          Start Session <ArrowRight size={14} />
                        </button>
                      </div>
                    </div>
                    
                    {/* Daily Verse */}
                    <div className="bg-white rounded-xl p-4 border border-stone-200 flex flex-col justify-center">
                      <Quote className="text-stone-200 w-8 h-8 mb-2" />
                      <p className="text-sm font-serif text-stone-700 italic leading-relaxed mb-2">
                        "Trust in the LORD with all your heart..."
                      </p>
                      <span className="text-xs text-gold-600 font-medium">Proverbs 3:5</span>
                    </div>
                    
                    {/* Stats Row */}
                    <div className="bg-white rounded-xl p-4 border border-stone-200">
                      <div className="flex items-center gap-2 text-emerald-600 mb-2">
                        <TrendingUp size={14} />
                        <span className="text-xs font-medium">This Week</span>
                      </div>
                      <p className="text-2xl font-serif text-stone-800">4.5 hrs</p>
                      <p className="text-xs text-stone-500">Prayer time</p>
                    </div>
                    
                    <div className="bg-white rounded-xl p-4 border border-stone-200">
                      <div className="flex items-center gap-2 text-indigo-600 mb-2">
                        <Users size={14} />
                        <span className="text-xs font-medium">Community</span>
                      </div>
                      <p className="text-2xl font-serif text-stone-800">1,247</p>
                      <p className="text-xs text-stone-500">Praying for you</p>
                    </div>
                    
                    <div className="bg-white rounded-xl p-4 border border-stone-200">
                      <div className="flex items-center gap-2 text-rose-600 mb-2">
                        <Star size={14} />
                        <span className="text-xs font-medium">Testimonies</span>
                      </div>
                      <p className="text-2xl font-serif text-stone-800">23</p>
                      <p className="text-xs text-stone-500">Answered prayers</p>
                    </div>
                    
                    {/* Weekly Chart Preview */}
                    <div className="col-span-2 bg-white rounded-xl p-4 border border-stone-200">
                      <div className="flex justify-between items-center mb-4">
                        <div>
                          <h4 className="text-sm font-medium text-stone-800">Spiritual Rhythms</h4>
                          <p className="text-xs text-stone-400">Prayer consistency</p>
                        </div>
                        <span className="text-xs text-emerald-600 font-medium">+12% this week</span>
                      </div>
                      <div className="flex items-end gap-2 h-20">
                        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => (
                          <div key={day} className="flex-1 flex flex-col items-center gap-1">
                            <div 
                              className={`w-full rounded-t ${i === 3 ? 'bg-gold-500' : 'bg-stone-200'}`}
                              style={{ height: `${[40, 60, 45, 80, 55, 70, 50][i]}%` }}
                            />
                            <span className="text-[10px] text-stone-400">{day}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Quick Actions */}
                    <div className="bg-white rounded-xl p-4 border border-stone-200">
                      <p className="text-xs font-medium text-stone-600 mb-3">Quick Actions</p>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-xs text-stone-700 p-2 bg-stone-50 rounded-lg">
                          <BookOpen size={12} /> Read Bible
                        </div>
                        <div className="flex items-center gap-2 text-xs text-stone-700 p-2 bg-stone-50 rounded-lg">
                          <Feather size={12} /> Write Journal
                        </div>
                        <div className="flex items-center gap-2 text-xs text-stone-700 p-2 bg-stone-50 rounded-lg">
                          <Users size={12} /> Community
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="flex justify-center mt-12">
            <a href="#what-is" className="flex flex-col items-center text-stone-400 hover:text-stone-600 transition-colors">
              <span className="text-sm mb-2">Learn More</span>
              <ArrowDown size={20} className="animate-bounce" />
            </a>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-6 bg-white border-y border-stone-200">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="w-12 h-12 bg-gold-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="text-gold-600" size={24} />
                </div>
                <p className="text-4xl md:text-5xl font-serif text-stone-900 mb-2">{stat.value}</p>
                <p className="text-stone-500">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What is Sanctum AI Section */}
      <section id="what-is" className="py-24 px-6 bg-gradient-to-b from-white to-stone-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Lightbulb size={16} />
                <span>Understanding Sanctum AI</span>
              </div>
              
              <h2 className="text-4xl md:text-5xl font-serif text-stone-900 mb-6 leading-tight">
                What is <span className="text-gold-600">Sanctum AI</span>?
              </h2>
              
              <p className="text-xl text-stone-600 mb-6 leading-relaxed">
                Sanctum AI is a <strong>comprehensive spiritual growth platform</strong> designed specifically for Christians who want to deepen their relationship with God through consistent, meaningful spiritual practices.
              </p>
              
              <p className="text-lg text-stone-600 mb-8 leading-relaxed">
                Think of it as your <strong>personal spiritual companion</strong> that combines the wisdom of traditional Christian disciplines with modern technology. Whether you're a new believer taking your first steps or a seasoned Christian seeking deeper intimacy with God, Sanctum AI meets you where you are.
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-gold-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Cross className="text-gold-600" size={20} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-stone-800 mb-1">Rooted in Scripture</h4>
                    <p className="text-stone-600">Every feature is designed to draw you closer to God's Word and help you apply it to your daily life.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Sparkles className="text-indigo-600" size={20} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-stone-800 mb-1">AI-Enhanced, Not AI-Replaced</h4>
                    <p className="text-stone-600">Our AI suggests scriptures and insights, but your relationship with God remains personal and authentic.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-rose-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Heart className="text-rose-600" size={20} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-stone-800 mb-1">Community-Centered</h4>
                    <p className="text-stone-600">Faith grows best in community. Connect with believers worldwide who share your journey.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-gold-200/30 to-indigo-200/30 rounded-3xl blur-3xl" />
              <div className="relative bg-white rounded-2xl shadow-xl border border-stone-200 overflow-hidden">
                <div className="p-8">
                  <h3 className="text-2xl font-serif text-stone-900 mb-6">Sanctum AI Helps You:</h3>
                  <div className="space-y-4">
                    {[
                      { icon: BookOpen, text: "Read and understand the Bible daily" },
                      { icon: Heart, text: "Build a consistent, meaningful prayer life" },
                      { icon: Flame, text: "Practice spiritual disciplines like fasting" },
                      { icon: Users, text: "Connect with a global community of believers" },
                      { icon: Star, text: "Document and remember God's faithfulness" },
                      { icon: Target, text: "Discover and pursue your God-given purpose" },
                      { icon: Feather, text: "Journal your spiritual journey" },
                      { icon: Bell, text: "Stay accountable with gentle reminders" }
                    ].map((item, index) => (
                      <div key={index} className="flex items-center gap-4 p-3 bg-stone-50 rounded-xl">
                        <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm">
                          <item.icon className="text-gold-600" size={20} />
                        </div>
                        <span className="text-stone-700 font-medium">{item.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problems We Solve Section */}
      <section className="py-24 px-6 bg-stone-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-96 h-96 bg-gold-400 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-indigo-400 rounded-full blur-3xl" />
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-white/10 text-gold-300 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <HandHeart size={16} />
              <span>We Understand Your Struggles</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-serif mb-4">
              Common Challenges
              <br />
              <span className="text-gold-400">We Help You Overcome</span>
            </h2>
            <p className="text-xl text-stone-400 max-w-2xl mx-auto">
              Every believer faces obstacles in their spiritual journey. Sanctum AI is designed to help you overcome them.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {problemsSolved.map((item, index) => (
              <div 
                key={index}
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all"
              >
                <div className="w-12 h-12 bg-gold-500/20 rounded-xl flex items-center justify-center mb-4">
                  <item.icon className="text-gold-400" size={24} />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{item.problem}</h3>
                <p className="text-stone-400">{item.solution}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Zap size={16} />
              <span>Powerful Features</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-serif text-stone-900 mb-4">
              Everything You Need for
              <br />
              <span className="text-gold-600">Spiritual Growth</span>
            </h2>
            <p className="text-xl text-stone-600 max-w-2xl mx-auto">
              A comprehensive suite of tools designed to deepen your relationship with God 
              and connect you with a community of believers.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {coreFeatures.map((feature, index) => (
              <div 
                key={index}
                className="group bg-white rounded-2xl p-8 border border-stone-200 hover:border-stone-300 hover:shadow-xl transition-all duration-300"
              >
                <div className={`w-14 h-14 ${feature.bg} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <feature.icon className={feature.color} size={28} />
                </div>
                <h3 className="text-xl font-semibold text-stone-900 mb-3">{feature.title}</h3>
                <p className="text-stone-600 leading-relaxed mb-4">{feature.description}</p>
                <ul className="space-y-2">
                  {feature.details.map((detail, dIndex) => (
                    <li key={dIndex} className="flex items-center gap-2 text-sm text-stone-500">
                      <CheckCircle2 size={14} className="text-emerald-500" />
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 px-6 bg-gradient-to-b from-stone-100 to-stone-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Milestone size={16} />
              <span>Simple Process</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-serif text-stone-900 mb-4">
              Your Journey to
              <br />
              <span className="text-gold-600">Deeper Faith</span>
            </h2>
            <p className="text-xl text-stone-600 max-w-2xl mx-auto">
              Start transforming your spiritual life in three simple steps
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {journeySteps.map((item, index) => (
              <div key={index} className="relative">
                <div className="bg-white rounded-2xl p-8 border border-stone-200 h-full hover:shadow-lg transition-shadow">
                  <div className="text-6xl font-serif text-stone-200 mb-4">{item.step}</div>
                  <div className={`w-14 h-14 bg-gradient-to-br ${item.color} rounded-xl flex items-center justify-center mb-4 shadow-lg`}>
                    <item.icon className="text-white" size={28} />
                  </div>
                  <h3 className="text-xl font-semibold text-stone-900 mb-3">{item.title}</h3>
                  <p className="text-stone-600">{item.description}</p>
                </div>
                {index < 2 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                    <ArrowRight className="text-stone-300" size={24} />
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button 
              onClick={() => onChangeView(ViewState.SIGNUP)}
              className="group bg-gradient-to-r from-gold-500 to-gold-600 text-white px-8 py-4 rounded-xl font-medium hover:from-gold-600 hover:to-gold-700 transition-all shadow-lg shadow-gold-500/25 flex items-center gap-3 mx-auto"
            >
              Begin Your Journey Today
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-24 px-6 bg-stone-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-96 h-96 bg-gold-400 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-indigo-400 rounded-full blur-3xl" />
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-white/10 text-gold-300 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <MessageCircle size={16} />
              <span>Real Stories</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-serif mb-4">
              Loved by Believers
              <br />
              <span className="text-gold-400">Around the World</span>
            </h2>
            <p className="text-xl text-stone-400 max-w-2xl mx-auto">
              Hear from Christians whose spiritual lives have been transformed by Sanctum AI
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-10 border border-white/10">
              <Quote className="text-gold-400 mb-6" size={48} />
              <p className="text-2xl md:text-3xl font-serif text-white/90 mb-8 leading-relaxed">
                "{testimonials[activeTestimonial].quote}"
              </p>
              <div className="flex items-center gap-4">
                <img 
                  src={testimonials[activeTestimonial].avatar} 
                  alt={testimonials[activeTestimonial].author}
                  className="w-14 h-14 rounded-full object-cover border-2 border-gold-400"
                />
                <div>
                  <p className="font-semibold text-white">{testimonials[activeTestimonial].author}</p>
                  <p className="text-white/60">{testimonials[activeTestimonial].role}</p>
                  <p className="text-white/40 text-sm">{testimonials[activeTestimonial].location}</p>
                </div>
              </div>
            </div>
            
            <div className="flex justify-center gap-2 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === activeTestimonial ? 'bg-gold-400 w-8' : 'bg-white/30 hover:bg-white/50'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Additional testimonial cards */}
          <div className="grid md:grid-cols-3 gap-6 mt-16">
            {testimonials.slice(0, 3).map((testimonial, index) => (
              <div 
                key={index}
                className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10"
              >
                <div className="flex items-center gap-3 mb-4">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.author}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-medium text-white text-sm">{testimonial.author}</p>
                    <p className="text-white/50 text-xs">{testimonial.location}</p>
                  </div>
                </div>
                <p className="text-white/70 text-sm line-clamp-4">"{testimonial.quote}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Award size={16} />
              <span>Simple Pricing</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-serif text-stone-900 mb-4">
              Choose Your Path to
              <br />
              <span className="text-gold-600">Spiritual Growth</span>
            </h2>
            <p className="text-xl text-stone-600 max-w-2xl mx-auto">
              Start free and upgrade as your faith journey deepens. No hidden fees, cancel anytime.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <div 
                key={index}
                className={`rounded-2xl p-8 ${
                  plan.highlighted 
                    ? 'bg-gradient-to-b from-stone-900 to-stone-800 text-white ring-4 ring-gold-400 scale-105' 
                    : 'bg-white border border-stone-200'
                }`}
              >
                {plan.highlighted && (
                  <div className="bg-gold-400 text-stone-900 text-sm font-semibold px-4 py-1 rounded-full inline-block mb-4">
                    Most Popular
                  </div>
                )}
                <h3 className={`text-xl font-semibold mb-2 ${plan.highlighted ? 'text-white' : 'text-stone-900'}`}>
                  {plan.name}
                </h3>
                <div className="flex items-baseline gap-1 mb-2">
                  <span className={`text-4xl font-serif ${plan.highlighted ? 'text-white' : 'text-stone-900'}`}>
                    {plan.price}
                  </span>
                  <span className={plan.highlighted ? 'text-white/60' : 'text-stone-500'}>
                    {plan.period}
                  </span>
                </div>
                <p className={`mb-6 ${plan.highlighted ? 'text-white/70' : 'text-stone-600'}`}>
                  {plan.description}
                </p>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-center gap-3">
                      <Check size={18} className={plan.highlighted ? 'text-gold-400' : 'text-emerald-500'} />
                      <span className={plan.highlighted ? 'text-white/90' : 'text-stone-700'}>{feature}</span>
                    </li>
                  ))}
                </ul>
                <button 
                  onClick={() => onChangeView(ViewState.SIGNUP)}
                  className={`w-full py-3 rounded-xl font-medium transition-all ${
                    plan.highlighted 
                      ? 'bg-gold-400 text-stone-900 hover:bg-gold-300' 
                      : 'bg-stone-100 text-stone-800 hover:bg-stone-200'
                  }`}
                >
                  {plan.cta}
                </button>
              </div>
            ))}
          </div>

          <p className="text-center text-stone-500 mt-8">
            All plans include a 30-day money-back guarantee. No questions asked.
          </p>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-24 px-6 bg-stone-100">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <MessageCircle size={16} />
              <span>FAQ</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-serif text-stone-900 mb-4">
              Frequently Asked
              <br />
              <span className="text-gold-600">Questions</span>
            </h2>
            <p className="text-xl text-stone-600">
              Everything you need to know about Sanctum AI
            </p>
          </div>
          
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div 
                key={index}
                className="bg-white rounded-xl border border-stone-200 overflow-hidden"
              >
                <button
                  onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <span className="font-semibold text-stone-900 pr-4">{faq.question}</span>
                  <ChevronDown 
                    size={20} 
                    className={`text-stone-400 transition-transform flex-shrink-0 ${
                      activeFaq === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {activeFaq === index && (
                  <div className="px-6 pb-6">
                    <p className="text-stone-600 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 bg-gradient-to-br from-gold-50 via-white to-indigo-50">
        <div className="max-w-4xl mx-auto text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-gold-400 to-gold-600 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-xl shadow-gold-500/30">
            <Cross className="text-white" size={40} />
          </div>
          <h2 className="text-4xl md:text-5xl font-serif text-stone-900 mb-6">
            Ready to Transform Your
            <br />
            <span className="text-gold-600">Spiritual Life?</span>
          </h2>
          <p className="text-xl text-stone-600 mb-10 max-w-2xl mx-auto">
            Join thousands of believers who are deepening their faith, building prayer habits, 
            and experiencing God's presence like never before.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button 
              onClick={() => onChangeView(ViewState.SIGNUP)}
              className="group bg-gradient-to-r from-stone-800 to-stone-900 text-white px-8 py-4 rounded-xl font-medium hover:from-stone-900 hover:to-black transition-all shadow-xl shadow-stone-900/20 flex items-center gap-3"
            >
              Start Your Free Journey
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
          <p className="text-stone-500 text-sm mt-4">No credit card required • Free forever plan available</p>
          
          {/* Trust badges */}
          <div className="flex flex-wrap items-center justify-center gap-8 mt-12 pt-12 border-t border-stone-200">
            <div className="flex items-center gap-2 text-stone-500">
              <Shield size={20} />
              <span className="text-sm">Bank-level Security</span>
            </div>
            <div className="flex items-center gap-2 text-stone-500">
              <Globe size={20} />
              <span className="text-sm">150+ Countries</span>
            </div>
            <div className="flex items-center gap-2 text-stone-500">
              <Users size={20} />
              <span className="text-sm">50K+ Believers</span>
            </div>
            <div className="flex items-center gap-2 text-stone-500">
              <Award size={20} />
              <span className="text-sm">4.9★ Rating</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-stone-900 text-white py-16 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Mobile App Download Section */}
          <div className="bg-gradient-to-r from-gold-600/20 to-amber-600/20 rounded-2xl p-8 mb-12 border border-gold-500/30">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl md:text-3xl font-serif mb-4">
                  Take Your Faith Journey <span className="text-gold-400">Everywhere</span>
                </h3>
                <p className="text-stone-400 mb-6">
                  Download the Sanctum AI mobile app and never miss a moment of spiritual growth. 
                  Available on iOS and Android.
                </p>
                <div className="flex flex-wrap gap-4">
                  {/* App Store Button */}
                  <a href="#" className="flex items-center gap-3 bg-white text-stone-900 px-5 py-3 rounded-xl hover:bg-stone-100 transition-colors">
                    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                    </svg>
                    <div className="text-left">
                      <p className="text-xs text-stone-500">Download on the</p>
                      <p className="text-sm font-semibold">App Store</p>
                    </div>
                  </a>
                  
                  {/* Google Play Button */}
                  <a href="#" className="flex items-center gap-3 bg-white text-stone-900 px-5 py-3 rounded-xl hover:bg-stone-100 transition-colors">
                    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
                    </svg>
                    <div className="text-left">
                      <p className="text-xs text-stone-500">Get it on</p>
                      <p className="text-sm font-semibold">Google Play</p>
                    </div>
                  </a>
                </div>
              </div>
              
              <div className="hidden md:flex justify-center">
                <div className="relative">
                  {/* Phone mockup */}
                  <div className="w-48 h-96 bg-stone-800 rounded-3xl border-4 border-stone-700 p-2 shadow-2xl">
                    <div className="w-full h-full bg-gradient-to-br from-stone-900 to-stone-800 rounded-2xl overflow-hidden">
                      <div className="p-4">
                        <div className="flex items-center gap-2 mb-4">
                          <div className="w-8 h-8 bg-gradient-to-br from-gold-400 to-gold-600 rounded-lg flex items-center justify-center">
                            <Cross className="text-white" size={14} />
                          </div>
                          <span className="text-white text-sm font-serif">Sanctum</span>
                        </div>
                        <div className="bg-white/10 rounded-lg p-3 mb-3">
                          <p className="text-xs text-gold-400 mb-1">Daily Verse</p>
                          <p className="text-xs text-white/80 italic">"Trust in the LORD..."</p>
                        </div>
                        <div className="bg-gradient-to-br from-gold-500 to-gold-600 rounded-lg p-3 mb-3">
                          <p className="text-xs text-white font-medium">🔥 21 Day Streak</p>
                        </div>
                        <div className="space-y-2">
                          <div className="bg-white/10 rounded-lg p-2 flex items-center gap-2">
                            <Heart size={12} className="text-rose-400" />
                            <span className="text-xs text-white/70">Pray</span>
                          </div>
                          <div className="bg-white/10 rounded-lg p-2 flex items-center gap-2">
                            <BookOpen size={12} className="text-emerald-400" />
                            <span className="text-xs text-white/70">Read</span>
                          </div>
                          <div className="bg-white/10 rounded-lg p-2 flex items-center gap-2">
                            <Users size={12} className="text-indigo-400" />
                            <span className="text-xs text-white/70">Community</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Decorative glow */}
                  <div className="absolute -inset-4 bg-gold-500/20 rounded-full blur-2xl -z-10" />
                </div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-5 gap-12 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-gold-400 to-gold-600 rounded-xl flex items-center justify-center">
                  <Cross className="text-white" size={20} />
                </div>
                <span className="text-xl font-serif font-semibold">Sanctum AI</span>
              </div>
              <p className="text-stone-400 text-sm leading-relaxed mb-6">
                Empowering believers worldwide to deepen their faith through technology and community. 
                Your spiritual growth journey starts here.
              </p>
              <div className="flex items-center gap-4">
                <a href="#" className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors">
                  <Globe size={18} />
                </a>
                <a href="#" className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors">
                  <Smartphone size={18} />
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-stone-400">
                <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#pricing" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">iOS App</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Android App</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-stone-400">
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Devotionals</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Prayer Guides</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Community</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-stone-400">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Our Mission</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-stone-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-stone-500 text-sm">
              © 2024 Sanctum AI. All rights reserved. Made with ❤️ for the glory of God.
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
