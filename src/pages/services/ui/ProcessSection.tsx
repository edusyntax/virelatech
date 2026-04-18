import { ProcessData } from "@/types/services";
import { ButtonGroup } from "@/components/ui/ButtonGroup";
import { heroButtons } from "@/content/button";

export function ProcessSection({ data }: { data: ProcessData }) {
  return (
    <section className="relative py-6 md:py-12 overflow-hidden">

      {/* AMBIENT */}
      <div className="absolute inset-0 bg-background-ambient opacity-30 pointer-events-none" />

      <div className="site-container space-y-12 md:space-y-16">

        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">

          <div className="max-w-2xl">
            <p className="eyebrow-orange">
              {data.eyebrow.normal}{" "}
              <span className="eyebrow-highlight eyebrow-highlight-orange">
                {data.eyebrow.highlight}
              </span>
            </p>

            <h2 className="text-[clamp(2rem,4vw,3rem)] font-semibold leading-tight text-foreground">
              {data.title}
            </h2>
          </div>

          {/* CTA */}
          {/* <div className="pt-2 md:pt-0">
            <ButtonGroup buttons={heroButtons} />
          </div> */}

        </div>

        {/* PROCESS FLOW */}
        <div className="overflow-x-auto overflow-y-hidden">

          <div className="flex md:grid md:grid-cols-4 gap-6 md:gap-10 min-w-[700px] md:min-w-0 py-3">

            {data.steps.map((step, i) => {
              const isFirst = i === 0;
              const isLast = i === data.steps.length - 1;

              return (
                <div
                  key={i}
                  className="relative group min-w-[220px] md:min-w-0 flex"
                >

                  {/* CONNECTOR */}
                  {!isLast && (
                    <div className="hidden md:block absolute top-6 right-[-30px] w-10 h-px bg-orange-100" />
                  )}

                  {/* CARD */}
                  <div
                    className={`
                      p-5 md:p-6
                      rounded-xl
                      bg-card
                      border border-border
                      transition-all duration-300
                      group-hover:border-orange-500
                      group-hover:bg-background-glass
                      group-hover:scale-[1.02]
                      group-hover:shadow-[0_10px_30px_rgba(0,0,0,0.15)]
                      flex flex-col h-full w-full
                      ${isFirst ? "origin-left" : isLast ? "origin-right" : "origin-center"}
                    `}
                  >

                    {/* NUMBER */}
                    <p className="text-orange-400 font-mono text-sm md:text-base mb-2">
                      {String(i + 1).padStart(2, "0")}
                    </p>

                    {/* TITLE */}
                    <h3 className="text-base md:text-lg font-semibold text-foreground group-hover:text-primary transition">
                      {step.title}
                    </h3>

                    {/* DESC */}
                    <p className="text-sm text-muted-foreground mt-2 leading-relaxed flex-grow">
                      {step.desc}
                    </p>

                  </div>

                </div>
              );
            })}

          </div>

        </div>

      </div>
    </section>
  );
}