import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const NAV_ITEMS = [
  { href: '/', label: 'Home' },
  { href: '/trains', label: 'Book Tickets' },
  { href: '/track', label: 'Track Train' },
  { href: '/auth', label: 'Login' }
];

export function Navbar() {
  const isMobile = useIsMobile();

  const NavLinks = () => (
    <>
      {NAV_ITEMS.map(item => (
        <Link key={item.href} href={item.href}>
          <Button variant="ghost">{item.label}</Button>
        </Link>
      ))}
    </>
  );

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="font-bold text-xl">IRCTC</span>
          </Link>
        </div>

        {isMobile ? (
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="ml-auto">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <div className="flex flex-col gap-4 mt-4">
                <NavLinks />
              </div>
            </SheetContent>
          </Sheet>
        ) : (
          <div className="flex items-center justify-between flex-1">
            <div className="flex gap-6">
              <NavLinks />
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}