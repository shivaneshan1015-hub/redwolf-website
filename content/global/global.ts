import { GlobalContent } from "@/types/content";

export const globalContent: GlobalContent = {
  siteName: "Redwolf",
  positioning: "Redwolf is a digital growth and technology company that helps businesses solve growth, operational and product challenges through strategy, design, marketing and software.",
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
      href: "/diagnostic",
      variant: "tertiary",
    },
    work: {
      label: "Explore our work",
      labelWithArrow: "Explore our work →",
      href: "/work",
      variant: "secondary",
    },
    easytrack: {
      label: "Explore EasyTrack",
      labelWithArrow: "Explore EasyTrack →",
      href: "/products/easytrack",
      variant: "primary",
    },
    easytrackDemo: {
      label: "Request an EasyTrack demo",
      labelWithArrow: "Request an EasyTrack demo →",
      href: "https://easytrack-app.vercel.app/login",
      variant: "primary",
      external: true,
    },
    insights: {
      label: "Explore insights",
      labelWithArrow: "Explore insights →",
      href: "/insights",
      variant: "secondary",
    },
  },
  footerLinks: [
    { label: "About Redwolf", href: "/about" },
    { label: "Work", href: "/work" },
    { label: "EasyTrack", href: "/products/easytrack" },
    { label: "Insights", href: "/insights" },
  ],
};
