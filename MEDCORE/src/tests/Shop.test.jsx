import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach } from "vitest";
import Shop from "./componets/Shop";
import * as MedicationsContext from "./MedicationsContext";

const mockMedications=[
  { id: 1, name: "Ibuprofen 200mg", description: "Pain & fever relief", category: "Pain Relief", price: 8 },
  { id: 2, name: "Cetirizine 10mg", description: "Allergy relief, non-drowsy", category: "Allergy", price: 10 },
];

describe("Shop", () => {
  beforeEach(() => {
    vi.spyOn(MedicationsContext, "useMedications").mockReturnValue({
      medications: mockMedications,
      loading: false,
      error: null,
      deleteMedication: vi.fn(),
    });
  });

  it("renders a card for each medication", () => {
    render(<Shop />);
    expect(screen.getByText("Ibuprofen 200mg")).toBeInTheDocument();
    expect(screen.getByText("Cetirizine 10mg")).toBeInTheDocument();
  });

  it("shows a loading message while data is loading", () => {
    MedicationsContext.useMedications.mockReturnValue({
      medications: [],
      loading: true,
      error: null,
      deleteMedication: vi.fn(),
    });
    render(<Shop />);
    expect(screen.getByText(/loading medications/i)).toBeInTheDocument();
  });

  it("shows an error message if fetching fails", () => {
    MedicationsContext.useMedications.mockReturnValue({
      medications:[],
      loading: false,
      error: "Failed to fetch medications",
      deleteMedication: vi.fn(),
    });
    render(<Shop />);
    expect(screen.getByText(/error:/i)).toBeInTheDocument();
  });

  it("filters medications by search text", async () => {
    render(<Shop />);
    const search = screen.getByPlaceholderText("Search");
    await userEvent.type(search,"ibuprofen");

    expect(screen.getByText("Ibuprofen 200mg")).toBeInTheDocument();
    expect(screen.queryByText("Cetirizine 10mg")).not.toBeInTheDocument();
  });

  it("filters medications by category checkbox", async () => {
    render(<Shop />);
    const allergyCheckbox = screen.getByLabelText("Allergy");
    await userEvent.click(allergyCheckbox);

    expect(screen.getByText("Cetirizine 10mg")).toBeInTheDocument();
    expect(screen.queryByText("Ibuprofen 200mg")).not.toBeInTheDocument();
  });

  it("shows 'no medications match' when filters exclude everything", async () => {
    render(<Shop />);
    const search = screen.getByPlaceholderText("Search");
    await userEvent.type(search, "nonexistent drug");

    expect(screen.getByText(/no medications match/i)).toBeInTheDocument();
  });

  it("calls deleteMedication when Remove is clicked", async () => {
    const deleteMedication = vi.fn();
    MedicationsContext.useMedications.mockReturnValue({
      medications: mockMedications,
      loading: false,
      error: null,
      deleteMedication,
    });
    render(<Shop />);
    const removeButtons=screen.getAllByText("Remove");
    await userEvent.click(removeButtons[0]);

    expect(deleteMedication).toHaveBeenCalledWith(1);
  });

  it("clears filters and refocuses the search input when Clear filters is clicked", async()=> {
    render(<Shop/>);
    const search = screen.getByPlaceholderText("Search");
    await userEvent.type(search, "ibuprofen");
    await userEvent.click(screen.getByLabelText("Allergy"));
    await userEvent.click(screen.getByText("Clear filters"));
    expect(search).toHaveValue("");
    expect(search).toHaveFocus();
  });

});