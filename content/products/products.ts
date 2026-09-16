import { ProductContent } from "@/types/content";

export const productsContent: Record<string, ProductContent> = {
  easytrack: {
    id: "easytrack",
    slug: "easytrack",
    name: "EasyTrack",
    category: "FMCG Distribution Management Software",
    tagline: "Distribution operations, connected.",
    summary: "EasyTrack helps FMCG distributors manage field sales, van inventory, routes, orders, credit, collections, and distribution operations from one connected platform.",
    heroHeadline: "Distribution operations, connected.",
    supportingCopy: "EasyTrack bridges the gap between field sales reps on rural routes and distribution managers in the main warehouse. Built for real-world FMCG operations with offline-first reliability.",
    workflow: [
      "INVENTORY",
      "VAN LOADING",
      "ROUTE / BEAT",
      "FIELD SALES",
      "RETAILER",
      "ORDER",
      "INVOICE",
      "CREDIT / PAYMENT",
      "RETURN",
      "ANALYTICS",
    ],
    userRoles: [
      {
        role: "manager",
        title: "Business Owner & Distribution Manager",
        description: "Complete operational visibility over daily sales, van stock, retailer credit limits, route expenses, and cash collections.",
        features: [
          "Real-time distribution dashboard & daily cash reconciliation",
          "Retailer credit limit monitoring & overdue alerts",
          "Van stock loading approval & end-of-day stock auditing",
          "Sales rep performance & route efficiency analytics",
        ],
      },
      {
        role: "field_agent",
        title: "Field Sales Representative",
        description: "Fast, mobile-first ordering app designed for rapid shop-to-shop visits with zero dependency on continuous mobile internet.",
        features: [
          "Offline order taking & instant bluetooth thermal invoice printing",
          "Retailer order history & previous item re-order in 2 taps",
          "On-site cash & cheque collection entry with receipt generation",
          "Daily beat route listing with GPS location assistance",
        ],
      },
      {
        role: "van_ops",
        title: "Van Sales & Stock Loader",
        description: "Accurate van inventory loading, batch tracking, damaged goods returns management, and physical stock reconciliation.",
        features: [
          "Van stock loading verification against main warehouse ledger",
          "Batch number & expiry date tracking for perishable goods",
          "Damaged stock & retailer return voucher processing",
          "End-of-day van stock audit & unsold inventory return to main warehouse",
        ],
      },
      {
        role: "admin",
        title: "Platform Admin & System Manager",
        description: "Multi-branch configuration, user permissions, product catalog management, and ERP integrations.",
        features: [
          "Multi-branch & multi-godown stock management",
          "Role-based access control (Manager, Sales Rep, Loader, Driver)",
          "Product catalog, tax rates (GST), and scheme management",
          "CSV/Excel data import & Tally/accounting export capabilities",
        ],
      },
    ],
    offlineFirstArchitecture: {
      title: "Work doesn't stop when the internet does.",
      description: "EasyTrack uses an offline-first local database sync engine. Field reps can take orders, print invoices, and collect payments in deep rural dead-zones without losing data.",
      diagramSteps: [
        {
          step: "01",
          label: "FIELD DEVICE",
          description: "Field sales mobile app runs locally on Android/iOS.",
        },
        {
          step: "02",
          label: "INDEXEDDB / LOCAL STORAGE",
          description: "Orders, invoices, and collections save instantly to encrypted local storage.",
        },
        {
          step: "03",
          label: "OFFLINE SYNC ENGINE",
          description: "Detects network connectivity and manages background data queuing & conflict resolution.",
        },
        {
          step: "04",
          label: "CLOUD BACKEND",
          description: "Synchronizes verified field transactions to the central distribution database.",
        },
        {
          step: "05",
          label: "DISTRIBUTION DASHBOARD",
          description: "Updates main warehouse inventory, credit ledgers, and manager analytics.",
        },
      ],
    },
    features: [
      {
        category: "Field Sales & Van Operations",
        items: [
          "Beat/Route Management & Retailer Geo-tagging",
          "Offline Order Capture & Instant Printing",
          "Van Loading & Stock Reconciliation",
          "Batch & Expiry Date Management",
          "Damaged & Expiry Returns Voucher Processing",
        ],
      },
      {
        category: "Credit & Financial Management",
        items: [
          "Retailer Credit Limit Enforcement",
          "Outstanding Invoice Ageing Reports",
          "Partial Payment & Collection Entry",
          "Daily Cash Drawer & Collection Reconciliation",
          "Tally / Accounting Export Compatibility",
        ],
      },
      {
        category: "Distribution Analytics",
        items: [
          "Item-wise & Brand-wise Sales Performance",
          "Sales Rep Daily Productivity Metrics",
          "Route Profitability & Drop Density Reports",
          "Dead Stock & Slow-Moving Stock Alerts",
        ],
      },
    ],
    capabilities: [
      "Offline-First Mobile App",
      "Van Sales & Stock Tracking",
      "Retailer Credit Limit Enforcement",
      "Bluetooth Thermal Printing",
      "Accounting & Tally Sync",
    ],
    relatedIndustrySlugs: ["fmcg-distribution"],
    relatedSolutionSlugs: ["productize", "build"],
    cta: {
      primaryText: "Request an EasyTrack Demo",
      secondaryText: "Talk to Our Software Team",
      demoUrl: "https://easytrack-app.vercel.app/login",
    },
    seo: {
      title: "EasyTrack — FMCG Distribution Management Software | Redwolf Product",
      description: "EasyTrack is an enterprise FMCG distribution software engineered by Redwolf for field sales reps, van inventory, beat routes, retailer credit, and live collections.",
      keywords: [
        "EasyTrack SaaS",
        "FMCG distribution software India",
        "van sales tracking app",
        "distributor order taking app",
        "offline route sales software",
      ],
    },
  },
};
