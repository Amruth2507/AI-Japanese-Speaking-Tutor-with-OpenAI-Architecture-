import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());

const PORT = 3000;

// Initialize Gemini Client
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      "User-Agent": "aistudio-build",
    },
  },
});

// Roleplay scenario system instructions helper
function getSystemPrompt(scenario: string, proficiency: string) {
  return `You are an elite Japanese speaking tutor and assessor. You are roleplaying with the student.
Current Scenario: ${scenario}
Learner Proficiency Target Level: ${proficiency}

In this roleplay:
1. Play your character in the scenario naturally.
2. In your response, ALWAYS output valid JSON matching the schema of the response.
3. Keep your Japanese response conversational, realistic, and appropriate for the scenario.
4. If the scenario involves business or interviews, be appropriately polite (Keigo). For convenience store, use standard polite customer service (Teineigo/Baitogo). For casual watercooler chatter, use appropriate casual/friendly form.
5. Evaluate the student's message (if not empty) and provide structural grammar & Keigo correctness indicators.

Your response must be a JSON object with the following fields:
- "replyJapanese": "The tutor's reply strictly in Japanese.",
- "replyTranslated": "English translation of your reply.",
- "replyRomaji": "Romaji transcription of your reply.",
- "replyFurigana": "Your reply with Furigana formatting or words breakdown to assist reading.",
- "analysis": {
    "naturalnessScore": 1 to 100 on how natural the student's message was,
    "politenessAppropriateness": "Excellent / Needs Improvement / Neutral - explain why based on Keigo rules",
    "grammarFeedback": "Concise, constructive feedback in English about the student's grammar.",
    "vocabularySuggestions": "Suggestions of better/richer vocabulary words they could have used instead.",
    "suggestedAlternative": "Provide a much more natural, native-sounding sentence that they could have said instead of their message."
  }

If the user is starting the conversation ("STARTING_CONVERSATION"), play your role and introduce yourself or the scenario in character. In that case, set the analysis sub-fields to empty/neutral values since there is no user message yet.

CRITICAL: Return ONLY raw JSON, do not wrap in markdown \`\`\`json blocks or text.`;
}

// 1. Roleplay and Instant Chat Feedback Route
app.post("/api/tutor/chat", async (req, res) => {
  try {
    const { history, scenario, proficiency, userMessage } = req.body;

    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({ error: "Gemini API key is not configured in environment variables." });
    }

    const sysPrompt = getSystemPrompt(scenario, proficiency);

    // Format chat history for the prompt
    let formattedHistory = "";
    if (history && history.length > 0) {
      formattedHistory = history
        .map((msg: any) => `${msg.sender === "tutor" ? "Tutor" : "Student"}: ${msg.text}`)
        .join("\n");
    }

    const promptMessage = `
History:
${formattedHistory}

Student Sent: ${userMessage}

Process this inputs and generate your in-character roleplay response and feedback in JSON form.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: promptMessage,
      config: {
        systemInstruction: sysPrompt,
        responseMimeType: "application/json",
        // Force output schema
        responseSchema: {
          type: Type.OBJECT,
          required: ["replyJapanese", "replyTranslated", "replyRomaji", "replyFurigana", "analysis"],
          properties: {
            replyJapanese: { type: Type.STRING },
            replyTranslated: { type: Type.STRING },
            replyRomaji: { type: Type.STRING },
            replyFurigana: { type: Type.STRING },
            analysis: {
              type: Type.OBJECT,
              required: ["naturalnessScore", "politenessAppropriateness", "grammarFeedback", "vocabularySuggestions", "suggestedAlternative"],
              properties: {
                naturalnessScore: { type: Type.INTEGER },
                politenessAppropriateness: { type: Type.STRING },
                grammarFeedback: { type: Type.STRING },
                vocabularySuggestions: { type: Type.STRING },
                suggestedAlternative: { type: Type.STRING },
              },
            },
          },
        },
      },
    });

    const parsedData = JSON.parse(response.text || "{}");
    res.json(parsedData);
  } catch (err: any) {
    console.error("API Error in /api/tutor/chat:", err);
    res.status(500).json({ error: err.message || "Failed to process chat with tutoring API" });
  }
});

// 2. Full Conversation Overall Assessment Route
app.post("/api/tutor/evaluate-full", async (req, res) => {
  try {
    const { history, scenario, proficiency } = req.body;

    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({ error: "Gemini API key is not configured." });
    }

    if (!history || history.length < 2) {
      return res.status(400).json({ error: "Not enough conversation history to evaluate. Try exchanging a few messages first." });
    }

    const evaluationPrompt = `
You are an expert Japanese Speech and Language Assessor of CEFR and ACTFL standards.
Analyze the following roleplay conversation history between a Student and a Japanese Speak Tutor.

Scenario: ${scenario}
Target Proficiency: ${proficiency}

Conversation logs:
${history.map((msg: any) => `${msg.sender === "tutor" ? "Tutor" : "Student"}: ${msg.text}`).join("\n")}

Provide a meticulous assessment of the Student based on this dialogue. Assess cross-dimensional areas:
1. Pronunciation & Phonetics advice based on their text transcripts (highlight potential pitfalls for English/foreign speakers, pitch accent advice).
2. Fluency (coherence, hesitation fillers like 'ano...', 'eeto...').
3. Grammar precision (particle usage, conjugation).
4. Vocabulary selection.
5. Keigo/Business appropriateness (correct honorific conjugation: respectful, humble, polite).

Generate your report strictly in the requested JSON structure. Do not include markdown code block formatting.

JSON Schema:
{
  "cefrLevel": "e.g. A2, B1, B2, C1",
  "scores": {
    "pronunciation": 1 to 100,
    "fluency": 1 to 100,
    "grammar": 1 to 100,
    "vocabulary": 1 to 100,
    "keigoBusiness": 1 to 100
  },
  "overallVerdict": "A summary verdict rating their real-world readiness for this scenario.",
  "strengths": ["List of 2-3 specific strengths shown during this session"],
  "weaknesses": ["List of 2-3 specific weaknesses or Keigo usage errors shown"],
  "studyRecommendation": "Detailed personal action plan in English describing how they can study and master the gaps shown in this scenario."
}
    `;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: evaluationPrompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          required: ["cefrLevel", "scores", "overallVerdict", "strengths", "weaknesses", "studyRecommendation"],
          properties: {
            cefrLevel: { type: Type.STRING },
            scores: {
              type: Type.OBJECT,
              required: ["pronunciation", "fluency", "grammar", "vocabulary", "keigoBusiness"],
              properties: {
                pronunciation: { type: Type.INTEGER },
                fluency: { type: Type.INTEGER },
                grammar: { type: Type.INTEGER },
                vocabulary: { type: Type.INTEGER },
                keigoBusiness: { type: Type.INTEGER },
              },
            },
            overallVerdict: { type: Type.STRING },
            strengths: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
            },
            weaknesses: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
            },
            studyRecommendation: { type: Type.STRING },
          },
        },
      },
    });

    const parsedData = JSON.parse(response.text || "{}");
    res.json(parsedData);
  } catch (err: any) {
    console.error("API Error in /api/tutor/evaluate-full:", err);
    res.status(500).json({ error: err.message || "Failed to generate assessment" });
  }
});

// Setup Dev server with Vite or Static files for prod
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`AI Japanese Speaking Tutor Server running on http://localhost:${PORT}`);
  });
}

startServer();
