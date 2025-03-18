import { useEffect } from 'react';
import { Route, Switch } from 'wouter';
import { Navbar } from '@/components/layout/Navbar';
import { initializeTheme } from '@/lib/utils';
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";

// Pages
import Home from '@/pages/Home';
import TrainList from '@/pages/TrainList';
import TrackTrain from '@/pages/TrackTrain';
import Auth from '@/pages/Auth';
import TrainBooking from '@/pages/TrainBooking';
import NotFound from '@/pages/not-found';

export function App() {
  useEffect(() => {
    // Initialize theme
    const cleanup = initializeTheme();
    return () => cleanup?.();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Navbar />
      <main>
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/trains" component={TrainList} />
          <Route path="/track" component={TrackTrain} />
          <Route path="/auth" component={Auth} />
          <Route path="/booking" component={TrainBooking} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <Toaster />
    </QueryClientProvider>
  );
}
