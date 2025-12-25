
import React, { useState, useEffect } from 'react';
import { Shield, AlertTriangle, CheckCircle, Zap, Loader2, Edit, Play, Brain, Target } from 'lucide-react';
import { generatePivotStrategy } from '@/services/megallmService';
import { PivotStrategy } from '@/types';
import { getPivotStrategies, savePivotStrategies } from '@/services/storageService';

const Pivot: React.FC = () => {
  // Setup State
  const [habit, setHabit] = useState('');
  const [trigger, setTrigger] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  
  // Strategy State
  const [strategy, setStrategy] = useState<PivotStrategy | null>(null);
  const [viewMode, setViewMode] = useState<'setup' | 'dashboard' | 'intervention'>('setup');

  // Load strategy from storage on mount
  useEffect(() => {
    const storedStrategies = getPivotStrategies();
    if (storedStrategies.length > 0) {
      const latestStrategy = storedStrategies[0];
      setStrategy(latestStrategy);
      setHabit(latestStrategy.habit);
      setTrigger(latestStrategy.trigger);
      setViewMode('dashboard');
    }
  }, []);

  const handleCreateProtocol = async () => {
    if (!habit || !trigger) return;
    setIsGenerating(true);
    const result = await generatePivotStrategy(habit, trigger);
    if (result) {
      setStrategy(result);
      // Save to storage
      const strategies = getPivotStrategies();
      savePivotStrategies([result, ...strategies]);
      setViewMode('dashboard');
    }
    setIsGenerating(false);
  };

  const activateSOS = () => {
    setViewMode('intervention');
  };

  const reset = () => {
    setViewMode('dashboard');
  };

  const editProtocol = () => {
    setViewMode('setup');
  };

  // --- SETUP VIEW ---
  if (viewMode === 'setup') {
    return (
      <div className="max-w-2xl mx-auto p-6 md:p-10 h-full flex flex-col justify-center animate-fade-in pb-24">
        <div className="text-center mb-10">
           <div className="w-20 h-20 bg-stone-900 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-2xl border border-stone-800 rotate-3 transform hover:rotate-6 transition-transform">
             <Shield className="text-gold-500" size={40} />
           </div>
           <h2 className="text-4xl font-serif text-stone-900 mb-3">The Pivot Protocol</h2>
           <p className="text-stone-500 leading-relaxed max-w-md mx-auto">
             "Do not conform to the pattern of this world, but be transformed by the renewing of your mind."
           </p>
        </div>

        <div className="bg-white p-8 md:p-10 rounded-3xl shadow-xl border border-stone-200 space-y-8 relative overflow-hidden">
           <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-gold-600 via-amber-300 to-gold-600"></div>
           
           <div className="space-y-2">
             <label className="flex items-center gap-2 text-xs font-bold text-stone-900 uppercase tracking-widest">
               <Target size={14} className="text-gold-600" /> The Struggle
             </label>
             <div className="relative group">
                <input 
                  className="w-full bg-stone-50 text-stone-900 font-serif text-lg border-2 border-stone-200 rounded-xl pl-4 pr-4 py-4 outline-none focus:border-gold-500 focus:bg-white transition-all placeholder:text-stone-400 caret-gold-600 group-hover:border-stone-300"
                  placeholder="e.g. Pornography, Anger, Procrastination"
                  value={habit}
                  onChange={e => setHabit(e.target.value)}
                />
             </div>
           </div>
           
           <div className="space-y-2">
             <label className="flex items-center gap-2 text-xs font-bold text-stone-900 uppercase tracking-widest">
               <Brain size={14} className="text-gold-600" /> The Trigger
             </label>
             <div className="relative group">
                <input 
                  className="w-full bg-stone-50 text-stone-900 font-serif text-lg border-2 border-stone-200 rounded-xl pl-4 pr-4 py-4 outline-none focus:border-gold-500 focus:bg-white transition-all placeholder:text-stone-400 caret-gold-600 group-hover:border-stone-300"
                  placeholder="e.g. 11 PM alone, When criticized"
                  value={trigger}
                  onChange={e => setTrigger(e.target.value)}
                />
             </div>
           </div>

           <button 
             onClick={handleCreateProtocol}
             disabled={isGenerating || !habit || !trigger}
             className="w-full bg-stone-900 text-gold-100 py-5 rounded-xl font-bold uppercase tracking-wider hover:bg-stone-800 transition-all shadow-lg flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed group relative overflow-hidden"
           >
             {isGenerating ? (
               <Loader2 className="animate-spin" /> 
             ) : (
               <>
                 <span className="relative z-10">Generate Battle Plan</span>
                 <Zap className="relative z-10 group-hover:text-gold-400 transition-colors" size={20} />
               </>
             )}
           </button>
        </div>
      </div>
    );
  }

  // --- DASHBOARD (SOS) VIEW ---
  if (viewMode === 'dashboard' && strategy) {
    return (
      <div className="max-w-4xl mx-auto p-6 md:p-10 h-full flex flex-col items-center justify-center animate-fade-in relative pb-24">
         <button 
           onClick={editProtocol} 
           className="absolute top-0 right-6 md:top-6 text-stone-400 hover:text-stone-800 flex items-center gap-2 text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full hover:bg-stone-200 transition-colors"
         >
            <Edit size={14} /> Edit Protocol
         </button>

         <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif text-stone-900 mb-4">Stand Firm</h2>
            <p className="text-stone-500 text-lg max-w-lg mx-auto leading-relaxed">
              Your protocol is armed. When the enemy knocks, do not hesitate.
            </p>
         </div>

         <div className="relative group">
            {/* Ripple Effects */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-red-500/20 rounded-full animate-ping opacity-75 duration-[3s]"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-red-500/10 rounded-full animate-ping opacity-50 delay-700 duration-[3s]"></div>
            
            <button 
              onClick={activateSOS}
              className="
                relative z-10 w-64 h-64 rounded-full 
                bg-gradient-to-br from-red-600 via-red-700 to-red-900
                text-white shadow-[0_20px_60px_rgba(220,38,38,0.5)] 
                hover:shadow-[0_30px_80px_rgba(220,38,38,0.7)]
                border-[6px] border-red-500/30 
                flex flex-col items-center justify-center gap-3
                transition-all transform hover:scale-105 active:scale-95
              "
            >
                <AlertTriangle size={72} className="text-red-100 drop-shadow-md animate-pulse-slow" />
                <div className="flex flex-col items-center">
                  <span className="text-4xl font-bold tracking-[0.2em] text-white drop-shadow-md">SOS</span>
                  <span className="text-red-200 text-xs font-bold uppercase tracking-widest mt-1">I am tempted</span>
                </div>
            </button>
         </div>
         
         <div className="mt-16 bg-white border border-stone-200 shadow-sm px-8 py-4 rounded-full flex items-center gap-3">
            <Shield size={16} className="text-gold-600" />
            <span className="text-stone-400 text-sm font-medium uppercase tracking-widest">Active Protocol:</span>
            <span className="text-stone-900 font-bold font-serif text-lg">{strategy.habit}</span>
         </div>
      </div>
    );
  }

  // --- INTERVENTION VIEW ---
  if (viewMode === 'intervention' && strategy) {
    return (
      <div className="fixed inset-0 z-50 bg-stone-950 flex items-center justify-center p-6 animate-fade-in overflow-y-auto">
         {/* Background Texture */}
         <div className="absolute inset-0 opacity-20 pointer-events-none" style={{backgroundImage: 'radial-gradient(#44403c 1px, transparent 1px)', backgroundSize: '30px 30px'}}></div>

         <div className="max-w-3xl w-full relative z-10 py-10">
            {/* Header: THE STOP */}
            <div className="text-center mb-16 animate-slide-up">
               <div className="inline-flex items-center gap-2 bg-red-500/10 text-red-500 px-6 py-2 rounded-full border border-red-500/30 text-sm font-bold tracking-[0.3em] uppercase mb-8 shadow-[0_0_30px_rgba(239,68,68,0.2)]">
                 <AlertTriangle size={16} /> Pattern Interrupt
               </div>
               <h1 className="text-4xl md:text-6xl font-serif text-stone-100 leading-tight drop-shadow-2xl">
                 "{strategy.interruptQuestion}"
               </h1>
            </div>

            <div className="grid md:grid-cols-2 gap-6 animate-slide-up" style={{ animationDelay: '0.2s' }}>
               {/* Card 1: THE TRUTH */}
               <div className="bg-stone-900 border border-stone-800 p-8 rounded-3xl flex flex-col relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                    <Shield size={120} />
                  </div>
                  
                  <div className="bg-stone-800 w-12 h-12 rounded-full flex items-center justify-center mb-6 border border-stone-700 text-gold-500">
                     <Shield size={24} />
                  </div>
                  
                  <h3 className="text-stone-500 font-bold uppercase tracking-widest text-xs mb-4">The Truth</h3>
                  <div className="flex-1">
                    <p className="font-serif text-2xl text-gold-100 italic leading-relaxed mb-6">
                      "{strategy.scriptureTruth.text}"
                    </p>
                  </div>
                  <p className="text-gold-500 text-sm font-bold uppercase tracking-wider border-t border-stone-800 pt-4">
                    — {strategy.scriptureTruth.reference}
                  </p>
               </div>

               {/* Card 2: THE ACTION */}
               <div className="bg-stone-100 border border-stone-200 p-8 rounded-3xl flex flex-col relative overflow-hidden">
                  <div className="bg-white w-12 h-12 rounded-full flex items-center justify-center mb-6 border border-stone-200 text-stone-900 shadow-sm">
                     <Play size={24} fill="currentColor" />
                  </div>
                  
                  <h3 className="text-stone-500 font-bold uppercase tracking-widest text-xs mb-4">Immediate Action</h3>
                  <div className="flex-1">
                    <p className="font-serif text-3xl text-stone-900 font-bold leading-tight">
                      {strategy.microAction}
                    </p>
                  </div>
                  <div className="mt-6 flex items-center gap-2 text-stone-500 text-xs font-bold uppercase tracking-wider border-t border-stone-200 pt-4">
                    <Zap size={14} /> Do this immediately
                  </div>
               </div>
            </div>

            <button 
              onClick={reset}
              className="mt-12 w-full bg-white hover:bg-stone-200 text-stone-900 py-5 rounded-2xl transition-all flex items-center justify-center gap-3 uppercase tracking-widest text-sm font-bold shadow-[0_0_40px_rgba(255,255,255,0.1)] hover:shadow-[0_0_60px_rgba(255,255,255,0.2)] transform hover:-translate-y-1"
            >
               <CheckCircle size={20} className="text-green-600" /> I have broken the pattern
            </button>
            
            <p className="text-center text-stone-600 text-xs mt-6">
              "Resist the devil, and he will flee from you." — James 4:7
            </p>
         </div>
      </div>
    );
  }

  return null;
};

export default Pivot;
