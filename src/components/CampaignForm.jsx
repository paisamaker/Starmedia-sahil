import React, { useState } from 'react';

const CAMPAIGN_TYPES = [
  'Brand awareness',
  'Product launch',
  'Always-on content',
  'UGC and ads',
  'Event amplification',
];

const BUDGETS = ['₹50K – ₹1.5L', '₹1.5L – ₹5L', '₹5L – ₹15L', '₹15L+'];

const CATEGORIES = ['Fashion', 'Food', 'Travel', 'Lifestyle', 'Tech', 'Fitness'];

const EMPTY = {
  fullName: '',
  company: '',
  email: '',
  phone: '',
  campaignType: CAMPAIGN_TYPES[0],
  budget: BUDGETS[1],
  targetAudience: '',
  creatorCategory: CATEGORIES[0],
  campaignDate: '',
  description: '',
};

function normalizeCategory(value) {
  if (!value) return CATEGORIES[0];
  const direct = CATEGORIES.find((item) => value.toLowerCase().includes(item.toLowerCase()));
  if (direct) return direct;
  if (/food|fmcg/i.test(value)) return 'Food';
  if (/tech|hardware/i.test(value)) return 'Tech';
  if (/fit|health|wellness/i.test(value)) return 'Fitness';
  if (/travel/i.test(value)) return 'Travel';
  if (/fashion/i.test(value)) return 'Fashion';
  return 'Lifestyle';
}

function normalizeBudget(value) {
  if (typeof value === 'string' && BUDGETS.includes(value)) return value;
  const numeric = typeof value === 'number' ? value : Number(String(value ?? '').replace(/[^\d.]/g, ''));
  if (!numeric || Number.isNaN(numeric)) return BUDGETS[1];
  if (numeric < 150000) return BUDGETS[0];
  if (numeric < 500000) return BUDGETS[1];
  if (numeric < 1500000) return BUDGETS[2];
  return BUDGETS[3];
}

function validate(values) {
  const errors = {};
  if (!values.fullName.trim()) errors.fullName = 'Name is required.';
  if (!values.company.trim()) errors.company = 'Company is required.';
  if (!values.email.trim()) errors.email = 'Email is required.';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) errors.email = 'Enter a valid email.';
  if (!values.phone.trim()) errors.phone = 'Phone number is required.';
  else if (values.phone.replace(/\D/g, '').length < 8) errors.phone = 'Enter a valid phone number.';
  if (!values.description.trim()) errors.description = 'Description is required.';
  return errors;
}

const fieldClass = (invalid) =>
  `w-full rounded-xl border bg-white px-3.5 py-2.5 text-sm text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-violet-400 focus:ring-4 focus:ring-violet-100 dark:bg-[#0c1018] dark:text-white dark:placeholder:text-stone-500 dark:focus:ring-violet-500/15 ${
    invalid ? 'border-rose-400' : 'border-stone-200 dark:border-white/10'
  }`;

