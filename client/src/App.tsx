import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";

import Home from "@/pages/Home";
import Auth from "@/pages/Auth";
import TrainList from "@/pages/TrainList";
import TrainBooking from "@/pages/TrainBooking";
import TrackTrain from "@/pages/TrackTrain";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/auth" component={Auth} />
      <Route path="/trains" component={TrainList} />
      <Route path="/booking" component={TrainBooking} />
      <Route path="/track" component={TrackTrain} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
