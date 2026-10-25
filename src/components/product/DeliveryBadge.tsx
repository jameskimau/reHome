import { TruckIcon } from "lucide-react";

import { cn } from "@/lib/utils";

interface DeliveryBadgeProps {
  className?: string;
}

// Every item can be delivered, so this is UI-only; no DB flag behind it.
const DeliveryBadge = ({ className }: DeliveryBadgeProps) => {
  return (
    <p className={cn("flex items-center gap-2 font-medium text-primary", className)}>
      <TruckIcon className="size-4" aria-hidden="true" />
      Delivery available
    </p>
  );
};

export default DeliveryBadge;
