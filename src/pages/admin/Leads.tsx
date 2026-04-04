import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";
import { format, subDays, startOfWeek, startOfMonth } from "date-fns";
import {
  Search, Filter, Download, Trash2, ChevronLeft, ChevronRight,
  UserPlus, TrendingUp, BarChart3, Mail,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell,
} from "recharts";

const STATUSES = ["new", "contacted", "qualified", "converted", "closed"] as const;
type LeadStatus = typeof STATUSES[number];

const STATUS_COLORS: Record<LeadStatus, string> = {
  new: "bg-blue-500/10 text-blue-500",
  contacted: "bg-yellow-500/10 text-yellow-500",
  qualified: "bg-purple-500/10 text-purple-500",
  converted: "bg-green-500/10 text-green-500",
  closed: "bg-muted text-muted-foreground",
};

const PIE_COLORS = ["hsl(217 91% 60%)", "hsl(48 96% 53%)", "hsl(270 70% 60%)", "hsl(142 71% 45%)", "hsl(var(--muted-foreground))"];

const PAGE_SIZE = 20;

const Leads = () => {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<LeadStatus | "all">("all");
  const [sourceFilter, setSourceFilter] = useState<string>("all");
  const [page, setPage] = useState(0);
  const [showFilters, setShowFilters] = useState(false);

  // Fetch leads
  const { data: leadsResult, isLoading } = useQuery({
    queryKey: ["admin-leads", search, statusFilter, sourceFilter, page],
    queryFn: async () => {
      let query = supabase
        .from("leads")
        .select("*", { count: "exact" })
        .order("created_at", { ascending: false })
        .range(page * PAGE_SIZE, (page + 1) * PAGE_SIZE - 1);

      if (statusFilter !== "all") query = query.eq("status", statusFilter);
      if (sourceFilter !== "all") query = query.eq("source_page", sourceFilter);
      if (search.trim()) {
        query = query.or(`name.ilike.%${search.trim()}%,email.ilike.%${search.trim()}%`);
      }

      const { data, count, error } = await query;
      if (error) throw error;
      return { leads: data ?? [], total: count ?? 0 };
    },
  });

  // Stats
  const { data: stats } = useQuery({
    queryKey: ["admin-lead-stats"],
    queryFn: async () => {
      const now = new Date();
      const weekStart = startOfWeek(now).toISOString();
      const monthStart = startOfMonth(now).toISOString();

      const [total, thisWeek, thisMonth, byStatus] = await Promise.all([
        supabase.from("leads").select("id", { count: "exact", head: true }),
        supabase.from("leads").select("id", { count: "exact", head: true }).gte("created_at", weekStart),
        supabase.from("leads").select("id", { count: "exact", head: true }).gte("created_at", monthStart),
        supabase.from("leads").select("status"),
      ]);

      const statusCounts: Record<string, number> = {};
      byStatus.data?.forEach((l: any) => { statusCounts[l.status] = (statusCounts[l.status] ?? 0) + 1; });

      return {
        total: total.count ?? 0,
        thisWeek: thisWeek.count ?? 0,
        thisMonth: thisMonth.count ?? 0,
        byStatus: Object.entries(statusCounts).map(([name, value]) => ({ name, value })),
      };
    },
  });

  // Source breakdown
  const { data: sourceBreakdown } = useQuery({
    queryKey: ["admin-lead-sources"],
    queryFn: async () => {
      const { data } = await supabase.from("leads").select("source_page");
      const counts: Record<string, number> = {};
      data?.forEach((l: any) => { counts[l.source_page] = (counts[l.source_page] ?? 0) + 1; });
      return Object.entries(counts).map(([name, value]) => ({ name, value }));
    },
  });

  // Leads over time (last 14 days)
  const { data: leadsChart } = useQuery({
    queryKey: ["admin-leads-chart"],
    queryFn: async () => {
      const since = subDays(new Date(), 13).toISOString();
      const { data } = await supabase
        .from("leads")
        .select("created_at")
        .gte("created_at", since);

      const days: Record<string, number> = {};
      for (let i = 13; i >= 0; i--) {
        days[format(subDays(new Date(), i), "MMM d")] = 0;
      }
      data?.forEach((l: any) => {
        const d = format(new Date(l.created_at), "MMM d");
        if (days[d] !== undefined) days[d]++;
      });
      return Object.entries(days).map(([date, count]) => ({ date, count }));
    },
  });

  // Unique sources for filter
  const uniqueSources = [...new Set(sourceBreakdown?.map((s) => s.name) ?? [])];

  // Update status mutation
  const updateStatus = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: LeadStatus }) => {
      const { error } = await supabase.from("leads").update({ status }).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-leads"] });
      queryClient.invalidateQueries({ queryKey: ["admin-lead-stats"] });
      toast.success("Status updated");
    },
  });

  // Delete mutation
  const deleteLead = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("leads").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-leads"] });
      queryClient.invalidateQueries({ queryKey: ["admin-lead-stats"] });
      toast.success("Lead deleted");
    },
  });

  // CSV export
  const exportCSV = () => {
    if (!leadsResult?.leads.length) return;
    const headers = ["Name", "Email", "Company", "Service Interest", "Source", "Status", "Message", "Date"];
    const rows = leadsResult.leads.map((l) => [
      l.name, l.email, l.company ?? "", l.service_interest ?? "",
      l.source_page, l.status, (l.message ?? "").replace(/[\n\r,]/g, " "),
      format(new Date(l.created_at), "yyyy-MM-dd HH:mm"),
    ]);
    const csv = [headers.join(","), ...rows.map((r) => r.map((c) => `"${c}"`).join(","))].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `leads-export-${format(new Date(), "yyyy-MM-dd")}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Leads exported");
  };

  // Realtime subscription
  useEffect(() => {
    const channel = supabase
      .channel("leads-realtime")
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "leads" }, () => {
        queryClient.invalidateQueries({ queryKey: ["admin-leads"] });
        queryClient.invalidateQueries({ queryKey: ["admin-lead-stats"] });
        queryClient.invalidateQueries({ queryKey: ["admin-leads-chart"] });
        queryClient.invalidateQueries({ queryKey: ["admin-lead-sources"] });
        toast.info("New lead received!", { icon: "🔔" });
      })
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, [queryClient]);

  const totalPages = Math.ceil((leadsResult?.total ?? 0) / PAGE_SIZE);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Lead Management</h1>
          <p className="text-muted-foreground text-sm mt-1">Track and manage all incoming leads</p>
        </div>
        <Button variant="outline" size="sm" onClick={exportCSV} disabled={!leadsResult?.leads.length}>
          <Download className="h-3.5 w-3.5 mr-1.5" /> Export CSV
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-card border border-border rounded-xl p-5 flex items-start justify-between">
          <div>
            <p className="text-muted-foreground text-xs uppercase tracking-wider">Total Leads</p>
            <p className="text-3xl font-bold text-foreground mt-1">{stats?.total ?? 0}</p>
          </div>
          <div className="p-2.5 rounded-lg bg-accent/10 text-accent"><UserPlus className="h-5 w-5" /></div>
        </div>
        <div className="bg-card border border-border rounded-xl p-5 flex items-start justify-between">
          <div>
            <p className="text-muted-foreground text-xs uppercase tracking-wider">This Week</p>
            <p className="text-3xl font-bold text-foreground mt-1">{stats?.thisWeek ?? 0}</p>
          </div>
          <div className="p-2.5 rounded-lg bg-green-500/10 text-green-500"><TrendingUp className="h-5 w-5" /></div>
        </div>
        <div className="bg-card border border-border rounded-xl p-5 flex items-start justify-between">
          <div>
            <p className="text-muted-foreground text-xs uppercase tracking-wider">This Month</p>
            <p className="text-3xl font-bold text-foreground mt-1">{stats?.thisMonth ?? 0}</p>
          </div>
          <div className="p-2.5 rounded-lg bg-blue-500/10 text-blue-500"><BarChart3 className="h-5 w-5" /></div>
        </div>
        <div className="bg-card border border-border rounded-xl p-5 flex items-start justify-between">
          <div>
            <p className="text-muted-foreground text-xs uppercase tracking-wider">New (Uncontacted)</p>
            <p className="text-3xl font-bold text-foreground mt-1">
              {stats?.byStatus?.find((s) => s.name === "new")?.value ?? 0}
            </p>
          </div>
          <div className="p-2.5 rounded-lg bg-yellow-500/10 text-yellow-500"><Mail className="h-5 w-5" /></div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-card border border-border rounded-xl p-5">
          <h2 className="text-sm font-semibold text-foreground mb-4">Leads Over Time</h2>
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={leadsChart ?? []}>
                <defs>
                  <linearGradient id="leadGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--accent))" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(var(--accent))" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="date" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} />
                <YAxis tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} allowDecimals={false} />
                <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px", fontSize: 12 }} />
                <Area type="monotone" dataKey="count" stroke="hsl(var(--accent))" fill="url(#leadGrad)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-card border border-border rounded-xl p-5">
          <h2 className="text-sm font-semibold text-foreground mb-4">Leads by Source</h2>
          <div className="h-[160px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={sourceBreakdown?.length ? sourceBreakdown : [{ name: "No data", value: 1 }]} cx="50%" cy="50%" innerRadius={40} outerRadius={65} paddingAngle={3} dataKey="value">
                  {(sourceBreakdown?.length ? sourceBreakdown : [{ name: "No data", value: 1 }]).map((_: any, i: number) => (
                    <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px", fontSize: 12 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {sourceBreakdown?.map((s, i) => (
              <span key={s.name} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <span className="w-2 h-2 rounded-full" style={{ background: PIE_COLORS[i % PIE_COLORS.length] }} />
                {s.name} ({s.value})
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(0); }}
            className="pl-10"
          />
        </div>
        <Button variant="outline" size="sm" onClick={() => setShowFilters(!showFilters)}>
          <Filter className="h-3.5 w-3.5 mr-1.5" /> Filters
        </Button>
      </div>

      {showFilters && (
        <div className="flex flex-wrap gap-3 p-4 bg-card border border-border rounded-xl">
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground font-medium">Status</p>
            <div className="flex flex-wrap gap-1.5">
              {["all", ...STATUSES].map((s) => (
                <button
                  key={s}
                  onClick={() => { setStatusFilter(s as any); setPage(0); }}
                  className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
                    statusFilter === s ? "bg-accent/10 border-accent text-accent" : "border-border text-muted-foreground hover:border-foreground"
                  }`}
                >
                  {s === "all" ? "All" : s.charAt(0).toUpperCase() + s.slice(1)}
                </button>
              ))}
            </div>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground font-medium">Source</p>
            <div className="flex flex-wrap gap-1.5">
              {["all", ...uniqueSources].map((s) => (
                <button
                  key={s}
                  onClick={() => { setSourceFilter(s); setPage(0); }}
                  className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
                    sourceFilter === s ? "bg-accent/10 border-accent text-accent" : "border-border text-muted-foreground hover:border-foreground"
                  }`}
                >
                  {s === "all" ? "All" : s}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Lead Table */}
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border text-xs text-muted-foreground uppercase tracking-wider">
                <th className="text-left px-5 py-3 font-medium">Contact</th>
                <th className="text-left px-5 py-3 font-medium">Service</th>
                <th className="text-left px-5 py-3 font-medium">Source</th>
                <th className="text-left px-5 py-3 font-medium">Status</th>
                <th className="text-left px-5 py-3 font-medium">Date</th>
                <th className="text-right px-5 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {isLoading && (
                <tr><td colSpan={6} className="px-5 py-8 text-center text-muted-foreground text-sm">Loading...</td></tr>
              )}
              {!isLoading && leadsResult?.leads.length === 0 && (
                <tr><td colSpan={6} className="px-5 py-8 text-center text-muted-foreground text-sm">No leads found</td></tr>
              )}
              {leadsResult?.leads.map((lead) => (
                <tr key={lead.id} className="hover:bg-muted/30 transition-colors">
                  <td className="px-5 py-3">
                    <Link to={`/admin/leads/${lead.id}`} className="hover:text-accent transition-colors">
                      <p className="text-sm font-medium text-foreground">{lead.name}</p>
                      <p className="text-xs text-muted-foreground">{lead.email}</p>
                      {lead.company && <p className="text-xs text-muted-foreground/60">{lead.company}</p>}
                    </Link>
                  </td>
                  <td className="px-5 py-3 text-sm text-muted-foreground">{lead.service_interest || "—"}</td>
                  <td className="px-5 py-3">
                    <span className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">{lead.source_page}</span>
                  </td>
                  <td className="px-5 py-3">
                    <select
                      value={lead.status}
                      onChange={(e) => updateStatus.mutate({ id: lead.id, status: e.target.value as LeadStatus })}
                      className={`text-xs px-2 py-1 rounded-full border-0 cursor-pointer font-medium uppercase tracking-wider ${STATUS_COLORS[lead.status as LeadStatus]}`}
                    >
                      {STATUSES.map((s) => (
                        <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
                      ))}
                    </select>
                  </td>
                  <td className="px-5 py-3 text-sm text-muted-foreground whitespace-nowrap">
                    {format(new Date(lead.created_at), "MMM d, yyyy")}
                    <br />
                    <span className="text-xs text-muted-foreground/60">{format(new Date(lead.created_at), "h:mm a")}</span>
                  </td>
                  <td className="px-5 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link to={`/admin/leads/${lead.id}`}>
                        <Button variant="ghost" size="sm" className="text-xs">View</Button>
                      </Link>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-destructive hover:text-destructive h-8 w-8"
                        onClick={() => { if (confirm("Delete this lead?")) deleteLead.mutate(lead.id); }}
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-5 py-3 border-t border-border">
            <p className="text-xs text-muted-foreground">
              Showing {page * PAGE_SIZE + 1}–{Math.min((page + 1) * PAGE_SIZE, leadsResult?.total ?? 0)} of {leadsResult?.total ?? 0}
            </p>
            <div className="flex gap-1">
              <Button variant="ghost" size="icon" disabled={page === 0} onClick={() => setPage(page - 1)}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" disabled={page >= totalPages - 1} onClick={() => setPage(page + 1)}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Leads;
