import { ChevronRightIcon } from "lucide-react";
import Link from "next/link";

export interface Crumb {
  label: string;
  /** Omit for the current page. */
  href?: string;
}

interface BreadcrumbsProps {
  items: Crumb[];
}

const Breadcrumbs = ({ items }: BreadcrumbsProps) => {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-1 text-sm text-muted-foreground">
        {items.map((item, index) => (
          <li key={item.label} className="flex min-w-0 items-center gap-1">
            {index > 0 && <ChevronRightIcon className="size-4 shrink-0" aria-hidden="true" />}
            {item.href ? (
              <Link href={item.href} className="hover:text-foreground">
                {item.label}
              </Link>
            ) : (
              <span aria-current="page" className="truncate text-foreground/70">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
