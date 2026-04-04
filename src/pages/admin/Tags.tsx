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
  const [editId, setEditId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const queryClient = useQueryClient();

  const { data: tags, isLoading } = useQuery({
    queryKey: ["admin-tags"],
    queryFn: async () => {
      const { data } = await supabase.from("tags").select("*").order("name");
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
    mutationFn: async () => {
      const { error } = await supabase.from("tags").update({ name: editName, slug: generateSlug(editName) }).eq("id", editId!);
      if (error) throw error;
    },
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["admin-tags"] }); setEditId(null); toast.success("Updated"); },
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

      <div className="flex gap-2">
        <Input value={newName} onChange={(e) => setNewName(e.target.value)} placeholder="New tag name" onKeyDown={(e) => e.key === "Enter" && newName && createMutation.mutate()} />
        <Button onClick={() => createMutation.mutate()} disabled={!newName || createMutation.isPending}>
          <Plus className="h-4 w-4 mr-1" /> Add
        </Button>
      </div>

      <div className="bg-card border border-border rounded-xl divide-y divide-border">
        {isLoading ? (
          <div className="p-4 text-center text-muted-foreground text-sm">Loading...</div>
        ) : tags?.length === 0 ? (
          <div className="p-4 text-center text-muted-foreground text-sm">No tags yet</div>
        ) : (
          tags?.map((tag) => (
            <div key={tag.id} className="flex items-center justify-between px-4 py-3">
              {editId === tag.id ? (
                <div className="flex items-center gap-2 flex-1">
                  <Input value={editName} onChange={(e) => setEditName(e.target.value)} className="h-8" autoFocus />
                  <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => updateMutation.mutate()}>
                    <Check className="h-3.5 w-3.5 text-green-500" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setEditId(null)}>
                    <X className="h-3.5 w-3.5" />
                  </Button>
                </div>
              ) : (
                <>
                  <div>
                    <p className="text-sm font-medium text-foreground">{tag.name}</p>
                    <p className="text-xs text-muted-foreground">/{tag.slug}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => { setEditId(tag.id); setEditName(tag.name); }}>
                      <Edit2 className="h-3.5 w-3.5" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => deleteMutation.mutate(tag.id)}>
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TagsPage;
