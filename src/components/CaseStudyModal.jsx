import React from 'react';
import { X, ArrowUpRight, CheckCircle2, Sparkles, TrendingUp, Users, Calendar } from 'lucide-react';

export default function CaseStudyModal({ caseStudy, isOpen, onClose, onLaunchSimilar }) {
  if (!isOpen || !caseStudy) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl animate-in fade-in duration-200 overflow-y-auto">
      <div className="relative w-full max-w-3xl glass-panel-glow rounded-3xl border border-white/15 p-6 sm:p-10 shadow-2xl my-8">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-20"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Hero banner */}
        <div className="relative rounded-2xl overflow-hidden h-64 sm:h-80 bg-slate-950 mb-8">
          <img
            src={caseStudy.heroImage}
            alt={caseStudy.campaign}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
          <div className="absolute bottom-6 left-6 right-6">
            <span className="px-3 py-1 rounded-full bg-indigo-600/80 backdrop-blur-md text-[11px] font-mono text-white font-bold uppercase tracking-wider mb-2 inline-block">
              {caseStudy.brand} • Case Breakdown
            </span>
            <h3 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              {caseStudy.campaign}
            </h3>
          </div>
        </div>

        {/* Narrative & Strategy */}
        <div className="space-y-6">
          <div>
            <h4 className="text-sm font-mono text-indigo-400 uppercase tracking-wider font-bold mb-1">
              Campaign Thesis & Creative Hook
            </h4>
            <p className="text-base text-slate-200 leading-relaxed">
              {caseStudy.headline}
            </p>
            <p className="text-sm text-slate-400 mt-2 leading-relaxed">
              {caseStudy.summary}
            </p>
          </div>

          {/* Results Grid */}
          <div className="p-6 rounded-2xl bg-black/50 border border-white/10">
            <h4 className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-4">
              Verified Attribution Metrics
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {caseStudy.results.map((res, i) => (
                <div key={i}>
                  <div className="text-[10px] font-mono text-slate-500 uppercase">{res.label}</div>
                  <div className="text-2xl font-black text-white font-mono mt-0.5">{res.value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Operational Details */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs font-mono text-slate-300">
            <div className="p-3 rounded-xl bg-white/5 border border-white/5">
              <span className="text-slate-500 block">CREATORS DEPLOYED</span>
              <strong className="text-white text-sm">{caseStudy.creatorsInvolved} Verified Profiles</strong>
            </div>
            <div className="p-3 rounded-xl bg-white/5 border border-white/5">
              <span className="text-slate-500 block">EXECUTION WINDOW</span>
              <strong className="text-white text-sm">{caseStudy.timeline}</strong>
            </div>
            <div className="p-3 rounded-xl bg-white/5 border border-white/5 col-span-2 sm:col-span-1">
              <span className="text-slate-500 block">PLATFORM FOCUS</span>
              <strong className="text-cyan-400 text-sm">{caseStudy.platforms.join(', ')}</strong>
            </div>
          </div>

          {/* CTA */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/10">
            <div className="text-xs text-slate-400">
              Want a similar campaign architecture for your brand?
            </div>
            <button
              onClick={() => {
                onClose();
                onLaunchSimilar?.(caseStudy);
              }}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-pink-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg hover:shadow-pink-500/30 transition-all flex items-center gap-2"
            >
              <span>Launch Similar Campaign</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
