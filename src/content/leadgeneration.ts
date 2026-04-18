
import { HeroData,ProblemData, ServiceData, ApproachData, ProcessData, ResultsData, CTAData } from "@/types/services";

/* ================= HERO ================= */
import leadGeneration from "@/assets/services/leadg.jpeg"
export const heroData: HeroData = {
  eyebrow: {
  normal: "Lead Generation",
  highlight: "Services"
},

  title: "Traffic Doesn’t Grow a Business.",
  highlight: "Leads Do.",

  subtitle:
    "We build systems that don’t just bring visitors — they turn them into enquiries, calls, and actual opportunities.",

  bullets: [
    "Turn visitors into qualified leads",
    "Clear funnels designed for conversion",
    "Consistent flow of enquiries"
  ],

  primaryCTA: "Start Project →",
  secondaryCTA: "Talk to Us",

  background: {
    type: "image",
    image:  leadGeneration
  },
  buttons: [
  {
    label: "Get Lead Generation Plan",
     type: "modal" ,
    variant: "primary"
  },
  {
    label: "Contact US",
    type: "whatsapp",
    whatsapp: "919753456333",
    variant: "secondary"
  }
],
  marqueeItems:[
  "High-quality lead pipelines",
  "Conversion-focused funnels",
  "Multi-channel acquisition systems",
  "Predictable lead flow",
  "Sales-ready prospect generation",
]
};


/* ================= PROBLEM ================= */

