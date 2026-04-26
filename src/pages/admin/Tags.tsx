import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Plus, Trash2, Edit2, Check, X } from "lucide-react";
import { generateSlug } from "@/lib/blog-utils";

const TagsPage = () => {
  const [newName, setNewName] = useState("");
  const [editNames, setEditNames] = useState<Record<string, string>>({});
  const queryClient = useQueryClient();

   const { data: tags, isLoading } = useQuery({
    queryKey: ["admin-tags"],
    queryFn: async () => {
      const { data } = await supabase.from("tags").select("*").or("is_deleted.is.null,is_deleted.eq.false").order("name");
      return data ?? [];
    },
  });
  const createMutation = useMutation({
    mutationFn: async () => {
      const { error } = await supabase.from("tags").insert({ name: newName, slug: generateSlug(newName) });
      if (error) throw error;
    },
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["admin-tags"] }); setNewName(""); toast.success("Tag created"); },
    onError: (e: any) => toast.error(e.message),
  });

const updateMutation = useMutation({
    mutationFn: async ({ id, name }: { id: string; name: string }) => {
      const { error } = await supabase.from("tags").update({ name, slug: generateSlug(name) }).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["admin-tags"] }); toast.success("Updated"); },
    onError: (e: any) => toast.error(e.message),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("tags").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["admin-tags"] }); toast.success("Deleted"); },
    onError: (e: any) => toast.error(e.message),
  });

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Tags</h1>
        <p className="text-muted-foreground text-sm mt-1">Label and organize content</p>
      </div>

     <div className="bg-card border border-border rounded-xl divide-y divide-border">
        {/* Inline create row */}
        <div className="flex items-center gap-2 px-4 py-3">
          <Input
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder="New tag name"
            className="h-8"
            onKeyDown={(e) => e.key === "Enter" && newName.trim() && createMutation.mutate()}
          />
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => createMutation.mutate()} disabled={!newName.trim() || createMutation.isPending}>
            <Plus className="h-3.5 w-3.5" />
          </Button>
        </div>

        {isLoading ? (
          <div className="p-4 text-center text-muted-foreground text-sm">Loading...</div>
        ) : tags?.length === 0 ? (
          <div className="p-4 text-center text-muted-foreground text-sm">No tags yet</div>
        ) : (
          tags?.map((tag) => (
            <div key={tag.id} className="flex items-center gap-2 px-4 py-3">
              <Input
                value={editNames[tag.id] ?? tag.name}
                onChange={(e) => setEditNames((prev) => ({ ...prev, [tag.id]: e.target.value }))}
                className="h-8 flex-1"
              />
              <Button
                variant="ghost" size="icon" className="h-8 w-8 text-green-500"
                onClick={() => updateMutation.mutate({ id: tag.id, name: editNames[tag.id] ?? tag.name })}
                disabled={updateMutation.isPending}
              >
                <Check className="h-3.5 w-3.5" />
              </Button>
              <Button
                variant="ghost" size="icon" className="h-8 w-8 text-destructive"
                onClick={() => deleteMutation.mutate(tag.id)}
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

export default TagsPage;
