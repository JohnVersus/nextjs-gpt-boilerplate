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
    summary: "Retrieve all books",
    description: "Fetch a list of all books in the bookstore.",
    responses: {
      200: z.array(BookSchema),
      400: ErrorResponseSchema,
      500: ErrorResponseSchema,
    },
  },
  getBook: {
    method: "GET",
    path: "/api/books/{id}",
    summary: "Retrieve a book by ID",
    description:
      "Fetch details along with summary of a specific book using its ID.",
    pathParams: BookSchema.pick({ id: true }),
    responses: {
      200: BookSchema,
      400: ErrorResponseSchema,
      404: ErrorResponseSchema,
      500: ErrorResponseSchema,
    },
  },
  addBook: {
    method: "POST",
    path: "/api/books/addBook",
    summary: "Add a new book",
    description: "Add a new book to the bookstore.",
    body: BookSchema.omit({ id: true }),
    responses: {
      201: AddedBookResponseSchema,
      400: ErrorResponseSchema,
      500: ErrorResponseSchema,
    },
  },
  deleteBook: {
    method: "DELETE",
    path: "/api/books/deleteBook/{id}",
    summary: "Delete a book",
    description: "Remove a book from the bookstore using its ID.",
    pathParams: BookSchema.pick({ id: true }),
    body: null,
    responses: {
      204: z.null(),
      400: ErrorResponseSchema,
      404: ErrorResponseSchema,
      500: ErrorResponseSchema,
    },
  },
});
