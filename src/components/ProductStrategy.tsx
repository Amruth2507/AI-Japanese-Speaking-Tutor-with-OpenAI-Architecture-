import React, { useState } from "react";
import { 
  Building2, 
  ChevronRight, 
  Target, 
  Sparkles, 
  DollarSign, 
  TrendingUp, 
  Smile, 
  Compass, 
  Lightbulb, 
  AlertCircle,
  LayoutGrid,
  CheckCircle,
  XCircle,
  Check,
  ShieldAlert,
  Crown,
  Globe,
  Award,
  Users
} from "lucide-react";

interface CountryProfile {
  id: string;
  name: string;
  rank: number;
  badge: string;
  learners: string;
  jobSeekersSpeed: string; // Rate of workers seeking Japan
  visaFocus: string; // SSW, TITP, IT Engineers
  challenges: string[];
  localCompetitorLandscape: string;
  marketPotentialCode: string;
  strategicAnalysis: string;
}

const COUNTRIES: CountryProfile[] = [
  {
    id: "vietnam",
    name: "Vietnam",
    rank: 1,
    badge: "Prime Launchpad • Highest Volume",
    learners: "~170,100 active learners",
    jobSeekersSpeed: "150,000+ yearly applicants",
    visaFocus: "TITP (Technical Intern) & SSW (Specified Skilled Worker) caregiving/hospitality",
    challenges: [
      "Pronunciation issues related to tonal vowel differences with flat Japanese syllables.",
      "High cultural expectation to pass N3/N2 fast, leading to passive vocabulary overload but minimal conversational speech.",
      "Severe gap in affordable native speaking mentors outside central Hanoi/HCM hubs."
    ],
    localCompetitorLandscape: "Offline rote-learning language academies and basic JLPT flashcard apps with zero speech assessment.",
    marketPotentialCode: "Massive B2B & B2C supply chain. Recruitment centers are highly motivated to buy corporate site-license seats of SpeakSensei to prep interns before Tokyo departures.",
    strategicAnalysis: "Vietnam represents the single largest supply channel of professional and technical workers moving into the Japanese economy. With high mobile density and strong government sponsorship of international work placement programs, it presents the absolute maximum immediate ARR potential for both B2C and corporate agency accounts."
  },
  {
    id: "indonesia",
    name: "Indonesia",
    rank: 2,
    badge: "Hyper Growth • Caregiving & Hospitality Hub",
    learners: "~120,500 active learners",
    jobSeekersSpeed: "85,000+ active candidates",
    visaFocus: "SSW nursing aid, hospitality, food processing, and marine workforce",
    challenges: [
      "Struggles with honorific levels (Keigo) due to differences in Sundanese/Javanese politeness models.",
      "Difficulty mastering complex Kanji writing systems alongside conversational responses.",
      "Lack of interactive, job-specific vocabulary training."
    ],
    localCompetitorLandscape: "Standard government-sponsored training institutes, limited digital alternatives.",
    marketPotentialCode: "Very High. High youth population with growing interest in Japanese pop-culture and professional opportunities. Ideal location for testing caregiver virtual reality scenarios.",
    strategicAnalysis: "Indonesia is experiencing an unprecedented surge in food services and healthcare migration to Japan. Since caregiving demands extremely warm, context-sensitive speaking abilities to talk with senior citizens, an AI speaking tutor with interactive voice feedback represents a vital validation tool."
  },
  {
    id: "india",
    name: "India",
    rank: 3,
    badge: "Premium High-Salary IT Hub",
    learners: "~45,000 active learners",
    jobSeekersSpeed: "30,000+ elite engineers & IT professionals",
    visaFocus: "Highly Skilled Professionals, Software Engineers, Data Architects",
    challenges: [
      "Significant differences in pitch accent. Flat English accents clash with Japanese high-low melodic contours.",
      "Lacks exposure to authentic Japanese startup/enterprise corporate culture prior to arrival.",
      "Traditional institutes focus on general reading, completely ignoring corporate communication and meetings."
    ],
    localCompetitorLandscape: "Corporate recruiters supplying custom training guides, premium offline centers in Bangalore/Pune.",
    marketPotentialCode: "Extreme Premium B2B value. Organizations will pay high pricing to ensure Indian technical hires can speak politely and collaborate with Japanese clients instantly.",
    strategicAnalysis: "While smaller in sheer headcount than Vietnam, Indian trainees are high-salary white-collar IT professionals. This market has the highest potential for SpeakSensei's $19.99/mo premium tier. It is the perfect region to validate our 'Job Interview at Sony HQ' and executive proposal scenarios."
  },
  {
    id: "philippines",
    name: "Philippines",
    rank: 4,
    badge: "Steady Talent Pipeline",
    learners: "~52,000 active learners",
    jobSeekersSpeed: "40,000+ work visa applicants",
    visaFocus: "Hostess, hotel attendants, care sector, and English assistant teachers (ALTs)",
    challenges: [
      "Frequent mixing of modern English syntactic markers (Taglish) inside polite Japanese sentences.",
      "Phonetic interference leading to over-enunciating syllables.",
      "Lack of continuous practice spaces to maintain conversational momentum."
    ],
    localCompetitorLandscape: "General recruitment agencies with short basic pre-departure classes, Duolingo.",
    marketPotentialCode: "High. Exceptional service orientation means high demand for polite Baito/customer service cashier simulators.",
    strategicAnalysis: "The Philippines is a major provider of service industry personnel to Japan. The target demographic is extremely familiar with remote, digital-first learning platforms. Gating localized waiter/hotel desk agent simulations yields high consumer retention rates."
  },
  {
    id: "nepal",
    name: "Nepal",
    rank: 5,
    badge: "Explosive Student Visa Flow",
    learners: "~40,000 active learners",
    jobSeekersSpeed: "25,000+ vocational school candidates",
    visaFocus: "Language academy visas, franchise quick-service restaurants, retail clerks",
    challenges: [
      "Extremely limited local budget. High sensitivity to premium priced tiers.",
      "Weak internet access in rural training centers.",
      "Intense pressure to clear immigration exams within a single semester."
    ],
    localCompetitorLandscape: "Low-cost local coaching centers, rudimentary free YouTube videos, dictionary apps.",
    marketPotentialCode: "Solid freemium reach. Great for building viral user growth but lower early paying transition conversion rate.",
    strategicAnalysis: "Nepal is sending a phenomenal ratio of student visa entries to Japan relative to its population size. Students typically start work at local Izakayas immediately upon landing. Providing highly realistic '7-Eleven cash-register training' is highly popular among Nepalese students."
  },
  {
    id: "bangladesh",
    name: "Bangladesh",
    rank: 6,
    badge: "Emerging IT & Skilled Manual Base",
    learners: "~12,500 active learners",
    jobSeekersSpeed: "8,000+ technical candidates",
    visaFocus: "SSW agricultural labor, manufacturing assembly, and junior web programmers",
    challenges: [
      "Lack of historical cultural exchange, resulting in a steeper learning curve.",
      "Scarce native Japanese materials in the Bengali language.",
      "Limited access to fast mobile browsers or dedicated pronunciation tools."
    ],
    localCompetitorLandscape: "Ad-hoc private centers, simple translated textbooks.",
    marketPotentialCode: "Pre-emergent. Perfect for gaining a supportive first-mover advantage as the Japanese government begins recognizing Bangladesh vocational centers.",
    strategicAnalysis: "Bangladesh has recently seen growing official coordination for SSW technical intakes. While still a nascent ecosystem compared to Vietnam, early partnerships with local universities can build brand loyalty and lock out competitor solutions early on."
  }
];

interface RubricCategory {
  id: string;
  nameJa: string;
  nameEn: string;
  evaluationCriteria: string;
  scoringGuide: {
    range: string;
    level: string;
    desc: string;
  }[];
  commonMistakes: {
    mistake: string;
    correction: string;
    why: string;
  }[];
  feedbackSystem: {
    trigger: string;
    exampleFeedback: string;
    toneAdvice: string;
  };
}

