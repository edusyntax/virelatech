
import {HeroData, ProblemData, ServiceData, ApproachData, ProcessData, ResultsData, CTAData } from "@/types/services";

/* ================= HERO ================= */
import aiAutomation from "@/assets/services/aiautomation.jpg";

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
    label: "Discuss Your Workflow",
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