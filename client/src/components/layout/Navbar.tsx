import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu, Train } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { ThemeToggle } from "@/components/ThemeToggle";
import { motion } from "framer-motion";

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
          <Button variant="ghost" className="relative group">
            {item.label}
            <motion.span
              className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"
              initial={{ width: "0%" }}
              whileHover={{ width: "100%" }}
            />
          </Button>
        </Link>
      ))}
    </>
  );

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <motion.div
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.5 }}
          >
            <Train className="h-6 w-6 text-primary" />
          </motion.div>
          <span className="font-bold text-xl bg-gradient-to-r from-primary to-orange-600 text-transparent bg-clip-text">IRCTC</span>
        </Link>

        {isMobile ? (
          <div className="flex items-center gap-4 ml-auto">
            <ThemeToggle />
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <div className="flex flex-col gap-4 mt-4">
                  <NavLinks />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        ) : (
          <div className="flex items-center justify-between flex-1">
            <div className="flex gap-6">
              <NavLinks />
            </div>
            <ThemeToggle />
          </div>
        )}
      </div>
    </nav>
  );
}