
import { GoogleGenAI, Type, Schema } from "@google/genai";
import { ACTSStep, ScriptureWeaveResult, SpiritualPrescription, VisionCard, AlignmentResult, PivotStrategy, PeaceResponse } from "../types";

// Initialize Gemini Client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
const MODEL_NAME = 'gemini-2.5-flash';

const SYSTEM_INSTRUCTION = `
You are a wise, orthodox, and gentle Christian prayer assistant. 
Your goal is to help users deepen their relationship with God.
Use a tone that is reverent, encouraging, and biblically grounded (NIV/ESV style).
Avoid prosperity gospel rhetoric; focus on spiritual depth, peace, and alignment with God's will.
`;

export const generateACTSPrompts = async (step: ACTSStep): Promise<string[]> => {
  try {
    const prompt = `
      Provide 3 distinct, short, and reflective prayer prompts for the "${step}" stage of the A.C.T.S. prayer model.
      
      Context for ${step}:
      - Adoration: Praising God for who He is (attributes).
      - Confession: Acknowledging sin and asking for forgiveness.
      - Thanksgiving: Thanking God for what He has done.
      - Supplication: Asking for needs (self and others).

      Return ONLY the 3 prompts as a JSON array of strings.
    `;

    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: { type: Type.STRING }
        }
      }
    });

    const text = response.text;
    if (!text) return ["Reflect on God's goodness.", "Consider His holiness.", "Rest in His presence."];
    
    return JSON.parse(text) as string[];
  } catch (error) {
    console.error("Error generating prompts:", error);
    return ["Focus your heart on God.", "Speak what is on your mind.", "Listen to His still small voice."];
  }
};

export const weaveScripture = async (journalEntry: string): Promise<ScriptureWeaveResult | null> => {
  try {
    const prompt = `
      Read this user's journal entry: "${journalEntry}"
      1. Identify the core emotion or need.
      2. Find a relevant Bible verse (NIV or ESV) that speaks comfort, wisdom, or promise to this situation.
      3. Rewrite the user's thought into a short prayer that incorporates the verse.

      Return JSON.
    `;

    const schema: Schema = {
      type: Type.OBJECT,
      properties: {
        verseText: { type: Type.STRING },
        reference: { type: Type.STRING },
        prayer: { type: Type.STRING }
      },
      required: ["verseText", "reference", "prayer"]
    };

    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        responseMimeType: "application/json",
        responseSchema: schema
      }
    });

    const text = response.text;
    if (!text) return null;
    return JSON.parse(text) as ScriptureWeaveResult;

  } catch (error) {
    console.error("Error weaving scripture:", error);
    return null;
  }
};

export const generateIntercessionPrayer = async (name: string, request: string): Promise<string> => {
  try {
    const prompt = `
      Write a short, heartfelt prayer (2-3 sentences) for ${name}, regarding: "${request}".
      Use scriptural language suitable for intercession.
    `;

    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      }
    });

    return response.text || `Lord, we lift up ${name} to you. Your will be done in their life.`;
  } catch (error) {
    console.error("Error generating intercession:", error);
    return `Father, please be with ${name} regarding ${request}.`;
  }
};

export const synthesizePrayerSession = async (inputs: Record<string, string>): Promise<string> => {
  try {
    const prompt = `
      The user has just completed a prayer session using the A.C.T.S. model.
      Here are their raw thoughts:
      - Adoration: ${inputs[ACTSStep.ADORATION] || 'Silent adoration'}
      - Confession: ${inputs[ACTSStep.CONFESSION] || 'Silent confession'}
      - Thanksgiving: ${inputs[ACTSStep.THANKSGIVING] || 'Silent thanksgiving'}
      - Supplication: ${inputs[ACTSStep.SUPPLICATION] || 'Silent supplication'}

      Task: Act as a spiritual scribe. Weave these raw inputs into a single, cohesive, and beautiful prayer text (approx 150 words). 
      Make it flow naturally like a Psalm. Do not label the sections. Just write the prayer.
    `;

    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      }
    });

    return response.text || "Lord, hear my prayer.";
  } catch (error) {
    console.error("Error synthesizing prayer:", error);
    return "Lord, you have heard the words of my heart. Let them be acceptable in your sight.";
  }
};

export const analyzeReflection = async (transcript: string): Promise<SpiritualPrescription | null> => {
  try {
    const prompt = `
      The user is speaking their heart to God in a moment of meditation.
      Transcript: "${transcript}"

      1. Identify the core emotion (e.g., Anxiety, Anger, Grief, Joy, Exhaustion).
      2. Provide a brief "Diagnosis" - a gentle, empathetic spiritual observation.
      3. Select 2 distinct Bible verses that directly address this state.
      4. Write a "Insight" (Micro-Sermon): A 2-3 sentence deep theological encouragement or challenge based on the scripture.

      Return JSON.
    `;

    const schema: Schema = {
      type: Type.OBJECT,
      properties: {
        emotion: { type: Type.STRING },
        diagnosis: { type: Type.STRING },
        verses: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              text: { type: Type.STRING },
              reference: { type: Type.STRING }
            }
          }
        },
        insight: { type: Type.STRING }
      },
      required: ["emotion", "diagnosis", "verses", "insight"]
    };

    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        responseMimeType: "application/json",
        responseSchema: schema
      }
    });

    const text = response.text;
    if (!text) return null;
    return JSON.parse(text) as SpiritualPrescription;

  } catch (error) {
    console.error("Error analyzing reflection:", error);
    return null;
  }
};

