
import { ProblemData ,HeroData} from "@/types/services";

export const heroData: HeroData = {
  eyebrow: {
    normal: "Trusted by ",
    highlight: "growing brands"
  },

 title: "Design That Converts Visitors",
highlight: "Into Paying Customers",

  subtitle:
    "High-performance, SEO-ready websites built around user behavior — designed to convert traffic into real business growth.",

  bullets: [
    "Fast, mobile-first performance",
    "SEO-structured from the ground up",
    "Clear paths that guide users to take action"
  ],

  primaryCTA: "Chat With Us →",
  secondaryCTA: "Contact Us",

  background: {
    type: "image",
    image: "/src/assets/services/webdesign.jpg"
  },
  buttons: [
  {
    label: "Get Website Conversion Audit",
    type: "call",
    phone: "+919753456333",
    variant: "primary"
  },
  {
    label: "View Our Work",
     type: "whatsapp",
    whatsapp: "919753456333",
    variant: "secondary"
  }
],
  marqueeItems:[
  "Conversion-focused UI systems",
  "Lightning-fast load performance",
  "Scalable frontend architecture",
  "SEO-ready code structure",
  "High-impact user experience",
]
};



export const problemData: ProblemData = {
  eyebrow: {
  normal: "The",
  highlight: "Reality"
},

title: {
  normal: "Most websites look good but don’t perform —",
  highlight: "we build websites that convert visitors into customers"
},
  subtitle:
    "Businesses invest in design, but overlook the systems that actually convert users into customers.",

  description:
    "Poor UX, slow load speeds, and weak messaging silently kill conversions. Even when traffic increases, users don’t take action — resulting in wasted marketing spend and lost revenue opportunities.",

  problems: [
    { title: "Confusing layouts increase drop-offs" },
    { title: "Generic templates destroy brand perception" },
    { title: "No conversion strategy = wasted traffic" }
  ],

  insight: "Most websites are built to look good — not to perform."
};

import { ServiceData } from "@/types/services";

export const serviceData: ServiceData = {
  eyebrow: {
  normal: "what",
  highlight: "WE Do"
},

title: {
  normal: "Everything needed to build",
  highlight: "a high-performing website"
},

  subtitle:
    "From strategy to execution, every layer is designed for results.",

services: [
  {
    title: "UX Strategy",
    description:
      "We map user journeys and structure flows to remove friction.",
    deliverables: [
      "User flow diagrams",
      "Wireframes",
      "Information architecture"
    ]
  },
  {
    title: "UI Design",
    description:
      "Modern, conversion-focused interfaces aligned with your brand.",
    deliverables: [
      "Figma design files",
      "Design system",
      "Responsive layouts"
    ]
  },
  {
    title: "Development",
    description:
      "Fast, scalable builds optimized for performance and SEO.",
    deliverables: [
      "Production-ready code",
      "CMS integration",
      "SEO structure"
    ]
  },

  // ✅ NEW STEP
  {
    title: "Conversion Optimization",
    description:
      "We refine structure, messaging, and interactions to maximize conversions.",
    deliverables: [
      "CTA placement strategy",
      "Conversion-focused copy tweaks",
      "User behavior improvements"
    ]
  }
]
};

import { ApproachData } from "@/types/services";

export const approachData: ApproachData = {
  eyebrow: {
  normal: "Our",
  highlight: "Approach"
},

  title: {
  normal: "We don’t design pages.",
  highlight: "\nWe design decisions"
},

  description:
    "Every section is intentionally crafted to guide users, reduce friction, and drive meaningful action.",

  steps: [
    {
      title: "Strategic UX architecture",
      desc: "We map how users think, not just how pages look — ensuring clarity at every step."
    },
    {
      title: "Performance-first development",
      desc: "Speed isn’t optional. Faster experiences directly increase engagement and conversions."
    },
    {
      title: "SEO built into structure",
      desc: "Search visibility is engineered from the foundation, not added later."
    },
    {
      title: "Conversion-driven layouts",
      desc: "Every section is designed to guide users toward action — not distraction."
    }
  ],

  cta: {
    primary: "View Process →",
    secondary: "Talk to Us"
  }
};

import { ProcessData } from "@/types/services";

export const processData: ProcessData = {
  title: "Our process",
  eyebrow: {
  normal: "Growth",
  highlight: "Engine"
},

  steps: [
    {
      title: "Strategy",
      desc: "We define goals, user intent, and conversion paths before design begins.",
    },
    {
      title: "Design",
      desc: "High-impact UI crafted to guide attention and communicate clearly.",
    },
    {
      title: "Development",
      desc: "Built for speed, scalability, and performance across all devices.",
    },
    {
      title: "Optimization",
      desc: "Continuous improvement using real data and user behavior insights.",
    },
  ],

  cta: {
    primary: "Start Project →",
    secondary: "Learn More",
  },
};

import { ResultsData } from "@/types/services";

export const resultsData: ResultsData = {
 eyebrow: {
  normal: "What",
  highlight: "You’ll Notice"
},

 title: {
  normal: "Real impact,",
  highlight: "not just design"
},

  highlight: {
    value: "186%",
    label: "Average increase in conversions",
    description:
      "By optimizing UX, performance, and user flow, we turn passive visitors into active customers."
  },

  metrics: [
    { icon: "down", value: "Load Time", label: "Faster Page Speed (1.2s)" },
    { icon: "down", value: "Bounce", label: "Lower Bounce Rate (42%)" }
  ],

  proofItems: [
    "Higher engagement",
    "Faster load speeds",
    "Better SEO rankings",
    "Lower bounce rates",
    "Stronger brand perception"
  ],

  cta: {
    primary: "View Case Studies →",
    secondary: "Get Similar Results"
  }
};

import { CTAData } from "@/types/services";

export const ctaData: CTAData = {
  title: "Let’s build something exceptional",

  subtitle:
    "Limited onboarding slots available — let’s create a website that actually converts.",

  primaryCTA: "Start Project →",
  secondaryCTA: "Talk to Us"
};