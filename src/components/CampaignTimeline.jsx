import React, { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';
import { timelineSteps } from '../data/campaigns';

const statusTone = ['text-emerald-800 bg-emerald-50', 'text-violet-800 bg-violet-50', 'text-sky-800 bg-sky-50'];
const statusLabel = ['Verified', 'Matched', 'Active'];
const ease = [0.22, 1, 0.36, 1];

export default function CampaignTimeline({ onStartBrief }) {
  const reduced = useReducedMotion();
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const activeStep = timelineSteps[activeStepIndex];
  const metrics = [
    activeStep.previewMetrics.field1,
    activeStep.previewMetrics.field2,
    activeStep.previewMetrics.field3,
  ];

  return (
    <section
      id="campaigns"
      className="flex min-h-[calc(100dvh-5.5rem)] flex-col bg-white py-8 text-stone-950 lg:h-[calc(100dvh-5.5rem)] lg:overflow-hidden lg:py-6"
    >
      <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center px-5 sm:px-8">
        <motion.div
          className="mx-auto max-w-2xl text-center"
          initial={reduced ? false : { opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.45, ease }}
        >
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-stone-500">
            The creator protocol
          </p>
          <h2 className="font-editorial mt-3 text-4xl tracking-tight sm:text-5xl">
            From brief <span className="text-influence">to impact.</span>
          </h2>
          <p className="mt-4 text-base leading-relaxed text-stone-600 sm:text-lg">
            A clear path from the first brief to a measured campaign result.
          </p>
        </motion.div>

        <div className="relative mt-6 lg:mt-8">
          <div className="pointer-events-none absolute top-[1.65rem] right-[8%] left-[8%] hidden h-px bg-stone-200 lg:block" />
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute top-[1.65rem] left-[8%] hidden h-px origin-left bg-stone-950 lg:block"
            initial={false}
            animate={{ scaleX: activeStepIndex / (timelineSteps.length - 1) }}
            transition={reduced ? { duration: 0 } : { duration: 0.45, ease }}
            style={{ width: '84%' }}
          />

          <div className="relative grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-5">
            {timelineSteps.map((step, index) => {
              const isActive = index === activeStepIndex;
              const isPast = index < activeStepIndex;
              return (
                <button
                  key={step.step}
                  type="button"
                  onClick={() => setActiveStepIndex(index)}
                  aria-pressed={isActive}
                  className={`relative overflow-hidden rounded-2xl border px-4 py-3.5 text-left transition-colors ${
                    isActive
                      ? 'border-stone-950 text-white'
                      : 'border-stone-200 bg-[#FFFcf8] text-stone-900 hover:border-stone-400'
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId={reduced ? undefined : 'protocol-step'}
                      className="absolute inset-0 bg-stone-950"
                      transition={reduced ? { duration: 0 } : { type: 'spring', stiffness: 420, damping: 36 }}
                    />
                  )}
                  <span className="relative z-10 block">
                    <span className={`flex items-center gap-2 text-xs font-semibold tracking-[0.14em] ${isActive ? 'text-white/70' : 'text-stone-500'}`}>
                      {step.step}
                      {isPast && <Check className="h-3.5 w-3.5 text-emerald-600" aria-hidden="true" />}
                    </span>
                    <span className="mt-1 block text-sm font-semibold">{step.title}</span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-5 overflow-hidden rounded-3xl border border-stone-200 bg-[#FFFcf8] shadow-[0_18px_50px_-28px_rgba(28,25,23,0.35)] lg:mt-6">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={activeStep.step}
              className="grid items-stretch gap-6 p-6 sm:p-8 lg:grid-cols-2"
              initial={reduced ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduced ? undefined : { opacity: 0, y: -8 }}
              transition={{ duration: reduced ? 0 : 0.28, ease }}
            >
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-violet-700">
                  {activeStep.badge}
                </p>
                <p className="mt-4 text-xs font-semibold uppercase tracking-[0.16em] text-stone-500">
                  Phase {activeStep.step}
                </p>
                <h3 className="mt-2 font-editorial text-3xl tracking-tight sm:text-4xl">
                  {activeStep.title}
                </h3>
                <p className="mt-3 text-base font-medium text-stone-800">{activeStep.subtitle}</p>
                <p className="mt-3 max-w-xl text-sm leading-6 text-stone-600">{activeStep.description}</p>
                <button
                  type="button"
                  onClick={onStartBrief}
                  className="mt-6 inline-flex items-center gap-2 rounded-full bg-stone-950 px-5 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5 hover:bg-stone-800"
                >
                  Start this phase
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>

              <div className="rounded-2xl border border-stone-200 bg-white p-5">
                <div className="flex items-center justify-between border-b border-stone-200 pb-3 text-xs font-semibold uppercase tracking-[0.14em] text-stone-500">
                  <span className="inline-flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-emerald-500" />
                    In progress
                  </span>
                  <span>{activeStep.step} / 05</span>
                </div>
                <ul className="mt-4 space-y-3">
                  {metrics.map((metric, index) => (
                    <motion.li
                      key={metric}
                      initial={reduced ? false : { opacity: 0, x: 8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.28, ease, delay: reduced ? 0 : 0.05 * index }}
                      className="flex items-center justify-between gap-3 rounded-xl border border-stone-200 bg-stone-50 px-3.5 py-3"
                    >
                      <span className="text-sm text-stone-800">{metric}</span>
                      <span className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] font-semibold ${statusTone[index]}`}>
                        {statusLabel[index]}
                      </span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
