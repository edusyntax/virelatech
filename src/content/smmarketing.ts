
import {HeroData, ProblemData, ServiceData, ApproachData, ProcessData, ResultsData, CTAData } from "@/types/services";

/* ================= HERO ================= */
import socialMedia from "@/assets/services/vectorimg.jpeg";
export const heroData: HeroData = {
  eyebrow: {
  normal: "Social Media Marketing",
  highlight: "Services"
},

  title: "Not Just Posting Content.",
  highlight: "Building Something People Care About.",

  subtitle:
    "We help brands move beyond random posting — building a presence that connects, engages, and actually drives results.",

  bullets: [
    "Content that connects with your audience",
    "Clear direction, not random posting",
    "Built for engagement, trust, and growth"
  ],

  primaryCTA: "Start Project →",
  secondaryCTA: "Talk to Us",

  background: {
    type: "image",
    image: socialMedia
  },
  buttons: [
  {
    label: "Get Growth Plan",
    type: "modal" ,
    variant: "primary"
  },
  {
    label: "See Content Strategy",
    type: "whatsapp",
    whatsapp: "919753456333",
    variant: "secondary"
  }
] ,
  marqueeItems:[
  "Engagement-driven content systems",
  "Audience growth strategies",
  "Platform-specific optimization",
  "Brand authority building",
  "Consistent social presence scaling",
]
};


/* ================= PROBLEM ================= */

