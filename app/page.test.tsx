import { render, screen } from "@testing-library/react";

import Page from "./page";

describe("HomaPage", () => {
  it("renders an H1 with the correct text", () => {
    render(<Page />);

    const heading = screen.getByRole("heading", { level: 1 }); // Fungsinya yaitu untuk mencari elemen heading dengan level 1 (H1) pada halaman yang sudah dirender
    expect(heading).toBeInTheDocument(); //Fungsinya yaitu untuk mengecek apakah elemen heading tersebut ada di dalam dokumen

    expect(heading).toHaveTextContent("Welcome to Readle"); //Fungsinya yaitu untuk mengecek apakah ada teks "Welcome to Readle" di dalam heading
    expect(heading).toHaveTextContent(/welcome/i); //Fungsinya yaitu untuk mengecek apakah ada kata welcome di dalam heading, sedangkan "i" pada akhir regex berarti pengecekan ini tidak peka terhadap huruf besar/kecil
  });
});
