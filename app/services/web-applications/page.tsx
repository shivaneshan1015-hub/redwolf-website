import { Metadata } from "next";
import Link from "next/link";
import { Cpu, ArrowRight } from "lucide-react";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";

export const metadata: Metadata = {
  title: "BUILD — Custom Web Applications & Systems Engineering | Redwolf",
  description:
    "Turn business processes into digital systems with Redwolf's BUILD web application engineering capability.",
};

export default function WebApplicationsPage() {
  return (
    <div className="pt-24 pb-20 text-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <Breadcrumbs
          items={[
            { label: "Solutions", href: "/solutions" },
            { label: "BUILD", href: "/solutions/build" },
            { label: "Web Applications" },
          ]}
        />

        <div className="space-y-6 max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 font-mono text-xs uppercase tracking-wider">
            <Cpu className="h-3.5 w-3.5" />
            <span>BUILD CAPABILITY • SYSTEMS ENGINEERING</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-extrabold tracking-tight">
            Custom Web Applications & <span className="text-red-500">Business Systems</span>
          </h1>
          <p className="text-slate-300 text-lg leading-relaxed">
            Digitize internal workflows, inventory, field team operations, and customer portals with resilient web applications.
          </p>
        </div>

        <div className="p-8 rounded-2xl bg-gradient-to-r from-red-950/40 to-slate-900 border border-red-500/30 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl font-heading font-extrabold text-white">Ready to turn operational friction into software?</h3>
            <p className="text-xs text-slate-400">Start a conversation with Redwolf software team.</p>
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-[#E53935] hover:bg-[#D32F2F] text-white font-extrabold text-xs uppercase tracking-wider px-6 py-3.5 rounded-xl shadow-lg shadow-red-600/30 shrink-0"
          >
            <span>Start a conversation →</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
