import { PhoneIcon } from "lucide-react";
import type { ComponentProps } from "react";

import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { formatPhone, toTelHref } from "@/lib/format";

interface CallButtonProps {
  /** Text before the number. Omit to show only the number. */
  label?: string;
  showNumber?: boolean;
  size?: ComponentProps<typeof Button>["size"];
  variant?: ComponentProps<typeof Button>["variant"];
  className?: string;
}

// The primary purchase CTA: opens the phone dialer with the store number.
const CallButton = ({
  label = "Call to buy",
  showNumber = false,
  size = "lg",
  variant = "default",
  className,
}: CallButtonProps) => {
  const phoneNumber = formatPhone(siteConfig.phone);

  return (
    <Button asChild size={size} variant={variant} className={className}>
      <a href={toTelHref(siteConfig.phone)} aria-label={`${label}: ${phoneNumber}`}>
        <PhoneIcon aria-hidden="true" />
        {label}
        {showNumber && <span className="font-semibold tabular-nums">{phoneNumber}</span>}
      </a>
    </Button>
  );
};

export default CallButton;
