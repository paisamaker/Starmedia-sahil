import React, { useEffect, useState } from 'react';
import { CheckCircle2, X } from 'lucide-react';
import CampaignForm from './CampaignForm';
import { sendCampaignRequest } from '../services/emailService';

export default function CampaignModal({ isOpen, onClose, initialData }) {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isOpen) return undefined;
    setSubmitted(false);
    setError('');
    setSubmitting(false);
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (payload) => {
    setSubmitting(true);
    setError('');
    try {
      await sendCampaignRequest(payload);
      setSubmitted(true);
    } catch (requestError) {
      console.error(requestError);
      setError('Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[80] flex items-end justify-center p-3 sm:items-center sm:p-6">
      <button
        type="button"
        aria-label="Close campaign form"
        disabled={submitting}
        onClick={onClose}
        className="absolute inset-0 bg-stone-950/40 backdrop-blur-[2px]"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="campaign-modal-title"
        className="relative max-h-[min(92vh,860px)] w-full max-w-xl overflow-y-auto rounded-3xl border border-stone-200 bg-[#FFFcf8] p-6 shadow-[0_30px_80px_-28px_rgba(28,25,23,0.45)] sm:p-8 dark:border-white/10 dark:bg-[#10141c]"
      >
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-violet-600 via-pink-500 to-orange-400" />
        <button
          type="button"
          onClick={onClose}
          disabled={submitting}
          aria-label="Close"
          className="absolute top-4 right-4 rounded-full p-2 text-stone-500 hover:bg-stone-100 disabled:opacity-40 dark:text-slate-300 dark:hover:bg-white/10"
        >
          <X className="h-5 w-5" />
        </button>

        {submitted ? (
          <div className="px-2 py-10 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 dark:bg-emerald-500/15 dark:text-emerald-300">
              <CheckCircle2 className="h-7 w-7" />
            </div>
            <h3 id="campaign-modal-title" className="font-editorial mt-5 text-3xl tracking-tight text-stone-950 dark:text-white">
              Campaign request received.
            </h3>
            <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-stone-600 dark:text-slate-300">
              Thanks! Our team will review your campaign and contact you shortly.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="mt-8 rounded-full bg-stone-950 px-6 py-3 text-sm font-semibold text-white dark:bg-white dark:text-stone-950"
            >
              Close
            </button>
          </div>
        ) : (
          <>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-stone-500 dark:text-slate-400">
              Star Media
            </p>
            <h3 id="campaign-modal-title" className="font-editorial mt-2 text-3xl tracking-tight text-stone-950 dark:text-white">
              Start a campaign
            </h3>
            <p className="mt-2 mb-6 text-sm text-stone-500 dark:text-slate-400">
              Tell us about the brief. A strategist will follow up with a creator shortlist.
            </p>
            <CampaignForm
              key={`${initialData?.creatorName || 'new'}-${initialData?.category || ''}-${initialData?.budget || ''}`}
              initialData={initialData}
              submitting={submitting}
              error={error}
              onSubmit={handleSubmit}
            />
          </>
        )}
      </div>
    </div>
  );
}
