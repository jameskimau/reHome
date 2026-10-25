import { Badge } from "@/components/ui/badge";
import { CONDITION_LABELS } from "@/lib/catalog";
import { cn } from "@/lib/utils";
import type { Condition } from "@/generated/prisma/enums";

const CONDITION_STYLES: Record<Condition, string> = {
  LIKE_NEW: "bg-success text-success-foreground",
  GOOD: "bg-primary text-primary-foreground",
  FAIR: "bg-secondary text-secondary-foreground",
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
