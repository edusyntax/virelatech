import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import {
  FileText, Eye, Clock, Send, TrendingUp, Plus, PenLine,
  Tags, FolderOpen, Image, Users, ArrowUpRight, BarChart3,
} from "lucide-react";
import { Link } from "react-router-dom";
import { format, subDays, startOfDay } from "date-fns";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell,
} from "recharts";

/* ───── stat card ───── */
const StatCard = ({
  label, value, icon: Icon, color, trend,
}: {
  label: string; value: number; icon: any; color: string; trend?: string;
}) => (
  <div className="bg-card border border-border rounded-xl p-5 flex items-start justify-between hover:border-accent/30 transition-colors">
    <div>
      <p className="text-muted-foreground text-xs uppercase tracking-wider">{label}</p>
      <p className="text-3xl font-bold text-foreground mt-1">{value}</p>
      {trend && (
        <p className="text-xs text-accent flex items-center gap-1 mt-1">
          <TrendingUp className="h-3 w-3" /> {trend}
        </p>
      )}
    </div>
    <div className={`p-2.5 rounded-lg ${color}`}>
      <Icon className="h-5 w-5" />
    </div>
  </div>
);

/* ───── quick action ───── */
const QuickAction = ({ to, icon: Icon, label }: { to: string; icon: any; label: string }) => (
  <Link
    to={to}
    className="flex flex-col items-center gap-2 p-4 rounded-xl border border-border bg-card hover:border-accent/40 hover:bg-accent/5 transition-all group"
  >
    <div className="p-3 rounded-lg bg-accent/10 text-accent group-hover:scale-110 transition-transform">
      <Icon className="h-5 w-5" />
    </div>
    <span className="text-xs font-medium text-muted-foreground group-hover:text-foreground transition-colors">{label}</span>
  </Link>
);

