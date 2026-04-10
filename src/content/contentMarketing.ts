
import {HeroData, ProblemData, ServiceData, ApproachData, ProcessData, ResultsData, CTAData } from "@/types/services";

/* ================= HERO ================= */
import contentMarketing from "@/assets/services/contentmarketing.jpg";
export const heroData: HeroData = {
  eyebrow: {
  normal: "Content Marketing",
  highlight: "Services"
},

  title: "Content Isn’t About Writing More.",
  highlight: "It’s About Saying the Right Things.",

  subtitle:
    "We create content that connects, builds trust, and drives action — not just fills space.",

  bullets: [
    "Content aligned with search and user intent",
    "Built to support traffic, ads, and conversions",
    "Clear messaging that actually connects"
  ],

  primaryCTA: "Start Project →",
  secondaryCTA: "Talk to Us",

  background: {
    type: "image",
    image: contentMarketing
  },
buttons: [
  {
    label: "Get Content Strategy",
    type: "call",
    phone: "+919753456333",
    variant: "primary"
  },
  {
    label: "See Content Plan",
    type: "whatsapp",
    whatsapp: "919753456333",
    variant: "secondary"
  }
],
  marqueeItems:[
  "Authority-driven content strategy",
  "SEO-optimized content systems",
  "High-engagement storytelling",
  "Content funnels that convert",
  "Brand positioning through content",
]
};


/* ================= PROBLEM ================= */

export const problemData: ProblemData = {
  eyebrow: {
  normal: "The",
  highlight: "Reality"
},

title: {
  normal: "Manual work slows your growth —",
  highlight: "we automate systems to scale your operations"
},

  subtitle:
    "Blogs, posts, and pages exist, but they don’t bring traffic or conversions.",

  description:
    "Publishing content regularly doesn’t guarantee results. Without clear intent, structure, and messaging, content becomes noise instead of an asset.",

  problems: [
    { title: "Content that doesn’t bring traffic" },
    { title: "No connection with the audience" },
    { title: "Low impact on conversions" }
  ],

  insight:
    "Content isn’t about volume. It’s about relevance and clarity.",

  cta: {
    primary: "Fix My Content →",
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
  normal: "Content built around intent,",
  highlight: "not assumptions"
},

  subtitle:
    "We focus on what your audience needs to see — not just what you want to say.",

  services: [
    {
      title: "Content Strategy",
      description:
        "We define what to create, why it matters, and how it fits into your growth.",
      deliverables: [
        "Content planning",
        "Topic research",
        "Intent mapping"
      ]
    },
    {
      title: "SEO Content",
      description:
        "Content designed to rank and bring relevant organic traffic.",
      deliverables: [
        "Blog articles",
        "Search-optimized pages",
        "Keyword-driven structure"
      ]
    },
    {
      title: "Website & Landing Content",
      description:
        "Clear messaging that guides users toward action.",
      deliverables: [
        "Website copy",
        "Landing pages",
        "Conversion-focused messaging"
      ]
    },
    {
      title: "Content Optimization",
      description:
        "Improving existing content to perform better.",
      deliverables: [
        "Content audits",
        "Updates & rewrites",
        "Performance improvements"
      ]
    },
    {
      title: "Conversion Content",
      description:
        "Content that supports leads, ads, and user decisions.",
      deliverables: [
        "Ad copy support",
        "Email content",
        "CTA optimization"
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
  normal: "We don’t write more.",
  highlight: "We write what matters."
}
,
  

  description:
    "Every piece of content is created with a clear purpose — to inform, connect, or convert.",

  steps: [
    {
      title: "Understand your audience",
      desc: "What they search, what they ask, and what they care about."
    },
    {
      title: "Map content to intent",
      desc: "Align topics with real user needs and business goals."
    },
    {
      title: "Create with clarity",
      desc: "Simple, direct messaging that actually connects."
    },
    {
      title: "Refine and improve",
      desc: "Continuously optimize based on performance."
    }
  ],

  cta: {
    primary: "View Strategy →",
    secondary: "Talk to Us"
  }
};


/* ================= PROCESS ================= */

export const processData: ProcessData = {
  title: "How content actually works",
  eyebrow: {
  normal: "Growth",
  highlight: "Engine"
},

  steps: [
    {
      title: "Discovery",
      desc: "Understand your audience, goals, and positioning."
    },
    {
      title: "Planning",
      desc: "Define topics, structure, and content direction."
    },
    {
      title: "Creation",
      desc: "Develop content aligned with intent and clarity."
    },
    {
      title: "Optimization",
      desc: "Improve performance based on data and engagement."
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
  normal: "Content that supports growth —",
  highlight: "not just presence"
},


  highlight: {
    value: "Stronger",
    label: "Content performance",
    description:
      "When content aligns with user intent, it drives traffic, builds trust, and improves conversions."
  },

  metrics:[
    { icon: "up", value: "Traffic", label: "Higher Organic Traffic" },
    { icon: "up", value: "Conversions", label: "Better Conversion Rate" }
  ],

  proofItems: [
    "More relevant traffic",
    "Stronger authority",
    "Better engagement",
    "Improved conversion rates"
  ],

  cta: {
    primary: "Get Started →",
    secondary: "Talk to Us"
  }
};


/* ================= CTA ================= */

export const ctaData: CTAData = {
  title: "Content that actually drives growth",

  subtitle:
    "If your content isn’t helping your business grow, it needs a different approach. Let’s fix that.",

  primaryCTA: "Start Project →",
  secondaryCTA: "Talk to Us"
};