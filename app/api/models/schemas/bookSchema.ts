import { z } from "zod";

// Define the Zod schema
export const BookSchema = z.object({
  id: z.number({ description: "Unique Id of a Book." }),
  title: z.string({ description: "Title of a Book." }),
  author: z.string({ description: "Author of a Book." }),
  publishedYear: z.number({ description: "Published year of a Book." }),
  summary: z.string({
    description: "Short summary of a Book in 1000 characters..",
  }),
});

// Define the OpenAPI schema with examples
export const BookSchemaExample = {
  type: "object",
  properties: {
    id: {
      type: "integer",
      example: 1,
    },
    title: {
      type: "string",
      example: "Example Book Title",
    },
    author: {
      type: "string",
      example: "John Doe",
    },
    publishedYear: {
      type: "integer",
      example: 2021,
    },
    summary: {
      type: "string",
      example: "This is a summary of the example book.",
    },
  },
  required: ["id", "title", "author", "publishedYear", "summary"],
};
