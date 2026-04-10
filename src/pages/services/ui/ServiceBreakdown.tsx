import { ServiceData } from "@/types/services";

export function ServiceBreakdown({ data }: { data: ServiceData }) {
  return (
<section className="py-4 relative overflow-hidden">
      {/* AMBIENT */}
      <div className="absolute inset-0 bg-background-ambient opacity-30 pointer-events-none" />

      <div className="site-container relative">

        {/* HEADER */}
        <div className="max-w-2xl mb-12 md:mb-16">
          <p className="eyebrow-orange">
            {data.eyebrow.normal}{" "}
            <span className="eyebrow-highlight eyebrow-highlight-orange">
              {data.eyebrow.highlight}
            </span>
          </p>

         <h2 className="text-[clamp(2rem,4vw,3rem)] leading-tight">
            <span className="text-foreground font-medium">
              {data.title.normal}
            </span>{" "}
            <span className="text-orange-500 font-semibold italic font-serif">
              {data.title.highlight}
            </span>
          </h2>

          {data.subtitle && (
            <p className="mt-4 text-muted-foreground leading-relaxed">
              {data.subtitle}
            </p>
          )}
        </div>

        {/* GRID */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">

          {data.services.map((item, i) => (
            <div
              key={i}
              className="
                p-6 rounded-2xl
                bg-card
                border border-border
                transition-all duration-300
                hover:border-orange-500
                hover:bg-background-glass
                hover:shadow-[0_10px_30px_rgba(0,0,0,0.15)]
              "
            >
              {/* TITLE */}
              <h3 className="text-base md:text-lg font-semibold text-foreground mb-3">
                {item.title}
              </h3>

              {/* DESCRIPTION */}
              <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                {item.description}
              </p>

              {/* DELIVERABLES */}
              <ul className="space-y-2 text-sm">
                {item.deliverables.map((d, j) => (
                  <li key={j} className="flex gap-2 text-muted-foreground">
                    <span className="text-orange-500">•</span>
                    {d}
                  </li>
                ))}
              </ul>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}