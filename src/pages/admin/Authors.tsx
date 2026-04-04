import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";

const Authors = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: profiles, isLoading } = useQuery({
    queryKey: ["admin-authors"],
    queryFn: async () => {
      const { data } = await supabase
        .from("profiles")
        .select("*, user_roles(role)")
        .order("created_at", { ascending: false });
      return data ?? [];
    },
  });

  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState({ display_name: "", bio: "", website: "", twitter_handle: "", linkedin_url: "" });

  const updateMutation = useMutation({
    mutationFn: async () => {
      const { error } = await supabase.from("profiles").update(form).eq("id", editId!);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-authors"] });
      setEditId(null);
      toast.success("Profile updated");
    },
    onError: (e: any) => toast.error(e.message),
  });

  const startEdit = (profile: any) => {
    setEditId(profile.id);
    setForm({
      display_name: profile.display_name || "",
      bio: profile.bio || "",
      website: profile.website || "",
      twitter_handle: profile.twitter_handle || "",
      linkedin_url: profile.linkedin_url || "",
    });
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Authors</h1>
        <p className="text-muted-foreground text-sm mt-1">Manage author profiles</p>
      </div>

      {isLoading ? (
        <div className="text-center py-8 text-muted-foreground text-sm">Loading...</div>
      ) : (
        <div className="space-y-4">
          {profiles?.map((profile) => (
            <div key={profile.id} className="bg-card border border-border rounded-xl p-5">
              {editId === profile.id ? (
                <div className="space-y-3">
                  <div className="space-y-1">
                    <Label>Display Name</Label>
                    <Input value={form.display_name} onChange={(e) => setForm({ ...form, display_name: e.target.value })} />
                  </div>
                  <div className="space-y-1">
                    <Label>Bio</Label>
                    <Textarea value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} rows={3} />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div className="space-y-1">
                      <Label>Website</Label>
                      <Input value={form.website} onChange={(e) => setForm({ ...form, website: e.target.value })} />
                    </div>
                    <div className="space-y-1">
                      <Label>Twitter</Label>
                      <Input value={form.twitter_handle} onChange={(e) => setForm({ ...form, twitter_handle: e.target.value })} placeholder="@handle" />
                    </div>
                    <div className="space-y-1">
                      <Label>LinkedIn</Label>
                      <Input value={form.linkedin_url} onChange={(e) => setForm({ ...form, linkedin_url: e.target.value })} />
                    </div>
                  </div>
                  <div className="flex gap-2 pt-2">
                    <Button size="sm" onClick={() => updateMutation.mutate()} disabled={updateMutation.isPending}>Save</Button>
                    <Button variant="outline" size="sm" onClick={() => setEditId(null)}>Cancel</Button>
                  </div>
                </div>
              ) : (
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    {profile.avatar_url ? (
                      <img src={profile.avatar_url} className="h-10 w-10 rounded-full object-cover" alt="" />
                    ) : (
                      <div className="h-10 w-10 rounded-full bg-accent/20 flex items-center justify-center text-accent font-bold text-sm">
                        {profile.display_name?.charAt(0)?.toUpperCase() || "?"}
                      </div>
                    )}
                    <div>
                      <p className="text-sm font-medium text-foreground">{profile.display_name || "Unnamed"}</p>
                      <p className="text-xs text-muted-foreground">{profile.bio ? profile.bio.slice(0, 80) + "..." : "No bio"}</p>
                      <div className="flex gap-2 mt-1">
                        {(profile as any).user_roles?.map((r: any) => (
                          <span key={r.role} className="text-[10px] px-2 py-0.5 rounded-full bg-accent/10 text-accent uppercase tracking-wider">
                            {r.role}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  {(profile.user_id === user?.id) && (
                    <Button variant="outline" size="sm" onClick={() => startEdit(profile)}>
                      Edit
                    </Button>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Authors;
