import { format } from "date-fns";

interface BlogPostPreviewProps {
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  categoryName?: string;
  authorName?: string;
  authorAvatar?: string;
  readingTime: number;
  publishedAt?: string;
}

const BlogPostPreview = ({
  title,
  excerpt,
  content,
  coverImage,
  categoryName,
  authorName,
  authorAvatar,
  readingTime,
  publishedAt,
}: BlogPostPreviewProps) => {
  return (
    <div className="bg-background border border-border rounded-2xl overflow-hidden max-h-[75vh] overflow-y-auto">
      {/* Banner */}
      <div className="bg-accent/10 text-accent text-xs font-grotesk text-center py-1.5 sticky top-0 z-10 backdrop-blur">
        Live Preview — This is how your post will look on the blog
      </div>

      <div className="px-6 py-10 max-w-3xl mx-auto space-y-8">
        {/* Header */}
        <div>
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="text-accent text-xs font-grotesk uppercase tracking-wider">
              {categoryName || "Uncategorized"}
            </span>
            <span className="text-muted-foreground/50 text-xs">·</span>
            <span className="text-muted-foreground text-xs">{readingTime} min read</span>
            <span className="text-muted-foreground/50 text-xs">·</span>
            <span className="text-muted-foreground text-xs">
              {publishedAt ? format(new Date(publishedAt), "MMMM d, yyyy") : format(new Date(), "MMMM d, yyyy")}
            </span>
          </div>
          <h1 className="text-[clamp(1.8rem,4vw,3rem)] font-grotesk font-bold text-foreground leading-[1.1] mb-4">
            {title || "Untitled Post"}
          </h1>
          {excerpt && (
            <p className="text-muted-foreground text-base leading-relaxed">{excerpt}</p>
          )}
          <div className="flex items-center gap-3 mt-6">
            {authorAvatar ? (
              <img src={authorAvatar} className="w-10 h-10 rounded-full object-cover" alt="" />
            ) : (
              <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                <span className="text-accent font-grotesk text-sm font-bold">
                  {authorName?.charAt(0) || "Z"}
                </span>
              </div>
            )}
            <p className="text-foreground text-sm font-medium">{authorName || "Author"}</p>
          </div>
        </div>

        {/* Cover Image */}
        {coverImage && (
          <img
            src={coverImage}
            alt={title}
            className="w-full rounded-2xl object-cover max-h-[350px]"
          />
        )}

        {/* Body */}
        <div className="border-t border-border pt-8">
          {content ? (
            <div
              className="prose prose-sm sm:prose dark:prose-invert max-w-none prose-headings:font-grotesk prose-headings:text-foreground prose-p:text-foreground/90 prose-a:text-accent"
              dangerouslySetInnerHTML={{ __html: content }}
            />
          ) : (
            <p className="text-muted-foreground italic text-center py-12">
              Start writing to see a preview…
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogPostPreview;
