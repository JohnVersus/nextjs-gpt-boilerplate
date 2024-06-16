import { z } from "zod";
import { initContract } from "@ts-rest/core";

const contract = initContract();

export const ApiContractV1 = contract.router({
  getAllBooks: {
    method: "GET",
    path: "/api/books",
    responses: {
      200: z.array(
        z.object({
          id: z.string(),
          title: z.string(),
          author: z.string(),
          publishedYear: z.number(),
        })
      ),
    },
  },
  getBook: {
    method: "GET",
    path: "/api/books/{id}",
    pathParams: z.object({
      id: z.string(),
    }),
    responses: {
      200: z.object({
        id: z.string(),
        title: z.string(),
        author: z.string(),
        publishedYear: z.number(),
      }),
    },
  },
  addBook: {
    method: "POST",
    path: "/api/books/addBook",
    body: z.object({
      title: z.string(),
      author: z.string(),
      publishedYear: z.number(),
    }),
    responses: {
      201: z.object({
        id: z.string(),
        title: z.string(),
        author: z.string(),
        publishedYear: z.number(),
      }),
    },
  },
  deleteBook: {
    method: "DELETE",
    path: "/api/books/deleteBook/{id}",
    pathParams: z.object({
      id: z.string(),
    }),
    body: z.object({}).optional(),
    responses: {
      204: z.null(),
    },
  },
});