export const problemData: ProblemData = {
 eyebrow: {
  normal: "The",
  highlight: "Reality"
},
  

  title: {
  normal: "Most emails get ignored —",
  highlight: "we build funnels that drive consistent revenue"
} ,

  subtitle:
    "Visitors come in, but they don’t take action.",

  description:
    "Most businesses focus on bringing traffic but overlook what happens after. Without proper structure, messaging, and flow, users leave without converting.",

  problems: [
    { title: "Visitors not converting into enquiries" },
    { title: "No clear funnel or user journey" },
    { title: "Weak CTAs and unclear messaging" }
  ],

  insight:
    "Getting traffic is only half the system. Conversion is what actually drives growth.",

  cta: {
    primary: "Fix My Funnel →",
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
  normal: "Everything needed to turn",
  highlight: "traffic into leads"
},

  subtitle:
    "We focus on the full conversion system — not just one part of it.",

  services: [
    {
      title: "Funnel Strategy",
      description:
        "We map how users move from first visit to final action.",
      deliverables: [
        "User journey mapping",
        "Funnel structure",
        "Conversion flow planning"
      ]
    },
    {
      title: "Landing Pages",
      description:
        "Focused pages designed to convert visitors into leads.",
      deliverables: [
        "High-converting layouts",
        "Clear messaging structure",
        "CTA optimization"
      ]
    },
    {
      title: "Lead Capture Systems",
      description:
        "We implement systems that make it easy for users to take action.",
      deliverables: [
        "Forms & integrations",
        "Call tracking setup",
        "WhatsApp integration"
      ]
    },
    {
      title: "Conversion Optimization",
      description:
        "We improve performance based on user behavior and data.",
      deliverables: [
        "A/B testing",
        "UX improvements",
        "Drop-off analysis"
      ]
    },
    {
      title: "Traffic Integration",
      description:
        "We align your funnels with SEO, ads, or other traffic sources.",
      deliverables: [
        "Channel alignment",
        "Campaign integration",
        "Performance tracking"
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
  normal: "We don’t just generate leads.",
  highlight: "We build systems that convert consistently."
},

  description:
    "Every part of the funnel is designed to guide users toward action — without confusion or friction.",

  steps: [
    {
      title: "Understand your audience",
      desc: "We define who you want to attract and what they need."
    },
    {
      title: "Build the conversion path",
      desc: "Clear structure from entry point to action."
    },
    {
      title: "Optimize messaging",
      desc: "Simple, direct communication that drives decisions."
    },
    {
      title: "Improve continuously",
      desc: "We refine the system based on real user behavior."
    }
  ],

  cta: {
    primary: "View Strategy →",
    secondary: "Talk to Us"
  }
};


/* ================= PROCESS ================= */

export const processData: ProcessData = {
  title: "How lead generation actually works",
  eyebrow: {
  normal: "Growth",
  highlight: "Engine"
},

  steps: [
    {
      title: "Attract",
      desc: "Bring the right audience through SEO, ads, or other channels."
    },
    {
      title: "Engage",
      desc: "Capture attention with clear messaging and structure."
    },
    {
      title: "Convert",
      desc: "Turn visitors into leads through forms, calls, or chats."
    },
    {
      title: "Optimize",
      desc: "Improve performance to increase conversions over time."
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
  normal: "More leads. ",
  highlight: "Better quality. Clear system."
},

  highlight: {
    value: "Consistent",
    label: "Lead flow",
    description:
      "Instead of random enquiries, you start seeing predictable and structured lead generation."
  },

  metrics: [
    { icon: "up", value: "Leads", label: "Higher Lead Volume" },
    { icon: "down", value: "Drop-offs", label: "Lower User Drop-offs" }
  ],

  proofItems: [
    "More enquiries from the same traffic",
    "Better quality leads",
    "Clear conversion structure",
    "Less wasted traffic"
  ],

  cta: {
    primary: "Get Started →",
    secondary: "Talk to Us"
  }
};


/* ================= CTA ================= */

export const ctaData: CTAData = {
  title: "Ready to turn traffic into leads?",

  subtitle:
    "We’ll help you build a system that consistently converts visitors into real business opportunities.",

  primaryCTA: "Start Project →",
  secondaryCTA: "Talk to Us"
};


// data/leadGenContent.ts
import type { EditorialSectionData } from "@/types/content-section";

export const leadGenContent: EditorialSectionData = {
  eyebrow: { normal: "Performance", highlight: "Marketing" },
  title: "Lead Generation Services That Actually Bring You Business",
  blocks: [
    {
      content: [
        { type: "paragraph", text: "Getting traffic is easy. Getting leads that turn into customers? That's where most businesses struggle." },
        { type: "paragraph", text: "You might already be running ads, posting on social media, or ranking on Google — but if those efforts aren't bringing consistent inquiries, something is missing. That's exactly what we solve." },
      ],
    },
    {
      heading: "Why Most Lead Generation Doesn't Work",
      content: [
        { type: "paragraph", text: "The issue is rarely effort. It's usually the approach." },
        {
          type: "list",
          items: [
            "Running ads without proper targeting",
            "Getting leads that are not relevant",
            "High spending with low returns",
            "No proper tracking or follow-up system",
          ],
        },
        { type: "highlight", text: "Our performance marketing services are built to fix these exact gaps — by focusing on quality over quantity." },
      ],
    },
    {
      heading: "What We Do Differently",
      content: [
        { type: "paragraph", text: "We don't treat lead generation as a one-step activity. It's a process. We combine the right platforms, messaging, and tracking to create a flow where potential customers can find you, trust you, and reach out." },
      ],
    },
    {
      number: "01",
      heading: "Understanding Your Audience",
      content: [
        { type: "paragraph", text: "We identify who is most likely to convert — not just who might click. Depending on your business, we use Google Ads, Meta Ads, or other channels where your audience is active." },
      ],
    },
    {
      number: "02",
      heading: "Campaign Setup & Optimization",
      content: [
        {
          type: "list",
          items: [
            "Ads that feel relevant and natural, not overly salesy",
            "Landing pages built to convert visitors into leads",
            "Close performance monitoring and continuous improvement",
          ],
        },
      ],
    },
    {
      number: "03",
      heading: "What Kind of Results You Can Expect",
      content: [
        {
          type: "list",
          items: [
            "More consistent lead flow",
            "Better quality inquiries",
            "Improved return on your ad spend",
            "Clear visibility on what's working",
          ],
        },
        { type: "highlight", text: "You're not guessing anymore — you're scaling what works." },
      ],
    },
    {
      number: "04",
      heading: "Who This Is For",
      content: [
        {
          type: "list",
          items: [
            "Real estate businesses looking for serious buyers",
            "Service-based businesses needing consistent inquiries",
            "Coaching or training institutes looking for enrollments",
            "Local businesses wanting more calls and visits",
          ],
        },
      ],
    },
  ],
};