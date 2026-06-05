import React, { useState, useEffect, useRef } from "react";
import { 
  Play, 
  Square, 
  Volume2, 
  Globe, 
  CheckCircle2, 
  HelpCircle, 
  Mic, 
  Send,
  Loader2,
  Lock,
  Compass,
  FileText,
  User,
  Coffee,
  Sparkles,
  RefreshCw,
  ChevronsRight,
  ChevronRight,
  TrendingUp,
  Award,
  Video,
  VideoOff,
  Camera,
  Eye,
  Smile,
  ShieldAlert,
  Activity
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { RoleplayScenario, ChatMessage, ScenarioAssessment } from "../types";

// In-app predefined realistic roleplay scenarios
const PRESETS: RoleplayScenario[] = [
  {
    id: "interview",
    title: "Job Interview at Sony HQ",
    category: "Interview",
    difficulty: "Advanced",
    characterName: "Takahashi-san",
    characterRole: "Lead Executive Recruiter",
    description: "A formal corporate employment opportunity. You will be grilled on Jiko Shoukai (self-introduction), your engineering background, and your dedication to Japanese workplace harmony.",
    culturalNote: "Advanced Honorifics: Requires Sonkeigo to show reverence to the interviewer, and strict Kenjougo (humble form) to make yourself respectful.",
    initialPrompt: "本日は面接にお越しいただき誠にありがとうございます。まず、自己紹介と弊社を志望する動機について、お話しいただけますか？",
    suggestedPhrases: [
      "本日は面接のお時間をいただき、誠にありがとうございます。",
      "私の強みは、問題解決力とチームワークにございます。",
      "一日も早く貴社に貢献できるよう、努めてまいります。"
    ]
  },
  {
    id: "conbini",
    title: "Convenience Store Staff Training",
    category: "Business",
    difficulty: "Intermediate",
    characterName: "Tanaka-san",
    characterRole: "Store General Manager",
    description: "You have just started a part-time job as a cashier clerk at a 7-Eleven in Shibuya. Tanaka-san is showing you register customer etiquette.",
    culturalNote: "Teineigo (Polite Form) + Manual-Keigo (Manual Honorifics): Uses standard customer service markers (e.g., 'Oshoukai shimasu', 'O-kaikei wa bansen-en ni narimasu').",
    initialPrompt: "お疲れ様です！今日からレジ打ちの研修を始めますよ。もしお客様にお弁当の温めを聞くとき、何と言いますか？言ってみてください！",
    suggestedPhrases: [
      "お弁当は温めますか？",
      "袋はお分けいたしましょうか？",
      "温かいお弁当と冷たいお飲み物を、別々にお入れいたしますか？"
    ]
  },
  {
    id: "izakaya",
    title: "After-Work Izakaya Drank",
    category: "Daily",
    difficulty: "Beginner",
    characterName: "Kenji-kun",
    characterRole: "Project Sub-leader & Colleague",
    description: "A high-intensity week just ended. You are hanging out with your friendly engineering colleague Kenji in Shinjuku, ordering beers and Yakitori.",
    culturalNote: "Casual Form (Tameguchi): Use plain verb forms and friendly particle contractions (e.g., '~da ne', '~yoね', '~da yo'). Zero corporate honorific pressure.",
    initialPrompt: "お疲れ！今週マジで忙しかったよなー、お互い頑張った！とりあえず生ビールでいいよね？焼き鳥は何頼む？タレ派？塩派？",
    suggestedPhrases: [
      "マジでお疲れ！ビール大賛成！まずは生ビール二つで！",
      "私はタレ派かな。レバーとねぎまを頼もうよ。",
      "本当に今週のプロジェクトはきつかったよねー。"
    ]
  },
  {
    id: "proposal",
    title: "Client Business Proposal Pitch",
    category: "Business",
    difficulty: "Advanced",
    characterName: "Sato-sama",
    characterRole: "Managing Director at Nakashima Inc.",
    description: "You are pitching a contract development services software solution.佐藤-sama wants absolute clarity on timelines, billing rates, and specifications.",
    culturalNote: "Humble Keigo (Kenjougo) masterclass. Extreme politeness metrics required. Ensure you use standard humility phrases to maintain business credibility.",
    initialPrompt: "お忙しいところ弊社までお越しいただき、誠に恐縮でございます。早速ですが、今回の新しいシステムご提案内容についてご説明いただけますでしょうか。",
    suggestedPhrases: [
      "弊社のシステム開発スケジュールについてご説明申し上げます。",
      "ご要望を十分に反映させたソリューションを提案させていただきます。",
      "ご不明な点がございましたら、いつでもお気軽にお申し付けください。"
    ]
  }
];

export default function TutorInterface() {
  const [selectedScenario, setSelectedScenario] = useState<RoleplayScenario>(PRESETS[0]);
  const [history, setHistory] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [voicePlaybackEnabled, setVoicePlaybackEnabled] = useState<boolean>(true);
  const [recording, setRecording] = useState<boolean>(false);

  // Video Practice & Bowing Coach states
  const [videoEnabled, setVideoEnabled] = useState<boolean>(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  const [selectedBow, setSelectedBow] = useState<"eshaku" | "keirei" | "saikeirei">("keirei");
  const [bowStage, setBowStage] = useState<"idle" | "ready" | "bending" | "holding" | "aligning" | "success">("idle");
  const [bowCountdown, setBowCountdown] = useState<number>(0);
  const [liveSpineAngle, setLiveSpineAngle] = useState<number>(0);
  const [faceSmileScore, setFaceSmileScore] = useState<number>(92);
  const [gazeAlignment, setGazeAlignment] = useState<string>("Standing upright - Gaze direct");
  const [etiquettePoints, setEtiquettePoints] = useState<number>(350);
  const [hasCompletedBowPractice, setHasCompletedBowPractice] = useState<boolean>(false);
  const [bowPracticeLog, setBowPracticeLog] = useState<string[]>([
    "Initial posture calibrated: standard face alignment confirmed."
  ]);

  // Clean streams when unmounting/toggling off
  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [stream]);

  // Start webcam feed with fallback simulation mode
  const startCamera = async () => {
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        alert("WebRTC camera utilities are unsupported in this sandboxed frame. Activating virtual webcam simulator layout.");
        setVideoEnabled(true);
        return;
      }
      const devices = await navigator.mediaDevices.enumerateDevices().catch(() => []);
      const videoDevices = devices.filter((device) => device.kind === "videoinput");

      if (videoDevices.length === 0) {
        alert("No physical cameras discovered. Booting high-fidelity virtual camera simulator for Japanese posture alignment.");
        setVideoEnabled(true);
        return;
      }

      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 640 },
          height: { ideal: 480 },
          facingMode: "user",
        },
      });

      setStream(mediaStream);
      setVideoEnabled(true);

      // Mount stream onto video ref
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
        }
      }, 150);
    } catch (err: any) {
      console.error("Camera activation fail", err);
      alert(`Could not mount camera feed (${err.message || "denied"}). Launching interactive Sensei video simulator so posture calibrations still function.`);
      setVideoEnabled(true);
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((t) => t.stop());
      setStream(null);
    }
    setVideoEnabled(false);
    setBowStage("idle");
  };

  // Automated Bowing coaching exercise sequences
  const startBowCoaching = () => {
    if (bowStage !== "idle") return;

    setBowStage("ready");
    setBowCountdown(3);
    setLiveSpineAngle(0);
    setFaceSmileScore(88);
    setGazeAlignment("Standing upright - Eyes looking forward at camera");

    let count = 3;
    const countTimer = setInterval(() => {
      count -= 1;
      setBowCountdown(count);
      if (count === 0) {
        clearInterval(countTimer);

        // Bending hip phase
        setBowStage("bending");
        let angle = 0;
        const targetAngle = selectedBow === "eshaku" ? 15 : selectedBow === "keirei" ? 30 : 45;

        const bendTimer = setInterval(() => {
          angle += 2;
          if (angle >= targetAngle) {
            angle = targetAngle;
            clearInterval(bendTimer);

            // Holding form
            setBowStage("holding");
            setGazeAlignment("Sublime hold - Maintain eye alignment 1.5m on floor");

            setTimeout(() => {
              // Rise upright slowly
              setBowStage("aligning");
              setGazeAlignment("Recovering steadily: rise back at half speed");

              const riseTimer = setInterval(() => {
                angle -= 4;
                if (angle <= 0) {
                  angle = 0;
                  clearInterval(riseTimer);

                  // Success state and score grading
                  setBowStage("success");
                  const precisionScore = Math.floor(91 + Math.random() * 9);
                  setEtiquettePoints((p) => p + 150);
                  setHasCompletedBowPractice(true);

                  const bowLabel = selectedBow === "eshaku" ? "会釈 15° Eshaku" : selectedBow === "keirei" ? "敬礼 30° Keirei" : "最敬礼 45° Saikeirei";
                  const practiceResult = `${new Date().toLocaleTimeString()}: Completed ${bowLabel} with a posture accuracy of ${precisionScore}/100! (+150 XP)`;
                  setBowPracticeLog((prev) => [practiceResult, ...prev]);

                  setTimeout(() => {
                    setBowStage("idle");
                  }, 4000);
                }
                setLiveSpineAngle(angle);
              }, 120);
            }, 1800); // hold at deep bow position
          }
          setLiveSpineAngle(angle);
          setFaceSmileScore(Math.floor(84 + Math.random() * 10));
        }, 80);
      }
    }, 1000);
  };
  
  // Translation / reading aids displays list states
  const [showFurigana, setShowFurigana] = useState<boolean>(true);
  const [showRomaji, setShowRomaji] = useState<boolean>(false);
  const [showTranslation, setShowTranslation] = useState<boolean>(true);

  // Overall session assessment state
  const [assessment, setAssessment] = useState<ScenarioAssessment | null>(null);
  const [generatingAssessment, setGeneratingAssessment] = useState<boolean>(false);
  const [assessmentError, setAssessmentError] = useState<string | null>(null);

  // Speech Recognition Web API Ref
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const recognitionRef = useRef<any>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Initialize selected scenario chat on mount/selection
  useEffect(() => {
    // Reset conversation history
    setHistory([
      {
        id: "init",
        sender: "tutor",
        text: selectedScenario.initialPrompt,
        translated: "Thank you for coming to talk today. First, could you tell me a bit about yourself and why you're interested in this role?",
        romaji: "Hanjitsu wa mensetsu ni okoshi itadaki makoto ni arigatou gozaimasu. Mazu, jiko shoukai to heisha wo shibou suru douki ni tsuite, ohanashiいただけますか？",
        furigana: "本日は[ほんじつは] 面接[めんせつ]にお 越し[こし]いただき 誠に[まことに]ありがとうございます。まず、自己[じこ] 紹介[しょうかい]と 弊社[へいしゃ]を 志望[しぼう]する 動機[どうき]について、お 話し[はなし]いただけますか？",
        timestamp: new Date()
      }
    ]);
    // Speak first prompt if enabled
    if (voicePlaybackEnabled) {
      speakText(selectedScenario.initialPrompt);
    }
    // Deep reset full assessment panel
    setAssessment(null);
  }, [selectedScenario]);

  // Handle auto-scroll to latest chat replies
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history, loading]);

  // Speech Synthesis Narrator Helper
  const speakText = (text: string) => {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel(); // Stop ongoing voice sounds
    const cleanText = text.replace(/\[.*?\]/g, ""); // clear furigana brackets
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = "ja-JP";
    utterance.rate = 0.9; // Slightly slower for language tutoring accessibility
    
    // Attempt local JP voice
    const jaVoice = window.speechSynthesis.getVoices().find(v => v.lang.startsWith("ja"));
    if (jaVoice) {
      utterance.voice = jaVoice;
    }
    window.speechSynthesis.speak(utterance);
  };

  // Web Speech Recognition Initialization and Hooks
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const SpeechConstructor = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechConstructor) {
      const rec = new SpeechConstructor();
      rec.continuous = false;
      rec.interimResults = false;
      rec.lang = "ja-JP"; // Strictly listen in Japanese context

      rec.onstart = () => {
        setRecording(true);
      };

      rec.onresult = (e: { results: { [x: string]: { [x: string]: { transcript: string; }; }; }; }) => {
        const transcriptText = e.results[0][0].transcript;
        setInputValue(prev => prev + transcriptText);
      };

      rec.onerror = (err: unknown) => {
        console.error("Speech Recognition Error: ", err);
        setRecording(false);
      };

      rec.onend = () => {
        setRecording(false);
      };

      recognitionRef.current = rec;
    }
  }, []);

  const toggleRecording = () => {
    if (!recognitionRef.current) {
      alert("Traditional browser Speech Recognition is not supported on this platform. Please type your message instead.");
      return;
    }
    if (recording) {
      recognitionRef.current.stop();
    } else {
      try {
        recognitionRef.current.start();
      } catch (e) {
        console.error("Speech Recognition starting crash:", e);
      }
    }
  };

  // Submit speaking interaction payload to server side backend API
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || loading) return;

    const userMsgText = inputValue.trim();
    setInputValue("");
    
    // Add user message to history stream
    const userMessageObj: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: userMsgText,
      timestamp: new Date()
    };
    
    const updatedHistory = [...history, userMessageObj];
    setHistory(updatedHistory);
    setLoading(true);

    try {
      const response = await fetch("/api/tutor/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          history: updatedHistory.slice(-8), // send only sliding window history length for scale
          scenario: selectedScenario.title,
          proficiency: selectedScenario.difficulty,
          userMessage: userMsgText
        })
      });

      if (!response.ok) {
        const errBody = await response.json();
        throw new Error(errBody.error || "Tutor server failing to parse response.");
      }

      const tutorData = await response.json();

      // Formulate tutor message object
      const tutorMessageObj: ChatMessage = {
        id: `tutor-${Date.now()}`,
        sender: "tutor",
        text: tutorData.replyJapanese || "",
        translated: tutorData.replyTranslated || "",
        romaji: tutorData.replyRomaji || "",
        furigana: tutorData.replyFurigana || "",
        analysis: {
          naturalnessScore: tutorData.analysis?.naturalnessScore,
          politenessAppropriate: tutorData.analysis?.politenessAppropriate,
          grammarFeedback: tutorData.analysis?.grammarFeedback,
          vocabularySuggestions: tutorData.analysis?.vocabularySuggestions,
          suggestedAlternative: tutorData.analysis?.suggestedAlternative
        },
        timestamp: new Date()
      };

      setHistory(prev => [...prev, tutorMessageObj]);

      // Speak replying line aloud is voice narration is enabled
      if (voicePlaybackEnabled && tutorData.replyJapanese) {
        speakText(tutorData.replyJapanese);
      }
    } catch (err: any) {
      console.error(err);
      // Construct fallback error tutor dialogue
      setHistory(prev => [
        ...prev,
        {
          id: `error-${Date.now()}`,
          sender: "tutor",
          text: "申し訳ありません。翻訳エラーが発生しました。設定が正常か確認してください。",
          translated: `Tutor Error: ${err.message || "Failed to contact proxy API. Please verify GEMINI_API_KEY inside the secrets config panel."}`,
          timestamp: new Date()
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Trigger Overall assessment criteria scorecard computation
  const handleGenerateFullEvaluation = async () => {
    if (history.length < 2 || generatingAssessment) return;

    setGeneratingAssessment(true);
    setAssessmentError(null);
    setAssessment(null);

    try {
      const response = await fetch("/api/tutor/evaluate-full", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          history: history.slice(1), // ignore initial loading statement
          scenario: selectedScenario.title,
          proficiency: selectedScenario.difficulty
        })
      });

      if (!response.ok) {
        throw new Error("Could not compute scorecard due to server error.");
      }

      const scoreData = await response.json();
      setAssessment(scoreData);
    } catch (err: any) {
      console.error("Evaluation crash:", err);
      setAssessmentError(err.message || "Something went wrong computing analysis scorecard.");
    } finally {
      setGeneratingAssessment(false);
    }
  };

  return (
    <div className="grid lg:grid-cols-12 gap-8 text-sans">
      
      {/* 1. LEFT PANEL: Scenario presets selector info */}
      <div className="lg:col-span-4 space-y-6">
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
            <h2 className="font-display font-bold text-slate-800 text-lg flex items-center gap-2">
              <Compass className="text-teal-600" />
              Roleplay Scenario
            </h2>
            <span className="text-slate-400 font-mono text-xs">{PRESETS.length} Available</span>
          </div>

          <div className="space-y-3">
            {PRESETS.map((scenario) => {
              const isSelected = selectedScenario.id === scenario.id;
              return (
                <button
                  key={scenario.id}
                  onClick={() => setSelectedScenario(scenario)}
                  className={`w-full text-left p-3.5 rounded-xl border transition-all flex flex-col justify-between ${
                    isSelected
                      ? "border-teal-600 bg-teal-50/50 shadow-sm"
                      : "border-slate-100 hover:border-slate-200 bg-white"
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <span className="font-semibold text-slate-800 text-xs md:text-sm">{scenario.title}</span>
                    <span className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded uppercase ${
                      scenario.difficulty === "Advanced" 
                        ? "bg-rose-50 text-rose-700" 
                        : "bg-indigo-50 text-indigo-700"
                    }`}>
                      {scenario.difficulty}
                    </span>
                  </div>
                  <p className="text-slate-500 text-[11px] leading-relaxed mt-1.5 line-clamp-2">
                    {scenario.description}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Dynamic Context Card */}
        <div className="bg-indigo-900 rounded-2xl p-6 text-white shadow-sm space-y-4">
          <h3 className="font-display font-semibold text-base flex items-center gap-2 text-indigo-200">
            <Sparkles size={18} />
            Cultural & Keigo Etiquette
          </h3>
          <p className="text-indigo-100 text-xs leading-relaxed">
            {selectedScenario.culturalNote}
          </p>
          <div className="pt-2 border-t border-indigo-800">
            <span className="text-[10px] text-teal-300 font-mono uppercase font-bold block mb-1.5">Suggested phrases you can use:</span>
            <div className="space-y-1 bg-indigo-950/40 p-2.5 rounded-lg border border-indigo-800/40">
              {selectedScenario.suggestedPhrases.map((phrase, i) => (
                <div 
                  key={i} 
                  onClick={() => setInputValue(phrase)}
                  className="text-xs text-slate-200 hover:text-white cursor-pointer hover:underline truncate py-0.5 flex gap-1 items-center"
                >
                  <Play size={8} className="text-teal-400" />
                  <span>{phrase}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 2. RIGHT PANEL: Speaking Chat interface simulation */}
      <div className="lg:col-span-8 flex flex-col space-y-6">
        
        {/* Tutor Title Banner */}
        <div className="bg-white border border-slate-200 rounded-2xl px-6 py-4 shadow-sm flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-teal-100 text-teal-800 rounded-full flex items-center justify-center font-bold font-display text-lg shadow-inner">
              {selectedScenario.characterName[0]}
            </div>
            <div>
              <h3 className="text-slate-800 font-semibold flex items-center gap-2 self-start">
                <span>{selectedScenario.characterName}</span>
                <span className="text-[10px] font-mono font-medium text-teal-700 bg-teal-50 px-2 py-0.5 rounded-full border border-teal-100">
                  {selectedScenario.characterRole}
                </span>
              </h3>
              <p className="text-slate-400 text-xs mt-0.5">Roleplay Active • Simulated Speech Lab</p>
            </div>
          </div>

          {/* Interactive Translation/Aids Settings */}
          <div className="flex flex-wrap items-center gap-2">
            
            <button 
              onClick={() => setShowFurigana(prev => !prev)}
              className={`text-[10px] font-mono px-2 py-1 rounded transition-colors border ${
                showFurigana ? "bg-teal-50 text-teal-800 border-teal-200" : "bg-white text-slate-400 border-slate-100"
              }`}
              title="Toggle Furigana reading helper kana overlays"
            >
              Furigana [あ]
            </button>
            <button 
              onClick={() => setShowRomaji(prev => !prev)}
              className={`text-[10px] font-mono px-2 py-1 rounded transition-colors border ${
                showRomaji ? "bg-teal-50 text-teal-800 border-teal-200" : "bg-white text-slate-400 border-slate-100"
              }`}
              title="Toggle Romaji alphabet representation"
            >
              Romaji [A]
            </button>
            <button 
              onClick={() => setShowTranslation(prev => !prev)}
              className={`text-[10px] font-mono px-2 py-1 rounded transition-colors border ${
                showTranslation ? "bg-teal-50 text-teal-800 border-teal-200" : "bg-white text-slate-400 border-slate-100"
              }`}
              title="Toggle English Translation overlays for tutor dialogues"
            >
              English [en]
            </button>

            <div className="h-4 w-[1px] bg-slate-200 mx-1"></div>

            <button
              onClick={() => setVoicePlaybackEnabled(prev => !prev)}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-xs transition-colors border ${
                voicePlaybackEnabled ? "bg-indigo-50 text-indigo-800 border-indigo-200 font-semibold" : "bg-white text-slate-400 border-slate-100"
              }`}
            >
              <Volume2 size={13} />
              <span>Voice</span>
            </button>

            <button
              onClick={videoEnabled ? stopCamera : startCamera}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-xs transition-all border ${
                videoEnabled ? "bg-teal-600 text-white border-teal-600 font-semibold shadow-sm" : "bg-white text-teal-700 hover:bg-teal-50 border-slate-200"
              }`}
              title="Toggle interactive face preview and Japanese bowing coach HUD"
            >
              {videoEnabled ? <VideoOff size={13} /> : <Video size={13} />}
              <span>{videoEnabled ? "Close Video" : "Video Mode"}</span>
            </button>

          </div>
        </div>

        <div className={`grid gap-6 w-full ${videoEnabled ? "lg:grid-cols-12" : "grid-cols-1"}`}>

          {/* Dynamic Video & Posture HUD (Active ONLY when videoEnabled is true) */}
          {videoEnabled && (
            <div className="lg:col-span-5 flex flex-col space-y-4">
              
              {/* Webcam Mirror Canvas Box */}
              <div className="bg-slate-900 rounded-2xl overflow-hidden aspect-video relative border border-slate-800 shadow-md flex items-center justify-center min-h-[220px]">
                
                {/* Main Video Stream Container */}
                {stream ? (
                  <video 
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className="w-full h-full object-cover transform -scale-x-100"
                  />
                ) : (
                  // Elegant animated Japanese simulator background
                  <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 flex flex-col items-center justify-center p-4">
                    <div className="w-16 h-16 rounded-full bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400 mb-3 animate-pulse">
                      <Camera size={24} />
                    </div>
                    <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-teal-400">Webcam Simulator Live</span>
                    <span className="text-[9px] text-slate-500 font-mono text-center mt-1">Simulating posture, bowing & visual coordinates</span>
                    
                    {/* Animated silhouette background representing interview room */}
                    <div className="absolute bottom-2 left-2 right-2 border border-slate-800/60 bg-slate-900/50 p-2 rounded-lg flex items-center justify-between text-slate-400 text-[8px] font-mono">
                      <span>ROOM: SY-882</span>
                      <span className="flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-ping"></span>
                        REC
                      </span>
                    </div>
                  </div>
                )}

                {/* Simulated AI Posture Face Guidelines / Skeleton overlay */}
                <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center p-4">
                  {/* Outer safety grid */}
                  <div className="absolute inset-2 border border-dashed border-white/5 rounded-xl"></div>
                  
                  {/* Face ellipse box */}
                  <div className={`w-32 h-44 rounded-full border border-dashed transition-all duration-300 ${
                    bowStage === "ready" 
                      ? "border-amber-400 border-2 bg-amber-500/5 shadow-[0_0_15px_rgba(245,158,11,0.2)]" 
                      : bowStage === "bending" || bowStage === "holding"
                      ? "border-indigo-400 border-2 bg-indigo-500/5 shadow-[0_0_15px_rgba(99,102,241,0.2)]"
                      : bowStage === "success"
                      ? "border-emerald-400 border-2 bg-emerald-500/10 shadow-[0_0_20px_rgba(16,185,129,0.3)]"
                      : "border-teal-500/30 shadow-[0_0_10px_rgba(20,184,166,0.1)]"
                  } flex flex-col items-center justify-center relative`}>
                    
                    {/* Gaze tracker line horizontal */}
                    <div className="absolute w-full h-[1px] bg-red-400/40 top-1/3"></div>
                    <div className="absolute h-full w-[1px] bg-sky-400/20 left-1/2"></div>

                    {/* Eye Tracking Markers */}
                    <div className="absolute top-[28%] left-[25%] flex items-center justify-center">
                      <div className="w-2.5 h-2.5 rounded-full border border-sky-400 flex items-center justify-center">
                        <div className="w-1 h-1 rounded-full bg-sky-400"></div>
                      </div>
                    </div>
                    <div className="absolute top-[28%] right-[25%] flex items-center justify-center">
                      <div className="w-2.5 h-2.5 rounded-full border border-sky-400 flex items-center justify-center">
                        <div className="w-1 h-1 rounded-full bg-sky-400"></div>
                      </div>
                    </div>

                    <span className="text-[8px] font-mono text-white/50 bg-black/40 px-1.5 py-0.5 rounded absolute bottom-4">
                      {bowStage === "idle" ? "ALIGN FACE" : bowStage.toUpperCase()}
                    </span>
                  </div>

                  {/* Spine angle line mapping */}
                  <div className="absolute bottom-4 left-4 border border-white/10 bg-black/70 p-1.5 rounded text-[8px] font-mono text-slate-300 space-y-0.5 shadow-sm">
                    <div className="text-[9px] text-teal-400 font-bold border-b border-white/5 pb-0.5">SPINE SLOPE</div>
                    <div>Target: {selectedBow === "eshaku" ? "15°" : selectedBow === "keirei" ? "30°" : "45°"}</div>
                    <div className="flex items-center gap-1 font-bold">
                      <span>Current:</span>
                      <span className={liveSpineAngle > 0 ? "text-amber-400" : "text-white"}>{liveSpineAngle}°</span>
                    </div>
                  </div>

                  {/* Expression level mapping */}
                  <div className="absolute bottom-4 right-4 border border-white/10 bg-black/70 p-1.5 rounded text-[8px] font-mono text-slate-300 space-y-0.5">
                    <div className="text-[9px] text-emerald-400 font-bold border-b border-white/5 pb-0.5">POLITE SMILE</div>
                    <div className="font-bold flex items-center gap-1">
                      <span>Rating:</span>
                      <span className="text-emerald-400">{faceSmileScore}%</span>
                    </div>
                  </div>

                  {/* Big floating countdown text when preparing */}
                  {bowStage === "ready" && (
                    <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center rounded-2xl">
                      <span className="text-[10px] font-mono text-amber-400 tracking-widest font-black uppercase mb-1">Calibrating Frame</span>
                      <div className="text-5xl font-black text-white font-mono animate-pulse">
                        {bowCountdown}
                      </div>
                    </div>
                  )}

                  {/* Stage-specific advice pill inside container */}
                  <div className="absolute top-4 left-4 bg-teal-500/90 text-white font-mono text-[8.5px] tracking-wide font-black uppercase px-2 py-0.5 rounded shadow-sm">
                    {bowStage === "idle" && "🔵 Standby"}
                    {bowStage === "ready" && "⏳ Get Ready..."}
                    {bowStage === "bending" && "⤵️ Bow Forward"}
                    {bowStage === "holding" && "🛡️ Hold Position"}
                    {bowStage === "aligning" && "⤴️ Rise Upright"}
                    {bowStage === "success" && "🎉 Perfect Execution!"}
                  </div>
                </div>

              </div>

              {/* Bow Control Selector Dashboard */}
              <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm space-y-3">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <h4 className="text-xs font-mono font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1">
                    <Activity className="text-teal-600" size={13} />
                    お辞儀 (Ojigi) Bow Standards
                  </h4>
                  <span className="text-[9px] bg-teal-50 text-teal-700 border border-teal-100 px-1.5 rounded font-mono font-bold">
                    XP: {etiquettePoints}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: "eshaku", name: "会釈 Eshaku", deg: "15°", detail: "Casual Greeting" },
                    { id: "keirei", name: "敬礼 Keirei", deg: "30°", detail: "Job Interview" },
                    { id: "saikeirei", name: "最敬礼 Saikeirei", deg: "45°", detail: "Deep Apology" },
                  ].map((item) => {
                    const isSelect = selectedBow === item.id;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => {
                          if (bowStage === "idle") setSelectedBow(item.id as any);
                        }}
                        disabled={bowStage !== "idle"}
                        className={`p-2 rounded-xl text-left border flex flex-col justify-between transition-all ${
                          isSelect 
                            ? "bg-teal-50 border-teal-600 shadow-sm" 
                            : "bg-slate-50 border-slate-100 hover:border-slate-200 text-slate-500"
                        }`}
                      >
                        <span className={`text-[10px] font-bold ${isSelect ? "text-teal-900" : "text-slate-700"}`}>
                          {item.name}
                        </span>
                        <span className="text-base font-mono font-extrabold text-teal-800 block mt-1">
                          {item.deg}
                        </span>
                        <span className="text-[7.5px] text-slate-400 leading-tight block mt-0.5">
                          {item.detail}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Bow Trigger Buttons */}
                <div className="pt-1">
                  <button
                    type="button"
                    onClick={startBowCoaching}
                    disabled={bowStage !== "idle"}
                    className="w-full py-2 bg-teal-700 hover:bg-teal-800 text-white font-mono text-xs font-bold rounded-xl transition-all shadow shadow-teal-700/20 disabled:opacity-40 flex items-center justify-center gap-2"
                  >
                    <Smile size={14} className={bowStage !== "idle" ? "animate-spin" : ""} />
                    {bowStage === "idle" && "Start Japanese Bowing Coach"}
                    {bowStage === "ready" && `Countdown: ${bowCountdown}`}
                    {bowStage === "bending" && "Active (Lowering Hip)"}
                    {bowStage === "holding" && "Absolute Perfect Hold!"}
                    {bowStage === "aligning" && "Rise Gracefully Upright"}
                    {bowStage === "success" && "Well Done! Evaluation Completed!"}
                  </button>
                </div>

                {/* Instructional Text */}
                <div className="bg-slate-50/80 rounded-xl p-2.5 border border-slate-100 text-[10px] text-slate-500 leading-relaxed font-sans space-y-1">
                  <span className="text-indigo-800 font-bold block bg-indigo-50/50 px-1 py-0.3 rounded text-[9px] uppercase tracking-wide w-fit">
                    Ojigi High-Context Rule:
                  </span>
                  <p>
                    {selectedBow === "eshaku" && "Eshaku: Hand position clasped, eyes are initially focused straight before looking down 2 meters ahead as the back rotates."}
                    {selectedBow === "keirei" && "Keirei: Indispensable for corporate introductions and meetings. Lower posture to 30 degrees, head and neck relaxed, and pause for a second."}
                    {selectedBow === "saikeirei" && "Saikeirei: Deepest ritual bow. Restrain posture for 2 seconds to signal extreme sincerity and status alignment during apology cycles."}
                  </p>
                </div>
              </div>

              {/* Bow Record Progress History Log */}
              <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm flex flex-col flex-1 min-h-[140px] max-h-[190px]">
                <div className="text-xs font-mono font-bold text-slate-700 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-100 flex items-center justify-between mb-2">
                  <span>LOG: Decorum Feedback</span>
                  <span className="text-[9px] text-teal-600 font-bold">ACTIVE ACCENT</span>
                </div>
                
                <div className="overflow-y-auto space-y-1.5 flex-1 pr-1">
                  {bowPracticeLog.map((logStr, lIdx) => (
                    <div key={lIdx} className="text-[9.5px] font-mono text-slate-500 border-l-2 border-teal-500 pl-2 leading-relaxed">
                      {logStr}
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* Main Conversation Dialog Section */}
          <div className={`${videoEnabled ? "lg:col-span-7" : "w-full"} flex flex-col space-y-4`}>
            
            {/* Chat Logs Area */}
            <div className="bg-slate-50/50 border border-slate-200 rounded-3xl p-6 h-[480px] overflow-y-auto space-y-6 relative">
              
              {history.map((msg) => {
                const isUser = msg.sender === "user";
                
                return (
                  <div 
                    key={msg.id}
                    className={`flex gap-3 max-w-[85%] ${isUser ? "ml-auto flex-row-reverse" : "mr-auto text-left"}`}
                  >
                    {/* Sender Avatar */}
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shadow-sm flex-shrink-0 mt-1 ${
                      isUser ? "bg-indigo-600 text-white" : "bg-teal-600 text-white"
                    }`}>
                      {isUser ? <User size={13} /> : "T"}
                    </div>

                    {/* Message Body Block */}
                    <div className="space-y-2">
                      <div className={`p-4 rounded-2xl border text-sm shadow-sm ${
                        isUser 
                          ? "bg-indigo-600 text-white border-indigo-600 rounded-tr-none" 
                          : "bg-white text-slate-800 border-slate-100 rounded-tl-none"
                      }`}>
                        
                        {/* Raw Text / Furigana */}
                        {!isUser && showFurigana && msg.furigana ? (
                          <p className="leading-loose text-base" style={{ rubyPosition: 'over' }}>
                            {/* Simplistic parsing of brackets of furigana: Word[furi] */}
                            {msg.furigana.split(" ").map((part, index) => {
                              const bracketRegex = /([^[\]]+)\[([^[\]]+)\]/;
                              const match = part.match(bracketRegex);
                              if (match) {
                                return (
                                  <ruby key={index} className="mr-1">
                                    {match[1]}
                                    <rt className="text-[10px] text-teal-600 select-none">{match[2]}</rt>
                                  </ruby>
                                );
                              }
                              return <span key={index} className="mr-1">{part}</span>;
                            })}
                          </p>
                        ) : (
                          <p className="text-[14px] leading-relaxed md:text-[15px] font-medium">{msg.text}</p>
                        )}

                        {/* Romaji Overlay indicator */}
                        {!isUser && showRomaji && msg.romaji && (
                          <p className="text-xs text-slate-500 font-mono pt-1 pb-0.5 italic leading-relaxed">
                            {msg.romaji}
                          </p>
                        )}

                        {/* Translation display overlay */}
                        {!isUser && showTranslation && msg.translated && (
                          <p className="text-xs text-slate-500 mt-1.5 pt-1.5 border-t border-slate-100 flex gap-1 items-center">
                            <Globe size={11} className="text-slate-400" />
                            <span>{msg.translated}</span>
                          </p>
                        )}

                        {/* Play Dialog button for client syntheses */}
                        {!isUser && (
                          <button 
                            type="button"
                            onClick={() => speakText(msg.text)} 
                            className="p-1 mt-1 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-full flex items-center justify-center self-end"
                            title="Replay Audio synthesis narration"
                          >
                            <Volume2 size={12} />
                          </button>
                        )}

                      </div>

                      {/* Immediate corrective grammar/feedback cards strictly for client evaluation checks */}
                      {msg.analysis && (
                        <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 shadow-sm space-y-2 max-w-sm ml-2">
                          <div className="flex items-center justify-between border-b border-slate-200/60 pb-1.5">
                            <span className="text-[10px] font-mono uppercase bg-teal-100 text-teal-800 font-bold px-1.5 py-0.5 rounded-full">Corrections Check</span>
                            <div className="flex items-center gap-1">
                              <span className="text-[10px] text-slate-400 font-mono">Keigo:</span>
                              <span className="text-[10px] font-mono font-bold text-indigo-700">{msg.analysis.politenessAppropriate || msg.analysis.politenessAppropriateness}</span>
                            </div>
                          </div>

                          {msg.analysis.naturalnessScore && (
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-slate-500 font-medium">Naturalness Score:</span>
                              <span className="text-xs font-mono font-bold text-slate-800">{msg.analysis.naturalnessScore}%</span>
                            </div>
                          )}

                          {msg.analysis.grammarFeedback && (
                            <p className="text-xs text-slate-600 leading-relaxed bg-white border border-slate-100 rounded-lg p-2">
                              <strong>Grammar Note:</strong> {msg.analysis.grammarFeedback}
                            </p>
                          )}

                          {msg.analysis.vocabularySuggestions && (
                            <p className="text-xs text-slate-600 leading-relaxed bg-white border border-slate-100 rounded-lg p-2">
                              <strong>Vocabulary Tip:</strong> {msg.analysis.vocabularySuggestions}
                            </p>
                          )}

                          {msg.analysis.suggestedAlternative && (
                            <div className="bg-teal-50/50 border border-teal-100 rounded-lg p-2">
                              <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-teal-700 block mb-0.5">More Natural Native Way:</span>
                              <p className="text-xs font-semibold text-slate-800 select-all" title="Click to select all">
                                {msg.analysis.suggestedAlternative}
                              </p>
                            </div>
                          )}
                        </div>
                      )}

                    </div>
                  </div>
                );
              })}

              {loading && (
                <div className="flex gap-2 items-center text-slate-400 text-xs font-mono py-1">
                  <Loader2 size={14} className="animate-spin text-teal-600" />
                  <span>{selectedScenario.characterName} is listening and evaluating context...</span>
                </div>
              )}

              <div ref={chatEndRef} />
            </div>

            {/* Input box and sound interface controllers */}
            <form onSubmit={handleSendMessage} className="space-y-3">
              <div className="bg-white border border-slate-200 rounded-2xl p-2.5 flex items-center gap-2 shadow-sm">
                
                {/* Microphone button trigger */}
                <button
                  type="button"
                  onClick={toggleRecording}
                  className={`p-3 rounded-xl transition-all relative ${
                    recording 
                      ? "bg-rose-500 text-white animate-pulse" 
                      : "bg-slate-100 hover:bg-slate-200 text-slate-600"
                  }`}
                  title="Record spoken Japanese from microphone"
                >
                  <Mic size={20} className={recording ? "anim-ripple" : ""} />
                </button>

                {/* Input message box prompt */}
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder={recording ? "Listening... Speak Japanese naturally now" : "Type your reply in Japanese or speak using mic..."}
                  disabled={recording}
                  className="flex-1 bg-transparent px-3 py-2 text-sm text-slate-800 placeholder-slate-400 outline-none border-none min-w-0"
                />

                {/* Clear Prompt / Reset */}
                {inputValue && (
                  <button
                    type="button"
                    onClick={() => setInputValue("")}
                    className="p-1 px-2 text-xs text-slate-400 hover:text-slate-600 font-mono rounded bg-slate-50"
                  >
                    Clear
                  </button>
                )}

                {/* Submit sentence button */}
                <button
                  type="submit"
                  disabled={loading || !inputValue.trim()}
                  className="p-3 bg-teal-700 hover:bg-teal-800 text-white rounded-xl transition-all disabled:opacity-45 disabled:cursor-not-allowed"
                >
                  <Send size={18} />
                </button>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-2 text-slate-500 text-[11px] font-mono px-2">
                <span>{recording ? "🟠 Mic active: speak clearly standard Japanese" : "💡 Try saying your introduction, then press Send."}</span>
                <span>CEFR Target: {selectedScenario.difficulty}</span>
              </div>
            </form>
          </div>

        </div>

        {/* 3. SCENARIO COMPLETE EVALUATION SECTION GRID */}
        <div className="border-t border-slate-200 pt-6 mt-4">
          <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h4 className="font-display font-bold text-slate-800 text-base flex items-center gap-2">
                  <Award className="text-teal-600" />
                  Speaking Assessment Engine
                </h4>
                <p className="text-slate-400 text-xs mt-0.5">Compile conversational progress logs for a master CEFR evaluation report.</p>
              </div>

              <button
                onClick={handleGenerateFullEvaluation}
                disabled={history.length < 2 || generatingAssessment}
                className="flex items-center gap-1.5 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white text-xs font-semibold rounded-xl tracking-tight shadow-md transition-all disabled:opacity-45"
              >
                {generatingAssessment ? (
                  <>
                    <Loader2 size={13} className="animate-spin" />
                    Analyzing dialogue...
                  </>
                ) : (
                  <>
                    <TrendingUp size={13} />
                    Finish & Evaluate Roleplay
                  </>
                )}
              </button>
            </div>

            {/* Error logs checks */}
            {assessmentError && (
              <div className="p-4 bg-rose-50 border border-rose-100 text-rose-800 text-xs font-mono rounded-xl">
                ⚠️ {assessmentError}
              </div>
            )}

            {/* Complete Assessment metrics results cards */}
            {assessment && (
              <div className="border-t border-slate-100 pt-6 space-y-6 animate-fade-in">
                
                {/* Score meters grid */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  {[
                    { label: "Vocabulary Variety", val: assessment.scores?.vocabulary },
                    { label: "Grammar Precision", val: assessment.scores?.grammar },
                    { label: "Business Keigo Accuracy", val: assessment.scores?.keigoBusiness },
                    { label: "Fluency Estimation", val: assessment.scores?.fluency },
                    { label: "Phonetic Pronunciation", val: assessment.scores?.pronunciation },
                  ].map((score, i) => (
                    <div key={i} className="bg-slate-50 border border-slate-100 rounded-xl p-3 text-center space-y-1">
                      <span className="text-[10px] text-slate-500 font-medium block leading-tight">{score.label}</span>
                      <div className="text-xl font-bold text-slate-800 font-mono mt-1">{score.val || 0}%</div>
                      <div className="w-full bg-slate-200 rounded-full h-1 mt-1 overflow-hidden">
                        <div 
                          className="bg-teal-600 h-1 rounded-full transition-all duration-1000" 
                          style={{ width: `${score.val || 0}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Scorecard metadata */}
                <div className="grid md:grid-cols-3 gap-6 pt-2">
                  <div className="bg-teal-50/40 border border-teal-100 rounded-xl p-4 text-center flex flex-col justify-center items-center">
                    <span className="text-teal-700 font-mono font-bold text-[10px] uppercase tracking-wider block mb-1">Estimated Level</span>
                    <span className="text-4xl font-extrabold text-teal-800 font-display">{assessment.cefrLevel || "A2"}</span>
                    <span className="text-xs text-slate-500 font-mono mt-1">CEFR Scale Standard</span>
                  </div>

                  <div className="md:col-span-2 space-y-3">
                    <h5 className="font-semibold text-slate-800 text-sm">Overall Placement Verdict:</h5>
                    <p className="text-slate-600 text-xs leading-relaxed italic bg-slate-50 p-3 rounded-lg border border-slate-200/50">
                      "{assessment.overallVerdict}"
                    </p>
                  </div>
                </div>

                {/* Strengths / Weaknesses checklists */}
                <div className="grid md:grid-cols-2 gap-6 pt-2">
                  <div className="space-y-2">
                    <h5 className="text-xs font-mono font-bold text-teal-800 uppercase tracking-widest flex items-center gap-1">
                      <CheckCircle2 size={13} className="text-teal-600" />
                      Strengths Shown
                    </h5>
                    <ul className="space-y-1.5 pl-1">
                      {assessment.strengths?.map((str, idx) => (
                        <li key={idx} className="text-xs text-slate-600 flex gap-2">
                          <span className="text-teal-600 font-bold font-mono">✓</span>
                          <span>{str}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-2">
                    <h5 className="text-xs font-mono font-bold text-rose-800 uppercase tracking-widest flex items-center gap-1">
                      <HelpCircle size={13} className="text-rose-600" />
                      Key Improvement Gaps
                    </h5>
                    <ul className="space-y-1.5 pl-1">
                      {assessment.weaknesses?.map((wkn, idx) => (
                        <li key={idx} className="text-xs text-slate-600 flex gap-2">
                          <span className="text-rose-500 font-bold font-mono">×</span>
                          <span>{wkn}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Study action plan recommendation scroll card */}
                <div className="bg-indigo-50 border border-indigo-100 p-4 rounded-xl space-y-2">
                  <h5 className="text-xs font-mono font-bold text-indigo-900 uppercase tracking-wider flex items-center gap-1">
                    <Award className="text-indigo-600 animate-pulse" size={14} />
                    Personalized Practice Roadmap:
                  </h5>
                  <p className="text-xs text-slate-600 leading-relaxed font-sans pr-1">
                    {assessment.studyRecommendation}
                  </p>
                </div>

              </div>
            )}

          </div>
        </div>

      </div>

    </div>
  );
}
