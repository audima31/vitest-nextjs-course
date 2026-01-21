import { useRouter } from "next/navigation";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Signup from "./page";

describe("Signup Page", () => {
  it("redirects to /books on successful form submission", async () => {
    const router = useRouter();
    render(<Signup />);

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole("button", { name: /submit/i });

    const user = userEvent.setup(); // Berguna untuk simulasi interaksi pengguna
    await user.type(emailInput, "test@example.com");
    await user.type(passwordInput, "Password123!");
    await user.click(submitButton);

    expect(router.push).toHaveBeenCalledWith("/books"); //router.push
  });
});
