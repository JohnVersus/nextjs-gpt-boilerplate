import { z } from "zod";

// Define the Zod schema
export const ErrorResponseSchema = z.object({
  message: z.string(),
  statusCode: z.number(),
});

// Define the OpenAPI schema with examples
export const ErrorResponseSchemaExample = {
  type: "object",
  properties: {
    message: {
      type: "string",
      example: "An error occurred",
    },
    statusCode: {
      type: "integer",
      example: 400,
    },
  },
  required: ["message", "statusCode"],
};