const RUBRICS: RubricCategory[] = [
  {
    id: "pronunciation",
    nameJa: "発音",
    nameEn: "Pronunciation (Hatsumon)",
    evaluationCriteria: "Accuracy of individual mora enunciation. Evaluates precise articulation of five core Japanese vowels, long vowels (長音), double consonant stops (促音 - e.g. っ), and syllabic nasals (撥音 - e.g. ん). Direct reflection of physical vocal effort and control over sound boundaries.",
    scoringGuide: [
      { range: "90 - 100", level: "Native-Equivalent (特上)", desc: "Flawless enunciation. Sokuon and Choon durations are mathematically correct (exactly 1:2 ratio). Minimal native ear strain, perfect phoneme separation." },
      { range: "75 - 89", level: "Proficient (上級)", desc: "Highly accurate and clear. Occasional slight vowel merging, but zero impact on lexical comprehension. Fully comfortable for any Japanese speaker." },
      { range: "60 - 74", level: "Satisfactory (一般)", desc: "Adequate intelligibility; however, struggles under speed with rapid double consonant stops or long vowel drops (e.g., pronouncing 'Kitte' [stamp] as 'Kite' [wearing])." },
      { range: "40 - 59", level: "Struggling (初歩)", desc: "Pronounces Japanese characters using native country's replacement sounds. High vocal flatting. Merges distinct vowels, resulting in frequent word duplication confusion." },
      { range: "0 - 39", level: "Severely Deficient (不可)", desc: "Intrusive mother-tongue phonology. Double stops and nasal bounds completely omitted, making speech largely unintelligible to Japanese native listeners." }
    ],
    commonMistakes: [
      { mistake: "Omitting double consonant stops (促音の脱落)", correction: "Pronouncing 'Yappari' with a sudden silent half-beat drop before the 'pa' sound rather than 'yapari'.", why: "English and other languages lack phonetic stops within words, leading to lazy consonant transitions." },
      { mistake: "Vowel shortening of long vowels (長音の短縮)", correction: "Saying 'Ooki-na' [large] with a sustained vowel sustain instead of 'Okina' [elderly man].", why: "Unfamiliarity with Japanese's strict time-duration (mora-timed) rhythm where vowel length changes lexical meaning." }
    ],
    feedbackSystem: {
      trigger: "Detected deletion of half-beat stops or shortened final state vowels.",
      exampleFeedback: "「切手 (きって)」とおっしゃいましたが、「きて」のように聞こえました。1拍（ワンビート）の無音状態を意識して、のどを詰めてみましょう。【発音アドバイス】",
      toneAdvice: "Encouraging but precise. Suggest physical clapping exercises to feel the mora durations visually."
    }
  },
  {
    id: "accent",
    nameJa: "高低アクセント",
    nameEn: "Pitch Accent (Pitch)",
    evaluationCriteria: "Use of word-level high-to-low pitch contours (Heiban, Atamadaka, Nakadaka, Odaka) instead of English-style stress accent (loudness). Correctly distinguishing homophones to ease comprehension.",
    scoringGuide: [
      { range: "90 - 100", level: "Native-Equivalent (特上)", desc: "Masterful melodic flow. Accurate pitch drops with a flat Heiban line. Distinguishes homophones ('hashi' as bridge/chopsticks/edge) effortlessly." },
      { range: "75 - 89", level: "Proficient (上級)", desc: "Minor contour slips that are corrected instantly or do not alter semantic intent. Melodic rises and drops are comfortable." },
      { range: "60 - 74", level: "Satisfactory (一般)", desc: "Imposes foreign stress (forte/volume) accents on Japanese syllables. Conversational comprehension is possible but causes listening fatigue for natives over time." },
      { range: "40 - 59", level: "Struggling (初歩)", desc: "Erratic pitch heights or uniformly monotone output. Consistently flatlines or places volume-peaks in words, sounding heavily foreign." },
      { range: "0 - 39", level: "Severely Deficient (不可)", desc: "Total disregard for pitch boundaries. High-low contrasts are reversed or omitted, leading to speech that sounds unnatural or confusing." }
    ],
    commonMistakes: [
      { mistake: "Foreign stress-accent superimposition (強弱アクセントの混入)", correction: "Pronouncing 'Nihongo' with a flat, light, musical flow rather than hitting 'hon' with extreme volume.", why: "English and most European languages use dynamic loudness peaks to mark word emphasis, which disrupts flat Japanese." },
      { mistake: "Failing Heiban-vocal flatlining (平板型アクセントの起伏化)", correction: "Maintaining a completely flat pitch for 'Tomodachi' (friend) starting low and rising slightly, rather than dropping the pitch at 'da'.", why: "Habit of adding dramatic curves to general phrases based on English sentence melody." }
    ],
    feedbackSystem: {
      trigger: "Injected stress/intensity spikes or inverse pitch fall boundaries.",
      exampleFeedback: "「日本語 (にほんご)」のアクセントが「ほん」で高くなっています。日本語には強弱のアクセントがありません。平ら（Heiban）に、メロディーのように流れる発音を意識しましょう。",
      toneAdvice: "Scientific and visual. Map out the high-low positions of the syllables using up/down arrow indicators."
    }
  },
  {
    id: "fluency",
    nameJa: "流暢さ",
    nameEn: "Fluency (Ryucho-sa)",
    evaluationCriteria: "The continuous speed of verbal processing, speech naturalness, use of fillers, and avoidance of long micro-pauses or jarring mid-sentence halts. Tracks cognitive-speaking latency and real-time processing capability.",
    scoringGuide: [
      { range: "90 - 100", level: "Native-Equivalent (特上)", desc: "Effortless, natural rhythmic flow (110+ words per minute). Correct contextual use of authentic Japanese fillers ('eeto', 'ano', 'sou desu ne') to plan speech." },
      { range: "75 - 89", level: "Proficient (上級)", desc: "Consistent output speed with natural pauses. Self-corrections are performed smoothly without stalling the conversation flow." },
      { range: "60 - 74", level: "Satisfactory (一般)", desc: "Robotic sentence construction or halting. Speech features multiple planning gaps where translation layers must process grammar." },
      { range: "40 - 59", level: "Struggling (初歩)", desc: "Word-by-word segmented speaking. Halting pauses occur mid-phrase or within closely linked compound words." },
      { range: "0 - 39", level: "Severely Deficient (不可)", desc: "Excruciatingly slow; unable to form a complete syntactic clause. Long pauses of 5 seconds or more, with frequent breakdown of speech." }
    ],
    commonMistakes: [
      { mistake: "Using alien Western cognitive fillers (英語のフィラーの混入)", correction: "Replacing 'uh', 'um', 'like' with 'ええと (eeto)', 'あの (ano)', or 'そうですね (sou desu ne)'.", why: "Defaulting to native English cognitive markers unconsciously when searching for mental vocabulary." },
      { mistake: "Syntactic structure pausing (不適切な場所でのポーズ)", correction: "Keeping particles appended directly to nouns without pauses (e.g. 'watashi wa... [pause] Gakkou ni' instead of 'watashi... [pause] wa gakkou...').", why: "Not knowing that Japanese particles must be bound with the preceding noun in a single breath sweep (Bunsetsuki)." }
    ],
    feedbackSystem: {
      trigger: "Speech containing long mid-phrase halts or foreign fillers ('uh', 'like').",
      exampleFeedback: "セリフの途中で長い沈黙（ポーズ）がありました。「ええと」や「あの」といった日本語独自の相槌やフィラーを挟むと、沈黙を防ぎながら自然なつなぎを作ることができますよ。",
      toneAdvice: "Supportive and tactical. Provide high-use transition phrasings for workplace stalling techniques."
    }
  },
  {
    id: "vocabulary",
    nameJa: "語彙力",
    nameEn: "Vocabulary Range & Choice (Goi-ryoku)",
    evaluationCriteria: "Range and accuracy of vocabulary. Assesses appropriate register selection, precision of idioms, and situational terms (such as distinguishing Kango [Sino-Japanese] vs Wago [native-Japanese] based on context).",
    scoringGuide: [
      { range: "90 - 100", level: "Native-Equivalent (特上)", desc: "Expansive vocabulary. Selects rich, descriptive adjectives and specific nouns. Handles homonyms smoothly and crafts highly professional structures." },
      { range: "75 - 89", level: "Proficient (上級)", desc: "Good vocabulary depth. Can easily explain a concept using alternative words (circumlocution) if a specific term is forgot." },
      { range: "60 - 74", level: "Satisfactory (一般)", desc: "Repetitive word choices. Relies heavily on simple, overused words (e.g. 'yatsu', 'mono', 'ii', 'taihen') for all scenarios." },
      { range: "40 - 59", level: "Struggling (初歩)", desc: "Extremely narrow vocabulary inventory. Often uses incorrect primary categorizations, causing semantic confusion." },
      { range: "0 - 39", level: "Severely Deficient (不可)", desc: "Cannot recall basic everyday words, forcing a fallback to English nouns during simple conversations." }
    ],
    commonMistakes: [
      { mistake: "Vague, generalized word overload (抽象語・指示語の多用)", correction: "Using explicit nouns (e.g., 'kopii-shiki' or 'syuukei-hyou') rather than repeatedly calling everything 'yatsu' or 'mono' [thing].", why: "A safety mechanism of limited vocabularies to bypass specific noun recall." },
      { mistake: "Confusing active direction verbs (あげる/もらう/くれるの混同)", correction: "Correctly using 'kureru' when someone gives to you, and 'morau' when you receive, rather than saying 'A-san wa watashi ni agemashita'.", why: "Underestimating the absolute relational hierarchy required for Japanese active transaction verbs." }
    ],
    feedbackSystem: {
      trigger: "Repeated use of elementary descriptors or incorrect giver/receiver verbs.",
      exampleFeedback: "「山田さんが私にプレゼントをあげました」とおっしゃいましたが、この場合は「くれました（またはいただきました）」が適当です。主動的な恩恵の移動をもう一度整理しましょう。",
      toneAdvice: "Intellectual and enriching. Introduce higher-register Sino-Japanese (Kango) alternatives to replace simple Wago structures."
    }
  },
  {
    id: "grammar",
    nameJa: "文法",
    nameEn: "Grammatical Accuracy (Bunpo)",
    evaluationCriteria: "Strict correctness of grammatical rules. Includes appropriate Japanese particle selection (wa/ga, ni/e, de/o), correct verb tense conjugations (Te-form, causative, passive, potential), and accurate embedding of sub-clauses.",
    scoringGuide: [
      { range: "90 - 100", level: "Native-Equivalent (特上)", desc: "Flawless syntactical accuracy. Natural handling of passive-causative strings. Complex multi-clause constructions flow perfectly." },
      { range: "75 - 89", level: "Proficient (上級)", desc: "Excellent overall syntax. Occasional particle slip-ups under stress, but the overall sentence logic and structure remain clean." },
      { range: "60 - 74", level: "Satisfactory (一般)", desc: "Basic grammatical setups are sound, but struggles with advanced conjugations like causative (Saseru) or passive (Reru) structures." },
      { range: "40 - 59", level: "Struggling (初歩)", desc: "Inaccurate basic particle use (e.g., confusing 'ga' and 'wa') or flat conjugation forms that create semantic misunderstandings." },
      { range: "0 - 39", level: "Severely Deficient (不可)", desc: "Disorganized word paths. Omission of particles and random conjugation of verbs, mirroring native grammar patterns." }
    ],
    commonMistakes: [
      { mistake: "Topic Particle vs Subject Particle Confusion (は と が の混同)", correction: "Using 'ga' to introduce new information ('A-san ga kimasu') and 'wa' for known topic context ('Watashi wa...').", why: "English lacks equivalent particle markers, leading to arbitrary swapping of 'wa' and 'ga'." },
      { mistake: "Incorrect Double Causative Passive (使役受身の連結ミス)", correction: "Using 'Nomaserareta' instead of 'Nomisaseraremashita' correctly when forced to drink.", why: "Suffix stacks in Japanese verb tables are highly complex and easy to confuse." }
    ],
    feedbackSystem: {
      trigger: "Wrong particle choices or messy verb conjugations.",
      exampleFeedback: "「公園に散歩します」ではなく、「公園を（またはで）散歩します」が正しい表現です。移動の経路を示す「を」の用法を復習してみましょう。【文法レッスン】",
      toneAdvice: "Direct, pedagogical, and highly objective. Show the grammatical equation behind the adjustment."
    }
  },
  {
    id: "listening",
    nameJa: "聴解",
    nameEn: "Listening Comprehension (Chokai)",
    evaluationCriteria: "Ability to instantly parse spoken Japanese, extract key context, track double negatives, and detect implicit subtexts or high-context Japanese hints (e.g., understanding 'Chotto...' as a firm rejection).",
    scoringGuide: [
      { range: "90 - 100", level: "Native-Equivalent (特上)", desc: "Phenomenal auditory parsing. Instantly understands natural native speeds, slang, formal Keigo, and subtle indirect refusals." },
      { range: "75 - 89", level: "Proficient (上級)", desc: "Excellent command. Grasps general and specific info, though may rarely ask for spelling of highly obscure technical jargon." },
      { range: "60 - 74", level: "Satisfactory (一般)", desc: "Can follow clear Japanese spoken at standard speeds, but misses crucial double-negatives or implied subtexts when speed increases." },
      { range: "40 - 59", level: "Struggling (初歩)", desc: "Auditory speed is lagged. Needs speakers to talk extremely slowly with repeated pauses, or requires immediate text fallback overlays." },
      { range: "0 - 39", level: "Severely Deficient (不可)", desc: "Unable to understand simple task instructions or workplace questions even when repeated multiple times." }
    ],
    commonMistakes: [
      { mistake: "Taking high-context refusals literally (婉曲表現の直訳的理解)", correction: "Recognizing that 'Kentou shimasu' [We will study/consider it] almost always means 'No' in a B2B meeting.", why: "Western directness clashes with the Japanese culture of saving face and using indirect rejection patterns." },
      { mistake: "Double-Negative confusion (二重否定の誤訳)", correction: "Understanding 'Shinai de wa irarenai' with the logic of 'Must do' rather than 'Do not do'.", why: "Stacking negation syllables in Japanese requires rapid mental parsing that stumps translation minds." }
    ],
    feedbackSystem: {
      trigger: "User feedback indicating missing context from the examiner's previous line.",
      exampleFeedback: "取引先が「前処置については検討しておきます」と言ったのに対し、ポジティブに合意されたと誤認したようです。日本のビジネスでは、これは『婉曲的な拒絶・保留』を意味します。文脈を丁寧に読み取りましょう。",
      toneAdvice: "Analytical and culturally deep. Focus heavily on 'High-Context Society' interaction logic."
    }
  },
  {
    id: "conversation_ability",
    nameJa: "対話力",
    nameEn: "Conversation & Interaction (Taiwa-ryoku)",
    evaluationCriteria: "The ability to master turn-taking, execute conversational active listening cues (相槌 - Aizuchi, e.g. 'un', 'hee', 'naruhodo'), ask reciprocal follow-up questions, and maintain appropriate social engagement flow.",
    scoringGuide: [
      { range: "90 - 100", level: "Native-Equivalent (特上)", desc: "Exceptional turn-taking and conversational leadership. Employs backchannels (Aizuchi) with superb timing to make the counterpart comfortable." },
      { range: "75 - 89", level: "Proficient (上級)", desc: "Interactive and cooperative speaker. Maintains smooth dialogue rhythm, avoids monologues, and asks relevant questions." },
      { range: "60 - 74", level: "Satisfactory (一般)", desc: "Treats conversations like sequential monologues. Only speaks when direct questions are asked, failing to offer interactive flow or backchannels." },
      { range: "40 - 59", level: "Struggling (初歩)", desc: "Awkward transitions, frequent verbal interruptions, or long silent pauses when it is their turn to speak." },
      { range: "0 - 39", level: "Severely Deficient (不可)", desc: "One-way passive responder. Offers no active listening feedback, causing the partner of the conversation to feel completely ignored." }
    ],
    commonMistakes: [
      { mistake: "Conversation Silence / Omission of backchanneling (相槌の欠落による沈黙)", correction: "Nodding verbally with 'うん', 'はい', 'なるほど', or 'そうですね' every several seconds as the native speaks.", why: "In Western languages, injecting sounds under someone's speech is seen as an interruption, whereas in Japanese, silence signals lack of interest." },
      { mistake: "Unilateral monologue patterns (一方的な独白)", correction: "Briefly wrapping up responses and following up with 'A-san wa dou omoimasu ka?' to invite turn-taking.", why: "Using conversational safety blocks to speak as long as possible before being tested with questions." }
    ],
    feedbackSystem: {
      trigger: "Absolute silence during native audio playback, or zero question-asking behaviors.",
      exampleFeedback: "私が話している間、全く相槌がありませんでした。日本の会話では「へえ！」「そうなんですか」「なるほど」といった相槌を適度に挟まないと、相手は『怒っているか、話を聞いていない』と不安になりますよ。",
      toneAdvice: "Insightful and action-oriented. Provide an interactive backchannel dictionary of standard workplace cues."
    }
  },
  {
    id: "business_japanese",
    nameJa: "ビジネス日本語/敬語",
    nameEn: "Business & Keigo Register",
    evaluationCriteria: "Precision and appropriate execution of honorific registers. Checks proper distinguishing of Teineigo (polite), Sonkeigo (respectful - lifting up clients/bosses), and Kenjougo (humble - lowering down yourself/your internal team).",
    scoringGuide: [
      { range: "90 - 100", level: "Native-Equivalent (特上)", desc: "Flawless Keigo structure alignment. Correctly manages internal-external team identity boundaries (Uchi vs Soto) and treats clients with pristine humility." },
      { range: "75 - 89", level: "Proficient (上級)", desc: "Flawless polite language (Teineigo) with correct, though sometimes simple, honorific and humble switches. Zero major politeness breaches." },
      { range: "60 - 74", level: "Satisfactory (一般)", desc: "Struggles with dynamic Keigo. Accidental 'honorific-humble reverse' (e.g. elevating your own action to superior client, or humbling client's deeds)." },
      { range: "40 - 59", level: "Struggling (初歩)", desc: "Consistently drops down into casual language (Tameguchi) or plain verbs when speaking with clients or supervisors, creating an impolite tone." },
      { range: "0 - 39", level: "Severely Deficient (不可)", desc: "Utterly oblivious of politeness levels. Uses street-level language, causing extreme awkwardness or offense in any formal environment." }
    ],
    commonMistakes: [
      { mistake: "Wrong application of respectful form on oneself (自社・自分への尊敬語適用)", correction: "Saying 'Watashi ga osshaimashita' instead of 'Watashi ga moushimashita' [using humble form].", why: "Treating 'ossyaru' generally as the translation of 'to speak' rather than understanding its relational elevation." },
      { mistake: "Failing the Internal/External Boundary (内外境界：うち・そとの誤用)", correction: "Referring to your company's CEO as 'Yamada Shachou' or using Sonkeigo when describing his actions to an external client.", why: "Failing to learn that your internal boss must be humbled (treated as your internal team 'Uchi') when speaking with external business partners." }
    ],
    feedbackSystem: {
      trigger: "Misapplying Keigo levels or speaking casually to supervisors/clients.",
      exampleFeedback: "社外の取引先に対して、自分の上司を「山田社長がおっしゃいました」と紹介しています。社外の人と話す時は、社内の人間はすべて謙譲化（へりくだる）し、「社長の山田が申しました」とするのがマナーです。",
      toneAdvice: "Highly respectful and detailed. Focus on cultural framework shifting rather than just grammar structures."
    }
  },
  {
    id: "confidence",
    nameJa: "自信・態度",
    nameEn: "Confidence & Delivery (Jishin/Taido)",
    evaluationCriteria: "The assertiveness of spoken output. Measures sentence finality, clear vocal delivery, natural tone variation, and avoiding excessive, self-defeating apologies or quiet mumbling.",
    scoringGuide: [
      { range: "90 - 100", level: "Native-Equivalent (特上)", desc: "Extremely poised, assertive, and secure. Clear vocal modulation with firm verb endings. Uses polite assertions instead of fearful trails." },
      { range: "75 - 89", level: "Proficient (上級)", desc: "Maintains strong presence. Vocalizes clearly with minimal stuttering or panic filler usage." },
      { range: "60 - 74", level: "Satisfactory (一般)", desc: "Mumbles or trails off on critical verb endings (e.g., whispering '...to omoimasu ga...'). Speaks with a submissive or apologetic tone." },
      { range: "40 - 59", level: "Struggling (初歩)", desc: "Trembling tone or excessive apologetic framing (e.g., starting every single block with 'sumimasen, nihongo wa heta desu')." },
      { range: "0 - 39", level: "Severely Deficient (不可)", desc: "Whispering or stalling completely due to intense speech anxiety. Refuses to finish sentences." }
    ],
    commonMistakes: [
      { mistake: "Sentence finality whispering / Trailing off (文末のフェードアウト)", correction: "Clearly enunciating '...shimasu' or '...desu' with a firm, audible voice rather than letting it fade to a whisper.", why: "Fearing that the final grammar conjugation is wrong, learners unconsciously whisper it to hide the mistake." },
      { mistake: "Excessive, unnecessary apologetic preambles (自己卑下・過剰な謝罪フレーズの乱用)", correction: "Saying 'Hai, wakarimashita' directly instead of prefixing everything with 'Sumimasen, nihongo ga amari dekimasen ga...'.", why: "Using self-deprecation as a mental guard to lower expectations, which undermines professional business authority." }
    ],
    feedbackSystem: {
      trigger: "Very low volume signal, frequent 'nihongo heta' excuses, or extreme trails.",
      exampleFeedback: "文末の「〜と思います」がささやき声になり、聞き取りにくいです。間違えることを極度に恐れず、語尾までハキハキと話し切ることで、ビジネスパーソンとしての信頼感がグッと向上しますよ！",
      toneAdvice: "Highly empowering and positive. Remind the learner that confident confidence is more important than absolute particle perfection."
    }
  },
  {
    id: "response_relevance",
    nameJa: "適格性",
    nameEn: "Response Relevance & Focus",
    evaluationCriteria: "Precision of semantic alignment. Evaluates whether the user's answer directly answers the examiner's question, satisfies all situational constraints, and uses a structured presentation model (such as Kishoutenketsu).",
    scoringGuide: [
      { range: "90 - 100", level: "Native-Equivalent (特上)", desc: "Extremely relevant response. Addresses structural conditions instantly, remains concise, and maintains clear logical structure." },
      { range: "75 - 89", level: "Proficient (上級)", desc: "Directly answers the actual prompt, offering helpful context while avoiding long-winded off-topic detours." },
      { range: "60 - 74", level: "Satisfactory (一般)", desc: "Answers the general topic area, but misses fine-grained constraints (e.g., you were asked about timing, but you spent 90% of your speech talking about costs)." },
      { range: "40 - 59", level: "Struggling (初歩)", desc: "Heavily tangential or repetitive response. Answers with off-topic canned phrases prepared in advance." },
      { range: "0 - 39", level: "Severely Deficient (不可)", desc: "Total semantic mismatch. Answering a completely unrelated question, or providing canned answers that fail to fit the conversation." }
    ],
    commonMistakes: [
      { mistake: "Pre-memorized monologue dumping (用意した台本の垂れ流し)", correction: "Listening carefully to the specific follow-up question and adjusting your content directly to it, rather than repeating basic self-introductions (Jikoshoukai).", why: "Standard test preparation breeds a habit of dumping generic scripted answers regardless of slight prompt changes." },
      { mistake: "Tangential explanation loops (結論の引き伸ばしと脱線)", correction: "Stating your conclusion first using 'Ketsuron kara moushiagemasuto...' (From the conclusion...) and then expanding, aligning with workplace logic.", why: "Using high narrative preamble styles of your native language that don't match Japanese direct hierarchical expectations." }
    ],
    feedbackSystem: {
      trigger: "Output text having low semantic overlap with the prompt parameters.",
      exampleFeedback: "今回は『納期が遅れる理由』を尋ねましたが、言い訳 of 言葉（すみません、忙しくて…）ばかりが先行し、『具体的な原因』が伝わっていません。まず「理由は〇〇です」と結論から論理的に答えましょう。",
      toneAdvice: "Logical, structured, and strategic. Coach on using 'Ketsuron Kara' (Conclusion first) templates to ensure immediate alignment."
    }
  }
];