/* ───── status badge ───── */
const StatusBadge = ({ status }: { status: string }) => {
  const styles: Record<string, string> = {
    published: "bg-green-500/10 text-green-500",
    scheduled: "bg-blue-500/10 text-blue-500",
    draft: "bg-yellow-500/10 text-yellow-500",
    archived: "bg-muted text-muted-foreground",
  };
  return (
    <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium uppercase tracking-wider ${styles[status] ?? styles.draft}`}>
      {status}
    </span>
  );
};

const PIE_COLORS = ["hsl(var(--accent))", "hsl(142 71% 45%)", "hsl(48 96% 53%)", "hsl(217 91% 60%)"];

const Dashboard = () => {
  const { user } = useAuth();

  /* ─── stats ─── */
  const { data: stats } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const [total, published, drafts, scheduled] = await Promise.all([
        supabase.from("posts").select("id", { count: "exact", head: true }),
        supabase.from("posts").select("id", { count: "exact", head: true }).eq("status", "published"),
        supabase.from("posts").select("id", { count: "exact", head: true }).eq("status", "draft"),
        supabase.from("posts").select("id", { count: "exact", head: true }).eq("status", "scheduled"),
      ]);
      return {
        total: total.count ?? 0,
        published: published.count ?? 0,
        drafts: drafts.count ?? 0,
        scheduled: scheduled.count ?? 0,
      };
    },
  });

  /* ─── total views ─── */
  const { data: totalViews } = useQuery({
    queryKey: ["admin-total-views"],
    queryFn: async () => {
      const { data } = await supabase.from("posts").select("view_count");
      return data?.reduce((sum, p) => sum + (p.view_count ?? 0), 0) ?? 0;
    },
  });

  /* ─── recent posts ─── */
  const { data: recentPosts } = useQuery({
    queryKey: ["admin-recent-posts"],
    queryFn: async () => {
      const { data } = await supabase
        .from("posts")
        .select("id, title, slug, status, created_at, updated_at, view_count, published_at")
        .order("updated_at", { ascending: false })
        .limit(8);
      return data ?? [];
    },
  });

  /* ─── views over last 14 days (published posts by date) ─── */
  const { data: viewsChart } = useQuery({
    queryKey: ["admin-views-chart"],
    queryFn: async () => {
      const { data } = await supabase
        .from("posts")
        .select("published_at, view_count")
        .eq("status", "published")
        .order("published_at", { ascending: true });

      // Group by day for last 14 days
      const days: Record<string, number> = {};
      for (let i = 13; i >= 0; i--) {
        const d = format(subDays(new Date(), i), "MMM d");
        days[d] = 0;
      }

      data?.forEach((p) => {
        if (p.published_at) {
          const d = format(new Date(p.published_at), "MMM d");
          if (days[d] !== undefined) days[d] += p.view_count ?? 0;
        }
      });

      return Object.entries(days).map(([date, views]) => ({ date, views }));
    },
  });

  /* ─── top posts by views ─── */
  const { data: topPosts } = useQuery({
    queryKey: ["admin-top-posts"],
    queryFn: async () => {
      const { data } = await supabase
        .from("posts")
        .select("id, title, slug, view_count")
        .eq("status", "published")
        .order("view_count", { ascending: false })
        .limit(5);
      return data ?? [];
    },
  });

  /* ─── categories breakdown ─── */
  const { data: categoryBreakdown } = useQuery({
    queryKey: ["admin-category-breakdown"],
    queryFn: async () => {
      const { data } = await supabase
        .from("posts")
        .select("category_id, categories(name)")
        .eq("status", "published");

      const counts: Record<string, number> = {};
      data?.forEach((p: any) => {
        const name = p.categories?.name ?? "Uncategorized";
        counts[name] = (counts[name] ?? 0) + 1;
      });
      return Object.entries(counts).map(([name, value]) => ({ name, value }));
    },
  });

  /* ─── activity timeline ─── */
  const { data: activity } = useQuery({
    queryKey: ["admin-activity"],
    queryFn: async () => {
      const { data } = await supabase
        .from("posts")
        .select("id, title, status, created_at, updated_at, published_at")
        .order("updated_at", { ascending: false })
        .limit(10);

      return (data ?? []).map((p) => {
        let action = "updated";
        let timestamp = p.updated_at;
        if (p.status === "published" && p.published_at) {
          const pubDate = new Date(p.published_at);
          const updDate = new Date(p.updated_at);
          if (Math.abs(pubDate.getTime() - updDate.getTime()) < 60000) {
            action = "published";
            timestamp = p.published_at;
          }
        }
        const createdDate = new Date(p.created_at);
        const updDate2 = new Date(p.updated_at);
        if (Math.abs(createdDate.getTime() - updDate2.getTime()) < 60000) {
          action = "created";
          timestamp = p.created_at;
        }
        return { id: p.id, title: p.title, action, timestamp, status: p.status };
      });
    },
  });

  const greeting = () => {
    const h = new Date().getHours();
    if (h < 12) return "Good morning";
    if (h < 17) return "Good afternoon";
    return "Good evening";
  };

  const pieData = categoryBreakdown?.length ? categoryBreakdown : [{ name: "No data", value: 1 }];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            {greeting()}, {user?.user_metadata?.full_name?.split(" ")[0] || "there"} 👋
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Here's what's happening with your blog today
          </p>
        </div>
        <Link
          to="/admin/posts/create"
          className="bg-accent text-accent-foreground px-4 py-2 rounded-lg text-sm font-medium hover:bg-accent/90 transition-colors flex items-center gap-2"
        >
          <Plus className="h-4 w-4" /> New Post
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <StatCard label="Total Posts" value={stats?.total ?? 0} icon={FileText} color="bg-accent/10 text-accent" />
        <StatCard label="Published" value={stats?.published ?? 0} icon={Send} color="bg-green-500/10 text-green-500" />
        <StatCard label="Drafts" value={stats?.drafts ?? 0} icon={Clock} color="bg-yellow-500/10 text-yellow-500" />
        <StatCard label="Scheduled" value={stats?.scheduled ?? 0} icon={Eye} color="bg-blue-500/10 text-blue-500" />
        <StatCard label="Total Views" value={totalViews ?? 0} icon={BarChart3} color="bg-purple-500/10 text-purple-500" />
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-sm font-semibold text-foreground mb-3">Quick Actions</h2>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
          <QuickAction to="/admin/posts/create" icon={PenLine} label="New Post" />
          <QuickAction to="/admin/posts" icon={FileText} label="All Posts" />
          <QuickAction to="/admin/categories" icon={FolderOpen} label="Categories" />
          <QuickAction to="/admin/tags" icon={Tags} label="Tags" />
          <QuickAction to="/admin/media" icon={Image} label="Media" />
          <QuickAction to="/admin/authors" icon={Users} label="Authors" />
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Views Chart */}
        <div className="lg:col-span-2 bg-card border border-border rounded-xl p-5">
          <h2 className="text-sm font-semibold text-foreground mb-4">Views Overview (Last 14 Days)</h2>
          <div className="h-[240px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={viewsChart ?? []}>
                <defs>
                  <linearGradient id="viewsGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--accent))" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(var(--accent))" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="date" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} />
                <YAxis tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} />
                <Tooltip
                  contentStyle={{
                    background: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                    fontSize: 12,
                  }}
                />
                <Area type="monotone" dataKey="views" stroke="hsl(var(--accent))" fill="url(#viewsGradient)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Breakdown Pie */}
        <div className="bg-card border border-border rounded-xl p-5">
          <h2 className="text-sm font-semibold text-foreground mb-4">Posts by Category</h2>
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {pieData.map((_: any, i: number) => (
                    <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    background: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                    fontSize: 12,
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-wrap gap-3 mt-2">
            {categoryBreakdown?.map((c, i) => (
              <div key={c.name} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <span className="w-2.5 h-2.5 rounded-full" style={{ background: PIE_COLORS[i % PIE_COLORS.length] }} />
                {c.name} ({c.value})
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Row: Top Posts + Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Posts */}
        <div className="bg-card border border-border rounded-xl">
          <div className="px-5 py-4 border-b border-border flex items-center justify-between">
            <h2 className="text-sm font-semibold text-foreground">Top Posts by Views</h2>
            <Link to="/admin/posts" className="text-xs text-accent hover:underline flex items-center gap-1">
              View all <ArrowUpRight className="h-3 w-3" />
            </Link>
          </div>
          <div className="divide-y divide-border">
            {topPosts?.length === 0 && (
              <div className="px-5 py-8 text-center text-muted-foreground text-sm">
                No published posts yet
              </div>
            )}
            {topPosts?.map((post, i) => (
              <Link
                key={post.id}
                to={`/admin/posts/edit/${post.id}`}
                className="flex items-center gap-4 px-5 py-3 hover:bg-muted/30 transition-colors"
              >
                <span className="text-lg font-bold text-muted-foreground/40 w-6 text-center">{i + 1}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{post.title}</p>
                  <p className="text-xs text-muted-foreground">/blog/{post.slug}</p>
                </div>
                <span className="text-sm font-semibold text-foreground">{post.view_count ?? 0}</span>
                <span className="text-xs text-muted-foreground">views</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Activity Timeline */}
        <div className="bg-card border border-border rounded-xl">
          <div className="px-5 py-4 border-b border-border">
            <h2 className="text-sm font-semibold text-foreground">Recent Activity</h2>
          </div>
          <div className="p-5 space-y-4 max-h-[360px] overflow-y-auto">
            {activity?.length === 0 && (
              <p className="text-center text-muted-foreground text-sm py-4">No activity yet</p>
            )}
            {activity?.map((item) => (
              <Link
                key={`${item.id}-${item.timestamp}`}
                to={`/admin/posts/edit/${item.id}`}
                className="flex items-start gap-3 group"
              >
                <div className="mt-1">
                  <div className={`w-2 h-2 rounded-full ${
                    item.action === "published" ? "bg-green-500" :
                    item.action === "created" ? "bg-accent" :
                    "bg-muted-foreground/40"
                  }`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-foreground group-hover:text-accent transition-colors">
                    <span className="font-medium capitalize">{item.action}</span>{" "}
                    <span className="truncate">"{item.title}"</span>
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {format(new Date(item.timestamp), "MMM d, yyyy 'at' h:mm a")}
                  </p>
                </div>
                <StatusBadge status={item.status} />
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Posts Table */}
      <div className="bg-card border border-border rounded-xl">
        <div className="px-5 py-4 border-b border-border flex items-center justify-between">
          <h2 className="text-sm font-semibold text-foreground">Recent Posts</h2>
          <Link to="/admin/posts" className="text-xs text-accent hover:underline flex items-center gap-1">
            Manage posts <ArrowUpRight className="h-3 w-3" />
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border text-xs text-muted-foreground uppercase tracking-wider">
                <th className="text-left px-5 py-3 font-medium">Title</th>
                <th className="text-left px-5 py-3 font-medium">Status</th>
                <th className="text-left px-5 py-3 font-medium">Views</th>
                <th className="text-left px-5 py-3 font-medium">Updated</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {recentPosts?.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-5 py-8 text-center text-muted-foreground text-sm">
                    No posts yet. <Link to="/admin/posts/create" className="text-accent hover:underline">Create your first post</Link>
                  </td>
                </tr>
              )}
              {recentPosts?.map((post) => (
                <tr key={post.id} className="hover:bg-muted/30 transition-colors">
                  <td className="px-5 py-3">
                    <Link to={`/admin/posts/edit/${post.id}`} className="text-sm font-medium text-foreground hover:text-accent transition-colors">
                      {post.title}
                    </Link>
                  </td>
                  <td className="px-5 py-3"><StatusBadge status={post.status} /></td>
                  <td className="px-5 py-3 text-sm text-muted-foreground">{post.view_count ?? 0}</td>
                  <td className="px-5 py-3 text-sm text-muted-foreground">
                    {format(new Date(post.updated_at), "MMM d, yyyy")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
