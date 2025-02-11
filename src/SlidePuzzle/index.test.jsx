import { render, screen, fireEvent, act } from "@testing-library/react";
import SidePuzzle from "../SlidePuzzle";

describe("SidePuzzle Component Tests", () => {
  it("should render the puzzle grid and reset button", async () => {
    await act(() => render(<SidePuzzle />));

    // Check if the grid is rendered
    const tiles = screen.getAllByRole("cell");
    expect(tiles.length).toBe(9); // 3x3 grid

    // Check if the reset button is rendered
    const resetButton = screen.getByText("Reset Puzzle");
    expect(resetButton).toBeInTheDocument();
  });

  it("should display 'Game on' when the puzzle is not solved", async () => {
    await act(() => render(<SidePuzzle />));
    const status = screen.getByText("Game on");
    expect(status).toBeInTheDocument();
  });

  // TODO: get this to work
  xit("should reset the puzzle when the reset button is clicked", async () => {
    await act(() => render(<SidePuzzle />));

    const resetButton = screen.getByText("Reset Puzzle");
    fireEvent.click(resetButton);

    // Check if the tiles are reset (randomized, so we can't check exact order)
    const tiles = screen.getAllByRole("button");
    expect(tiles.some((tile) => tile.textContent === "0")).toBe(true); // Ensure empty tile exists
  });

  // TODO: get this to work
  xit("should update the state when a valid tile is clicked", async () => {
    await act(() => render(<SidePuzzle />));

    // Find a tile and click it
    const tile = screen.getByText("1"); // Assuming tile "1" is adjacent to the empty tile
    fireEvent.click(tile);

    // Check if the tile moved (state updated)
    const emptyTile = screen.getByText(""); // Empty tile
    expect(emptyTile).toBeInTheDocument();
  });

  // TODO: get this to work
  xit("should display 'You won!' when the puzzle is solved", async () => {
    await act(() => render(<SidePuzzle />));

    // Simulate a solved state
    const tiles = screen.getAllByRole("button");
    tiles.forEach((tile, index) => {
      fireEvent.click(tile); // Simulate moves to solve the puzzle
    });

    const status = screen.getByText("You won!");
    expect(status).toBeInTheDocument();
  });
});
