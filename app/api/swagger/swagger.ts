import { generateOpenApi } from "@ts-rest/open-api";
import { BooksContract } from "../books/booksContract";
import {
  BookSchemaExample,
  ErrorResponseSchemaExample,
  AddedBookResponseSchemaExample,
} from "../models/schemas";

const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000";
export const OpenAPIV1 = generateOpenApi(
  {
    ...BooksContract,
  },
  {
    info: {
      title: "BookStore API Documentation",
      version: "1.0.0",
      description: "API documentation for the BookStore demo project",
    },
    openapi: "3.1.0",
    servers: [
      {
        url: serverUrl,
        description: serverUrl.includes("localhost")
          ? "Dev API server"
          : "Prod API Server",
      },
    ],
    components: {
      securitySchemes: {
        ApiKeyAuth: {
          type: "apiKey",
          in: "header",
          name: "x-api-key",
        },
      },
      schemas: {
        Book: BookSchemaExample,
        AddedBookResponse: AddedBookResponseSchemaExample,
        ErrorResponse: ErrorResponseSchemaExample,
      },
    },
    security: [{ ApiKeyAuth: [] }],
    externalDocs: {
      description: "Swagger JSON",
      url: "/api/swagger",
    },
  },
  {
    setOperationId: true,
  }
);
