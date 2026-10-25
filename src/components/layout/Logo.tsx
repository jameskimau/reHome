import Image from "next/image";
import Link from "next/link";

import { siteConfig } from "@/config/site";

const Logo = () => {
  return (
    <Link href="/" className="flex items-center">
      <Image
        src="/images/logo.png"
        alt={siteConfig.name}
        width={412}
        height={112}
        priority
        className="h-12 w-auto"
      />
    </Link>
  );
};

export default Logo;
