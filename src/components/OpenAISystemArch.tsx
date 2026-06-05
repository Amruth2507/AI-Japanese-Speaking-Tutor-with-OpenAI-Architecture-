import React, { useState, useMemo } from "react";
import { 
  Cpu, 
  Database, 
  FileCode2, 
  HelpCircle,
  TrendingUp, 
  CloudLightning, 
  DollarSign, 
  Activity, 
  Server, 
  Network, 
  Users, 
  Volume2, 
  CheckCircle, 
  Code2, 
  Minimize2, 
  Maximize2,
  LineChart,
  Zap,
  Layers,
  Sparkles,
  BarChart3,
  BookOpen
} from "lucide-react";

// Types represent interactive elements
interface APISchema {
  method: "POST" | "GET" | "PATCH";
  endpoint: string;
  description: string;
  headers: Record<string, string>;
  requestBody?: string;
  responseBody?: string;
}

const SYSTEM_APIS: APISchema[] = [
  {
    method: "POST",
    endpoint: "/api/v1/voice/session/initiate",
    description: "Establishes a low-latency WebRTC gateway session for real-time binary audio stream connection.",
    headers: {
      "Authorization": "Bearer <JWT_USER_TOKEN>",
      "Content-Type": "application/json"
    },
    requestBody: `{
  "scenario_id": "scen-meet-04",
  "client_offer_sdp": "v=0\\no=- 133748281 2 IN IP4 127.0.0.1...",
  "audio_codec": "OPUS",
  "requested_voice": "alloy"
}`,
    responseBody: `{
  "session_id": "session_voice_776182a",
  "server_answer_sdp": "v=0\\no=- 99872134 2 IN IP4 10.0.4.1...",
  "ice_servers": [
    { "urls": "turn:turn.production.opensensei.ai:3478" }
  ],
  "ws_alternative_url": "wss://realtime.opensensei.ai/v1/audio/stream"
}`
  },
  {
    method: "POST",
    endpoint: "/api/v1/evaluation/critique",
    description: "Analyzes finished spoken audio files asynchronously, generating detailed phoneme-level pronunciation and fluency metrics.",
    headers: {
      "Authorization": "Bearer <JWT_USER_TOKEN>",
      "Content-Type": "application/json"
    },
    requestBody: `{
  "session_id": "session_voice_776182a",
  "audio_storage_url": "https://s3.us-west-2.amazonaws.com/raw-samples/us-12/user-7.wav",
  "reference_text": "今日はよろしくお願いします（Kyou wa yoroshiku onegai shimasu）"
}`,
    responseBody: `{
  "evaluation_id": "eval_8830172bf",
  "overall_pronunciation_score": 87.5,
  "overall_fluency_score": 92.0,
  "phoneme_breakdowns": [
    { "phoneme": "ky", "score": 98.0, "status": "perfect" },
    { "phoneme": "ou", "score": 72.0, "status": "slightly_shortened", "remedy": "Vowel elongation drop detected." }
  ],
  "detected_silence_pauses_ms": 320,
  "speech_to_text_transcript": "今日はよろしくおねがいします"
}`
  },
  {
    method: "GET",
    endpoint: "/api/v1/analytics/cohort-metrics",
    description: "Pumps historical reporting aggregated values to display progress trends onto the front-end dashboard.",
    headers: {
      "Authorization": "Bearer <JWT_USER_TOKEN>"
    },
    responseBody: `{
  "user_id": "usr_99831",
  "total_minutes_spoken": 480.5,
  "scenarios_completed": 14,
  "cohort_percentile": 82.5,
  "averages": {
    "pronunciation": 79.4,
    "grammar": 83.2,
    "vocabulary": 71.0,
    "business_honorifics": 64.8
  },
  "progress_trend_weekly": [
    { "week": "W20", "pronunciation": 71.2, "fluency": 74.0 },
    { "week": "W21", "pronunciation": 76.5, "fluency": 78.2 }
  ]
}`
  }
];

