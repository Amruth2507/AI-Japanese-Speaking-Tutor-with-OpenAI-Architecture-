# AI Japanese Speaking Tutor

![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React_19-20232A?style=flat&logo=react&logoColor=61DAFB)
![Express](https://img.shields.io/badge/Express-000000?style=flat&logo=express&logoColor=white)
![Gemini](https://img.shields.io/badge/Gemini_API-8E75B2?style=flat&logo=googlegemini&logoColor=white)

An interactive **Japanese speaking tutor**. Learners practise real situations (job interviews, workplace conversations, convenience-store exchanges, casual chat) by voice or text, and the AI tutor replies in character while assessing every message.

## Features

- **Scenario roleplay:** the tutor plays a character and adapts politeness (Keigo, Teineigo or casual form) to the scenario and the learner's target level.
- **Structured feedback:** each reply is returned as JSON with Japanese, English, romaji and furigana, plus a naturalness score, politeness/Keigo assessment, grammar feedback, vocabulary suggestions and a more natural alternative sentence.
- **Voice in, voice out:** browser Speech Recognition for speaking practice and Speech Synthesis with a Japanese voice for playback.
- **Syllabus database:** curated practice content by level.
- **System design tab:** a production architecture for an OpenAI-based version (GPT-4o / GPT-4o-mini, Whisper, TTS or the Realtime API) with an interactive per-session cost model.
- **Product strategy tab:** positioning and roadmap analysis.

## Architecture

```
React 19 + Vite + Tailwind (client)
        │  /api/*
Express server (server.ts) ── Gemini API (@google/genai, JSON-schema responses)
```

The API key stays on the server; the browser only talks to the Express proxy.

## Run locally

**Prerequisites:** Node.js 18+

```bash
git clone https://github.com/Amruth2507/AI-Japanese-Speaking-Tutor-with-OpenAI-Architecture-.git
cd AI-Japanese-Speaking-Tutor-with-OpenAI-Architecture-
npm install
cp .env.example .env      # then set GEMINI_API_KEY
npm run dev               # http://localhost:3000
```

Production build: `npm run build && npm start`.
