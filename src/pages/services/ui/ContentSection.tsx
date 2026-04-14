// components/sections/EditorialSection.tsx
import type {
  EditorialSectionData,
  ContentBlock,
  ContentParagraph,
  ContentList,
  ContentHighlight,
} from "@/types/content-section";

function Paragraph({ item }: { item: ContentParagraph }) {
  return (
    <p className="text-[0.9375rem] text-foreground leading-[1.8] last:mb-0">
      {item.text}
    </p>
  );
}

function List({ item }: { item: ContentList }) {
  return (
    <ul className="mt-2 space-y-2">
      {item.items.map((li, i) => (
        <li
          key={i}
          className="text-[0.9375rem] text-orange leading-[1.75] pl-5 relative
                     before:content-[''] before:absolute before:left-0 before:top-[0.65em]
                     before:w-[5px] before:h-[5px] before:rounded-full before:bg-orange-500"
        >
          {li}
        </li>
      ))}
    </ul>
  );
}

function Highlight({ item }: { item: ContentHighlight }) {
  return (
    <div className="my-2 mt-2 pl-4 border-l-2 border-orange-500 bg-accent/10 py-2 pr-4 rounded-r-sm">
      <p className="text-[0.9rem] text-accent/80 leading-[1.7] m-0">
        {item.text}
      </p>
    </div>
  );
}

function Block({ block }: { block: ContentBlock }) {
  return (
    <div className="mb-2">
      {block.number && (
        <span className="text-[11px] font-extrabold text-accent tracking-[0.15em] uppercase block mb-1">
          {block.number}
        </span>
      )}
      {block.heading && (
        <h3 className="font-grotesk text-[1.05rem] font-bold text-foreground leading-snug mb-3">
          {block.heading}
        </h3>
      )}
      {block.content.map((item, i) => {
        if (item.type === "paragraph") return <Paragraph key={i} item={item} />;
        if (item.type === "list")      return <List      key={i} item={item} />;
        if (item.type === "highlight") return <Highlight key={i} item={item} />;
        return null;
      })}
    </div>
  );
}

export function EditorialSection({ data }: { data: EditorialSectionData }) {
  return (
    <section className="py-6 md:py-6 overflow-hidden mt-4">
      <div className="site-container space-y-8">  {/* ← no inner max-w div */}

        
       <p className="eyebrow-orange">
  {data.eyebrow.normal}{" "}
  <span className="eyebrow-highlight">
    {data.eyebrow.highlight}
  </span>
</p>

        <h2 className="text-[clamp(1.6rem,3vw,2.1rem)] font-bold leading-[1.2] tracking-tight text-foreground ">
          {data.title}
        </h2>

        <div className="w-9 h-[2px] bg-accent rounded-full" />

        {data.blocks.map((block, i) => (
          <div key={i}>
            <Block block={block} />
            {i < data.blocks.length - 1 && (
              <hr className="border-none border-t border-border" />
            )}
          </div>
        ))}

      </div>
    </section>
  );
}