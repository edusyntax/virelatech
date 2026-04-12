
import { ProblemData ,HeroData} from "@/types/services";
import webDesign from "@/assets/services/webdesign.jpg";
export const heroData: HeroData = {
eyebrow: {
  normal: "Web development ",
  highlight: "services"
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
    image: webDesign
  },
  buttons: [
  {
    label: "Get Website Conversion Audit",
    type: "modal" ,
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

// data/pages/webDesignPlainAligned.ts

// data/pages/webDesignSingle.ts

export const webDesignSingle = {
  title: "Web Development Services That Actually Help Your Business Grow",

  content: [
    {
      paragraphs: [
        "Let’s be real for a moment.",
        "A website is not just something you have for your business. It either works for you or it just sits there doing nothing.",
        "A lot of businesses invest in websites that look good but don’t bring any results. No leads, no calls, no real impact.",
        "That’s where things need to change.",
        "At Virelatech, we offer web development services built around one goal—creating websites that don’t just look clean, but actually help your business grow.",
      ],
    },
    {
      heading: "What Most Websites Are Missing",
      paragraphs: [
        "From the outside, everything might look fine. But when you go deeper, the issues start showing.",
        "We often come across websites that take too long to load, don’t work properly on mobile, confuse visitors instead of guiding them, have no clear call-to-action, and get traffic but no conversions.",
        "These small gaps make a big difference.",
        "That’s why our web development services focus not just on design, but on how your website actually performs.",
      ],
    },
    {
      heading: "How We Approach Web Development",
      paragraphs: [
        "We don’t start with design. We start with understanding.",
        "What is your business about?",
        "Who are your customers?",
        "What action do you want visitors to take?",
        "Once that’s clear, we build your website around that goal.",
        "Every section of your website has a purpose—nothing is random, nothing is just for show.",
      ],
    },
    {
      heading: "What We Actually Build For You",
      paragraphs: [
        "Instead of using complex terms, here’s what it really means.",
        "We create websites that are simple and easy to navigate, fast-loading across all devices, mobile-friendly from the start, designed to guide users toward taking action, and built with SEO in mind so people can find you.",
        "Whether it’s a business website, landing page, or service-based site, everything is focused on clarity and effectiveness.",
      ],
    },
    {
      heading: "More Than Just Design",
      paragraphs: [
        "A good-looking website is great—but if it doesn’t convert, it’s just decoration.",
        "We focus on how your homepage communicates your value, where your call-to-action is placed, how easily someone can contact you, and whether your content feels natural.",
        "These details turn a visitor into a lead.",
      ],
    },
    {
      heading: "Who This Is For",
      paragraphs: [
        "Our web development services are a good fit if you don’t have a website yet, your current site feels outdated or slow, you’re getting traffic but no inquiries, or you want a website that supports your marketing.",
        "If your website isn’t helping your business grow, it’s time to fix that.",
      ],
    },
    {
      heading: "What You Can Expect",
      paragraphs: [
        "We keep expectations clear.",
        "We won’t promise anything unrealistic—but we will build something that works.",
        "You’ll get a website that reflects your business properly, improves user experience, provides clear structure, and gives you a strong base for digital marketing.",
      ],
    },
    {
      heading: "Let’s Build Something That Works",
      paragraphs: [
        "If your website isn’t doing its job right now, it’s a missed opportunity.",
        "We can review what you have, understand what’s not working, and help you build something better.",
        "No pressure. No unnecessary complexity.",
        "Just web development services that make sense for your business—and actually help you move forward.",
      ],
    },
  ],
};