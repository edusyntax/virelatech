import { ProblemData } from "@/types/services";
import { ButtonGroup } from "@/components/ui/ButtonGroup";
import { problemButtons } from "@/content/button";

export function ProblemSection({ data, service }: { data: ProblemData, service: keyof typeof problemButtons; }) {
  return (
<section className="py-4 relative overflow-hidden">
      {/* AMBIENT */}
      <div className="absolute inset-0 bg-background-ambient opacity-30 pointer-events-none" />

      <div className="site-container relative grid lg:grid-cols-2 gap-12 md:gap-16 items-start">

        {/* LEFT */}
        <div className="space-y-4 md:space-y-6">

          <p className="eyebrow-orange">
            {data.eyebrow.normal}{" "}
            <span className="eyebrow-highlight eyebrow-highlight-orange">
              {data.eyebrow.highlight}
            </span>
          </p>

          <h2 className="text-[clamp(2rem,4vw,3rem)] leading-tight">
            <span className="text-muted-foreground font-medium">
              {data.title.normal}
            </span>{" "}
            <span className="text-orange-500 font-semibold font-serif italic">
              {data.title.highlight}
            </span>
          </h2>

          {data.subtitle && (
            <p className="text-muted-foreground max-w-md leading-relaxed">
              {data.subtitle}
            </p>
          )}

        </div>

        {/* RIGHT */}
        <div className="space-y-6">

          {/* DESCRIPTION */}
          <p className="text-muted-foreground leading-relaxed">
            {data.description}
          </p>

          {/* PROBLEM LIST */}
          <div className="space-y-3 md:space-y-4">
            {data.problems.map((item, i) => (
              <div
                key={i}
                className="
                  flex items-start gap-4
                  p-4
                  rounded-xl
                  bg-card
                  border border-border
                  transition-all duration-300
                  hover:bg-background-glass
                  hover:border-orange-500
                "
              >
                <span className="text-orange-500 font-mono font-bold">
                  {String(i + 1).padStart(2, "0")}
                </span>

                <p className="text-muted-foreground leading-relaxed">
                  {item.title}
                </p>
              </div>
            ))}
          </div>

          {/* INSIGHT */}
          {data.insight && (
            <p className="text-sm text-muted-foreground leading-relaxed">
              {data.insight}
            </p>
          )}

          {/* CTA */}
          <div className="pt-2">
            <ButtonGroup buttons={problemButtons[service]} />
          </div>

        </div>

      </div>
    </section>
  );
}