export const SITE_URL = "https://muhammadazeem.com"
export const GITHUB_URL = "https://github.com/AzeemChaudhry"
export const LINKEDIN_URL = "https://www.linkedin.com/in/chaudhryazeem/"
export const EMAIL = "chaudhry.azeem0308@gmail.com"

export interface Belief {
  title: string
  body: string
}

export const beliefs: Belief[] = [
  {
    title: "A model is a part, not a product.",
    body: "The value is in the pipeline around it: parsing, retrieval, fallbacks, the boring glue that makes an answer trustworthy.",
  },
  {
    title: "Retrieval is a data problem first.",
    body: "Before swapping embedding models, look at what you fed them. Most bad RAG answers start as a bad PDF parse.",
  },
  {
    title: "Agents need boring guardrails.",
    body: "Autonomy is exciting; predictability is what gets shipped. Fail closed, verify every step, then earn the freedom.",
  },
  {
    title: "Privacy is an architecture choice.",
    body: "If data can’t leave where it lives, move the training instead. That’s why I spent time on federated learning.",
  },
]

export type Diagram = { kind: "pipeline"; steps: string[] } | { kind: "federated" } | { kind: "wave" }

export interface Project {
  title: string
  tag: string
  where: string
  question: string
  story: string
  diagram: Diagram
  stat?: string
  statLabel?: string
  lesson: string
  link: string
}

export const projects: Project[] = [
  {
    title: "GovXprt + GovAI",
    tag: "Production RAG and a multi-agent assistant",
    where: "Data Insight · 2026",
    question: "A resident asks a simple question. The answer is buried somewhere in 70,000 government documents.",
    story:
      "GovXprt finds it and cites it, across 61 California counties. GovAI sits on top: a LangGraph team of planner, retrieval and domain agents that also call live government APIs.",
    diagram: {
      kind: "pipeline",
      steps: ["PDF / HTML", "layout-aware parse", "semantic chunks", "Gemini embed", "Vector Search", "cited answer"],
    },
    stat: "70K+",
    statLabel: "documents, every answer cited",
    lesson: "an answer without a source is just a guess.",
    link: GITHUB_URL,
  },
  {
    title: "SGVI MediPlan",
    tag: "Verification for LLM planning agents",
    where: "research",
    question: "An agent makes a plan. Who checks it before anyone acts on it?",
    story:
      "A framework that gates every step, routes by confidence and puts the plan in front of an adversarial critic. Each piece was tested in a controlled ablation study.",
    diagram: { kind: "pipeline", steps: ["plan step", "verify gate", "confidence route", "critic", "approved"] },
    stat: "5",
    statLabel: "failure modes targeted, 20 task ablation",
    lesson: "trust in an agent is something you measure.",
    link: GITHUB_URL,
  },
  {
    title: "GharDekho",
    tag: "Bilingual real estate voice agents",
    where: "voice agents",
    question: "Buyers switch between Urdu and English mid sentence. Most voice agents can’t keep up.",
    story:
      "I built the FastAPI backend and the conversation logic: two agent personas on Gemini, ElevenLabs for voice, webhook tool calls and structured buyer data out the other end.",
    diagram: { kind: "pipeline", steps: ["voice in", "Urdu ⇄ English", "Gemini", "tool call", "voice out"] },
    stat: "2",
    statLabel: "languages in one conversation",
    lesson: "the hard part of a voice agent is the conversation, not the voice.",
    link: GITHUB_URL,
  },
  {
    title: "Resume search",
    tag: "Natural language candidate search",
    where: "CARE · 2025",
    question: "“Find me someone who has shipped NLP.” Keyword search finds no one.",
    story:
      "OCR parsing, LLM guided field extraction and SentenceTransformer embeddings in Qdrant, ranked by meaning with weighted fields. It beat keyword search.",
    diagram: { kind: "pipeline", steps: ["PDF", "OCR parse", "LLM extract", "embed", "Qdrant", "ranked matches"] },
    lesson: "the parse decides the ceiling.",
    link: GITHUB_URL,
  },
  {
    title: "Federated learning",
    tag: "Privacy-preserving energy forecasting",
    where: "research build",
    question: "What if the data is never allowed to leave the building?",
    story:
      "Each client trains on its own IoT energy data and sends back only weights. FedAvg combines them, and a Docker, Jenkins and Kubernetes pipeline tracks every round, IID and non-IID.",
    diagram: { kind: "federated" },
    lesson: "privacy has a cost in coordination, and it’s worth designing for up front.",
    link: "https://github.com/AzeemChaudhry/Federated-Learning",
  },
  {
    title: "CT GAN",
    tag: "Physics-aware synthetic sensor data",
    where: "research",
    question: "Fake sensor data is easy. Fake data that still obeys physics is not.",
    story:
      "A GAN that finds causal links between IoT sensors with Granger tests and enforces physical constraints with a graph neural network.",
    diagram: { kind: "pipeline", steps: ["sensor series", "Granger causality", "GNN constraints", "synthetic series"] },
    stat: "96.39%",
    statLabel: "utility on a multi-sensor air quality dataset",
    lesson: "the structure between signals is the part worth keeping.",
    link: GITHUB_URL,
  },
  {
    title: "Story2Audio",
    tag: "Expressive storytelling speech",
    where: "NLP",
    question: "Text-to-speech can read a story. Can it tell one?",
    story:
      "It reads the narrative for context first, then shapes prosody and tone with SpeechT5 and Parler TTS before synthesising.",
    diagram: { kind: "wave" },
    stat: "<8s",
    statLabel: "per story",
    lesson: "“sounds right” is the hardest metric there is.",
    link: GITHUB_URL,
  },
]

