import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  ArrowUpRight,
  Briefcase,
  Sparkles,
  Target,
  TrendingUp,
  Users,
  Video,
  CheckCircle2,
  ShieldCheck,
  Zap,
  ArrowRight,
} from 'lucide-react';
import { servicesData } from '../data/services';

const iconMap = {
  Sparkles,
  Users,
  Briefcase,
  TrendingUp,
  Video,
  Target,
};

const ease = [0.22, 1, 0.36, 1];

export default function Services({ onSelectService }) {
  const reduced = useReducedMotion();

  return (
    <section id="services" className="relative w-full overflow-hidden bg-[#FAF9F6] py-20 text-stone-900 sm:py-28 border-t border-stone-200/60">
      {/* Ambient background soft glow */}
      <div className="pointer-events-none absolute -left-32 top-20 h-96 w-96 rounded-full bg-pink-100/30" />
      <div className="pointer-events-none absolute -right-32 bottom-20 h-96 w-96 rounded-full bg-violet-100/30" />

      <div className="relative z-10 w-full px-5 sm:px-8 lg:px-12 xl:px-16 2xl:px-20">
        
        {/* Section Header */}
        <motion.div
          className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between"
          initial={reduced ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, ease }}
        >
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-pink-200/80 bg-pink-50/90 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-pink-700 shadow-sm">
              <Sparkles className="h-3.5 w-3.5 fill-pink-500 text-pink-500" />
              <span>Full-Stack Influence Architecture</span>
            </div>

            <h2 className="mt-3 text-3xl font-black tracking-tight text-stone-950 sm:text-5xl lg:text-6xl">
              Our{' '}
              <span className="bg-gradient-to-r from-pink-500 via-fuchsia-500 to-violet-600 bg-clip-text text-transparent">
                Services
              </span>
            </h2>

            <p className="mt-2.5 max-w-2xl text-sm leading-relaxed text-stone-600 sm:text-base">
              From algorithmic creator curation to conversion-driven short-form UGC pipelines, we engineer campaigns that capture culture and drive verifiable revenue.
            </p>
          </div>

          {/* Header Right Capability Highlights */}
          <div className="flex flex-wrap items-center gap-2 self-start lg:self-auto">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-stone-200 bg-white px-3.5 py-1.5 text-xs font-bold text-stone-700 shadow-sm">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
              100% Brand Safe
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-stone-200 bg-white px-3.5 py-1.5 text-xs font-bold text-stone-700 shadow-sm">
              <Zap className="h-3.5 w-3.5 text-amber-500" />
              4.8x Avg ROAS
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-stone-200 bg-white px-3.5 py-1.5 text-xs font-bold text-stone-700 shadow-sm">
              <CheckCircle2 className="h-3.5 w-3.5 text-pink-500" />
              On-Time SLA Guarantee
            </span>
          </div>
        </motion.div>

        {/* 6 High-Impact Capabilities Grid */}
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {servicesData.map((service, index) => {
            const Icon = iconMap[service.icon] || Sparkles;
            const isFeatured = service.featured;

            if (isFeatured) {
              return (
                <motion.article
                  key={service.id}
                  className="group relative flex h-full flex-col justify-between overflow-hidden rounded-[32px] border border-stone-800 bg-[#0C101E] p-7 sm:p-8 text-white shadow-[0_25px_60px_rgba(12,16,30,0.3)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_30px_70px_rgba(244,63,94,0.18)]"
                  initial={reduced ? false : { opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.45, ease, delay: reduced ? 0 : index * 0.08 }}
                >
                  {/* Atmospheric neon backlights */}
                  <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-pink-500/20" />
                  <div className="pointer-events-none absolute -bottom-16 -left-16 h-56 w-56 rounded-full bg-violet-500/15" />

                  <div className="relative z-10">
                    {/* Top Row: Index, Badge, Icon */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-pink-400">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                        <span className="rounded-full border border-pink-500/30 bg-pink-500/15 px-2.5 py-0.5 text-[10px] font-mono font-bold uppercase tracking-wider text-pink-300">
                          {service.highlight}
                        </span>
                      </div>

                      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-500 to-rose-600 text-white shadow-lg shadow-pink-500/30">
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </div>
                    </div>

                    {/* Title & Tagline */}
                    <h3 className="mt-6 text-2xl font-black tracking-tight text-white group-hover:text-pink-300 transition-colors">
                      {service.name}
                    </h3>
                    <p className="mt-1 text-xs font-mono font-semibold uppercase tracking-wider text-pink-400">
                      {service.tagline}
                    </p>

                    {/* Description */}
                    <p className="mt-3 text-sm leading-relaxed text-slate-300">
                      {service.description}
                    </p>

                    {/* Deliverables Chips */}
                    <div className="mt-5 grid grid-cols-2 gap-2 border-t border-white/10 pt-4">
                      {service.deliverables.map((item) => (
                        <div key={item} className="flex items-center gap-1.5 text-xs text-slate-300">
                          <CheckCircle2 className="h-3.5 w-3.5 text-pink-400 shrink-0" />
                          <span className="truncate">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Card Bottom Bar */}
                  <div className="relative z-10 mt-6 flex items-center justify-between gap-3 border-t border-white/10 pt-5">
                    <span className="rounded-xl border border-pink-500/30 bg-pink-500/15 px-3 py-1 font-mono text-xs font-bold text-pink-300">
                      {service.metric}
                    </span>

                    <button
                      type="button"
                      onClick={() => onSelectService?.(service)}
                      className="inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-xs font-bold text-stone-950 transition-all hover:bg-pink-500 hover:text-white shadow-md active:scale-95"
                    >
                      <span>Explore Strategy</span>
                      <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </button>
                  </div>
                </motion.article>
              );
            }

            return (
              <motion.article
                key={service.id}
                className="group relative flex h-full flex-col justify-between rounded-[32px] border border-stone-200/90 bg-white p-7 sm:p-8 shadow-[0_12px_36px_rgba(28,25,23,0.05)] transition-all duration-300 hover:-translate-y-1.5 hover:border-pink-300/80 hover:shadow-[0_20px_50px_rgba(28,25,23,0.1)]"
                initial={reduced ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.45, ease, delay: reduced ? 0 : index * 0.08 }}
              >
                <div>
                  {/* Top Row: Index, Badge, Icon */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-stone-400">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <span className={`rounded-full border px-2.5 py-0.5 text-[10px] font-mono font-bold uppercase tracking-wider ${service.badgeColor}`}>
                        {service.highlight}
                      </span>
                    </div>

                    <div className={`flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br ${service.accent} text-white shadow-md`}>
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </div>
                  </div>

                  {/* Title & Tagline */}
                  <h3 className="mt-6 text-2xl font-black tracking-tight text-stone-950 group-hover:text-pink-600 transition-colors">
                    {service.name}
                  </h3>
                  <p className="mt-1 text-xs font-mono font-semibold uppercase tracking-wider text-stone-500">
                    {service.tagline}
                  </p>

                  {/* Description */}
                  <p className="mt-3 text-sm leading-relaxed text-stone-600">
                    {service.description}
                  </p>

                  {/* Deliverables Chips */}
                  <div className="mt-5 grid grid-cols-2 gap-2 border-t border-stone-100 pt-4">
                    {service.deliverables.map((item) => (
                      <div key={item} className="flex items-center gap-1.5 text-xs text-stone-600">
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                        <span className="truncate">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Bottom Bar */}
                <div className="mt-6 flex items-center justify-between gap-3 border-t border-stone-100 pt-5">
                  <span className="rounded-xl border border-stone-200 bg-stone-50 px-3 py-1 font-mono text-xs font-bold text-stone-800">
                    {service.metric}
                  </span>

                  <button
                    type="button"
                    onClick={() => onSelectService?.(service)}
                    className="inline-flex items-center gap-1.5 rounded-full bg-stone-900 px-4 py-2 text-xs font-bold text-white transition-all hover:bg-pink-600 shadow-sm active:scale-95"
                  >
                    <span>Start Brief</span>
                    <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </button>
                </div>
              </motion.article>
            );
          })}
        </div>

        {/* Bottom Custom Enterprise Scope Callout */}
        <motion.div
          className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-5 rounded-3xl border border-stone-200/90 bg-white p-6 sm:p-8 shadow-sm"
          initial={reduced ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.45, ease }}
        >
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-500 to-violet-600 text-white shadow-md shrink-0">
              <Zap className="h-6 w-6" />
            </div>
            <div>
              <h4 className="text-base sm:text-lg font-bold text-stone-950">
                Need a bespoke multi-channel enterprise scope?
              </h4>
              <p className="text-xs sm:text-sm text-stone-500">
                We design custom SLA retainer programs for brands deploying ₹5L to ₹50L+ monthly across India.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => onSelectService?.({ name: 'Enterprise Custom Scope' })}
            className="inline-flex items-center gap-2 rounded-full bg-stone-950 px-6 py-3 text-xs sm:text-sm font-bold text-white shadow-md transition-all hover:bg-pink-600 shrink-0 active:scale-95"
          >
            <span>Request Custom Strategy</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </motion.div>

      </div>
    </section>
  );
}
