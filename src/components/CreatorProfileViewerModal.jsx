import React from 'react';
import { 
  X, 
  BadgeCheck, 
  MapPin, 
  TrendingUp, 
  Eye, 
  Users, 
  Sparkles, 
  ArrowRight, 
  Share2, 
  CheckCircle2, 
  Layers,
  Award,
  Zap,
} from 'lucide-react';
import { InstagramIcon, YoutubeIcon } from './SocialIcons';

export default function CreatorProfileViewerModal({ isOpen, onClose, creator, onStartCampaign }) {
  if (!isOpen || !creator) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-xl animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-[32px] border border-stone-200/20 bg-[#FAF9F6] text-stone-900 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Floating Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-stone-900/70 text-white hover:bg-stone-950 backdrop-blur-md transition-all shadow-lg"
          aria-label="Close Profile Viewer"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Modal Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 min-h-[560px]">
          
          {/* Left Column: Full Portrait Photo Viewer */}
          <div className="relative md:col-span-5 bg-stone-950 min-h-[380px] md:min-h-full overflow-hidden flex flex-col justify-end">
            <img 
              src={creator.fullImage || creator.avatar} 
              alt={creator.name}
              className="absolute inset-0 h-full w-full object-cover object-center" 
            />
            {/* Soft gradient shadow overlay at bottom */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
            
            {/* Top Badges over image */}
            <div className="absolute top-4 left-4 z-10 flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1 rounded-full bg-white/95 px-3 py-1 text-xs font-bold text-violet-700 shadow-md backdrop-blur-md">
                <BadgeCheck className="h-4 w-4 fill-violet-600 text-white" />
                Verified Star Talent
              </span>
              <span className="rounded-full bg-black/60 px-3 py-1 text-xs font-semibold text-white backdrop-blur-md">
                {creator.category}
              </span>
            </div>

            {/* Bottom info on photo */}
            <div className="relative z-10 p-5 text-white">
              <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/25 px-2.5 py-0.5 text-[11px] font-bold text-emerald-300 border border-emerald-400/30 mb-2">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                {creator.availability || 'Accepting Brand Briefs'}
              </div>
              <h3 className="text-2xl font-black tracking-tight">{creator.name}</h3>
              <p className="text-xs text-white/80 font-mono flex items-center gap-1.5 mt-0.5">
                <span>{creator.username}</span>
                <span>•</span>
                <MapPin className="h-3 w-3 inline text-white/70" />
                <span>{creator.location}</span>
              </p>
            </div>
          </div>

          {/* Right Column: Deep Profile Telemetry & Campaign Briefing */}
          <div className="md:col-span-7 p-6 sm:p-8 flex flex-col justify-between space-y-6">
            
            {/* Header & Match Score */}
            <div>
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-200 pb-4">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-pink-600 font-mono">
                    Creator Profile Viewer
                  </span>
                  <div className="flex items-center gap-2 mt-0.5">
                    <h2 className="text-2xl sm:text-3xl font-black text-stone-950 tracking-tight">
                      {creator.name}
                    </h2>
                    <BadgeCheck className="h-5 w-5 text-pink-500 fill-pink-100" />
                  </div>
                  <p className="text-xs text-stone-500 mt-0.5">
                    {creator.category} • {creator.tier} Tier • {creator.followers} Network
                  </p>
                </div>

                <div className="rounded-2xl border border-emerald-300 bg-emerald-50 px-3.5 py-2 text-right shadow-sm">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-700">Star Match</div>
                  <div className="text-lg font-black text-emerald-900 leading-none">{creator.matchScore}% Score</div>
                </div>
              </div>

              {/* Bio summary */}
              <p className="mt-4 text-sm leading-relaxed text-stone-700">
                {creator.bio}
              </p>

              {/* Tags */}
              <div className="mt-3 flex flex-wrap gap-1.5">
                {creator.tags.map((tag) => (
                  <span 
                    key={tag} 
                    className="rounded-full bg-stone-200/80 px-2.5 py-0.5 text-xs font-semibold text-stone-700"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* 4 Core Metrics Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 py-2">
              <div className="rounded-2xl border border-stone-200 bg-white p-3 shadow-sm">
                <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400">Followers</span>
                <div className="text-lg font-black text-stone-950 mt-0.5">{creator.followers}</div>
                <span className="text-[10px] text-emerald-600 font-semibold font-mono">Verified Audited</span>
              </div>

              <div className="rounded-2xl border border-stone-200 bg-white p-3 shadow-sm">
                <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400">Eng. Rate</span>
                <div className="text-lg font-black text-pink-600 mt-0.5">{creator.engagement}</div>
                <span className="text-[10px] text-pink-600 font-semibold font-mono">2.4x benchmark</span>
              </div>

              <div className="rounded-2xl border border-stone-200 bg-white p-3 shadow-sm">
                <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400">Avg. Reach</span>
                <div className="text-lg font-black text-violet-600 mt-0.5">{creator.avgViews}</div>
                <span className="text-[10px] text-violet-600 font-semibold font-mono">Per Reel/Post</span>
              </div>

              <div className="rounded-2xl border border-stone-200 bg-white p-3 shadow-sm">
                <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400">Est. CPM</span>
                <div className="text-lg font-black text-amber-600 mt-0.5">{creator.cpmEstimate}</div>
                <span className="text-[10px] text-amber-600 font-semibold font-mono">Cost per 1k</span>
              </div>
            </div>

            {/* Performance Insights & Demographics */}
            <div className="space-y-3 rounded-2xl border border-stone-200 bg-white p-4 shadow-sm">
              <div className="flex items-center justify-between text-xs font-bold text-stone-700">
                <span className="flex items-center gap-1.5">
                  <Users className="h-3.5 w-3.5 text-violet-600" />
                  Audience Breakdown
                </span>
                <span className="font-mono text-stone-500 font-normal">{creator.demographics}</span>
              </div>

              {creator.topMetrics && (
                <div className="grid grid-cols-3 gap-2 pt-1 border-t border-stone-100">
                  {creator.topMetrics.map((tm) => (
                    <div key={tm.label} className="text-center bg-stone-50 rounded-xl p-2">
                      <div className="text-[10px] text-stone-500 uppercase">{tm.label}</div>
                      <div className="text-xs font-bold text-stone-900 mt-0.5">{tm.value}</div>
                    </div>
                  ))}
                </div>
              )}

              {creator.pastBrands && (
                <div className="pt-2 border-t border-stone-100">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-stone-400 mb-1.5">
                    Past Verified Brand Collabs
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {creator.pastBrands.map((brand) => (
                      <span 
                        key={brand}
                        className="rounded-lg bg-pink-50 border border-pink-200/60 px-2 py-0.5 text-[11px] font-bold text-pink-700"
                      >
                        ✓ {brand}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Footer Action Bar */}
            <div className="pt-2 flex flex-col sm:flex-row gap-3 items-center justify-between">
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onStartCampaign?.(creator);
                }}
                className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-stone-950 to-stone-900 hover:from-pink-600 hover:to-fuchsia-600 text-white px-6 py-3.5 text-sm font-bold shadow-lg transition-all active:scale-[0.98]"
              >
                <span>Book / Start Campaign with {creator.name.split(' ')[0]}</span>
                <ArrowRight className="h-4 w-4" />
              </button>

              <button
                type="button"
                onClick={onClose}
                className="w-full sm:w-auto rounded-full border border-stone-300 bg-stone-100 hover:bg-stone-200 px-5 py-3.5 text-xs font-bold text-stone-700 transition-colors"
              >
                Close Viewer
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
