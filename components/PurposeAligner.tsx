
import React, { useState, useEffect } from 'react';
import { Target, Plus, Trash2, Loader2 } from 'lucide-react';
import { analyzePurposeAlignment } from '@/services/geminiService';
import { AlignmentResult } from '@/types';
import { getCallings, saveCallings, getTasks, saveTasks } from '@/services/storageService';

const PurposeAligner: React.FC = () => {
  const [callings, setCallings] = useState<string[]>([]);
  const [tasks, setTasks] = useState<string[]>([]);
  
  const [newCalling, setNewCalling] = useState('');
  const [newTask, setNewTask] = useState('');
  
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AlignmentResult | null>(null);

  // Load from storage on mount
  useEffect(() => {
    const storedCallings = getCallings();
    const storedTasks = getTasks();
    
    if (storedCallings.length > 0) {
      setCallings(storedCallings);
    } else {
      const defaultCallings = [
        "Be a present and godly father",
        "Launch the ministry project"
      ];
      setCallings(defaultCallings);
      saveCallings(defaultCallings);
    }
    
    if (storedTasks.length > 0) {
      setTasks(storedTasks);
    } else {
      const defaultTasks = [
        "Write project proposal",
        "Scroll social media",
        "Play with kids in the park",
        "Answer emails"
      ];
      setTasks(defaultTasks);
      saveTasks(defaultTasks);
    }
  }, []);

  // Save whenever callings change
  useEffect(() => {
    if (callings.length > 0) {
      saveCallings(callings);
    }
  }, [callings]);

  // Save whenever tasks change
  useEffect(() => {
    if (tasks.length > 0) {
      saveTasks(tasks);
    }
  }, [tasks]);

  const addCalling = () => {
    if (newCalling.trim()) {
      setCallings([...callings, newCalling.trim()]);
      setNewCalling('');
      setResult(null); // Reset result on change
    }
  };

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, newTask.trim()]);
      setNewTask('');
      setResult(null); // Reset result on change
    }
  };

  const removeCalling = (idx: number) => {
    setCallings(callings.filter((_, i) => i !== idx));
    setResult(null);
  };

  const removeTask = (idx: number) => {
    setTasks(tasks.filter((_, i) => i !== idx));
    setResult(null);
  };

  const handleAnalyze = async () => {
    if (callings.length === 0 || tasks.length === 0) return;
    setIsAnalyzing(true);
    const data = await analyzePurposeAlignment(callings, tasks);
    setResult(data);
    setIsAnalyzing(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'aligned': return 'text-gold-600 border-gold-200 bg-gold-50';
      case 'neutral': return 'text-stone-500 border-stone-200 bg-stone-50';
      case 'drift': return 'text-red-500 border-red-200 bg-red-50';
      default: return 'text-stone-500';
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 md:p-10 pb-24 h-full animate-fade-in flex flex-col">
      <div className="mb-10 text-center max-w-2xl mx-auto">
        <h2 className="text-3xl font-serif text-stone-900 mb-2 flex items-center justify-center gap-3">
          <Target className="text-gold-600" /> Purpose Aligner
        </h2>
        <p className="text-stone-500">
          "Look carefully then how you walk, not as unwise but as wise, making the best use of the time." — Ephesians 5:15
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 flex-1">
        
        {/* Left Column: Callings */}
        <div className="flex flex-col gap-6">
          <div className="bg-stone-900 text-stone-100 p-6 rounded-2xl shadow-xl">
             <h3 className="text-xl font-serif text-gold-500 mb-1">Kingdom Callings</h3>
             <p className="text-sm text-stone-400 mb-6">What has God called you to focus on in this season?</p>
             
             <div className="space-y-3 mb-6">
                {callings.map((c, i) => (
                  <div key={i} className="flex justify-between items-center bg-stone-800 p-3 rounded-lg border border-stone-700">
                    <span className="font-medium">{c}</span>
                    <button onClick={() => removeCalling(i)} className="text-stone-500 hover:text-red-400"><Trash2 size={16} /></button>
                  </div>
                ))}
             </div>

             <div className="flex gap-2">
               <input 
                 className="flex-1 bg-stone-800 border border-stone-700 rounded-lg px-3 py-2 text-white placeholder:text-stone-500 outline-none focus:border-gold-500 transition-colors"
                 placeholder="Add a calling..."
                 value={newCalling}
                 onChange={e => setNewCalling(e.target.value)}
                 onKeyDown={e => e.key === 'Enter' && addCalling()}
               />
               <button onClick={addCalling} className="bg-gold-600 text-stone-900 p-2 rounded-lg hover:bg-gold-500 transition-colors"><Plus /></button>
             </div>
          </div>

          {/* Right Column: Tasks (Shown here on mobile, but semantically right) */}
          <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm flex-1 flex flex-col">
             <h3 className="text-xl font-serif text-stone-800 mb-1">Daily Stewardship</h3>
             <p className="text-sm text-stone-500 mb-6">Your to-do list for today.</p>
             
             <div className="space-y-2 mb-6 flex-1">
                {tasks.map((t, i) => (
                  <div key={i} className="flex justify-between items-center bg-stone-50 p-3 rounded-lg border border-stone-100 group">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-stone-300"></div>
                      <span className="text-stone-700">{t}</span>
                    </div>
                    <button onClick={() => removeTask(i)} className="text-stone-300 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"><Trash2 size={16} /></button>
                  </div>
                ))}
                {tasks.length === 0 && <p className="text-stone-300 text-center py-4 italic">No tasks added yet.</p>}
             </div>

             <div className="flex gap-2">
               <input 
                 className="flex-1 bg-white border border-stone-200 rounded-lg px-3 py-2 text-stone-800 placeholder:text-stone-400 outline-none focus:border-stone-400 transition-colors"
                 placeholder="Add a task..."
                 value={newTask}
                 onChange={e => setNewTask(e.target.value)}
                 onKeyDown={e => e.key === 'Enter' && addTask()}
               />
               <button onClick={addTask} className="bg-stone-200 text-stone-600 p-2 rounded-lg hover:bg-stone-300 transition-colors"><Plus /></button>
             </div>
          </div>
        </div>

        {/* Right Column / Center Action Area */}
        <div className="flex flex-col justify-center">
           
           {!result ? (
             <div className="flex flex-col items-center justify-center h-full p-8 border-2 border-dashed border-stone-200 rounded-3xl bg-stone-50/50">
                <Target size={48} className="text-stone-300 mb-4" />
                <h3 className="text-lg font-medium text-stone-500 mb-2">Measure Your Alignment</h3>
                <p className="text-sm text-stone-400 text-center max-w-sm mb-8">
                  The AI will analyze your tasks against your callings to see if you are drifting or driving forward.
                </p>
                <button 
                  onClick={handleAnalyze}
                  disabled={isAnalyzing || callings.length === 0 || tasks.length === 0}
                  className="bg-stone-900 text-white px-8 py-4 rounded-full font-bold shadow-lg hover:bg-gold-600 transition-all disabled:opacity-50 flex items-center gap-3"
                >
                  {isAnalyzing ? <Loader2 className="animate-spin" /> : <Target />}
                  Check Alignment
                </button>
             </div>
           ) : (
             <div className="bg-white rounded-3xl shadow-2xl border border-stone-100 overflow-hidden animate-slide-up h-full flex flex-col">
                {/* Score Header */}
                <div className={`p-8 text-center relative overflow-hidden ${result.score > 75 ? 'bg-gold-50' : result.score > 40 ? 'bg-stone-100' : 'bg-red-50'}`}>
                   <div className="relative z-10">
                     <span className="text-xs font-bold uppercase tracking-widest text-stone-500">Stewardship Score</span>
                     <div className="text-6xl font-serif font-bold text-stone-900 mt-2 mb-2">{result.score}%</div>
                     <p className="font-serif italic text-stone-600 max-w-md mx-auto">"{result.feedback}"</p>
                   </div>
                   
                   {/* Background Circle */}
                   <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full opacity-50 blur-3xl ${result.score > 75 ? 'bg-gold-400' : result.score > 40 ? 'bg-stone-300' : 'bg-red-300'}`}></div>
                </div>

                {/* Analysis List */}
                <div className="p-6 overflow-auto flex-1">
                   <h4 className="text-sm font-bold text-stone-400 uppercase tracking-wider mb-4">Detailed Analysis</h4>
                   <div className="space-y-4">
                      {result.analysis.map((item, idx) => (
                        <div key={idx} className="flex gap-4 items-start p-3 hover:bg-stone-50 rounded-lg transition-colors">
                           <div className={`px-2 py-1 rounded text-xs font-bold uppercase border ${getStatusColor(item.status)} min-w-[70px] text-center shrink-0 mt-0.5`}>
                             {item.status}
                           </div>
                           <div>
                             <p className="font-medium text-stone-900">{item.task}</p>
                             <p className="text-xs text-stone-500 mt-1">{item.reason}</p>
                           </div>
                        </div>
                      ))}
                   </div>
                </div>

                <div className="p-4 border-t border-stone-100 text-center">
                   <button onClick={() => setResult(null)} className="text-sm text-stone-400 hover:text-stone-800">Start New Analysis</button>
                </div>
             </div>
           )}

        </div>
      </div>
    </div>
  );
};

export default PurposeAligner;