export const alsoBuilt = [
  "Trawlkit, a crawler for AI data",
  "MAXFUSE malware classifier",
  "CTRAN intent and slot model",
  "Daraz recommendation chatbot",
  "Retail segmentation in Power BI",
]

export const path = [
  { when: "2022 to 2026", where: "FAST-NUCES", role: "BS Artificial Intelligence" },
  { when: "2024", where: "Atom Camp", role: "AI Intern → Junior Developer" },
  { when: "2025", where: "CARE", role: "AI Intern" },
  { when: "2026", where: "Data Insight", role: "AI Engineer", current: true },
]

export const tools = [
  "Python",
  "LangGraph",
  "Gemini",
  "Vertex AI Vector Search",
  "FastAPI",
  "Redis",
  "Qdrant",
  "PyTorch",
  "Hugging Face",
  "SentenceTransformers",
  "Docker",
  "Kubernetes",
  "Jenkins",
  "GitHub Actions",
  "SQL",
]

export type IntentId = "hiring" | "collab" | "curious"

export const intents: { id: IntentId; label: string; ask: string }[] = [
  {
    id: "hiring",
    label: "I’m hiring",
    ask: "I am considering him for an AI engineering role. Summarise what he has actually built, how deep his work in RAG, multi-agent systems (LangGraph) and LLM evaluation goes, where the evidence is thin, and five interview questions that would test him.",
  },
  {
    id: "collab",
    label: "I want to collaborate",
    ask: "I am thinking of collaborating with him on an AI project. What kinds of problems is he best suited to, how does he approach building systems, and what should we clarify before working together?",
  },
  {
    id: "curious",
    label: "I’m just curious",
    ask: "Give me an honest, critical overview of who he is as an engineer: his strongest project, what makes his approach distinctive, and what he should build next.",
  },
]

export function buildPrompt(intent: IntentId) {
  const ask = intents.find((i) => i.id === intent)?.ask ?? intents[0].ask
  return `Look at the portfolio of Muhammad Azeem Chaudhry, an AI engineer, at ${SITE_URL} and his GitHub at ${GITHUB_URL}. ${ask}`
}

export function assistantLinks(prompt: string) {
  const q = encodeURIComponent(prompt)
  return [
    { vendor: "OpenAI", name: "Ask ChatGPT", href: `https://chatgpt.com/?q=${q}` },
    { vendor: "Google", name: "Ask Gemini", href: `https://gemini.google.com/app?q=${q}` },
    { vendor: "Anthropic", name: "Ask Claude", href: `https://claude.ai/new?q=${q}` },
  ]
}
