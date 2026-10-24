import { HouseIcon } from "lucide-react";
import Link from "next/link";

import { siteConfig } from "@/config/site";

const Logo = () => {
  return (
    <Link href="/" className="flex items-center gap-2 text-lg font-bold tracking-tight">
      <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
        <HouseIcon className="size-4" aria-hidden="true" />
      </span>
      {siteConfig.name}
    </Link>
  );
};

export default Logo;
