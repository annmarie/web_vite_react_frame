import { render, screen, fireEvent, act } from "@testing-library/react";
import { initialState } from "./reducer";
import SlidePuzzle from "../SlidePuzzle";


// TODO: get this to work
describe("SlidePuzzle Component Tests", () => {
  it("should render the puzzle grid and reset button", async () => {
    const { size } = initialState;
    await act(() => render(<SlidePuzzle />));
    const tiles = screen.getAllByRole("cell");
    expect(tiles.length).toBe(size * size);
    const resetButton = screen.getByRole('button', { name: "Reset the game to its initial state" });
    expect(resetButton).toBeInTheDocument();
  });

  it("should display 'Game on' when the puzzle is not solved", async () => {
    await act(() => render(<SlidePuzzle />));
    const status = screen.getByText(/game on/i);
    expect(status).toBeInTheDocument();
  });

  it("should update the state when a valid tile is clicked", async () => {
    await act(() => render(<SlidePuzzle />));
    const tiles = screen.getAllByRole("cell");
    const currentTiles = tiles.map(tile => tile.textContent);
    const emptyIdx = tiles.findIndex(tile => tile.textContent === "");
    expect(tiles[emptyIdx].textContent).toBe('')
    const clickOnIdx = emptyIdx === 9 ? 8 : emptyIdx + 1;
    await act(() => fireEvent.click(tiles[clickOnIdx]))
    const newTiles = tiles.map(tile => tile.textContent);
    expect(newTiles[emptyIdx].textContent).not.toBe('')
    expect(currentTiles).not.toBe(newTiles)
  });
});