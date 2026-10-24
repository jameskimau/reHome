import Link from "next/link";

import Container from "@/components/common/Container";
import { Button } from "@/components/ui/button";
import { SHOP_SECTION_ID } from "@/config/navigation";

const NotFound = () => {
  return (
    <Container className="flex flex-col items-center gap-4 py-24 text-center">
      <p className="text-sm font-semibold text-primary">404</p>
      <h1 className="text-3xl font-bold tracking-tight">Page not found</h1>
      <p className="max-w-md text-muted-foreground">
        This page doesn&apos;t exist, or the item may have been removed.
      </p>
      <Button asChild size="lg">
        <Link href={`/#${SHOP_SECTION_ID}`}>Browse appliances</Link>
      </Button>
    </Container>
  );
};

export default NotFound;
