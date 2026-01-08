import { screen, render } from "@testing-library/react";

// Import komponen BookList yang akan diuji
import BookList from "./BookList";

const books = [
  {
    id: 1,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
  },
  {
    id: 2,
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
  },
  {
    id: 3,
    title: "1984",
    author: "George Orwell",
  },
];

describe("BookList Component", () => {
  it("renders a list of the correct number of books", () => {
    render(<BookList books={books} />);

    const bookItems = screen.getAllByRole("listitem"); // Mencari semua elemen dengan peran 'listitem'

    expect(bookItems).toHaveLength(books.length); // Memastikan jumlah elemen sesuai dengan jumlah buku
  });

  it("renders the book titles and authors correctly", () => {
    render(<BookList books={books} />);

    books.forEach((book) => {
      expect(screen.getByText(book.title)).toBeInTheDocument(); // Memastikan judul buku ditampilkan
      expect(screen.getByText(book.author)).toBeInTheDocument(); // Memastikan penulis buku ditampilkan
    });
  });
});
