import emailjs from '@emailjs/browser';

/**
 * Sends a campaign brief through EmailJS.
 * Recipient address is configured on the EmailJS template, not in this file.
 *
 * Template variables:
 * name, company, email, phone, campaign_type, budget,
 * target_audience, creator_category, campaign_date, description
 */
export async function sendCampaignRequest(fields) {
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  if (!serviceId || !templateId || !publicKey) {
    throw new Error('Email service is not configured.');
  }

  return emailjs.send(
    serviceId,
    templateId,
    {
      name: fields.name,
      company: fields.company,
      email: fields.email,
      phone: fields.phone,
      campaign_type: fields.campaignType,
      budget: fields.budget,
      target_audience: fields.targetAudience,
      creator_category: fields.creatorCategory,
      campaign_date: fields.campaignDate,
      description: fields.description,
      reply_to: fields.email,
    },
    { publicKey }
  );
}
