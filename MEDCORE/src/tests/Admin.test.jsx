import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach } from "vitest";
import Admin from "../components/Admin";
import * as MedicationsContext from "../MedicationsContext";

const mockMedications = [
  { id: 1, name: "Ibuprofen 200mg", description: "Pain & fever relief", category: "Pain Relief", price: 8 },
];

describe("Admin", () => {
  let addMedication, updateMedication;

  beforeEach(() => {
    addMedication = vi.fn();
    updateMedication = vi.fn();
    vi.spyOn(MedicationsContext, "useMedications").mockReturnValue({
      medications: mockMedications,
      addMedication,
      updateMedication,
    });
  });

  it("renders the form fields", () => {
    render(<Admin />);
    expect(screen.getByLabelText(/medication name/i)).toBeInTheDocument();
    expect(screen.getByText(/description/i)).toBeInTheDocument();
    expect(screen.getByText(/category/i)).toBeInTheDocument();
    expect(screen.getByText(/price/i)).toBeInTheDocument();
  });

  it("calls addMedication with form data on submit", async () => {
    render(<Admin />);

    await userEvent.type(screen.getByLabelText(/medication name/i), "Aspirin");
    await userEvent.type(screen.getByLabelText(/description/i), "Pain relief");
    await userEvent.type(screen.getByLabelText(/category/i), "Pain Relief");
    await userEvent.type(screen.getByLabelText(/price/i), "5");
    await userEvent.click(screen.getByRole("button", { name: /submit/i }));

    expect(addMedication).toHaveBeenCalledWith(
      expect.objectContaining({ name: "Aspirin" })
    );
  });

  it("lists existing medications with an Edit button", () => {
    render(<Admin />);
    expect(screen.getByText("Ibuprofen 200mg")).toBeInTheDocument();
    expect(screen.getByText("Edit")).toBeInTheDocument();
  });

  it("switches to update mode when Edit is clicked", async () => {
    render(<Admin />);
    await userEvent.click(screen.getByText("Edit"));

    expect(screen.getByDisplayValue("Ibuprofen 200mg")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /update medication/i })).toBeInTheDocument();
  });

  it("calls updateMedication when submitting in edit mode", async () => {
    render(<Admin />);
    await userEvent.click(screen.getByText("Edit"));
    await userEvent.click(screen.getByRole("button", { name: /update medication/i }));

    expect(updateMedication).toHaveBeenCalledWith(1, expect.any(Object));
  });
});