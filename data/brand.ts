export interface BrandInfo {
  name: string;
  category: string;
  positioning: string;
  essence: string;
  promise: string;
  tagline: string;
  mission: string;
  vision: string;
  phone: string;
  email: string;
  address: string;
  systemStages: {
    id: string;
    step: string;
    title: string;
    description: string;
  }[];
  principles: {
    title: string;
    description: string;
  }[];
}

export const brandData: BrandInfo = {
  name: "Redwolf",
  category: "Digital Growth & Technology Company",
  positioning: "Redwolf is a digital growth and technology company that helps businesses solve growth, operational and product challenges through strategy, design, marketing and software.",
  essence: "We turn business problems into digital systems.",
  promise: "From business problem to digital solution.",
  tagline: "From problem to digital solution.",
  mission: "Help businesses use digital technology to grow, operate smarter and build what comes next.",
  vision: "Become a trusted digital transformation partner for ambitious businesses and emerging enterprises.",
  phone: "+91 99436 73790",
  email: "hello@redwolf.in",
  address: "Madurai & South India Operations",
  systemStages: [
    {
      id: "discover",
      step: "01",
      title: "DISCOVER",
      description: "Understand the true business problem, market context, and operational bottlenecks before prescribing technology.",
    },
    {
      id: "diagnose",
      step: "02",
      title: "DIAGNOSE",
      description: "Isolate root friction—whether in positioning, customer discovery, manual processes, or software architecture.",
    },
    {
      id: "design",
      step: "03",
      title: "DESIGN",
      description: "Craft intentional user experiences, system architectures, and clear brand messaging designed for real human workflows.",
    },
    {
      id: "build",
      step: "04",
      title: "BUILD",
      description: "Engineer resilient web platforms, business systems, or SaaS products using modern, reliable software standards.",
    },
    {
      id: "deploy",
      step: "05",
      title: "DEPLOY",
      description: "Launch systems safely into operational environments with full team onboarding, zero downtime, and robust performance.",
    },
    {
      id: "evolve",
      step: "06",
      title: "EVOLVE",
      description: "Iterate continuously based on real-world usage evidence, growth data, and evolving operational demands.",
    },
  ],
  principles: [
    {
      title: "Problem before platform.",
      description: "We never push a tech stack or framework before understanding what is actually preventing growth or operational efficiency.",
    },
    {
      title: "Evidence before assumptions.",
      description: "Decisions are rooted in verified user behavior, operational data, and business reality—never speculative trends.",
    },
    {
      title: "Simple before complex.",
      description: "The best digital system is the simplest one that solves the underlying problem cleanly and reliably.",
    },
    {
      title: "Build for reality.",
      description: "Software must perform on actual field devices, unreliable networks, and real workshop floors—not just ideal demos.",
    },
    {
      title: "Launch isn't the finish line.",
      description: "A system's value is proven after deployment. We refine, optimize, and scale based on real-world impact.",
    },
  ],
};
