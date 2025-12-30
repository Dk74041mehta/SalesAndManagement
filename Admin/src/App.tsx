import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import NotFound from "./pages/NotFound";

// Employee Pages
import EmployeeLogin from "./pages/employee/Login";
import EmployeeLayout from "./layouts/EmployeeLayout";
import EmployeeHome from "./pages/employee/Home";
import EmployeeLeads from "./pages/employee/Leads";
import EmployeeSchedule from "./pages/employee/Schedule";
import EmployeeProfile from "./pages/employee/Profile";

// Admin Pages
import AdminLogin from "./pages/admin/Login";
import AdminLayout from "./layouts/AdminLayout";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminEmployees from "./pages/admin/Employees";
import AdminLeads from "./pages/admin/Leads";
import AdminSettings from "./pages/admin/Settings";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Redirect root to employee login */}
          <Route path="/" element={<Navigate to="/employee/login" replace />} />
          
          {/* Employee Routes */}
          <Route path="/employee/login" element={<EmployeeLogin />} />
          <Route path="/employee" element={<EmployeeLayout />}>
            <Route path="home" element={<EmployeeHome />} />
            <Route path="leads" element={<EmployeeLeads />} />
            <Route path="schedule" element={<EmployeeSchedule />} />
            <Route path="profile" element={<EmployeeProfile />} />
          </Route>

          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="employees" element={<AdminEmployees />} />
            <Route path="leads" element={<AdminLeads />} />
            <Route path="settings" element={<AdminSettings />} />
          </Route>

          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;