export default function CampaignForm({ initialData, submitting, error, onSubmit }) {
  const [values, setValues] = useState(() => ({
    ...EMPTY,
    budget: normalizeBudget(initialData?.budget),
    creatorCategory: normalizeCategory(initialData?.category),
    description: initialData?.creatorName
      ? `Interested in a collaboration with ${initialData.creatorName}.`
      : '',
  }));
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const setField = (name, value) => {
    setValues((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: undefined }));
  };

  const showError = (name) => (touched[name] || touched.form) && errors[name];

  const markTouched = (name) => {
    setTouched((current) => ({ ...current, [name]: true }));
    const nextErrors = validate(values);
    setErrors((current) => ({ ...current, [name]: nextErrors[name] }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const nextErrors = validate(values);
    setTouched({
      form: true,
      fullName: true,
      company: true,
      email: true,
      phone: true,
      description: true,
    });
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    await onSubmit({
      name: values.fullName.trim(),
      company: values.company.trim(),
      email: values.email.trim(),
      phone: values.phone.trim(),
      campaignType: values.campaignType,
      budget: values.budget,
      targetAudience: values.targetAudience.trim(),
      creatorCategory: values.creatorCategory,
      campaignDate: values.campaignDate,
      description: values.description.trim(),
    });
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field id="fullName" label="Full Name" error={showError('fullName')}>
          <input
            id="fullName"
            name="name"
            autoComplete="name"
            value={values.fullName}
            onBlur={() => markTouched('fullName')}
            onChange={(event) => setField('fullName', event.target.value)}
            className={fieldClass(showError('fullName'))}
            aria-invalid={!!showError('fullName')}
            aria-describedby={showError('fullName') ? 'fullName-error' : undefined}
          />
        </Field>
        <Field id="company" label="Company / Brand Name" error={showError('company')}>
          <input
            id="company"
            name="company"
            autoComplete="organization"
            value={values.company}
            onBlur={() => markTouched('company')}
            onChange={(event) => setField('company', event.target.value)}
            className={fieldClass(showError('company'))}
            aria-invalid={!!showError('company')}
            aria-describedby={showError('company') ? 'company-error' : undefined}
          />
        </Field>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field id="email" label="Work Email" error={showError('email')}>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            value={values.email}
            onBlur={() => markTouched('email')}
            onChange={(event) => setField('email', event.target.value)}
            className={fieldClass(showError('email'))}
            aria-invalid={!!showError('email')}
            aria-describedby={showError('email') ? 'email-error' : undefined}
          />
        </Field>
        <Field id="phone" label="Phone Number" error={showError('phone')}>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            placeholder="+91 98765 43210"
            value={values.phone}
            onBlur={() => markTouched('phone')}
            onChange={(event) => setField('phone', event.target.value)}
            className={fieldClass(showError('phone'))}
            aria-invalid={!!showError('phone')}
            aria-describedby={showError('phone') ? 'phone-error' : undefined}
          />
        </Field>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field id="campaignType" label="Campaign Type">
          <select
            id="campaignType"
            name="campaign_type"
            value={values.campaignType}
            onChange={(event) => setField('campaignType', event.target.value)}
            className={fieldClass(false)}
          >
            {CAMPAIGN_TYPES.map((type) => (
              <option key={type}>{type}</option>
            ))}
          </select>
        </Field>
        <Field id="budget" label="Budget">
          <select
            id="budget"
            name="budget"
            value={values.budget}
            onChange={(event) => setField('budget', event.target.value)}
            className={fieldClass(false)}
          >
            {BUDGETS.map((budget) => (
              <option key={budget}>{budget}</option>
            ))}
          </select>
        </Field>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field id="targetAudience" label="Target Audience">
          <input
            id="targetAudience"
            name="target_audience"
            placeholder="Women 18–34 in metro India"
            value={values.targetAudience}
            onChange={(event) => setField('targetAudience', event.target.value)}
            className={fieldClass(false)}
          />
        </Field>
        <Field id="creatorCategory" label="Creator Category">
          <select
            id="creatorCategory"
            name="creator_category"
            value={values.creatorCategory}
            onChange={(event) => setField('creatorCategory', event.target.value)}
            className={fieldClass(false)}
          >
            {CATEGORIES.map((category) => (
              <option key={category}>{category}</option>
            ))}
          </select>
        </Field>
      </div>

      <Field id="campaignDate" label="Preferred Campaign Date">
        <input
          id="campaignDate"
          name="campaign_date"
          type="date"
          value={values.campaignDate}
          onChange={(event) => setField('campaignDate', event.target.value)}
          className={fieldClass(false)}
        />
      </Field>

      <Field id="description" label="Campaign Description" error={showError('description')}>
        <textarea
          id="description"
          name="description"
          rows={4}
          value={values.description}
          onBlur={() => markTouched('description')}
          onChange={(event) => setField('description', event.target.value)}
          className={`${fieldClass(showError('description'))} resize-y`}
          aria-invalid={!!showError('description')}
          aria-describedby={showError('description') ? 'description-error' : undefined}
        />
      </Field>

      {error && (
        <p role="alert" className="text-sm text-rose-600 dark:text-rose-300">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="inline-flex w-full items-center justify-center rounded-full bg-stone-950 px-5 py-3.5 text-sm font-semibold text-white transition enabled:hover:bg-stone-800 disabled:cursor-wait disabled:opacity-70 dark:bg-white dark:text-stone-950 dark:enabled:hover:bg-stone-100"
      >
        {submitting ? 'Sending…' : 'Start a Campaign'}
      </button>
    </form>
  );
}

function Field({ id, label, error, children }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-[13px] font-medium text-stone-700 dark:text-stone-200">
        {label}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} className="mt-1.5 text-xs text-rose-600 dark:text-rose-300">
          {error}
        </p>
      ) : null}
    </div>
  );
}