export const generateVisionBoard = async (focus: string): Promise<VisionCard | null> => {
  try {
    const prompt = `
      The user wants to visualize a spiritual focus/goal: "${focus}".
      
      1. Choose a visual metaphor keyword for an image search (e.g., for "Peace" use "calm ocean" or "sunrise").
      2. Write a powerful "I Am" affirmation based on biblical identity (e.g., "I am guarded by God's peace").
      3. Select a confirming scripture.

      Return JSON.
    `;

    const schema: Schema = {
      type: Type.OBJECT,
      properties: {
        visualKeyword: { type: Type.STRING },
        affirmation: { type: Type.STRING },
        scripture: { type: Type.STRING },
        reference: { type: Type.STRING }
      },
      required: ["visualKeyword", "affirmation", "scripture", "reference"]
    };

    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        responseMimeType: "application/json",
        responseSchema: schema
      }
    });

    const text = response.text;
    if (!text) return null;
    const data = JSON.parse(text);
    return {
      id: Date.now().toString(),
      focus,
      ...data
    };

  } catch (error) {
    console.error("Error generating vision board:", error);
    return null;
  }
};

export const analyzePurposeAlignment = async (callings: string[], tasks: string[]): Promise<AlignmentResult | null> => {
  try {
    const prompt = `
      I want to measure my "Stewardship Score".
      
      My Kingdom Callings (Big Goals):
      ${JSON.stringify(callings)}

      My Daily Task List:
      ${JSON.stringify(tasks)}

      1. Analyze how well the tasks serve the callings.
      2. Give a score from 0-100 based on effectiveness/stewardship (not just busyness).
      3. For EACH task, label it as:
         - 'aligned' (directly serves a calling)
         - 'neutral' (maintenance/necessary but not strategic)
         - 'drift' (distraction/waste of time)
      4. Provide a 1-sentence "reason" for each task's label.
      5. Provide a short, punchy "feedback" summary (exhortation) for the whole day.

      Return JSON.
    `;

    const schema: Schema = {
      type: Type.OBJECT,
      properties: {
        score: { type: Type.INTEGER },
        feedback: { type: Type.STRING },
        analysis: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              task: { type: Type.STRING },
              status: { type: Type.STRING, enum: ['aligned', 'neutral', 'drift'] },
              reason: { type: Type.STRING }
            }
          }
        }
      },
      required: ["score", "feedback", "analysis"]
    };

    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        responseMimeType: "application/json",
        responseSchema: schema
      }
    });

    const text = response.text;
    if (!text) return null;
    return JSON.parse(text) as AlignmentResult;

  } catch (error) {
    console.error("Error analyzing purpose alignment:", error);
    return null;
  }
};

export const generatePivotStrategy = async (habit: string, trigger: string): Promise<PivotStrategy | null> => {
  try {
    const prompt = `
      The user is setting up a "Pattern Interrupt" protocol for a bad habit/sin they want to break.
      Habit: "${habit}"
      Trigger: "${trigger}"

      Act as a wise, strict, but loving Spiritual Director using CBT (Cognitive Behavioral Therapy) principles.
      
      1. Create a "Interrupt Question": A jarring, thought-provoking question to immediately stop the autopilot behavior (e.g., "Is this what you want your son to remember?", "Does this feed the spirit or the flesh?").
      2. Select a powerful, counter-acting "Scripture Truth" (Verse and Reference).
      3. Prescribe a "Micro-Action": A specific 2-minute physical action to change their state immediately (e.g., "Do 20 pushups", "Walk outside", "Splash cold water", "Call a friend").

      Return JSON.
    `;

    const schema: Schema = {
      type: Type.OBJECT,
      properties: {
        interruptQuestion: { type: Type.STRING },
        scriptureTruth: {
          type: Type.OBJECT,
          properties: {
            text: { type: Type.STRING },
            reference: { type: Type.STRING }
          }
        },
        microAction: { type: Type.STRING }
      },
      required: ["interruptQuestion", "scriptureTruth", "microAction"]
    };

    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        responseMimeType: "application/json",
        responseSchema: schema
      }
    });

    const text = response.text;
    if (!text) return null;
    const data = JSON.parse(text);
    return {
      id: Date.now().toString(),
      habit,
      trigger,
      ...data
    };

  } catch (error) {
    console.error("Error generating pivot strategy:", error);
    return null;
  }
};

export const reframeConflict = async (rawThought: string): Promise<PeaceResponse | null> => {
  try {
    const prompt = `
      The user is feeling angry/hurt in their marriage and has typed a raw thought.
      Raw Thought: "${rawThought}"

      Act as a Marriage Counselor specialized in "The Gottman Method" and Christian Peacemaking.
      
      1. Identify the core emotion (e.g., "Feeling unappreciated", "Feeling controlled").
      2. Provide a 1-sentence validation: Acknowledge the feeling without endorsing the sin of anger.
      3. Create a "Reframed Script": Rewrite their raw thought into a "Soft Startup" (I-Statement) that expresses a need/vulnerability rather than an accusation.
      4. Provide a "Biblical Principle": A short proverb or wisdom about speech/reconciliation.

      Return JSON.
    `;

    const schema: Schema = {
      type: Type.OBJECT,
      properties: {
        originalEmotion: { type: Type.STRING },
        validation: { type: Type.STRING },
        reframedScript: { type: Type.STRING },
        biblicalPrinciple: { type: Type.STRING }
      },
      required: ["originalEmotion", "validation", "reframedScript", "biblicalPrinciple"]
    };

    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        responseMimeType: "application/json",
        responseSchema: schema
      }
    });

    const text = response.text;
    if (!text) return null;
    return JSON.parse(text) as PeaceResponse;

  } catch (error) {
    console.error("Error reframing conflict:", error);
    return null;
  }
};
