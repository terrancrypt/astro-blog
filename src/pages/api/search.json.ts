import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import type { CollectionEntry } from "astro:content";

export const GET: APIRoute = async ({ url }): Promise<Response> => {
  const query: string | null = url.searchParams.get("query");

  if (query === null) {
    return new Response(
      JSON.stringify({
        error: "Query param is required",
      }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  const allBlogArticles: CollectionEntry<"blog">[] = await getCollection(
    "blog"
  );

  const searchResults: CollectionEntry<"blog">[] = allBlogArticles.filter(
    (article) => {
      const title: string = article.data.title.toLowerCase();
      const body: string = article.body.toLowerCase();
      const slug: string = article.slug.toLowerCase();
      return (
        title.includes(query!.toLowerCase()) ||
        body.includes(query!.toLowerCase()) ||
        slug.includes(query!.toLowerCase())
      );
    }
  );

  return new Response(JSON.stringify(searchResults), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
};
