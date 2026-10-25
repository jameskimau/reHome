import { ShieldCheckIcon, SparklesIcon, TruckIcon, WrenchIcon } from "lucide-react";

interface ProductPromisesProps {
  warrantyMonths: number | null;
}

// Reassurance for second-hand buyers: what we've already done, and what's covered.
const ProductPromises = ({ warrantyMonths }: ProductPromisesProps) => {
  const promises = [
    { icon: WrenchIcon, label: "Inspected & fully tested" },
    { icon: SparklesIcon, label: "Deep cleaned" },
    ...(warrantyMonths
      ? [{ icon: ShieldCheckIcon, label: `${warrantyMonths}-month warranty` }]
      : []),
    { icon: TruckIcon, label: "Local delivery available" },
  ];

  return (
    <ul className="grid gap-3 rounded-xl border bg-card p-4 sm:grid-cols-2">
      {promises.map(({ icon: Icon, label }) => (
        <li key={label} className="flex items-center gap-2.5 text-sm font-medium">
          <Icon className="size-5 shrink-0 text-success" aria-hidden="true" />
          {label}
        </li>
      ))}
    </ul>
  );
};

export default ProductPromises;
