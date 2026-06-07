import { useState, useEffect, useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { invalidateBlogCaches } from "@/lib/blog-cache";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { Trash2, Edit, Eye, Search, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const Posts = () => {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  const PAGE_SIZE = 20;
  const queryClient = useQueryClient();
  const { role } = useAuth();

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search.trim()), 300);
    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    setPage(1);
    setSelectedIds([]);
  }, [debouncedSearch, statusFilter]);

  const {
    data: posts,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["admin-posts", debouncedSearch, statusFilter],
    queryFn: async () => {
      let query = supabase
        .from("posts")
        .select(
          "id, title, slug, status, created_at, published_at, view_count, reading_time_minutes, author_id, profiles(display_name)",
        )
        .order("created_at", { ascending: false });

      if (statusFilter !== "all") {
        query = query.eq(
          "status",
          statusFilter as "draft" | "published" | "scheduled" | "archived",
        );
      }
      if (debouncedSearch) {
        query = query.ilike("title", `%${debouncedSearch}%`);
      }
      const { data, error } = await query;
      if (error) throw error;
      return data ?? [];
    },
    staleTime: 30_000,
  });

  const totalPages = Math.max(1, Math.ceil((posts?.length ?? 0) / PAGE_SIZE));
  const paginatedPosts = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return posts?.slice(start, start + PAGE_SIZE) ?? [];
  }, [posts, page]);

  const deleteMutation = useMutation({
    mutationFn: async (ids: string[]) => {
      const { error } = await supabase.from("posts").delete().in("id", ids);
      if (error) throw error;
    },
    onSuccess: async () => {
      await invalidateBlogCaches(queryClient);
      setSelectedIds([]);
      toast.success("Posts deleted");
    },
    onError: () => toast.error("Failed to delete posts"),
  });

  const toggleSelect = (postId: string) => {
    setSelectedIds((prev) =>
      prev.includes(postId)
        ? prev.filter((i) => i !== postId)
        : [...prev, postId],
    );
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === paginatedPosts.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(paginatedPosts.map((p) => p.id));
    }
  };

  const getPreviewUrl = (post: { slug: string; status: string }) =>
    post.status === "published"
      ? `/blog/${post.slug}`
      : `/blog/preview/${post.slug}`;

  const statuses = useMemo(
    () => ["all", "draft", "published", "scheduled", "archived"],
    [],
  );
  const canBulkDelete = role === "admin" || "superadmin";

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Posts</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Manage your blog content
          </p>
        </div>
        <Link to="/admin/posts/create">
          <Button className="gap-2">
            <Plus className="h-4 w-4" /> New Post
          </Button>
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search posts..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-1 flex-wrap">
          {statuses.map((s) => (
            <Button
              key={s}
              variant={statusFilter === s ? "default" : "outline"}
              size="sm"
              onClick={() => setStatusFilter(s)}
              className="capitalize text-xs"
            >
              {s}
            </Button>
          ))}
        </div>
      </div>

      {/* Bulk actions */}
      {selectedIds.length > 0 && canBulkDelete && (
        <div className="flex items-center gap-3 bg-muted/30 rounded-lg px-4 py-2">
          <span className="text-sm text-muted-foreground">
            {selectedIds.length} selected
          </span>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="destructive"
                size="sm"
                disabled={deleteMutation.isPending}
              >
                <Trash2 className="h-3 w-3 mr-1" /> Delete
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Delete {selectedIds.length} posts?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => deleteMutation.mutate(selectedIds)}
                >
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      )}

      {/* Table */}
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border text-left">
                <th className="px-4 py-3">
                  <input
                    type="checkbox"
                    checked={
                      selectedIds.length === paginatedPosts.length &&
                      paginatedPosts.length > 0
                    }
                    onChange={toggleSelectAll}
                    className="rounded border-border"
                  />
                </th>
                <th className="px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Title
                </th>
                <th className="px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Status
                </th>
                <th className="px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden md:table-cell">
                  Author
                </th>
                <th className="px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden md:table-cell">
                  Date
                </th>
                <th className="px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden lg:table-cell">
                  Views
                </th>
                <th className="px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {isLoading ? (
                <tr>
                  <td
                    colSpan={7}
                    className="px-4 py-8 text-center text-muted-foreground text-sm"
                  >
                    Loading posts…
                  </td>
                </tr>
              ) : posts?.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 py-12 text-center">
                    <p className="text-muted-foreground text-sm">
                      {debouncedSearch || statusFilter !== "all"
                        ? "No posts match your filters"
                        : "No posts yet"}
                    </p>
                    {!debouncedSearch && statusFilter === "all" && (
                      <Link
                        to="/admin/posts/create"
                        className="text-accent text-sm hover:underline mt-2 inline-block"
                      >
                        Create your first post
                      </Link>
                    )}
                  </td>
                </tr>
              ) : (
                paginatedPosts.map((post) => (
                  <tr
                    key={post.id}
                    className="hover:bg-muted/20 transition-colors"
                  >
                    <td className="px-4 py-3">
                      <input
                        type="checkbox"
                        checked={selectedIds.includes(post.id)}
                        onChange={() => toggleSelect(post.id)}
                        className="rounded border-border"
                      />
                    </td>
                    <td className="px-4 py-3">
                      <div>
                        <p className="text-sm font-medium text-foreground">
                          {post.title}
                        </p>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {post.reading_time_minutes} min read
                        </p>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded-full font-medium uppercase tracking-wider ${
                          post.status === "published"
                            ? "bg-green-500/10 text-green-500"
                            : post.status === "scheduled"
                              ? "bg-blue-500/10 text-blue-500"
                              : post.status === "draft"
                                ? "bg-yellow-500/10 text-yellow-500"
                                : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {post.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-muted-foreground hidden md:table-cell">
                      {(post as { profiles?: { display_name?: string } })
                        .profiles?.display_name ?? "—"}
                    </td>
                    <td className="px-4 py-3 text-sm text-muted-foreground hidden md:table-cell">
                      {format(
                        new Date(post.published_at ?? post.created_at),
                        "MMM d, yyyy",
                      )}
                    </td>
                    <td className="px-4 py-3 text-sm text-muted-foreground hidden lg:table-cell">
                      {post.view_count}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <Link to={`/admin/posts/edit/${post.id}`}>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            title="Edit"
                          >
                            <Edit className="h-3.5 w-3.5" />
                          </Button>
                        </Link>
                        <Link
                          to={getPreviewUrl(post)}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            title="Preview"
                          >
                            <Eye className="h-3.5 w-3.5" />
                          </Button>
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        {(posts?.length ?? 0) > PAGE_SIZE && (
          <div className="flex items-center justify-between px-4 py-3 border-t border-border">
            <p className="text-xs text-muted-foreground">
              Page {page} of {totalPages} · {posts?.length} posts
            </p>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                disabled={page <= 1}
                onClick={() => setPage((p) => p - 1)}
              >
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                disabled={page >= totalPages}
                onClick={() => setPage((p) => p + 1)}
              >
                Next
              </Button>
            </div>
          </div>
        )}
        {isFetching && !isLoading && (
          <div className="px-4 py-2 text-xs text-muted-foreground border-t border-border">
            Updating…
          </div>
        )}
      </div>
    </div>
  );
};

export default Posts;
