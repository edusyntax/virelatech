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
    <section className="relative overflow-hidden pt-24 md:pt-8 min-h-[100svh] md:min-h-[700px] flex flex-col justify-center">

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
          className={`grid grid-cols-1 gap-0 ${hasImage ? "md:grid-cols-2 md:gap-0 md:items-stretch" : ""
            }`}
        >
          {/* LEFT */}
          <div className="order-1 pt-8 pb-10 md:pt-24 md:pb-12 md:px-6 md:pr-0">
            <p className="eyebrow-orange">
              {data.eyebrow.normal}{" "}
              <span className="eyebrow-highlight eyebrow-highlight-orange">
                {data.eyebrow.highlight}
              </span>
            </p>

            <h1 className="text-[clamp(1.8rem,3vw,2.6rem)] font-semibold leading-[1.1] tracking-tight text-foreground">
              {data.title}
              {data.highlight && (
                <span className="block text-orange-500 italic font-serif mt-2">
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

          {/* RIGHT — mask-dissolved image */}
          {hasImage && (
            <div className="order-2 rounded-lg pb-0 md:pt-24 flex items-stretch self-stretch -mx-4 md:mx-0">
              <img
                src={data.background.image!}
                alt=""
                className="w-full h-full object-cover object-center"
                // Add to the img style object:
                style={{
                  minHeight: "200px",
                  maskImage: `
    linear-gradient(to right,  transparent 0%, black 28%, black 80%, transparent 100%),
    linear-gradient(to bottom, transparent 0%, black 18%, black 55%, transparent 100%)
  `,
                  maskComposite: "intersect",
                  WebkitMaskImage: `
    linear-gradient(to right,  transparent 0%, black 10%, black 90%, transparent 100%),
    linear-gradient(to bottom, transparent 0%, black 10%, black 55%, transparent 100%)
  `,
                  WebkitMaskComposite: "source-in",
                }}
              />
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



// import { HeroData, HeroBackground } from "@/types/services";
// import { ButtonGroup } from "@/components/ui/ButtonGroup";
// import { Marquee } from "@/pages/services/ui/Marquee";

// interface Props {
//   data: HeroData;
// }

// function BackgroundRenderer({ background }: { background: HeroBackground }) {
//   if (!background || background.type === "none") return null;

//   if (background.type === "gradient" && background.gradient) {
//     return (
//       <div className={`w-full h-full bg-gradient-to-b ${background.gradient}`} />
//     );
//   }

//   return null;
// }

// export function HeroSection({ data }: Props) {
//   const hasImage =
//     data.background.type === "image" && !!data.background.image;

//   return (
//     <section className="relative overflow-hidden pt-28 md:pt-0 min-h-screen md:min-h-[700px] flex flex-col justify-center">

//       {/* BACKGROUND */}
//       <div className="absolute inset-0 z-0">
//         <BackgroundRenderer background={data.background} />

//         {/* Full-bleed background image */}
//         {hasImage && (
//           <img
//             src={data.background.image!}
//             alt=""
//             className="absolute inset-0 w-full h-full object-cover object-center"
//           />
//         )}

//         <div className="absolute inset-0 bg-background/75 dark:bg-background/70" />
//         <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/60 to-background/20" />
//         <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/20 to-background" />
//         <div className="absolute inset-0 bg-background-ambient opacity-30 pointer-events-none" />
//       </div>

//       {/* CONTENT */}
//       <div className="site-container relative z-10">
//         <div className="max-w-2xl">
//           <div className="pt-8 pb-10 md:pt-28 md:pb-12">

//             <p className="eyebrow-orange mt-2 md:mt-0">
//               {data.eyebrow.normal}{" "}
//               <span className="eyebrow-highlight eyebrow-highlight-orange">
//                 {data.eyebrow.highlight}
//               </span>
//             </p>

//             <h1 className="text-[clamp(1.5rem,5vw,2.6rem)] font-semibold leading-[1.15] tracking-tight text-foreground">
//               {data.title}
//               {data.highlight && (
//                 <span className="block text-orange-500 italic font-serif mt-2">
//                   {data.highlight}
//                 </span>
//               )}
//             </h1>

//             <p className="mt-6 text-base md:text-lg text-muted-foreground max-w-xl leading-relaxed">
//               {data.subtitle}
//             </p>

//             <div className="mt-6 space-y-2 text-muted-foreground mb-5 text-sm md:text-base">
//               {data.bullets.map((b, i) => (
//                 <p key={i}>
//                   <span className="text-orange-500 mr-2">✔</span>
//                   {b}
//                 </p>
//               ))}
//             </div>

//             <ButtonGroup buttons={data.buttons} />

//           </div>
//         </div>

//         {data.marqueeItems && (
//           <Marquee items={data.marqueeItems} className="mt-10" />
//         )}
//       </div>
//     </section>
//   );
// }