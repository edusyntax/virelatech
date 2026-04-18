import { useAuth } from "@/contexts/AuthContext";
import { Navigate, Outlet, Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard, FileText, FolderOpen, Tags, Image, Users, LogOut, ChevronLeft, ChevronRight, Settings, UserPlus,
} from "lucide-react";
import { useState, useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, href: "/admin" },
  { label: "Leads", icon: UserPlus, href: "/admin/leads" },
  { label: "Posts", icon: FileText, href: "/admin/posts" },
  { label: "Categories", icon: FolderOpen, href: "/admin/categories" },
  { label: "Tags", icon: Tags, href: "/admin/tags" },
  { label: "Media", icon: Image, href: "/admin/media" },
  { label: "Authors", icon: Users, href: "/admin/authors" },
];

const AdminLayout = () => {
  const { user, role, loading, signOut } = useAuth();

  const queryClient = useQueryClient();
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  // New leads count for badge
  const { data: newLeadsCount } = useQuery({
    queryKey: ["admin-new-leads-count"],
    queryFn: async () => {
      const { count } = await supabase
        .from("leads")
        .select("id", { count: "exact", head: true })
        .eq("status", "new");
      return count ?? 0;
    },
    refetchInterval: 30000, // refresh every 30s
  });

  // Realtime new lead notifications
  useEffect(() => {
    const channel = supabase
      .channel("admin-lead-badge")
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "leads" }, () => {
        // Trigger refetch of the badge count
        queryClient.refetchQueries({ queryKey: ["admin-new-leads-count"] });
      })
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent" />
      </div>
    );
  }

  if (!user || !role) {
    return <Navigate to="/admin/login" replace />;
  }

  return (
    <div className="min-h-screen flex bg-background">
      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 h-full bg-card border-r border-border z-50 flex flex-col transition-all duration-300",
          collapsed ? "w-16" : "w-60"
        )}
      >
        <div className="flex items-center justify-between h-16 px-4 border-b border-border">
          {!collapsed && (
            <Link to="/admin" className="text-foreground font-grotesk font-bold text-sm tracking-tight">
              VirelaTech
            </Link>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setCollapsed(!collapsed)}
            className="text-muted-foreground hover:text-foreground ml-auto"
          >
            {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
        </div>

        <nav className="flex-1 py-4 space-y-1 px-2">
          {navItems.map((item) => {
            const isActive =
              item.href === "/admin"
                ? location.pathname === "/admin"
                : location.pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors relative",
                  isActive
                    ? "bg-accent/10 text-accent font-medium"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                )}
              >
                <item.icon className="h-4 w-4 flex-shrink-0" />
                {!collapsed && (
                  <span className="flex-1 flex items-center justify-between">
                    {item.label}
                    {item.href === "/admin/leads" && newLeadsCount && newLeadsCount > 0 ? (
                      <span className="bg-accent text-accent-foreground text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center">
                        {newLeadsCount}
                      </span>
                    ) : null}
                  </span>
                )}
                {collapsed && item.href === "/admin/leads" && newLeadsCount && newLeadsCount > 0 ? (
                  <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-accent" />
                ) : null}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-border p-3 space-y-1">
          <Link
            to="/"
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
          >
            <Settings className="h-4 w-4 flex-shrink-0" />
            {!collapsed && <span>View Site</span>}
          </Link>
          <button
            onClick={signOut}
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors w-full"
          >
            <LogOut className="h-4 w-4 flex-shrink-0" />
            {!collapsed && <span>Sign Out</span>}
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className={cn("flex-1 transition-all duration-300", collapsed ? "ml-16" : "ml-60")}>
        <div className="p-6 md:p-8 max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
