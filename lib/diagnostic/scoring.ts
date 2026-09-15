import { diagnosticQuestions, OptionItem } from "@/data/diagnostic-questions";
import { solutionsData } from "@/data/solutions";

export interface DiagnosticState {
  answers: Record<string, string>; // questionId -> optionId
  userInfo?: {
    name?: string;
    company?: string;
    email?: string;
    phone?: string;
    website?: string;
  };
}

export interface ScoreResult {
  growScore: number;
  defineScore: number;
  buildScore: number;
  productizeScore: number;
  primaryCapability: "grow" | "define" | "build" | "productize";
  secondaryCapability: "grow" | "define" | "build" | "productize";
  confidence: "High" | "Medium" | "Low";
  recommendationTitle: string;
  recommendationDescription: string;
  proposedSteps: string[];
  suggestedLink: string;
  suggestedLinkText: string;
}

export function calculateDiagnosticScore(answers: Record<string, string>): ScoreResult {
  let grow = 0;
  let define = 0;
  let build = 0;
  let productize = 0;
  let totalAnswered = 0;

  diagnosticQuestions.forEach((q) => {
    const selectedOptionId = answers[q.id];
    if (selectedOptionId) {
      const option = q.options.find((opt) => opt.id === selectedOptionId);
      if (option) {
        totalAnswered++;
        grow += option.weights.grow;
        define += option.weights.define;
        build += option.weights.build;
        productize += option.weights.productize;
      }
    }
  });

  const scores = [
    { cap: "grow" as const, score: grow, data: solutionsData.grow },
    { cap: "define" as const, score: define, data: solutionsData.define },
    { cap: "build" as const, score: build, data: solutionsData.build },
    { cap: "productize" as const, score: productize, data: solutionsData.productize },
  ];

  scores.sort((a, b) => b.score - a.score);

  const primary = scores[0];
  const secondary = scores[1];

  let confidence: "High" | "Medium" | "Low" = "High";
  if (totalAnswered < 4) {
    confidence = "Low";
  } else if (primary.score - secondary.score < 15) {
    confidence = "Medium";
  }

  let title = `Primary Digital Path: ${primary.data.name} Solutions`;
  let description = `${primary.data.positioning} We recommend starting with our ${primary.data.name} capability to resolve immediate operational friction.`;
  let steps: string[] = [];
  let suggestedLink = `/solutions/${primary.cap}`;
  let suggestedLinkText = `Explore ${primary.data.name} Solutions`;

  if (primary.cap === "grow") {
    steps = [
      "Audit current SEO, search visibility, and conversion intake channels.",
      "Engineering high-converting landing pages and intent-driven search engine discoverability.",
      "Deploying analytics tracking to measure customer acquisition velocity.",
    ];
  } else if (primary.cap === "define") {
    steps = [
      "Clarify core brand positioning, value proposition, and audience messaging.",
      "Design durable visual identity assets and responsive user experience layouts.",
      "Deploy a modernized digital web platform that reflects your true business scale.",
    ];
  } else if (primary.cap === "build") {
    steps = [
      "Map existing manual workflows, spreadsheet clipboards, and operational bottlenecks.",
      "Engineer a custom web application and automated lead intake database.",
      "Integrate communication channels (WhatsApp, Email) and train your operational team.",
    ];
  } else {
    steps = [
      "Validate product hypotheses, user roles, and minimum viable scope (MVP).",
      "Design intuitive multi-tenant SaaS dashboards or offline-first field mobile applications.",
      "Engineer a resilient, scalable software product architecture.",
    ];
  }

  return {
    growScore: Math.min(100, Math.round(grow)),
    defineScore: Math.min(100, Math.round(define)),
    buildScore: Math.min(100, Math.round(build)),
    productizeScore: Math.min(100, Math.round(productize)),
    primaryCapability: primary.cap,
    secondaryCapability: secondary.cap,
    confidence,
    recommendationTitle: title,
    recommendationDescription: description,
    proposedSteps: steps,
    suggestedLink,
    suggestedLinkText,
  };
}
