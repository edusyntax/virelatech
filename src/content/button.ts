import { ButtonItem } from "@/types/button";


export const heroButtons: ButtonItem[] = [ { label: "contact us", type: "call", phone: "+919753456333", variant: "primary" }, { label: "WhatsApp Us", type: "whatsapp", whatsapp: "919753456333", variant: "secondary", newTab: true } ];

export const problemButtons:Record<string, ButtonItem[]> = {

  seo: [
    {
      label: "Fix SEO",
      type: "call",
      phone: "+919753456333",
      variant: "primary"
    },
    {
      label: "Check SEO",
      type: "whatsapp",
      whatsapp: "919753456333?text=Hi, I want SEO audit",
      variant: "secondary",
      newTab: true
    }
  ],

  googleAds: [
    {
      label: "Fix Ads",
      type: "call",
      phone: "+919753456333",
      variant: "primary"
    },
    {
      label: "Check Ads",
      type: "whatsapp",
      whatsapp: "919753456333?text=Hi, I want Google Ads help",
      variant: "secondary",
      newTab: true
    }
  ],

  metaAds: [
    {
      label: "Fix Ads",
      type: "call",
      phone: "+919753456333",
      variant: "primary"
    },
    {
      label: "Check Meta Ads",
      type: "whatsapp",
      whatsapp: "919753456333?text=Hi, I want Meta Ads help",
      variant: "secondary",
      newTab: true
    }
  ],

  webDevelopment: [
    {
      label: "Fix Website",
      type: "call",
      phone: "+919753456333",
      variant: "primary"
    },
    {
      label: "Check Site",
      type: "whatsapp",
      whatsapp: "919753456333?text=Hi, I want website audit",
      variant: "secondary",
      newTab: true
    }
  ],

  aiAutomation: [
    {
      label: "Automate Work",
      type: "call",
      phone: "+919753456333",
      variant: "primary"
    },
    {
      label: "Check Flow",
      type: "whatsapp",
      whatsapp: "919753456333?text=Hi, I want automation plan",
      variant: "secondary",
      newTab: true
    }
  ],

  contentMarketing: [
    {
      label: "Fix Content",
      type: "call",
      phone: "+919753456333",
      variant: "primary"
    },
    {
      label: "Check Content",
      type: "whatsapp",
      whatsapp: "919753456333?text=Hi, I want content strategy",
      variant: "secondary",
      newTab: true
    }
  ],

  emailMarketing: [
    {
      label: "Fix Emails",
      type: "call",
      phone: "+919753456333",
      variant: "primary"
    },
    {
      label: "Check Emails",
      type: "whatsapp",
      whatsapp: "919753456333?text=Hi, I want email marketing help",
      variant: "secondary",
      newTab: true
    }
  ],

  leadGeneration: [
    {
      label: "Get Leads",
      type: "call",
      phone: "+919753456333",
      variant: "primary"
    },
    {
      label: "Check Funnel",
      type: "whatsapp",
      whatsapp: "919753456333?text=Hi, I want lead generation help",
      variant: "secondary",
      newTab: true
    }
  ],

  socialMedia: [
    {
      label: "Fix Growth",
      type: "call",
      phone: "+919753456333",
      variant: "primary"
    },
    {
      label: "Check Content",
      type: "whatsapp",
      whatsapp: "919753456333?text=Hi, I want social media help",
      variant: "secondary",
      newTab: true
    }
  ]

};