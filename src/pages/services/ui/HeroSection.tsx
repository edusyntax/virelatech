import { HeroData, HeroBackground } from "@/types/services";
import { ButtonGroup } from "@/components/ui/ButtonGroup";
import { Marquee } from "@/pages/services/ui/Marquee";
import { HighlightText } from "@/components/ui/HighlightText";

interface Props {
  data: HeroData;
}

/* ================= BACKGROUND RENDERER ================= */
function BackgroundRenderer({ background }: { background: HeroBackground }) {
  if (!background || background.type === "none") return null;

  if (background.type === "image" && background.image) {
    return (
      <img
        src={background.image}
        className="w-full h-full object-cover scale-105"
        alt=""
      />
    );
  }

  if (background.type === "video" && background.video) {
    return (
      <video
        autoPlay
        loop
        muted
        playsInline
        className="w-full h-full object-cover scale-105"
      >
        <source src={background.video} />
      </video>
    );
  }

  if (background.type === "gradient" && background.gradient) {
    return (
      <div className={`w-full h-full bg-gradient-to-b ${background.gradient}`} />
    );
  }

  return null;
}

/* ================= HERO ================= */
export function HeroSection({ data }: Props) {
  return (
    <section className="pt-24  relative overflow-hidden">

      {/* ================= BACKGROUND ================= */}
      <div className="absolute inset-0 z-0">

        {/* dynamic bg */}
        {/* <BackgroundRenderer background={data.background} /> */}

        {/* theme-safe overlay */}
        <div className="absolute inset-0 bg-background/80 dark:bg-background/60" />

        {/* depth gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/40 to-background" />

        {/* ambient layer */}
        <div className="absolute inset-0 bg-background-ambient opacity-40 pointer-events-none" />

        {/* optional premium tint */}
        <div className="absolute inset-0 bg-primary/5 mix-blend-overlay" />

      </div>

      {/* ================= CONTENT ================= */}
      <div className="max-w-7xl mx-auto  md:px-6 lg:px-20 relative z-10">

        <div className="max-w-5xl backdrop-blur-sm bg-background/40 dark:bg-background/30 p-6 md:p-8 rounded-2xl">

          {/* eyebrow */}
     <p className="text-sm font-bold uppercase tracking-widest mb-4 
  bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 
  bg-clip-text text-transparent drop-shadow-[0_0_8px_rgba(251,146,60,0.4)]">
  {data.eyebrow}
</p>

          {/* title */}
          <h1 className="text-4xl md:text-6xl font-semibold leading-[1.1] tracking-tight">
            {data.title}
            {data.highlight && (
              <span className="block text-orange-500 italic font-serif mt-2">
                {data.highlight}
              </span>
            )}
          </h1>

          {/* subtitle */}
          <p className="mt-6 text-lg text-muted-foreground max-w-xl leading-relaxed">
            {data.subtitle}
          </p>

          {/* bullets */}
          <div className="mt-6 space-y-2 text-muted-foreground mb-5 text-sm md:text-base">
            {data.bullets.map((b, i) => (
              <p key={i}>✔ {b}</p>
            ))}
          </div>

          {/* CTA */}
<ButtonGroup buttons={data.buttons} />

        </div>
    {data.marqueeItems && (
  <Marquee items={data.marqueeItems} className="mt-10" />
)}
      </div>

    </section>
  );
}