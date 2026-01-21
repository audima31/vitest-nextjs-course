import {
  screen,
  render,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { useParams, notFound } from "next/navigation";
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

  it("should call notFound for invalid book id", async () => {
    vi.mocked(useParams).mockReturnValue({ id: "999" }); //Berguna untuk mensimulasikan parameter id yang tidak valid

    render(<BookDetailPage />);
    const loadingMessage = screen.getByText(/loading/i);
    await waitForElementToBeRemoved(loadingMessage);
    
    expect(notFound).toHaveBeenCalled();
  });
});
