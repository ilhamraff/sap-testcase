import Link from "next/link";
import { ArrowLeft, Sparkles, CheckCircle2 } from "lucide-react";
import React from "react";

interface FeatureHighlight {
  title: string;
  desc: string;
}

interface MetricSnippet {
  label: string;
  value: string;
  note?: string;
}

interface ModulePlaceholderProps {
  badge: string;
  title: string;
  subtitle: string;
  description: string;
  icon: React.ElementType;
  metrics?: MetricSnippet[];
  upcomingFeatures?: FeatureHighlight[];
  glossaryItems?: { term: string; definition: string }[];
}

export default function ModulePlaceholder({
  badge,
  title,
  subtitle,
  description,
  icon: Icon,
  metrics,
  upcomingFeatures,
  glossaryItems,
}: ModulePlaceholderProps) {
  return (
    <div className="space-y-6 sm:space-y-8 animate-fadeIn">
      {/* Top Banner / Header Card */}
      <div className="bg-white border border-platinum-200 rounded-2xl p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-dusk-blue-50 border border-dusk-blue-200 flex items-center justify-center text-dusk-blue-600 shrink-0 shadow-2xs">
              <Icon className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                <span className="px-2.5 py-0.5 text-[11px] font-semibold tracking-wide bg-dusk-blue-50 text-dusk-blue-700 border border-dusk-blue-200/80 rounded-md uppercase">
                  {badge}
                </span>
                <span className="flex items-center gap-1 text-[11px] font-medium text-amber-bronze-700 bg-amber-bronze-50 border border-amber-bronze-200 px-2 py-0.5 rounded-md">
                  <Sparkles className="w-3 h-3 text-amber-bronze-500" />
                  Prototype Preview
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl font-extrabold text-platinum-900 tracking-tight">
                {title}
              </h1>
              <p className="text-xs sm:text-sm font-medium text-dusk-blue-600 mt-0.5">
                {subtitle}
              </p>
              <p className="text-xs sm:text-sm text-platinum-600 mt-2 max-w-3xl leading-relaxed">
                {description}
              </p>
            </div>
          </div>

          <Link
            href="/dashboard"
            className="self-start inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-platinum-700 bg-platinum-100 hover:bg-platinum-200/80 active:scale-95 border border-platinum-300/80 rounded-xl transition-all cursor-pointer shrink-0"
          >
            <ArrowLeft className="w-4 h-4 text-platinum-600" />
            <span>Kembali ke Performa Sales</span>
          </Link>
        </div>

        {/* Real Data Metrics Preview if provided */}
        {metrics && metrics.length > 0 && (
          <div className="mt-6 pt-6 border-t border-platinum-100 grid grid-cols-1 sm:grid-cols-3 gap-4">
            {metrics.map((metric, idx) => (
              <div
                key={idx}
                className="bg-platinum-50/70 border border-platinum-200/80 rounded-xl p-4 transition-colors hover:bg-platinum-50"
              >
                <p className="text-[11px] font-medium text-platinum-500 uppercase tracking-wider">
                  {metric.label}
                </p>
                <p className="text-lg sm:text-xl font-bold text-platinum-900 mt-1 tracking-tight">
                  {metric.value}
                </p>
                {metric.note && (
                  <p className="text-[11px] text-platinum-500 mt-0.5">
                    {metric.note}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Planned Feature Breakdown */}
      {upcomingFeatures && upcomingFeatures.length > 0 && (
        <div className="bg-white border border-platinum-200 rounded-2xl p-6 sm:p-8 shadow-xs">
          <h2 className="text-sm sm:text-base font-bold text-platinum-900 mb-1">
            Cakupan Fungsionalitas Modul Ini
          </h2>
          <p className="text-xs text-platinum-500 mb-6">
            Berdasarkan spesifikasi alur operasional Distrilink Sales Automation
            Platform (SAP).
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {upcomingFeatures.map((feat, idx) => (
              <div
                key={idx}
                className="border border-platinum-200 rounded-xl p-4 bg-linear-to-b from-white to-platinum-50/40"
              >
                <div className="w-7 h-7 rounded-lg bg-jade-50 border border-jade-200 text-jade-700 flex items-center justify-center mb-3">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <h3 className="text-xs sm:text-sm font-semibold text-platinum-900">
                  {feat.title}
                </h3>
                <p className="text-xs text-platinum-600 mt-1.5 leading-relaxed">
                  {feat.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Glossary Items if provided */}
      {glossaryItems && glossaryItems.length > 0 && (
        <div className="bg-white border border-platinum-200 rounded-2xl p-6 sm:p-8 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-sm sm:text-base font-bold text-platinum-900">
                Glosarium Istilah Resmi SAP Distrilink
              </h2>
              <p className="text-xs text-platinum-500 mt-0.5">
                Panduan terminologi operasional lapangan untuk supervisor dan
                manajemen tim sales.
              </p>
            </div>
            <span className="hidden sm:inline-block px-2.5 py-1 text-[11px] font-medium text-dusk-blue-700 bg-dusk-blue-50 border border-dusk-blue-200 rounded-lg">
              {glossaryItems.length} Istilah Inti
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
            {glossaryItems.map((item, idx) => (
              <div
                key={idx}
                className="p-3.5 border border-platinum-200 rounded-xl bg-platinum-50/50 hover:bg-platinum-50 transition-colors"
              >
                <span className="inline-block text-xs font-bold text-dusk-blue-700 mb-1">
                  {item.term}
                </span>
                <p className="text-xs text-platinum-600 leading-relaxed">
                  {item.definition}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
