
import {HeroData, ProblemData, ServiceData, ApproachData, ProcessData, ResultsData, CTAData } from "@/types/services";

/* ================= HERO ================= */
import emailMarketing from "@/assets/services/emailmarketing.jpg";
export const heroData: HeroData = {
 eyebrow: {
  normal: "Email Marketing",
  highlight: "Services"
},

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
    image: emailMarketing
  },
  buttons: [
  {
    label: "Build Email Funnel",
  type: "modal" ,
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
 eyebrow: {
  normal: "The",
  highlight: "Reality"
},


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
eyebrow: {
  normal: "what",
  highlight: "WE Do"
},

title: {
  normal: "Email systems that people",
  highlight: "actually engage with"
},

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
eyebrow: {
  normal: "Our",
  highlight: "Approach"
},
title: {
  normal: "Not longer emails.",
  highlight: "Better emails."
},
  

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
  eyebrow: {
  normal: "Growth",
  highlight: "Engine"
},

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
eyebrow: {
  normal: "What",
  highlight: "You’ll Notice"
},

  title: {
  normal: "Better engagement.",
  highlight: " Clear communication. Real results."
},

  highlight: {
    value: "Higher",
    label: "Open & response rates",
    description:
      "When emails feel relevant and personal, people actually read and respond."
  },

  metrics:  [
    { icon: "up", value: "Opens", label: "Higher Open Rate" },
    { icon: "up", value: "Clicks", label: "Higher Click-Through Rate" }
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


// data/emailMarketingContent.ts
import type { EditorialSectionData } from "@/types/content-section";

export const emailMarketingContent: EditorialSectionData = {
  eyebrow: { normal: "Email", highlight: "Marketing" },
  title: "Email Marketing Services That Actually Get Read — and Get Results",
  blocks: [
    {
      content: [
        { type: "paragraph", text: "Email marketing is one of those things that sounds straightforward until you realise your open rates are low, your clicks are almost nothing, and you're not sure what's actually working." },
        { type: "paragraph", text: "At Virelatech, we build email marketing systems that don't just send emails — they send the right message to the right person at the right time. That's what turns a list into actual revenue." },
      ],
    },
    {
      heading: "Why Most Email Marketing Falls Flat",
      content: [
        { type: "paragraph", text: "The problem usually isn't the platform or even the product. It's how the emails are built and when they're sent." },
        {
          type: "list",
          items: [
            "Sending the same email to everyone regardless of where they are in the journey",
            "Subject lines that don't give people a reason to open",
            "Emails that feel promotional rather than useful",
            "No clear next step or call to action",
            "No follow-up sequence after the first email",
          ],
        },
        { type: "highlight", text: "Most email lists are underused. The people on your list already showed interest — the only question is whether your emails are giving them a reason to act." },
      ],
    },
    {
      heading: "How We Approach Email Marketing",
      content: [
        { type: "paragraph", text: "We start by understanding your audience and where they are in their relationship with your business. A new subscriber needs something different from a lead who's been sitting on your list for three months." },
        { type: "paragraph", text: "From there, we build sequences and campaigns that feel personal and relevant — not like mass broadcasts." },
        { type: "highlight", text: "Good email marketing doesn't feel like marketing. It feels like a useful, timely message from someone who understands what you need." },
      ],
    },
    {
      heading: "What We'll Build For You",
      content: [
        { type: "paragraph", text: "Depending on your business and goals, here's what we typically work on:" },
        {
          type: "list",
          items: [
            "Welcome sequences that onboard new subscribers properly",
            "Lead nurture flows that move prospects toward a decision",
            "Re-engagement campaigns for cold or inactive contacts",
            "Promotional emails that don't feel pushy",
            "Post-purchase or follow-up emails that build long-term trust",
            "Segmentation so different audiences get relevant content",
          ],
        },
      ],
    },
    {
      number: "01",
      heading: "Who This Works Best For",
      content: [
        { type: "paragraph", text: "Our email marketing services are a good fit if:" },
        {
          type: "list",
          items: [
            "You have a list but aren't using it effectively",
            "Your emails get ignored or have very low open rates",
            "You want to stay in touch with leads without manually reaching out",
            "You're launching something and want a proper campaign behind it",
            "You want a long-term channel that doesn't depend on ad spend",
          ],
        },
      ],
    },
    {
      number: "02",
      heading: "What You Can Expect",
      content: [
        { type: "paragraph", text: "Results from email marketing build over time, but with the right foundation you'll start to see:" },
        {
          type: "list",
          items: [
            "Higher open and click rates compared to generic blasts",
            "More consistent inquiries from people already on your list",
            "Better relationships with leads who aren't ready to buy yet",
            "A channel that keeps working without ongoing ad spend",
          ],
        },
        { type: "highlight", text: "Your email list is an asset. We help you use it properly — so it actually contributes to your growth instead of just sitting there." },
      ],
    },
    {
      number: "03",
      heading: "Let's Make Your Emails Work Harder",
      content: [
        { type: "paragraph", text: "If you have a list and it's not bringing you business, something in the approach needs to change. We can look at what you're currently sending, identify what's missing, and build something that actually moves people to act." },
        { type: "paragraph", text: "No complicated jargon. No unnecessary tools. Just email marketing that makes sense for your business and the people you're trying to reach." },
      ],
    },
  ],
};