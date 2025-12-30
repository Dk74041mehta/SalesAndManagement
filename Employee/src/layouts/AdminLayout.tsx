import { Outlet, NavLink, useLocation } from "react-router-dom";
import { LayoutDashboard, Users, FileText, Settings, Search, LogOut } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const navItems = [
  { to: "/admin/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/admin/leads", icon: FileText, label: "Leads" },
  { to: "/admin/employees", icon: Users, label: "Employees" },
  { to: "/admin/settings", icon: Settings, label: "Settings" },
];

const AdminLayout = () => {
  const location = useLocation();

  // Generate breadcrumb from current path
  const getBreadcrumb = () => {
    const path = location.pathname.replace("/admin/", "");
    const parts = path.split("/").filter(Boolean);
    return parts.map((p) => p.charAt(0).toUpperCase() + p.slice(1)).join(" > ");
  };

  return (
    <div className="flex min-h-screen bg-muted/30">
      {/* Sidebar */}
      <aside className="w-64 bg-primary text-primary-foreground flex flex-col">
        {/* Logo */}
        <div className="px-6 py-8">
          <h1 className="text-xl font-semibold">
            <span className="text-primary-foreground">Canova</span>
            <span className="text-accent">CRM</span>
          </h1>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                  isActive
                    ? "bg-primary-foreground/20 text-primary-foreground font-medium"
                    : "text-primary-foreground/70 hover:bg-primary-foreground/10 hover:text-primary-foreground"
                )
              }
            >
              <item.icon className="h-5 w-5" />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        {/* Logout */}
        <div className="px-4 pb-8">
          <button className="flex items-center gap-3 px-4 py-3 text-primary-foreground/70 hover:text-primary-foreground transition-colors w-full">
            <LogOut className="h-5 w-5" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        {/* Top Bar */}
        <header className="bg-background border-b px-8 py-4 flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Home &gt; {getBreadcrumb()}
          </div>
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search here.."
              className="pl-10 bg-muted/50 border-0"
            />
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 p-8 overflow-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
