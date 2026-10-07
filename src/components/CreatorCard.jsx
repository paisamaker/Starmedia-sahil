import React from 'react';
import { ArrowUpRight, BadgeCheck, MapPin, Play } from 'lucide-react';
import { InstagramIcon, YoutubeIcon } from './SocialIcons';

function PlatformMark({ name }) {
  if (name === 'Instagram' || name === 'Reels') {
    return <InstagramIcon className="h-3.5 w-3.5" />;
  }
  if (name === 'YouTube' || name === 'Shorts') {
    return <YoutubeIcon className="h-3.5 w-3.5" />;
  }
  return <Play className="h-3.5 w-3.5" />;
}

export default function CreatorCard({ creator, onSelect }) {
  const niches = [creator.category, ...creator.tags.slice(0, 2)];

  return (
    <article className="group relative flex h-full flex-col justify-between overflow-hidden rounded-[28px] border border-white/20 bg-stone-900 shadow-[0_12px_36px_rgba(0,0,0,0.18)] transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.3)]">
      {/* 1. Full Card Background Image */}
      <img 
        src={creator.fullImage || creator.avatar} 
        alt={creator.name} 
        loading="lazy"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105" 
      />

      {/* 2. Transparent Dark-to-Clear Vignette / Gradient Overlay */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/95 via-black/45 via-50% to-black/30" />

      {/* 3. Top Floating Glass Bar */}
      <div className="relative z-10 flex items-center justify-between p-3.5 sm:p-4">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-violet-700 shadow-md backdrop-blur-md">
          <BadgeCheck className="h-3.5 w-3.5 fill-violet-600 text-white" />
          Verified
        </span>

        <div className="flex items-center gap-1.5">
          <span className="rounded-full bg-black/40 px-2.5 py-1 text-[11px] font-semibold text-white backdrop-blur-md border border-white/10">
            {creator.category}
          </span>
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-md border border-white/10">
            <InstagramIcon className="h-3.5 w-3.5" />
          </span>
        </div>
      </div>

      {/* 4. Bottom Transparent Glass Content Panel */}
      <div className="relative z-10 flex flex-col justify-end p-4 sm:p-5 text-white">
        
        {/* Creator Name & Location */}
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="text-xl sm:text-2xl font-black tracking-tight text-white drop-shadow-sm group-hover:text-pink-300 transition-colors">
              {creator.name}
            </h3>
            <p className="text-xs text-white/80 font-mono flex items-center gap-1.5 mt-0.5">
              <span>{creator.username}</span>
              <span className="text-white/40">•</span>
              <span className="inline-flex items-center gap-0.5 text-white/70">
                <MapPin className="h-3 w-3" />
                {creator.location}
              </span>
            </p>
          </div>
        </div>

        {/* Niche Pills */}
        <div className="mt-2.5 flex flex-wrap gap-1.5">
          {niches.map((niche) => (
            <span
              key={niche}
              className="rounded-full bg-white/15 px-2.5 py-0.5 text-[11px] font-medium text-white/90 backdrop-blur-md border border-white/10"
            >
              #{niche}
            </span>
          ))}
        </div>

        {/* Translucent Glass KPI Metrics Row */}
        <div className="mt-3 grid grid-cols-3 gap-2 rounded-2xl bg-black/40 p-2.5 text-center backdrop-blur-md border border-white/15 shadow-inner">
          <div>
            <div className="text-sm font-extrabold text-white font-mono">{creator.followers}</div>
            <div className="text-[10px] text-white/60 uppercase tracking-wider font-semibold">Followers</div>
          </div>
          <div className="border-x border-white/10">
            <div className="text-sm font-extrabold text-pink-400 font-mono">{creator.engagement}</div>
            <div className="text-[10px] text-white/60 uppercase tracking-wider font-semibold">Eng. Rate</div>
          </div>
          <div>
            <div className="text-sm font-extrabold text-cyan-300 font-mono">{creator.avgViews}</div>
            <div className="text-[10px] text-white/60 uppercase tracking-wider font-semibold">Avg. Reach</div>
          </div>
        </div>

        {/* Transparent Glass "View Profile" Button */}
        <button
          type="button"
          onClick={() => onSelect?.(creator)}
          className="mt-3 inline-flex w-full items-center justify-center gap-1.5 rounded-full border border-white/25 bg-white/20 py-2.5 text-xs sm:text-sm font-bold text-white shadow-lg backdrop-blur-md transition-all duration-300 hover:border-white hover:bg-white hover:text-stone-950 active:scale-[0.98]"
        >
          <span>View Profile</span>
          <ArrowUpRight className="h-4 w-4" />
        </button>
      </div>
    </article>
  );
}
