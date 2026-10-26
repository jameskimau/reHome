"use client";

import { InfoIcon } from "lucide-react";
import { useRef, useState, type ReactNode } from "react";

import { WEBSITE_PRICE_ANSWER, WEBSITE_PRICE_QUESTION } from "@/components/product/website-price";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface WebsitePriceInfoProps {
  /** The text the popover hangs off; an info icon is added next to it. */
  children: ReactNode;
  /** Icon before the text (a standalone prompt) instead of after it (a price line). */
  iconFirst?: boolean;
  /** Where the popover opens; pick the side that doesn't cover the price. */
  side?: "top" | "bottom";
  className?: string;
}

// Opens on hover with a mouse and on tap with touch (phones have no hover).
const WebsitePriceInfo = ({
  children,
  iconFirst = false,
  side = "top",
  className,
}: WebsitePriceInfoProps) => {
  const icon = <InfoIcon className="size-4 shrink-0 opacity-80" aria-hidden="true" />;
  const [open, setOpen] = useState(false);
  const pointerType = useRef("");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        onPointerEnter={(event) => event.pointerType === "mouse" && setOpen(true)}
        onPointerLeave={(event) => event.pointerType === "mouse" && setOpen(false)}
        onPointerDown={(event) => (pointerType.current = event.pointerType)}
        onClick={(event) => {
          // Hover already opened it; a mouse click shouldn't toggle it shut again.
          if (pointerType.current === "mouse") event.preventDefault();
        }}
        className={cn(
          "relative z-10 inline-flex cursor-help items-center gap-1.5 rounded-sm text-left focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none",
          className,
        )}
      >
        {iconFirst && icon}
        {children}
        {!iconFirst && icon}
        {!iconFirst && <span className="sr-only">{WEBSITE_PRICE_QUESTION}</span>}
      </PopoverTrigger>
      <PopoverContent
        side={side}
        align="start"
        collisionPadding={16}
        className="w-64 text-sm"
        // Keep focus on the page; this is a hint, not a dialog to work in.
        onOpenAutoFocus={(event) => event.preventDefault()}
      >
        <p className="font-semibold">{WEBSITE_PRICE_QUESTION}</p>
        <p className="text-muted-foreground">{WEBSITE_PRICE_ANSWER}</p>
      </PopoverContent>
    </Popover>
  );
};

export default WebsitePriceInfo;
