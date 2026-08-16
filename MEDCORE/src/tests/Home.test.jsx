import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
import Home from "../Home";

describe("Home", () => {
  it("renders the hero heading and tagline", () => {
    render(<Home />);
    expect(screen.getByText("PharmaCare")).toBeInTheDocument();
    expect(screen.getByText(/trusted source for medication/i)).toBeInTheDocument();
  });

  it("shows a thank-you message after submitting the email form", async () => {
    render(<Home />);
    const input = screen.getByPlaceholderText("you@example.com");
    const button = screen.getByRole("button", { name: /notify me/i });

    await userEvent.type(input, "test@example.com");
    await userEvent.click(button);

    expect(screen.getByText(/thanks — we'll be in touch/i)).toBeInTheDocument();
  });
});