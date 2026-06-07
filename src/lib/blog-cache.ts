import type { QueryClient } from "@tanstack/react-query";

/** Invalidate all blog-related React Query caches after a post mutation. */
export async function invalidateBlogCaches(
  queryClient: QueryClient,
  opts?: { postId?: string; slug?: string }
) {
  const tasks = [
    queryClient.invalidateQueries({ queryKey: ["admin-posts"] }),
    queryClient.invalidateQueries({ queryKey: ["admin-stats"] }),
    queryClient.invalidateQueries({ queryKey: ["admin-recent-posts"] }),
    queryClient.invalidateQueries({ queryKey: ["public-posts"] }),
    queryClient.invalidateQueries({ queryKey: ["blog-post"] }),
    queryClient.invalidateQueries({ queryKey: ["related-posts"] }),
  ];

  if (opts?.postId) {
    tasks.push(
      queryClient.invalidateQueries({ queryKey: ["admin-post", opts.postId] }),
      queryClient.invalidateQueries({ queryKey: ["admin-post-tags", opts.postId] })
    );
  }

  if (opts?.slug) {
    tasks.push(
      queryClient.invalidateQueries({ queryKey: ["blog-post", opts.slug] })
    );
  }

  await Promise.all(tasks);
}