export default function OpenAISystemArch() {
  const [selectedApiIndex, setSelectedApiIndex] = useState<number>(0);
  
  // Interactive Simulator States
  const [activeUsers, setActiveUsers] = useState<number>(100000);
  const [dailyMinutesPerUser, setDailyMinutesPerUser] = useState<number>(10);
  const [selectedModel, setSelectedModel] = useState<"gpt-4o" | "gpt-4o-mini">("gpt-4o");
  const [useVoiceRealtimeAPI, setUseVoiceRealtimeAPI] = useState<boolean>(true);

  // Compute Cost Estimations Live
  const costCalculations = useMemo(() => {
    const monthlyActiveUsers = activeUsers;
    const dailyMinutes = dailyMinutesPerUser;
    
    // Total monthly conversation minutes: 
    // Assumed 20 active learning days per month for typical user cohort
    const activeDays = 20;
    const totalMonthlyMinutes = monthlyActiveUsers * dailyMinutes * activeDays;

    // 1. Audio Streaming Storage and CDN
    // WAV/WebM audio size: approx 15MB per 10 mins = 1.5MB per minute.
    const rawAudioGigabytes = (totalMonthlyMinutes * 1.5) / 1024;
    const storageCost = rawAudioGigabytes * 0.023; // AWS S3 standard tier is $0.023 per GB

    // 2. Speech-to-Text cost (Whisper API is $0.006 per minute)
    const sttCost = totalMonthlyMinutes * 0.006;

    // 3. LLM Tokens cost calculation
    // Assume average 1 minute yields 15 conversational utterances.
    // Each utterance + prompt + history context: 
    // Inside a session, avg prompt size is 1500 tokens (due to target system boundaries), response is 150 tokens.
    // Monthly total sequences = totalMonthlyMinutes * 15 exchanges
    const exchangesPerMinute = 2.5; 
    const totalExchanges = totalMonthlyMinutes * exchangesPerMinute;
    
    // Rates per 1M tokens
    const promptTokenCost = selectedModel === "gpt-4o" ? 2.50 : 0.15;
    const outputTokenCost = selectedModel === "gpt-4o" ? 10.00 : 0.60;
    
    const avgInputTokensPerExchange = 1200;
    const avgOutputTokensPerExchange = 180;

    const totalInputTokensMill = (totalExchanges * avgInputTokensPerExchange) / 1000000;
    const totalOutputTokensMill = (totalExchanges * avgOutputTokensPerExchange) / 1000000;

    const llmCost = (totalInputTokensMill * promptTokenCost) + (totalOutputTokensMill * outputTokenCost);

    // 4. Text-To-Speech cost
    // Assumes OpenAI TTS HD/Standard rates: $15.00 per million characters.
    // Average response length: 80 characters.
    const averageCharsPerExchange = 80;
    const totalTTSCharsMill = (totalExchanges * averageCharsPerExchange) / 1000000;
    const ttsCost = totalTTSCharsMill * 15.00;

    // 5. Server compute (Node, WebSockets, Python evaluation gateways)
    // Running container clusters at average 65% capacity scaling.
    const scaleFactorContainers = Math.ceil(monthlyActiveUsers / 5000); 
    const computeCost = scaleFactorContainers * 45; // Cost of custom AWS/Cloud Run container sizes per month

    // Adjust for Realtime Voice API instead of REST Pipeline
    // OpenAI Realtime Audio API standard pricing is $0.06/min input, $0.24/min output ($100 per 1M tokens)
    // If enabled, overwrite traditional pipeline (STT + Text LLM + TTS) with Realtime API model pricing.
    let adjustedVoiceAPICost = 0;
    let finalPipelineCost = 0;

    if (useVoiceRealtimeAPI && selectedModel === "gpt-4o") {
      // Realtime Audio API input cost: $0.10 per min, output cost: $0.20 per min
      const realtimeInputRatePerMin = 0.055;
      const realtimeOutputRatePerMin = 0.18;
      adjustedVoiceAPICost = totalMonthlyMinutes * (realtimeInputRatePerMin + realtimeOutputRatePerMin);
      finalPipelineCost = adjustedVoiceAPICost + storageCost + computeCost;
    } else {
      finalPipelineCost = sttCost + llmCost + ttsCost + storageCost + computeCost;
    }

    const estimatedTotalMonthly = finalPipelineCost;
    const estimatedCostPerUser = estimatedTotalMonthly / monthlyActiveUsers;

    return {
      totalMonthlyMinutes,
      storageCost: Math.round(storageCost * 100) / 100,
      sttCost: Math.round(sttCost * 100) / 100,
      llmCost: Math.round(llmCost * 100) / 100,
      ttsCost: Math.round(ttsCost * 100) / 100,
      computeCost: Math.round(computeCost * 100) / 100,
      realtimeAPICost: Math.round(adjustedVoiceAPICost * 100) / 100,
      totalCost: Math.round(estimatedTotalMonthly * 100) / 100,
      costPerUserDigits: estimatedCostPerUser.toFixed(3)
    };
  }, [activeUsers, dailyMinutesPerUser, selectedModel, useVoiceRealtimeAPI]);

  return (
    <div className="bg-slate-900 border-t border-slate-800 text-white min-h-screen py-10 px-4 md:px-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* OpenAI Architect Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-800 pb-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 select-none pointer-events-none opacity-5 font-mono text-9xl font-bold tracking-widest text-emerald-500">
            OPENAI
          </div>
          <div className="space-y-2 relative z-10">
            <div className="flex items-center gap-2">
              <span className="bg-teal-500/10 text-teal-400 font-mono text-[10px] uppercase font-extrabold tracking-widest px-3 py-1 rounded-full border border-teal-500/20 shadow-sm animate-pulse">
                Whitepaper & Architecture Blueprint
              </span>
              <span className="bg-indigo-500/15 text-indigo-300 font-mono text-[10px] font-bold px-2 py-1 rounded inline-block border border-indigo-500/20">
                Staff Engineer Grade
              </span>
            </div>
            <h1 className="text-3xl md:text-5xl font-display font-medium text-white tracking-tight">
              Enterprise Speaking Tutor Architecture
            </h1>
            <p className="text-slate-400 text-xs md:text-sm font-light leading-relaxed max-w-3xl">
              System specification designed for hosting <strong>100,000 active candidates</strong>. Orchestrating sub-100ms real-time audio streams, automated pitch evaluation rubrics, high-performance database tables, and highly integrated vector recall contexts.
            </p>
          </div>
          <div className="flex-shrink-0 bg-slate-950 p-4 border border-slate-800 rounded-2xl flex items-center gap-3 shadow-inner">
            <Cpu className="text-teal-400 animate-spin" size={24} />
            <div className="text-left">
              <span className="text-[10px] font-mono text-slate-500 block">SYSTEM STATUS:</span>
              <span className="text-xs font-mono font-bold text-teal-400 block flex items-center gap-1">
                ● COMPILED REDY
              </span>
            </div>
          </div>
        </div>

        {/* HIGH-FIDELITY ARCHITECTURE VISUALIZATION BLOCK */}
        <div className="bg-slate-950 rounded-3xl border border-slate-800 p-6 md:p-8 space-y-6 relative">
          <div className="absolute top-4 right-4 text-[10px] uppercase font-mono tracking-widest text-[#cf5817]">
            System Design Pipeline Flow Map
          </div>
          <div>
            <h2 className="text-lg md:text-xl font-display font-bold text-white flex items-center gap-2">
              <Layers className="text-[#cf5817]" size={18} />
              Audio Processing & Conversational Engine Topology
            </h2>
            <p className="text-slate-400 text-xs mt-1">
              Data flow representing high-volume WebSocket gateway routing, real-time diagnostic evaluation, and streaming response outputs.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6 pt-4">
            
            {/* Step 1 */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 md:p-5 space-y-3 relative">
              <div className="flex items-center justify-between">
                <span className="h-6 w-6 rounded-full bg-teal-500/10 text-teal-400 font-mono text-xs font-bold flex items-center justify-center">1</span>
                <span className="text-[9px] font-mono text-slate-500 font-bold uppercase">Client Node</span>
              </div>
              <h3 className="text-sm font-semibold text-teal-300">Fast Audio Capture</h3>
              <p className="text-slate-400 text-[11px] leading-relaxed font-light">
                MediaCapture & Web Audio APIs record ambient speech in compressed Opus/WebM wrappers. Realtime chunks are funneled through low-latency full-duplex WebSockets.
              </p>
              <div className="pt-2 text-[9px] font-mono text-slate-500 border-t border-slate-800/60">
                Latency target: &lt;15ms buffer
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 md:p-5 space-y-3 relative">
              <div className="flex items-center justify-between">
                <span className="h-6 w-6 rounded-full bg-amber-500/10 text-amber-400 font-mono text-xs font-bold flex items-center justify-center">2</span>
                <span className="text-[9px] font-mono text-slate-500 font-bold uppercase">WebRTC/WS Gateway</span>
              </div>
              <h3 className="text-sm font-semibold text-amber-300">Live Transcription & STT</h3>
              <p className="text-slate-400 text-[11px] leading-relaxed font-light">
                AWS Route 53 routes packets to closest regional WebSocket gateways. Audio buffers feed into parallel <strong>Whisper API</strong> nodes, generating text transcript matches.
              </p>
              <div className="pt-2 text-[9px] font-mono text-slate-500 border-t border-slate-800/60">
                Fallback: OpenAI Realtime Engine
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 md:p-5 space-y-3 relative">
              <div className="flex items-center justify-between">
                <span className="h-6 w-6 rounded-full bg-rose-500/10 text-rose-400 font-mono text-xs font-bold flex items-center justify-center">3</span>
                <span className="text-[9px] font-mono text-slate-500 font-bold uppercase">LLM & Tutor Agent</span>
              </div>
              <h3 className="text-sm font-semibold text-rose-300">Cognitive Prompt & Grammar</h3>
              <p className="text-slate-400 text-[11px] leading-relaxed font-light">
                GPT-4o computes grammatical, vocabulary precision and polite register alignment. Prompts inject custom system boundaries to formulate the responsive tutor agent personality.
              </p>
              <div className="pt-2 text-[9px] font-mono text-slate-500 border-t border-slate-800/60">
                Token recall: Pinecone DB (1.5k d)
              </div>
            </div>

            {/* Step 4 */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 md:p-5 space-y-3 relative">
              <div className="flex items-center justify-between">
                <span className="h-6 w-6 rounded-full bg-indigo-500/10 text-indigo-400 font-mono text-xs font-bold flex items-center justify-center">4</span>
                <span className="text-[9px] font-mono text-slate-500 font-bold uppercase">Feedback Analyzer</span>
              </div>
              <h3 className="text-sm font-semibold text-indigo-300">Acoustic & TTS Output</h3>
              <p className="text-slate-400 text-[11px] leading-relaxed font-light">
                TTS converts characters back to fluid native voices (usingalloy/shimmer model). Simultaneously, acoustic speech aligns with reference envelopes for pronunciation scores.
              </p>
              <div className="pt-2 text-[9px] font-mono text-slate-500 border-t border-slate-800/60">
                Clinics returned: 10-Point Rubric
              </div>
            </div>

          </div>

          {/* Connective Line visualizer */}
          <div className="hidden md:flex justify-between items-center text-slate-500 text-xs font-mono px-12 pt-3 border-t border-slate-900">
            <span>[Audio Stream Ingress]</span>
            <span className="text-[10px] animate-pulse">────────── WebSocket Gateway Pipeline ──────────▶</span>
            <span>[Diagnostic JSON Egress]</span>
          </div>

        </div>

        {/* INTERACTIVE COMPREHENSIVE PLATFORM ESTIMATOR CALCULATOR */}
        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Slider Controllers Panel */}
          <div className="bg-slate-950 rounded-2xl border border-slate-800 p-6 space-y-6">
            <div className="space-y-1">
              <h3 className="text-base font-bold text-white flex items-center gap-1.5">
                <CloudLightning className="text-emerald-500" size={16} />
                Cost Model Parameters
              </h3>
              <p className="text-slate-400 text-xs">
                As an OpenAI consultant, test different scaling thresholds to analyze financial outputs.
              </p>
            </div>

            <div className="space-y-4 pt-2">
              
              {/* Active Users Slider */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-slate-400">Monthly Active Users (MAU):</span>
                  <span className="text-emerald-400 font-bold">{activeUsers.toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  min="5000"
                  max="500000"
                  step="5000"
                  value={activeUsers}
                  onChange={(e) => setActiveUsers(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-800 accent-emerald-500 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-[8px] text-slate-500 font-mono">
                  <span>5K</span>
                  <span>100K Users (Base)</span>
                  <span>500K</span>
                </div>
              </div>

              {/* Daily minutes slider */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-slate-400">Avg Practicing Mins Daily:</span>
                  <span className="text-emerald-400 font-bold">{dailyMinutesPerUser} minutes</span>
                </div>
                <input
                  type="range"
                  min="2"
                  max="60"
                  step="1"
                  value={dailyMinutesPerUser}
                  onChange={(e) => setDailyMinutesPerUser(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-800 accent-emerald-500 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-[8px] text-slate-500 font-mono">
                  <span>2m</span>
                  <span>10m (Avg session)</span>
                  <span>60m</span>
                </div>
              </div>

              {/* Model Choice Selector */}
              <div className="space-y-2">
                <label className="text-xs font-mono text-slate-400 block">LLM Processing Core Model:</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setSelectedModel("gpt-4o")}
                    className={`p-2.5 rounded-lg border text-xs font-mono font-bold transition-all ${
                      selectedModel === "gpt-4o"
                        ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/45"
                        : "bg-slate-900 text-slate-400 border-slate-800 hover:bg-slate-900/80"
                    }`}
                  >
                    GPT-4o (State-of-art)
                  </button>
                  <button
                    onClick={() => setSelectedModel("gpt-4o-mini")}
                    className={`p-2.5 rounded-lg border text-xs font-mono font-bold transition-all ${
                      selectedModel === "gpt-4o-mini"
                        ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/45"
                        : "bg-slate-900 text-slate-400 border-slate-800 hover:bg-slate-900/80"
                    }`}
                  >
                    GPT-4o-Mini (Optimized)
                  </button>
                </div>
              </div>

              {/* Realtime API toggle */}
              <div className="pt-2 border-t border-slate-900">
                <label className="flex items-center gap-2.5 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={useVoiceRealtimeAPI}
                    onChange={(e) => setUseVoiceRealtimeAPI(e.target.checked)}
                    className="rounded bg-slate-800 border-slate-600 text-emerald-500 focus:ring-emerald-500/20 h-4 w-4"
                  />
                  <div className="text-left">
                    <span className="text-xs font-bold text-white block">Optimize with OpenAI Realtime API</span>
                    <span className="text-[9px] text-slate-400 block">Direct audio-to-audio streaming channel</span>
                  </div>
                </label>
              </div>

            </div>
          </div>

          {/* Interactive Cost Estimation Dashboard Display */}
          <div className="lg:col-span-2 bg-slate-950 rounded-2xl border border-slate-800 p-6 space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-white flex items-center gap-1.5">
                  <DollarSign className="text-emerald-500" size={16} />
                  Live Operational SLA & Billing Projections
                </h3>
                <span className="text-[9px] text-indigo-400 font-mono font-bold uppercase animate-pulse">calculating realtime</span>
              </div>

              {/* Total Summary Cost KPI banner */}
              <div className="bg-slate-900/40 rounded-xl p-5 border border-slate-800/80 grid md:grid-cols-3 gap-4 text-center">
                <div className="space-y-1 md:border-r border-slate-800/60 pb-3 md:pb-0">
                  <span className="text-[9px] font-mono text-slate-500 uppercase block">Est. Monthly Total:</span>
                  <span className="text-xl md:text-2xl font-mono font-extrabold text-white block tracking-tight">
                    ${costCalculations.totalCost.toLocaleString()}
                  </span>
                </div>
                <div className="space-y-1 md:border-r border-slate-800/60 pb-3 md:pb-0">
                  <span className="text-[9px] font-mono text-slate-500 uppercase block">Monthly Cost Per Active User:</span>
                  <span className="text-xl md:text-2xl font-mono font-extrabold text-emerald-400 block tracking-tight">
                    ${costCalculations.costPerUserDigits}
                  </span>
                </div>
                <div className="space-y-1">
                  <span className="text-[9px] font-mono text-slate-500 uppercase block">Total Monthly Minutes Run:</span>
                  <span className="text-xl md:text-2xl font-mono font-extrabold text-indigo-300 block tracking-tight">
                    {costCalculations.totalMonthlyMinutes.toLocaleString()} min
                  </span>
                </div>
              </div>

              {/* Itemized Line Items Costs */}
              <div className="space-y-2.5 pt-1">
                <h4 className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">Itemized monthly Cloud Bills:</h4>
                <div className="divide-y divide-slate-900 border border-slate-900 rounded-xl overflow-hidden text-xs">
                  
                  {/* Row stt/Audio api */}
                  <div className="flex items-center justify-between p-3 bg-slate-900/20 hover:bg-slate-900/40 transition-colors">
                    <div className="space-y-0.5">
                      <span className="text-white font-medium block">
                        {useVoiceRealtimeAPI && selectedModel === "gpt-4o" ? "OpenAI Realtime Voice Pipeline Engine" : "Speech-to-Text Transcription"}
                      </span>
                      <span className="text-[9px] text-slate-500 block">
                        {useVoiceRealtimeAPI && selectedModel === "gpt-4o" 
                          ? "Combined $0.055/min input audio + $0.18/min outputs" 
                          : "Whisper model engine ($0.006 per minute)"}
                      </span>
                    </div>
                    <span className="font-mono text-slate-300">
                      ${useVoiceRealtimeAPI && selectedModel === "gpt-4o" ? costCalculations.realtimeAPICost.toLocaleString() : costCalculations.sttCost.toLocaleString()}
                    </span>
                  </div>

                  {/* Row LLM */}
                  {!useVoiceRealtimeAPI || selectedModel !== "gpt-4o" ? (
                    <div className="flex items-center justify-between p-3 bg-slate-900/20 hover:bg-slate-900/40 transition-colors">
                      <div className="space-y-0.5">
                        <span className="text-white font-medium block">LLM Reasoning Router ({selectedModel})</span>
                        <span className="text-[9px] text-slate-500 block">
                          Input prompt context ({selectedModel === "gpt-4o" ? "$2.50/1M" : "$0.15/1M"}) and response tokens
                        </span>
                      </div>
                      <span className="font-mono text-slate-300">${costCalculations.llmCost.toLocaleString()}</span>
                    </div>
                  ) : null}

                  {/* Row tts */}
                  {!useVoiceRealtimeAPI || selectedModel !== "gpt-4o" ? (
                    <div className="flex items-center justify-between p-3 bg-slate-900/20 hover:bg-slate-900/40 transition-colors">
                      <div className="space-y-0.5">
                        <span className="text-white font-medium block">OpenAI TTS synthesized Audio Generation</span>
                        <span className="text-[9px] text-slate-500 block">HD model rate mapping character counts ($15.00/1M chars)</span>
                      </div>
                      <span className="font-mono text-slate-300">${costCalculations.ttsCost.toLocaleString()}</span>
                    </div>
                  ) : null}

                  {/* Row storage and CDN */}
                  <div className="flex items-center justify-between p-3 bg-slate-900/20 hover:bg-slate-900/40 transition-colors">
                    <div className="space-y-0.5">
                      <span className="text-white font-medium block">Raw Audio Capture Cloud Storage</span>
                      <span className="text-[9px] text-slate-500 block">AWS S3 lifecycle archiving bucket pricing ($0.023 per GB)</span>
                    </div>
                    <span className="font-mono text-slate-300">${costCalculations.storageCost.toLocaleString()}</span>
                  </div>

                  {/* Server container scaling */}
                  <div className="flex items-center justify-between p-3 bg-slate-900/20 hover:bg-slate-900/40 transition-colors">
                    <div className="space-y-0.5">
                      <span className="text-white font-medium block">Microservice Orchestration Compute</span>
                      <span className="text-[9px] text-slate-500 block">Scaled regional load-balanced VM units running Kubernetes websockets</span>
                    </div>
                    <span className="font-mono text-slate-300">${costCalculations.computeCost}</span>
                  </div>

                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-900 text-[10.5px] text-slate-500 leading-relaxed font-light">
              *Pro tip from OpenAI team: Utilizing the <strong>GPT-4o-Mini</strong> token routes lowers monthly B2C subscription overhead significantly, making it ideal for standard student cohorts, while <strong>GPT-4o Realtime Engine</strong> is recommended for premium business practitioners seeking sub-200ms latency.
            </div>
          </div>

        </div>

        {/* ENTERPRISE SCALING DESIGN PATH & TECH STACK SELECTOR */}
        <div className="grid md:grid-cols-2 gap-8">
          
          {/* Tech Stack Matrix Board */}
          <div className="bg-slate-950 rounded-2xl border border-slate-800 p-6 space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-1.5">
              <Zap className="text-[#cf5817]" size={16} />
              OpenAI Sanctioned Enterprise Tech Stack
            </h3>
            
            <div className="space-y-3.5">
              
              <div className="flex gap-3 items-start border-b border-slate-900 pb-3">
                <div className="bg-teal-500/10 text-teal-400 p-2 rounded-lg font-mono text-xs font-bold w-12 text-center h-8 flex items-center justify-center">STST</div>
                <div className="space-y-0.5">
                  <span className="text-xs font-bold text-white block">React Vite + MediaRecorder API</span>
                  <p className="text-[11px] text-slate-400 leading-normal">
                    Captures 16-bit PCM audio chunks natively. Utilizes custom Web Audio APIs to visualize real-time speech envelopes on the client device.
                  </p>
                </div>
              </div>

              <div className="flex gap-3 items-start border-b border-slate-900 pb-3">
                <div className="bg-amber-500/10 text-amber-400 p-2 rounded-lg font-mono text-xs font-bold w-12 text-center h-8 flex items-center justify-center">BKND</div>
                <div className="space-y-0.5">
                  <span className="text-xs font-bold text-white block">FastAPI WebSockets or NestJS Node.js Cluster</span>
                  <p className="text-[11px] text-slate-400 leading-normal">
                    Accepts binary audio data over WebSockets without blocking. Pushes files to Redis task queue nodes for heavy calculations in parallel.
                  </p>
                </div>
              </div>

              <div className="flex gap-3 items-start border-b border-slate-900 pb-3">
                <div className="bg-rose-500/10 text-rose-400 p-2 rounded-lg font-mono text-xs font-bold w-12 text-center h-8 flex items-center justify-center">ACST</div>
                <div className="space-y-0.5">
                  <span className="text-xs font-bold text-white block">Dynamic Audio Phoneme Matcher Engine</span>
                  <p className="text-[11px] text-slate-400 leading-normal">
                    Integrates Praat wrappers or librosa libraries to align audio timing with standard Japanese phoneme sequences. Employs acoustic neural models to rate pitch offsets.
                  </p>
                </div>
              </div>

              <div className="flex gap-3 items-start">
                <div className="bg-indigo-500/10 text-indigo-400 p-2 rounded-lg font-mono text-xs font-bold w-12 text-center h-8 flex items-center justify-center">DATA</div>
                <div className="space-y-0.5">
                  <span className="text-xs font-bold text-white block">PostgreSQL (Drizzle ORM) + ElastiCache Redis</span>
                  <p className="text-[11px] text-slate-400 leading-normal">
                    Serves structural profiles and rapid metrics summaries. Redis guards conversational history sessions to keep memory consumption optimized and rapid.
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* Structural Relational Database Schema */}
          <div className="bg-slate-950 rounded-2xl border border-slate-800 p-6 space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-1.5">
              <Database className="text-indigo-400" size={16} />
              Database Architecture (Drizzle Schema / SQL blueprints)
            </h3>
            
            <p className="text-slate-400 text-xs">
              Optimized table layout matching scenario progression, metrics collection logs, and candidate retention schemas.
            </p>

            <div className="bg-slate-900 rounded-xl p-4 font-mono text-[10.5px] text-slate-300 overflow-x-auto border border-slate-800 shadow-inner">
              <span className="text-[9px] text-[#cf5817] uppercase block mb-2 font-bold">// Drizzle PostgreSQL Schema Declarations</span>
              <span className="text-emerald-400">export const</span> <span className="text-white">users</span> = pgTable(<span className="text-amber-300">'users'</span>, &#123;{"\n"}
              {"  "}id: uuid(<span className="text-amber-300">'id'</span>).primaryKey().defaultRandom(),{"\n"}
              {"  "}email: varchar(<span className="text-amber-300">'email'</span>, &#123; length: 255 &#125;).notNull().unique(),{"\n"}
              {"  "}level_cohort: varchar(<span className="text-amber-300">'level_cohort'</span>), <span className="text-slate-500">// 'beginner', 'intermediate'</span>{"\n"}
              {"  "}created_at: timestamp(<span className="text-amber-300">'created_at'</span>).defaultNow(),{"\n"}
              &#125;);{"\n\n"}

              <span className="text-emerald-400">export const</span> <span className="text-white">conversations</span> = pgTable(<span className="text-amber-300">'conversations'</span>, &#123;{"\n"}
              {"  "}id: uuid(<span className="text-amber-300">'id'</span>).primaryKey(),{"\n"}
              {"  "}user_id: uuid(<span className="text-amber-300">'user_id'</span>).references(() =&gt; users.id),{"\n"}
              {"  "}scenario_id: varchar(<span className="text-amber-300">'scenario_id'</span>),{"\n"}
              {"  "}total_duration_seconds: integer(<span className="text-amber-300">'duration'</span>),{"\n"}
              {"  "}overall_accuracy_score: decimal(<span className="text-amber-300">'accuracy'</span>),{"\n"}
              &#125;);{"\n\n"}

              <span className="text-emerald-400">export const</span> <span className="text-white">audio_logs</span> = pgTable(<span className="text-amber-300">'audio_logs'</span>, &#123;{"\n"}
              {"  "}id: serial(<span className="text-amber-300">'id'</span>).primaryKey(),{"\n"}
              {"  "}conversation_id: uuid().references(() =&gt; conversations.id),{"\n"}
              {"  "}transcription: text(<span className="text-amber-300">'transcription'</span>),{"\n"}
              {"  "}pronunciation_pitch_score: decimal(<span className="text-amber-300">'pitch'</span>),{"\n"}
              {"  "}fluency_silence_pauses: integer(<span className="text-amber-300">'pauses_ms'</span>),{"\n"}
              &#125;);
            </div>
          </div>

        </div>

        {/* INTERACTIVE COMPREHENSIVE API SPEC BOARD */}
        <div className="bg-slate-950 rounded-2xl border border-slate-800 p-6 md:p-8 space-y-6">
          <div>
            <h3 className="text-base md:text-lg font-bold text-white flex items-center gap-1.5">
              <Code2 className="text-indigo-400 animate-pulse" size={18} />
              OpenAI Webhook & API Catalog Schemas
            </h3>
            <p className="text-slate-400 text-xs mt-1">
              Check the detailed interface request/response specs for client-to-engine API integration by clicking the categories below.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            
            {/* API Selector menu */}
            <div className="space-y-2 flex flex-col justify-start">
              {SYSTEM_APIS.map((api, i) => {
                const isActive = selectedApiIndex === i;
                return (
                  <button
                    key={i}
                    onClick={() => setSelectedApiIndex(i)}
                    className={`w-full text-left p-4 rounded-xl border transition-all ${
                      isActive 
                        ? "bg-indigo-950/40 border-indigo-500/80 text-white shadow-md block" 
                        : "bg-slate-900/40 border-slate-800 text-slate-400 hover:bg-slate-900/60"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className={`text-[9px] font-mono font-extrabold px-1.5 py-0.5 rounded ${
                        api.method === "POST" ? "bg-amber-500/10 text-amber-400" : "bg-emerald-500/10 text-emerald-400"
                      }`}>
                        {api.method}
                      </span>
                      <span className="text-xs font-mono truncate">{api.endpoint}</span>
                    </div>
                    <span className="text-[11px] leading-relaxed font-light mt-1.5 text-slate-400 block line-clamp-2">
                      {api.description}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* API Code payload display board */}
            <div className="lg:col-span-2 space-y-3">
              <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden p-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-3">
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest font-bold">Request Payload Specs:</span>
                  <span className="text-[9px] font-mono text-slate-500 bg-slate-950 px-2 py-0.5 rounded">application/json</span>
                </div>
                {SYSTEM_APIS[selectedApiIndex].requestBody ? (
                  <pre className="text-amber-300 font-mono text-[11px] overflow-x-auto leading-relaxed max-h-[160px] custom-scrollbar">
                    {SYSTEM_APIS[selectedApiIndex].requestBody}
                  </pre>
                ) : (
                  <span className="text-[10px] font-mono text-slate-500 italic">No request parameters body required.</span>
                )}
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden p-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-3">
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest font-bold">Response Schema Structure:</span>
                  <span className="text-[9px] font-mono text-slate-500 bg-slate-950 px-2 py-0.5 rounded">HTTP 200 OK</span>
                </div>
                <pre className="text-emerald-400 font-mono text-[11px] overflow-x-auto leading-relaxed max-h-[220px] custom-scrollbar">
                  {SYSTEM_APIS[selectedApiIndex].responseBody}
                </pre>
              </div>
            </div>

          </div>
        </div>

        {/* ENTERPRISE SCALING TIMELINE ROADMAP TO 1M+ USERS */}
        <div className="bg-slate-950 rounded-2xl border border-slate-800 p-6 md:p-8 space-y-6">
          <div>
            <h3 className="text-base md:text-lg font-bold text-white flex items-center gap-1.5">
              <TrendingUp className="text-[#cf5817]" size={18} />
              OpenAI Scaling Roadmap for Speaking Tutor Pipelines
            </h3>
            <p className="text-slate-400 text-xs mt-1">
              Step-by-step optimization standards required for growing with confidence from 100k to 1M+ active learners.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 pt-2">
            
            <div className="border border-slate-900 bg-slate-900/15 p-5 rounded-xl space-y-2 relative overflow-hidden">
              <span className="absolute right-0 top-0 text-[50px] font-bold font-mono text-emerald-500/5 select-none pointer-events-none">PH-1</span>
              <span className="text-[9px] font-mono bg-emerald-500/10 text-emerald-300 font-bold px-2 py-0.5 rounded inline-block">Phase 1: Connection Caching</span>
              <h4 className="text-sm font-semibold text-white">WebSocket Connection Pools</h4>
              <p className="text-[11px] text-slate-400 leading-relaxed font-light">
                Implement Redis Pub/Sub channels to distribute WebSocket server load. Caching frequent vocabulary contexts on client-side state keeps API requests limited and swift.
              </p>
            </div>

            <div className="border border-slate-900 bg-slate-900/15 p-5 rounded-xl space-y-2 relative overflow-hidden">
              <span className="absolute right-0 top-0 text-[50px] font-bold font-mono text-amber-500/5 select-none pointer-events-none">PH-2</span>
              <span className="text-[9px] font-mono bg-amber-500/10 text-amber-300 font-bold px-2 py-0.5 rounded inline-block">Phase 2: Downsampling</span>
              <h4 className="text-sm font-semibold text-white">Edge-Level Downsampling</h4>
              <p className="text-[11px] text-slate-400 leading-relaxed font-light">
                Perform downsampling on the client browser dynamically from 44.1kHz to 16kHz before saving or shipping packets. This reduces bandwidth consumption by 64% with zero loss in STT or pitch accuracy.
              </p>
            </div>

            <div className="border border-slate-900 bg-slate-900/15 p-5 rounded-xl space-y-2 relative overflow-hidden">
              <span className="absolute right-0 top-0 text-[50px] font-bold font-mono text-[#cf5817]/5 select-none pointer-events-none">PH-3</span>
              <span className="text-[9px] font-mono bg-[#cf5817]/10 text-orange-300 font-bold px-2 py-0.5 rounded inline-block">Phase 3: DB Read Replicas</span>
              <h4 className="text-sm font-semibold text-white">Database Load Segregation</h4>
              <p className="text-[11px] text-slate-400 leading-relaxed font-light">
                Segregate transaction-heavy logs table into dedicated time-series databases. Employ read replicas on the central PostgreSQL engine to ensure analytics queries do not block active speaking interactions.
              </p>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
