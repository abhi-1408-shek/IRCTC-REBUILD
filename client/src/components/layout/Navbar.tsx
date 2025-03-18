import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";
import { NavbarGlow } from "../ui/glow-effects";
import { ModernLogo } from "../ui/modern-logo";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/trains", label: "Find Trains" },
  { href: "/track", label: "Track Train" },
];

export function Navbar() {
  const [location] = useLocation();

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 z-50 backdrop-blur-lg dark:bg-slate-900/90 bg-white/90 border-b border-border"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
      >
        <nav className="container flex h-16 items-center justify-between">
          <Link href="/">
            <ModernLogo />
          </Link>

          <div className="hidden md:flex items-center space-x-6">
            {navItems.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary relative group",
                  location === href
                    ? "text-primary font-bold"
                    : "text-muted-foreground"
                )}
              >
                <span className="relative z-10">{label}</span>
                {location === href ? (
                  <motion.span
                    className="absolute -bottom-2 left-0 right-0 h-0.5 bg-primary"
                    layoutId="navbar-underline"
                    transition={{ type: "spring", bounce: 0.25 }}
                  />
                ) : (
                  <span className="absolute -bottom-2 left-0 right-0 h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform" />
                )}
              </Link>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button 
                asChild 
                variant="outline" 
                size="icon" 
                className="border-2 relative overflow-hidden group"
              >
                <Link href="/auth">
                  <User className="h-5 w-5 relative z-10" />
                  <motion.div 
                    className="absolute inset-0 bg-primary/10"
                    initial={{ scale: 0 }}
                    whileHover={{ scale: 1 }}
                    transition={{ type: "spring", bounce: 0.5 }}
                  />
                </Link>
              </Button>
            </motion.div>
          </div>
        </nav>

        {/* Glowing Line */}
        <NavbarGlow />
      </motion.header>
      <div className="h-16" /> {/* Spacer */}
    </>
  );
}