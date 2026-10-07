import React from 'react';
import {
  Mail,
  MapPin,
  Clock,
  Phone,
  ShieldCheck,
  Sparkles,
  ArrowUpRight,
  MessageCircle,
} from 'lucide-react';
import { InstagramIcon, YoutubeIcon, LinkedinIcon } from './SocialIcons';

const platformLinks = [
  { label: 'Home', id: 'home' },
  { label: 'Discover Creators', id: 'creators' },
  { label: 'Campaign Feed', id: 'discover' },
  { label: 'ROI Estimator', id: 'campaigns' },
  { label: 'Case Studies', id: 'work' },
  { label: 'Insights & Blog', id: 'insights' },
  { label: 'Contact Desk', id: 'contact' },
];

const creatorVerticals = [
  { label: 'Fashion & Luxury', id: 'creators' },
  { label: 'Technology & AI', id: 'creators' },
  { label: 'Beauty & Skincare', id: 'creators' },
  { label: 'Food & Dining', id: 'creators' },
  { label: 'Gaming & Esports', id: 'creators' },
  { label: 'Health & Fitness', id: 'creators' },
];

export default function Footer({ onNavigate }) {
  const INSTAGRAM_URL = 'https://www.instagram.com/starmedia_influencer/';
  const WHATSAPP_URL = 'https://wa.me/919999999999';
  const EMAIL_ADDRESS = 'contact@starmediainfluencer.com';
  const OFFICE_ADDRESS =
    'Kanchenjunga Bldg, 18, Barakhamba Rd, Fire Brigade Lane, Barakhamba, New Delhi, Delhi 110001';

  return (
    <footer className="relative w-full overflow-hidden border-t border-stone-200/90 bg-[#F8F7FB] text-stone-700">
      {/* Soft Ambient Light Glow */}
      <div className="pointer-events-none absolute -left-20 top-0 h-60 w-60 rounded-full bg-violet-200/30" />
      <div className="pointer-events-none absolute -right-20 bottom-0 h-60 w-60 rounded-full bg-pink-200/20" />

      {/* Full-Screen Main Footer Grid (Compact Vertical Length) */}
      <div className="relative z-10 w-full px-5 pt-8 pb-5 sm:px-8 lg:px-12 xl:px-16 2xl:px-20">
        <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          {/* Column 1: Brand Info & Bio (4 cols on lg) */}
          <div className="lg:col-span-4">
            <a
              href="#home"
              onClick={(event) => {
                event.preventDefault();
                onNavigate?.('home');
              }}
              className="group flex items-center gap-2.5 text-left"
            >
              <img
                src="/star-media-logo-transparent.png"
                alt="STAR MEDIA"
                width={44}
                height={44}
                loading="lazy"
                decoding="async"
                className="h-10 w-10 sm:h-11 sm:w-11 object-contain drop-shadow-xs transition-transform duration-200 group-hover:scale-105"
              />
              <div className="flex flex-col leading-none">
                <span className="font-sans text-xl font-black tracking-wider text-stone-950">
                  STAR MEDIA
                </span>
                <span className="mt-0.5 text-[10px] font-extrabold uppercase tracking-[0.24em] text-red-600">
                  INFLUENCER
                </span>
              </div>
            </a>

            <p className="mt-2.5 max-w-sm text-xs sm:text-sm font-medium leading-relaxed text-stone-600">
              India's premier creator influence and performance marketing ecosystem. Connecting
              forward-thinking brands with 10,000+ authentic, brand-safe cultural voices.
            </p>

            {/* Quick Connect CTA Badges */}
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-1.5 rounded-full border border-pink-300 bg-pink-50 px-3 py-1 text-xs font-bold text-pink-700 shadow-xs transition-all hover:border-pink-400 hover:bg-pink-100 hover:text-pink-900"
              >
                <InstagramIcon className="h-3.5 w-3.5 text-pink-600 transition-transform group-hover:scale-110" />
                <span>@starmedia_influencer</span>
                <ArrowUpRight className="h-3 w-3 opacity-70" />
              </a>

              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-1.5 rounded-full border border-emerald-300 bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700 shadow-xs transition-all hover:border-emerald-400 hover:bg-emerald-100 hover:text-emerald-900"
              >
                <MessageCircle className="h-3.5 w-3.5 text-emerald-600" />
                <span>Quick WhatsApp</span>
              </a>
            </div>

            {/* Live Trust Pill */}
            <div className="mt-2.5 inline-flex items-center gap-2 rounded-full border border-stone-200 bg-white px-3 py-0.5 text-[11px] font-semibold text-stone-700 shadow-xs">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              <span>10K+ Hand-Verified Indian Creators</span>
            </div>
          </div>

          {/* Column 2: Navigation Links (2 cols on lg) */}
          <div className="lg:col-span-2">
            <h2 className="text-xs sm:text-sm font-extrabold uppercase tracking-[0.16em] text-stone-950">
              Platform
            </h2>
            <ul className="mt-2.5 space-y-1.5">
              {platformLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={`#${link.id}`}
                    onClick={(event) => {
                      event.preventDefault();
                      onNavigate?.(link.id);
                    }}
                    className="text-xs sm:text-sm font-semibold text-stone-600 transition-colors hover:text-stone-950"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Creator Verticals (2 cols on lg) */}
          <div className="lg:col-span-2">
            <h2 className="text-xs sm:text-sm font-extrabold uppercase tracking-[0.16em] text-stone-950">
              Top Verticals
            </h2>
            <ul className="mt-2.5 space-y-1.5">
              {creatorVerticals.map((vert) => (
                <li key={vert.label}>
                  <a
                    href={`#${vert.id}`}
                    onClick={(event) => {
                      event.preventDefault();
                      onNavigate?.(vert.id);
                    }}
                    className="text-xs sm:text-sm font-semibold text-stone-600 transition-colors hover:text-stone-950"
                  >
                    {vert.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Comprehensive Contact Details (4 cols on lg) */}
          <div className="lg:col-span-4">
            <h2 className="text-xs sm:text-sm font-extrabold uppercase tracking-[0.16em] text-stone-950">
              Contact & Headquarters
            </h2>

            <div className="mt-2.5 space-y-2">
              {/* Email */}
              <a
                href={`mailto:${EMAIL_ADDRESS}`}
                className="group flex items-center gap-3 rounded-xl border border-stone-200/90 bg-white px-3 py-2 shadow-xs transition-all hover:border-violet-300 hover:bg-stone-50/70"
              >
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-violet-100/80 text-violet-700 transition-colors group-hover:bg-violet-700 group-hover:text-white">
                  <Mail className="h-3.5 w-3.5" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-stone-400">
                    Official Email
                  </div>
                  <div className="truncate text-xs sm:text-sm font-bold text-stone-950 group-hover:text-violet-700">
                    {EMAIL_ADDRESS}
                  </div>
                </div>
              </a>

              {/* Office Address */}
              <div className="flex items-start gap-3 rounded-xl border border-stone-200/90 bg-white px-3 py-2 shadow-xs">
                <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-pink-100/80 text-pink-700">
                  <MapPin className="h-3.5 w-3.5" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-stone-400">
                    Office Address
                  </div>
                  <p className="text-xs font-semibold leading-snug text-stone-800">
                    {OFFICE_ADDRESS}
                  </p>
                </div>
              </div>

              {/* Working Hours & Call Desk */}
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                <div className="flex items-center gap-2.5 rounded-xl border border-stone-200/90 bg-white px-3 py-2 shadow-xs">
                  <Clock className="h-3.5 w-3.5 shrink-0 text-amber-600" />
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-wider text-stone-400">
                      Working Hours
                    </div>
                    <div className="text-xs font-bold text-stone-950">
                      Mon–Sat: 10AM–7PM
                    </div>
                  </div>
                </div>

                <a
                  href="tel:+919999999999"
                  className="flex items-center gap-2.5 rounded-xl border border-stone-200/90 bg-white px-3 py-2 shadow-xs transition-colors hover:border-emerald-300 hover:bg-stone-50/70"
                >
                  <Phone className="h-3.5 w-3.5 shrink-0 text-emerald-600" />
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-wider text-stone-400">
                      Call Desk
                    </div>
                    <div className="text-xs font-bold text-stone-950">
                      +91 99999 99999
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Single Compact Bottom Bar (Combines Copyright, Badges, Socials & Legal) */}
        <div className="mt-6 flex flex-col items-center justify-between gap-3 border-t border-stone-200/70 pt-4 text-xs font-medium text-stone-600 sm:flex-row">
          <div className="flex flex-wrap items-center gap-3">
            <span className="font-semibold text-stone-900">
              © {new Date().getFullYear()} STAR MEDIA INFLUENCER.
            </span>
            <span>•</span>
            <span className="flex items-center gap-1 font-semibold text-stone-700">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
              100% Brand-Safe
            </span>
            <span>•</span>
            <span className="flex items-center gap-1 font-semibold text-stone-700">
              <Sparkles className="h-3.5 w-3.5 text-pink-500" />
              Certified Agency
            </span>
            <span>•</span>
            <span className="text-stone-500">New Delhi, India 🇮🇳</span>
          </div>

          {/* Social Links & Legal */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-1.5">
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="flex h-7 w-7 items-center justify-center rounded-full border border-stone-200 bg-white text-stone-700 shadow-xs transition-all hover:border-pink-300 hover:bg-pink-50 hover:text-pink-600"
              >
                <InstagramIcon className="h-3.5 w-3.5" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                aria-label="YouTube"
                className="flex h-7 w-7 items-center justify-center rounded-full border border-stone-200 bg-white text-stone-700 shadow-xs transition-all hover:border-red-300 hover:bg-red-50 hover:text-red-600"
              >
                <YoutubeIcon className="h-3.5 w-3.5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="flex h-7 w-7 items-center justify-center rounded-full border border-stone-200 bg-white text-stone-700 shadow-xs transition-all hover:border-sky-300 hover:bg-sky-50 hover:text-sky-600"
              >
                <LinkedinIcon className="h-3.5 w-3.5" />
              </a>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noreferrer"
                aria-label="WhatsApp"
                className="flex h-7 w-7 items-center justify-center rounded-full border border-stone-200 bg-white text-stone-700 shadow-xs transition-all hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-600"
              >
                <Phone className="h-3.5 w-3.5" />
              </a>
            </div>

            <span className="text-stone-300">•</span>

            <div className="flex items-center gap-3 text-[11px] text-stone-500">
              <span className="cursor-pointer hover:text-stone-900">Privacy</span>
              <span>•</span>
              <span className="cursor-pointer hover:text-stone-900">Terms</span>
              <span>•</span>
              <span className="cursor-pointer hover:text-stone-900">Safety</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
