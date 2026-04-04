import { ServiceData } from "@/types/services";

export function ServiceBreakdown({ data }: { data: ServiceData }) {
  return (
    <section className="py-2 bg-background relative overflow-hidden">

      {/* AMBIENT */}
      <div className="absolute inset-0 bg-background-ambient opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 relative">

        {/* HEADER */}
        <div className="max-w-2xl mb-16">
       <p className="text-sm font-bold uppercase tracking-widest mb-4 
  bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 
  bg-clip-text text-transparent drop-shadow-[0_0_8px_rgba(251,146,60,0.4)]">
  {data.eyebrow}
</p>

          <h2 className="text-3xl md:text-5xl font-semibold leading-tight">
            {data.title}
          </h2>

          {data.subtitle && (
            <p className="mt-4 text-muted-foreground">
              {data.subtitle}
            </p>
          )}
        </div>

        {/* GRID */}
<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

          {data.services.map((item, i) => (
            <div
              key={i}
              className="p-6 rounded-2xl bg-background-glass border border-border hover:border-orange-500 hover:shadow-background-secondary transition"
            >
              {/* TITLE */}
              <h3 className="text-lg font-semibold mb-3">
                {item.title}
              </h3>

              {/* DESCRIPTION */}
              <p className="text-sm text-muted-foreground mb-4">
                {item.description}
              </p>

              {/* DELIVERABLES */}
              <ul className="space-y-2 text-sm">
                {item.deliverables.map((d, j) => (
                  <li key={j} className="flex gap-2 text-muted-foreground">
                    <span className="text-primary">•</span>
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