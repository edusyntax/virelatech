
import {HeroData, ProblemData, ServiceData, ApproachData, ProcessData, ResultsData, CTAData } from "@/types/services";

/* ================= HERO ================= */

export const heroData: HeroData = {
  eyebrow: "Email Marketing Services",

  title: "Staying in Touch",
  highlight: "Without Being Ignored",

  subtitle:
    "We create email systems that feel relevant, timely, and worth reading — not something people skip or delete.",

  bullets: [
    "Emails people actually open and read",
    "Clear, simple communication",
    "Built for engagement and conversions"
  ],

  primaryCTA: "Start Project →",
  secondaryCTA: "Talk to Us",

  background: {
    type: "image",
    image: "https://images.unsplash.com/photo-1521791136064-7986c2920216"
  },
  buttons: [
  {
    label: "Build Email Funnel",
    type: "call",
    phone: "+919753456333",
    variant: "primary"
  },
  {
    label: "See Email Strategy",
    type: "whatsapp",
    whatsapp: "919753456333",
    variant: "secondary"
  }
],
  marqueeItems:[
  "Automated revenue flows",
  "Behavior-driven email sequences",
  "High open & click-through rates",
  "Lifecycle-based engagement systems",
  "Retention-focused campaigns",
]
};


/* ================= PROBLEM ================= */

export const problemData: ProblemData = {
  eyebrow: "The Reality",


 title: {
  normal: "Most emails get ignored —",
  highlight: "we build funnels that drive consistent revenue"
} ,

  subtitle:
    "Not because email doesn’t work — but because the message doesn’t feel relevant.",

  description:
    "Long, generic, or poorly timed emails get skipped. Without relevance and clarity, email becomes noise instead of a growth channel.",

  problems: [
    { title: "Low open and response rates" },
    { title: "Generic, non-personal messaging" },
    { title: "No structured follow-up system" }
  ],

  insight:
    "Email works when it feels personal and timely — not automated and forced.",

  cta: {
    primary: "Fix My Emails →",
    secondary: "Talk to Us"
  }
};


/* ================= SERVICES ================= */

export const serviceData: ServiceData = {
  eyebrow: "What We Do",

  title: "Email systems that people actually engage with",

  subtitle:
    "We focus on timing, relevance, and simplicity — not complexity.",

  services: [
    {
      title: "Email Strategy",
      description:
        "We define what to send, when to send it, and why it matters.",
      deliverables: [
        "Email flow planning",
        "Audience segmentation",
        "Campaign strategy"
      ]
    },
    {
      title: "Email Campaigns",
      description:
        "Clear, focused emails designed to be read and acted on.",
      deliverables: [
        "Campaign emails",
        "Promotional emails",
        "Broadcast messaging"
      ]
    },
    {
      title: "Automation Flows",
      description:
        "Structured sequences that run automatically and consistently.",
      deliverables: [
        "Welcome sequences",
        "Follow-up emails",
        "Lead nurturing flows"
      ]
    },
    {
      title: "Re-engagement Campaigns",
      description:
        "Bring back inactive users and customers.",
      deliverables: [
        "Reactivation emails",
        "Retention campaigns",
        "Customer follow-ups"
      ]
    },
    {
      title: "Optimization",
      description:
        "We refine emails based on performance and engagement.",
      deliverables: [
        "A/B testing",
        "Performance tracking",
        "Open & click optimization"
      ]
    }
  ]
};


/* ================= APPROACH ================= */

export const approachData: ApproachData = {
  eyebrow: "How We Approach It",

  title: "Not longer emails.\nBetter emails.",

  description:
    "We keep communication simple, relevant, and timed correctly — so it actually gets attention.",

  steps: [
    {
      title: "Understand your audience",
      desc: "What they care about and when they are likely to engage."
    },
    {
      title: "Define communication flow",
      desc: "When and why each email should be sent."
    },
    {
      title: "Write with clarity",
      desc: "Simple messages that are easy to read and act on."
    },
    {
      title: "Optimize continuously",
      desc: "Improve based on open rates, clicks, and responses."
    }
  ],

  cta: {
    primary: "View Strategy →",
    secondary: "Talk to Us"
  }
};


/* ================= PROCESS ================= */

export const processData: ProcessData = {
  title: "What this helps with",
  eyebrow:"Growth Engine",

  steps: [
    {
      title: "Follow-ups",
      desc: "Stay in touch with leads without being intrusive."
    },
    {
      title: "Retention",
      desc: "Bring back existing customers and users."
    },
    {
      title: "Nurturing",
      desc: "Build trust over time through consistent communication."
    },
    {
      title: "Conversions",
      desc: "Turn interest into action with the right message."
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

  title: "Better engagement. Clear communication. Real results.",

  highlight: {
    value: "Higher",
    label: "Open & response rates",
    description:
      "When emails feel relevant and personal, people actually read and respond."
  },

  metrics: [
    { value: "↑ Opens", label: "Better Engagement" },
    { value: "↑ Clicks", label: "More Conversions" }
  ],

  proofItems: [
    "More responses from emails",
    "Stronger customer relationships",
    "Better follow-up systems",
    "Improved retention"
  ],

  cta: {
    primary: "Get Started →",
    secondary: "Talk to Us"
  }
};


/* ================= CTA ================= */

export const ctaData: CTAData = {
  title: "Email that people actually read",

  subtitle:
    "Email still works — but only when it feels personal and relevant. Let’s set it up properly.",

  primaryCTA: "Start Project →",
  secondaryCTA: "Talk to Us"
};