export const problemData: ProblemData = {
  eyebrow: {
  normal: "The",
  highlight: "Reality"
},

 title: {
  normal: "Traffic doesn’t guarantee growth —",
  highlight: "we build systems that generate qualified leads"
} ,

  subtitle:
    "Content is going out, but engagement and impact are missing.",

  description:
    "Posting regularly doesn’t guarantee growth. Without clear direction, audience understanding, and platform strategy, social media becomes noise instead of a growth channel.",

  problems: [
    { title: "Posting without clear strategy" },
    { title: "Low engagement despite activity" },
    { title: "Inconsistent messaging and branding" }
  ],

  insight:
    "More content doesn’t create growth. Relevant content does.",

  cta: {
    primary: "Fix My Social Strategy →",
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
  normal: "Social media that actually",
  highlight: "builds your brand"
},
  subtitle:
    "We focus on strategy, content, and performance — not just posting.",

  services: [
    {
      title: "Strategy & Direction",
      description:
        "We define what your brand should say, how it should look, and where it should focus.",
      deliverables: [
        "Audience research",
        "Competitor analysis",
        "Content direction planning"
      ]
    },
    {
      title: "Content Creation",
      description:
        "Content designed to connect, not just fill your feed.",
      deliverables: [
        "Post designs & creatives",
        "Captions & messaging",
        "Content calendar"
      ]
    },
    {
      title: "Platform Focus",
      description:
        "We prioritize platforms where your audience actually spends time.",
      deliverables: [
        "Instagram growth strategy",
        "LinkedIn positioning",
        "Platform-specific optimization"
      ]
    },
    {
      title: "Engagement & Consistency",
      description:
        "We maintain a consistent and structured presence.",
      deliverables: [
        "Posting schedules",
        "Community engagement",
        "Performance tracking"
      ]
    },
    {
      title: "Paid Social Ads",
      description:
        "Targeted campaigns designed to scale reach and generate leads.",
      deliverables: [
        "Ad campaign setup",
        "Audience targeting",
        "Performance optimization"
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
  normal: "No templates.",
  highlight: "No forced strategies."
},
  description:
    "Every brand is different. We build a direction based on your audience, goals, and positioning — not trends or guesswork.",

  steps: [
    {
      title: "Understand your audience",
      desc: "Who they are, what they engage with, and what they ignore."
    },
    {
      title: "Analyze the landscape",
      desc: "What competitors are doing — and where opportunities exist."
    },
    {
      title: "Define your content direction",
      desc: "A clear, natural approach aligned with your brand."
    },
    {
      title: "Execute & refine",
      desc: "Consistent content with ongoing improvements."
    }
  ],

  cta: {
    primary: "View Strategy →",
    secondary: "Talk to Us"
  }
};


/* ================= PROCESS ================= */

export const processData: ProcessData = {
  title: "How growth actually happens",
  eyebrow: {
  normal: "Growth",
  highlight: "Engine"
},

  steps: [
    {
      title: "Clarity",
      desc: "Your messaging and positioning become clear."
    },
    {
      title: "Consistency",
      desc: "Content starts feeling structured and aligned."
    },
    {
      title: "Engagement",
      desc: "Audience interaction becomes meaningful — not random."
    },
    {
      title: "Growth",
      desc: "Your presence starts driving visibility, trust, and leads."
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
  normal: "More structure.",
  highlight: " Better engagement. Real growth."
},

  highlight: {
    value: "Stronger",
    label: "Brand presence",
    description:
      "Instead of random posting, your social media starts working as a clear and consistent growth channel."
  },

  metrics:[
    { icon: "up", value: "Engagement", label: "Higher User Engagement" },
    { icon: "up", value: "Reach", label: "Greater Targeted Reach" }
  ],

  proofItems: [
    "Consistent content direction",
    "Clear brand messaging",
    "Better audience engagement",
    "Improved lead potential"
  ],

  cta: {
    primary: "Get Started →",
    secondary: "Talk to Us"
  }
};


/* ================= CTA ================= */

export const ctaData: CTAData = {
  title: "Want social media that actually grows your brand?",

  subtitle:
    "If you’re looking for more than just posting — let’s build something that connects, engages, and converts.",

  primaryCTA: "Start Project →",
  secondaryCTA: "Talk to Us"
};


// data/socialMediaContent.ts
import type { EditorialSectionData } from "@/types/content-section";

export const socialMediaContent: EditorialSectionData = {
  eyebrow: { normal: "Social Media", highlight: "Hyderabad" },
  title: "Social Media Services in Hyderabad Built Around Being Effective, Not Just Active",
  blocks: [
    {
      content: [
        { type: "paragraph", text: "Posting regularly, getting some likes, maybe a few comments — but no real business coming from it. Sounds familiar?" },
        { type: "paragraph", text: "That's because most brands focus on being active instead of being effective. At Virelatech, our social media services in Hyderabad are about building trust, visibility, and turning attention into leads." },
      ],
    },
    {
      heading: "What Most Businesses Are Missing",
      content: [
        { type: "paragraph", text: "Social media isn't just about design or captions. If your content isn't connecting with the right audience, nothing else matters." },
        {
          type: "list",
          items: [
            "Random posts without a clear direction",
            "Content that looks good but doesn't convert",
            "No consistency in messaging",
            "No strategy behind reels, ads, or engagement",
          ],
        },
      ],
    },
    {
      heading: "How We Approach Social Media",
      content: [
        { type: "paragraph", text: "First, we understand your brand — what you offer, who you're targeting, and how people should perceive you. Then we build a clear direction:" },
        {
          type: "list",
          items: [
            "Content that feels natural and relatable",
            "Posts that actually speak to your audience",
            "Consistent branding across platforms",
            "Smart use of reels and trends without forcing it",
          ],
        },
        { type: "highlight", text: "If needed, we combine organic content with paid ads to increase reach — not just content, but the purpose behind content." },
      ],
    },
    {
      number: "01",
      heading: "What You Can Expect",
      content: [
        {
          type: "list",
          items: [
            "Better engagement from the right audience",
            "More profile visits and inquiries",
            "Stronger brand presence over time",
            "People starting to recognize and trust your business",
          ],
        },
      ],
    },
    {
      number: "02",
      heading: "Keep It Simple",
      content: [
        { type: "paragraph", text: "You don't need to be everywhere. You just need to show up the right way." },
        { type: "highlight", text: "No hype. No unnecessary complexity. Just clear, practical social media services in Hyderabad that actually connect with people." },
      ],
    },
  ],
};