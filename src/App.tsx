import React, { useState } from "react";
import TutorInterface from "./components/TutorInterface";
import ProductStrategy from "./components/ProductStrategy";
import SyllabusDatabase from "./components/SyllabusDatabase";
import OpenAISystemArch from "./components/OpenAISystemArch";
import { MessageSquareCode, Sparkles, BookOpen, Presentation, Cpu, Github } from "lucide-react";

export default function App() {
  const [currentTab, setCurrentTab] = useState<"tutor" | "syllabus" | "pm" | "architecture">("tutor");

  return (
    <div className="bg-slate-50 min-h-screen text-slate-800 antialiased font-sans">
      
      {/* 1. TOP HEADER NAVIGATION */}
      <header className="border-b border-slate-200/80 bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          
          {/* Logo Brand with aesthetic Dot indicator */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-teal-700 flex items-center justify-center text-white font-display font-bold text-sm shadow-md">
              話
            </div>
            <div className="flex flex-col">
              <span className="font-display font-bold text-slate-900 tracking-tight text-base leading-none">
                SpeakSensei
              </span>
              <span className="text-[10px] text-slate-500 font-mono tracking-wider uppercase mt-0.5">
                AI Japanese Speaking Tutor
              </span>
            </div>
          </div>

          {/* Tab Navigation Links */}
          <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200/50">
            <button
              onClick={() => setCurrentTab("tutor")}
              className={`flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg transition-all ${
                currentTab === "tutor"
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-500 hover:text-slate-900"
              }`}
            >
              <MessageSquareCode size={14} />
              <span className="hidden sm:inline">Speaking Practice</span>
              <span className="sm:hidden">Practice</span>
            </button>
            <button
              onClick={() => setCurrentTab("syllabus")}
              className={`flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg transition-all ${
                currentTab === "syllabus"
                  ? "bg-white text-slate-1000 shadow-sm bg-teal-50 text-teal-900 font-bold"
                  : "text-slate-500 hover:text-slate-900"
              }`}
            >
              <BookOpen size={14} />
              <span>100 Scenarios Coach</span>
            </button>
            <button
              onClick={() => setCurrentTab("pm")}
              className={`flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg transition-all ${
                currentTab === "pm"
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-500 hover:text-slate-900"
              }`}
            >
              <Presentation size={14} />
              <span className="hidden sm:inline">Product Strategy</span>
              <span className="sm:hidden">Strategy</span>
            </button>
            <button
              onClick={() => setCurrentTab("architecture")}
              className={`flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg transition-all ${
                currentTab === "architecture"
                  ? "bg-white text-slate-1000 shadow-sm bg-[#cf5817]/10 text-orange-200 font-bold"
                  : "text-slate-500 hover:text-slate-950"
              }`}
            >
              <Cpu size={14} />
              <span className="hidden sm:inline">OpenAI System Design</span>
              <span className="sm:hidden">System Arch</span>
            </button>
          </div>

          <div className="hidden sm:flex items-center gap-3">
            <span className="text-[10px] text-slate-400 font-mono">Build Platform Active</span>
            <div className="h-2 w-2 rounded-full bg-teal-500 animate-pulse"></div>
          </div>

        </div>
      </header>

      {/* 2. MAIN CORE VIEWS PORTPORT CONTAINER */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        
        {/* Tutor Interactive View */}
        {currentTab === "tutor" && (
          <div className="space-y-8">
            <div className="bg-gradient-to-r from-slate-900 to-teal-950 text-white rounded-3xl p-6 md:p-10 shadow-xl flex flex-wrap items-center justify-between gap-6 relative overflow-hidden">
              <div className="absolute -right-12 bottom-0 w-80 h-80 opacity-10 blur-xl bg-teal-400 rounded-full"></div>
              <div className="max-w-xl space-y-3 z-10">
                <span className="bg-teal-500/10 text-teal-300 font-mono text-[10px] uppercase tracking-widest px-2.5 py-1 rounded-full border border-teal-500/20 font-semibold inline-block">
                  Live Conversation Lab
                </span>
                <h1 className="text-2xl md:text-3xl font-display font-medium tracking-tight">
                  Tackle Workplace & Daily Japanese Situations
                </h1>
                <p className="text-slate-200 text-xs md:text-sm font-light leading-relaxed">
                  Practice oral conversation, learn context-aware honorific etiquette (Keigo), and get immediate structural evaluations. Enable your microphone or type your responses.
                </p>
              </div>

              {/* Instant performance gauge or feature highlights */}
              <div className="flex items-center gap-6 bg-white/5 border border-white/10 rounded-2xl p-4 md:p-6 backdrop-blur-sm shadow-sm md:w-max min-w-[200px] z-10 select-none">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-teal-400"></div>
                    <span className="text-xs text-slate-200">Live Voice Recognizer</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-teal-400"></div>
                    <span className="text-xs text-slate-200">Naturalness Corrector</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-indigo-400"></div>
                    <span className="text-xs text-slate-200">Keigo Form Evaluator</span>
                  </div>
                </div>
              </div>
            </div>

            <TutorInterface />
          </div>
        )}

        {/* 100 Scenarios Syllabus Tab */}
        {currentTab === "syllabus" && <SyllabusDatabase />}

        {/* Product Strategy Playbook View */}
        {currentTab === "pm" && <ProductStrategy />}

        {/* OpenAI System Architecture Tab */}
        {currentTab === "architecture" && <OpenAISystemArch />}

      </main>

      {/* 3. CORE Humble Elegant Footer */}
      <footer className="border-t border-slate-200 bg-white py-8 mt-12 text-slate-400 text-xs font-mono">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <span>SpeakSensei • Engineered for Japanese workplace and communication readiness.</span>
          </div>
          <div className="flex gap-4">
            <span>Powered by Gemini 3.5 Flash</span>
            <span>CEFR-Aligned Evaluation</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
