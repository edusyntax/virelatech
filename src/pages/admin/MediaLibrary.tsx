import { useState, useCallback } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Upload, Trash2, Copy, Search } from "lucide-react";

const MediaLibrary = () => {
  const [search, setSearch] = useState("");
  const queryClient = useQueryClient();
  const { user } = useAuth();

  const { data: media, isLoading } = useQuery({
    queryKey: ["admin-media", search],
    queryFn: async () => {
      let query = supabase.from("media").select("*").order("created_at", { ascending: false });
      if (search) query = query.ilike("filename", `%${search}%`);
      const { data } = await query;
      return data ?? [];
    },
  });

  const uploadMutation = useMutation({
    mutationFn: async (file: File) => {
      const ext = file.name.split(".").pop();
      const path = `library/${Date.now()}.${ext}`;
      const { data, error } = await supabase.storage.from("blog-media").upload(path, file);
      if (error) throw error;
      const { data: urlData } = supabase.storage.from("blog-media").getPublicUrl(data.path);
      await supabase.from("media").insert({
        url: urlData.publicUrl,
        filename: file.name,
        mime_type: file.type,
        size_bytes: file.size,
        uploaded_by: user?.id,
      });
    },
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["admin-media"] }); toast.success("Uploaded"); },
    onError: () => toast.error("Upload failed"),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("media").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["admin-media"] }); toast.success("Deleted"); },
  });

  const handleUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    Array.from(files).forEach((f) => uploadMutation.mutate(f));
    e.target.value = "";
  }, [uploadMutation]);

  const copyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    toast.success("URL copied");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Media Library</h1>
          <p className="text-muted-foreground text-sm mt-1">Upload and manage images</p>
        </div>
        <label>
          <input type="file" accept="image/*" multiple onChange={handleUpload} className="hidden" />
          <Button asChild className="cursor-pointer gap-2">
            <span><Upload className="h-4 w-4" /> Upload</span>
          </Button>
        </label>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search media..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10" />
      </div>

      {isLoading ? (
        <div className="text-center py-8 text-muted-foreground text-sm">Loading...</div>
      ) : media?.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          <Upload className="h-10 w-10 mx-auto mb-3 opacity-50" />
          <p>No media files yet. Upload your first image.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {media?.map((item) => (
            <div key={item.id} className="group relative bg-card border border-border rounded-lg overflow-hidden">
              <div className="aspect-square">
                <img src={item.url} alt={item.alt_text || item.filename} className="w-full h-full object-cover" />
              </div>
              <div className="absolute inset-0 bg-background/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => copyUrl(item.url)}>
                  <Copy className="h-3.5 w-3.5" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => deleteMutation.mutate(item.id)}>
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
              </div>
              <div className="px-2 py-1.5">
                <p className="text-[10px] text-muted-foreground truncate">{item.filename}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MediaLibrary;
