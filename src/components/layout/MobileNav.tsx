"use client";

import { MenuIcon } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { mainNav } from "@/config/navigation";
import { siteConfig } from "@/config/site";

const MobileNav = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon-lg" className="md:hidden" aria-label="Open menu">
          <MenuIcon />
        </Button>
      </SheetTrigger>
      <SheetContent side="right">
        <SheetHeader>
          <SheetTitle>{siteConfig.name}</SheetTitle>
          <SheetDescription>Used appliances in {siteConfig.serviceArea}</SheetDescription>
        </SheetHeader>
        <nav aria-label="Mobile" className="flex flex-col px-4">
          {mainNav.map((link) => (
            <SheetClose asChild key={link.href}>
              <Link href={link.href} className="border-b py-3 text-base font-medium">
                {link.label}
              </Link>
            </SheetClose>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
