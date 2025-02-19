import { Layout } from "./components/layout";
import { ThemeProvider } from "./components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NotFound from "./pages/NotFound";
import OnboardingLayout from "./pages/onboarding/OnboardingLayout";
import AgentCreation from "./pages/onboarding/AgentCreation";
import CreateAgent from "./pages/CreateAgent";
import CampaignDetails from "./pages/CampaignDetails";
import CallDetails from "./pages/CallDetails";

const queryClient = new QueryClient();

function App() {
  return (
    <Router>
      <ThemeProvider defaultTheme="dark" storageKey="brightcards-theme">
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <Routes>
              <Route path="/" element={<Navigate to="/app" replace />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/app/onboarding" element={<OnboardingLayout />}>
                <Route path="create" element={<AgentCreation />} />
              </Route>
              <Route path="/app" element={<Layout />}>
                <Route index element={<Navigate to="/app/campaigns" replace />} />
                <Route path="agents/create" element={<CreateAgent />} />
                <Route path="campaigns/:id" element={<CampaignDetails />} />
                <Route path="calls/:id" element={<CallDetails />} />
              </Route>
              <Route path="/app/*" element={<Layout />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </TooltipProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;
