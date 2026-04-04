import { ResultsData } from "@/types/services";
 import { ButtonGroup } from "@/components/ui/ButtonGroup";
import { heroButtons } from "@/content/button";

export function ResultsSection({ data }: { data: ResultsData }) {
  return (
    <section className="py-2 bg-background relative overflow-hidden">

      {/* AMBIENT */}
      <div className="absolute inset-0 bg-background-ambient opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 relative space-y-16">

        {/* HEADER */}
        <div className="max-w-2xl">
   <p className="text-sm font-bold uppercase tracking-widest mb-4 
  bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 
  bg-clip-text text-transparent drop-shadow-[0_0_8px_rgba(251,146,60,0.4)]">
  {data.eyebrow}
</p>

          <h2 className="text-3xl md:text-4xl font-semibold leading-tight">
            {data.title}
          </h2>
        </div>

        {/* MAIN */}
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* BIG STAT */}
          <div className="space-y-4">
            <h3 className="text-6xl md:text-7xl font-bold text-primary leading-none">
              {data.highlight.value}
            </h3>

            <p className="text-xl text-foreground">
              {data.highlight.label}
            </p>

            <p className="text-muted-foreground max-w-md">
              {data.highlight.description}
            </p>
          </div>

          {/* SIDE METRICS */}
          <div className="space-y-2">
            {data.metrics.map((item, i) => (
              <div
                key={i}
                className="flex items-center justify-between border-b border-border pb-4 group"
              >
                <p className="text-muted-foreground">{item.label}</p>

                <span className="text-2xl font-semibold group-hover:text-primary transition">
                  {item.value}
                </span>
              </div>
            ))}
          </div>

        </div>

        {/* PROOF STRIP */}
       

        {/* CTA */}

        <ButtonGroup buttons={heroButtons} />

      </div>
    </section>
  );
}