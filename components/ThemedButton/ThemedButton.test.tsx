import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import ThemedButton, { ThemedButtonProps } from "./ThemedButton";

describe("ThemedButton Component", () => {
  // Catatan Terkait setupThemeButton :
  //Dibuat untuk menghindari pengulangan kode dalam test
  // overrides = "pengganti" atau "props tambahan" yang mau kamu tes
  // Partial<...> = membuat semua properti jadi opsional (tidak wajib diisi)
  // Contoh: Kalau ThemedButtonProps punya onClick, variant, disabled, dengan Partial kamu bisa kirim cuma {onClick: handleClick} aja, tidak perlu semuanya
  // = {} = nilai default kalau tidak ada yang dikirim

  const setupThemeButton = (overrides: Partial<ThemedButtonProps> = {}) => {
    return {
      user: userEvent.setup(), //userEvent.setup() digunakan untuk menginisialisasi interaksi pengguna
      ...render(<ThemedButton {...overrides}>Click</ThemedButton>),
      button: screen.getByRole("button"),
    };
  };

  it.each(["primary", "secondary", "danger", "success"])(
    "should render ThemeButton with variant color",
    (variant) => {
      render(<ThemedButton variant={variant}>Click Me</ThemedButton>);
      const button = screen.getByRole("button", { name: /click me/i });
      expect(button).toHaveClass(`btn-${variant}`);
    }
  );

  it("should call onClick handler when clicked", async () => {
    const handleClick = vi.fn(); //vi.fn() digunakan untuk membuat mock function
    const { user, button } = setupThemeButton({ onClick: handleClick });
    await user.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1); // Memastikan fungsi onClick dipanggil sekali
  });

  it("should NOT call onClick handler when clicked", async () => {
    const handleClick = vi.fn(); //vi.fn() digunakan untuk membuat mock function
    const { user, button } = setupThemeButton({
      onClick: handleClick,
      disabled: true,
    });
    await user.click(button);

    expect(handleClick).not.toHaveBeenCalled(); // Memastikan fungsi onClick tidak dipanggil
  });
});
