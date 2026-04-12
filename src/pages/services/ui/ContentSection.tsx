// components/sections/PlainSingleColumnSection.tsx

type PlainSingleColumnProps = {
  title: string;
  content: {
    heading?: string;
    paragraphs?: string[];
  }[];
};

 function PlainSingleColumnSection({
  data,
}: {
  data: PlainSingleColumnProps;
}) {
  return (
    <section className="py-4 relative overflow-hidden">
      <div className="max-w-3xl mx-auto px-6 md:px-12 lg:px-20">

        {/* Title */}
        <h2 className="text-4xl md:text-5xl font-semibold leading-tight mb-8">
          {data.title}
        </h2>

        {/* Content */}
        <div className="space-y-10">
          {data.content.map((block, i) => (
            <div key={i} className="space-y-4">

              {block.heading && (
                <h3 className="text-xl font-semibold">
                  {block.heading}
                </h3>
              )}

              {block.paragraphs?.map((para, idx) => (
                <p
                  key={idx}
                  className="text-muted-foreground leading-relaxed"
                >
                  {para}
                </p>
              ))}

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default PlainSingleColumnSection