import { screen, render } from "@testing-library/react";
import { useParams } from "next/navigation";
import BookDetailPage from "./page";

describe("Book Detail Page", () => {
  it("should rrender book title and author (PARAMS)", async () => {
    vi.mocked(useParams).mockReturnValue({ id: "1" });

    render(<BookDetailPage />);

    const bookTitle = await screen.findByText("The Great Gatsby");
    const bookAuthor = await screen.findByText("by F. Scott Fitzgerald");

    expect(bookTitle).toBeInTheDocument();
    expect(bookAuthor).toBeInTheDocument();
  });
});
