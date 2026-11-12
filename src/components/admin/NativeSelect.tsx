import { ChevronDownIcon } from "lucide-react";
import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

interface NativeSelectProps extends ComponentProps<"select"> {
  containerClassName?: string;
}

// Native <select> with its own chevron, so the arrow sits inside the padding instead of hugging the edge.
const NativeSelect = ({ className, containerClassName, ...props }: NativeSelectProps) => (
  <div className={cn("relative", containerClassName)}>
    <select
      className={cn(
        "w-full appearance-none rounded-md border bg-background pr-9 pl-3 text-sm",
        className,
      )}
      {...props}
    />
    <ChevronDownIcon
      aria-hidden="true"
      className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 opacity-60"
    />
  </div>
);

export default NativeSelect;
