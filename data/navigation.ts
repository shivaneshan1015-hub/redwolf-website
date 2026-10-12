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
    href: "/solutions",
    items: [
      {
        name: "FMCG & Distribution",
        href: "/solutions/build",
        description: "Field sales, van inventory & beat routes",
      },
      {
        name: "Healthcare",
        href: "/solutions/grow",
        description: "Patient booking & clinical trust portals",
      },
      {
        name: "Manufacturing",
        href: "/solutions/build",
        description: "Custom quote systems & dealer portals",
      },
      {
        name: "Travel & Hospitality",
        href: "/solutions/grow",
        description: "Tour discovery & instant WhatsApp bookings",
      },
      {
        name: "SMEs & Growing Businesses",
        href: "/solutions/define",
        description: "Enterprise digital transformation for SMEs",
      },
    ],
  },
  {
    name: "Insights",
    href: "/insights",
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
    href: "/solutions",
  },
  work: {
    label: "Explore our work",
    labelWithArrow: "Explore our work →",
    href: "/solutions",
  },
  insights: {
    label: "Explore insights",
    labelWithArrow: "Explore insights →",
    href: "/insights",
  },
};
