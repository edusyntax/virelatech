type HighlightProps = {
  text: string;
variant?: "bg" | "underline" | "accent" | "bg-orange/50" |"orange";
  className?: string;
};

function parseText(text: string, variant: HighlightProps["variant"]) {
  const parts = text.split(/(\[\[.*?\]\])/g);

  return parts.map((part, i) => {
    if (part.startsWith("[[") && part.endsWith("]]")) {
      const clean = part.slice(2, -2);

      if (variant === "underline") {
        return (
          <span
            key={i}
            className="underline decoration-primary decoration-2 underline-offset-4"
          >
            {clean}
          </span>
        );
      }

      if (variant === "accent") {
        return (
          <span key={i} className="text-primary font-semibold">
            {clean}
          </span>
        );
      }

      // default = bg
      return (
        <span
          key={i}
          className="bg-primary/15 text-primary px-2 py-1 rounded-md"
        >
          {clean}
        </span>
      );
    }

    return <span key={i}>{part}</span>;
  });
}

export function HighlightText({
  text,
  variant = "bg",
  className = "",
}: HighlightProps) {
  return <span className={className}>{parseText(text, variant)}</span>;
}