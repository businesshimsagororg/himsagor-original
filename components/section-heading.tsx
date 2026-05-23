export function SectionHeading({
  eyebrow,
  title,
  copy,
  align = "center"
}: {
  eyebrow?: string;
  title: string;
  copy?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      {eyebrow ? (
        <p className="mb-3 text-sm font-black uppercase tracking-[0.14em] text-leaf-700 dark:text-mango-300">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="text-3xl font-black leading-tight text-ink md:text-5xl dark:text-cream">
        {title}
      </h2>
      {copy ? (
        <p className="mt-4 text-base leading-8 text-ink/70 md:text-lg dark:text-cream/70">
          {copy}
        </p>
      ) : null}
    </div>
  );
}
