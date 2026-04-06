import { ApproachData } from "@/types/services";
import { ButtonGroup } from "@/components/ui/ButtonGroup";
import { heroButtons } from "@/content/button";

export function ApproachSection({ data }: { data: ApproachData }) {
  return (
    <section className="py-4 bg-background relative overflow-hidden">

      {/* AMBIENT */}
      <div className="absolute inset-0 bg-background-ambient opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 relative grid lg:grid-cols-2 gap-20">

        {/* LEFT */}
        <div className="space-y-6 lg:sticky lg:top-32 h-fit">

         <p className="text-sm font-bold uppercase tracking-widest mb-4 
  bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 
  bg-clip-text text-transparent drop-shadow-[0_0_8px_rgba(251,146,60,0.4)]">
  {data.eyebrow}
</p>

          <h2 className="text-4xl md:text-5xl font-semibold  leading-tight whitespace-pre-line">
            {data.title}
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
                <div className="w-4 h-4 mt-2 rounded-full bg-primary shadow-[0_0_10px_hsl(var(--primary))]" />

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