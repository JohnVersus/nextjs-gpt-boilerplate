import { z } from "zod";

// Define the Zod schema
export const AddedBookResponseSchema = z.object({
  id: z.number({ description: "Book Id." }),
  message: z.string({ description: "Staus message." }),
});

// Define the OpenAPI schema with examples
export const AddedBookResponseSchemaExample = {
  type: "object",
  properties: {
    id: {
      type: "integer",
      example: 1,
    },
    message: {
      type: "string",
      example: "Book added successfully",
    },
  },
  required: ["id", "message"],
};
