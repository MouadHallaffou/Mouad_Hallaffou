import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import { Toaster } from "sonner";
import { ThemeProvider } from "./contexts/ThemeContext.tsx";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import AdminLayout from "./pages/admin/AdminLayout.tsx";
import AdminProfile from "./pages/admin/AdminProfile.tsx";
import AdminProjects from "./pages/admin/AdminProjects.tsx";
import AdminExperience from "./pages/admin/AdminExperience.tsx";
import AdminSkills from "./pages/admin/AdminSkills.tsx";
import AdminSocial from "./pages/admin/AdminSocial.tsx";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TooltipProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/admin" element={<AdminLayout />}>
                <Route path="profile" element={<AdminProfile />} />
                <Route path="projects" element={<AdminProjects />} />
                <Route path="experience" element={<AdminExperience />} />
                <Route path="skills" element={<AdminSkills />} />
                <Route path="social" element={<AdminSocial />} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
          <Toaster />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
