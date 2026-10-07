import React, { useState } from 'react';
import { 
  TrendingUp, 
  Eye, 
  Zap, 
  Calendar,
  Sparkles,
  ShoppingBag,
  ArrowUpRight,
  ShieldCheck,
  Activity,
  Layers,
  Radio,
  Clock,
  ChevronRight,
  CheckCircle2,
} from 'lucide-react';
import { InstagramIcon, YoutubeIcon } from './SocialIcons';

export default function AnalyticsDashboard() {
  const [activeChannel, setActiveChannel] = useState('all');
  const [activeTimeframe, setActiveTimeframe] = useState('30d');
  const [hoveredPoint, setHoveredPoint] = useState(null);
  const [activeChartMetric, setActiveChartMetric] = useState('impressions');

  // Daily trend data points (30-day velocity dataset)
  const timelineData = [
    { day: 'Day 01', date: 'Oct 01', imp: '380K', val: 38, eng: '3.4%', engVal: 3.4, note: 'Campaign Kickoff' },
    { day: 'Day 04', date: 'Oct 04', imp: '640K', val: 64, eng: '4.8%', engVal: 4.8, note: 'Micro-creators go live' },
    { day: 'Day 08', date: 'Oct 08', imp: '1.12M', val: 112, eng: '6.1%', engVal: 6.1, note: 'Sound audio picked by algorithm' },
    { day: 'Day 12', date: 'Oct 12', imp: '1.68M', val: 168, eng: '7.2%', engVal: 7.2, note: 'YouTube Shorts cross-post' },
    { day: 'Day 16', date: 'Oct 16', imp: '2.45M', val: 245, eng: '7.8%', engVal: 7.8, note: 'Mid-funnel retargeting' },
    { day: 'Day 20', date: 'Oct 20', imp: '3.82M', val: 382, eng: '9.4%', engVal: 9.4, note: '🚀 Peak Creator Drop' },
    { day: 'Day 24', date: 'Oct 24', imp: '4.25M', val: 425, eng: '8.9%', engVal: 8.9, note: 'Saves conversion surge' },
    { day: 'Day 28', date: 'Oct 28', imp: '4.70M', val: 470, eng: '8.4%', engVal: 8.4, note: 'Sustained Organic Reach' },
  ];

  // Channel metrics multiplier adjustments
  const channelData = {
    all: {
      reach: '2.84M',
      reachTrend: '+34.2%',
      eng: '8.42%',
      engTrend: '2.1x avg',
      views: '4.70M',
      viewsTrend: '98% 3-sec',
      conv: '18,420',
      convTrend: '+14% AOV',
      roas: '4.8x',
      roasPeak: '6.2x peak',
    },
    instagram: {
      reach: '1.74M',
      reachTrend: '+41.8%',
      eng: '9.20%',
      engTrend: '2.8x avg',
      views: '2.72M',
      viewsTrend: '99% 3-sec',
      conv: '11,840',
      convTrend: '+18% AOV',
      roas: '5.2x',
      roasPeak: '6.8x peak',
    },
    youtube: {
      reach: '910K',
      reachTrend: '+28.5%',
      eng: '7.40%',
      engTrend: '1.8x avg',
      views: '1.50M',
      viewsTrend: '96% 3-sec',
      conv: '5,280',
      convTrend: '+9% AOV',
      roas: '4.2x',
      roasPeak: '5.1x peak',
    },
  };

  const currentStats = channelData[activeChannel] || channelData.all;

  // SVG Chart geometry
  const chartWidth = 560;
  const chartHeight = 150;
  const maxImp = 500;
  const maxEng = 12;

  const getX = (idx) => (idx / (timelineData.length - 1)) * chartWidth;
  const getYImp = (val) => chartHeight - (val / maxImp) * (chartHeight - 20) - 10;
  const getYEng = (val) => chartHeight - (val / maxEng) * (chartHeight - 20) - 10;

  // Build SVG Path strings
  const impPoints = timelineData.map((d, i) => `${getX(i)},${getYImp(d.val)}`).join(' ');
  const impArea = `0,${chartHeight} ${impPoints} ${chartWidth},${chartHeight}`;

  const engPoints = timelineData.map((d, i) => `${getX(i)},${getYEng(d.engVal)}`).join(' ');

  // Active tooltip node
  const activeNode = hoveredPoint !== null ? timelineData[hoveredPoint] : timelineData[5]; // Default Day 20

  return (
    <section id="analytics" className="w-full bg-[#FAF9F6] py-20 lg:py-28 relative overflow-hidden text-stone-900 border-t border-stone-200/60">
      {/* Decorative ambient background accents */}
      <div className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-violet-100/30 via-pink-50/20 to-transparent" />

      <div className="w-full px-5 sm:px-8 lg:px-12 xl:px-16 2xl:px-20 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-300 bg-emerald-50 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-emerald-800 shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-600" />
              </span>
              <span>Live Telemetry & Attribution</span>
            </div>
            
            <h2 className="mt-3 text-3xl sm:text-5xl font-black tracking-tight text-stone-950">
              Campaign{' '}
              <span className="bg-gradient-to-r from-pink-500 via-fuchsia-500 to-violet-600 bg-clip-text text-transparent">
                Analytics
              </span>
            </h2>
            <p className="mt-2 text-sm sm:text-base text-stone-600 max-w-2xl leading-relaxed">
              Granular full-funnel attribution tracking reach, audience sentiment, viral velocity, and verified GMV conversion lift.
            </p>
          </div>

          {/* Timeframe & Live Sync Status */}
          <div className="flex flex-wrap items-center gap-2.5 self-start md:self-auto">
            <div className="inline-flex rounded-xl bg-stone-200/80 p-1 border border-stone-300/60 shadow-inner">
              {[
                { id: '7d', label: '7D' },
                { id: '14d', label: '14D' },
                { id: '30d', label: '30D' },
                { id: 'q4', label: 'Q4 Drop' },
              ].map((tf) => (
                <button
                  key={tf.id}
                  type="button"
                  onClick={() => setActiveTimeframe(tf.id)}
                  className={`rounded-lg px-3 py-1.5 text-xs font-bold transition-all ${
                    activeTimeframe === tf.id
                      ? 'bg-white text-stone-900 shadow-sm'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  {tf.label}
                </button>
              ))}
            </div>

            <div className="inline-flex items-center gap-1.5 rounded-xl border border-stone-200 bg-white px-3.5 py-2 text-xs font-bold text-stone-700 shadow-sm">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-mono text-emerald-700">Synced 2m ago</span>
            </div>
          </div>
        </div>

        {/* Executive Command Console Card */}
        <div className="relative overflow-hidden rounded-[32px] border border-stone-800/90 bg-[#0C101E] p-6 sm:p-8 xl:p-10 shadow-[0_25px_80px_rgba(12,16,30,0.22)] text-white">
          {/* Ambient neon backlights */}
          <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-pink-500/10 blur-[100px]" />
          <div className="pointer-events-none absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-cyan-500/10 blur-[100px]" />
          <div className="pointer-events-none absolute left-1/3 top-1/2 h-80 w-80 rounded-full bg-violet-500/10 blur-[110px]" />

          {/* Top Console Bar: Channel Selector & Live Stream Meta */}
          <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 border-b border-white/[0.08] pb-6">
            <div className="flex items-center gap-3">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-500/15 text-emerald-400 border border-emerald-500/20">
                <Activity className="h-4 w-4 animate-pulse" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-200">
                    Live Telemetry Stream
                  </span>
                  <span className="rounded bg-emerald-500/20 px-2 py-0.5 text-[10px] font-mono font-bold text-emerald-400">
                    Active
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 font-mono">Real-time pixel tracking & creator API webhooks</p>
              </div>
            </div>

            {/* Channel filter tabs */}
            <div className="inline-flex rounded-2xl bg-white/[0.06] p-1.5 border border-white/[0.08]">
              {[
                { id: 'all', label: 'All Channels', icon: Layers },
                { id: 'instagram', label: 'Instagram Reels', icon: InstagramIcon },
                { id: 'youtube', label: 'YouTube Shorts', icon: YoutubeIcon },
              ].map((channel) => {
                const IconComponent = channel.icon;
                const active = activeChannel === channel.id;
                return (
                  <button
                    key={channel.id}
                    type="button"
                    onClick={() => setActiveChannel(channel.id)}
                    className={`flex items-center gap-2 rounded-xl px-3.5 py-1.5 text-xs font-bold transition-all ${
                      active
                        ? 'bg-gradient-to-r from-pink-500 to-fuchsia-600 text-white shadow-md shadow-pink-500/25'
                        : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
                    }`}
                  >
                    <IconComponent className="h-3.5 w-3.5" />
                    <span>{channel.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 5 KPI Metric Tiles */}
          <div className="relative z-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-4 my-7">
            {/* 1. Total Reach */}
            <div className="group rounded-2xl border border-white/[0.08] bg-white/[0.03] p-4 sm:p-5 transition-all hover:border-cyan-500/40 hover:bg-white/[0.05] hover:shadow-lg">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 group-hover:text-slate-200 transition-colors">
                  Total Reach
                </span>
                <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-cyan-500/15 text-cyan-400">
                  <Eye className="h-3.5 w-3.5" />
                </div>
              </div>
              <div className="mt-2 text-2xl sm:text-3xl font-black font-mono tracking-tight text-white">
                {currentStats.reach}
              </div>
              <div className="mt-2 inline-flex items-center gap-1 rounded-md bg-emerald-500/15 px-2 py-0.5 text-[10px] font-mono font-bold text-emerald-400 border border-emerald-500/20">
                <TrendingUp className="h-3 w-3" />
                <span>{currentStats.reachTrend} vs bench</span>
              </div>
            </div>

            {/* 2. Avg Engagement */}
            <div className="group rounded-2xl border border-white/[0.08] bg-white/[0.03] p-4 sm:p-5 transition-all hover:border-pink-500/40 hover:bg-white/[0.05] hover:shadow-lg">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 group-hover:text-slate-200 transition-colors">
                  Avg Engagement
                </span>
                <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-pink-500/15 text-pink-400">
                  <TrendingUp className="h-3.5 w-3.5" />
                </div>
              </div>
              <div className="mt-2 text-2xl sm:text-3xl font-black font-mono tracking-tight text-pink-400">
                {currentStats.eng}
              </div>
              <div className="mt-2 inline-flex items-center gap-1 rounded-md bg-pink-500/15 px-2 py-0.5 text-[10px] font-mono font-bold text-pink-300 border border-pink-500/20">
                <span>{currentStats.engTrend}</span>
              </div>
            </div>

            {/* 3. Verified Views */}
            <div className="group rounded-2xl border border-white/[0.08] bg-white/[0.03] p-4 sm:p-5 transition-all hover:border-violet-500/40 hover:bg-white/[0.05] hover:shadow-lg">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 group-hover:text-slate-200 transition-colors">
                  Verified Views
                </span>
                <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-violet-500/15 text-violet-400">
                  <Sparkles className="h-3.5 w-3.5" />
                </div>
              </div>
              <div className="mt-2 text-2xl sm:text-3xl font-black font-mono tracking-tight text-violet-300">
                {currentStats.views}
              </div>
              <div className="mt-2 inline-flex items-center gap-1 rounded-md bg-violet-500/15 px-2 py-0.5 text-[10px] font-mono font-bold text-violet-300 border border-violet-500/20">
                <span>{currentStats.viewsTrend} retention</span>
              </div>
            </div>

            {/* 4. Conversions */}
            <div className="group rounded-2xl border border-white/[0.08] bg-white/[0.03] p-4 sm:p-5 transition-all hover:border-amber-500/40 hover:bg-white/[0.05] hover:shadow-lg">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 group-hover:text-slate-200 transition-colors">
                  Conversions
                </span>
                <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-amber-500/15 text-amber-400">
                  <ShoppingBag className="h-3.5 w-3.5" />
                </div>
              </div>
              <div className="mt-2 text-2xl sm:text-3xl font-black font-mono tracking-tight text-amber-300">
                {currentStats.conv}
              </div>
              <div className="mt-2 inline-flex items-center gap-1 rounded-md bg-amber-500/15 px-2 py-0.5 text-[10px] font-mono font-bold text-amber-300 border border-amber-500/20">
                <span>{currentStats.convTrend}</span>
              </div>
            </div>

            {/* 5. Attributed ROAS (Hero VIP Tile) */}
            <div className="col-span-2 sm:col-span-1 rounded-2xl border border-fuchsia-500/40 bg-gradient-to-br from-violet-950/70 via-purple-950/50 to-pink-950/60 p-4 sm:p-5 shadow-lg shadow-purple-950/40 relative overflow-hidden">
              <div className="pointer-events-none absolute right-0 top-0 h-20 w-20 rounded-full bg-pink-500/20 blur-xl" />
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase tracking-wider text-fuchsia-300 font-bold">
                  Attributed ROAS
                </span>
                <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-pink-500/25 text-pink-300">
                  <Zap className="h-3.5 w-3.5 fill-pink-400" />
                </div>
              </div>
              <div className="mt-2 text-3xl sm:text-4xl font-black font-mono tracking-tight text-white flex items-baseline gap-2">
                <span>{currentStats.roas}</span>
                <span className="text-xs font-mono text-fuchsia-300 font-bold">{currentStats.roasPeak}</span>
              </div>
              <div className="mt-2 inline-flex items-center gap-1 rounded-md bg-pink-500/20 px-2 py-0.5 text-[10px] font-mono font-bold text-pink-200 border border-pink-400/30">
                <ShieldCheck className="h-3 w-3 text-pink-300" />
                <span>Verified GMV return</span>
              </div>
            </div>
          </div>

          {/* Main Visuals Grid: Interactive Velocity Chart & Channel Breakdown */}
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 pt-4">
            
            {/* Left 8 Cols: Interactive Velocity Chart */}
            <div className="lg:col-span-8 rounded-2xl border border-white/[0.08] bg-black/40 p-5 sm:p-6 flex flex-col justify-between">
              {/* Chart Toolbar */}
              <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-white tracking-wide">
                    Impression & Engagement Velocity
                  </h3>
                  <p className="text-xs text-slate-400 font-mono">
                    Daily cumulative growth trajectory across active creator drops
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setActiveChartMetric('impressions')}
                    className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-mono font-semibold transition-all ${
                      activeChartMetric === 'impressions'
                        ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <span className="h-2 w-2 rounded-full bg-cyan-400" />
                    <span>Impressions</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveChartMetric('engagements')}
                    className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-mono font-semibold transition-all ${
                      activeChartMetric === 'engagements'
                        ? 'bg-pink-500/20 text-pink-300 border border-pink-500/30'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <span className="h-2 w-2 rounded-full bg-pink-400" />
                    <span>Engagements</span>
                  </button>
                </div>
              </div>

              {/* Live Hover Tooltip Snapshot */}
              <div className="mb-3 flex items-center justify-between rounded-xl bg-white/[0.04] px-4 py-2 border border-white/[0.06]">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-white">{activeNode.day}</span>
                  <span className="text-xs font-mono text-slate-400">({activeNode.date})</span>
                  <span className="text-[11px] font-mono text-emerald-400 font-semibold">• {activeNode.note}</span>
                </div>
                <div className="flex items-center gap-4 text-xs font-mono">
                  <span className="text-cyan-400">
                    Views: <strong className="text-white">{activeNode.imp}</strong>
                  </span>
                  <span className="text-pink-400">
                    Rate: <strong className="text-white">{activeNode.eng}</strong>
                  </span>
                </div>
              </div>

              {/* Dynamic SVG Velocity Chart */}
              <div className="w-full h-52 relative my-1 overflow-visible">
                <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="w-full h-full overflow-visible">
                  <defs>
                    <linearGradient id="cyanAreaGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.0" />
                    </linearGradient>
                    <linearGradient id="pinkAreaGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#ec4899" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#ec4899" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>

                  {/* Horizontal gridlines */}
                  <line x1="0" y1="25" x2={chartWidth} y2="25" stroke="rgba(255,255,255,0.06)" strokeDasharray="4 4" />
                  <line x1="0" y1="70" x2={chartWidth} y2="70" stroke="rgba(255,255,255,0.06)" strokeDasharray="4 4" />
                  <line x1="0" y1="115" x2={chartWidth} y2="115" stroke="rgba(255,255,255,0.06)" strokeDasharray="4 4" />

                  {/* Area Polygon Fill */}
                  <polygon
                    points={impArea}
                    fill={activeChartMetric === 'impressions' ? 'url(#cyanAreaGradient)' : 'url(#pinkAreaGradient)'}
                  />

                  {/* Impressions Polyline Stroke */}
                  <polyline
                    fill="none"
                    stroke="#22d3ee"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    points={impPoints}
                    className="transition-all duration-300"
                  />

                  {/* Engagements Polyline Stroke (Secondary Line) */}
                  <polyline
                    fill="none"
                    stroke="#f43f5e"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeDasharray={activeChartMetric === 'impressions' ? '5 5' : 'none'}
                    points={engPoints}
                    className="transition-all duration-300 opacity-80"
                  />

                  {/* Milestone Marker for Peak Drop (Day 20) */}
                  <line
                    x1={getX(5)}
                    y1="10"
                    x2={getX(5)}
                    y2={chartHeight}
                    stroke="#ec4899"
                    strokeWidth="1.5"
                    strokeDasharray="3 3"
                    className="opacity-75"
                  />
                  <circle cx={getX(5)} cy="10" r="3" fill="#ec4899" />

                  {/* Interactive Nodes */}
                  {timelineData.map((d, idx) => {
                    const cx = getX(idx);
                    const cy = activeChartMetric === 'impressions' ? getYImp(d.val) : getYEng(d.engVal);
                    const isHovered = hoveredPoint === idx;

                    return (
                      <g key={d.day} className="cursor-pointer" onMouseEnter={() => setHoveredPoint(idx)}>
                        <circle
                          cx={cx}
                          cy={cy}
                          r={isHovered ? '7' : '4.5'}
                          fill="#ffffff"
                          stroke={activeChartMetric === 'impressions' ? '#0891b2' : '#e11d48'}
                          strokeWidth="2.5"
                          className="transition-all"
                        />
                        {isHovered && (
                          <circle
                            cx={cx}
                            cy={cy}
                            r="12"
                            fill="none"
                            stroke="#ffffff"
                            strokeWidth="1.5"
                            className="animate-ping opacity-60"
                          />
                        )}
                      </g>
                    );
                  })}
                </svg>
              </div>

              {/* X-axis labels */}
              <div className="flex justify-between text-[11px] font-mono text-slate-400 pt-3 border-t border-white/[0.08]">
                {timelineData.map((d, i) => (
                  <span
                    key={d.day}
                    className={`cursor-pointer transition-colors ${
                      hoveredPoint === i ? 'text-cyan-400 font-bold' : 'hover:text-white'
                    }`}
                    onMouseEnter={() => setHoveredPoint(i)}
                  >
                    {d.day}
                  </span>
                ))}
              </div>
            </div>

            {/* Right 4 Cols: Channel Breakdown & Top Performing Creator */}
            <div className="lg:col-span-4 flex flex-col justify-between gap-4">
              
              {/* Channel Distribution Widget */}
              <div className="rounded-2xl border border-white/[0.08] bg-black/40 p-5">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xs font-bold uppercase tracking-wider font-mono text-slate-300">
                    Channel Distribution
                  </h3>
                  <span className="text-[10px] font-mono text-slate-400">Attributed Reach</span>
                </div>

                <div className="space-y-4">
                  {/* Instagram Reels */}
                  <div>
                    <div className="flex justify-between text-xs font-mono mb-1.5">
                      <span className="flex items-center gap-1.5 text-slate-200">
                        <InstagramIcon className="h-3.5 w-3.5 text-pink-400" />
                        <span>Instagram Reels</span>
                      </span>
                      <span className="font-bold text-white">58% <span className="text-[10px] text-slate-400 font-normal">(2.72M)</span></span>
                    </div>
                    <div className="h-2 w-full bg-white/[0.06] rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-pink-500 via-fuchsia-500 to-rose-500 rounded-full w-[58%]" />
                    </div>
                  </div>

                  {/* YouTube Shorts */}
                  <div>
                    <div className="flex justify-between text-xs font-mono mb-1.5">
                      <span className="flex items-center gap-1.5 text-slate-200">
                        <YoutubeIcon className="h-3.5 w-3.5 text-rose-500" />
                        <span>YouTube Shorts</span>
                      </span>
                      <span className="font-bold text-white">32% <span className="text-[10px] text-slate-400 font-normal">(1.50M)</span></span>
                    </div>
                    <div className="h-2 w-full bg-white/[0.06] rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-red-500 to-amber-500 rounded-full w-[32%]" />
                    </div>
                  </div>

                  {/* Regional Video */}
                  <div>
                    <div className="flex justify-between text-xs font-mono mb-1.5">
                      <span className="flex items-center gap-1.5 text-slate-200">
                        <Radio className="h-3.5 w-3.5 text-cyan-400" />
                        <span>Regional Video (Moj/ShareChat)</span>
                      </span>
                      <span className="font-bold text-white">10% <span className="text-[10px] text-slate-400 font-normal">(480K)</span></span>
                    </div>
                    <div className="h-2 w-full bg-white/[0.06] rounded-full overflow-hidden">
                      <div className="h-full bg-cyan-400 rounded-full w-[10%]" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Creator Leader Spotlight Card */}
              <div className="rounded-2xl border border-violet-500/30 bg-gradient-to-br from-indigo-950/50 via-purple-950/40 to-black/60 p-4 sm:p-5 shadow-lg">
                <div className="flex items-center justify-between mb-3">
                  <span className="inline-flex items-center gap-1 rounded-md bg-amber-500/20 px-2 py-0.5 text-[10px] font-mono font-bold text-amber-300 border border-amber-500/30">
                    ★ #1 Campaign Leader
                  </span>
                  <span className="text-[10px] font-mono text-emerald-400 font-bold">+6.2x ROAS</span>
                </div>

                <div className="flex items-center gap-3.5">
                  <div className="relative shrink-0">
                    <div className="h-12 w-12 rounded-xl overflow-hidden ring-2 ring-violet-400/50 shadow-md">
                      <img src="/images/creator_rhea.jpg" alt="Rhea Sen" width={48} height={48} loading="lazy" decoding="async" className="h-full w-full object-cover" />
                    </div>
                    <span className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-pink-500 text-[9px] font-bold text-white">
                      ✓
                    </span>
                  </div>

                  <div>
                    <h4 className="text-sm font-bold text-white">Rhea Sen</h4>
                    <p className="text-xs text-slate-300 font-mono">1.4M Views • 124K Likes</p>
                    <p className="text-[11px] text-slate-400 mt-0.5">Top conversion driver for festive drop</p>
                  </div>
                </div>
              </div>

              {/* Real-time Attribution Log */}
              <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-3 text-[11px] font-mono text-slate-400 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-slate-300 truncate">128 new conversions tracked</span>
                </div>
                <span className="text-slate-500 shrink-0">14:32:05</span>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
