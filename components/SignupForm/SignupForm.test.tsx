import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import SignupForm, { SignupFormProps } from "./SignupForm";

describe("SignupForm Component", () => {
  const setupForm = (overrides: Partial<SignupFormProps> = {}) => {
    return {
      user: userEvent.setup(),
      ...render(<SignupForm {...overrides} />),
      emailInput: screen.getByLabelText(/email/i),
      passwordInput: screen.getByLabelText(/password/i),
      submitButton: screen.getByRole("button", { name: /submit/i }),
    };
  };

  it("should show email validation issues for invalid email", async () => {
    const { user, emailInput } = setupForm();

    await user.type(emailInput, "invalid-email"); //Parameter pertama: target elemen yang mau diisi oleh user, kedua: text yang diisi
    const emailIssues = screen.getByRole("list", { name: /email issues/i });
    expect(emailIssues).toBeInTheDocument();
  });

  it("should show password validation errors when password is weak", async () => {
    const { user, passwordInput } = setupForm();

    await user.type(passwordInput, "123456789"); //Parameter pertama: target elemen yang mau diisi oleh user, kedua: text yang diisi
    const passwordIssues = screen.getByRole("list", {
      name: /password issues/i,
    });
    expect(passwordIssues).toBeInTheDocument();

    expect(
      screen.queryByText(/at least 8 characters/i)
    ).not.toBeInTheDocument(); // 9 karakter sudah memenuhi syarat minimal 8
    expect(screen.getByText(/add an uppercase letter/i)).toBeInTheDocument();
    expect(screen.getByText(/add a lowercase letter/i)).toBeInTheDocument();
    expect(screen.queryByText(/add a number/i)).not.toBeInTheDocument();
    expect(screen.getByText(/add a symbol/i)).toBeInTheDocument();
  });

  it("should disable submit button initially", () => {
    const { submitButton } = setupForm();

    expect(submitButton).toBeDisabled();
  });

  it("should enable submit button when form is valid", async () => {
    const { user, emailInput, passwordInput, submitButton } = setupForm();

    await user.type(emailInput, "valid@example.com");
    await user.type(passwordInput, "ValidPass123!");
    expect(submitButton).toBeEnabled();
  });

  it('should SUMBIT FUNCTION form with valid data when "Submit" is clicked', async () => {
    const handleSubmitMock = vi.fn();

    const { user, emailInput, passwordInput, submitButton } = setupForm({
      onSubmit: handleSubmitMock,
    });

    await user.type(emailInput, "valid@gmail.com");
    await user.type(passwordInput, "ValidPass123!");
    await user.click(submitButton);

    expect(handleSubmitMock).toHaveBeenCalledWith(
      "valid@gmail.com",
      "ValidPass123!"
    );
  });

  it('should NOT call SUBMIT FUNCTION when form is invalid and "Submit" is clicked', async () => {
    const handleSubmitMock = vi.fn();

    const { user, emailInput, passwordInput, submitButton } = setupForm({
      onSubmit: handleSubmitMock,
    });

    await user.type(emailInput, "invalid-email");
    await user.type(passwordInput, "weak");
    await user.click(submitButton);

    expect(handleSubmitMock).not.toHaveBeenCalled();
  });
});
