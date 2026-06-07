import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Plus, Trash2, Check } from "lucide-react";
import { generateSlug } from "@/lib/blog-utils";
import { invalidateBlogCaches } from "@/lib/blog-cache";

const Categories = () => {
  const [newName, setNewName] = useState("");
  const [search, setSearch] = useState("");
  const [editNames, setEditNames] = useState<Record<string, string>>({});
  const queryClient = useQueryClient();

  const { data: categories, isLoading } = useQuery({
    queryKey: ["admin-categories"],
    queryFn: async () => {
      const { data } = await supabase
        .from("categories")
        .select("*")
        .or("is_deleted.is.null,is_deleted.eq.false")
        .order("name");
      return data ?? [];
    },
    staleTime: 30_000,
  });

  const filteredCategories = categories?.filter((cat) =>
    cat.name.toLowerCase().includes(search.toLowerCase())
  );

  const createMutation = useMutation({
    mutationFn: async (name: string) => {
      const slug = generateSlug(name);
      const { data: existing } = await supabase
        .from("categories")
        .select("id")
        .eq("slug", slug)
        .maybeSingle();

      if (existing) {
        const { error } = await supabase
          .from("categories")
          .update({ is_deleted: false, name })
          .eq("id", existing.id);
        if (error) throw error;
        return;
      }

      const { error } = await supabase.from("categories").insert({ name, slug });
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-categories"] });
      setNewName("");
      toast.success("Category created");
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, name, currentName }: { id: string; name: string; currentName: string }) => {
      if (name.trim() === currentName.trim()) return;
      const { error } = await supabase
        .from("categories")
        .update({ name: name.trim(), slug: generateSlug(name) })
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: (_, { id }) => {
      setEditNames((prev) => {
        const next = { ...prev };
        delete next[id];
        return next;
      });
      queryClient.invalidateQueries({ queryKey: ["admin-categories"] });
      toast.success("Category updated");
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const deleteMutation = useMutation({
    mutationFn: async (catId: string) => {
      const { error } = await supabase
        .from("categories")
        .update({ is_deleted: true })
        .eq("id", catId);
      if (error) throw error;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["admin-categories"] });
      await invalidateBlogCaches(queryClient);
      toast.success("Category deleted");
    },
    onError: (e: Error) => toast.error(e.message),
  });

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Categories</h1>
        <p className="text-muted-foreground text-sm mt-1">Organize your blog posts</p>
      </div>

      <Input
        placeholder="Search categories..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="max-w-sm"
      />

      <div className="bg-card border border-border rounded-xl divide-y divide-border">
        <div className="flex items-center gap-2 px-4 py-3">
          <Input
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder="New category name"
            className="h-8"
            onKeyDown={(e) => e.key === "Enter" && newName.trim() && createMutation.mutate(newName.trim())}
          />
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => createMutation.mutate(newName.trim())}
            disabled={!newName.trim() || createMutation.isPending}
          >
            <Plus className="h-3.5 w-3.5" />
          </Button>
        </div>

        {isLoading ? (
          <div className="p-4 text-center text-muted-foreground text-sm">Loading categories…</div>
        ) : filteredCategories?.length === 0 ? (
          <div className="p-4 text-center text-muted-foreground text-sm">
            {search ? "No categories match your search" : "No categories yet"}
          </div>
        ) : (
          filteredCategories?.map((cat) => (
            <div key={cat.id} className="flex items-center gap-2 px-4 py-3">
              <Input
                value={editNames[cat.id] ?? cat.name}
                onChange={(e) => setEditNames((prev) => ({ ...prev, [cat.id]: e.target.value }))}
                className="h-8 flex-1"
              />
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-green-500"
                onClick={() => updateMutation.mutate({ id: cat.id, name: editNames[cat.id] ?? cat.name, currentName: cat.name })}
                disabled={updateMutation.isPending}
              >
                <Check className="h-3.5 w-3.5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-destructive"
                onClick={() => deleteMutation.mutate(cat.id)}
                disabled={deleteMutation.isPending}
              >
                <Trash2 className="h-3.5 w-3.5" />
              </Button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Categories;
