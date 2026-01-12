import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Page from "./page";

describe("HomaPage", () => {
  it("renders an H1 with the correct text", () => {
    render(<Page />);

    const heading = screen.getByRole("heading", { level: 1 }); // Fungsinya yaitu untuk mencari elemen heading dengan level 1 (H1) pada halaman yang sudah dirender
    expect(heading).toBeInTheDocument(); //Fungsinya yaitu untuk mengecek apakah elemen heading tersebut ada di dalam dokumen

    expect(heading).toHaveTextContent("Welcome to Readle"); //Fungsinya yaitu untuk mengecek apakah ada teks "Welcome to Readle" di dalam heading
    expect(heading).toHaveTextContent(/welcome/i); //Fungsinya yaitu untuk mengecek apakah ada kata welcome di dalam heading, sedangkan "i" pada akhir regex berarti pengecekan ini tidak peka terhadap huruf besar/kecil
  });

  it('homepage can toggle "Show More" and "Show Less" button', async () => {
    const user = userEvent.setup();

    render(<Page />);

    const button = screen.getByRole("button", { name: /show more/i });

    // Klik pertama: tombol berubah jadi "Show Less"
    await user.click(button);
    // expect(button).toHaveTextContent("Show Less");
    expect(button).toHaveTextContent(/show less/i);

    // Klik kedua: tombol kembali jadi "Show More"
    await user.click(button);
    expect(button).toHaveTextContent("Show More");
  });

  it('should show Another Card when "Show More" is clicked', async () => {
    const user = userEvent.setup();

    render(<Page />);

    // Pastikan isExpanded awalnya false, jadi elemen dengan aria-label "more features" tidak ada
    const moreFeatures = screen.queryByLabelText("more features");
    expect(moreFeatures).not.toBeInTheDocument();

    // Klik tombol "Show More"
    const firstButton = screen.getByRole("button", { name: /show more/i });
    await user.click(firstButton);

    const moreFeaturesAfterClick = screen.getByRole("list", {
      name: /more features/i,
    });
    expect(moreFeaturesAfterClick).toBeInTheDocument();
  });

  it('should hide Additional Cards when "Show Less" is clicked', async () => {
    const user = userEvent.setup();

    render(<Page />);

    // Pastikan isExpanded awalnya false, jadi elemen dengan aria-label "more features" tidak ada
    const moreFeatures = screen.queryByLabelText("more features");
    expect(moreFeatures).not.toBeInTheDocument();

    // Klik tombol "Show More"
    const firstButton = screen.getByRole("button", { name: /show more/i });
    await user.click(firstButton);

    const moreFeaturesAfterClick = screen.getByLabelText("more features");
    expect(moreFeaturesAfterClick).toBeInTheDocument();

    // Klik tombol "Show Less"
    const secondButton = screen.getByRole("button", { name: /show less/i });
    await user.click(secondButton);

    const moreFeaturesAfterSecondClick =
      screen.queryByLabelText("more features");
    expect(moreFeaturesAfterSecondClick).not.toBeInTheDocument();
  });
});
