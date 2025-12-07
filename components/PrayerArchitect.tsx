import React, { useState, useEffect } from 'react';
import { ArrowRight, ChevronRight, CheckCircle2, RefreshCw, Sparkles, BookOpen, Copy, Download } from 'lucide-react';
import { ACTSStep } from '../types';
import { generateACTSPrompts, synthesizePrayerSession } from '../services/geminiService';

const steps = [ACTSStep.ADORATION, ACTSStep.CONFESSION, ACTSStep.THANKSGIVING, ACTSStep.SUPPLICATION];

const PrayerArchitect: React.FC = () => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [prompts, setPrompts] = useState<string[]>([]);
  const [loadingPrompts, setLoadingPrompts] = useState(false);
  const [userInputs, setUserInputs] = useState<Record<string, string>>({});
  const [isFinished, setIsFinished] = useState(false);
  const [synthesizedPrayer, setSynthesizedPrayer] = useState<string>("");
  const [isSynthesizing, setIsSynthesizing] = useState(false);

  const currentStep = steps[currentStepIndex];

  useEffect(() => {
    if (!isFinished) {
      fetchPrompts(currentStep);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentStepIndex, isFinished]);

  const fetchPrompts = async (step: ACTSStep) => {
    setLoadingPrompts(true);
    setPrompts([]);
    const generated = await generateACTSPrompts(step);
    setPrompts(generated);
    setLoadingPrompts(false);
  };

  const handleNext = async () => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex(prev => prev + 1);
    } else {
      setIsFinished(true);
      await generateSynthesis();
    }
  };

  const generateSynthesis = async () => {
    setIsSynthesizing(true);
    const synthesis = await synthesizePrayerSession(userInputs);
    setSynthesizedPrayer(synthesis);
    setIsSynthesizing(false);
  }

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setUserInputs({
      ...userInputs,
      [currentStep]: e.target.value
    });
  };

  if (isFinished) {
    return (
      <div className="max-w-3xl mx-auto p-6 md:p-10 text-center animate-fade-in pb-20">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gold-50 text-gold-600 mb-6 shadow-inner ring-1 ring-gold-200">
          <CheckCircle2 size={40} />
        </div>
        <h2 className="text-3xl font-serif text-stone-900 mb-4">It is Finished</h2>
        <p className="text-stone-600 mb-10">Your words have been heard. Here is your prayer, woven together.</p>
        
        <div className="bg-white rounded-xl shadow-2xl border border-stone-200 overflow-hidden text-left relative transform transition-all hover:scale-[1.01]">
          {/* Paper Texture Effect */}
          <div className="absolute inset-0 bg-stone-50 opacity-50 pointer-events-none" style={{backgroundImage: 'radial-gradient(#d6d3d1 1px, transparent 1px)', backgroundSize: '20px 20px'}}></div>
          
          <div className="relative p-8 md:p-12">
            <div className="flex justify-between items-start mb-6 border-b border-stone-200 pb-4">
              <span className="text-xs font-bold text-stone-500 tracking-widest uppercase">
                {new Date().toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
              </span>
              <Sparkles className="text-gold-500" size={16} />
            </div>

            {isSynthesizing ? (
              <div className="space-y-4 animate-pulse">
                <div className="h-4 bg-stone-200 rounded w-3/4"></div>
                <div className="h-4 bg-stone-200 rounded w-full"></div>
                <div className="h-4 bg-stone-200 rounded w-5/6"></div>
                <div className="h-4 bg-stone-200 rounded w-4/5"></div>
              </div>
            ) : (
              <div className="prose prose-stone max-w-none">
                <p className="font-serif text-xl leading-loose text-stone-900 italic">
                  "{synthesizedPrayer}"
                </p>
              </div>
            )}
            
            <div className="mt-8 pt-6 border-t border-stone-200 flex justify-end gap-3">
              <button className="flex items-center gap-2 text-sm text-stone-600 hover:text-stone-900 px-3 py-2 rounded hover:bg-stone-100 transition-colors">
                <Copy size={16} /> Copy
              </button>
              <button className="flex items-center gap-2 text-sm text-stone-600 hover:text-stone-900 px-3 py-2 rounded hover:bg-stone-100 transition-colors">
                <Download size={16} /> Save Card
              </button>
            </div>
          </div>
        </div>
        
        <button 
          onClick={() => { setIsFinished(false); setCurrentStepIndex(0); setUserInputs({}); setSynthesizedPrayer(""); }}
          className="mt-8 text-stone-500 hover:text-stone-800 underline underline-offset-4"
        >
          Start New Session
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6 md:p-10 h-full flex flex-col pb-20">
      {/* Progress */}
      <div className="flex items-center justify-between mb-8 max-w-2xl mx-auto w-full">
        {steps.map((step, idx) => {
          const isActive = idx === currentStepIndex;
          const isPast = idx < currentStepIndex;
          return (
            <div key={step} className="flex items-center">
              <div className={`
                flex items-center justify-center w-8 h-8 rounded-full text-xs font-bold transition-all
                ${isActive ? 'bg-gold-600 text-white scale-110 shadow-lg ring-4 ring-gold-100' : 
                  isPast ? 'bg-stone-800 text-stone-400' : 'bg-stone-200 text-stone-400'}
              `}>
                {step.substring(0, 1)}
              </div>
              {idx < steps.length - 1 && (
                <div className={`w-12 h-0.5 mx-2 ${isPast ? 'bg-stone-800' : 'bg-stone-200'}`} />
              )}
            </div>
          );
        })}
      </div>

      <div className="flex-1 grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Left: AI Guide */}
        <div className="md:col-span-4 space-y-6">
          <div className="bg-stone-900 text-stone-300 p-6 rounded-2xl shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Sparkles size={100} />
            </div>
            <h2 className="text-2xl font-serif text-gold-500 mb-2">{currentStep}</h2>
            <p className="text-sm text-stone-400 mb-6 border-b border-stone-700 pb-4 leading-relaxed">
              {currentStep === ACTSStep.ADORATION && "We begin by lifting our eyes. Praise God not for what He does, but for who He is."}
              {currentStep === ACTSStep.CONFESSION && "In His light, we see ourselves clearly. Speak your failures without fear; He is faithful to forgive."}
              {currentStep === ACTSStep.THANKSGIVING && "Gratitude is the gateway to joy. Name the small graces you have received."}
              {currentStep === ACTSStep.SUPPLICATION && "He is your Father. Ask boldly for your needs and the needs of others."}
            </p>

            <h3 className="text-xs font-bold uppercase tracking-widest text-stone-500 mb-4 flex items-center gap-2">
              <Sparkles size={12} /> Inspiration
            </h3>
            
            <div className="space-y-3">
              {loadingPrompts ? (
                [1,2,3].map(i => <div key={i} className="h-10 bg-stone-800 rounded animate-pulse" />)
              ) : (
                prompts.map((prompt, idx) => (
                  <button 
                    key={idx}
                    onClick={() => setUserInputs({...userInputs, [currentStep]: (userInputs[currentStep] || '') + (userInputs[currentStep] ? ' ' : '') + prompt})}
                    className="w-full text-left text-sm p-3 bg-stone-800 hover:bg-stone-700 rounded-lg transition-colors border border-stone-700 hover:border-gold-500/50 text-stone-300"
                  >
                    "{prompt}"
                  </button>
                ))
              )}
            </div>
            
            <button 
              onClick={() => fetchPrompts(currentStep)}
              className="mt-4 flex items-center gap-2 text-xs text-stone-500 hover:text-gold-500 transition-colors"
            >
              <RefreshCw size={12} /> Refresh Prompts
            </button>
          </div>
        </div>

        {/* Right: User Input */}
        <div className="md:col-span-8 flex flex-col">
          <div className="flex-1 bg-white rounded-2xl shadow-sm border border-stone-200 p-8 flex flex-col relative group focus-within:ring-2 focus-within:ring-gold-500/20 focus-within:border-gold-500/50 transition-all">
             <div className="absolute top-6 right-6 text-stone-300 group-focus-within:text-gold-500 transition-colors">
               <BookOpen size={24} />
             </div>
             <textarea
              className="flex-1 w-full resize-none outline-none text-xl text-stone-900 font-serif leading-relaxed placeholder:text-stone-400 bg-transparent caret-gold-600"
              placeholder={`Write your prayer of ${currentStep} here...`}
              value={userInputs[currentStep] || ''}
              onChange={handleTextChange}
              autoFocus
             />
             <div className="mt-6 flex justify-between items-center border-t border-stone-100 pt-6">
               <span className="text-xs text-stone-400 font-medium uppercase tracking-widest">
                  Step {currentStepIndex + 1} of 4
               </span>
               <button
                onClick={handleNext}
                disabled={!userInputs[currentStep]}
                className={`
                  flex items-center gap-2 px-8 py-3 rounded-full font-medium transition-all shadow-md
                  ${userInputs[currentStep] 
                    ? 'bg-stone-900 text-white hover:bg-gold-600 hover:shadow-lg transform hover:-translate-y-0.5' 
                    : 'bg-stone-200 text-stone-400 cursor-not-allowed'}
                `}
               >
                 {currentStepIndex === steps.length - 1 ? 'Finish & Synthesize' : 'Next'} <ChevronRight size={18} />
               </button>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrayerArchitect;