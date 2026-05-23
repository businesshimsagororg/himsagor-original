import { BadgeCheck, CreditCard, ShieldCheck, Smartphone } from "lucide-react";

const badges = [
  { label: "SSL secured", icon: ShieldCheck },
  { label: "bKash", icon: Smartphone },
  { label: "Nagad", icon: Smartphone },
  { label: "COD", icon: CreditCard },
  { label: "Verified support", icon: BadgeCheck }
];

export function PaymentBadges({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`flex flex-wrap gap-2 ${compact ? "text-xs" : "text-sm"}`}>
      {badges.map(({ label, icon: Icon }) => (
        <span
          key={label}
          className="inline-flex min-h-9 items-center gap-1.5 rounded-full border border-black/10 bg-white px-3 font-bold text-ink/75 dark:border-white/10 dark:bg-white/10 dark:text-cream/75"
        >
          <Icon size={compact ? 13 : 15} />
          {label}
        </span>
      ))}
    </div>
  );
}

