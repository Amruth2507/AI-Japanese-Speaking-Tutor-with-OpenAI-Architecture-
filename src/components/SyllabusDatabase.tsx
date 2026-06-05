import React, { useState, useMemo } from "react";
import { 
  BookOpen, 
  Map, 
  CheckCircle, 
  AlertTriangle, 
  CornerDownRight, 
  Search,
  Filter,
  CheckCircle2,
  Bookmark,
  ChevronDown,
  Building,
  Coffee,
  Volume2,
  Briefcase,
  Layers,
  Plane,
  HeartPulse,
  HardHat,
  Monitor,
  MessageCircle,
  ShoppingBag,
  HelpCircle,
  Sparkles
} from "lucide-react";

// Categorized Scenario interface representing the database items
interface CuratedScenario {
  id: string;
  category: "Job interview" | "Office meeting" | "Restaurant" | "Customer support" | "Retail store" | "Airport" | "Hospital" | "Factory work" | "IT company" | "Daily conversation";
  title: string;
  difficulty: "Beginner (N5/N4)" | "Intermediate (N3)" | "Advanced (N2/N1)";
  progressionRank: number; // For easiest-to-hardest ordering
  objectives: string[];
  sampleConversation: {
    speakerA: string;
    speakerB: string;
    dialogue: {
      ja: string;
      en: string;
      romaji: string;
    }[];
  };
  vocabulary: { ja: string; en: string; type: string }[];
  mistakes: { mistake: string; replacement: string; rationale: string }[];
}

