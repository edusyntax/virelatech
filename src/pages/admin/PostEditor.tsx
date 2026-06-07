import { useState, useEffect, useRef, useCallback, useMemo } from "react";
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
import { invalidateBlogCaches } from "@/lib/blog-cache";
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
 const [newCategory, setNewCategory] = useState("");
const [editCategoryId, setEditCategoryId] = useState<string | null>(null);
const [editCategoryName, setEditCategoryName] = useState("");
const [featureStatus, setFeatureStatus] = useState<"none" | "featured" | "upcoming">("none");

const [newTag, setNewTag] = useState("");
const [editTagId, setEditTagId] = useState<string | null>(null);
const [editTagName, setEditTagName] = useState("");

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

  const LOCAL_DRAFT_KEY = isEdit ? `post-editor-draft-${id}` : "post-editor-draft";
  const [activeTab, setActiveTab] = useState("content");
  const formInitializedRef = useRef(false);
  const tagsInitializedRef = useRef(false);
  const draftReadyRef = useRef(isEdit);

  useEffect(() => {
    formInitializedRef.current = false;
    tagsInitializedRef.current = false;
  }, [id]);
  const isDirtyRef = useRef(false);
  const lastSavedSnapshotRef = useRef<string>("");

  // Restore local draft on create (runs once before autosave)
  useEffect(() => {
    if (isEdit) {
      draftReadyRef.current = true;
      return;
    }

    const saved = localStorage.getItem(LOCAL_DRAFT_KEY);
    if (saved) {
      try {
        const d = JSON.parse(saved);
        setTitle(d.title || "");
        setSlug(d.slug || "");
        setExcerpt(d.excerpt || "");
        setContent(d.content || "");
        setCoverImage(d.coverImage || "");
        setCategoryId(d.categoryId || "");
        setSelectedTags(d.selectedTags || []);
        setSeoTitle(d.seoTitle || "");
        setSeoDescription(d.seoDescription || "");
        setFocusKeyword(d.focusKeyword || "");
        setCanonicalUrl(d.canonicalUrl || "");
        setOgTitle(d.ogTitle || "");
        setOgDescription(d.ogDescription || "");
        setOgImage(d.ogImage || "");
        setTwitterTitle(d.twitterTitle || "");
        setTwitterDescription(d.twitterDescription || "");
        setTwitterImage(d.twitterImage || "");
        setGeoRegion(d.geoRegion || "");
        setGeoCity(d.geoCity || "");
        setGeoKeywords(d.geoKeywords || "");
        setScheduledAt(d.scheduledAt || "");
        setFeatureStatus(d.featureStatus || "none");
        toast.info("Restored unsaved draft");
      } catch { /* ignore corrupt draft */ }
    }

    draftReadyRef.current = true;
  }, [isEdit]);

  const buildFormSnapshot = useCallback(() => JSON.stringify({
    title, slug, excerpt, content, coverImage, categoryId, selectedTags,
    scheduledAt, featureStatus, seoTitle, seoDescription, focusKeyword,
    canonicalUrl, ogTitle, ogDescription, ogImage,
    twitterTitle, twitterDescription, twitterImage,
    geoRegion, geoCity, geoKeywords,
  }), [
    title, slug, excerpt, content, coverImage, categoryId, selectedTags,
    scheduledAt, featureStatus, seoTitle, seoDescription, focusKeyword,
    canonicalUrl, ogTitle, ogDescription, ogImage,
    twitterTitle, twitterDescription, twitterImage,
    geoRegion, geoCity, geoKeywords,
  ]);

  // Debounced local autosave (create + edit backup)
  useEffect(() => {
    if (!draftReadyRef.current) return;
    if (isEdit && !formInitializedRef.current) return;

    const draft = {
      title, slug, excerpt, content, coverImage, categoryId, selectedTags,
      seoTitle, seoDescription, focusKeyword, canonicalUrl,
      ogTitle, ogDescription, ogImage,
      twitterTitle, twitterDescription, twitterImage,
      geoRegion, geoCity, geoKeywords, scheduledAt, featureStatus,
      savedAt: Date.now(),
    };

    const timer = setTimeout(() => {
      localStorage.setItem(LOCAL_DRAFT_KEY, JSON.stringify(draft));
    }, 1000);

    return () => clearTimeout(timer);
  }, [
    LOCAL_DRAFT_KEY, title, slug, excerpt, content, coverImage, categoryId, selectedTags,
    seoTitle, seoDescription, focusKeyword, canonicalUrl,
    ogTitle, ogDescription, ogImage,
    twitterTitle, twitterDescription, twitterImage,
    geoRegion, geoCity, geoKeywords, scheduledAt, featureStatus, isEdit,
  ]);

  const markDirty = useCallback(() => {
    isDirtyRef.current = true;
  }, []);

