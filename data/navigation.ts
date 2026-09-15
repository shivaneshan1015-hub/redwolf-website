export interface NavItem {
  name: string;
  href: string;
  description?: string;
  category?: string;
  items?: NavItem[];
}

export interface NavGroup {
  name: string;
  href: string;
  items?: NavItem[];
}

export const primaryNavigation: NavGroup[] = [
  {
    name: "Solutions",
    href: "/solutions",
    items: [
      {
        name: "GROW",
        href: "/solutions/grow",
        description: "Make your business easier to find, trust and choose.",
        category: "Growth & Visibility",
      },
      {
        name: "DEFINE",
        href: "/solutions/define",
        description: "Make your business clear before you make it bigger.",
        category: "Brand & Positioning",
      },
      {
        name: "BUILD",
        href: "/solutions/build",
        description: "Turn business processes into digital systems.",
        category: "Software & Systems",
      },
      {
        name: "PRODUCTIZE",
        href: "/solutions/productize",
        description: "Turn ideas and workflows into software products.",
        category: "SaaS & Products",
      },
    ],
  },
  {
    name: "Industries",
    href: "/industries",
    items: [
      {
        name: "FMCG & Distribution",
        href: "/industries/fmcg-distribution",
        description: "Field sales, van inventory & beat routes",
      },
      {
        name: "Healthcare",
        href: "/industries/healthcare",
        description: "Patient booking & clinical trust portals",
      },
      {
        name: "Manufacturing",
        href: "/industries/manufacturing",
        description: "Custom quote systems & dealer portals",
      },
      {
        name: "Travel & Hospitality",
        href: "/industries/travel-hospitality",
        description: "Tour discovery & instant WhatsApp bookings",
      },
      {
        name: "SMEs & Growing Businesses",
        href: "/industries/smes",
        description: "Enterprise digital transformation for SMEs",
      },
    ],
  },
  {
    name: "Work",
    href: "/work",
  },
  {
    name: "Products",
    href: "/products",
    items: [
      {
        name: "EasyTrack",
        href: "/products/easytrack",
        description: "FMCG Distribution Management Software",
      },
    ],
  },
  {
    name: "Insights",
    href: "/insights",
  },
  {
    name: "About",
    href: "/about",
  },
];

export const globalCTAs = {
  primary: {
    label: "Start a conversation",
    labelWithArrow: "Start a conversation →",
    href: "/contact",
  },
  diagnostic: {
    label: "Find your digital path",
    labelWithArrow: "Find your digital path →",
    href: "/diagnostic",
  },
  work: {
    label: "Explore our work",
    labelWithArrow: "Explore our work →",
    href: "/work",
  },
  easytrack: {
    label: "Explore EasyTrack",
    labelWithArrow: "Explore EasyTrack →",
    href: "/products/easytrack",
  },
  easytrackDemo: {
    label: "Request an EasyTrack demo",
    labelWithArrow: "Request an EasyTrack demo →",
    href: "https://easytrack-app.vercel.app/login",
  },
  insights: {
    label: "Explore insights",
    labelWithArrow: "Explore insights →",
    href: "/insights",
  },
};
