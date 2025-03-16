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
import { motion, AnimatePresence } from "framer-motion";

const NAV_ITEMS = [
  { href: '/', label: 'Home' },
  { href: '/trains', label: 'Book Tickets' },
  { href: '/track', label: 'Track Train' },
  { href: '/auth', label: 'Login' }
];

const navItemVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: "easeOut"
    }
  })
};

export function Navbar() {
  const isMobile = useIsMobile();

  const NavLinks = () => (
    <>
      {NAV_ITEMS.map((item, i) => (
        <motion.div
          key={item.href}
          custom={i}
          initial="hidden"
          animate="visible"
          variants={navItemVariants}
        >
          <Link href={item.href}>
            <Button 
              variant="ghost" 
              className="relative group overflow-hidden"
            >
              <span className="relative z-10">{item.label}</span>
              <motion.div
                className="absolute bottom-0 left-0 h-[2px] w-full bg-primary"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.3 }}
              />
            </Button>
          </Link>
        </motion.div>
      ))}
    </>
  );

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100 }}
      className="fixed top-0 z-[100] w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:bg-slate-900/95"
    >
      <div className="container flex h-14 items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <motion.div
            whileHover={{ rotate: 360, scale: 1.2 }}
            transition={{ duration: 0.5 }}
          >
            <Train className="h-6 w-6 text-primary" />
          </motion.div>
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="font-bold text-xl bg-gradient-to-r from-primary to-orange-600 text-transparent bg-clip-text"
          >
            IRCTC
          </motion.span>
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
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="flex flex-col gap-4 mt-4"
                >
                  <NavLinks />
                </motion.div>
              </SheetContent>
            </Sheet>
          </div>
        ) : (
          <div className="flex items-center justify-between flex-1">
            <div className="flex gap-6">
              <NavLinks />
            </div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <ThemeToggle />
            </motion.div>
          </div>
        )}
      </div>
    </motion.nav>
  );
}