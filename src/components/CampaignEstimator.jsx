import React, { useState, useMemo } from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Layers, TrendingUp } from 'lucide-react';
import { InstagramIcon, YoutubeIcon } from './SocialIcons';

export default function CampaignEstimator({ onLaunchFromEstimator }) {
  const [platform, setPlatform] = useState('Instagram');
  const [tier, setTier] = useState('Macro');
  const [budget, setBudget] = useState(150000); // 1.5 Lakh default

  // Platforms configuration
  const platforms = [
    { id: 'Instagram', label: 'Instagram Reels', icon: InstagramIcon, multiplier: 1.0 },
    { id: 'YouTube', label: 'YouTube Shorts', icon: YoutubeIcon, multiplier: 1.2 },
    { id: 'CrossPlatform', label: 'Multi-Channel', icon: Layers, multiplier: 1.35 }
  ];

  // Creator Tiers
  const tiers = [
    { id: 'Nano', label: 'Nano', range: '1K–10K', cpm: 120, creatorCost: 4000, engRate: 9.4 },
    { id: 'Micro', label: 'Micro', range: '10K–100K', cpm: 180, creatorCost: 15000, engRate: 7.8 },
    { id: 'Macro', label: 'Macro', range: '100K–1M', cpm: 240, creatorCost: 45000, engRate: 6.4 },
    { id: 'Mega', label: 'Mega', range: '1M+', cpm: 320, creatorCost: 150000, engRate: 4.8 }
  ];

  const currentTier = tiers.find((t) => t.id === tier) || tiers[2];
  const currentPlatform = platforms.find((p) => p.id === platform) || platforms[0];

  // Animated / Computed metrics based on budget & tier
  const metrics = useMemo(() => {
    const effectiveCPM = currentTier.cpm * (1 / currentPlatform.multiplier);
    const estimatedImpressions = Math.round((budget / effectiveCPM) * 1000);
    const estimatedReach = Math.round(estimatedImpressions * 0.78);
    const projectedEngagement = Math.round(estimatedReach * (currentTier.engRate / 100));
    const creatorCount = Math.max(1, Math.round(budget / currentTier.creatorCost));
    const projectedLeads = Math.round(projectedEngagement * 0.052);
    const avgCPM = Math.round(effectiveCPM);

    return {
      estimatedImpressions,
      estimatedReach,
      projectedEngagement,
      creatorCount,
      projectedLeads,
      avgCPM,
      engRate: currentTier.engRate
    };
  }, [budget, currentTier, currentPlatform]);

  // Format Indian Rupees currency
  const formatINR = (val) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(val);
  };

  // Format large numbers (K, M, L)
  const formatNumber = (num) => {
    if (num >= 10000000) return (num / 10000000).toFixed(2) + ' Cr';
    if (num >= 100000) return (num / 100000).toFixed(2) + ' L';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toLocaleString();
  };

  const budgetPct = Math.min(100, Math.max(0, ((budget - 50000) / (1500000 - 50000)) * 100));

  return (
    <div className="relative w-full overflow-hidden rounded-3xl border border-stone-200/90 bg-white p-6 sm:p-8 md:p-10 shadow-[0_20px_50px_-15px_rgba(28,25,23,0.07)]">
      {/* Soft ambient creator glow */}
      <div className="pointer-events-none absolute -right-16 -top-16 h-72 w-72 rounded-full bg-gradient-to-bl from-violet-200/40 via-pink-100/30 to-transparent" />
      <div className="pointer-events-none absolute -bottom-16 -left-16 h-64 w-64 rounded-full bg-gradient-to-tr from-indigo-100/30 via-transparent to-transparent blur-2xl" />

      {/* Top Header */}
      <div className="relative z-10 flex flex-col justify-between gap-4 border-b border-stone-100 pb-6 sm:flex-row sm:items-center">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-violet-200/70 bg-violet-50/80 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-violet-700">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            Predictive ROI Model
          </div>
          <h2 className="mt-2.5 flex items-center gap-2.5 text-2xl font-extrabold tracking-tight text-stone-900 sm:text-3xl">
            <span>LIVE CAMPAIGN INTELLIGENCE</span>
            <Sparkles className="hidden h-5 w-5 text-violet-600 sm:inline" />
          </h2>
          <p className="mt-1 text-xs text-stone-500 sm:text-sm">
            Forecast real reach, engagement velocity, and creator allocation before deploying spend.
          </p>
        </div>

        <div className="inline-flex self-start sm:self-auto items-center gap-2 rounded-full border border-stone-200 bg-stone-50/80 px-3.5 py-1.5 text-xs font-semibold text-stone-700 shadow-sm">
          <ShieldCheck className="h-4 w-4 text-emerald-600" />
          <span>Real-time CPM benchmarks • 2026</span>
        </div>
      </div>

      {/* Controls & Metrics Split */}
      <div className="relative z-10 mt-7 grid grid-cols-1 gap-7 lg:grid-cols-12">
        {/* Left Column: Sliders & Controls (7 cols) */}
        <div className="space-y-6 lg:col-span-7">
          {/* Target Distribution Channel */}
          <div>
            <div className="mb-2.5 flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-stone-500">
                Distribution Channel
              </label>
              <span className="text-[11px] font-medium text-stone-400">Select network focus</span>
            </div>
            <div className="grid grid-cols-3 gap-2.5">
              {platforms.map((p) => {
                const IconComponent = p.icon;
                const isSelected = platform === p.id;
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setPlatform(p.id)}
                    className={`flex items-center justify-center gap-2 rounded-xl px-3 py-2.5 text-xs font-bold tracking-tight transition-all border ${
                      isSelected
                        ? 'border-transparent bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white shadow-md shadow-violet-500/20'
                        : 'border-stone-200 bg-stone-50/80 text-stone-700 hover:border-stone-300 hover:bg-stone-100/90'
                    }`}
                  >
                    <IconComponent className={`h-3.5 w-3.5 ${isSelected ? 'text-white' : 'text-stone-500'}`} />
                    <span className="truncate">{p.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Creator Tier */}
          <div>
            <div className="mb-2.5 flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-stone-500">
                Target Creator Tier
              </label>
              <span className="text-[11px] font-medium text-stone-400">Audience scale tier</span>
            </div>
            <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
              {tiers.map((t) => {
                const isSelected = tier === t.id;
                return (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setTier(t.id)}
                    className={`flex flex-col items-center justify-center rounded-xl p-2.5 text-xs transition-all border ${
                      isSelected
                        ? 'border-stone-900 bg-stone-900 text-white shadow-sm ring-2 ring-stone-900/10'
                        : 'border-stone-200 bg-stone-50/80 text-stone-700 hover:border-stone-300 hover:bg-white'
                    }`}
                  >
                    <span className="font-bold text-sm">{t.label}</span>
                    <span className={`text-[10px] mt-0.5 ${isSelected ? 'text-stone-300' : 'text-stone-400'}`}>
                      {t.range}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Campaign Budget Slider */}
          <div className="rounded-2xl border border-stone-200/70 bg-stone-50/60 p-4">
            <div className="mb-3 flex items-center justify-between">
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-stone-500">
                  Campaign Budget Allocation
                </label>
                <div className="text-[11px] text-stone-400">Adjust spend to recalculate output</div>
              </div>
              <div className="text-right">
                <span className="text-2xl font-black tracking-tight text-stone-950 font-mono">
                  {formatINR(budget)}
                </span>
                <span className="ml-2 inline-flex items-center rounded-full bg-emerald-100/80 px-2 py-0.5 text-[10px] font-bold text-emerald-800">
                  Optimal
                </span>
              </div>
            </div>

            <div className="relative pt-2 pb-1">
              <input
                type="range"
                min="50000"
                max="1500000"
                step="25000"
                value={budget}
                onChange={(e) => setBudget(Number(e.target.value))}
                className="w-full h-2.5 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-violet-600 transition-all hover:accent-pink-500"
                style={{
                  background: `linear-gradient(to right, #7C3AED 0%, #DB2777 ${budgetPct}%, #E7E5E4 ${budgetPct}%, #E7E5E4 100%)`
                }}
              />
            </div>

            <div className="flex items-center justify-between text-[11px] font-semibold text-stone-400 mt-2">
              <span className={budget <= 100000 ? 'text-violet-700 font-bold' : ''}>₹50K</span>
              <span className={budget > 100000 && budget <= 500000 ? 'text-violet-700 font-bold' : ''}>₹5L</span>
              <span className={budget > 500000 && budget <= 1000000 ? 'text-violet-700 font-bold' : ''}>₹10L</span>
              <span className={budget > 1000000 ? 'text-violet-700 font-bold' : ''}>₹15L+</span>
            </div>
          </div>
        </div>

        {/* Right Column: Dynamic Projected Output Metrics (5 cols) */}
        <div className="flex flex-col justify-between rounded-2xl border border-stone-200/90 bg-[#FAF9FD] p-5 sm:p-6 lg:col-span-5 shadow-sm">
          <div>
            <div className="mb-4 flex items-center justify-between border-b border-stone-200/70 pb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-stone-600 flex items-center gap-1.5">
                <TrendingUp className="h-3.5 w-3.5 text-violet-600" />
                Projected Output
              </span>
              <span className="rounded-full bg-violet-100 px-2 py-0.5 text-[10px] font-bold text-violet-700">
                AI Powered
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3.5">
              {/* Metric 1: Reach */}
              <div className="rounded-xl border border-stone-200/80 bg-white p-3.5 shadow-sm transition-all hover:border-violet-200 hover:shadow-md">
                <div className="text-[10px] font-bold uppercase tracking-wider text-stone-400">
                  Estimated Reach
                </div>
                <div className="mt-1 text-2xl font-black tracking-tight text-stone-950 font-mono">
                  {formatNumber(metrics.estimatedReach)}
                </div>
                <div className="mt-1 inline-flex items-center rounded-full bg-emerald-50 px-1.5 py-0.5 text-[10px] font-semibold text-emerald-700">
                  Target impressions
                </div>
              </div>

              {/* Metric 2: Engagement */}
              <div className="rounded-xl border border-stone-200/80 bg-white p-3.5 shadow-sm transition-all hover:border-violet-200 hover:shadow-md">
                <div className="text-[10px] font-bold uppercase tracking-wider text-stone-400">
                  Engagement
                </div>
                <div className="mt-1 text-2xl font-black tracking-tight text-violet-700 font-mono">
                  {formatNumber(metrics.projectedEngagement)}
                </div>
                <div className="mt-1 text-[10px] font-medium text-stone-500">
                  Avg {metrics.engRate}% rate
                </div>
              </div>

              {/* Metric 3: Creator Roster */}
              <div className="rounded-xl border border-stone-200/80 bg-white p-3.5 shadow-sm transition-all hover:border-violet-200 hover:shadow-md">
                <div className="text-[10px] font-bold uppercase tracking-wider text-stone-400">
                  Creator Roster
                </div>
                <div className="mt-1 text-2xl font-black tracking-tight text-stone-950 font-mono">
                  ~{metrics.creatorCount}
                </div>
                <div className="mt-1 text-[10px] font-medium text-stone-500">
                  Vetted {tier} creators
                </div>
              </div>

              {/* Metric 4: Conversions / CPM */}
              <div className="rounded-xl border border-stone-200/80 bg-white p-3.5 shadow-sm transition-all hover:border-violet-200 hover:shadow-md">
                <div className="text-[10px] font-bold uppercase tracking-wider text-stone-400">
                  Conversions
                </div>
                <div className="mt-1 text-2xl font-black tracking-tight text-pink-600 font-mono">
                  {formatNumber(metrics.projectedLeads)}
                </div>
                <div className="mt-1 text-[10px] font-medium text-stone-500">
                  Est. CPM ₹{metrics.avgCPM}
                </div>
              </div>
            </div>
          </div>

          {/* Instant Launch Action Button */}
          <button
            type="button"
            onClick={() => onLaunchFromEstimator?.({ budget, tier, platform, metrics })}
            className="group mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 via-fuchsia-600 to-pink-500 py-3.5 text-xs font-bold uppercase tracking-wider text-white shadow-[0_10px_25px_-5px_rgba(168,85,247,0.35)] transition-all hover:from-violet-700 hover:to-pink-600 hover:shadow-[0_15px_30px_-5px_rgba(168,85,247,0.45)] active:scale-[0.99]"
          >
            <span>Lock this Budget & Match Creators</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </div>
  );
}
