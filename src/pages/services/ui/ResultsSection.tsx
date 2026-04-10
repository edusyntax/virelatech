import { ResultsData } from "@/types/services";
import { ButtonGroup } from "@/components/ui/ButtonGroup";
import { heroButtons } from "@/content/button";
import { ArrowUp, ArrowDown } from "lucide-react";

export function ResultsSection({ data }: { data: ResultsData }) {
  const iconMap = {
    up: <ArrowUp className="w-4 h-4 text-green-500" />,
    down: <ArrowDown className="w-4 h-4 text-orange-500" />
  };

  return (
    <section className="py-2  relative overflow-hidden">
      <div className="site-container">

        {/* AMBIENT */}
        <div className="absolute inset-0 opacity-30 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-2 md:px-4 lg:px-6 relative space-y-16">

          {/* HEADER */}
          <div className="max-w-2xl">
            <p className="eyebrow-orange">
              {data.eyebrow.normal}{" "}
              <span className="eyebrow-highlight">
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
          </div>

          {/* MAIN */}
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* BIG STAT */}
            <div className="space-y-4">
              <h3 className="text-4xl md:text-4xl font-bold text-primary leading-none">
                {data.highlight.value}
              </h3>

              <p className="text-md text-foreground">
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

                  <div className="flex items-center gap-2">
                    {iconMap[item.icon]}
                    <span className="text-2xl font-semibold group-hover:text-primary transition">
                      {item.value}
                    </span>
                  </div>
                </div>
              ))}
            </div>

          </div>

          {/* CTA */}
          <ButtonGroup buttons={heroButtons} />

        </div>
      </div>
    </section>
  );
}