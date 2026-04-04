import { useState } from "react";

/* TYPES */
export type FAQItem = {
  question: string;
  answer: string;
};

export type FAQCategory = {
  category: string;
  faqs: FAQItem[];
};

type Props = {
  data: FAQCategory[];
  categories?: string[];
  title?: string;
};

const FAQSection = ({
  data,
  categories,
  title = "Frequently Asked Questions",
}: Props) => {
  const [openIndex, setOpenIndex] = useState<string | null>(null);

  /* GET GENERAL */
  const generalFaq = data.find((item) => item.category === "General");

  /* FILTER */
  const filtered = categories
    ? data.filter(
        (item) =>
          categories.includes(item.category) &&
          item.category !== "General"
      )
    : data.filter((item) => item.category !== "General");

  /* MERGE GENERAL */
  const finalData = filtered.map((section) => ({
    ...section,
    faqs: [...section.faqs, ...(generalFaq?.faqs || [])],
  }));

  const toggle = (key: string) => {
    setOpenIndex(openIndex === key ? null : key);
  };

  return (
    <section className="py-4 md:py-32 bg-background relative overflow-hidden">

      {/* AMBIENT */}
      <div className="absolute inset-0 bg-background-ambient opacity-30 pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 md:px-12 space-y-10">

        {/* HEADER */}
        <h2 className="text-3xl md:text-5xl font-semibold text-center text-foreground">
          {title}
        </h2>

        {/* FAQ LIST */}
        <div className="space-y-3">

          {finalData.map((section, sectionIndex) =>
            section.faqs.map((faq, i) => {
              const key = `${sectionIndex}-${i}`;
              const isOpen = openIndex === key;

              return (
                <div
                  key={key}
                  className="
                    rounded-xl
                    border border-border
                    bg-background-elevated
                    hover:bg-background-glass
                    transition
                  "
                >

                  {/* QUESTION */}
                  <button
                    onClick={() => toggle(key)}
                    className="
                      w-full
                      flex items-center justify-between
                      px-6 py-6
                      text-left
                    "
                  >
                    <span className="text-base md:text-lg font-medium text-foreground">
                      {faq.question}
                    </span>

                    <span
                      className={`
                        text-2xl
                        transition-transform
                        ${isOpen ? "rotate-45 text-primary" : "text-muted-foreground"}
                      `}
                    >
                      +
                    </span>
                  </button>

                  {/* ANSWER */}
                  <div
                    className={`
                      grid transition-all duration-300
                      ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}
                    `}
                  >
                    <div className="overflow-hidden">
                      <p className="px-6 pb-6 text-muted-foreground leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>

                </div>
              );
            })
          )}

        </div>

      </div>
    </section>
  );
};

export default FAQSection;