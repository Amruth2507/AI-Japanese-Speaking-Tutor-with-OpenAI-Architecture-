export interface RoleplayScenario {
  id: string;
  title: string;
  category: "Business" | "Daily" | "Interview" | "Survival";
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  characterName: string;
  characterRole: string;
  description: string;
  culturalNote: string;
  initialPrompt: string;
  suggestedPhrases: string[];
}

export interface ChatMessage {
  id: string;
  sender: "tutor" | "user";
  text: string;
  translated?: string;
  romaji?: string;
  furigana?: string; // formatted breakdown
  timestamp: Date;
  analysis?: {
    naturalnessScore?: number;
    politenessAppropriate?: string;
    grammarFeedback?: string;
    vocabularySuggestions?: string;
    suggestedAlternative?: string;
  };
}

export interface ScenarioAssessment {
  cefrLevel: string;
  scores: {
    pronunciation: number;
    fluency: number;
    grammar: number;
    vocabulary: number;
    keigoBusiness: number;
  };
  overallVerdict: string;
  strengths: string[];
  weaknesses: string[];
  studyRecommendation: string;
}
