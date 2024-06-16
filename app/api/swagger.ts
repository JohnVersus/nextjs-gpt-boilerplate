import { generateOpenApi } from "@ts-rest/open-api";
import { ApiContractV1 } from "./contract";

const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;

export const OpenAPIV1 = generateOpenApi(ApiContractV1, {
  info: {
    title: "API Documentation",
    version: "1.0.0",
    description: "API documentation for the project",
  },
  servers: [
    {
      url: serverUrl,
      description: serverUrl?.includes("localhost")
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
      ErrorResponse: {
        type: "object",
        properties: {
          message: {
            type: "string",
          },
          statusCode: {
            type: "integer",
          },
        },
        required: ["message", "statusCode"],
      },
    },
  },
  security: [{ ApiKeyAuth: [] }],
  externalDocs: {
    description: "Swagger JSON",
    url: "/api/swagger",
  },
});
