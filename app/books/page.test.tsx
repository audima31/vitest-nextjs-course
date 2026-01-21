import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { server } from "@/__mocks__/node";
import { http, HttpResponse } from "msw";

import BooksPage from "./page";
import { wait } from "@testing-library/user-event/dist/cjs/utils/index.js";

describe("Books Page", () => {
  it("renders a list of fetched books", async () => {
    render(<BooksPage />);

    const booksListItems = screen.findAllByRole("listitem");
    expect((await booksListItems).length).toBe(3);

    const bookTitle = await screen.findByText("1984");
    expect(bookTitle).toBeInTheDocument();
  });

  it("should display a message when no books are found", async () => {
    server.use(http.get("/api/books", () => HttpResponse.json([]))); // Berguna untuk mengubah respons mock menjadi array kosong

    render(<BooksPage />);

    const noBooksMessage = await screen.findByText(/no books/i);
    expect(noBooksMessage).toBeInTheDocument();
  });

  it("should display loading state initially", async () => {
    render(<BooksPage />);

    const loadingMessage = screen.getByText(/loading books/i);
    expect(loadingMessage).toBeInTheDocument();

    await waitForElementToBeRemoved(loadingMessage); // Berguna untuk menunggu hingga elemen loading menghilang
    expect(loadingMessage).not.toBeInTheDocument();
  });

  it("should display an error message when the fetch fails", async () => {
    // server.use(
    //   http.get("/api/books", () => {
    //     return HttpResponse.json(
    //       { message: "Internal Server Error" },
    //       { status: 500 }
    //     );
    //   })
    // );

    server.use(http.get("/api/books", () => HttpResponse.error()));
    render(<BooksPage />);

    const errorMessage = await screen.findByText(/error/i);
    expect(errorMessage).toBeInTheDocument();
  });
});
