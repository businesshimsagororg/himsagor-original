export default function Loading() {
  return (
    <div className="section-pad">
      <div className="container-soft grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className="h-80 animate-pulse rounded-lg bg-white/70 shadow-sm dark:bg-white/10"
          />
        ))}
      </div>
    </div>
  );
}
