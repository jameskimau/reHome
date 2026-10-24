import Link from "next/link";

import { getCategoryHref } from "@/config/navigation";
import { CATEGORY_META } from "@/lib/catalog";
import { cn } from "@/lib/utils";
import { CATEGORIES, type Category } from "@/types/product";

interface CategoryFilterProps {
  active?: Category;
}

interface FilterOption {
  href: string;
  label: string;
  isActive: boolean;
}

// Link-based so the filter lives in the URL: shareable, works without JS, server-rendered.
const CategoryFilter = ({ active }: CategoryFilterProps) => {
  const options: FilterOption[] = [
    { href: "/products", label: "All", isActive: active === undefined },
    ...CATEGORIES.map((category) => ({
      href: getCategoryHref(CATEGORY_META[category].slug),
      label: CATEGORY_META[category].pluralLabel,
      isActive: active === category,
    })),
  ];

  return (
    <nav aria-label="Filter by category" className="flex flex-wrap gap-2">
      {options.map((option) => (
        <Link
          key={option.href}
          href={option.href}
          aria-current={option.isActive ? "page" : undefined}
          className={cn(
            "rounded-full border px-4 py-1.5 text-sm font-medium transition-colors",
            option.isActive
              ? "border-primary bg-primary text-primary-foreground"
              : "hover:bg-muted",
          )}
        >
          {option.label}
        </Link>
      ))}
    </nav>
  );
};

export default CategoryFilter;
