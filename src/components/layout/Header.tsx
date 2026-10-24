import Link from "next/link";

import CallButton from "@/components/common/CallButton";
import Container from "@/components/common/Container";
import Logo from "@/components/layout/Logo";
import MobileNav from "@/components/layout/MobileNav";
import { mainNav } from "@/config/navigation";

const Header = () => {
  return (
    <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur">
      <Container className="flex h-16 items-center justify-between gap-4">
        <Logo />
        <nav aria-label="Main" className="hidden items-center gap-6 md:flex">
          {mainNav.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <CallButton label="Call" showNumber size="lg" className="hidden md:inline-flex" />
          <MobileNav />
        </div>
      </Container>
    </header>
  );
};

export default Header;