export default function ProductStrategy() {
  const [activeTab, setActiveTab] = useState<string>("market");
  const [selectedCountry, setSelectedCountry] = useState<string>("vietnam");
  const [selectedRubric, setSelectedRubric] = useState<string>("pronunciation");
  const [testScore, setTestScore] = useState<number>(85);

  const currentCountry = COUNTRIES.find(c => c.id === selectedCountry) || COUNTRIES[0];
  const currentRubric = RUBRICS.find(r => r.id === selectedRubric) || RUBRICS[0];

  const getAutoCritique = (score: number, rubric: typeof RUBRICS[0]) => {
    if (score >= 90) {
      return `【プロ試験官評価：特上級（${score}点）】\n素晴らしい表現力です。${rubric.nameJa}（${rubric.nameEn}）において、ネイティブスピーカーと遜色のない高度な発話処理能力が認められます。\n● 指導要領フィードバック：${rubric.scoringGuide[0].desc}`;
    } else if (score >= 75) {
      return `【プロ試験官評価：優秀級（${score}点）】\n非常に自然なコミュニケーションが可能です。${rubric.nameJa}において大抵の必要条件をクリアしています。指導要領：${rubric.scoringGuide[1].desc}\n● 改善の近道：『${rubric.commonMistakes[0].mistake}』に気をつけるだけで特上級（90点＋）に到達可能です。`;
    } else if (score >= 60) {
      return `【プロ試験官評価：一般級（${score}点）】\n日常の意思疎通に支障ありませんが、ビジネス場面や緊迫した対話ではやや不安が残ります。指導要領：${rubric.scoringGuide[2].desc}\n● 添削例：${rubric.feedbackSystem.exampleFeedback}`;
    } else if (score >= 40) {
      return `【プロ試験官評価：初歩級（${score}点）】\n母語の強い干渉、言葉の選択ミス、または発話の崩れが頻繁に発生します。指導要領：${rubric.scoringGuide[3].desc}\n● 改善トリガー：『${rubric.feedbackSystem.trigger}』の改善に集中訓練（指導方針：${rubric.feedbackSystem.toneAdvice}）を推奨します。`;
    } else {
      return `【プロ試験官評価：不可（${score}点）】\n意思疎通の構築が極めて困難です。日本語特有の音韻や文法体系の基礎から再学習が必要です。指導要領：${rubric.scoringGuide[4].desc}`;
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen font-sans border-t border-slate-200">
      <div className="max-w-6xl mx-auto px-4 py-8">
        
        {/* PM Header Banner */}
        <div className="bg-gradient-to-r from-teal-800 to-indigo-900 rounded-2xl p-8 md:p-12 text-white shadow-xl mb-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-6 opacity-10">
            <TrendingUp size={240} />
          </div>
          <div className="relative z-10 max-w-3xl">
            <span className="bg-teal-500/20 text-teal-300 font-mono text-xs uppercase tracking-widest px-3 py-1.5 rounded-full border border-teal-500/20 font-semibold inline-block mb-4">
              Senior PM Strategic Playbook
            </span>
            <h1 className="text-3xl md:text-5xl font-display font-medium tracking-tight leading-none mb-4">
              Re-Architecting Japanese Speaking Mastery
            </h1>
            <p className="text-slate-200 text-sm md:text-base leading-relaxed font-light">
              An expert strategic blueprint from the product leadership lines of <strong className="font-semibold text-white">Duolingo, Speak, ELSA Speak, and OpenAI</strong>. Addressing the cognitive, psychological, and situational gaps of contemporary Japanese language acquisition.
            </p>
          </div>
        </div>

        {/* Tab Selection */}
        <div className="flex flex-wrap gap-2 mb-8 bg-white p-1.5 rounded-xl border border-slate-200/80 shadow-sm">
          {[
            { id: "market", label: "Global Market Research", icon: Globe },
            { id: "rubric", label: "Examiner Rubric (0-100)", icon: Award },
            { id: "painpoints", label: "Learner Pain Points", icon: AlertCircle },
            { id: "gaps", label: "Competitor Analysis", icon: LayoutGrid },
            { id: "uniques", label: "Unique Innovations", icon: Sparkles },
            { id: "yc_moat", label: "YC Partner Moat (20 Features)", icon: Lightbulb },
            { id: "mvp", label: "MVP Spec", icon: Target },
            { id: "monetization", label: "Monetization Plan", icon: DollarSign },
            { id: "roadmap", label: "Unicorn Roadmap", icon: TrendingUp },
          ].map((tab) => {
            const IconComponent = tab.icon;
            const isSelected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs md:text-sm font-medium transition-all ${
                  isSelected 
                    ? "bg-teal-700 text-white shadow-md shadow-teal-700/10" 
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                }`}
              >
                <IconComponent size={16} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content Panels */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-10 min-h-[450px]">
          
          {/* THE NEW GLOBAL MARKET RESEARCH TAB */}
          {activeTab === "market" && (
            <div className="space-y-8 animate-fade-in">
              <div className="border-b border-slate-100 pb-4">
                <h2 className="text-2xl font-display font-semibold text-slate-900 flex items-center gap-2">
                  <Globe className="text-teal-600" />
                  Asian Talent Pipeline Research & Country Prioritizations
                </h2>
                <p className="text-slate-500 text-sm mt-1">
                  Macroeconomic metrics governing Specified Skilled Worker (SSW), student visa flows, and skilled engineering hiring networks to Japan.
                </p>
              </div>

              {/* Startup Priority Ranking Matrix */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 shadow-inner">
                <h3 className="text-sm font-mono font-bold uppercase tracking-wider text-teal-800 mb-3 flex items-center gap-1.5">
                  <Award size={15} />
                  Startup Entry-Market Prioritization Ranking (Best to Worst)
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-6 gap-2">
                  {COUNTRIES.map((cty) => (
                    <button
                      key={cty.id}
                      onClick={() => setSelectedCountry(cty.id)}
                      className={`p-3 rounded-lg text-center transition-all flex flex-col justify-between border ${
                        selectedCountry === cty.id 
                          ? "bg-teal-700 text-white border-teal-700 font-bold scale-[1.02] shadow-sm"
                          : "bg-white text-slate-700 border-slate-200 hover:border-slate-300"
                      }`}
                    >
                      <span className="text-[10px] font-mono block opacity-80">Rank {cty.rank}</span>
                      <span className="text-xs md:text-sm truncate block mt-0.5">{cty.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Detailed Country Profile Dashboard */}
              <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm grid md:grid-cols-3 gap-8">
                
                {/* Left Profile Overview */}
                <div className="space-y-4 md:border-r md:border-slate-100 md:pr-6">
                  <div>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider bg-teal-50 text-teal-700 px-2 py-1 rounded inline-block">
                      {currentCountry.badge}
                    </span>
                    <h3 className="text-3xl font-display font-bold text-slate-900 mt-2">{currentCountry.name}</h3>
                  </div>

                  <div className="space-y-3">
                    <div className="bg-slate-50 p-3 rounded-lg flex items-center justify-between text-xs font-semibold text-slate-700">
                      <span>🎯 Market Seekers Volume:</span>
                      <span className="text-slate-900 font-bold font-mono">{currentCountry.learners}</span>
                    </div>

                    <div className="bg-slate-50 p-3 rounded-lg flex items-center justify-between text-xs font-semibold text-slate-700">
                      <span>✈️ Job Applicants Loop:</span>
                      <span className="text-slate-800 font-mono text-xs">{currentCountry.jobSeekersSpeed}</span>
                    </div>

                    <div className="bg-slate-50 p-3 rounded-lg">
                      <span className="text-[10px] text-slate-500 font-mono block mb-1">Focus Visa Channels:</span>
                      <span className="text-xs font-semibold text-slate-800 leading-tight block">
                        {currentCountry.visaFocus}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Center / Right Content Info */}
                <div className="md:col-span-2 space-y-6">
                  
                  {/* Local Learner Gaps & Challenges */}
                  <div className="space-y-2">
                    <h4 className="text-xs font-mono font-bold text-rose-800 uppercase tracking-widest flex items-center gap-1.5">
                      <ShieldAlert size={14} className="text-rose-600" />
                      Main Regional Speaking Gaps & Challenges
                    </h4>
                    <ul className="space-y-2 pl-1">
                      {currentCountry.challenges.map((ch, idx) => (
                        <li key={idx} className="text-xs md:text-sm text-slate-600 flex gap-2 leading-relaxed">
                          <span className="text-rose-500 font-bold font-mono">×</span>
                          <span>{ch}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Existing Local Competitors */}
                  <div className="space-y-1 bg-slate-50 rounded-xl p-4 border border-slate-100">
                    <h4 className="text-[11px] font-mono font-black text-slate-500 uppercase tracking-widest block mb-1">
                      Existing Regional Competitor Status
                    </h4>
                    <p className="text-slate-600 text-xs md:text-sm leading-relaxed font-light">
                      {currentCountry.localCompetitorLandscape}
                    </p>
                  </div>

                  {/* Market Opportunities */}
                  <div className="space-y-2">
                    <h4 className="text-xs font-mono font-bold text-teal-800 uppercase tracking-widest flex items-center gap-1.5">
                      <Sparkles size={14} className="text-teal-600 animate-pulse" />
                      Market Opportunities & Key Integration Moat
                    </h4>
                    <p className="text-slate-600 text-xs md:text-sm leading-relaxed italic">
                      "{currentCountry.marketPotentialCode}"
                    </p>
                  </div>

                </div>

              </div>

              {/* Professional Strategic Synthesis */}
              <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-5 md:p-6 space-y-3">
                <h4 className="font-display font-semibold text-indigo-900 text-base flex items-center gap-2">
                  <Lightbulb className="text-indigo-600 animate-pulse" />
                  Market Researcher Playbook: Strategic Launch Advice
                </h4>
                <p className="text-slate-700 text-xs md:text-sm leading-relaxed">
                  <strong>The SSW and TITP Visa Catalyst</strong>: Japan is experiencing its most severe labor deficit in 50 years. The Japanese Ministry of Justice has approved unprecedented target quotas for South and Southeast Asia. 
                </p>
                <p className="text-slate-700 text-xs md:text-sm leading-relaxed">
                  By building a speaking tutor that provides interactive, job-specific vocabulary checklists (e.g., hospitality greetings, caregiving commands, factory safety manuals), SpeakSensei moves away from general consumer vocab and enters high-margin corporate licensing opportunities. We recommend launching B2C/B2B in <strong>Vietnam and Indonesia first</strong> for volume, while scaling the high-ticket corporate sales division in <strong>India</strong> for technology and IT talent pipelines.
                </p>
              </div>

            </div>
          )}

          {/* EXAMINER'S RUBRIC TAB */}
          {activeTab === "rubric" && (
            <div className="space-y-8 animate-fade-in">
              <div className="border-b border-slate-100 pb-4">
                <h2 className="text-2xl font-display font-semibold text-slate-900 flex items-center gap-2">
                  <Award className="text-teal-600 animate-pulse" />
                  AI Japanese Speaking Examiner & 10-Point Evaluation Matrix
                </h2>
                <p className="text-slate-500 text-sm mt-1">
                  A high-fidelity speech appraisal system modeled after native Japanese language professors and official immigration proficiency examiners.
                </p>
              </div>

              {/* Rubric Interactive Selector Matrix Grid */}
              <div className="grid md:grid-cols-3 gap-8">
                
                {/* Left Panel: 10 Categories List */}
                <div className="space-y-2">
                  <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 mb-3 px-1 block">
                    Select Evaluation Aspect
                  </h3>
                  <div className="flex flex-col gap-1.5 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                    {RUBRICS.map((rubric) => {
                      const isSelected = selectedRubric === rubric.id;
                      return (
                        <button
                          key={rubric.id}
                          onClick={() => setSelectedRubric(rubric.id)}
                          className={`w-full text-left p-3.5 rounded-xl transition-all border ${
                            isSelected
                              ? "bg-teal-700 hover:bg-teal-800 text-white border-teal-700/80 shadow-md font-medium"
                              : "bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200/80"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-mono opacity-85 block uppercase tracking-wider">
                              {rubric.id.replace("_", " ")}
                            </span>
                            <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded font-mono ${
                              isSelected ? "bg-teal-600 text-white border border-teal-500" : "bg-slate-200 text-slate-700"
                            }`}>
                              {rubric.nameJa}
                            </span>
                          </div>
                          <span className="text-xs md:text-sm font-semibold truncate block mt-1">
                            {rubric.nameEn}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Rubric Core Standard Gauge */}
                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 mt-4 space-y-2">
                    <span className="text-[10px] uppercase font-mono font-bold tracking-widest text-[#cf5817] block">CEFR / JLPT Correlation Standards</span>
                    <p className="text-slate-600 text-[11px] leading-relaxed">
                      Grading coordinates align dynamically with official guidelines. A score of <strong>80+</strong> translates directly to successful professional integration or B2C job execution in Japan.
                    </p>
                  </div>
                </div>

                {/* Right Panel: Detailed Active Rubric Insights */}
                <div className="md:col-span-2 space-y-8">
                  
                  {/* Category Header */}
                  <div className="bg-gradient-to-br from-slate-900 to-indigo-950 p-6 rounded-2xl text-white shadow-sm space-y-3 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-8 text-white/5 font-bold font-mono text-[120px] select-none pointer-events-none line-clamp-1">
                      {currentRubric.nameJa}
                    </div>
                    <div className="relative z-10 flex gap-2 items-center">
                      <span className="text-xs font-mono bg-teal-500/20 text-teal-300 font-bold px-2 py-0.5 rounded border border-teal-500/20">
                        {currentRubric.nameJa}
                      </span>
                      <span className="text-xs font-mono text-slate-400">Master Criterion Matrix</span>
                    </div>
                    <h3 className="text-xl md:text-2xl font-display font-semibold tracking-tight relative z-10">
                      {currentRubric.nameEn}
                    </h3>
                    <p className="text-slate-300 text-xs md:text-sm leading-relaxed font-light relative z-10">
                      {currentRubric.evaluationCriteria}
                    </p>
                  </div>

                  {/* 0 to 100 Scoring Table */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-mono font-bold text-slate-800 uppercase tracking-widest flex items-center gap-2">
                      <CheckCircle size={14} className="text-teal-600 animate-pulse" />
                      0 to 100 Grade-Breakdowns & Performance Levels
                    </h4>
                    <div className="border border-slate-200 rounded-xl overflow-hidden divide-y divide-slate-100 shadow-inner">
                      {currentRubric.scoringGuide.map((guide, idx) => (
                        <div key={idx} className="p-3 md:p-4 grid md:grid-cols-4 gap-3 bg-white hover:bg-slate-50/40 transition-colors">
                          <div className="flex flex-col justify-center">
                            <span className="text-xs font-mono font-bold text-teal-900 block bg-teal-50 px-2 py-1 rounded w-max">
                              Score: {guide.range}
                            </span>
                            <span className="text-[10px] font-mono text-slate-500 mt-1 uppercase block">
                              {guide.level}
                            </span>
                          </div>
                          <p className="md:col-span-3 text-xs md:text-sm text-slate-600 leading-relaxed font-light flex items-center">
                            {guide.desc}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Common Phonetic Pitfalls & National Native Mistakes */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-mono font-bold text-rose-800 uppercase tracking-widest flex items-center gap-2">
                      <ShieldAlert size={14} className="text-rose-600" />
                      Common candidate Mistakes & Remediation
                    </h4>
                    <div className="grid md:grid-cols-2 gap-4">
                      {currentRubric.commonMistakes.map((f, index) => (
                        <div key={index} className="border border-rose-100 rounded-xl p-4 bg-rose-50/20 relative overflow-hidden space-y-2">
                          <span className="text-[10px] font-mono font-bold bg-rose-100/60 text-rose-800 px-2.5 py-0.5 rounded inline-block">
                            Pitfall {index + 1}: {f.mistake}
                          </span>
                          <div className="text-xs font-medium text-slate-900">
                            <strong>Correction Blueprint:</strong> <span className="font-mono text-teal-800 italic">“{f.correction}”</span>
                          </div>
                          <p className="text-slate-500 text-[11px] leading-relaxed font-light">
                            <strong>Linguistic root:</strong> {f.why}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Dynamic Examiner Feedback Systems */}
                  <div className="bg-slate-50 border border-slate-200 p-5 rounded-xl space-y-3">
                    <h4 className="text-xs font-mono font-black text-slate-500 uppercase tracking-widest block">
                      AI Diagnostic Prompt Engine Configuration
                    </h4>
                    
                    <div className="grid md:grid-cols-3 gap-6 pt-1">
                      <div className="space-y-1">
                        <span className="text-[10px] font-mono text-slate-500 uppercase block">Trigger Condition:</span>
                        <p className="text-slate-700 text-xs font-semibold leading-relaxed">
                          {currentRubric.feedbackSystem.trigger}
                        </p>
                      </div>
                      <div className="bg-white p-3 rounded-lg border border-slate-200/60 shadow-sm md:col-span-2 space-y-1">
                        <span className="text-[10px] font-mono text-teal-600 uppercase font-bold block">Live Correction Stencil:</span>
                        <p className="text-slate-700 text-xs leading-relaxed italic font-light">
                          "{currentRubric.feedbackSystem.exampleFeedback}"
                        </p>
                        <span className="text-[9px] font-mono text-slate-400 block pt-1">
                          Tone Protocol: {currentRubric.feedbackSystem.toneAdvice}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* EXPERT HIGHLIGHT: CLINICAL ASSESSMENT SIMULATOR */}
                  <div className="bg-teal-50/50 border border-teal-200 rounded-2xl p-6 shadow-sm space-y-4">
                    <div className="flex items-center gap-2">
                      <Users className="text-teal-600 animate-pulse" size={18} />
                      <h4 className="font-display font-semibold text-teal-900 text-sm md:text-base">
                        Examiner Clinical Diagnostic Simulator
                      </h4>
                      <span className="text-[9px] font-mono bg-teal-100 text-teal-800 px-2 py-0.5 rounded-full">Interactive Playbench</span>
                    </div>
                    <p className="text-slate-700 text-xs leading-relaxed">
                      As a product analyst, adjust the candidate’s performance slider below to observe how the SpeakSensei AI grading examiner compiles real-time, professional clinical annotations exactly formatted according to our master rubric.
                    </p>

                    <div className="space-y-3 pt-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono text-slate-600 font-bold">Adjust Simulated Score:</span>
                        <span className="text-base font-mono font-black text-teal-700 bg-white border border-teal-200 px-3 py-1 rounded shadow-sm">
                          {testScore} / 100
                        </span>
                      </div>
                      <input
                        type="range"
                        min="10"
                        max="100"
                        value={testScore}
                        onChange={(e) => setTestScore(Number(e.target.value))}
                        className="w-full accent-teal-600 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                      />
                      <div className="flex justify-between text-[9px] font-mono text-slate-400 px-1">
                        <span>10 (Needs Instruction)</span>
                        <span>50 (Intermediate)</span>
                        <span>80 (Professional Minimum)</span>
                        <span>100 (Primacy Native)</span>
                      </div>
                    </div>

                    <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-inner">
                      <span className="text-[10px] font-mono text-indigo-600 uppercase font-bold block mb-1">Generated Clinical Annotations Output:</span>
                      <p className="text-slate-800 text-xs leading-relaxed font-mono whitespace-pre-wrap bg-slate-50 p-3 rounded border border-slate-100">
                        {getAutoCritique(testScore, currentRubric)}
                      </p>
                    </div>
                  </div>

                </div>

              </div>

            </div>
          )}

          {/* PAIN POINTS TAB */}
          {activeTab === "painpoints" && (
            <div className="space-y-8 animate-fade-in">
              <div className="border-b border-slate-100 pb-4">
                <h2 className="text-2xl font-display font-semibold text-slate-900 flex items-center gap-2">
                  <AlertCircle className="text-rose-500" />
                  The Silent Sufferers of Japanese Acquisition
                </h2>
                <p className="text-slate-500 text-sm mt-1">Why traditional curriculum design fails the ultimate speaking test.</p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                
                <div className="bg-rose-50/50 rounded-xl p-5 border border-rose-100 relative overflow-hidden">
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-rose-500 text-white rounded-lg font-mono font-bold text-xs">01</div>
                    <div className="space-y-1.5">
                      <h3 className="font-semibold text-slate-900 text-base">The JLPT "Paper Tiger" Paradox</h3>
                      <p className="text-slate-600 text-xs md:text-sm leading-relaxed">
                        Passing high levels (N2 or N1) requires immense passive memorization of Kanji and obscure grammar constructs. Since JLPT tests contain <strong>zero speaking or active conversational testing</strong>, certified learners often struggle to ask for directions or converse during lunch.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-rose-50/50 rounded-xl p-5 border border-rose-100 relative overflow-hidden">
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-rose-500 text-white rounded-lg font-mono font-bold text-xs">02</div>
                    <div className="space-y-1.5">
                      <h3 className="font-semibold text-slate-900 text-base">Keigo (Honorific) Paralysis</h3>
                      <p className="text-slate-600 text-xs md:text-sm leading-relaxed">
                        Japanese business demands strict mastery of politeness levels: <em>Teineigo</em> (polite), <em>Sonkeigo</em> (respectful), and <em>Kenjougo</em> (humble). Fearing that saying a verb in standard form to a client is a severe cultural insult, learners completely freeze.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-rose-50/50 rounded-xl p-5 border border-rose-100 relative overflow-hidden">
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-rose-500 text-white rounded-lg font-mono font-bold text-xs">03</div>
                    <div className="space-y-1.5">
                      <h3 className="font-semibold text-slate-900 text-base">Pitch-Accent & Intonation Fear</h3>
                      <p className="text-slate-600 text-xs md:text-sm leading-relaxed">
                        Unlike English, Japanese relies heavily on pitch accents (high-low voice contours where <em>ame</em> is either "rain" or "candy" depending on the drops). Learners are aware of their flat accents and lack confidence to speak in public.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-rose-50/50 rounded-xl p-5 border border-rose-100 relative overflow-hidden">
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-rose-500 text-white rounded-lg font-mono font-bold text-xs">04</div>
                    <div className="space-y-1.5">
                      <h3 className="font-semibold text-slate-900 text-base">Low-Frequency Real Native Practice</h3>
                      <p className="text-slate-600 text-xs md:text-sm leading-relaxed">
                        Language exchanges often turn into English sessions. Professional tutors are expensive ($20-$40/hr) and scheduled, making spontaneous daily speaking trial-and-error impossible for standard working professionals.
                      </p>
                    </div>
                  </div>
                </div>

              </div>

              <div className="bg-slate-100 rounded-xl p-5 text-slate-700 text-xs md:text-sm font-mono flex items-center justify-between gap-4">
                <span>⚡ <strong>Learner Psychology Insight:</strong> Japanese culture places high social pressure on "saving face" and "wa" (social harmony). The product design must establish a safe, zero-judgment, highly context-aware playground to counter this core barrier.</span>
              </div>
            </div>
          )}

          {/* COMPETITOR ANALYSIS TAB */}
          {activeTab === "gaps" && (
            <div className="space-y-8 animate-fade-in">
              <div className="border-b border-slate-100 pb-4">
                <h2 className="text-2xl font-display font-semibold text-slate-900 flex items-center gap-2">
                  <LayoutGrid className="text-indigo-600" />
                  Competitor Matrix & Market Gaps
                </h2>
                <p className="text-slate-500 text-sm mt-1">Why existing products fallback to generalities instead of workplace readiness.</p>
              </div>

              {/* Competitive Comparison Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-mono text-xs">
                      <th className="py-3 px-4 font-semibold">Competitor</th>
                      <th className="py-3 px-4 font-semibold">Speaking Tech</th>
                      <th className="py-3 px-4 font-semibold">Keigo & Culture Assessment</th>
                      <th className="py-3 px-4 font-semibold">Real Workplace Contexts</th>
                      <th className="py-3 px-4 font-semibold">Critical Gaps</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr>
                      <td className="py-4 px-4 font-semibold text-slate-900 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-green-500 inline-block"></span>
                        Duolingo
                      </td>
                      <td className="py-4 px-4 text-slate-600">Simulated sentence translation speaking.</td>
                      <td className="py-4 px-4 text-rose-500 font-medium">None. Teaches flat Teineigo only.</td>
                      <td className="py-4 px-4 text-rose-500">None. Focuses on translation widgets.</td>
                      <td className="py-4 px-4 text-slate-500 text-xs">Too gamified, lacks professional context, no active open conversation.</td>
                    </tr>
                    <tr>
                      <td className="py-4 px-4 font-semibold text-slate-900 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-blue-500 inline-block"></span>
                        Speak
                      </td>
                      <td className="py-4 px-4 text-slate-600">Excellent voice engines for general English speech.</td>
                      <td className="py-4 px-4 text-slate-500">Basic conversational polite forms.</td>
                      <td className="py-4 px-4 text-slate-500">Casual daily conversations.</td>
                      <td className="py-4 px-4 text-slate-500 text-xs">Focuses heavily on English native markets. Lacks deep Keigo logic.</td>
                    </tr>
                    <tr>
                      <td className="py-4 px-4 font-semibold text-slate-900 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-indigo-500 inline-block"></span>
                        ELSA Speak
                      </td>
                      <td className="py-4 px-4 text-slate-600">Industry-leading phoneme recognition engines.</td>
                      <td className="py-4 px-4 text-rose-500">No support / English only.</td>
                      <td className="py-4 px-4 text-rose-500">English business scenarios.</td>
                      <td className="py-4 px-4 text-slate-500 text-xs">Strictly optimized for English speech, leaving Eastern phonology untouched.</td>
                    </tr>
                    <tr className="bg-teal-50/40">
                      <td className="py-4 px-4 font-bold text-teal-900 flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-teal-600 inline-block animate-pulse"></span>
                        SpeakSensei (Ours)
                      </td>
                      <td className="py-4 px-4 text-teal-900 font-medium">Contextual LLM interaction (Gemini).</td>
                      <td className="py-4 px-4 text-teal-800 font-semibold bg-teal-100/50 rounded">Dynamic Keigo Safety Gauge.</td>
                      <td className="py-4 px-4 text-teal-900 font-semibold">Interactive roleplays (Interviews, Baito, Proposals).</td>
                      <td className="py-4 px-4 text-teal-900 font-medium">The definitive sweet spot. Combining LLM with structured rating dashboards.</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="space-y-4">
                <h3 className="text-base font-semibold text-slate-900">The Structural Gap:</h3>
                <p className="text-slate-600 text-xs md:text-sm leading-relaxed">
                  Most existing Japanese language apps build <strong>translation engines disguised as conversation apps</strong>. Users select cards, drop down answers, and match words, which only tests visual recall. To speak Japanese fluently, learners must active-generate complete sentences in structured social contexts with real-time cultural adjustments.
                </p>
              </div>
            </div>
          )}

          {/* UNIQUE INNOVATIONS */}
          {activeTab === "uniques" && (
            <div className="space-y-8 animate-fade-in">
              <div className="border-b border-slate-100 pb-4">
                <h2 className="text-2xl font-display font-semibold text-slate-900 flex items-center gap-2">
                  <Sparkles className="text-amber-500 animate-pulse" />
                  Product Differentiation & Moats
                </h2>
                <p className="text-slate-500 text-sm mt-1">Innovative, proprietary features that form a clear technical and pedagogical moat.</p>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                
                <div className="border border-slate-100 rounded-xl p-5 hover:border-slate-300 transition-all bg-white shadow-sm flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="w-10 h-10 bg-teal-50 rounded-lg flex items-center justify-center text-teal-600">
                      <Compass size={22} />
                    </div>
                    <h3 className="font-semibold text-slate-900 text-base">Real-time Keigo Hierarchy Adaptor</h3>
                    <p className="text-slate-500 text-xs leading-relaxed">
                      Our system doesn't just grade right/wrong. It analyzes the hierarchy distance: is the recipient your junior colleague, boss, or external client? It gives an interactive gauge on Sonkeigo vs Kenjougo choice.
                    </p>
                  </div>
                  <span className="text-[10px] text-teal-600 bg-teal-50 font-mono py-1 px-2 rounded mt-4 w-max">Pedagogical Moat</span>
                </div>

                <div className="border border-slate-100 rounded-xl p-5 hover:border-slate-300 transition-all bg-white shadow-sm flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="w-10 h-10 bg-indigo-50 rounded-lg flex items-center justify-center text-indigo-600">
                      <LayoutGrid size={22} />
                    </div>
                    <h3 className="font-semibold text-slate-900 text-base">Interactive Situational Context Branching</h3>
                    <p className="text-slate-500 text-xs leading-relaxed">
                      Instead of a script, the AI tutor responds dynamically to emotional cues, level of formality, and conversational tangents, simulating real unpredictable workplace occurrences.
                    </p>
                  </div>
                  <span className="text-[10px] text-indigo-600 bg-indigo-50 font-mono py-1 px-2 rounded mt-4 w-max">Generative Moat</span>
                </div>

                <div className="border border-slate-100 rounded-xl p-5 hover:border-slate-300 transition-all bg-white shadow-sm flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="w-10 h-10 bg-amber-50 rounded-lg flex items-center justify-center text-amber-600">
                      <Crown size={22} />
                    </div>
                    <h3 className="font-semibold text-slate-900 text-base">Kanji Furigana-Toggle UI Layer</h3>
                    <p className="text-slate-500 text-xs leading-relaxed">
                      Solves the reading barrier. Advanced learners can view raw Kanji, intermediate can toggle Furigana, and beginners can toggle complete Romaji & English translations on the fly.
                    </p>
                  </div>
                  <span className="text-[10px] text-amber-600 bg-amber-50 font-mono py-1 px-2 rounded mt-4 w-max">UX Moat</span>
                </div>

              </div>
            </div>
          )}

          {/* MVP SPECIFICATION */}
          {activeTab === "mvp" && (
            <div className="space-y-8 animate-fade-in">
              <div className="border-b border-slate-100 pb-4">
                <h2 className="text-2xl font-display font-semibold text-slate-900 flex items-center gap-2">
                  <Target className="text-teal-600" />
                  The MVP Design: SpeakSensei Beta
                </h2>
                <p className="text-slate-500 text-sm mt-1">Our target initial roll-out, optimized for core customer-validated learnings.</p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-slate-900">MVP Features Scope:</h3>
                  <div className="space-y-3">
                    {[
                      { title: "Structured Conversation Scenarios", desc: "Interactive presets centering on job interviews, baito cashier interactions, and corporate meetings." },
                      { title: "Real-time Voice Transcription", desc: "Leverages standard webkitSpeechRecognition for low-complexity instant speaking capability in standard browsers." },
                      { title: "Immediate Granular Corrections", desc: "Provides alternative native phrases, Keigo feedback, and naturalness evaluations instantly on every prompt." },
                      { title: "Detailed Session Assessment Scorecard", desc: "Provides high-quality modular scores (Grammar, Vocabulary, Politiness, Fluency) and CEFR level guidance upon completion." }
                    ].map((item, index) => (
                      <div key={index} className="flex gap-3">
                        <Check className="text-teal-600 mt-1 flex-shrink-0" size={16} />
                        <div>
                          <strong className="text-sm font-semibold text-slate-900 block">{item.title}</strong>
                          <span className="text-xs text-slate-600">{item.desc}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 space-y-4">
                  <h3 className="text-sm font-mono font-bold uppercase tracking-wider text-teal-800">Operational Target Validation</h3>
                  <p className="text-slate-600 text-xs md:text-sm leading-relaxed">
                    By launching this high-fidelity interactive tutor (exactly like the functional demo built in the beside tab), we validate critical user assumptions:
                  </p>
                  <ul className="text-slate-600 text-xs md:text-sm list-disc pl-5 space-y-2">
                    <li>Will learners speak aloud inside a web sandbox regularly?</li>
                    <li>How actionable is the Keigo correction dashboard for non-native engineers?</li>
                    <li>Does browser-synthesized voice speed up active speaking reaction times?</li>
                  </ul>
                  <div className="mt-4 p-3 bg-white border border-teal-100 rounded-lg flex items-center gap-3">
                    <CheckCircle className="text-teal-600 flex-shrink-0" size={18} />
                    <span className="text-xs text-slate-700 font-medium">This active workspace serves as our fully-functional MVP validation tool!</span>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* MONETIZATION PLAN */}
          {activeTab === "monetization" && (
            <div className="space-y-8 animate-fade-in">
              <div className="border-b border-slate-100 pb-4">
                <h2 className="text-2xl font-display font-semibold text-slate-900 flex items-center gap-2">
                  <DollarSign className="text-amber-600" />
                  Monetization Blueprint & Premium Gating
                </h2>
                <p className="text-slate-500 text-sm mt-1">Maximizing unit economics and business-to-business enterprise-wide adoption.</p>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                
                <div className="border border-slate-200 rounded-xl p-5 flex flex-col justify-between bg-slate-50/50">
                  <div className="space-y-3">
                    <span className="text-[10px] font-mono tracking-widest text-slate-500 uppercase bg-slate-100 px-2 py-1 rounded">Tier 1</span>
                    <h3 className="font-semibold text-slate-900 text-lg">Freemium Tier</h3>
                    <div className="text-2xl font-bold text-slate-900">$0 <span className="text-xs font-normal text-slate-500">/ forever</span></div>
                    <ul className="text-xs text-slate-600 space-y-2 pt-2 border-t border-slate-200">
                      <li className="flex items-center gap-2">✓ 2 Scenario limits per day</li>
                      <li className="flex items-center gap-2">✓ Standard conversational feedback</li>
                      <li className="flex items-center gap-2">✓ Browser Web Speech audio synth</li>
                    </ul>
                  </div>
                </div>

                <div className="border-2 border-teal-600 rounded-xl p-5 flex flex-col justify-between bg-white relative">
                  <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1 translate-y-3 mr-4 bg-teal-600 text-white font-mono text-[10px] uppercase font-bold px-2 py-1 rounded">Recommended</div>
                  <div className="space-y-3">
                    <span className="text-[10px] font-mono tracking-widest text-teal-600 uppercase bg-teal-50 px-2 py-1 rounded">Tier 2</span>
                    <h3 className="font-semibold text-slate-900 text-lg">Pro Speaking Coach</h3>
                    <div className="text-2xl font-bold text-slate-900">$19.99 <span className="text-xs font-normal text-slate-500">/ mo</span></div>
                    <ul className="text-xs text-slate-600 space-y-2 pt-2 border-t border-slate-200">
                      <li className="flex items-center gap-2">✓ Unlimited custom scenarios & roleplays</li>
                      <li className="flex items-center gap-2">✓ Premium AI voices & Pitch accent analysis</li>
                      <li className="flex items-center gap-2">✓ Detailed CEFR progress dashboard</li>
                      <li className="flex items-center gap-2">✓ Custom vocabulary bank flashcards</li>
                    </ul>
                  </div>
                </div>

                <div className="border border-indigo-200 rounded-xl p-5 flex flex-col justify-between bg-indigo-50/20">
                  <div className="space-y-3">
                    <span className="text-[10px] font-mono tracking-widest text-indigo-600 uppercase bg-indigo-50 px-2 py-1 rounded font-semibold">Tier 3</span>
                    <h3 className="font-semibold text-slate-900 text-lg">Enterprise SLA</h3>
                    <div className="text-2xl font-bold text-slate-900">$149 <span className="text-xs font-normal text-slate-500">/ user-mo</span></div>
                    <ul className="text-xs text-slate-600 space-y-2 pt-2 border-t border-slate-200">
                      <li className="flex items-center gap-2">✓ Corporate-specific onboarding simulations</li>
                      <li className="flex items-center gap-2">✓ HR recruiter dashboard & candidate logs</li>
                      <li className="flex items-center gap-2">✓ Compliance Keigo testing certifications</li>
                      <li className="flex items-center gap-2">✓ Dedicated account representative</li>
                    </ul>
                  </div>
                </div>

              </div>

              <div className="bg-amber-50/50 p-5 rounded-xl border border-amber-100 flex gap-4 items-start text-xs md:text-sm text-amber-900">
                <Crown className="text-amber-600 flex-shrink-0 mt-0.5" size={18} />
                <div className="space-y-1">
                  <strong>Corporate Moat Expansion:</strong> In Japan, companies (especially tech companies like Rakuten or Mercari) hire hundreds of global developers yearly who need intensive cultural and workplace Japanese integration. B2B enterprise setups will represent 70% of SpeakSensei's ultimate ARR.
                </div>
              </div>
            </div>
          )}

          {/* GROWTH ROADMAP */}
          {activeTab === "roadmap" && (
            <div className="space-y-8 animate-fade-in">
              <div className="border-b border-slate-100 pb-4">
                <h2 className="text-2xl font-display font-semibold text-slate-900 flex items-center gap-2">
                  <TrendingUp className="text-indigo-600" />
                  Unicorn Growth Roadmap: SpeakSensei Roadmap
                </h2>
                <p className="text-slate-500 text-sm mt-1">Tactical milestones showing our progress from simple workspace validation to global platform leadership.</p>
              </div>

              <div className="relative border-l border-slate-200 pl-8 ml-4 space-y-8 py-2">
                
                <div className="relative">
                  <span className="absolute -left-12 top-0.5 flex h-8 w-8 items-center justify-center rounded-full bg-teal-600 text-white font-mono text-xs font-bold ring-8 ring-white shadow-md">1</span>
                  <div>
                    <h4 className="font-semibold text-slate-900 text-base flex items-center gap-2">
                      Phase 1: Interactive MVP Release & Validation
                      <span className="text-[10px] bg-teal-100 text-teal-800 px-2 py-0.5 rounded font-mono font-medium">Completed</span>
                    </h4>
                    <p className="text-xs text-amber-800 font-mono mt-1">Timeline: Months 1 - 3 • Current State</p>
                    <p className="text-slate-600 text-xs md:text-sm mt-1.5 leading-relaxed">
                      Launching our full-stack web interactive prototype inside Google AI Studio. Validating instant corrective analysis feedback, Kanji-Furigana togglers, and multi-scenario speaking engines.
                    </p>
                  </div>
                </div>

                <div className="relative">
                  <span className="absolute -left-12 top-0.5 flex h-8 w-8 items-center justify-center rounded-full bg-slate-200 text-slate-700 font-mono text-xs font-bold ring-8 ring-white shadow-sm">2</span>
                  <div>
                    <h4 className="font-semibold text-slate-900 text-base">
                      Phase 2: Proprietary Pitch-Accent Graph & Native Apps
                    </h4>
                    <p className="text-xs text-indigo-800 font-mono mt-1">Timeline: Months 4 - 9</p>
                    <p className="text-slate-600 text-xs md:text-sm mt-1.5 leading-relaxed">
                      Deploying optimized iOS/Android mobile apps. Incorporating native high-low pitch contour visualizers and ultra-premium voice synthesis utilizing low-latency web sockets.
                    </p>
                  </div>
                </div>

                <div className="relative">
                  <span className="absolute -left-12 top-0.5 flex h-8 w-8 items-center justify-center rounded-full bg-slate-200 text-slate-700 font-mono text-xs font-bold ring-8 ring-white shadow-sm">3</span>
                  <div>
                    <h4 className="font-semibold text-slate-900 text-base">
                      Phase 3: B2B Enterprise Compliance API & Corp Packs
                    </h4>
                    <p className="text-xs text-indigo-800 font-mono mt-1">Timeline: Months 10 - 18</p>
                    <p className="text-slate-600 text-xs md:text-sm mt-1.5 leading-relaxed">
                      Licensing customized company-onboarding models. Enabling corporations to upload internally specific documents, product listings, or workspace Slack behaviors for automated personnel evaluation.
                    </p>
                  </div>
                </div>

                <div className="relative">
                  <span className="absolute -left-12 top-0.5 flex h-8 w-8 items-center justify-center rounded-full bg-slate-200 text-slate-700 font-mono text-xs font-bold ring-8 ring-white shadow-sm">4</span>
                  <div>
                    <h4 className="font-semibold text-slate-900 text-base">
                      Phase 4: Mixed Reality Spatial Immersion
                    </h4>
                    <p className="text-xs text-indigo-800 font-mono mt-1">Timeline: Years 2 - 3</p>
                    <p className="text-slate-600 text-xs md:text-sm mt-1.5 leading-relaxed">
                      Launching Spatial Audio Vision-Pro and Quest simulations. Learners stand physically inside a virtual office, restaurant, or interview room, experiencing realistic social cues and physiological speaking challenges.
                    </p>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* YC PARTNER MOAT TAB */}
          {activeTab === "yc_moat" && (
            <div className="space-y-8 animate-fade-in text-slate-800">
              <div className="border-b border-slate-100 pb-4">
                <div className="flex items-center gap-2">
                  <span className="bg-orange-500 text-white font-mono text-[9px] uppercase font-black px-2 py-0.5 rounded shadow-sm animate-pulse">
                    YC MEMORANDUM
                  </span>
                  <span className="text-[11px] font-mono text-slate-500 font-semibold">CONFIDENTIAL INVESTMENT REVIEW</span>
                </div>
                <h2 className="text-2xl font-display font-semibold text-slate-900 flex items-center gap-2 mt-1">
                  <Lightbulb className="text-orange-500 animate-pulse" />
                  The SpeakSensei Moat Strategy: 20 Legacy Swapping Features
                </h2>
                <p className="text-slate-500 text-sm mt-1">
                  General language apps are fun hobbies. To build a venture-scale unicorn in the Japanese market, we must dominate the <strong>high-stakes economic transition</strong>: landing jobs, clearing recruitment filters, and communicating flawlessly in high-stress, corporate environments.
                </p>
              </div>

              {/* YC Thesis Block */}
              <div className="bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-100 rounded-2xl p-6 shadow-sm flex flex-col md:flex-row gap-6 items-center">
                <div className="bg-none p-4 rounded-xl flex-shrink-0 flex items-center justify-center">
                  <span className="text-3xl md:text-5xl font-black font-mono text-orange-600 block">Y<span className="text-slate-700">C</span></span>
                </div>
                <div className="space-y-1 text-slate-700 text-xs md:text-sm leading-relaxed">
                  <strong>The YC Thesis: Why Duolingo, ELSA, and Speak are Vulnerable.</strong>
                  <p className="text-slate-600 font-light mt-1">
                    Duolingo is gamified and serves high-churn casual hobbyists. ELSA is strictly optimized for Western English accent recognition patterns. Speak excels in general conversational English but ignores specific, high-context Japanese workplace hierarchy norms (Aizuchi pacing, Keigo, and the "Wa" code). 
                  </p>
                  <p className="text-orange-700 font-medium mt-1">
                    SpeakSensei builds an uncopyable competitive advantage by focusing directly on B2B licensing, job interview readiness, and high-context cultural coordination. Here are 20 premium features designed to trigger instant churn from mainstream apps.
                  </p>
                </div>
              </div>

              {/* Bento Grid: 20 Features grouped by theme */}
              <div className="space-y-8">
                
                {/* Theme 1 */}
                <div className="space-y-4">
                  <h3 className="text-base font-bold text-slate-900 flex items-center gap-2 border-b border-indigo-100 pb-2">
                    <span className="h-5 w-5 rounded-full bg-orange-100 text-orange-600 font-mono text-xs font-bold flex items-center justify-center">A</span>
                    Theme 1: Getting Jobs & Passing Corporate Interviews (経済的移行)
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {[
                      {
                        num: "01",
                        title: "Shinsotsu/Mid-Career Multi-Agent Interview Panel",
                        desc: "Adapts dynamically to a 3-examiner virtual hiring committee (HR Specialist, Department Chief, VP). Tests the rigorous etiquette of entry sequences, bowing verbalisms, Self-Intro, and Gakuchika (accomplishments).",
                        failure: "Duolingo tests simple translations; ELSA can't support multi-character interaction paths.",
                        moat: "Recreates the high-stress sensory atmosphere of traditional Shinsetsu, giving direct cultural readiness metrics."
                      },
                      {
                        num: "02",
                        title: "Reverse Job-Offer Voice Elevator Pitch",
                        desc: "Allows candidates to record a 1-minute profile pitch. Employs acoustic text embeddings to align candidate attributes directly with criteria of recruitment portals like Recruit or BizReach.",
                        failure: "Standard apps focus on basic passive word repetition.",
                        moat: "Direct job matching creates massive B2B partnerships with local HR agencies."
                      },
                      {
                        num: "03",
                        title: "Immigration Visa Defense Oral Coach",
                        desc: "Simulates actual oral interview scenarios with Japanese Immigration Services Agency officers for Specified Skilled Worker (SSW) and Technical Intern (TITP) visa clearance.",
                        failure: "Zero existing language apps address regulatory, state-level legal speaking preparation.",
                        moat: "Guarantees recruiters higher visa acceptance rates, ensuring enterprise pre-orders."
                      },
                      {
                        num: "04",
                        title: "Tech-Engineer Whiteboard Verbal Interpreter",
                        desc: "Interactive verbal sandbox for programmers. Forces developers to explain algorithmic complexity (Big-O notation, memory constraints) using highly specific Japanese technical phrasing.",
                        failure: "Mainstream tutors only teach general conversational food/travel nouns.",
                        moat: "Locks in top-tier Western/Indian software candidates moving into Tokyo's tech startup clusters."
                      }
                    ].map((f, i) => (
                      <div key={i} className="bg-slate-50 border border-slate-200/80 rounded-xl p-5 hover:border-slate-300 transition-all space-y-3 shadow-sm">
                        <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                          <span className="font-mono text-xs font-bold text-orange-600">Feature {f.num}</span>
                          <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest font-semibold bg-white border border-slate-200 px-2 py-0.5 rounded">Jobs & Interviews</span>
                        </div>
                        <h4 className="font-semibold text-slate-900 text-sm">{f.title}</h4>
                        <p className="text-xs text-slate-600 leading-normal font-light">{f.desc}</p>
                        <div className="bg-white rounded p-3 border border-slate-200 text-[10.5px] space-y-1.5 font-mono shadow-inner">
                          <div><span className="text-red-500 font-bold">● Competitor Trap:</span> <span className="text-slate-600">{f.failure}</span></div>
                          <div><span className="text-teal-600 font-bold">✓ SpeakSensei Advantage:</span> <span className="text-slate-800">{f.moat}</span></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Theme 2 */}
                <div className="space-y-4 pt-4">
                  <h3 className="text-base font-bold text-slate-900 flex items-center gap-2 border-b border-indigo-100 pb-2">
                    <span className="h-5 w-5 rounded-full bg-indigo-100 text-indigo-600 font-mono text-xs font-bold flex items-center justify-center">B</span>
                    Theme 2: High-Context Workplace Communication (実務ビジネス敬語)
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {[
                      {
                        num: "05",
                        title: "Interactive Recipient Keigo Slider",
                        desc: "Visual slider matching the hierarchical stature of the listener. Candidates state a message, and as they slide the scale from Peer to Boss to CEO, the text dynamically refines from Casual -> Teineigo -> Sonkeigo -> Kenjougo.",
                        failure: "General models mix up honorific contexts, leading to embarrassing workplace insults.",
                        moat: "Immediate spatial awareness of social status is a proprietary pedagogical framework."
                      },
                      {
                        num: "06",
                        title: "Polite Register Consensus Builder (Nemawashi / Ringi System)",
                        desc: "Simulates pre-meeting alignments (*Nemawashi*). Grades the user's ability to pitch ideas indirectly, gather silent consensus, and process draft approvals (*Ringisho*) without causing public dispute.",
                        failure: "Foreign developers are routinely fired for violating indirect decision-making protocols.",
                        moat: "Teaches authentic office politics, not just school vocabulary."
                      },
                      {
                        num: "07",
                        title: "Telephone Backchannel (Aizuchi) Speed Trainer",
                        desc: "Visual / voice prompts simulate spontaneous office phone calls. The engine measures vocal latency down to the millisecond, scoring candidates on timely polite conversational feedback (e.g., *Hai*, *Sayo de gozaimasu ka*).",
                        failure: "Speak and ELSA support silent pausing, which Japanese ears define as rude hesitation.",
                        moat: "Trains essential non-verbal back-channel habits crucial to professional tele-meetings."
                      },
                      {
                        num: "08",
                        title: "Slack/Teams Voice-to-Mail Polishing Copilot",
                        desc: "An internal integration allowing busy remote workers to dictate hot-headed frustration verbally, automatically converting the audio into structured, formal Japanese email and Slack memos.",
                        failure: "Modern translation utilities output clinical, dry, or overly generic textbook models.",
                        moat: "Direct daily utility tool. Deeply embedded into the engineering workflow."
                      }
                    ].map((f, i) => (
                      <div key={i} className="bg-slate-50 border border-slate-200/80 rounded-xl p-5 hover:border-slate-300 transition-all space-y-3 shadow-sm">
                        <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                          <span className="font-mono text-xs font-bold text-indigo-600">Feature {f.num}</span>
                          <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest font-semibold bg-white border border-slate-200 px-2 py-0.5 rounded">Workplace Keigo</span>
                        </div>
                        <h4 className="font-semibold text-slate-900 text-sm">{f.title}</h4>
                        <p className="text-xs text-slate-600 leading-normal font-light">{f.desc}</p>
                        <div className="bg-white rounded p-3 border border-slate-200 text-[10.5px] space-y-1.5 font-mono shadow-inner">
                          <div><span className="text-red-500 font-bold">● Competitor Trap:</span> <span className="text-slate-600">{f.failure}</span></div>
                          <div><span className="text-teal-600 font-bold">✓ SpeakSensei Advantage:</span> <span className="text-slate-800">{f.moat}</span></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Theme 3 */}
                <div className="space-y-4 pt-4">
                  <h3 className="text-base font-bold text-slate-900 flex items-center gap-2 border-b border-indigo-100 pb-2">
                    <span className="h-5 w-5 rounded-full bg-teal-100 text-teal-600 font-mono text-xs font-bold flex items-center justify-center">C</span>
                    Theme 3: Overcoming Psychological Barriers & Real-life Confidence (実戦面での自信)
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {[
                      {
                        num: "09",
                        title: "Izakaya Tavern Auditory Background Simulator",
                        desc: "Simulates chaotic, high-frequent, multi-character speaking contexts under intense background banter and clinking drink noises. Prepares learners to hold active conversations during company social outings.",
                        failure: "Standard speech checkers require pristine, ultra-quiet studio environments.",
                        moat: "Linguistic desensitization helps foreigners break isolation and join local teams socially."
                      },
                      {
                        num: "10",
                        title: "First-Responder Life-Support Emergency Roleplays",
                        desc: "High-stress physical safety voice modules: reporting lost residence cards at the local *Kōban* (police box), dealing with renting agents (*Fudousan*), or explaining sudden illness to hospital registrars.",
                        failure: "Language apps focus on buying coffee, leaving users stranded during real emergencies.",
                        moat: "High-utility life insurance features drive immediate organic user sharing."
                      },
                      {
                        num: "11",
                        title: "Visual Pitch Contour Wave Overlay",
                        desc: "Displays an SVG waveform mapping the candidate's voice contour directly on top of native Japanese phonetic contours. Highlights where flat/tonal foreign interference causes confusion.",
                        failure: "No competing Japanese app leverages acoustic pitch-envelope graphing.",
                        moat: "Instant physical representation of accents provides a strong reason to subscribe to Pro."
                      },
                      {
                        num: "12",
                        title: "Mora Rhythmic Beat Metronome",
                        desc: "A rhythmic clapping and enunciation engine. Grades candidates on their ability to structure syllables according to the strict Japanese mora-timed standard (e.g., catching internal mini-stops like *っ* and elongations).",
                        failure: "Mainstream transcription tools ignore silent periods and elongation errors.",
                        moat: "Builds absolute vocal control over speed variations, reducing native ear fatigue."
                      }
                    ].map((f, i) => (
                      <div key={i} className="bg-slate-50 border border-slate-200/80 rounded-xl p-5 hover:border-slate-300 transition-all space-y-3 shadow-sm">
                        <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                          <span className="font-mono text-xs font-bold text-teal-600">Feature {f.num}</span>
                          <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest font-semibold bg-white border border-slate-200 px-2 py-0.5 rounded">Social Confidence</span>
                        </div>
                        <h4 className="font-semibold text-slate-900 text-sm">{f.title}</h4>
                        <p className="text-xs text-slate-600 leading-normal font-light">{f.desc}</p>
                        <div className="bg-white rounded p-3 border border-slate-200 text-[10.5px] space-y-1.5 font-mono shadow-inner">
                          <div><span className="text-red-500 font-bold">● Competitor Trap:</span> <span className="text-slate-600">{f.failure}</span></div>
                          <div><span className="text-teal-600 font-bold">✓ SpeakSensei Advantage:</span> <span className="text-slate-800">{f.moat}</span></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Theme 4 */}
                <div className="space-y-4 pt-4">
                  <h3 className="text-base font-bold text-slate-900 flex items-center gap-2 border-b border-indigo-100 pb-2">
                    <span className="h-5 w-5 rounded-full bg-emerald-100 text-emerald-600 font-mono text-xs font-bold flex items-center justify-center">D</span>
                    Theme 4: Master Cultural Nuance & The "Wa" Principle (和と空気を読む)
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {[
                      {
                        num: "13",
                        title: '"Tatemae" Decoder & Honne / Tatemae Splitter',
                        desc: "Simulates indirect Japanese statements (e.g., 'Let me consider it positive-mindedly'). Teaches users to read between the lines, identifying whether the actual response is a soft rejection or a green light.",
                        failure: "General language apps take words literally, causing profound relationship damage.",
                        moat: "Unique cultural logic parser which gives users native-equivalent business wits."
                      },
                      {
                        num: "14",
                        title: "Corporate Apology Cadence Optimizer",
                        desc: "Scorers measuring formal regret phrasing (*Moushiwake gozaimasen*). Synchronizes timing with correct head drop pauses to represent maximum humility.",
                        failure: "Competing tools teach simple 'Gomen nasai', which is childish in a client crisis.",
                        moat: "Apologies are a critical high-exposure corporate procedure in Japan."
                      },
                      {
                        num: "15",
                        title: "Business Card Exchange Dialogue Loop",
                        desc: "Roleplay sequences centering around standard meishi exchange protocols, guiding users on proper card elevation, humble greetings, and sequence timing.",
                        failure: "Theoretical text guides can't teach the fast pacing of live physical transitions.",
                        moat: "Guarantees that foreign candidates pass their first 10 minutes of corporate introductions."
                      },
                      {
                        num: "16",
                        title: "Situational Room-Reading (Kuuki Yomu) Voice Scenarios",
                        desc: "Simulates awkward silences or high-stress office moments. Grades whether a candidate identifies the correct time to state an opinion, or if withholding comment is culturally superior.",
                        failure: "Standard prompts score grammatical correctness, completely ignoring situational social context.",
                        moat: "The ultimate tool for avoiding communication friction in traditional workspaces."
                      }
                    ].map((f, i) => (
                      <div key={i} className="bg-slate-50 border border-slate-200/80 rounded-xl p-5 hover:border-slate-300 transition-all space-y-3 shadow-sm">
                        <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                          <span className="font-mono text-xs font-bold text-emerald-600">Feature {f.num}</span>
                          <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest font-semibold bg-white border border-slate-200 px-2 py-0.5 rounded">Cultural Nuance</span>
                        </div>
                        <h4 className="font-semibold text-slate-900 text-sm">{f.title}</h4>
                        <p className="text-xs text-slate-600 leading-normal font-light">{f.desc}</p>
                        <div className="bg-white rounded p-3 border border-slate-200 text-[10.5px] space-y-1.5 font-mono shadow-inner">
                          <div><span className="text-red-500 font-bold">● Competitor Trap:</span> <span className="text-slate-600">{f.failure}</span></div>
                          <div><span className="text-teal-600 font-bold">✓ SpeakSensei Advantage:</span> <span className="text-slate-800">{f.moat}</span></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Theme 5 */}
                <div className="space-y-4 pt-4">
                  <h3 className="text-base font-bold text-slate-950 flex items-center gap-2 border-b border-indigo-100 pb-2">
                    <span className="h-5 w-5 rounded-full bg-rose-105 text-rose-600 font-mono text-xs font-bold flex items-center justify-center">E</span>
                    Theme 5: Enterprise-Grade Technical & Distribution Moats (B2B 企業用連携)
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {[
                      {
                        num: "17",
                        title: "Pre-Departure Agency Sourcing LMS",
                        desc: "Enables overseas sending agencies (Vietnam, Indonesia, etc.) to set up cohort spaces. Tracks, audits, and generates certifiable audio speaking logs before candidate visas are processed.",
                        failure: "General utilities lack administrative panels or group dashboard insights.",
                        moat: "Guarantees direct enterprise-level ARR and high market capture."
                      },
                      {
                        num: "18",
                        title: "Company-Onboarding Document-to-Scenario Compiler",
                        desc: "Allows corporate B2B clients to upload simple PDFs (e.g., cashier checklists, hotel greeting manuals). Instantly generates fully interactive voice roleplays matching specific workspace systems.",
                        failure: "Competing language startups require months of manual developer scripting.",
                        moat: "Zero manual intervention is required to scale corporate accounts from 10 to 1,000 employees."
                      },
                      {
                        num: "19",
                        title: "Regional Accent & Dialect Twin",
                        desc: "Allows learners to train against localized regional voices (Kansai-ben for Osaka restaurants, Tohoku-ben for Northern manual projects), preparing them for their exact destination city.",
                        failure: "Textbooks and mainstream utilities strictly teach standard Tokyo flat dialect.",
                        moat: "Saves manual interns from extreme isolation when encountering strong regional accents."
                      },
                      {
                        num: "20",
                        title: "AI Competency-to-Visa Sponsor Pipeline Router",
                        desc: "Leverages the student's speaking certificates and metrics records to match them directly to active Japanese hiring boards with pre-obtained visa sponsorship certificates.",
                        failure: "Mainstream apps are pure software utility products with no marketplace recruitment leg.",
                        moat: "Creates an end-to-end recruitment marketplace funnel, locking in high-value B2B margins."
                      }
                    ].map((f, i) => (
                      <div key={i} className="bg-slate-50 border border-slate-200/80 rounded-xl p-5 hover:border-slate-300 transition-all space-y-3 shadow-sm">
                        <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                          <span className="font-mono text-xs font-bold text-rose-600">Feature {f.num}</span>
                          <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest font-semibold bg-white border border-slate-200 px-2 py-0.5 rounded">Technical Moat</span>
                        </div>
                        <h4 className="font-semibold text-slate-900 text-sm">{f.title}</h4>
                        <p className="text-xs text-slate-600 leading-normal font-light">{f.desc}</p>
                        <div className="bg-white rounded p-3 border border-slate-200 text-[10.5px] space-y-1.5 font-mono shadow-inner">
                          <div><span className="text-red-500 font-bold">● Competitor Trap:</span> <span className="text-slate-600">{f.failure}</span></div>
                          <div><span className="text-teal-600 font-bold">✓ SpeakSensei Advantage:</span> <span className="text-slate-800">{f.moat}</span></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* GROWTH ROADMAP */}
          {activeTab === "roadmap" && (
            <div className="space-y-8 animate-fade-in">
              <div className="border-b border-slate-100 pb-4">
                <h2 className="text-2xl font-display font-semibold text-slate-900 flex items-center gap-2">
                  <TrendingUp className="text-indigo-600" />
                  Unicorn Growth Roadmap: SpeakSensei Roadmap
                </h2>
                <p className="text-slate-500 text-sm mt-1">Tactical milestones showing our progress from simple workspace validation to global platform leadership.</p>
              </div>

              <div className="relative border-l border-slate-200 pl-8 ml-4 space-y-8 py-2">
                
                <div className="relative">
                  <span className="absolute -left-12 top-0.5 flex h-8 w-8 items-center justify-center rounded-full bg-teal-600 text-white font-mono text-xs font-bold ring-8 ring-white shadow-md">1</span>
                  <div>
                    <h4 className="font-semibold text-slate-900 text-base flex items-center gap-2">
                      Phase 1: Interactive MVP Release & Validation
                      <span className="text-[10px] bg-teal-100 text-teal-800 px-2 py-0.5 rounded font-mono font-medium">Completed</span>
                    </h4>
                    <p className="text-xs text-amber-800 font-mono mt-1">Timeline: Months 1 - 3 • Current State</p>
                    <p className="text-slate-605 text-xs md:text-sm mt-1.5 leading-relaxed">
                      Launching our full-stack web interactive prototype inside Google AI Studio. Validating instant corrective analysis feedback, Kanji-Furigana togglers, and multi-scenario speaking engines.
                    </p>
                  </div>
                </div>

                <div className="relative">
                  <span className="absolute -left-12 top-0.5 flex h-8 w-8 items-center justify-center rounded-full bg-slate-200 text-slate-700 font-mono text-xs font-bold ring-8 ring-white shadow-sm">2</span>
                  <div>
                    <h4 className="font-semibold text-slate-900 text-base">
                      Phase 2: Proprietary Pitch-Accent Graph & Native Apps
                    </h4>
                    <p className="text-xs text-indigo-800 font-mono mt-1">Timeline: Months 4 - 9</p>
                    <p className="text-slate-605 text-xs md:text-sm mt-1.5 leading-relaxed">
                      Deploying optimized iOS/Android mobile apps. Incorporating native high-low pitch contour visualizers and ultra-premium voice synthesis utilizing low-latency web sockets.
                    </p>
                  </div>
                </div>

                <div className="relative">
                  <span className="absolute -left-12 top-0.5 flex h-8 w-8 items-center justify-center rounded-full bg-slate-200 text-slate-700 font-mono text-xs font-bold ring-8 ring-white shadow-sm">3</span>
                  <div>
                    <h4 className="font-semibold text-slate-900 text-base">
                      Phase 3: B2B Enterprise Compliance API & Corp Packs
                    </h4>
                    <p className="text-xs text-indigo-800 font-mono mt-1">Timeline: Months 10 - 18</p>
                    <p className="text-slate-605 text-xs md:text-sm mt-1.5 leading-relaxed">
                      Licensing customized company-onboarding models. Enabling corporations to upload internally specific documents, product listings, or workspace Slack behaviors for automated personnel evaluation.
                    </p>
                  </div>
                </div>

                <div className="relative">
                  <span className="absolute -left-12 top-0.5 flex h-8 w-8 items-center justify-center rounded-full bg-slate-200 text-slate-700 font-mono text-xs font-bold ring-8 ring-white shadow-sm">4</span>
                  <div>
                    <h4 className="font-semibold text-slate-900 text-base">
                      Phase 4: Mixed Reality Spatial Immersion
                    </h4>
                    <p className="text-xs text-indigo-800 font-mono mt-1">Timeline: Years 2 - 3</p>
                    <p className="text-slate-605 text-xs md:text-sm mt-1.5 leading-relaxed">
                      Launching Spatial Audio Vision-Pro and Quest simulations. Learners stand physically inside a virtual office, restaurant, or interview room, experiencing realistic social cues and physiological speaking challenges.
                    </p>
                  </div>
                </div>

              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
