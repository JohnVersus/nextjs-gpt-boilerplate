import { z } from "zod";

// Define the Zod schema
export const BookSchema = z.object({
  id: z.string(),
  title: z.string(),
  author: z.string(),
  publishedYear: z.number(),
});

// Define the OpenAPI schema with examples
export const BookSchemaExample = {
  type: "object",
  properties: {
    id: {
      type: "string",
      example: "123e4567-e89b-12d3-a456-426614174000",
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
  },
  required: ["id", "title", "author", "publishedYear"],
};
