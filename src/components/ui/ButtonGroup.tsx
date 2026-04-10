import { ButtonItem } from "@/types/button";

interface Props {
  buttons: ButtonItem[];

  align?: "left" | "center" | "right";
  fullWidth?: boolean;
}

function getHref(btn: ButtonItem): string {
  switch (btn.type) {
    case "call":
      return `tel:${btn.phone}`;
    case "whatsapp":
      return `https://wa.me/${btn.whatsapp}`;
    case "link":
      return btn.href || "#";
    default:
      return "#";
  }
}

export function ButtonGroup({
  buttons,
  align = "left",
  fullWidth = false
}: Props) {

  const alignClass = {
    left: "justify-start",
    center: "justify-center",
    right: "justify-end"
  };

  const baseStyle =
    "px-5 py-3 rounded-full text-center transition whitespace-nowrap text-sm sm:text-base";

  return (
    <div className={`flex flex-wrap gap-3 ${alignClass[align]}`}>
      {buttons.map((btn, i) => {

        const isPrimary = btn.variant === "primary";

        const variantStyle = isPrimary
          ? "bg-accent text-accent-foreground rounded-full text-base font-medium glow px-6  w-full sm:w-auto flex items-center justify-center"
          : btn.variant === "ghost"
          ? "text-primary hover:underline"
          : "glass border border-white/30 rounded-full text-base font-medium px-6 w-full sm:w-auto flex items-center justify-center transition-all duration-300 hover:text-white hover:bg-accent";

        return (
          <a
            key={i}
            href={getHref(btn)}
            target={btn.newTab ? "_blank" : undefined}
            rel={btn.newTab ? "noopener noreferrer" : undefined}
            className={`
              ${fullWidth ? "w-full sm:w-auto " : "flex-1 sm:flex-none"}
              ${baseStyle}
              ${variantStyle}
            `}
          >
            {btn.label}
          </a>
        );
      })}
    </div>
  );
}