const createCategory = useMutation({
  mutationFn: async (name: string) => {
    const catSlug = generateSlug(name);

    const { data: existing } = await supabase
      .from("categories")
      .select("id")
      .eq("slug", catSlug)
      .maybeSingle();

    if (existing) {
      const { error } = await supabase
        .from("categories")
        .update({ is_deleted: false, name })
        .eq("id", existing.id);
      if (error) throw error;
      return existing.id;
    }

    const { data, error } = await supabase
      .from("categories")
      .insert({ name, slug: catSlug })
      .select("id")
      .single();

    if (error) throw error;
    return data.id;
  },
  onSuccess: (categoryId) => {
    markDirty();
    setNewCategory("");
    setCategoryId(categoryId);
    queryClient.invalidateQueries({ queryKey: ["admin-categories"] });
    toast.success("Category added");
  },
  onError: (e: Error) => toast.error(e.message || "Failed to create category"),
});

const updateCategory = useMutation({
  mutationFn: async ({ id, name }: { id: string; name: string }) => {
    const { error } = await supabase
      .from("categories")
      .update({ name, slug: generateSlug(name) })
      .eq("id", id);

    if (error) throw error;
  },
  onSuccess: (_, { id }) => {
    setEditCategoryId((prev) => (prev === id ? null : prev));
    queryClient.invalidateQueries({ queryKey: ["admin-categories"] });
    toast.success("Category updated");
  },
  onError: (e: Error) => toast.error(e.message || "Failed to update category"),
});

const deleteCategory = useMutation({
  mutationFn: async (catId: string) => {
    const { error } = await supabase
      .from("categories")
      .update({ is_deleted: true })
      .eq("id", catId);

    if (error) throw error;
  },
  onSuccess: (_, catId) => {
    setCategoryId((prev) => (prev === catId ? "" : prev));
    queryClient.invalidateQueries({ queryKey: ["admin-categories"] });
    toast.success("Category deleted");
  },
  onError: (e: Error) => toast.error(e.message || "Failed to delete category"),
});



const createTag = useMutation({
  mutationFn: async (name: string) => {
    const tagSlug = generateSlug(name);

    const { data: existing } = await supabase
      .from("tags")
      .select("id")
      .eq("slug", tagSlug)
      .maybeSingle();

    if (existing) {
      const { error } = await supabase
        .from("tags")
        .update({ is_deleted: false, name })
        .eq("id", existing.id);
      if (error) throw error;
      return existing.id;
    }

    const { data, error } = await supabase
      .from("tags")
      .insert({ name, slug: tagSlug })
      .select("id")
      .single();

    if (error) throw error;
    return data.id;
  },
  onSuccess: (tagId) => {
    markDirty();
    setNewTag("");
    setSelectedTags((prev) => (prev.includes(tagId) ? prev : [...prev, tagId]));
    queryClient.invalidateQueries({ queryKey: ["admin-tags"] });
    toast.success("Tag added");
  },
  onError: (e: Error) => toast.error(e.message || "Failed to create tag"),
});

