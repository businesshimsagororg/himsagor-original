import {
  Banknote,
  PackageCheck,
  ShieldCheck,
  Truck
} from "lucide-react";
import { trustPoints } from "@/lib/constants";

const icons = [ShieldCheck, Banknote, Truck, PackageCheck];

export function TrustBadges() {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {trustPoints.map((point, index) => {
        const Icon = icons[index] || ShieldCheck;
        return (
          <div
            key={point}
            className="rounded-lg border border-black/10 bg-white/80 p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-soft dark:border-white/10 dark:bg-white/10"
          >
            <Icon className="mb-3 text-leaf-700 dark:text-mango-300" size={24} />
            <p className="font-black">{point}</p>
          </div>
        );
      })}
    </div>
  );
}
