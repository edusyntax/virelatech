import { ProblemData } from "@/types/services";
import { ButtonGroup } from "@/components/ui/ButtonGroup";
import { problemButtons } from "@/content/button";

export function ProblemSection({ data, service }: { data: ProblemData, service: keyof typeof problemButtons; }) {
  return (
    <section className="py-12 bg-background relative overflow-hidden">

      {/* AMBIENT */}
      <div className="absolute inset-0 bg-background-ambient opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 relative grid lg:grid-cols-2 gap-16 items-start">

        {/* LEFT */}
        <div>
<p className="text-sm font-bold uppercase tracking-widest mb-4 
  bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 
  bg-clip-text text-transparent drop-shadow-[0_0_8px_rgba(251,146,60,0.4)]">
  {data.eyebrow}
</p>

 <h2 className="text-3xl md:text-4xl leading-tight">
  <span className="text-muted-foreground font-medium">
    {data.title.normal}
  </span>{" "}
  <span className="text-orange-400 font-semibold italic font-serif">
    {data.title.highlight}
  </span>
</h2>

          {data.subtitle && (
            <p className="mt-6 text-muted-foreground max-w-md">
              {data.subtitle}
            </p>
          )}
        </div>

        {/* RIGHT */}
        <div className="space-y-2">

          {/* DESCRIPTION */}
          <p className="text-muted-foreground leading-relaxed">
            {data.description}
          </p>

          {/* PROBLEM LIST */}
          <div className="space-y-4">
            {data.problems.map((item, i) => (
              <div
                key={i}
                className="flex items-start gap-4 p-4 rounded-xl bg-background-elevated border border-border hover:bg-background-glass transition"
              >
                <span className="text-primary font-bold">
                  {String(i + 1).padStart(2, "0")}
                </span>

                <p className="text-muted-foreground">
                  {item.title}
                </p>
              </div>
            ))}
          </div>

          {/* INSIGHT */}
          {data.insight && (
            <p className="text-sm text-muted-foreground">
              {data.insight}
            </p>
          )}

          {/* CTA */}
          <ButtonGroup buttons={problemButtons[service]} />

        </div>

      </div>
    </section>
  );
}