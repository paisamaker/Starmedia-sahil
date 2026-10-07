import React from 'react';
import {
  Clock,
  Mail,
  MapPin,
  MessageCircle,
  Sparkles,
  ArrowRight,
  UserPlus,
  ShieldCheck,
} from 'lucide-react';
import { InstagramIcon } from './SocialIcons';

const INSTAGRAM_URL = 'https://www.instagram.com/starmedia_influencer/';
const WHATSAPP_URL = 'https://wa.me/919999999999';

const details = [
  {
    label: 'Email',
    icon: Mail,
    tone: 'bg-violet-100/80 text-violet-700',
    content: (
      <a
        href="mailto:contact@starmediainfluencer.com"
        className="text-xs sm:text-sm font-bold text-stone-900 hover:text-violet-700 transition-colors"
      >
        contact@starmediainfluencer.com
      </a>
    ),
  },
  {
    label: 'Office Address',
    icon: MapPin,
    tone: 'bg-pink-100/80 text-pink-700',
    content: (
      <p className="text-xs sm:text-sm font-semibold leading-snug text-stone-800">
        Kanchenjunga Bldg, 18, Barakhamba Rd, Fire Brigade Lane, Barakhamba, New Delhi, Delhi 110001
      </p>
    ),
  },
  {
    label: 'Working Hours',
    icon: Clock,
    tone: 'bg-amber-100/80 text-amber-700',
    content: (
      <p className="text-xs sm:text-sm font-bold text-stone-900">
        Mon–Sat: 10:00 AM – 7:00 PM IST
      </p>
    ),
  },
];

export default function ContactSection({ onStartCampaign, onJoinCreator }) {
  return (
    <section id="contact" className="relative w-full overflow-hidden bg-[#F7F6F3] py-10 sm:py-12 text-stone-950">
      {/* Full-Screen Edge-to-Edge Responsive Grid */}
      <div className="relative z-10 w-full px-5 sm:px-8 lg:px-12 xl:px-16 2xl:px-20">
        <div className="grid grid-cols-1 items-stretch gap-6 lg:grid-cols-12 lg:gap-8">
          {/* Left Column: Official Contact & Location Details (5 cols on lg) */}
          <div className="flex flex-col justify-between lg:col-span-5">
            <div>
              <div className="flex items-center gap-3">
                <img
                  src="/star-media-logo-transparent.png"
                  alt="STAR MEDIA"
                  width={56}
                  height={56}
                  loading="lazy"
                  decoding="async"
                  className="h-12 w-12 sm:h-14 sm:w-14 object-contain drop-shadow-xs"
                />
                <div className="flex flex-col leading-none">
                  <span className="font-sans text-xl sm:text-2xl font-black tracking-wide text-stone-950">
                    STAR MEDIA
                  </span>
                  <span className="mt-0.5 text-[10px] sm:text-[11px] font-extrabold uppercase tracking-[0.24em] text-red-600">
                    INFLUENCER
                  </span>
                </div>
              </div>

              <h2 className="mt-4 text-xl sm:text-2xl font-black tracking-tight text-stone-950">
                Contact Details
              </h2>

              <ul className="mt-3.5 space-y-2.5">
                {details.map((item) => {
                  const Icon = item.icon;
                  return (
                    <li key={item.label} className="flex items-start gap-3 rounded-xl border border-stone-200/70 bg-white/70 p-2.5 sm:p-3 shadow-xs">
                      <span
                        className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${item.tone} shadow-xs`}
                      >
                        <Icon className="h-4 w-4" aria-hidden="true" />
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-stone-500">
                          {item.label}
                        </p>
                        <div className="mt-0.5">{item.content}</div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="mt-4">
              <p className="text-[11px] font-bold uppercase tracking-wider text-stone-500">
                Quick Connect
              </p>
              <div className="mt-2 flex flex-wrap gap-2.5">
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-stone-950 px-4 py-2 text-xs font-bold text-white transition-all hover:bg-stone-800 active:scale-95 shadow-sm"
                >
                  <MessageCircle className="h-3.5 w-3.5" aria-hidden="true" />
                  WhatsApp
                </a>
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-stone-300 bg-white px-4 py-2 text-xs font-bold text-stone-900 transition-all hover:border-pink-300 hover:text-pink-600 active:scale-95 shadow-xs"
                >
                  <InstagramIcon className="h-3.5 w-3.5" />
                  Instagram
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Campaign Launch CTA Card (7 cols on lg, sleek & compact) */}
          <div className="relative flex flex-col justify-between overflow-hidden rounded-3xl border border-white/10 bg-[#070A12] p-6 sm:p-7 lg:p-8 shadow-2xl lg:col-span-7">
            {/* Ambient Center Glow */}
            <div className="pointer-events-none absolute left-1/2 top-1/2 h-[240px] w-[380px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-indigo-600/25 via-purple-600/30 to-pink-600/25 blur-[75px]" />

            {/* Grid Overlay */}
            <div className="pointer-events-none absolute inset-0 bg-grid-pattern opacity-25" />

            <div className="relative z-10 text-center">
              {/* Kicker Badge */}
              <div className="mb-2.5 inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-0.5 text-[10px] font-bold uppercase tracking-widest text-indigo-300 backdrop-blur-md">
                <Sparkles className="h-3 w-3 text-pink-400" />
                <span>ACCELERATE YOUR INFLUENCE</span>
              </div>

              {/* Headline */}
              <h3 className="mx-auto max-w-lg text-2xl font-black tracking-tight text-white sm:text-3xl lg:text-4xl leading-tight">
                Your next campaign{' '}
                <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  starts here.
                </span>
              </h3>

              {/* Subtitle */}
              <p className="mx-auto mt-2 max-w-md text-xs sm:text-sm font-normal leading-relaxed text-slate-300">
                Join 500+ category leaders and 10,000+ vetted creators shaping modern consumer culture. Launch your brief in 5 minutes.
              </p>

              {/* Action Buttons */}
              <div className="mt-4 sm:mt-5 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={onStartCampaign}
                  className="group flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-6 py-2.5 sm:py-3 text-xs sm:text-sm font-bold uppercase tracking-wider text-white shadow-lg shadow-indigo-500/30 transition-all hover:scale-105 hover:shadow-indigo-500/50 active:scale-95 sm:w-auto"
                >
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>Start a Campaign</span>
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </button>

                <button
                  type="button"
                  onClick={onJoinCreator}
                  className="flex w-full items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-2.5 sm:py-3 text-xs sm:text-sm font-bold uppercase tracking-wider text-white backdrop-blur-md transition-all hover:bg-white/10 hover:scale-105 active:scale-95 sm:w-auto"
                >
                  <UserPlus className="h-3.5 w-3.5 text-slate-300" />
                  <span>Join as Creator</span>
                </button>
              </div>
            </div>

            {/* Reassurance Footer Pills */}
            <div className="relative z-10 mt-4 flex flex-wrap items-center justify-center gap-3 border-t border-white/10 pt-3 text-[11px] sm:text-xs font-semibold text-slate-400">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
                No Long-Term Contracts
              </span>
              <span className="hidden text-slate-600 sm:inline">•</span>
              <span className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
                24-Hour Creator Shortlist
              </span>
              <span className="hidden text-slate-600 sm:inline">•</span>
              <span className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-pink-400" />
                Escrow Protected Payouts
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
