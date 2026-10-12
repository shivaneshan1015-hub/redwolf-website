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
    name: "Insights",
    href: "/insights",
  },
];

export const globalCTAs = {
  primary: {
    label: "Start a Conversation",
    labelWithArrow: "Start a Conversation →",
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
