import { z } from "zod";
import { initContract } from "@ts-rest/core";
import {
  BookSchema,
  ErrorResponseSchema,
  AddedBookResponseSchema,
} from "../models/schemas";

const contract = initContract();

export const BooksContract = contract.router({
  getAllBooks: {
    method: "GET",
    path: "/api/books",
    responses: {
      200: z.array(BookSchema),
      400: ErrorResponseSchema,
    },
  },
  getBook: {
    method: "GET",
    path: "/api/books/{id}",
    pathParams: z.object({
      id: z.string(),
    }),
    responses: {
      200: BookSchema,
      400: ErrorResponseSchema,
      404: ErrorResponseSchema,
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
      201: AddedBookResponseSchema,
      400: ErrorResponseSchema,
    },
  },
  deleteBook: {
    method: "DELETE",
    path: "/api/books/deleteBook/{id}",
    pathParams: z.object({
      id: z.string(),
    }),
    body: null,
    responses: {
      204: z.null(),
      400: ErrorResponseSchema,
      404: ErrorResponseSchema,
    },
  },
});
