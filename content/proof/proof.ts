import { ProofContent } from "@/types/content";

export const proofContent: Record<string, ProofContent> = {
  "easytrack-offline-sync": {
    id: "easytrack-offline-sync",
    slug: "easytrack-offline-sync",
    title: "Offline-First Sync Engine",
    claim: "Field sales representatives can capture orders, generate invoices, and collect payments without continuous mobile internet.",
    evidence: "IndexedDB local transaction queue syncs automatically upon reconnecting to 3G/4G networks without data loss.",
    source: "EasyTrack Production Architecture Verification",
    verified: true,
    metricValue: "100%",
    metricLabel: "Offline Availability",
    metricContext: "Field reps on rural distribution beat routes",
  },
  "sri-nantha-quote-digitization": {
    id: "sri-nantha-quote-digitization",
    slug: "sri-nantha-quote-digitization",
    title: "Custom Glass Quote Intake",
    claim: "Digitized custom glass specification intake into a structured web application.",
    evidence: "Replaced manual phone call notes with multi-step online quote configuration.",
    source: "Sri Nantha Glasses Digital Intervention Case Study",
    verified: true,
  },
};
