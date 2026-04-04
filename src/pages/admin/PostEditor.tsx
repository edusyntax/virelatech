import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import RichTextEditor from "@/components/admin/RichTextEditor";
import { generateSlug, calculateReadingTime, countWords, generateArticleJsonLd } from "@/lib/blog-utils";
import { ArrowLeft, Save, Send, Clock, Eye } from "lucide-react";
import BlogPostPreview from "@/components/admin/BlogPostPreview";
import type { Database } from "@/integrations/supabase/types";

type PostStatus = Database["public"]["Enums"]["post_status"];

const PostEditor = () => {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { user } = useAuth();

  // Form state
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [categoryId, setCategoryId] = useState<string>("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [status, setStatus] = useState<PostStatus>("draft");
  const [scheduledAt, setScheduledAt] = useState("");

  // SEO
  const [seoTitle, setSeoTitle] = useState("");
  const [seoDescription, setSeoDescription] = useState("");
  const [focusKeyword, setFocusKeyword] = useState("");
  const [canonicalUrl, setCanonicalUrl] = useState("");
  const [ogTitle, setOgTitle] = useState("");
  const [ogDescription, setOgDescription] = useState("");
  const [ogImage, setOgImage] = useState("");
  const [twitterTitle, setTwitterTitle] = useState("");
  const [twitterDescription, setTwitterDescription] = useState("");
  const [twitterImage, setTwitterImage] = useState("");

  // Geo SEO
  const [geoRegion, setGeoRegion] = useState("");
  const [geoCity, setGeoCity] = useState("");
  const [geoKeywords, setGeoKeywords] = useState("");

  // Slug auto-gen
  const [slugManual, setSlugManual] = useState(false);
  useEffect(() => {
    if (!slugManual && title) {
      setSlug(generateSlug(title));
    }
  }, [title, slugManual]);

  // Fetch existing post
  const { data: existingPost } = useQuery({
    queryKey: ["admin-post", id],
    enabled: isEdit,
    queryFn: async () => {
      const { data } = await supabase.from("posts").select("*").eq("id", id!).single();
      return data;
    },
  });

  // Fetch categories & tags
  const { data: categories } = useQuery({
    queryKey: ["admin-categories"],
    queryFn: async () => {
      const { data } = await supabase.from("categories").select("*").order("name");
      return data ?? [];
    },
  });

  const { data: tags } = useQuery({
    queryKey: ["admin-tags"],
    queryFn: async () => {
      const { data } = await supabase.from("tags").select("*").order("name");
      return data ?? [];
    },
  });

  // Fetch post tags
  const { data: existingTags } = useQuery({
    queryKey: ["admin-post-tags", id],
    enabled: isEdit,
    queryFn: async () => {
      const { data } = await supabase.from("post_tags").select("tag_id").eq("post_id", id!);
      return data?.map((t) => t.tag_id) ?? [];
    },
  });

  // Populate form for edit
  useEffect(() => {
    if (existingPost) {
      setTitle(existingPost.title);
      setSlug(existingPost.slug);
      setSlugManual(true);
      setExcerpt(existingPost.excerpt ?? "");
      setContent(existingPost.content ?? "");
      setCoverImage(existingPost.cover_image ?? "");
      setCategoryId(existingPost.category_id ?? "");
      setStatus(existingPost.status);
      setScheduledAt(existingPost.scheduled_at ?? "");
      setSeoTitle(existingPost.seo_title ?? "");
      setSeoDescription(existingPost.seo_description ?? "");
      setFocusKeyword(existingPost.focus_keyword ?? "");
      setCanonicalUrl(existingPost.canonical_url ?? "");
      setOgTitle(existingPost.og_title ?? "");
      setOgDescription(existingPost.og_description ?? "");
      setOgImage(existingPost.og_image ?? "");
      setTwitterTitle(existingPost.twitter_title ?? "");
      setTwitterDescription(existingPost.twitter_description ?? "");
      setTwitterImage(existingPost.twitter_image ?? "");
      setGeoRegion(existingPost.geo_region ?? "");
      setGeoCity(existingPost.geo_city ?? "");
      setGeoKeywords(existingPost.geo_keywords ?? "");
    }
  }, [existingPost]);

  useEffect(() => {
    if (existingTags) setSelectedTags(existingTags);
  }, [existingTags]);

  const readingTime = calculateReadingTime(content);
  const wordCount = countWords(content);

  const jsonLd = generateArticleJsonLd({
    title: seoTitle || title,
    seo_description: seoDescription || excerpt,
    cover_image: ogImage || coverImage,
    published_at: existingPost?.published_at ?? undefined,
    updated_at: existingPost?.updated_at ?? undefined,
    slug,
  });

  const saveMutation = useMutation({
    mutationFn: async (targetStatus: PostStatus) => {
      const postData = {
        title,
        slug,
        excerpt,
        content,
        cover_image: coverImage || null,
        author_id: user?.id,
        status: targetStatus,
        published_at: targetStatus === "published" ? new Date().toISOString() : existingPost?.published_at,
        scheduled_at: targetStatus === "scheduled" ? scheduledAt : null,
        category_id: categoryId || null,
        seo_title: seoTitle || null,
        seo_description: seoDescription || null,
        focus_keyword: focusKeyword || null,
        canonical_url: canonicalUrl || null,
        og_title: ogTitle || null,
        og_description: ogDescription || null,
        og_image: ogImage || null,
        twitter_title: twitterTitle || null,
        twitter_description: twitterDescription || null,
        twitter_image: twitterImage || null,
        geo_region: geoRegion || null,
        geo_city: geoCity || null,
        geo_keywords: geoKeywords || null,
        reading_time_minutes: readingTime,
        word_count: wordCount,
        json_ld: jsonLd,
      };

      if (isEdit) {
        const { error } = await supabase.from("posts").update(postData).eq("id", id!);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("posts").insert(postData);
        if (error) throw error;
      }

      // Sync tags
      if (isEdit) {
        await supabase.from("post_tags").delete().eq("post_id", id!);
      }
      // For new posts we need the id
      if (!isEdit) {
        const { data: newPost } = await supabase.from("posts").select("id").eq("slug", slug).single();
        if (newPost && selectedTags.length > 0) {
          await supabase.from("post_tags").insert(
            selectedTags.map((tagId) => ({ post_id: newPost.id, tag_id: tagId }))
          );
        }
      } else if (selectedTags.length > 0) {
        await supabase.from("post_tags").insert(
          selectedTags.map((tagId) => ({ post_id: id!, tag_id: tagId }))
        );
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-posts"] });
      queryClient.invalidateQueries({ queryKey: ["admin-stats"] });
      toast.success(isEdit ? "Post updated" : "Post created");
      navigate("/admin/posts");
    },
    onError: (e: any) => toast.error(e.message || "Failed to save"),
  });

  const handleCoverUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const ext = file.name.split(".").pop();
    const path = `covers/${Date.now()}.${ext}`;
    const { data, error } = await supabase.storage.from("blog-media").upload(path, file);
    if (error) { toast.error("Upload failed"); return; }
    const { data: urlData } = supabase.storage.from("blog-media").getPublicUrl(data.path);
    setCoverImage(urlData.publicUrl);
  };

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => navigate("/admin/posts")}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-xl font-bold text-foreground">{isEdit ? "Edit Post" : "Create Post"}</h1>
            <p className="text-xs text-muted-foreground">{wordCount} words · {readingTime} min read</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => saveMutation.mutate("draft")} disabled={saveMutation.isPending}>
            <Save className="h-3.5 w-3.5 mr-1" /> Save Draft
          </Button>
          <Button variant="outline" size="sm" onClick={() => saveMutation.mutate("scheduled")} disabled={saveMutation.isPending || !scheduledAt}>
            <Clock className="h-3.5 w-3.5 mr-1" /> Schedule
          </Button>
          <Button size="sm" onClick={() => saveMutation.mutate("published")} disabled={saveMutation.isPending}>
            <Send className="h-3.5 w-3.5 mr-1" /> Publish
          </Button>
        </div>
      </div>

      <Tabs defaultValue="content" className="space-y-4">
        <TabsList>
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="preview"><Eye className="h-3.5 w-3.5 mr-1" />Preview</TabsTrigger>
          <TabsTrigger value="seo">SEO</TabsTrigger>
          <TabsTrigger value="social">Social</TabsTrigger>
          <TabsTrigger value="geo">Geo SEO</TabsTrigger>
          <TabsTrigger value="jsonld">JSON-LD</TabsTrigger>
        </TabsList>

        <TabsContent value="preview">
          <BlogPostPreview
            title={title}
            excerpt={excerpt}
            content={content}
            coverImage={coverImage}
            categoryName={categories?.find((c) => c.id === categoryId)?.name}
            authorName={user?.user_metadata?.full_name || user?.email || ""}
            authorAvatar={user?.user_metadata?.avatar_url}
            readingTime={readingTime}
            publishedAt={existingPost?.published_at ?? undefined}
          />
        </TabsContent>

        <TabsContent value="content" className="space-y-4">
          <div className="space-y-2">
            <Label>Title</Label>
            <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Post title" className="text-lg font-semibold" />
          </div>

          <div className="flex gap-2 items-end">
            <div className="flex-1 space-y-2">
              <Label>Slug</Label>
              <Input value={slug} onChange={(e) => { setSlug(e.target.value); setSlugManual(true); }} />
            </div>
            <Button variant="ghost" size="sm" onClick={() => { setSlugManual(false); setSlug(generateSlug(title)); }}>
              Auto
            </Button>
          </div>

          <div className="space-y-2">
            <Label>Excerpt</Label>
            <Textarea value={excerpt} onChange={(e) => setExcerpt(e.target.value)} placeholder="Brief summary..." rows={2} />
          </div>

          <div className="space-y-2">
            <Label>Cover Image</Label>
            <div className="flex gap-2 items-center">
              <Input type="file" accept="image/*" onChange={handleCoverUpload} className="flex-1" />
              {coverImage && <img src={coverImage} alt="cover" className="h-10 w-16 object-cover rounded" />}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Category</Label>
              <select
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
              >
                <option value="">No category</option>
                {categories?.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
            <div className="space-y-2">
              <Label>Schedule</Label>
              <Input type="datetime-local" value={scheduledAt} onChange={(e) => setScheduledAt(e.target.value)} />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Tags</Label>
            <div className="flex flex-wrap gap-2">
              {tags?.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setSelectedTags((prev) =>
                    prev.includes(t.id) ? prev.filter((x) => x !== t.id) : [...prev, t.id]
                  )}
                  className={`text-xs px-3 py-1 rounded-full border transition-colors ${
                    selectedTags.includes(t.id)
                      ? "bg-accent/20 border-accent text-accent"
                      : "border-border text-muted-foreground hover:border-foreground"
                  }`}
                >
                  {t.name}
                </button>
              ))}
              {tags?.length === 0 && <p className="text-xs text-muted-foreground">No tags yet. Create them in Tags management.</p>}
            </div>
          </div>

          <div className="space-y-2">
            <Label>Content</Label>
            <RichTextEditor content={content} onChange={setContent} />
          </div>
        </TabsContent>

        <TabsContent value="seo" className="space-y-4">
          <div className="bg-card border border-border rounded-xl p-5 space-y-4">
            <h3 className="font-semibold text-foreground">Search Engine Optimization</h3>
            <div className="space-y-2">
              <Label>SEO Title <span className="text-xs text-muted-foreground">({(seoTitle || title).length}/60)</span></Label>
              <Input value={seoTitle} onChange={(e) => setSeoTitle(e.target.value)} placeholder={title} />
            </div>
            <div className="space-y-2">
              <Label>Meta Description <span className="text-xs text-muted-foreground">({(seoDescription || excerpt).length}/160)</span></Label>
              <Textarea value={seoDescription} onChange={(e) => setSeoDescription(e.target.value)} placeholder={excerpt} rows={3} />
            </div>
            <div className="space-y-2">
              <Label>Focus Keyword</Label>
              <Input value={focusKeyword} onChange={(e) => setFocusKeyword(e.target.value)} placeholder="e.g. digital marketing" />
            </div>
            <div className="space-y-2">
              <Label>Canonical URL</Label>
              <Input value={canonicalUrl} onChange={(e) => setCanonicalUrl(e.target.value)} placeholder="https://..." />
            </div>

            {/* Preview */}
            <div className="mt-4 p-4 bg-muted/30 rounded-lg">
              <p className="text-xs text-muted-foreground mb-2">Google Preview</p>
              <p className="text-blue-500 text-sm font-medium truncate">{seoTitle || title || "Post Title"}</p>
              <p className="text-green-700 text-xs">VirelaTech.com/blog/{slug}</p>
              <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{seoDescription || excerpt || "Meta description..."}</p>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="social" className="space-y-4">
          <div className="bg-card border border-border rounded-xl p-5 space-y-4">
            <h3 className="font-semibold text-foreground">Open Graph (Facebook/LinkedIn)</h3>
            <div className="space-y-2">
              <Label>OG Title</Label>
              <Input value={ogTitle} onChange={(e) => setOgTitle(e.target.value)} placeholder={seoTitle || title} />
            </div>
            <div className="space-y-2">
              <Label>OG Description</Label>
              <Textarea value={ogDescription} onChange={(e) => setOgDescription(e.target.value)} rows={2} />
            </div>
            <div className="space-y-2">
              <Label>OG Image URL</Label>
              <Input value={ogImage} onChange={(e) => setOgImage(e.target.value)} placeholder={coverImage} />
            </div>
          </div>

          <div className="bg-card border border-border rounded-xl p-5 space-y-4">
            <h3 className="font-semibold text-foreground">Twitter Card</h3>
            <div className="space-y-2">
              <Label>Twitter Title</Label>
              <Input value={twitterTitle} onChange={(e) => setTwitterTitle(e.target.value)} placeholder={ogTitle || title} />
            </div>
            <div className="space-y-2">
              <Label>Twitter Description</Label>
              <Textarea value={twitterDescription} onChange={(e) => setTwitterDescription(e.target.value)} rows={2} />
            </div>
            <div className="space-y-2">
              <Label>Twitter Image URL</Label>
              <Input value={twitterImage} onChange={(e) => setTwitterImage(e.target.value)} />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="geo" className="space-y-4">
          <div className="bg-card border border-border rounded-xl p-5 space-y-4">
            <h3 className="font-semibold text-foreground">Geo-Targeted SEO</h3>
            <div className="space-y-2">
              <Label>Region</Label>
              <Input value={geoRegion} onChange={(e) => setGeoRegion(e.target.value)} placeholder="e.g. US-CA" />
            </div>
            <div className="space-y-2">
              <Label>City</Label>
              <Input value={geoCity} onChange={(e) => setGeoCity(e.target.value)} placeholder="e.g. San Francisco" />
            </div>
            <div className="space-y-2">
              <Label>Geo Keywords</Label>
              <Input value={geoKeywords} onChange={(e) => setGeoKeywords(e.target.value)} placeholder="e.g. seo agency san francisco" />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="jsonld" className="space-y-4">
          <div className="bg-card border border-border rounded-xl p-5 space-y-4">
            <h3 className="font-semibold text-foreground">Structured Data Preview (JSON-LD)</h3>
            <pre className="bg-muted/50 p-4 rounded-lg overflow-auto text-xs text-foreground max-h-96">
              {JSON.stringify(jsonLd, null, 2)}
            </pre>
            <p className="text-xs text-muted-foreground">This JSON-LD will be automatically injected into the blog post page.</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PostEditor;
