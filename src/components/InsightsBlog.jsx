import React from 'react';
import { BookOpen, Clock, ArrowUpRight, Sparkles } from 'lucide-react';

export default function InsightsBlog({ onSelectPost }) {
  const featuredArticle = {
    id: 'blog-spotlight',
    title: 'Your Brand. Our Influencers: Turning Creator Ideas into High-Velocity Impact',
    category: 'STAR MEDIA Playbook',
    badge: 'Featured Agency Guide',
    readTime: '3 min read',
    date: 'Oct 2026',
    image: '/images/star-media-agency-poster.png',
    snippet:
      '5,000+ creators, millions in reach, and real brand results. Discover how our full-service influencer marketing, brand shoots, and product reviews drive measurable sales.',
    highlights: ['5,000+ Verified Creators', 'End-to-End Production', 'Predictive ROI'],
  };

  const stackedArticles = [
    {
      id: 'blog-1',
      title: 'The 2026 Creator Economy Report: Why Community Outperforms Billboard Scale',
      category: 'Market Intelligence',
      badge: 'Research Paper',
      readTime: '5 min read',
      date: 'Oct 2026',
      image: '/images/dashboard_preview.jpg',
      snippet:
        'An analytical study of 2,400+ campaigns revealing why micro and macro creator clusters deliver 3.2x higher conversion attribution than legacy celebrity sponsorships.',
    },
    {
      id: 'blog-2',
      title: 'Algorithmic Sound Waves: How 15-Second Audio Hooks Drive Viral Product Drops',
      category: 'Viral Engineering',
      badge: 'Trend Teardown',
      readTime: '4 min read',
      date: 'Sep 2026',
      image: '/images/case_study_fashion.jpg',
      snippet:
        'Breaking down how custom audio frequencies and lip-sync trend cycles create subconscious purchase intent on Instagram Reels and YouTube Shorts.',
    },
  ];

  return (
    <section id="insights" className="relative w-full overflow-hidden border-t border-stone-200/80 bg-[#F8F7FA] py-10 sm:py-14 text-stone-900">
      {/* Soft Ambient Light Glow */}
      <div className="pointer-events-none absolute -left-20 top-0 h-64 w-64 rounded-full bg-violet-200/30" />
      <div className="pointer-events-none absolute -right-20 bottom-0 h-64 w-64 rounded-full bg-pink-200/25" />

      {/* Full-Screen Edge-to-Edge Container */}
      <div className="relative z-10 w-full px-5 sm:px-8 lg:px-12 xl:px-16 2xl:px-20">
        {/* Header Bar */}
        <div className="mb-7 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <div className="mb-2 inline-flex items-center gap-1.5 rounded-full border border-violet-200/70 bg-violet-50/90 px-3 py-0.5 text-[11px] font-bold uppercase tracking-wider text-violet-700 shadow-xs">
              <BookOpen className="h-3 w-3" />
              <span>CREATOR INSIGHTS & BLOG</span>
            </div>
            <h2 className="text-2xl font-black tracking-tight text-stone-950 sm:text-3xl lg:text-4xl">
              Latest Insights & Playbooks
            </h2>
          </div>
          <p className="max-w-md text-xs sm:text-sm font-medium leading-relaxed text-stone-500">
            Actionable research, agency playbooks, and algorithm teardowns published by the STAR MEDIA strategy desk.
          </p>
        </div>

        {/* 2-Column Full Screen Layout (Left Big Card + Right 2 Stacked Cards) */}
        <div className="grid grid-cols-1 items-stretch gap-6 lg:grid-cols-12 lg:gap-8">
          {/* LEFT: One Featured Card (7 cols) with Controlled Image Height */}
          <div className="lg:col-span-7">
            <article
              onClick={() => onSelectPost?.(featuredArticle)}
              className="group flex h-full cursor-pointer flex-col justify-between rounded-2xl border border-stone-200/90 bg-white p-4.5 sm:p-5 shadow-[0_4px_20px_rgba(28,25,23,0.04)] transition-all duration-300 hover:-translate-y-1 hover:border-violet-300 hover:shadow-xl"
            >
              <div>
                {/* Visual Poster (Controlled Height on Full-Screen) */}
                <div className="relative mb-3.5 h-48 sm:h-56 lg:h-60 w-full overflow-hidden rounded-xl bg-stone-100 shadow-xs">
                  <img
                    src={featuredArticle.image}
                    alt={featuredArticle.title}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute left-3 top-3 flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-gradient-to-r from-red-600 to-rose-600 px-2.5 py-0.5 text-[10px] font-bold text-white shadow-sm">
                      {featuredArticle.category}
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-full bg-white/95 px-2.5 py-0.5 text-[10px] font-extrabold text-stone-900 shadow-sm backdrop-blur-md">
                      <Sparkles className="h-2.5 w-2.5 text-red-600" />
                      Featured Guide
                    </span>
                  </div>
                </div>

                {/* Metadata Row */}
                <div className="mb-1.5 flex items-center gap-2.5 text-xs font-semibold text-stone-400">
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3 text-stone-400" />
                    {featuredArticle.readTime}
                  </span>
                  <span>•</span>
                  <span>{featuredArticle.date}</span>
                </div>

                {/* Title */}
                <h3 className="line-clamp-2 text-lg sm:text-xl font-bold leading-snug tracking-tight text-stone-950 transition-colors group-hover:text-violet-700">
                  {featuredArticle.title}
                </h3>

                {/* Description */}
                <p className="mt-2 line-clamp-2 text-xs sm:text-sm leading-relaxed text-stone-500">
                  {featuredArticle.snippet}
                </p>

                {/* Bullet Tags */}
                <div className="mt-3 flex flex-wrap items-center gap-1.5">
                  {featuredArticle.highlights.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1 rounded-full border border-stone-200 bg-stone-50 px-2.5 py-0.5 text-[11px] font-semibold text-stone-600"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom Action Row */}
              <div className="mt-4 flex items-center justify-between border-t border-stone-100 pt-3 text-xs font-bold text-violet-700 transition-colors group-hover:text-pink-600">
                <span className="flex items-center gap-1.5">
                  <span>Read Full Agency Playbook</span>
                </span>
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-violet-50 text-violet-700 transition-transform group-hover:scale-110 group-hover:bg-pink-50 group-hover:text-pink-600">
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </div>
              </div>
            </article>
          </div>

          {/* RIGHT: Two Small Cards in Vertical Stack (5 cols) */}
          <div className="flex flex-col justify-between gap-4 sm:gap-5 lg:col-span-5">
            {stackedArticles.map((art) => (
              <article
                key={art.id}
                onClick={() => onSelectPost?.(art)}
                className="group flex flex-1 cursor-pointer flex-col justify-between rounded-2xl border border-stone-200/90 bg-white p-4 sm:p-4.5 shadow-[0_4px_20px_rgba(28,25,23,0.04)] transition-all duration-300 hover:-translate-y-1 hover:border-violet-300 hover:shadow-xl"
              >
                <div>
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start">
                    {/* Compact Thumbnail */}
                    <div className="relative h-28 w-full sm:h-28 sm:w-36 shrink-0 overflow-hidden rounded-lg bg-stone-100">
                      <img
                        src={art.image}
                        alt={art.title}
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute left-2 top-2 rounded-full bg-stone-900/85 px-2 py-0.5 text-[9px] font-bold text-white backdrop-blur-md">
                        {art.category}
                      </div>
                    </div>

                    {/* Content Details */}
                    <div className="min-w-0 flex-1">
                      <div className="mb-1 flex items-center gap-2 text-[11px] font-semibold text-stone-400">
                        <span className="flex items-center gap-1">
                          <Clock className="h-2.5 w-2.5 text-stone-400" />
                          {art.readTime}
                        </span>
                        <span>•</span>
                        <span>{art.date}</span>
                      </div>

                      <h4 className="line-clamp-2 text-sm sm:text-base font-bold leading-snug text-stone-900 transition-colors group-hover:text-violet-700">
                        {art.title}
                      </h4>

                      <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-stone-500">
                        {art.snippet}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Card Action Link */}
                <div className="mt-3 flex items-center justify-between border-t border-stone-100 pt-2.5 text-xs font-bold text-violet-700 transition-colors group-hover:text-pink-600">
                  <span>Read Research Teardown</span>
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
