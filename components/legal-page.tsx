import { SectionHeading } from "@/components/section-heading";
import { brand } from "@/lib/constants";

export function LegalPage({
  title,
  sections
}: {
  title: string;
  sections: Array<[string, string]>;
}) {
  return (
    <section className="section-pad">
      <div className="container-soft max-w-4xl">
        <SectionHeading eyebrow="Policy" title={title} />
        <div className="mt-10 grid gap-4">
          {sections.map(([heading, copy]) => (
            <section key={heading} className="rounded-lg bg-white p-5 shadow-sm dark:bg-white/10">
              <h2 className="text-xl font-black">{heading}</h2>
              <p className="mt-3 leading-8 text-ink/70 dark:text-cream/70">{copy}</p>
            </section>
          ))}
        </div>
        <p className="mt-8 text-sm text-ink/60 dark:text-cream/60">
          For support, call {brand.phone}. Last updated: May 17, 2026.
        </p>
      </div>
    </section>
  );
}
