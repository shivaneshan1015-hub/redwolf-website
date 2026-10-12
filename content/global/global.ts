import { GlobalContent } from "@/types/content";

export const globalContent: GlobalContent = {
  siteName: "Redwolf Digital",
  positioning: "Redwolf Digital is a digital growth and technology company that helps businesses solve growth, operational and product challenges through strategy, design, marketing and software.",
  promise: "From business problem to digital solution.",
  tagline: "From problem to digital solution.",
  commonCTAs: {
    primary: {
      label: "Start a conversation",
      labelWithArrow: "Start a conversation →",
      href: "/contact",
      variant: "primary",
    },
    diagnostic: {
      label: "Find your digital path",
      labelWithArrow: "Find your digital path →",
      href: "/solutions",
      variant: "tertiary",
    },
    work: {
      label: "Explore our work",
      labelWithArrow: "Explore our work →",
      href: "/solutions",
      variant: "secondary",
    },
    insights: {
      label: "Explore insights",
      labelWithArrow: "Explore insights →",
      href: "/insights",
      variant: "secondary",
    },
  },
  footerLinks: [
    { label: "Solutions", href: "/solutions" },
    { label: "Insights", href: "/insights" },
    { label: "Contact", href: "/contact" },
  ],
};
