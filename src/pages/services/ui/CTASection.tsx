import { CTAData } from "@/types/services";


export function CTASection({ data }: { data: CTAData }) {
  return (
    <section className="py-2 md:py-8 bg-background">

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">

        <div className="relative overflow-hidden rounded-3xl bg-primary text-primary-foreground p-10 md:p-14 flex flex-col md:flex-row items-start md:items-center justify-between gap-8 border border-border">

          {/* CONTENT */}
          <div className="max-w-xl">
            <h3 className="text-2xl md:text-3xl font-semibold leading-tight">
              {data.title}
            </h3>

            {data.subtitle && (
              <p className="text-primary-foreground/80 mt-3">
                {data.subtitle}
              </p>
            )}
          </div>

          {/* CTA BUTTONS */}
 <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto pt-4 md:pt-0">

  {/* START PROJECT → CALL */}
  <a
    href="tel:+919753456333"
    className="w-full sm:w-auto"
  >
    <button className="w-full bg-background text-foreground px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl font-medium hover:opacity-90 transition text-sm sm:text-base">
      Talk to Us
    </button>
  </a>

  {/* TALK TO US → WHATSAPP */}
  <a
    href="https://wa.me/919753456333"
    target="_blank"
    rel="noopener noreferrer"
    className="w-full sm:w-auto"
  >
    <button className="w-full border border-background/40 px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl font-medium hover:bg-background/20 transition text-sm sm:text-base">
      start project 
    </button>
  </a>

</div>

          {/* GLOW */}
          <div className="absolute -top-20 -right-20 w-72 h-72 bg-background/10 blur-3xl rounded-full" />

        </div>

      </div>

    </section>
  );
}



