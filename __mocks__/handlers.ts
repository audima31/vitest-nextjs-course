import { http, HttpResponse } from "msw";

const BOOKS = [
  { id: 1, title: "The Great Gatsby", author: "F. Scott Fitzgerald" },
  { id: 2, title: "To Kill a Mockingbird", author: "Harper Lee" },
  { id: 3, title: "1984", author: "George Orwell" },
  { id: 4, title: "Pride and Prejudice", author: "Jane Austen" },
  { id: 5, title: "The Catcher in the Rye", author: "J.D. Salinger" },
];

export const handlers = [
  http.get("/api/books", () => {
    return HttpResponse.json([
      { id: 1, title: "The Great Gatsby", author: "F. Scott Fitzgerald" },
      { id: 2, title: "To Kill a Mockingbird", author: "Harper Lee" },
      { id: 3, title: "1984", author: "George Orwell" },
    ]);
  }),

  http.get("/api/books/:id", (req) => {
    const { id } = req.params;

    const book = BOOKS.find((b) => b.id === Number(id));
    if (!book) {
      return HttpResponse.json(null, { status: 404 });
    }

    return HttpResponse.json(book);
  }),
];
