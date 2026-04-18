
import {HeroData, ProblemData, ServiceData, ApproachData, ProcessData, ResultsData, CTAData } from "@/types/services";

/* ================= HERO ================= */
import metaAds from "@/assets/services/metaadsnow.jpeg";

export const heroData: HeroData = {
  

eyebrow: {
  normal: "Meta Ads Services",
  highlight: "Facebook & Instagram"
},
  title: "Running Ads Is Easy.",
  highlight: "Getting Results Is Not.",

  subtitle:
    "We create and manage Meta Ads campaigns focused on generating leads, not just impressions — built around targeting, creatives, and continuous optimization.",

  bullets: [
    "Reach the right audience with precise targeting",
    "Creative-driven campaigns that convert",
    "Optimized for leads, not just clicks"
  ],

  primaryCTA: "Start Project →",
  secondaryCTA: "Talk to Us",

  background: {
    type: "image",
    image: metaAds
  },
  buttons: [
  {
    label: "Get Website Conversion Audit",
    type: "modal" ,
    variant: "primary"
  },
  {
    label: "Contact Us",
     type: "whatsapp",
    whatsapp: "919753456333",
    variant: "secondary"
  }
],
  marqueeItems:[
  "High-ROAS ad campaigns",
  "Creative testing frameworks",
  "Audience precision targeting",
  "Conversion-optimized creatives",
  "Scalable paid acquisition systems",
]
};


/* ================= PROBLEM ================= */

export const problemData: ProblemData = {
  eyebrow: {
  normal: "The",
  highlight: "Reality"
},

  title: {
  normal: "Most ads get attention but not results —",
  highlight: "we create campaigns that drive real enquiries"
},

  subtitle:
    "Reach is there. Clicks are there. But conversions are missing.",

  description:
    "Meta Ads can scale fast — but they can also burn budget just as fast. Poor targeting, weak creatives, and lack of optimization are usually the reason campaigns fail.",

  problems: [
    { title: "High spend with low returns" },
    { title: "Wrong audience targeting" },
    { title: "Creatives that don’t convert" }
  ],

  insight:
    "On Meta, creatives and targeting decide everything — not just setup.",
  

  cta: {
    primary: "Fix My Ads →",
    secondary: "Talk to Us"
  }
};


/* ================= SERVICES ================= */

export const serviceData: ServiceData = {
eyebrow: {
  normal: "what",
  highlight: "WE Do"
},
title: {
  normal: "Everything needed to make",
  highlight: "Meta Ads perform"
},

  subtitle:
    "We focus on the full system — targeting, creatives, and optimization.",

  services: [
    {
      title: "Audience Targeting",
      description:
        "We identify and target the right audience based on behavior and intent.",
      deliverables: [
        "Custom audience setup",
        "Lookalike audiences",
        "Interest & behavior targeting"
      ]
    },
    {
      title: "Creative Strategy",
      description:
        "Ad creatives designed to capture attention and drive action.",
      deliverables: [
        "Ad visuals & videos",
        "Copywriting",
        "Creative testing"
      ]
    },
    {
      title: "Campaign Setup",
      description:
        "Structured campaigns built for performance and scalability.",
      deliverables: [
        "Campaign architecture",
        "Ad set optimization",
        "Budget allocation"
      ]
    },
    {
      title: "Conversion Tracking",
      description:
        "We ensure proper tracking to measure what actually matters.",
      deliverables: [
        "Meta Pixel setup",
        "Event tracking",
        "Conversion tracking"
      ]
    },
    {
      title: "Optimization & Scaling",
      description:
        "We continuously improve campaigns based on real performance data.",
      deliverables: [
        "Performance monitoring",
        "A/B testing",
        "Scaling winning campaigns"
      ]
    }
  ]
};


/* ================= APPROACH ================= */

export const approachData: ApproachData = {
eyebrow: {
  normal: "Our",
  highlight: "Approach"
},

 title: {
  normal: "We don’t just run ads.",
  highlight: "We build scalable growth systems."
}
,

  description:
    "Every campaign is built around testing, learning, and scaling what works.",

  steps: [
    {
      title: "Understand your offer",
      desc: "We align campaigns with your product, service, and audience."
    },
    {
      title: "Test creatives & audiences",
      desc: "Identify what resonates and what doesn’t."
    },
    {
      title: "Optimize for conversions",
      desc: "Shift focus from clicks to actual results."
    },
    {
      title: "Scale what works",
      desc: "Increase performance without wasting budget."
    }
  ],

  cta: {
    primary: "View Strategy →",
    secondary: "Talk to Us"
  }
};


/* ================= PROCESS ================= */

export const processData: ProcessData = {
  title: "How Meta Ads actually scale",
  eyebrow: {
  normal: "Growth",
  highlight: "Engine"
},

  steps: [
    {
      title: "Test",
      desc: "Run multiple creatives and audiences to find winners."
    },
    {
      title: "Analyze",
      desc: "Understand what’s working based on data."
    },
    {
      title: "Optimize",
      desc: "Refine campaigns to improve performance."
    },
    {
      title: "Scale",
      desc: "Increase budget on high-performing campaigns."
    }
  ],

  cta: {
    primary: "Start Project →",
    secondary: "Talk to Us"
  }
};


/* ================= RESULTS ================= */

export const resultsData: ResultsData = {
eyebrow: {
  normal: "What",
  highlight: "You’ll Notice"
},

  title: {
  normal: "Better targeting.",
  highlight: "Stronger creatives. Real results."
},

  highlight: {
    value: "Higher",
    label: "Conversion rates",
    description:
      "By focusing on creatives and audience targeting, campaigns start delivering measurable results."
  },

  metrics:  [
    { icon: "down", value: "CPA", label: "Lower Cost Per Lead" },
    { icon: "up", value: "ROAS", label: "Higher Return on Ad Spend" }
  ],

  proofItems: [
    "More qualified leads",
    "Better ad performance",
    "Reduced wasted budget",
    "Scalable campaigns"
  ],

  cta: {
    primary: "Get Results →",
    secondary: "Talk to Us"
  }
};


/* ================= CTA ================= */

export const ctaData: CTAData = {
  title: "Ready to scale with Meta Ads?",

  subtitle:
    "We’ll help you build campaigns that don’t just spend budget — but actually bring results.",

  primaryCTA: "Start Project →",
  secondaryCTA: "Talk to Us"
};