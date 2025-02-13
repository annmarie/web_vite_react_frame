import { render, screen, fireEvent, act } from "@testing-library/react";
import { initialState } from "./reducer";
import SlidePuzzle from "../SlidePuzzle";


describe("SlidePuzzle Component Tests", () => {

  it("should render the puzzle grid and reset button", async () => {
    const { size } = initialState;
    await act(() => render(<SlidePuzzle />));
    expect(screen.getByRole('status')).toHaveTextContent('Game On');
    const tiles = screen.getAllByRole("cell");
    expect(tiles.length).toBe(size * size);
    const resetButton = screen.getByTestId('reset-button');
    expect(resetButton).toBeInTheDocument();
  });

  it('renders accessible ARIA attributes', async () => {
    const { size } = initialState;
    await act(() => render(<SlidePuzzle />));
    const board = screen.getByRole('grid', { name: /slide puzzle board/i });
    expect(board).toBeInTheDocument();
    const tile = screen.getAllByRole('cell', { name: /tile at row \d+ and column \d+ with (empty|\d+)/i });
    expect(tile.length).toBe(size * size);
    const resetButton = screen.getByRole('button', { name: "Reset the game to its initial state" });
    expect(resetButton).toBeInTheDocument();
    const emptyTile = screen.getByRole('cell', { name: /tile at row \d+ and column \d+ with empty/i });
    expect(emptyTile).toHaveClass('empty');
    const numberedTile = screen.getByRole('cell', { name: /tile at row \d+ and column \d+ with 1(?![0-9])/i});
    expect(numberedTile).toHaveTextContent(1);
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