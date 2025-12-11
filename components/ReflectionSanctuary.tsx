import React, { useState, useRef } from 'react';
import { Mic, StopCircle, Sparkles, Activity, BookOpen, Loader2, PlayCircle, AlertCircle, X } from 'lucide-react';
import { analyzeReflection } from '@/services/geminiService';
import { SpiritualPrescription } from '@/types';

const ReflectionSanctuary: React.FC = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [prescription, setPrescription] = useState<SpiritualPrescription | null>(null);
  const [warningMsg, setWarningMsg] = useState<string | null>(null);
  
  // Ref for speech recognition
  const recognitionRef = useRef<any>(null);

  const toggleRecording = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  const startRecording = () => {
    setWarningMsg(null);
    setIsRecording(true);
    setTranscript('');
    setPrescription(null);

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onresult = (event: any) => {
        let currentTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          currentTranscript += event.results[i][0].transcript;
        }
        setTranscript(currentTranscript);
      };

      recognition.onerror = (event: any) => {
        const errCode = event.error;
        console.warn("Speech recognition issue", errCode);
        if (errCode === 'not-allowed') {
            setWarningMsg("Microphone access denied. Please allow microphone permissions in your browser or use the Simulate button.");
        } else if (errCode === 'no-speech') {
            setWarningMsg("No speech detected. Please try speaking closer to the microphone.");
        } else if (errCode === 'network') {
            setWarningMsg("Network issue connecting to speech services. Please check your internet or use the 'Simulate' button.");
        } else {
            setWarningMsg(`Issue: ${errCode}`);
        }
        setIsRecording(false);
      };

      recognition.onend = () => {
        setIsRecording(false);
      };

      recognitionRef.current = recognition;
      recognition.start();
    } else {
      setWarningMsg("Voice recognition is not supported in this browser. Please use Chrome or Safari, or try the 'Simulate' button.");
      setIsRecording(false);
    }
  };

  const stopRecording = () => {
    setIsRecording(false);
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
  };

  const simulateInput = () => {
     setWarningMsg(null);
     setTranscript("Lord, I am feeling incredibly overwhelmed with my work. I feel like I'm failing everyone and I don't know how to rest properly. I'm just exhausted.");
  }

  const handleAnalyze = async () => {
    if (!transcript) return;
    setIsAnalyzing(true);
    const result = await analyzeReflection(transcript);
    setPrescription(result);
    setIsAnalyzing(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6 lg:p-10 h-full flex flex-col pb-24 animate-fade-in">
      <div className="text-center mb-6 md:mb-10">
        <h2 className="text-2xl md:text-3xl font-serif text-stone-900 mb-2">Reflection Sanctuary</h2>
        <p className="text-stone-500 text-sm md:text-base">Speak your heart. Let Wisdom listen.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 lg:gap-8 flex-1">
        {/* Input Area */}
        <div className="flex flex-col gap-4 md:gap-6">
           <div className={`
             flex-1 bg-white rounded-2xl border transition-all relative overflow-hidden flex flex-col p-6 shadow-sm group
             ${isRecording ? 'border-red-400 ring-4 ring-red-50' : 'border-stone-200 focus-within:ring-2 focus-within:ring-gold-500/20 focus-within:border-gold-500/50'}
           `}>
             {warningMsg && (
                <div className="absolute top-4 left-4 right-4 bg-red-50 border border-red-100 text-red-600 p-3 rounded-lg text-xs flex items-start gap-2 z-30">
                    <AlertCircle size={14} className="mt-0.5 shrink-0" />
                    <span className="flex-1">{warningMsg}</span>
                    <button onClick={() => setWarningMsg(null)} className="hover:text-red-800"><X size={14}/></button>
                </div>
             )}

             <textarea 
               className="flex-1 w-full resize-none outline-none text-xl font-serif text-stone-800 placeholder:text-stone-300 bg-transparent z-10 leading-relaxed"
               placeholder="Tap the microphone and speak freely. How are you feeling? What is burdening you?"
               value={transcript}
               onChange={(e) => setTranscript(e.target.value)}
             />
             
             {/* Recording Visualizer */}
             {isRecording && (
               <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent pointer-events-none flex items-end justify-center gap-1 pb-6 opacity-50">
                 {[...Array(20)].map((_, i) => (
                   <div 
                    key={i} 
                    className="w-2 bg-red-400 rounded-full animate-pulse" 
                    style={{ 
                        height: `${Math.random() * 100}%`,
                        animationDelay: `${i * 0.1}s` 
                    }} 
                   />
                 ))}
               </div>
             )}
             
             {/* Simulation Button for testing */}
             {!isRecording && !transcript && (
               <button 
                 onClick={simulateInput}
                 className="absolute bottom-4 left-6 text-stone-400 text-xs hover:text-gold-600 flex items-center gap-1 z-20 bg-stone-50 px-3 py-1 rounded-full border border-stone-200 transition-colors"
               >
                 <PlayCircle size={12} /> Simulate Demo Input
               </button>
             )}
           </div>

           <div className="flex items-center gap-4">
             <button
               onClick={toggleRecording}
               className={`
                 flex items-center justify-center gap-2 px-6 py-4 rounded-full font-bold transition-all flex-1 shadow-lg transform active:scale-95
                 ${isRecording 
                   ? 'bg-red-500 hover:bg-red-600 text-white shadow-red-200 animate-pulse' 
                   : 'bg-stone-900 hover:bg-stone-800 text-white'}
               `}
             >
               {isRecording ? <><StopCircle /> Stop Recording</> : <><Mic /> Start Recording</>}
             </button>

             {transcript && !isRecording && (
                <button
                  onClick={handleAnalyze}
                  disabled={isAnalyzing}
                  className="bg-gold-600 hover:bg-gold-500 text-stone-900 px-6 py-4 rounded-full font-bold shadow-lg disabled:opacity-50 flex items-center gap-2 transform active:scale-95 transition-all"
                >
                  {isAnalyzing ? <Loader2 className="animate-spin"/> : <Sparkles />}
                  Analyze Spirit
                </button>
             )}
           </div>
        </div>

        {/* Prescription Area */}
        <div className="relative">
          {prescription ? (
             <div className="h-full bg-stone-50 rounded-2xl border border-stone-200 p-8 shadow-inner animate-slide-up overflow-auto">
                <div className="flex items-center gap-2 mb-6">
                  <div className="p-2 bg-indigo-100 text-indigo-600 rounded-full">
                    <Activity size={20} />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-stone-400 uppercase tracking-wider">Detected Spirit</span>
                    <p className="font-serif text-xl text-stone-900 capitalize">{prescription.emotion}</p>
                  </div>
                </div>

                <div className="mb-8">
                  <h4 className="text-sm font-bold text-stone-900 mb-2">Diagnosis</h4>
                  <p className="text-stone-600 leading-relaxed italic border-l-2 border-stone-300 pl-4">
                    "{prescription.diagnosis}"
                  </p>
                </div>

                <div className="mb-8 bg-white p-6 rounded-xl border border-stone-100 shadow-sm">
                   <h4 className="flex items-center gap-2 text-sm font-bold text-gold-600 mb-4 uppercase tracking-wider">
                     <BookOpen size={16} /> Prescribed Word
                   </h4>
                   <div className="space-y-4">
                     {prescription.verses.map((v, i) => (
                       <div key={i}>
                         <p className="font-serif text-lg text-stone-800 mb-1">"{v.text}"</p>
                         <p className="text-right text-xs font-bold text-stone-400">{v.reference}</p>
                       </div>
                     ))}
                   </div>
                </div>

                <div className="bg-stone-900 text-stone-300 p-6 rounded-xl relative overflow-hidden">
                   <div className="absolute top-0 right-0 p-4 opacity-10"><Sparkles size={48}/></div>
                   <h4 className="text-xs font-bold text-gold-500 uppercase mb-3">Wisdom Drop</h4>
                   <p className="font-serif leading-relaxed relative z-10">
                     {prescription.insight}
                   </p>
                </div>
                
                <button onClick={() => setPrescription(null)} className="mt-6 text-stone-400 text-sm hover:text-stone-600 w-full text-center">
                  Start New Reflection
                </button>
             </div>
          ) : (
            <div className="h-full border-2 border-dashed border-stone-200 rounded-2xl flex flex-col items-center justify-center text-center p-8 text-stone-400 bg-stone-50/30">
               <div className="w-16 h-16 bg-stone-100 rounded-full flex items-center justify-center mb-4 text-stone-300">
                 <Sparkles size={24} />
               </div>
               <h3 className="font-serif text-xl text-stone-600 mb-2">Spiritual Triage</h3>
               <p className="text-sm max-w-xs leading-relaxed">
                 Record your voice. The AI will listen to your emotional state and provide specific scripture and theological insight customized for your soul.
               </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReflectionSanctuary;