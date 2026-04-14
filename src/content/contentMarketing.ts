
import {HeroData, ProblemData, ServiceData, ApproachData, ProcessData, ResultsData, CTAData } from "@/types/services";

/* ================= HERO ================= */
import contentMarketing from "@/assets/services/cmservicesp.jpeg";
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
  type: "modal" ,
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


// data/contentMarketingContent.ts
import type { EditorialSectionData } from "@/types/content-section";

export const contentMarketingContent: EditorialSectionData = {
  eyebrow: { normal: "Content", highlight: "Marketing" },
  title: "Content Marketing Services That Build Trust and Bring the Right People to You",
  blocks: [
    {
      content: [
        { type: "paragraph", text: "Most businesses know they should be creating content. Blog posts, videos, social media — everyone says it matters. But somewhere between knowing and doing, things get unclear." },
        { type: "paragraph", text: "What should you write about? How often? And does any of it actually bring customers?" },
        { type: "paragraph", text: "At Virelatech, we cut through that confusion. Our content marketing services are built around one goal — creating content that attracts the right audience, builds genuine trust, and eventually turns readers into customers." },
      ],
    },
    {
      heading: "Why Most Content Marketing Doesn't Deliver",
      content: [
        { type: "paragraph", text: "A lot of businesses are creating content. Very few are creating content that actually works. The gap is usually in the strategy — or the lack of one." },
        {
          type: "list",
          items: [
            "Publishing content with no clear audience in mind",
            "Topics that feel good to write but no one is searching for",
            "No connection between content and what the business actually offers",
            "Inconsistent publishing that never builds momentum",
            "Content that informs but never moves the reader to take action",
          ],
        },
        { type: "highlight", text: "Content without strategy is just noise. The internet already has enough of that. What your business needs is content with a clear purpose behind every piece." },
      ],
    },
    {
      heading: "How We Approach Content Marketing",
      content: [
        { type: "paragraph", text: "We start with your business, not with a content calendar. Who are you trying to reach? What questions are they asking before they buy? What makes someone trust you over a competitor?" },
        { type: "paragraph", text: "Once we understand that, we build a content direction that maps to your customer's journey — from the moment they first hear about you to the point where they're ready to reach out." },
        { type: "highlight", text: "Every piece of content we create has a reason to exist. It either brings in traffic, builds authority, answers a buyer's question, or moves someone closer to a decision." },
      ],
    },
    {
      heading: "What We Create For You",
      content: [
        { type: "paragraph", text: "Content marketing covers a lot of ground. Depending on your business and audience, we work on:" },
        {
          type: "list",
          items: [
            "Blog posts and articles that rank on Google and answer real questions",
            "Service and landing page content that converts visitors into leads",
            "Case studies that show proof without sounding like a sales pitch",
            "Email content that nurtures leads over time",
            "Social media content that builds presence and drives traffic back to your site",
            "FAQs and resource content that reduces friction in the buying process",
          ],
        },
      ],
    },
    {
      heading: "Content That Works With Your Other Marketing",
      content: [
        { type: "paragraph", text: "One thing most people miss — content marketing doesn't work in isolation. The right blog post supports your SEO. A strong case study improves your Google Ads conversion rate. Good email content keeps leads warm while they decide." },
        { type: "paragraph", text: "We build content that fits into your broader marketing effort, not just something that looks good on its own." },
        { type: "highlight", text: "When content, SEO, and lead generation work together, the results compound. That's when content marketing stops feeling like an expense and starts feeling like an asset." },
      ],
    },
    {
      number: "01",
      heading: "Who This Works Best For",
      content: [
        { type: "paragraph", text: "Our content marketing services make the most sense if:" },
        {
          type: "list",
          items: [
            "You want to grow organic traffic without depending entirely on paid ads",
            "You know your audience has questions but you're not answering them anywhere",
            "Your competitors are ranking for terms you should be ranking for",
            "You want to build long-term authority in your industry or niche",
            "Your current content feels scattered with no clear direction",
          ],
        },
      ],
    },
    {
      number: "02",
      heading: "What You Can Expect",
      content: [
        { type: "paragraph", text: "Content marketing is a long-term play — we'll be upfront about that. But with the right approach, you'll start to notice:" },
        {
          type: "list",
          items: [
            "Steady growth in organic traffic over time",
            "More qualified visitors who are already interested in what you offer",
            "Stronger brand credibility when people research your business",
            "Content that keeps generating value long after it's published",
            "A clearer, more consistent voice across everything you put out",
          ],
        },
        { type: "highlight", text: "Unlike ads, good content doesn't stop working when you stop paying. It compounds — and that's exactly why it's worth doing properly." },
      ],
    },
    {
      number: "03",
      heading: "Let's Build Something Worth Reading",
      content: [
        { type: "paragraph", text: "If your content isn't bringing people to your business or building trust with the right audience, the strategy needs a second look." },
        { type: "paragraph", text: "We can review what you currently have, identify the gaps, and put together a direction that actually makes sense for your business and your customers." },
        { type: "paragraph", text: "No fluff. No content for content's sake. Just a clear, practical approach to content marketing that helps your business grow." },
      ],
    },
  ],
};