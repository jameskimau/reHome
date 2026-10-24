import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  title: string;
  description?: string;
  align?: "left" | "center";
  /** Pass to link the heading to its section via aria-labelledby. */
  id?: string;
  className?: string;
}

const SectionHeading = ({
  title,
  description,
  align = "left",
  id,
  className,
}: SectionHeadingProps) => {
  return (
    <div
      className={cn("space-y-2", align === "center" && "mx-auto max-w-2xl text-center", className)}
    >
      <h2 id={id} className="text-2xl font-semibold tracking-tight sm:text-3xl">
        {title}
      </h2>
      {description && <p className="text-muted-foreground">{description}</p>}
    </div>
  );
};

export default SectionHeading;
