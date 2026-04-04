export type ButtonType = "call" | "whatsapp" | "link";

export interface ButtonItem {
  label: string;
  type: ButtonType;

  href?: string;        // for link
  phone?: string;       // for call
  whatsapp?: string;    // for whatsapp

  variant?: "primary" | "secondary" | "ghost";
  newTab?: boolean;
}