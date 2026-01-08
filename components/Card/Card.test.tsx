import { render, screen } from "@testing-library/react";

import Card from "./Card";

describe("Card Component", () => {
  it("should render Card with a link and children", () => {
    render(
      <Card link="/details">
        <h2>Card Title</h2>
        <p>Card content goes here.</p>
      </Card>
    );

    const headerElement = screen.getByRole("heading", {
      level: 2,
      name: "Card Title",
    });
    expect(headerElement).toBeInTheDocument();

    const contentElement = screen.getByText("Card content goes here.");
    expect(contentElement).toBeInTheDocument();

    const linkElement = screen.getByRole("link", { name: /more/i });
    expect(linkElement).toHaveAttribute("href", "/details");
  });

  it("should render Card without a link", () => {
    render(
      <Card>
        <h2>Card Without Link</h2>
        <p>This card does not have a link.</p>
      </Card>
    );

    const linkElement = screen.queryByRole("link", { name: /more/i }); // queryByRole digunakan untuk elemen yang mungkin tidak ada
    expect(linkElement).not.toBeInTheDocument();
  });
});
