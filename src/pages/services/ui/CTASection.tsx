import { CTAData } from "@/types/services";


export function CTASection({ data }: { data: CTAData }) {
  return (
<section className="py-6 relative overflow-hidden">
      {/* AMBIENT (added for consistency) */}
      <div className="site-container">

<div
  className="
    relative overflow-hidden
    rounded-3xl
    bg-gradient-to-r from-[#0ea5e9] via-[#22c55e] via-[#eab308] to-[#f97316]
    text-primary-foreground
    p-8 md:p-12
    flex flex-col md:flex-row
    items-start md:items-center
    justify-between
    gap-6 md:gap-8
    border border-border
  "
>

          {/* CONTENT */}
          <div className="max-w-xl">
            <h3 className="text-[clamp(1.8rem,3vw,2.4rem)] font-semibold leading-tight">
              {data.title}
            </h3>

            {data.subtitle && (
              <p className="text-primary-foreground/80 mt-3 leading-relaxed">
                {data.subtitle}
              </p>
            )}
          </div>

          {/* CTA BUTTONS */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto pt-4 md:pt-0">

            {/* CALL */}
            <a href="tel:+919753456333" className="w-full sm:w-auto">
              <button className="
                w-full
                bg-background text-foreground
                px-4 sm:px-5 py-2.5 sm:py-3
                rounded-xl font-medium
                text-sm sm:text-base
                transition hover:opacity-90
              ">
                Talk to Us
              </button>
            </a>

            {/* WHATSAPP */}
            <a
              href="https://wa.me/919753456333"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto"
            >
              <button className="
                w-full
                border border-background/40
                px-4 sm:px-6 py-2.5 sm:py-3
                rounded-xl font-medium
                text-sm sm:text-base
                transition hover:bg-background/20
              ">
                Start Project
              </button>
            </a>

          </div>

          {/* GLOW (slightly balanced) */}
          <div className="absolute -top-24 -right-24 w-80 h-80 bg-background/10 blur-3xl rounded-full" />

        </div>

      </div>
    </section>
  );
}



