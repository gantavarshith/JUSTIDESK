import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { AuthProvider } from "@/context/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";

// Layouts
import { AppLayout } from "@/components/layout/AppLayout";

// Pages
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CitizenDashboard from "./pages/CitizenDashboard";
import KnowYourRights from "./pages/KnowYourRights";
import CitizenCases from "./pages/CitizenCases";
import FileCase from "./pages/FileCase";
import CitizenDocuments from "./pages/CitizenDocuments";
import CitizenConsultations from "./pages/CitizenConsultations";
import CitizenSavedForms from "./pages/CitizenSavedForms";
import Profile from "./pages/Profile";
import TermsAndServices from "./pages/TermsAndServices";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import AIChatWithLawyer from "./pages/AIChatWithLawyer";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/terms" element={<TermsAndServices />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              
              {/* Protected Citizen Routes with App Layout */}
              <Route element={<ProtectedRoute />}>
                <Route element={<AppLayout />}>
                  <Route path="/citizen/dashboard" element={<CitizenDashboard />} />
                  <Route path="/citizen/cases" element={<CitizenCases />} />
                  <Route path="/citizen/cases/:id" element={<CitizenCases />} />
                  <Route path="/citizen/file-case" element={<FileCase />} />
                  <Route path="/citizen/documents" element={<CitizenDocuments />} />
                  <Route path="/citizen/documents/:id" element={<CitizenDocuments />} />
                  <Route path="/citizen/consultations" element={<CitizenConsultations />} />
                  <Route path="/citizen/forms" element={<CitizenSavedForms />} />
                  <Route path="/citizen/ai-chat" element={<AIChatWithLawyer />} />
                  <Route path="/rights" element={<KnowYourRights />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/help" element={<KnowYourRights />} />
                  <Route path="/settings" element={<CitizenDashboard />} />
                </Route>
              </Route>

              {/* Catch-all */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
