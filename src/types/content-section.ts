
export type PointsBlock = {
  title: string;
  items: string[];
};

export type ContentSectionProps = {
  heading: string;
  intro?: string[];
  blocks: PointsBlock[];
};