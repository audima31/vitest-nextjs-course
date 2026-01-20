describe("handlers", () => {
  it("mocks /api/books correctly", async () => {
    const response = await fetch("api/books");

    expect(response.ok).toBe(true);
    expect(response.status).toBe(200);

    const books = await response.json();
    expect(books).toHaveLength(3);
  });

  it("mocks /api/books/:id correctly", async () => {
    const response = await fetch("api/books/2");

    expect(response.ok).toBe(true);
    expect(response.status).toBe(200);

    const book = await response.json();
    expect(book).toEqual({
      id: 2,
      title: "To Kill a Mockingbird",
      author: "Harper Lee",
    });

    expect(book.title).toBe("To Kill a Mockingbird");
  });
});
