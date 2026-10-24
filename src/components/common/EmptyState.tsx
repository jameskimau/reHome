import type { ReactNode } from "react";

interface EmptyStateProps {
  title: string;
  description?: string;
  action?: ReactNode;
}

const EmptyState = ({ title, description, action }: EmptyStateProps) => {
  return (
    <div className="flex flex-col items-center gap-3 rounded-xl border border-dashed px-6 py-16 text-center">
      <h3 className="text-lg font-semibold">{title}</h3>
      {description && <p className="max-w-md text-muted-foreground">{description}</p>}
      {action}
    </div>
  );
};

export default EmptyState;
