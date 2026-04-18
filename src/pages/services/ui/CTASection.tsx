import { CTAData } from "@/types/services";

export function CTASection({ data }: { data: CTAData }) {
  return (
    <section className="py-6 relative overflow-hidden">
      <div className="site-container relative z-20">

        <div
          className="
            relative z-0 overflow-hidden
            rounded-3xl
            bg-gradient-to-r from-[#0ea5e9] via-[#22c55e] via-[#eab308] to-[#f97316]
            text-primary-foreground
            p-6 sm:p-8 md:p-12
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
              <p className="text-primary-foreground/80 mt-3 leading-relaxed text-sm sm:text-base">
                {data.subtitle}
              </p>
            )}
          </div>

          {/* CTA BUTTONS */}
          <div className="relative z-20 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto pt-4 md:pt-0">

            {/* CALL */}
            <a
              href="tel:+919753456333"
              className="
                w-full sm:w-auto
                inline-flex items-center justify-center
                bg-background text-foreground
                px-4 sm:px-5 py-2.5 sm:py-3
                rounded-xl font-medium
                text-sm sm:text-base
                transition hover:opacity-90
              "
            >
              Talk to Us
            </a>

            {/* WHATSAPP */}
            <a
              href="https://api.whatsapp.com/send?phone=919753456333&text=Hi%20I%20want%20to%20start%20a%20project"
              target="_blank"
              rel="noopener noreferrer"
              className="
                w-full sm:w-auto
                inline-flex items-center justify-center
                border border-background/40
                px-4 sm:px-6 py-2.5 sm:py-3
                rounded-xl font-medium
                text-sm sm:text-base
                transition hover:bg-background/20
              "
            >
              Start Project
            </a>

          </div>

          {/* GLOW (non-blocking) */}
          <div className="absolute -top-24 -right-24 w-80 h-80 bg-background/10 blur-3xl rounded-full pointer-events-none z-0" />

        </div>

      </div>
    </section>
  );
}