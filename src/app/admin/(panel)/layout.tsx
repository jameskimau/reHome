import Link from "next/link";

import { signOut } from "@/actions/admin/application/auth";
import Container from "@/components/common/Container";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";

// Static chrome only; the session is checked inside each page (behind loading.tsx's Suspense).
export default function AdminPanelLayout({ children }: LayoutProps<"/admin">) {
  //BUILD UI
  return (
    <>
      <header className="border-b bg-background">
        <Container className="flex h-14 items-center justify-between gap-4">
          <Link href="/admin" className="font-bold">
            {siteConfig.name} <span className="font-normal text-muted-foreground">Admin</span>
          </Link>
          <div className="flex items-center gap-2">
            <Button asChild variant="ghost" size="sm">
              <Link href="/" target="_blank">
                View site
              </Link>
            </Button>
            <form action={signOut}>
              <Button type="submit" variant="outline" size="sm">
                Log out
              </Button>
            </form>
          </div>
        </Container>
      </header>
      <Container className="flex-1 py-8">{children}</Container>
    </>
  );
}
