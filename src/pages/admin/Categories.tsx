import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Plus, Trash2, Edit2, Check, X } from "lucide-react";
import { generateSlug } from "@/lib/blog-utils";

const Categories = () => {
const [newName, setNewName] = useState("");
const [editNames, setEditNames] = useState<Record<string, string>>({});
  const queryClient = useQueryClient();

const { data: categories, isLoading } = useQuery({
    queryKey: ["admin-categories"],
    queryFn: async () => {
      const { data } = await supabase.from("categories").select("*").or("is_deleted.is.null,is_deleted.eq.false").order("name");
      return data ?? [];
    },
  });

  const createMutation = useMutation({
    mutationFn: async () => {
      const { error } = await supabase.from("categories").insert({ name: newName, slug: generateSlug(newName) });
      if (error) throw error;
    },
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["admin-categories"] }); setNewName(""); toast.success("Category created"); },
    onError: (e: any) => toast.error(e.message),
  });

 const updateMutation = useMutation({
    mutationFn: async ({ id, name }: { id: string; name: string }) => {
      const { error } = await supabase.from("categories").update({ name, slug: generateSlug(name) }).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["admin-categories"] }); toast.success("Updated"); },
    onError: (e: any) => toast.error(e.message),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("categories").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["admin-categories"] }); toast.success("Deleted"); },
    onError: (e: any) => toast.error(e.message),
  });

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Categories</h1>
        <p className="text-muted-foreground text-sm mt-1">Organize your blog posts</p>
      </div>
<div className="bg-card border border-border rounded-xl divide-y divide-border">
        {/* Inline create row */}
        <div className="flex items-center gap-2 px-4 py-3">
          <Input
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder="New category name"
            className="h-8"
            onKeyDown={(e) => e.key === "Enter" && newName.trim() && createMutation.mutate()}
          />
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => createMutation.mutate()} disabled={!newName.trim() || createMutation.isPending}>
            <Plus className="h-3.5 w-3.5" />
          </Button>
        </div>

        {isLoading ? (
          <div className="p-4 text-center text-muted-foreground text-sm">Loading...</div>
        ) : categories?.length === 0 ? (
          <div className="p-4 text-center text-muted-foreground text-sm">No categories yet</div>
        ) : (
          categories?.map((cat) => (
            <div key={cat.id} className="flex items-center gap-2 px-4 py-3">
              <Input
                value={editNames[cat.id] ?? cat.name}
                onChange={(e) => setEditNames((prev) => ({ ...prev, [cat.id]: e.target.value }))}
                className="h-8 flex-1"
              />
              <Button
                variant="ghost" size="icon" className="h-8 w-8 text-green-500"
                onClick={() => updateMutation.mutate({ id: cat.id, name: editNames[cat.id] ?? cat.name })}
                disabled={updateMutation.isPending}
              >
                <Check className="h-3.5 w-3.5" />
              </Button>
              <Button
                variant="ghost" size="icon" className="h-8 w-8 text-destructive"
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
