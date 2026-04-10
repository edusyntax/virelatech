import { HeroData, HeroBackground } from "@/types/services";
import { ButtonGroup } from "@/components/ui/ButtonGroup";
import { Marquee } from "@/pages/services/ui/Marquee";

interface Props {
  data: HeroData;
}

function BackgroundRenderer({ background }: { background: HeroBackground }) {
  if (!background || background.type === "none") return null;

  if (background.type === "gradient" && background.gradient) {
    return (
      <div className={`w-full h-full bg-gradient-to-b ${background.gradient}`} />
    );
  }

  return null;
}

export function HeroSection({ data }: Props) {
  const hasImage =
    data.background.type === "image" && !!data.background.image;

  return (
    <section className="relative overflow-hidden pt-8">

      {/* BACKGROUND */}
      <div className="absolute inset-0 z-0">
        <BackgroundRenderer background={data.background} />
        <div className="absolute inset-0 bg-background/80 dark:bg-background/60" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/40 to-background" />
        <div className="absolute inset-0 bg-background-ambient opacity-30 pointer-events-none" />
        <div className="absolute inset-0 bg-primary/5 mix-blend-overlay" />
      </div>

      {/* CONTENT */}
      <div className="site-container relative z-10">
        <div
          className={`grid grid-cols-1 gap-10 md:gap-16 ${
            hasImage ? "md:grid-cols-2" : ""
          }`}
        >
          {/* LEFT: text — pt-24 here so both columns align from the same top line */}
          <div className="order-1 pt-24 pb-12 px-6 md:px-8 md:pr-0">
            <p className="eyebrow-orange">
              {data.eyebrow.normal}{" "}
              <span className="eyebrow-highlight eyebrow-highlight-orange">
                {data.eyebrow.highlight}
              </span>
            </p>

            <h1 className="text-[clamp(1.8rem,3vw,2.6rem)] font-semibold leading-[1.1] tracking-tight text-foreground">
              {data.title}
              {data.highlight && (
                <span className="block text-orange-500 italic font-serif  mt-2">
                  {data.highlight}
                </span>
              )}
            </h1>

            <p className="mt-6 text-base md:text-lg text-muted-foreground max-w-xl leading-relaxed">
              {data.subtitle}
            </p>

            <div className="mt-6 space-y-2 text-muted-foreground mb-5 text-sm md:text-base">
              {data.bullets.map((b, i) => (
                <p key={i}>
                  <span className="text-orange-500 mr-2">✔</span>
                  {b}
                </p>
              ))}
            </div>

            <ButtonGroup buttons={data.buttons} />
          </div>

          {/* RIGHT: image — pt-24 matches the text column's top offset exactly */}
          {hasImage && (
            <div className="order-2 pt-24 pb-12 flex items-stretch
                            max-md:px-6 max-md:pt-0">
              <div className="w-full rounded-2xl overflow-hidden
                              aspect-[4/3] md:aspect-auto md:min-h-0 md:flex-1">
                <img
                  src={data.background.image!}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          )}

        </div>

        {data.marqueeItems && (
          <Marquee items={data.marqueeItems} className="mt-10" />
        )}
      </div>
    </section>
  );
}