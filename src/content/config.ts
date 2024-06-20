import { defineCollection } from "astro:content";

const blogCollection = defineCollection({});

export const conllections = {
  blog: blogCollection,
};
