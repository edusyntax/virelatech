export type ButtonType = "call" | "whatsapp" | "link" | "modal";



export interface ButtonItem {
  label: string;
  type: ButtonType;

  href?: string;
  phone?: string;
  whatsapp?: string;

  variant?: "primary" | "secondary" | "ghost";
  newTab?: boolean;

  modalMeta?: {
    sourcePage?: string;
    sourceLabel?: string;
  };
 onClick?: () => void;
}