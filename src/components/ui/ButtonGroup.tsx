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
          ? "bg-primary text-primary-foreground hover:scale-105 shadow-lg"
          : btn.variant === "ghost"
          ? "text-primary hover:underline"
          : "border border-primary/60 text-primary hover:bg-primary hover:text-primary-foreground";

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