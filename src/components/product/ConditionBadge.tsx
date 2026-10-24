import { Badge } from "@/components/ui/badge";
import { CONDITION_LABELS } from "@/lib/catalog";
import { cn } from "@/lib/utils";
import type { Condition } from "@/types/product";

const CONDITION_STYLES: Record<Condition, string> = {
  LIKE_NEW: "bg-emerald-100 text-emerald-800",
  GOOD: "bg-sky-100 text-sky-800",
  FAIR: "bg-amber-100 text-amber-800",
};

interface ConditionBadgeProps {
  condition: Condition;
  className?: string;
}

const ConditionBadge = ({ condition, className }: ConditionBadgeProps) => {
  return (
    <Badge className={cn(CONDITION_STYLES[condition], className)}>
      {CONDITION_LABELS[condition]}
    </Badge>
  );
};

export default ConditionBadge;
