import { render, screen, fireEvent, act } from "@testing-library/react";
import Cell from "../Cell";

describe("Cell Component", () => {
  const mockOnClick = jest.fn();

  const defaultProps = {
    rowIndex: 0,
    colIndex: 0,
    cellValue: 1,
    selectedPeg: null,
    onClick: mockOnClick,
  };

  it("renders correctly with a peg", async () => {
    await act(() => render(<Cell {...defaultProps} />));
    const cell = screen.getByRole("button", { name: /Cell at row 1, column 1 is a peg/i });
    expect(cell).toBeInTheDocument();
    expect(cell).toHaveClass("cell peg");
    expect(cell).not.toHaveClass("selected");
    expect(cell).toHaveAttribute("aria-disabled", "false");
  });

  it("renders correctly when selected", async () => {
    await act(() => render(
      <Cell
        {...defaultProps}
        selectedPeg={{ row: 0, col: 0 }}
      />
    ));
    const cell = screen.getByRole("button", { name: /Cell at row 1, column 1 is a peg and selected/i });
    expect(cell).toHaveClass("selected");
  });

  it("renders correctly with an empty cell", async () => {
    await act(() => render(<Cell {...defaultProps} cellValue={0} />));
    const cell = screen.getByRole("button", { name: /Cell at row 1, column 1 is empty/i });
    expect(cell).toHaveClass("cell empty");
  });

  it("renders correctly with an invalid cell", async () => {
    await act(() => render(<Cell {...defaultProps} cellValue={"invalid"} />));
    const cell = screen.getByRole("button", { name: /Cell at row 1, column 1 is not playable/i });
    expect(cell).toHaveClass("cell invalid");
    expect(cell).toHaveAttribute("aria-disabled", "true");
  });

  it("calls onClick when clicked", async () => {
    await act(() => render(<Cell {...defaultProps} />));
    const cell = screen.getByRole("button", { name: /Cell at row 1, column 1 is a peg/i });
    fireEvent.click(cell);
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it("does not call onClick for invalid cells", async () => {
    await act(() => render(<Cell {...defaultProps} cellValue={"invalid"} />));
    const cell = screen.getByRole("button", { name: /Cell at row 1, column 1 is not playable/i });
    await act(() => fireEvent.click(cell));
    expect(mockOnClick).not.toHaveBeenCalled();
  });
});
