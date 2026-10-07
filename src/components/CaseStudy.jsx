import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { caseStudiesData } from '../data/caseStudies';

const ease = [0.22, 1, 0.36, 1];

export default function CaseStudy({ onOpenCaseStudyModal }) {
  const reduced = useReducedMotion();

  return (
    <section id="work" className="bg-[#F7F6F3] py-14 text-stone-950">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between"
          initial={reduced ? false : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.4, ease }}
        >
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-pink-500">Selected work</p>
            <h2 className="mt-1 text-3xl font-extrabold tracking-tight sm:text-4xl">
              Campaigns that{' '}
              <span className="bg-gradient-to-r from-pink-500 to-fuchsia-500 bg-clip-text text-transparent">
                moved culture.
              </span>
            </h2>
          </div>
          <p className="max-w-xs text-sm leading-relaxed text-stone-500 sm:text-right">
            Strategy and results behind recent creator campaigns.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {caseStudiesData.map((cs, index) => (
            <motion.article
              key={cs.id}
              className="group flex flex-col overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-[0_10px_30px_rgba(28,25,23,0.05)]"
              initial={reduced ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, ease, delay: reduced ? 0 : index * 0.08 }}
              whileHover={reduced ? undefined : { y: -4 }}
            >
              <div className="relative h-32 overflow-hidden">
                <img
                  src={cs.heroImage}
                  alt={`${cs.brand} campaign: ${cs.campaign}`}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                />
                <span className="absolute left-3 top-3 rounded-full bg-white/95 px-2.5 py-1 text-[10px] font-semibold text-stone-800 shadow-sm">
                  {cs.brand} · {cs.year}
                </span>
              </div>

              <div className="flex flex-1 flex-col px-4 py-3.5">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-violet-600">{cs.category}</p>
                <h3 className="mt-1 text-base font-bold leading-snug">{cs.campaign}</h3>
                <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-stone-500">{cs.summary}</p>

                <div className="mt-3 grid grid-cols-2 gap-2">
                  {cs.results.slice(0, 4).map((res) => (
                    <div key={res.label} className="rounded-xl bg-stone-50 px-2.5 py-1.5">
                      <div className="text-[9px] uppercase tracking-wide text-stone-400">{res.label}</div>
                      <div className="text-sm font-bold text-stone-950">{res.value}</div>
                    </div>
                  ))}
                </div>

                <div className="mt-3 flex items-center justify-between gap-2 border-t border-stone-100 pt-2.5 text-[11px] text-stone-400">
                  <span>
                    {cs.creatorsInvolved} creators · {cs.timeline}
                  </span>
                  <button
                    type="button"
                    onClick={() => onOpenCaseStudyModal?.(cs)}
                    className="inline-flex shrink-0 items-center gap-1 font-semibold text-stone-900 hover:text-pink-600"
                  >
                    Breakdown
                    <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
