import { BookingWidget } from "../booking/BookingWidget";

export function Hero() {
  return (
    <div className="relative min-h-[600px] flex items-center">
      <div 
        className="absolute inset-0 -z-10"
        style={{
          background: "linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.7)), url('https://images.unsplash.com/photo-1594135356513-14291e55162a') center/cover no-repeat"
        }}
      />
      
      <div className="container mx-auto px-4">
        <div className="max-w-2xl text-white mb-8">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Book Train Tickets with Ease
          </h1>
          <p className="text-lg md:text-xl opacity-90">
            Experience seamless train booking across India with modern IRCTC
          </p>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-lg max-w-3xl">
          <BookingWidget />
        </div>
      </div>
    </div>
  );
}
