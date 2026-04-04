import React from "react";

interface MarqueeProps {
  items: string[];
  className?: string;
}

export function Marquee({ items, className = "" }: MarqueeProps) {
  return (
    <div className={`relative overflow-hidden border-y border-border py-4 ${className}`}>

      {/* fade edges (premium touch) */}
      <div className="absolute left-0 top-0 h-full w-16 bg-gradient-to-r from-background to-transparent pointer-events-none z-10" />
      <div className="absolute right-0 top-0 h-full w-16 bg-gradient-to-l from-background to-transparent pointer-events-none z-10" />

      <div className="flex whitespace-nowrap animate-marquee gap-12 text-muted-foreground">

        {/* ORIGINAL */}
        {items.map((item, i) => (
          <span key={i} className="flex items-center gap-6">
            {item}
            <span className="text-primary">*</span>
          </span>
        ))}

        {/* DUPLICATE for loop */}
        {items.map((item, i) => (
          <span key={`dup-${i}`} className="flex items-center gap-6">
            {item}
            <span className="text-primary">*</span>
          </span>
        ))}

      </div>
    </div>
  );
}