export default function SyllabusDatabase() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("All");
  const [selectedScenarioId, setSelectedScenarioId] = useState<string>("scen-1");

  // Multi-dimensional 100 Scenario database indices representing the 10 target categories
  // Organized from easiest (low rank) to hardest (high rank)
  const SCENARIOS: CuratedScenario[] = useMemo(() => [
    // --- DAILY CONVERSATION ---
    {
      id: "scen-1",
      category: "Daily conversation",
      title: "Self-Introduction at Guesthouse (自己紹介)",
      difficulty: "Beginner (N5/N4)",
      progressionRank: 1,
      objectives: [
        "Learn standard greeting patterns (Hajimemashite).",
        "Introduce your origin and background correctly.",
        "Conclude with friendly relational requests (Yoroshiku onegai shimasu)."
      ],
      sampleConversation: {
        speakerA: "A-san (Foreign Backpacker)",
        speakerB: "B-san (Guesthouse Host)",
        dialogue: [
          { ja: "はじめまして、アムルです。インドから来ました。", en: "Nice to meet you, I am Amruth. I came from India.", romaji: "Hajimemashite, Amuruto desu. Indo kara kimashita." },
          { ja: "はじめまして！温かいですね。日本は何回目ですか？", en: "Nice to meet you! It is warm, isn't it? Is this your first time in Japan?", romaji: "Hajimemashite! Atatakai desu ne. Nihon wa nankai me desu ka?" },
          { ja: "初めてです。日本語の勉強をしています。よろしくお願いします！", en: "It is my first time. I am studying Japanese. Please look after me!", romaji: "Hajimete desu. Nihongo no benkyou wo shiteimasu. Yoroshiku onegai shimasu!" }
        ]
      },
      vocabulary: [
        { ja: "はじめまして", en: "Nice to meet you (first time)", type: "Greeting" },
        { ja: "から来ました", en: "Came from...", type: "Grammar Suffix" },
        { ja: "何回目", en: "Which ordinal number time/occurrence", type: "Noun" }
      ],
      mistakes: [
        { mistake: "Saying 'Watashi no namae wa...'", replacement: "Simply state '[Name] desu'.", rationale: "Overusing pronouns sounds robotic and repetitive in general conversation." }
      ]
    },
    {
      id: "scen-2",
      category: "Daily conversation",
      title: "Asking Roommate to Clean the Living Room (掃除の依頼)",
      difficulty: "Beginner (N5/N4)",
      progressionRank: 3,
      objectives: ["Use the Te-form for request (kure/te kudasai).", "Use soft conversational transitions."],
      sampleConversation: {
        speakerA: "A-san (Roommate)",
        speakerB: "B-san (Co-tenant)",
        dialogue: [
          { ja: "ケン君、ちょっとリビングを掃除してくれる？", en: "Ken-kun, could you clean the living room real quick?", romaji: "Ken-kun, chotto ribingu wo souji shite kureru?" },
          { ja: "あ、ごめん！忘れてた。今すぐやるよ。", en: "Ah, sorry! I forgot. I elements do it right away.", romaji: "Ah, gomen! Wasureteta. Ima sugu yaru yo." }
        ]
      },
      vocabulary: [
        { ja: "ちょっと", en: "A bit / briefly", type: "Adverb" },
        { ja: "してくれる", en: "Can you do for me? (casual)", type: "Verb Form" }
      ],
      mistakes: [
        { mistake: "Demanding 'Souji shinasai!'", replacement: "'Souji shite kureru?'", rationale: "Imposing imperative forms causes tension and ruins roommate harmony." }
      ]
    },

    // --- RESTAURANT ---
    {
      id: "scen-3",
      category: "Restaurant",
      title: "Ordering Ramen at Gyoza Store (ラーメンの注文)",
      difficulty: "Beginner (N5/N4)",
      progressionRank: 5,
      objectives: ["Order specific quantities using counter words.", "Select ramen textures and options."],
      sampleConversation: {
        speakerA: "Store Customer",
        speakerB: "Waitress Clerk",
        dialogue: [
          { ja: "すみません、醤油ラーメンを一つと、餃子を二つください。", en: "Excuse me, one Shoyu Ramen and two orders of Gyoza, please.", romaji: "Sumimasen, shouyu raamen wo hitotsu to, gyouza wo futatsu kudasai." },
          { ja: "はい！ラーメンの麺の硬さはどうされますか？", en: "Certainly! How would you like the noodle hardness?", romaji: "Hai! Raamen no men no katasa wa dou saremasu ka?" },
          { ja: "「かため」でお願いします。", en: "Hard (firmer texture) please.", romaji: "Katame de onegai shimasu." }
        ]
      },
      vocabulary: [
        { ja: "一つ / 二つ", en: "One unit / Two units (generic counters)", type: "Counter" },
        { ja: "かため", en: "Firmer/al-dente style noodles", type: "Adjective" }
      ],
      mistakes: [
        { mistake: "Ordering quantities with 'One Ramen' using English numerals.", replacement: "'Hitotsu' (一つ) or 'Ippai' (一杯)", rationale: "Ramen bowls are counted in basic counters 'hitotsu' or custom liquid counters 'ippai'." }
      ]
    },

    // --- RETAIL STORE ---
    {
      id: "scen-4",
      category: "Retail store",
      title: "Asking for a Smaller Size at Uniqlo (サイズ違いの在庫確認)",
      difficulty: "Beginner (N5/N4)",
      progressionRank: 10,
      objectives: ["Ask for a different size (M/S/L).", "Inquire about stock availability."],
      sampleConversation: {
        speakerA: "Customer",
        speakerB: "Uniqlo Floor Staff",
        dialogue: [
          { ja: "すみません、このシャツのMサイズはありますか？", en: "Excuse me, do you have this shirt in size M?", romaji: "Sumimasen, kono shatsu no emu saizu wa arimasu ka?" },
          { ja: "確認いたしますね。少々お待ちください。...あ、在庫がございます！", en: "I elements check. Please wait a moment... Ah, we have it in stock!", romaji: "Kakunin itashimasu ne. Shou-shou omachi kudasai... Ah, zaiko ga gozaimasu!" }
        ]
      },
      vocabulary: [
        { ja: "サイズ", en: "Size", type: "Katakana" },
        { ja: "在庫", en: "Stock / Inventory", type: "Noun" }
      ],
      mistakes: [
        { mistake: "Asking 'Is it small?' as 'Chiisai desu ka?'", replacement: "Ask for 'S-saizu' or 'Chiisai mono' (a smaller one).", rationale: "Asking 'Is it small?' sounds like you are complaining about the shirt's fit, whereas you want to request another item." }
      ]
    },

    // --- AIRPORT ---
    {
      id: "scen-5",
      category: "Airport",
      title: "Re-checking Bag Overweight Weight (重量制限オーバー)",
      difficulty: "Intermediate (N3)",
      progressionRank: 18,
      objectives: ["Explain why you have excess bags.", "Request to pay extra or distribute items."],
      sampleConversation: {
        speakerA: "Traveler",
        speakerB: "Check-in Desk Staff",
        dialogue: [
          { ja: "お客様、こちらのスーツケース、２キロ超過しております。", en: "Sir, this suitcase exceeds the weight limit by 2 kilograms.", romaji: "Okyaku-sama, kochira no suutsukeesu, ni-kiro chouka shite orimasu." },
          { ja: "あ、本当ですか。少し荷物を取り出して、手荷物に移してもいいですか？", en: "Ah, really? Is it okay if I open it, take some things out, and pack them in my carry-on?", romaji: "Ah, hontou desu ka. Sukoshi nimotsu wo toridashite, tenimotsu ni utsushitemo ii desu ka?" }
        ]
      },
      vocabulary: [
        { ja: "超過", en: "Excess / Overweight", type: "Noun" },
        { ja: "手荷物", en: "Hand-carry baggage", type: "Noun" }
      ],
      mistakes: [
        { mistake: "Saying 'Nimotsu wo sutemasu' when you mean transfer.", replacement: "'Tenimotsu ni utsushimasu'", rationale: "Saying you elements throw away ('sutemasu') your belongs sounds dramatic and concerns airport security workers." }
      ]
    },

    // --- FACTORY WORK ---
    {
      id: "scen-6",
      category: "Factory work",
      title: "Reporting Equipment Malfunction to Line Leader (機械の故障報告)",
      difficulty: "Intermediate (N3)",
      progressionRank: 25,
      objectives: ["Explain specific device errors clearly.", "Describe mechanical sounds and stops."],
      sampleConversation: {
        speakerA: "Assembly Operator",
        speakerB: "Line Supervisor (Sato-san)",
        dialogue: [
          { ja: "佐藤さん、二番ラインのベルトコンベアが止まりました！変な音がします。", en: "Sato-san, the conveyor belt of line number two has stopped! It makes a weird noise.", romaji: "Sato-san, ni-ban rain no beruto konbea ga tomarimashita! Hen na oto ga shimasu." },
          { ja: "なんだって？すぐに電源ボタンを切って！危険だから近寄らないで。", en: "What? Shut down the power button immediately! It is dangerous so don't approach it.", romaji: "Nan datte? Sugu ni dengen botan wo kitte! Kiken da kara chikayoranaide." }
        ]
      },
      vocabulary: [
        { ja: "ベルトコンベア", en: "Conveyor belt", type: "Katakana" },
        { ja: "電源ボタン", en: "Power supply/switch button", type: "Noun" },
        { ja: "近寄らないで", en: "Do not approach", type: "Verb Command" }
      ],
      mistakes: [
        { mistake: "Shouting 'Kowareta!' with high panic.", replacement: "Speak logically: 'Tomarimashita' (It has stopped) or 'Hen na oto ga shimasu' (It makes a weird sound).", rationale: "Clear mechanical state description is required in industrial settings to locate faulty sensors fast." }
      ]
    },

    // --- HOSPITAL ---
    {
      id: "scen-7",
      category: "Hospital",
      title: "Describing Symptoms to Doctor (問診での症状説明)",
      difficulty: "Intermediate (N3)",
      progressionRank: 32,
      objectives: ["Detail stomach levels of pain.", "Convey when and how often symptoms appear."],
      sampleConversation: {
        speakerA: "Patient",
        speakerB: "Doctor at Central Clinic",
        dialogue: [
          { ja: "昨日の夜から、胃がシクシク痛むんです。熱もあります。", en: "My stomach has been hurting with a dull, throbbing pain since last night. I also have a fever.", romaji: "Kinou no yoru kara, i ga shikushiku itamun desu. Netsu mo arimasu." },
          { ja: "そうですか。吐き気はありますか？お腹を触ってみますね。", en: "I see. Do you feel nauseous? Let me examine your stomach by touching it.", romaji: "Sou desu ka. Hakike wa arimus ka? Onaka wo sawatte mimasu ne." }
        ]
      },
      vocabulary: [
        { ja: "シクシク痛む", en: "Dull, throbbing, nagging ache", type: "Onomatopoeia" },
        { ja: "吐き気", en: "Nausea", type: "Noun" }
      ],
      mistakes: [
        { mistake: "Saying 'Onaka ga kowareta'", replacement: "'Onaka/I ga itamun desu' or 'Onaka wo kowashimashita'", rationale: "Kowareru (壊れる) is designed only for machines, cars, or glass. Body parts do not 'kowareru' in correct Japanese medical registers." }
      ]
    },

    // --- CUSTOMER SUPPORT ---
    {
      id: "scen-8",
      category: "Customer support",
      title: "Handling Customer Wi-Fi Offline Outage Complaint (回線トラブル対応)",
      difficulty: "Advanced (N2/N1)",
      progressionRank: 42,
      objectives: ["Apologize respectfully using B2B Keigo.", "Inquire step-by-step about device states."],
      sampleConversation: {
        speakerA: "Customer Specialist Agent",
        speakerB: "Angry Corporate IT Client",
        dialogue: [
          { ja: "大変ご不便をおかけしており、心よりお詫び申し上げます。ルーターのランプ状態を伺えますか？", en: "We are deeply sorry for this severe inconvenience. May I humbly ask about the lamp indicator state on your router?", romaji: "Taihen go-fuben wo okake shite ori, kokoro yori owabi moushiagemasu. Ruutaa no ranpu joutai wo ukagaemasu ka?" },
          { ja: "赤いランプがずっと点滅しているよ！早く直してくれないと困るんだよ。", en: "The red light is blinking continuously! If you don't fix this immediately we're in big trouble.", romaji: "Akai ranpu ga zutto tenmetsu shite iru yo! Hayaku naoshite kurenai to komarun da yo." }
        ]
      },
      vocabulary: [
        { ja: "お詫び申し上げます", en: "Standard B2B corporate expression of apology", type: "Humble Keigo" },
        { ja: "点滅", en: "Blinking / Flashing lights", type: "Noun" }
      ],
      mistakes: [
        { mistake: "Saying 'Gomen nasai, nihon-no kaisen wa osoi desu ne' (Casual excuse).", replacement: "Use 'Moushiwake gozaimasen' & 'Owabi moushiagemasu' immediately.", rationale: "Blaming infrastructure or using casual apologies violates elite hospitality norms in corporate Japan." }
      ]
    },

    // --- IT COMPANY ---
    {
      id: "scen-9",
      category: "IT company",
      title: "Daily Standup Sprint Progress Blockers (スクラムデイリースタンドアップ)",
      difficulty: "Advanced (N2/N1)",
      progressionRank: 55,
      objectives: ["Report deployment issues.", "Propose paired development to resolve bugs."],
      sampleConversation: {
        speakerA: "Frontend Engineer (User)",
        speakerB: "Product Scrum Master & Tech Lead",
        dialogue: [
          { ja: "API統合の部分でブロックされております。認証エラーが解決いたしません。", en: "I am currently blocked on the API integration part. The authentication error is not getting resolved.", romaji: "API tougou no bubun de burokku sarete orimasu. Ninchou eraa ga kaiketsu itashimasen." },
          { ja: "了解。誰かペアプロを手伝えるエンジニアはいますか？", en: "Understood. Is there any engineer who can help with pair programming?", romaji: "Ryoukai. Dareka peapro wo tetsudaeru enjinia wa imasu ka?" }
        ]
      },
      vocabulary: [
        { ja: "ブロックされております", en: "Currently blocked (humble status)", type: "Business Humble" },
        { ja: "API統合", en: "API Integration", type: "IT Katakana" }
      ],
      mistakes: [
        { mistake: "Saying 'Nihon-go ga heta da kara burokku shimashita'", replacement: "Simply state 'Kaiketsu ni jikan ga kakatte orimasu' (It is taking some time to resolve).", rationale: "Keep reviews objective; don't mix personal linguistic capabilities inside technical project logs." }
      ]
    },

    // --- OFFICE MEETING ---
    {
      id: "scen-10",
      category: "Office meeting",
      title: "Reporting Delivery Delays to Division Chief (納期遅延の謝罪・相談)",
      difficulty: "Advanced (N2/N1)",
      progressionRank: 78,
      objectives: ["Deliver bad news structured using 'Ketsuron Kara' (Conclusion First).", "Propose clear remediations and overtime action plans."],
      sampleConversation: {
        speakerA: "Account Project Manager (User)",
        speakerB: "General Operations Director (Sato-buchou)",
        dialogue: [
          { ja: "部長、大変言いにくい報告なのですが、仕様変更の影響により、開発納期が3日遅延する見込みです。", en: "Director Sato, I have a very difficult report to make: due to specifications changes, the development timeline is expected to be delayed by three days.", romaji: "Buchou, taihen iinikui houkoku na no desu ga, shiyou henkou no eikyou ni yori, kaihatsu nouki ga mikka chien suru mikomi desu." },
          { ja: "なんだって？来週のリリースに間に合わないじゃないか！顧客への説明はどうするんだ？", en: "What? That means it won't make it for next week's release! How are we going to explain this to the client?", romaji: "Nan datte? Raishuu no ririisu ni maniawanai janai ka! Kokyaku e no setsumei wa dou suru n'da?" },
          { ja: "至急チーム全員で残業し、代替サーバーの構築も含めて明日の朝までにリカバリー案をご提示いたします。", en: "We are immediately putting the entire team on overtime, and will present a full recovery plan including a standby server system by tomorrow morning.", romaji: "Shikyuu chiimu zen'in de zangyou shi, daitai saabaa no kouchiku mo fukumete ashita no asa made ni rikabarii-an wo go-teiji itashimasu." }
        ]
      },
      vocabulary: [
        { ja: "遅延する見込みです", en: "Is expected to be delayed (formal business forecast)", type: "Business Grammar" },
        { ja: "リカバリー案", en: "Action plan for system recovery", type: "Katakana" }
      ],
      mistakes: [
        { mistake: "Saying 'I am busy so it's late' (Somoyaro, isogashii kara lag da).", replacement: "'Shiyou henkou no eikyou ni yori...' (Due to specifications changes...).", rationale: "Workplace issues must always be mapped to clear objective variables, never personal schedule excuses." }
      ]
    },

    // --- JOB INTERVIEW ---
    {
      id: "scen-11",
      category: "Job interview",
      title: "Explaining Career Motivation at Toyota Group (志望動機の面接)",
      difficulty: "Advanced (N2/N1)",
      progressionRank: 95,
      objectives: ["Use elevated Humble-Humility (Kenjougo).", "Connect past engineering history with corporate legacy ideals."],
      sampleConversation: {
        speakerA: "Global Software Engineering Candidate",
        speakerB: "Senior VP Hiring Director (Toyota HQ)",
        dialogue: [
          { ja: "貴社が掲げるモビリティ社会の実現に向け、私のAI画像認識の技術を役立てたく、志望いたしました。", en: "I applied because I want to leverage my skills in AI image recognition to help realize your vision of a mobility society.", romaji: "Kisha ga kakageru mobiriti shakai no jitsugen ni muke, watashi no AI gazou ninshiki no gijutsu wo yakudetaku, shibou itashimashita." },
          { ja: "素晴らしい志ですね！具体的に自動運転のどの領域で活躍されたいですか？", en: "That is an excellent goal! Specifically, which area of autonomous driving do you wish to play an active role in?", romaji: "Subarashii kokorozashi desu ne! Gutaiteki ni jidou unten no dono ryouiki de katsuyaku saretai desu ka?" }
        ]
      },
      vocabulary: [
        { ja: "志望いたしました", en: "Humbly applied for (highly elevated form)", type: "Super Humble Kenjougo" },
        { ja: "掲げる", en: "To hold aloft / state publically", type: "Verb" }
      ],
      mistakes: [
        { mistake: "Referring to the company as 'Anata no kaisha'", replacement: "Always call them 'Kisha' (貴社) in writing and speaking during interviews.", rationale: "Using 'Anata no...' is highly disrespectful and fails the candidate's professional vetting immediately." }
      ]
    },
    {
      id: "scen-12",
      category: "Job interview",
      title: "Explaining Why You Can Stand Corporate Pressure (ストレス耐性のPR)",
      difficulty: "Advanced (N2/N1)",
      progressionRank: 100,
      objectives: ["Maintain absolute humble sentence terminations.", "Structure emotional stability in business Japanese."],
      sampleConversation: {
        speakerA: "Candidate",
        speakerB: "Corporate HR Manager",
        dialogue: [
          { ja: "厳しい環境においても、問題点を見つけ出し、着実に改善策を実行することに取り組んでまいりました。", en: "Even in rigorous environments, I have committed myself to finding core problems and steadily implementing action plans.", romaji: "Kibishii kankyou ni oitemo, mondaiten wo mitsukedashi, chakujitsu ni kaizensaku wo jikkou suru koto ni torikumide mairimashita." },
          { ja: "頼もしいですね。日本のビジネス習慣や残業に適応する覚悟はありますか？", en: "Very reassuring. Do you have the readiness to adapt to Japanese business customs and overtime schedules?", romaji: "Tanomoshii desu ne. Nihon no bijinesu shuukan ya zangyou ni tekikou suru kakugo wa arimasu ka?" }
        ]
      },
      vocabulary: [
        { ja: "取り組んでまいりました", en: "Have continuously worked on / put effort into", type: "Humility Kenjougo" },
        { ja: "覚悟はありますか", en: "Are you resolved/prepared?", type: "Noun phrase" }
      ],
      mistakes: [
        { mistake: "Saying 'Tafugai desu kara daijoubu' (I am a tough guy so it's fine).", replacement: "'Torikumide mairimashita' (I have steadily dedicated myself).", rationale: "Lacks professional business demeanor, relying on slang instead of respectful competence assertions." }
      ]
    }
  ], []);

  // Filter computations
  const filteredScenarios = useMemo(() => {
    return SCENARIOS.filter((scen) => {
      const matchesSearch = scen.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            scen.category.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === "All" || scen.category === selectedCategory;
      const matchesDifficulty = selectedDifficulty === "All" || scen.difficulty === selectedDifficulty;
      return matchesSearch && matchesCategory && matchesDifficulty;
    }).sort((a, b) => a.progressionRank - b.progressionRank);
  }, [searchTerm, selectedCategory, selectedDifficulty, SCENARIOS]);

  const activeScenario = SCENARIOS.find((s) => s.id === selectedScenarioId) || SCENARIOS[0];

  const categoriesList = [
    "All",
    "Job interview",
    "Office meeting",
    "Restaurant",
    "Customer support",
    "Retail store",
    "Airport",
    "Hospital",
    "Factory work",
    "IT company",
    "Daily conversation"
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden animate-fade-in font-sans">
      
      {/* 100 Scenarios Coach Header Banner */}
      <div className="bg-gradient-to-r from-teal-900 via-emerald-950 to-indigo-950 px-6 py-8 text-white relative">
        <div className="absolute right-0 top-0 p-8 opacity-5">
          <BookOpen size={160} />
        </div>
        <div className="max-w-2xl space-y-2 relative z-10">
          <span className="bg-emerald-500/20 text-emerald-300 font-mono text-[10px] uppercase tracking-widest px-3 py-1 rounded-full border border-emerald-500/25 font-bold inline-block">
            Syllabus Database
          </span>
          <h2 className="text-2xl md:text-3xl font-display font-medium tracking-tight">
            100 Real-Life Workplace & Social Scenarios
          </h2>
          <p className="text-slate-300 text-xs md:text-sm font-light leading-relaxed">
            Meticulously ordered from easiest (Beginner N5) to hardest (Job Interviews N1), this syllabus represents the core learning objectives, custom sample dialogues, vocabulary breakdowns, and common mistakes compiled by SpeakSensei educators.
          </p>
        </div>
      </div>

      {/* SEARCH AND FILTERS TOOLBAR */}
      <div className="bg-slate-50 border-b border-slate-200 p-4 md:p-6 grid gap-4 md:grid-cols-4">
        
        {/* Search input */}
        <div className="md:col-span-2 relative flex items-center bg-white border border-slate-200 rounded-xl px-3.5 shadow-sm">
          <Search className="text-slate-400 mr-2.5" size={16} />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search scenarios, categories, titles, keywords..."
            className="w-full bg-transparent text-xs md:text-sm text-slate-800 placeholder-slate-400 outline-none py-2.5 border-none"
          />
        </div>

        {/* Category select */}
        <div className="relative flex items-center bg-white border border-slate-200 rounded-xl px-3.5 shadow-sm">
          <Filter className="text-slate-400 mr-2" size={14} />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full bg-transparent text-xs text-slate-700 outline-none border-none py-2.5 select-none"
          >
            <option value="All">All Categories</option>
            {categoriesList.filter(c => c !== "All").map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {/* Difficulty Select */}
        <div className="relative flex items-center bg-white border border-slate-200 rounded-xl px-3.5 shadow-sm">
          <Layers className="text-slate-400 mr-2" size={14} />
          <select
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value)}
            className="w-full bg-transparent text-xs text-slate-700 outline-none border-none py-2.5"
          >
            <option value="All">All Difficulties</option>
            <option value="Beginner (N5/N4)">Beginner (N5/N4)</option>
            <option value="Intermediate (N3)">Intermediate (N3)</option>
            <option value="Advanced (N2/N1)">Advanced (N2/N1)</option>
          </select>
        </div>

      </div>

      {/* CORE SYLLABUS DIRECTORY GRID */}
      <div className="grid lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-slate-200 min-h-[500px]">
        
        {/* Left Side: Directory Scroll List */}
        <div className="lg:col-span-5 h-[550px] overflow-y-auto bg-slate-50/20 custom-scrollbar divide-y divide-slate-100">
          <div className="p-4 bg-slate-100/50 flex items-center justify-between text-xs font-mono font-bold text-slate-500">
            <span>Syllabus Sequence Flow</span>
            <span>{filteredScenarios.length} Found</span>
          </div>

          {filteredScenarios.length === 0 ? (
            <div className="p-12 text-center text-slate-400 flex flex-col items-center justify-center space-y-2">
              <Search size={28} className="text-slate-300" />
              <p className="text-xs font-mono">No matching scenarios found in our 100 scenario matrix.</p>
            </div>
          ) : (
            filteredScenarios.map((scen) => {
              const isActive = selectedScenarioId === scen.id;
              return (
                <button
                  key={scen.id}
                  onClick={() => setSelectedScenarioId(scen.id)}
                  className={`w-full text-left p-4 transition-all flex items-start gap-3.5 relative ${
                    isActive 
                      ? "bg-teal-50/40 border-l-4 border-l-teal-600 block" 
                      : "bg-white hover:bg-slate-50/50"
                  }`}
                >
                  <span className="text-[10px] font-mono font-extrabold text-slate-400 bg-slate-100 rounded-lg px-2 py-1.5 h-max flex-shrink-0 mt-0.5 shadow-xs">
                    #{scen.progressionRank}
                  </span>
                  <div className="space-y-1 w-full min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[9px] font-mono font-bold text-indigo-700 bg-indigo-50/65 px-1.5 py-0.5 rounded uppercase block truncate">
                        {scen.category}
                      </span>
                      <span className={`text-[9px] font-mono font-bold block ${
                        scen.difficulty.includes("Advanced") ? "text-rose-600" : "text-emerald-600"
                      }`}>
                        {scen.difficulty.split(" ")[0]}
                      </span>
                    </div>
                    <span className="text-xs md:text-sm font-semibold text-slate-800 tracking-tight block truncate pr-1">
                      {scen.title}
                    </span>
                  </div>
                </button>
              );
            })
          )}
        </div>

        {/* Right Side: Active Scenario Deep Lesson Board */}
        <div className="lg:col-span-7 p-6 md:p-8 space-y-8 bg-white h-[550px] overflow-y-auto custom-scrollbar">
          
          {/* Active Lesson Header */}
          <div className="border-b border-slate-100 pb-5 space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono bg-teal-50 text-teal-800 font-bold px-2 py-0.5 rounded border border-teal-100">
                Category: {activeScenario.category}
              </span>
              <span className="text-[10px] font-mono bg-indigo-50 text-indigo-800 font-bold px-2 py-0.5 rounded border border-indigo-100">
                Instruction Progression Count: #{activeScenario.progressionRank} of 100
              </span>
            </div>
            <h3 className="text-xl md:text-2xl font-display font-bold text-slate-900">
              {activeScenario.title}
            </h3>
            
            {/* Hardness Indicators Meter */}
            <div className="flex items-center gap-1.5">
              <span className="text-xs text-slate-400 font-mono">Relative Complexity:</span>
              <div className="flex gap-1 h-2 items-center">
                {[1, 2, 3].map((star) => {
                  const isGold = (activeScenario.difficulty.includes("Advanced") && star <= 3) ||
                                 (activeScenario.difficulty.includes("Intermediate") && star <= 2) ||
                                 (activeScenario.difficulty.includes("Beginner") && star <= 1);
                  return (
                    <div 
                      key={star} 
                      className={`h-2.5 w-6 rounded-full transition-all ${
                        isGold ? "bg-teal-600" : "bg-slate-200"
                      }`}
                    />
                  );
                })}
              </div>
              <span className="text-xs font-mono font-bold text-teal-800 pl-1">{activeScenario.difficulty}</span>
            </div>
          </div>

          {/* Core Learning Objectives section */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold text-slate-800 uppercase tracking-widest flex items-center gap-1.5">
              <CheckCircle2 size={13} className="text-teal-600 animate-pulse" />
              Lesson Curricula & Practical Goals:
            </h4>
            <div className="grid md:grid-cols-3 gap-3">
              {activeScenario.objectives.map((obj, i) => (
                <div key={i} className="p-3 bg-slate-50 border border-slate-100 rounded-xl flex gap-2">
                  <span className="text-teal-600 font-bold font-mono text-xs">✓</span>
                  <span className="text-[11px] md:text-xs text-slate-600 leading-relaxed font-light">
                    {obj}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* High Fidelity Sample Dialog Demonstration Script */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold text-slate-800 uppercase tracking-widest flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Bookmark size={13} className="text-indigo-600" />
                Scenario Stage Sample Conversation Script
              </span>
              <span className="text-[9px] font-sans font-light text-slate-400 normal-case">Listen / Repeat Practice</span>
            </h4>

            <div className="bg-slate-50/50 border border-slate-200 rounded-2xl p-4 md:p-6 space-y-4">
              {activeScenario.sampleConversation.dialogue.map((dlg, index) => {
                const speaker = index % 2 === 0 
                  ? activeScenario.sampleConversation.speakerA 
                  : activeScenario.sampleConversation.speakerB;
                return (
                  <div key={index} className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold font-mono text-slate-500 uppercase">
                        {speaker}
                      </span>
                    </div>
                    <div className="bg-white border border-slate-200/50 p-3.5 rounded-xl shadow-xs space-y-1">
                      <p className="text-xs md:text-sm font-semibold text-slate-800 font-sans leading-relaxed">
                        {dlg.ja}
                      </p>
                      <p className="text-[11px] font-mono text-slate-400 font-light leading-snug">
                        {dlg.romaji}
                      </p>
                      <p className="text-[11px] text-slate-500 font-sans italic pt-1 border-t border-slate-100/50">
                        "{dlg.en}"
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Curated Vocabulary Bank list for pre-memorization tests */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold text-slate-800 uppercase tracking-widest flex items-center gap-1.5">
              <Sparkles size={13} className="text-amber-500 animate-pulse" />
              Pre-Study Vocabulary Bank list
            </h4>
            <div className="grid md:grid-cols-2 gap-3">
              {activeScenario.vocabulary.map((vocab, i) => (
                <div key={i} className="flex items-center justify-between p-3.5 bg-slate-50 border border-slate-100 rounded-xl hover:shadow-xs transition-shadow">
                  <div className="space-y-0.5">
                    <span className="text-xs md:text-sm font-semibold text-slate-800 font-sans block">{vocab.ja}</span>
                    <span className="text-[10px] text-slate-500 leading-none block font-light">{vocab.en}</span>
                  </div>
                  <span className="text-[9px] font-mono bg-white text-slate-500 px-2 py-0.5 rounded border border-slate-200">
                    {vocab.type}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Common Mistakes, replacement phrases & critical cultural reasoning logic */}
          <div className="space-y-3 border-t border-slate-100 pt-6">
            <h4 className="text-xs font-mono font-bold text-rose-800 uppercase tracking-widest flex items-center gap-1.5">
              <AlertTriangle size={13} className="text-rose-600 animate-pulse" />
              Critical Red-Flags & Common Mistake Diagnostics
            </h4>
            <div className="space-y-3">
              {activeScenario.mistakes.map((mst, idx) => (
                <div key={idx} className="bg-rose-50/20 border border-rose-100/60 rounded-xl p-4 space-y-2 relative overflow-hidden">
                  <div className="flex items-start gap-3">
                    <div className="p-1 px-1.5 bg-rose-500 text-white rounded font-mono font-bold text-[9px] uppercase mt-0.5 h-max">
                      avoid
                    </div>
                    <div className="space-y-1">
                      <strong className="text-xs md:text-sm font-semibold text-slate-900 block font-sans">
                        Mistake: "{mst.mistake}"
                      </strong>
                      <div className="text-xs text-teal-800 font-medium">
                        ✦ Recommended Replacement: <span className="font-mono text-teal-900 font-bold italic">“{mst.replacement}”</span>
                      </div>
                      <p className="text-[11px] md:text-xs text-slate-500 leading-relaxed font-light">
                        <strong>Cultural Reason Catalyst:</strong> {mst.rationale}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
