import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Index from "./pages/Index";
import GoRidePage from "./pages/GoRidePage";
import GoWashPage from "./pages/GoWashPage";
import GoCleanPage from "./pages/GoCleanPage";
import GoFixPage from "./pages/GoFixPage";
import GoPrintPage from "./pages/GoPrintPage";
import NotFound from "./pages/NotFound";
import ScrollToTop from "./components/ScrollToTop";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/goride" element={<GoRidePage />} />
            <Route path="/gowash" element={<GoWashPage />} />
            <Route path="/goclean" element={<GoCleanPage />} />
            <Route path="/gofix" element={<GoFixPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
