import Container from "@/components/common/Container";
import SectionHeading from "@/components/common/SectionHeading";

const STEPS = [
  {
    title: "Browse",
    description: "Find the washer, fridge or dryer that suits your space and budget.",
  },
  {
    title: "Call us",
    description: "Ring to check availability, ask questions or reserve the item.",
  },
  {
    title: "Pick up or delivery",
    description: "Collect it yourself or we deliver and install it for you.",
  },
];

const HowItWorks = () => {
  return (
    <section aria-labelledby="how-heading" className="py-14">
      <Container className="space-y-8">
        <SectionHeading id="how-heading" title="How it works" align="center" />

        <ol className="grid gap-6 sm:grid-cols-3">
          {STEPS.map((step, index) => (
            <li key={step.title} className="space-y-3 text-center">
              <span className="mx-auto flex size-10 items-center justify-center rounded-full bg-primary font-bold text-primary-foreground">
                {index + 1}
              </span>
              <h3 className="font-semibold">{step.title}</h3>
              <p className="text-sm text-muted-foreground">{step.description}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
};

export default HowItWorks;
