# Next.js GPT Boilerplate

This boilerplate provides a solid foundation for building your next GPT-powered application using Next.js.

## Getting Started

### Clone the Repository

To get started, first clone the repository:

```bash
git clone https://github.com/JohnVersus/nextjs-gpt-boilerplate.git
cd nextjs-gpt-boilerplate
```

### Install Dependencies

Make sure you have `pnpm` installed. If you don't have it installed, you can install it globally using `npm`:

```bash
npm install -g pnpm
```

Once `pnpm` is installed, run the following command to install the project dependencies:

```bash
pnpm install
```

### Add env variables

Create .env.local file and add the required env variables

```bash
API_KEY=test
NODE_ENV=development

DB_NAME=xxx
DB_USER=xxx
DB_PASSWORD=xxx
DB_HOST=xxx
```

### Setup DB

Run the following commands to setup db with the defined schema

```bash
pnpm run db:generate
pnpm run db:migrate
```

### Running the Development Server

After that, you can start the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## API Folder Structure

The `api` folder is where you will define your API endpoints. It contains demo API endpoints related to a bookstore. These endpoints can be used to read, add, and delete books.

### Skeleton Folder Structure

```
app/api
├── books
│   ├── [id]
│   │   └── route.ts
│   ├── addBook
│   │   └── route.ts
│   ├── deleteBook
│   │   └── [id]
│   │       └── route.ts
│   ├── booksContract.ts
│   └── route.ts
├── config
│   └── db.ts
├── middleware
│   ├── index.ts
│   ├── runMiddleware.ts
│   ├── withAuth.ts
│   └── withLogging.ts
├── models
│   ├── schemas
│   │   ├── addedBookResponseSchema.ts
│   │   ├── bookSchema.ts
│   │   ├── errorResponseSchema.ts
│   │   └── index.ts
│   ├── book.ts
│   └── schema.ts
├── swagger
│   ├── route.ts
│   └── swagger.ts
└── utils
    ├── apiLogger.ts
    ├── auth.ts
    └── index.ts
```

### Example Endpoint Code

#### books/route.ts

```typescript
// app/api/books/route.ts

import { NextRequest, NextResponse } from "next/server";
import { Book, BookSelectModel } from "../models/book";
import { db } from "../config/db";
import { withAuth, withLogging } from "../middleware";

async function getBooksHandler(req: NextRequest) {
  const books: BookSelectModel[] = await db.select().from(Book).execute();
  return NextResponse.json(books, { status: 200 });
}

// Endpoint is wrapped with middlewares
export const GET = withLogging(withAuth(getBooksHandler));
```

### API Endpoint Contract

Contracts are defined under each endpoint folder where the API method, input, and output schemas are specified.

```typescript
// app/api/books/booksContract.ts
import { z } from "zod";
import { initContract } from "@ts-rest/core";
import { BookSchema, ErrorResponseSchema } from "../models/schemas";

const contract = initContract();

export const BooksContract = contract.router({
  getAllBooks: {
    method: "GET",
    path: "/api/books",
    responses: {
      200: z.array(BookSchema),
      400: ErrorResponseSchema,
      500: ErrorResponseSchema,
    },
  },
  // ...similarly other endpoints
});
```

### Schemas

Schemas for the endpoints are defined under the `models/schemas` folder. These are used for type checking and defining example schemas for Swagger documentation.

```typescript
// app/api/models/schemas/bookSchema.ts

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
```

### Middleware

Middleware is defined in the `middleware` folder. An example middleware for API key verification is shown below.

```typescript
// app/api/middleware/withAuth.ts
import { NextRequest, NextResponse } from "next/server";
import { authenticate } from "../utils/auth";

type Handler = (req: NextRequest) => Promise<NextResponse>;

export function withAuth(handler: Handler): Handler {
  return async (req: NextRequest) => {
    const authResponse = authenticate(req);
    if (authResponse) {
      return authResponse;
    }
    return handler(req);
  };
}
```

### Database

We are using MySQL database with Drizzle ORM. The database schemas are defined under the `models` folder.

```typescript
// app/api/models/book.ts

import {
  mysqlTable,
  serial,
  varchar,
  int,
  timestamp,
} from "drizzle-orm/mysql-core";
import { InferInsertModel, InferSelectModel } from "drizzle-orm";

export const Book = mysqlTable("books", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }),
  author: varchar("author", { length: 255 }),
  publishedYear: int("published_year"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
});

export type BookInsertModel = InferInsertModel<typeof Book>;
export type BookSelectModel = InferSelectModel<typeof Book>;
```

### Swagger Documentation

Swagger definitions are added in the `swagger.ts` file, which uses the defined API routes and schemas to generate Swagger OpenAPI definitions.

```typescript
// app/api/swagger/swagger.ts

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
      title: "API Documentation",
      version: "1.0.0",
      description: "API documentation for the project",
    },
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
  }
);
```

## License

This project is licensed under the MIT License.

## Contributing

Contributions are welcome! Please read the [contributing guidelines](CONTRIBUTING.md) for more information.

## Contact

If you have any questions or need further assistance, feel free to open an issue or contact the project maintainer.
