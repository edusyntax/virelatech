
export type ContentHighlight = {
  type: "highlight";
  text: string;
};

export type ContentList = {
  type: "list";
  items: string[];
};

export type ContentParagraph = {
  type: "paragraph";
  text: string;
};

export type ContentBlock = {
  heading?: string;
  number?: string;        
  content: (ContentParagraph | ContentList | ContentHighlight)[];
};

export type EditorialSectionData = {
  eyebrow: { normal: string; highlight: string; } ;
  title: string;
  blocks: ContentBlock[];
};