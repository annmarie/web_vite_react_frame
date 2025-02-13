import { render, screen, act } from "@testing-library/react";
import { initialState } from '../reducer'
import Board from "../Board";


describe("Tile Component Tests", () => {

  it("should render the puzzle grid and reset button", async () => {
  const onTileClick = jest.fn();
    const tiles = initialState.tiles
    await act(async () => render(<Board tiles={tiles} onTileClick={onTileClick} />));
    const grids = screen.getAllByRole('grid');
    expect(grids.length).toEqual(1)
    const cells = screen.getAllByRole('cell');
    expect(cells.length).toEqual(initialState.size * initialState.size)
  });
});