const updateTag = useMutation({
  mutationFn: async ({ id, name }: { id: string; name: string }) => {
    const { error } = await supabase
      .from("tags")
      .update({ name, slug: generateSlug(name) })
      .eq("id", id);

    if (error) throw error;
  },
  onSuccess: (_, { id }) => {
    setEditTagId((prev) => (prev === id ? null : prev));
    queryClient.invalidateQueries({ queryKey: ["admin-tags"] });
    toast.success("Tag updated");
  },
  onError: (e: Error) => toast.error(e.message || "Failed to update tag"),
});

const deleteTag = useMutation({
  mutationFn: async (tagId: string) => {
    const { error } = await supabase
      .from("tags")
      .update({ is_deleted: true })
      .eq("id", tagId);

    if (error) throw error;
  },
  onSuccess: (_, tagId) => {
    setSelectedTags((prev) => prev.filter((t) => t !== tagId));
    queryClient.invalidateQueries({ queryKey: ["admin-tags"] });
    toast.success("Tag deleted");
  },
  onError: (e: Error) => toast.error(e.message || "Failed to delete tag"),
});



  // Slug auto-gen
  const [slugManual, setSlugManual] = useState(false);
  useEffect(() => {
    if (!slugManual && title) {
      setSlug(generateSlug(title));
    }
  }, [title, slugManual]);


  useEffect(() => {
    const handler = (e: BeforeUnloadEvent) => {
      const hasContent = Boolean(title.trim() || content.replace(/<[^>]*>/g, "").trim());
      if (!hasContent) return;
      if (isEdit && !isDirtyRef.current) return;

      e.preventDefault();
      e.returnValue = "";
    };

    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [title, content, isEdit]);

  // Fetch existing post
  const { data: existingPost, isLoading: isLoadingPost } = useQuery({
    queryKey: ["admin-post", id],
    enabled: isEdit,
    queryFn: async () => {
      const { data, error } = await supabase.from("posts").select("*").eq("id", id!).single();
      if (error) throw error;
      return data;
    },
    staleTime: 30_000,
  });

  // Fetch categories & tags
 const { data: categories } = useQuery({
    queryKey: ["admin-categories"],
    queryFn: async () => {
      const { data } = await supabase.from("categories").select("*").or("is_deleted.is.null,is_deleted.eq.false").order("name");
      return data ?? [];
    },
    staleTime: 60_000,
  });

  const { data: tags } = useQuery({
    queryKey: ["admin-tags"],
    queryFn: async () => {
      const { data } = await supabase.from("tags").select("*").or("is_deleted.is.null,is_deleted.eq.false").order("name");
      return data ?? [];
    },
    staleTime: 60_000,
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

  // Populate form for edit (once per post load)
  useEffect(() => {
    if (!existingPost || formInitializedRef.current) return;

    formInitializedRef.current = true;
    setTitle(existingPost.title);
    setSlug(existingPost.slug);
    setSlugManual(true);
    setExcerpt(existingPost.excerpt ?? "");
    setContent(existingPost.content ?? "");
    setCoverImage(existingPost.cover_image ?? "");
    setCategoryId(existingPost.category_id ?? "");
    setStatus(existingPost.status);
    setScheduledAt(existingPost.scheduled_at ? existingPost.scheduled_at.slice(0, 16) : "");
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
    setFeatureStatus(existingPost.feature_status ?? "none");

    const serverSnapshot = JSON.stringify({
      title: existingPost.title,
      slug: existingPost.slug,
      excerpt: existingPost.excerpt ?? "",
      content: existingPost.content ?? "",
      coverImage: existingPost.cover_image ?? "",
      categoryId: existingPost.category_id ?? "",
      selectedTags: [],
      scheduledAt: existingPost.scheduled_at ? existingPost.scheduled_at.slice(0, 16) : "",
      featureStatus: existingPost.feature_status ?? "none",
      seoTitle: existingPost.seo_title ?? "",
      seoDescription: existingPost.seo_description ?? "",
      focusKeyword: existingPost.focus_keyword ?? "",
      canonicalUrl: existingPost.canonical_url ?? "",
      ogTitle: existingPost.og_title ?? "",
      ogDescription: existingPost.og_description ?? "",
      ogImage: existingPost.og_image ?? "",
      twitterTitle: existingPost.twitter_title ?? "",
      twitterDescription: existingPost.twitter_description ?? "",
      twitterImage: existingPost.twitter_image ?? "",
      geoRegion: existingPost.geo_region ?? "",
      geoCity: existingPost.geo_city ?? "",
      geoKeywords: existingPost.geo_keywords ?? "",
    });
    lastSavedSnapshotRef.current = serverSnapshot;

    const localDraft = localStorage.getItem(LOCAL_DRAFT_KEY);
    if (localDraft) {
      try {
        const d = JSON.parse(localDraft);
        const draftContent = d.content ?? "";
        const serverContent = existingPost.content ?? "";
        if (draftContent && draftContent !== serverContent && (d.savedAt ?? 0) > Date.parse(existingPost.updated_at ?? existingPost.created_at)) {
          toast.info("Restored unsaved local changes", {
            action: {
              label: "Discard",
              onClick: () => {
                localStorage.removeItem(LOCAL_DRAFT_KEY);
                setContent(serverContent);
              },
            },
          });
          setTitle(d.title ?? existingPost.title);
          setSlug(d.slug ?? existingPost.slug);
          setExcerpt(d.excerpt ?? existingPost.excerpt ?? "");
          setContent(draftContent);
          setCoverImage(d.coverImage ?? existingPost.cover_image ?? "");
          setCategoryId(d.categoryId ?? existingPost.category_id ?? "");
          setSeoTitle(d.seoTitle ?? existingPost.seo_title ?? "");
          setSeoDescription(d.seoDescription ?? existingPost.seo_description ?? "");
          setFocusKeyword(d.focusKeyword ?? existingPost.focus_keyword ?? "");
          setCanonicalUrl(d.canonicalUrl ?? existingPost.canonical_url ?? "");
          setOgTitle(d.ogTitle ?? existingPost.og_title ?? "");
          setOgDescription(d.ogDescription ?? existingPost.og_description ?? "");
          setOgImage(d.ogImage ?? existingPost.og_image ?? "");
          setTwitterTitle(d.twitterTitle ?? existingPost.twitter_title ?? "");
          setTwitterDescription(d.twitterDescription ?? existingPost.twitter_description ?? "");
          setTwitterImage(d.twitterImage ?? existingPost.twitter_image ?? "");
          setGeoRegion(d.geoRegion ?? existingPost.geo_region ?? "");
          setGeoCity(d.geoCity ?? existingPost.geo_city ?? "");
          setGeoKeywords(d.geoKeywords ?? existingPost.geo_keywords ?? "");
          setScheduledAt(d.scheduledAt ?? (existingPost.scheduled_at ? existingPost.scheduled_at.slice(0, 16) : ""));
          setFeatureStatus(d.featureStatus ?? existingPost.feature_status ?? "none");
        }
      } catch { /* ignore corrupt draft */ }
    }
  }, [existingPost, LOCAL_DRAFT_KEY]);

  useEffect(() => {
    if (!isEdit || existingTags === undefined || tagsInitializedRef.current) return;
    tagsInitializedRef.current = true;
    setSelectedTags(existingTags);
    if (formInitializedRef.current && lastSavedSnapshotRef.current) {
      try {
        const snapshot = JSON.parse(lastSavedSnapshotRef.current);
        snapshot.selectedTags = existingTags;
        lastSavedSnapshotRef.current = JSON.stringify(snapshot);
      } catch { /* ignore */ }
    }
  }, [existingTags, isEdit]);

  useEffect(() => {
    if (!tags) return;
    setSelectedTags((prev) => prev.filter((tagId) => tags.some((t) => t.id === tagId)));
  }, [tags]);

  const isContentEmpty = (html: string) => !html.replace(/<[^>]*>/g, "").trim();

  // Track unsaved changes for edit mode (debounced to avoid per-keystroke JSON.stringify)
  useEffect(() => {
    if (!isEdit || !formInitializedRef.current) return;
    const timer = setTimeout(() => {
      isDirtyRef.current = buildFormSnapshot() !== lastSavedSnapshotRef.current;
    }, 300);
    return () => clearTimeout(timer);
  }, [isEdit, buildFormSnapshot]);

  const readingTime = useMemo(() => calculateReadingTime(content), [content]);
  const wordCount = useMemo(() => countWords(content), [content]);

  const jsonLd = useMemo(() => generateArticleJsonLd({
    title: seoTitle || title,
    seo_description: seoDescription || excerpt,
    cover_image: ogImage || coverImage,
    published_at: existingPost?.published_at ?? undefined,
    updated_at: existingPost?.updated_at ?? undefined,
    slug,
  }), [seoTitle, title, seoDescription, excerpt, ogImage, coverImage, existingPost?.published_at, existingPost?.updated_at, slug]);

  const saveMutation = useMutation({
    mutationFn: async (targetStatus: PostStatus) => {
      if (!title.trim()) throw new Error("Title is required");
      if (!slug.trim()) throw new Error("Slug is required");
      if (isContentEmpty(content)) throw new Error("Content is required");
      if (targetStatus === "scheduled") {
        if (!scheduledAt) throw new Error("Please set a schedule date and time");
        if (new Date(scheduledAt) <= new Date()) throw new Error("Schedule date must be in the future");
      }

      if (featureStatus === "featured") {
        let query = supabase
          .from("posts")
          .select("id", { count: "exact", head: true })
          .eq("feature_status", "featured");
        if (isEdit) query = query.neq("id", id!);
        const { count } = await query;
        if ((count ?? 0) > 0) throw new Error("Only one post can be featured at a time");
      }

      if (featureStatus === "upcoming") {
        let query = supabase
          .from("posts")
          .select("id", { count: "exact", head: true })
          .eq("feature_status", "upcoming");
        if (isEdit) query = query.neq("id", id!);
        const { count } = await query;
        if ((count ?? 0) >= 3) throw new Error("Maximum of 3 upcoming posts allowed");
      }

      const publishedAt =
        targetStatus === "published"
          ? existingPost?.published_at ?? new Date().toISOString()
          : existingPost?.published_at ?? null;

      const postData = {
        title: title.trim(),
        slug: slug.trim(),
        excerpt: excerpt.trim() || null,
        content,
        cover_image: coverImage || null,
        author_id: user?.id,
        status: targetStatus,
        published_at: publishedAt,
        scheduled_at: targetStatus === "scheduled" ? new Date(scheduledAt).toISOString() : null,
        category_id: categoryId || null,
        seo_title: seoTitle.trim() || null,
        seo_description: seoDescription.trim() || null,
        focus_keyword: focusKeyword.trim() || null,
        canonical_url: canonicalUrl.trim() || null,
        og_title: ogTitle.trim() || null,
        og_description: ogDescription.trim() || null,
        og_image: ogImage.trim() || null,
        twitter_title: twitterTitle.trim() || null,
        twitter_description: twitterDescription.trim() || null,
        twitter_image: twitterImage.trim() || null,
        geo_region: geoRegion.trim() || null,
        geo_city: geoCity.trim() || null,
        geo_keywords: geoKeywords.trim() || null,
        reading_time_minutes: readingTime,
        feature_status: featureStatus,
        word_count: wordCount,
        json_ld: jsonLd,
      };

      let postId = id!;

      if (isEdit) {
        const { error } = await supabase.from("posts").update(postData).eq("id", id!);
        if (error) throw error;
      } else {
        const { data: newPost, error } = await supabase
          .from("posts")
          .insert(postData)
          .select("id")
          .single();
        if (error) throw error;
        postId = newPost.id;
      }

      await supabase.from("post_tags").delete().eq("post_id", postId);
      if (selectedTags.length > 0) {
        const { error: tagError } = await supabase.from("post_tags").insert(
          selectedTags.map((tagId) => ({ post_id: postId, tag_id: tagId }))
        );
        if (tagError) throw tagError;
      }

      return { postId, targetStatus, publishedAt };
    },
    onSuccess: async ({ postId, targetStatus, publishedAt }) => {
      isDirtyRef.current = false;
      localStorage.removeItem(LOCAL_DRAFT_KEY);
      lastSavedSnapshotRef.current = buildFormSnapshot();
      setStatus(targetStatus);

      const trimmedSlug = slug.trim();
      const listRow = {
        id: postId,
        title: title.trim(),
        slug: trimmedSlug,
        status: targetStatus,
        published_at: publishedAt,
        created_at: existingPost?.created_at ?? new Date().toISOString(),
        view_count: existingPost?.view_count ?? 0,
        reading_time_minutes: readingTime,
        author_id: user?.id ?? existingPost?.author_id ?? null,
        profiles: existingPost ? { display_name: (existingPost as { profiles?: { display_name?: string } }).profiles?.display_name } : undefined,
      };

      queryClient.setQueriesData(
        { queryKey: ["admin-posts"] },
        (old: typeof listRow[] | undefined) => {
          if (!old) return [listRow];
          const idx = old.findIndex((p) => p.id === postId);
          if (idx >= 0) {
            const next = [...old];
            next[idx] = { ...old[idx], ...listRow };
            return next;
          }
          return [listRow, ...old];
        }
      );

      void invalidateBlogCaches(queryClient, { postId, slug: trimmedSlug });

      const messages: Record<PostStatus, string> = {
        draft: "Draft saved",
        published: isEdit ? "Post updated and published" : "Post published",
        scheduled: "Post scheduled",
        archived: "Post archived",
      };
      toast.success(messages[targetStatus]);

      if (targetStatus === "published" || targetStatus === "scheduled") {
        navigate("/admin/posts");
      } else if (!isEdit) {
        navigate(`/admin/posts/edit/${postId}`);
      }
    },
    onError: (e: Error) => toast.error(e.message || "Failed to save"),
  });

  const handleSave = useCallback((targetStatus: PostStatus) => {
    if (saveMutation.isPending) return;
    saveMutation.mutate(targetStatus);
  }, [saveMutation]);

  
  if (isEdit && isLoadingPost) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-muted-foreground text-sm">Loading post…</p>
      </div>
    );
  }

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
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-foreground">{isEdit ? "Edit Post" : "Create Post"}</h1>
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium uppercase tracking-wider ${
                status === "published" ? "bg-green-500/10 text-green-500"
                : status === "scheduled" ? "bg-blue-500/10 text-blue-500"
                : status === "draft" ? "bg-yellow-500/10 text-yellow-500"
                : "bg-muted text-muted-foreground"
              }`}>
                {status}
              </span>
            </div>
            <p className="text-xs text-muted-foreground">{wordCount} words · {readingTime} min read</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {saveMutation.isPending && (
            <span className="text-xs text-muted-foreground">Saving…</span>
          )}
          <Button variant="outline" size="sm" onClick={() => handleSave("draft")} disabled={saveMutation.isPending}>
            <Save className="h-3.5 w-3.5 mr-1" /> Save Draft
          </Button>
          <Button variant="outline" size="sm" onClick={() => handleSave("scheduled")} disabled={saveMutation.isPending || !scheduledAt}>
            <Clock className="h-3.5 w-3.5 mr-1" /> Schedule
          </Button>
          <Button size="sm" onClick={() => handleSave("published")} disabled={saveMutation.isPending}>
            <Send className="h-3.5 w-3.5 mr-1" />
            {isEdit && status === "published" ? "Update" : "Publish"}
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="preview"><Eye className="h-3.5 w-3.5 mr-1" />Preview</TabsTrigger>
          <TabsTrigger value="seo">SEO</TabsTrigger>
          <TabsTrigger value="social">Social</TabsTrigger>
          <TabsTrigger value="geo">Geo SEO</TabsTrigger>
          <TabsTrigger value="jsonld">JSON-LD</TabsTrigger>
        </TabsList>

        <TabsContent value="preview">
          {activeTab === "preview" && (
            <BlogPostPreview
              title={title}
              excerpt={excerpt}
              content={content}
              coverImage={coverImage}
              categoryName={categories?.find((c) => c.id === categoryId)?.name || "Uncategorized"}
              authorName={user?.user_metadata?.full_name || user?.email || ""}
              authorAvatar={user?.user_metadata?.avatar_url}
              readingTime={readingTime}
              publishedAt={existingPost?.published_at ?? undefined}
            />
          )}
        </TabsContent>

        <TabsContent value="content" className="space-y-4">
          <div className="space-y-2">
            <Label>Title</Label>
            <Input value={title} onChange={(e) => { markDirty(); setTitle(e.target.value); }} placeholder="Post title" className="text-lg font-semibold" />
          </div>

          <div className="flex gap-2 items-end">
            <div className="flex-1 space-y-2">
              <Label>Slug</Label>
              <Input value={slug} onChange={(e) => { markDirty(); setSlug(e.target.value); setSlugManual(true); }} />
            </div>
            <Button variant="ghost" size="sm" onClick={() => { setSlugManual(false); setSlug(generateSlug(title)); }}>
              Auto
            </Button>
          </div>


          <div className="space-y-2">
            <Label>Excerpt</Label>
            <Textarea value={excerpt} onChange={(e) => { markDirty(); setExcerpt(e.target.value); }} placeholder="Brief summary..." rows={2} />
          </div>

          <div className="space-y-2">
            <Label>Cover Image</Label>
            <div className="flex gap-2 items-center">
              <Input type="file" accept="image/*" onChange={handleCoverUpload} className="flex-1" />
              {coverImage && <img src={coverImage} alt="cover" className="h-10 w-16 object-cover rounded" />}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
  <Label>Category</Label>

  {/* Select */}
   <select
    value={categoryId || ""}
    onChange={(e) => { markDirty(); setCategoryId(e.target.value); }}
    className="w-full rounded-md border px-3 py-2"
  >
    <option value="">No category</option>
    {categories?.map((c) => (
      <option key={c.id} value={c.id}>{c.name}</option>
    ))}
  </select>

  {/* Create */}
 {/* Inline create + edit list */}
  <div className="bg-card border border-border rounded-lg divide-y divide-border">
    <div className="flex items-center gap-2 px-3 py-2">
      <Input
        value={newCategory}
        onChange={(e) => setNewCategory(e.target.value)}
        placeholder="New category"
        className="h-7 text-sm"
        onKeyDown={(e) => e.key === "Enter" && newCategory.trim() && createCategory.mutate(newCategory.trim())}
      />
      <Button size="icon" variant="ghost" className="h-7 w-7 shrink-0" onClick={() => createCategory.mutate(newCategory.trim())} disabled={!newCategory.trim() || createCategory.isPending}>
        +
      </Button>
    </div>
    {categories?.map((c) => (
      <div key={c.id} className="flex items-center gap-2 px-3 py-2">
        <Input
          value={editCategoryName && editCategoryId === c.id ? editCategoryName : c.name}
          onFocus={() => { setEditCategoryId(c.id); setEditCategoryName(c.name); }}
          onChange={(e) => setEditCategoryName(e.target.value)}
          className="h-7 text-sm flex-1"
        />
        <Button size="icon" variant="ghost" className="h-7 w-7 shrink-0 text-green-600"
          onClick={() => updateCategory.mutate({ id: c.id, name: editCategoryId === c.id ? editCategoryName : c.name })}
          disabled={updateCategory.isPending}
        >✔</Button>
        <Button size="icon" variant="ghost" className="h-7 w-7 shrink-0 text-destructive"
          onClick={() => deleteCategory.mutate(c.id)}
          disabled={deleteCategory.isPending}
        >🗑</Button>
      </div>
    ))}
  </div>
</div>
            <div className="space-y-2">
              <Label>Schedule</Label>
              <Input type="datetime-local" value={scheduledAt} onChange={(e) => setScheduledAt(e.target.value)} />
            </div>
          </div>
<div className="space-y-2 mt-4">
  <Label>Feature Status</Label>
  <select
    value={featureStatus}
    onChange={(e) =>
      setFeatureStatus(e.target.value as "none" | "featured" | "upcoming")
    }
    className="w-full rounded-md border px-3 py-2"
  >
    <option value="none">Normal</option>
    <option value="featured">Featured (1 allowed)</option>
    <option value="upcoming">Upcoming (max 3)</option>
  </select>
</div>
    

          <div className="space-y-3">
  <Label>Tags</Label>

  {/* Select */}
 {/* Tag toggle chips */}
  <div className="flex flex-wrap gap-2">
    {tags?.map((t) => (
      <button
        key={t.id}
        type="button"
        onClick={() => setSelectedTags((prev) =>
          prev.includes(t.id) ? prev.filter((id) => id !== t.id) : [...prev, t.id]
        )}
        className={`px-2.5 py-1 rounded-full text-xs border transition-colors ${
          selectedTags.includes(t.id)
            ? "bg-primary text-primary-foreground border-primary"
            : "bg-muted text-muted-foreground border-border hover:border-primary"
        }`}
      >
        {t.name}
      </button>
    ))}
  </div>

  {/* Inline create + edit list */}
  <div className="bg-card border border-border rounded-lg divide-y divide-border">
    <div className="flex items-center gap-2 px-3 py-2">
      <Input
        value={newTag}
        onChange={(e) => setNewTag(e.target.value)}
        placeholder="New tag"
        className="h-7 text-sm"
        onKeyDown={(e) => e.key === "Enter" && newTag.trim() && createTag.mutate(newTag.trim())}
      />
      <Button size="icon" variant="ghost" className="h-7 w-7 shrink-0" onClick={() => createTag.mutate(newTag.trim())} disabled={!newTag.trim() || createTag.isPending}>
        +
      </Button>
    </div>
    {tags?.map((t) => (
      <div key={t.id} className="flex items-center gap-2 px-3 py-2">
        <Input
          value={editTagName && editTagId === t.id ? editTagName : t.name}
          onFocus={() => { setEditTagId(t.id); setEditTagName(t.name); }}
          onChange={(e) => setEditTagName(e.target.value)}
          className="h-7 text-sm flex-1"
        />
        <Button size="icon" variant="ghost" className="h-7 w-7 shrink-0 text-green-600"
          onClick={() => updateTag.mutate({ id: t.id, name: editTagId === t.id ? editTagName : t.name })}
          disabled={updateTag.isPending}
        >✔</Button>
        <Button size="icon" variant="ghost" className="h-7 w-7 shrink-0 text-destructive"
          onClick={() => deleteTag.mutate(t.id)}
          disabled={deleteTag.isPending}
        >🗑</Button>
      </div>
    ))}
  </div>
 
</div>

          <div className="space-y-2">
            <Label>Content</Label>
            <RichTextEditor
              key={isEdit ? id : "new"}
              content={content}
              onChange={(html) => { markDirty(); setContent(html); }}
            />
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
