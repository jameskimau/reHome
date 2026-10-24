import CallButton from "@/components/common/CallButton";

// Sticky call CTA on small screens, where calling is the main conversion path.
const MobileCallBar = () => {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t bg-background/95 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur md:hidden">
      <CallButton showNumber size="lg" className="h-12 w-full text-base" />
    </div>
  );
};

export default MobileCallBar;
