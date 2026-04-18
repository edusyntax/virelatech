
import {HeroData, ProblemData, ServiceData, ApproachData, ProcessData, ResultsData, CTAData } from "@/types/services";

/* ================= HERO ================= */
import aiAutomation from "@/assets/services/aiauto.jpeg";

export const heroData: HeroData = {
  eyebrow: {
  normal: "AI Automation",
  highlight: "Services"
},

  title: "Doing Everything Manually",
  highlight: "Doesn’t Scale.",

  subtitle:
    "We build AI-powered systems that automate repetitive work, improve efficiency, and help your business run smarter — not harder.",

  bullets: [
    "Automate repetitive tasks and workflows",
    "Reduce manual effort and errors",
    "Save time while improving consistency"
  ],

  primaryCTA: "Start Project →",
  secondaryCTA: "Talk to Us",

  background: {
    type: "image",
    image: aiAutomation
  },
  buttons: [
  {
    label: "See Automation Plan",
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
    marqueeItems: [
  "Workflow automation systems",
  "AI-powered lead qualification",
  "Operational efficiency scaling",
  "Data-driven decision engines",
  "Custom automation pipelines",
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
} ,

  subtitle:
    "Time gets spent on repetitive tasks instead of growth.",

  description:
    "Manual processes slow down operations, create inefficiencies, and limit scalability. As work increases, systems break — or teams get overwhelmed.",

  problems: [
    { title: "Repetitive tasks consuming time" },
    { title: "Manual processes causing delays" },
    { title: "No scalable systems in place" }
  ],
  
 

  insight:
    "Growth becomes difficult when everything depends on manual effort.",

  cta: {
    primary: "Automate My Workflow →",
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
  normal: "Automation systems built ",
  highlight: "around your business"
},

  subtitle:
    "We don’t just use tools — we design workflows that actually make sense.",

  services: [
    {
      title: "Workflow Automation",
      description:
        "We automate repetitive processes across your business.",
      deliverables: [
        "Task automation",
        "Process optimization",
        "Workflow design"
      ]
    },
    {
      title: "AI Integrations",
      description:
        "We connect AI tools with your existing systems.",
      deliverables: [
        "API integrations",
        "AI tool setup",
        "System connections"
      ]
    },
    {
      title: "Lead Handling Automation",
      description:
        "Automatically capture, respond, and manage leads.",
      deliverables: [
        "Auto-response systems",
        "Lead routing",
        "CRM integrations"
      ]
    },
    {
      title: "Content & Communication Automation",
      description:
        "Automate content generation and communication workflows.",
      deliverables: [
        "Email automation",
        "Chatbot setup",
        "AI content workflows"
      ]
    },
    {
      title: "Custom Automation Solutions",
      description:
        "Tailored automation systems based on your specific needs.",
      deliverables: [
        "Custom workflows",
        "Business-specific automation",
        "Scalable systems"
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
  normal: "We don’t automate tools.",
  highlight: "We automate workflows."
},

  description:
    "Every automation is built around how your business actually operates — not generic templates.",

  steps: [
    {
      title: "Understand your processes",
      desc: "Identify what takes time and where inefficiencies exist."
    },
    {
      title: "Map automation opportunities",
      desc: "Define what can be automated and what should stay manual."
    },
    {
      title: "Build and integrate",
      desc: "Create systems that connect seamlessly with your workflow."
    },
    {
      title: "Test and refine",
      desc: "Ensure reliability and improve over time."
    }
  ],

  cta: {
    primary: "View Automation Plan →",
    secondary: "Talk to Us"
  }
};


/* ================= PROCESS ================= */

export const processData: ProcessData = {
  title: "How automation actually helps",
  eyebrow: {
  normal: "Growth",
  highlight: "Engine"
},

  steps: [
    {
      title: "Reduce manual work",
      desc: "Automate repetitive tasks and save time."
    },
    {
      title: "Improve efficiency",
      desc: "Faster processes with fewer errors."
    },
    {
      title: "Scale operations",
      desc: "Handle more work without increasing effort."
    },
    {
      title: "Focus on growth",
      desc: "Spend time on strategy instead of routine tasks."
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
  normal: "What ",
  highlight: "You’llNotice"
},

  title: {
  normal: "Less manual work.",
  highlight: "More efficiency. Better systems."
},

  highlight: {
    value: "Smarter",
    label: "Operations",
    description:
      "Automation allows your business to run more efficiently while reducing effort and errors."
  },

  metrics:[
    { icon: "down", value: "Time", label: "Reduced Manual Work" },
    { icon: "up", value: "Efficiency", label: "Higher Productivity" }
  ],

  proofItems: [
    "Faster workflows",
    "Reduced errors",
    "Improved consistency",
    "Scalable systems"
  ],

  cta: {
    primary: "Get Started →",
    secondary: "Talk to Us"
  }
};


/* ================= CTA ================= */

export const ctaData: CTAData = {
  title: "Ready to automate your workflows?",

  subtitle:
    "If your business is spending too much time on repetitive tasks, it’s time to build systems that handle it for you.",

  primaryCTA: "Start Project →",
  secondaryCTA: "Talk to Us"
};


// data/aiAutomationContent.ts
import type { EditorialSectionData } from "@/types/content-section";

export const aiAutomationContent: EditorialSectionData = {
  eyebrow: { normal: "AI", highlight: "Automation" },
  title: "AI Automation Services That Save Time and Help Your Business Run Smarter",
  blocks: [
    {
      content: [
        { type: "paragraph", text: "Most businesses are spending hours every week on tasks that don't actually need a human. Responding to the same questions, following up on leads, updating spreadsheets, sending reminders — it adds up." },
        { type: "paragraph", text: "At Virelatech, we help businesses use AI automation to handle the repetitive stuff — so you and your team can focus on work that actually moves things forward." },
      ],
    },
    {
      heading: "Where Businesses Are Losing Time Without Realising It",
      content: [
        { type: "paragraph", text: "It's rarely one big problem. It's dozens of small ones that stack up every day." },
        {
          type: "list",
          items: [
            "Manually replying to the same customer questions repeatedly",
            "Following up with leads that fall through the cracks",
            "Data entry and report generation done by hand",
            "No system to handle inquiries outside business hours",
            "Disconnected tools that don't talk to each other",
          ],
        },
        { type: "highlight", text: "These aren't just time problems — they're growth problems. Every hour spent on repetitive tasks is an hour not spent on your customers or your business." },
      ],
    },
    {
      heading: "How We Approach AI Automation",
      content: [
        { type: "paragraph", text: "We don't come in with a one-size-fits-all solution. We start by understanding how your business actually works — what your team does daily, where things slow down, and where human effort is being wasted on tasks a system could handle." },
        { type: "paragraph", text: "Then we build automation around your existing workflow. Not a replacement for your team — a support system that makes them more effective." },
        { type: "highlight", text: "The goal is simple: less manual work, fewer things falling through the cracks, and a business that keeps moving even when you're not watching." },
      ],
    },
    {
      heading: "What We Can Actually Automate For You",
      content: [
        { type: "paragraph", text: "Every business is different, but here's what we commonly help with:" },
        {
          type: "list",
          items: [
            "AI chatbots that handle customer queries 24/7",
            "Automated lead follow-up sequences via WhatsApp, email, or SMS",
            "CRM updates and pipeline management without manual input",
            "Appointment booking and reminder systems",
            "Internal reporting and data summaries generated automatically",
            "Connecting your existing tools so information flows without manual transfer",
          ],
        },
      ],
    },
    {
      number: "01",
      heading: "Who This Is For",
      content: [
        { type: "paragraph", text: "AI automation makes the most sense if:" },
        {
          type: "list",
          items: [
            "Your team is spending too much time on repetitive tasks",
            "Leads are going cold because follow-ups aren't happening fast enough",
            "You're scaling and can't afford to hire for every new task",
            "You want your business to respond and operate outside of working hours",
            "You have multiple tools that aren't connected properly",
          ],
        },
      ],
    },
    {
      number: "02",
      heading: "What You Can Expect",
      content: [
        { type: "paragraph", text: "We won't promise overnight transformation. But with the right automation in place, you'll start noticing:" },
        {
          type: "list",
          items: [
            "Hours saved every week on manual tasks",
            "Faster response times for leads and customers",
            "Fewer things getting missed or delayed",
            "A cleaner, more organised way of working",
            "More time for your team to focus on high-value work",
          ],
        },
        { type: "highlight", text: "Automation doesn't replace good people — it removes the tasks that were holding them back." },
      ],
    },
    {
      number: "03",
      heading: "Let's Figure Out What Makes Sense For You",
      content: [
        { type: "paragraph", text: "Not every business needs the same automation. Some need a simple chatbot. Others need a full lead nurturing system. We'll look at what you're doing right now and suggest what would actually make a difference." },
        { type: "paragraph", text: "No unnecessary complexity. No pushing tools you don't need. Just a clear look at where automation can genuinely help your business run better." },
      ],
    },
  ],
};