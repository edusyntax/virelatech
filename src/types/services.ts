export type BackgroundType = "image" | "video" | "gradient" | "none";
import{ ButtonItem } from "./button";

export interface HeroBackground {
  type: BackgroundType;
  image?: string;
  video?: string;
  gradient?: string;
}

export interface HeroData {
  eyebrow: string;
  title: string;
  highlight?: string;
  subtitle: string;

  bullets: string[];

  primaryCTA: string;
  secondaryCTA?: string;
  buttons: ButtonItem[];

  background: HeroBackground;
  marqueeItems?: string[];
}



export interface ProblemItem {
  title: string;
}

export interface ProblemCTA {
  primary?: string;
  secondary?: string;
}

export interface ProblemData {
  eyebrow: string;
  title:{ normal: string; highlight: string; }
  subtitle?: string;

  description: string;
  problems: ProblemItem[];

  insight?: string; // "Most websites are built..."
  cta?: ProblemCTA;

  
}

export interface ServiceItem {
  title: string;
  description: string;
  deliverables: string[];
}

export interface ServiceData {
  eyebrow: string;
  title: string;
  subtitle?: string;

  services: ServiceItem[];
}


export interface ApproachStep {
  title: string;
  desc: string;
}

export interface ApproachCTA {
  primary?: string;
  secondary?: string;
}

export interface ApproachData {
  eyebrow: string;
  title: string;
  description: string;

  steps: ApproachStep[];

  cta?: ApproachCTA;
}

export interface ProcessStep {
  title: string;
  desc: string;
}

export interface ProcessCTA {
  primary?: string;
  secondary?: string;
}

export interface ProcessData {

  title: string;
  eyebrow: string;

  steps: ProcessStep[];

  cta?: ProcessCTA;
}

export interface ResultMetric {
  value: string;
  label: string;
}

export interface ResultHighlight {
  value: string;
  label: string;
  description: string;
}

export interface ResultsCTA {
  primary?: string;
  secondary?: string;
}

export interface ResultsData {
  eyebrow: string;
  title: string;

  highlight: ResultHighlight;
  metrics: ResultMetric[];

  proofItems?: string[];

  cta?: ResultsCTA;
}

export interface CTAData {
  title: string;
  subtitle?: string;

  primaryCTA: string;
  secondaryCTA?: string;
}