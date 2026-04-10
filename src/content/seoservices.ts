
import { HeroData,ProblemData, ServiceData, ApproachData, ProcessData, ResultsData, CTAData } from "@/types/services";

/* ================= HERO ================= */

export const heroData: HeroData = {
 eyebrow: {
  normal: "SEO Services That Focus On",
  highlight: "Results"
},

  title: "Getting Traffic Is Easy.",
  highlight: "Getting the Right Traffic Is Not.",

  subtitle:
    "We focus on bringing qualified, intent-driven traffic that actually converts — not just increasing numbers.",

  bullets: [
    "Rank for searches that matter to your business",
    "Attract users ready to take action",
    "Build long-term, consistent visibility"
  ],

  primaryCTA: "Start Project →",
  secondaryCTA: "Talk to Us",

  background: {
    type: "image",
    image: "/src/assets/services/seoservices.jpg"
  },
  buttons: [
  {
    label: "Get SEO Audit",
    type: "call",
    phone: "+919753456333",
    variant: "primary"
  },
  {
    label: "See Keyword Strategy",
    type: "whatsapp",
    whatsapp: "919753456333",
    variant: "secondary"
  }
],
  marqueeItems:[
  "Organic traffic dominance",
  "Technical SEO optimization",
  "Search intent targeting",
  "Authority-building strategies",
  "Long-term ranking growth",
]
};


/* ================= PROBLEM ================= */

export const problemData: ProblemData = {
    eyebrow: {
  normal: "The",
  highlight: "Reality"
},

  title: {
  normal: "Ranking alone doesn’t grow your business —",
  highlight: "we bring traffic that converts into leads"
},

  subtitle:
    "Most businesses don’t lack traffic. They lack the right traffic.",

  description:
    "Chasing random keywords brings visitors, but not customers. Without proper intent targeting, structure, and content alignment, traffic becomes meaningless.",
   
  problems: [
    { title: "Ranking for irrelevant keywords" },
    { title: "Traffic without conversions" },
    { title: "No clear SEO direction or structure" }
  ],

  insight:
    "SEO is not about more traffic. It’s about better traffic.",

  cta: {
    primary: "Fix My SEO →",
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
  normal: "SEO is not one thing —",
  highlight: "it’s a system"
},

  subtitle:
    "We work across multiple layers to build sustainable search visibility.",

  services: [
    {
      title: "Technical SEO",
      description:
        "We fix the backend issues that affect how search engines crawl and understand your site.",
      deliverables: [
        "Site audits & fixes",
        "Page speed optimization",
        "Indexing & crawl improvements"
      ]
    },
    {
      title: "On-Page SEO",
      description:
        "We structure your pages so they align with search intent and user expectations.",
      deliverables: [
        "Content structure optimization",
        "Meta tags & headings",
        "Internal linking"
      ]
    },
    {
      title: "Content Optimization",
      description:
        "We create and refine content that answers real user queries.",
      deliverables: [
        "Keyword intent mapping",
        "Content improvements",
        "Search-focused content strategy"
      ]
    },
    {
      title: "Authority Building",
      description:
        "We improve your website’s credibility over time.",
      deliverables: [
        "Backlink strategy",
        "Off-page SEO",
        "Domain authority growth"
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
  normal: "We don’t chase rankings.",
  highlight: "We build visibility that converts."
},

  description:
    "SEO is approached as a long-term system — not quick hacks or shortcuts.",

  steps: [
    {
      title: "Understand search intent",
      desc: "We identify what your ideal customers are actually searching for."
    },
    {
      title: "Fix & structure the foundation",
      desc: "Technical and on-page improvements to support growth."
    },
    {
      title: "Build content around intent",
      desc: "Pages designed to answer queries and guide users."
    },
    {
      title: "Grow authority over time",
      desc: "Consistent improvements that strengthen rankings."
    }
  ],

  cta: {
    primary: "View Strategy →",
    secondary: "Talk to Us"
  }
};


/* ================= PROCESS ================= */

export const processData: ProcessData = {
  title: "How results actually build",
  eyebrow: {
  normal: "Growth",
  highlight: "Engine"
},

  steps: [
    {
      title: "Foundation",
      desc: "Your website becomes easier for search engines to understand."
    },
    {
      title: "Visibility",
      desc: "Pages start appearing for relevant searches."
    },
    {
      title: "Traffic Growth",
      desc: "Qualified users begin visiting your site."
    },
    {
      title: "Conversions",
      desc: "Traffic turns into enquiries and customers."
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
  normal: "SEO that works for users —",
  highlight: "not just search engines"
},

  highlight: {
    value: "Long-Term",
    label: "Sustainable growth",
    description:
      "When users find value in your content, rankings become more stable and effective."
  },

  metrics:  [
    { icon: "up", value: "Traffic", label: "Higher Quality Traffic" },
    { icon: "up", value: "Leads", label: "Higher Conversions" }
  ],

  proofItems: [
    "More relevant visitors",
    "Better engagement",
    "Stronger search visibility",
    "Consistent lead flow"
  ],

  cta: {
    primary: "Get Started →",
    secondary: "Talk to Us"
  }
};


/* ================= CTA ================= */

export const ctaData: CTAData = {
  title: "Ready to build long-term visibility?",

  subtitle:
    "SEO works — but only with clarity and consistency. Let’s build a system that brings the right traffic.",

  primaryCTA: "Start Project →",
  secondaryCTA: "Talk to Us"
};