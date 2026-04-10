import { ApproachData } from "@/types/services";
import { ButtonGroup } from "@/components/ui/ButtonGroup";
import { heroButtons } from "@/content/button";
import { title } from "process";

export function ApproachSection({ data }: { data: ApproachData }) {
  return (
<section className="py-4 relative overflow-hidden">
      {/* AMBIENT */}

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 relative grid lg:grid-cols-2 gap-20">

        {/* LEFT */}
        <div className="space-y-6 lg:sticky lg:top-32 h-fit">

       <p className="eyebrow-orange">
  {data.eyebrow.normal}{" "}
  <span className="eyebrow-highlight">
    {data.eyebrow.highlight}
  </span>
</p>
          <h2 className="text-4xl md:text-5xl font-semibold  leading-tight whitespace-pre-line">
            {data.title.normal} <span className="text-orange-500 font-serif italic">{data.title.highlight}</span>
          </h2>

          <p className="text-muted-foreground max-w-md">
            {data.description}
          </p>

          {/* CTA */}
           <ButtonGroup buttons={heroButtons} />

        </div>

        {/* RIGHT */}
        <div className="space-y-16">

          {data.steps.map((item, i) => (
            <div key={i} className="relative group">

              {/* LINE */}
              {i !== data.steps.length - 1 && (
                <div className="absolute left-2 top-10 w-px h-full bg-border" />
              )}

              <div className="flex gap-6">

                {/* DOT */}
                <div className="w-4 h-4 mt-2 rounded-full bg-orange-500 shadow-[0_0_10px_hsl(var(--primary))]" />

                {/* CONTENT */}
                <div className="space-y-2">

                  <h3 className="text-xl font-semibold group-hover:text-primary transition">
                    {item.title}
                  </h3>

                  <p className="text-muted-foreground leading-relaxed max-w-md">
                    {item.desc}
                  </p>

                </div>

              </div>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}