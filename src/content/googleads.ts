
import {HeroData, ProblemData, ServiceData, ApproachData, ProcessData, ResultsData, CTAData } from "@/types/services";

/* ================= HERO ================= */

export const heroData: HeroData = {
  eyebrow: "Google Ads Services ",

  title: "Get Leads When People",
  highlight: "Are Ready to Buy",

  subtitle:
    "When you need results sooner, not someday. We run intent-driven Google Ads campaigns designed to bring real leads — not just clicks.",

  bullets: [
    "Show up when customers are actively searching",
    "High-intent traffic instead of random visibility",
    "Campaigns optimized for conversions, not vanity metrics"
  ],

  primaryCTA: "Start Project →",
  secondaryCTA: "Talk to Us",

  background: {
    type: "image",
    image: "https://images.unsplash.com/photo-1557838923-2985c318be48"
  },
  buttons: [
  {
    label: "Get Cost Per Lead Estimate",
    type: "call",
    phone: "+919753456333",
    variant: "primary"
  },
  {
    label: "See Campaign Plan",
    type: "whatsapp",
    whatsapp: "919753456333",
    variant: "secondary"
  }
],
  marqueeItems:[
  "Intent-driven search campaigns",
  "Cost-efficient lead generation",
  "High-converting landing flows",
  "Smart bidding optimization",
  "Performance-max campaigns",
]
};


/* ================= PROBLEM ================= */

export const problemData: ProblemData = {
  eyebrow: "The Reality",

 title: {
  normal: "Running ads is easy, profitability isn’t —",
  highlight: "we turn ad spend into qualified leads"
},

  subtitle:
    "Clicks come in. Budget gets spent. But leads don’t follow.",

  description:
    "It’s rarely one big mistake. It’s a mix of small issues — wrong targeting, generic ad copy, weak landing pages, and missing tracking — all adding up to poor performance.",

  problems: [
    { title: "Ads running but no leads" },
    { title: "Budget spent with no clarity" },
    { title: "Clicks without conversions" }
  ],

  insight:
    "Running ads is easy. Getting consistent results is where most campaigns break.",
    

  cta: {
    primary: "Fix My Campaign →",
    secondary: "Talk to Us"
  }
};


/* ================= SERVICES ================= */

export const serviceData: ServiceData = {
  eyebrow: "What We Do",

  title: "Everything needed to make Google Ads actually work",

  subtitle:
    "From setup to scaling, every layer is built for performance.",

  services: [
    {
      title: "Search Campaigns",
      description:
        "We build campaigns that target people actively searching for your service.",
      deliverables: [
        "Campaign structure setup",
        "Ad groups & keyword mapping",
        "High-intent targeting"
      ]
    },
    {
      title: "Keyword Strategy",
      description:
        "We prioritize intent over volume — focusing on users ready to take action.",
      deliverables: [
        "High-intent keyword research",
        "Negative keyword filtering",
        "Search term optimization"
      ]
    },
    {
      title: "Ad Copy",
      description:
        "Clear, direct messaging that drives clicks and conversions.",
      deliverables: [
        "Ad variations",
        "CTR optimization",
        "A/B testing"
      ]
    },
    {
      title: "Landing Page Guidance",
      description:
        "We align traffic with focused pages designed to convert.",
      deliverables: [
        "Landing page recommendations",
        "Conversion flow improvements",
        "CTA optimization"
      ]
    },
    {
      title: "Tracking & Optimization",
      description:
        "We monitor performance and continuously refine campaigns.",
      deliverables: [
        "Conversion tracking setup",
        "Performance analysis",
        "Ongoing optimization"
      ]
    }
  ]
};


/* ================= APPROACH ================= */

export const approachData: ApproachData = {
  eyebrow: "Our Approach",

  title: "We don’t run ads.\nWe build lead generation systems.",

  description:
    "Every campaign is built around clear goals, user intent, and continuous optimization.",

  steps: [
    {
      title: "Define the goal",
      desc: "Calls, leads, or conversions — everything starts with clarity."
    },
    {
      title: "Build intent-driven campaigns",
      desc: "We target users already searching for your service."
    },
    {
      title: "Align ads with landing experience",
      desc: "Messaging and pages are structured for conversion."
    },
    {
      title: "Optimize continuously",
      desc: "We refine campaigns based on real performance data."
    }
  ],

  cta: {
    primary: "View Strategy →",
    secondary: "Talk to Us"
  }
};


/* ================= PROCESS ================= */

export const processData: ProcessData = {
  title: "Our process",
  eyebrow:"Growth Engine",

  steps: [
    {
      title: "Research & Strategy",
      desc: "We understand your business, audience, and goals before running ads."
    },
    {
      title: "Campaign Setup",
      desc: "Structured campaigns built for high-intent targeting and clarity."
    },
    {
      title: "Launch & Monitor",
      desc: "Campaigns go live with proper tracking and data collection."
    },
    {
      title: "Optimize & Scale",
      desc: "We improve performance and scale what’s working."
    }
  ],

  cta: {
    primary: "Start Project →",
    secondary: "Talk to Us"
  }
};


/* ================= RESULTS ================= */

export const resultsData: ResultsData = {
  eyebrow: "What You’ll Notice",

  title: "More clarity. Better leads. Consistent results.",

  highlight: {
    value: "3X",
    label: "Better lead quality",
    description:
      "By focusing on intent and optimization, campaigns become predictable and scalable."
  },

  metrics: [
    { value: "↓ CPC", label: "Lower Cost Per Click" },
    { value: "↑ ROI", label: "Better Returns" }
  ],

  proofItems: [
    "More consistent enquiries",
    "Higher quality leads",
    "Clear performance insights",
    "Reduced wasted spend"
  ],

  cta: {
    primary: "Get Similar Results →",
    secondary: "Talk to Us"
  }
};


/* ================= CTA ================= */

export const ctaData: CTAData = {
  title: "Want leads, not just clicks?",

  subtitle:
    "We’ll review your current setup (or help you start fresh) and show you exactly what makes sense — no guesswork.",

  primaryCTA: "Start Project →",
  secondaryCTA: "Talk to Us"
};