import { Hero } from "@/components/landing/Hero";
import { ServiceCards } from "@/components/landing/ServiceCards";
import { Navbar } from "@/components/layout/Navbar";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <ServiceCards />
    </div>
  );
}
