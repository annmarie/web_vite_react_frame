import { reducer, initialState } from './reducer';

describe('Reducer Tests', () => {
  test('should return the initial state when no action is provided', () => {
    const newState = reducer(undefined, {});
    expect(newState).toEqual(initialState);
  });

  it('should reset the puzzle when RESET_PUZZLE action is dispatched', () => {
    const currentState = {
      size: 3,
      tiles: [[1, 2, 3], [4, 5, 6], [7, 8, 0]],
      isSolved: true,
    };
    const newState = reducer(currentState, { type: 'RESET_PUZZLE' });
    expect(newState).toEqual(initialState);
  });

  it('should move a tile when MOVE_TILE action is dispatched with a valid move', () => {
    const currentState = {
      size: 3,
      tiles: [[1, 2, 3], [4, 5, 6], [7, 0, 8]],
      isSolved: false,
    };
    const action = {
      type: 'MOVE_TILE',
      payload: { moveTile: { row: 2, col: 2 } },
    };
    const newState = reducer(currentState, action);
    expect(newState.tiles).toEqual([[1, 2, 3], [4, 5, 6], [7, 8, 0]]);
    expect(newState.isSolved).toBe(true);
  });

  it('should not move a tile when MOVE_TILE action is dispatched with an invalid move', () => {
    const currentState = {
      size: 3,
      tiles: [[1, 2, 3], [4, 5, 6], [7, 0, 8]],
      isSolved: false,
    };
    const action = {
      type: 'MOVE_TILE',
      payload: { moveTile: { row: 0, col: 0 } },
    };
    const newState = reducer(currentState, action);
    expect(newState).toEqual(currentState); // State should remain unchanged
  });
});

// TODO:  we should be able to test this without importing all the helper functions
//         but instead by creating the right calls to the reducer

// describe('Helper Function Tests', () => {
//   it('setTiles should create a 3x3 grid with shuffled tiles', () => {
//     const tiles = setTiles(3, false);
//     expect(tiles.length).toBe(3);
//     expect(tiles.flat().sort((a, b) => a - b)).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8]);
//   });

//   it('findEmptyTile should return the correct position of the empty tile', () => {
//     const tiles = [[1, 2, 3], [4, 5, 6], [7, 0, 8]];
//     const emptyTile = findEmptyTile(tiles, 3);
//     expect(emptyTile).toEqual({ row: 2, col: 1 });
//   });

//   it('moveIsValid should return true for valid moves', () => {
//     const emptyTile = { row: 2, col: 1 };
//     const moveTile = { row: 2, col: 2 };
//     expect(moveIsValid(emptyTile, moveTile)).toBe(true);
//   });

//   it('moveIsValid should return false for invalid moves', () => {
//     const emptyTile = { row: 2, col: 1 };
//     const moveTile = { row: 0, col: 0 };
//     expect(moveIsValid(emptyTile, moveTile)).toBe(false);
//   });

//   it('makeMove should correctly swap the empty tile with the move tile', () => {
//     const tiles = [[1, 2, 3], [4, 5, 6], [7, 0, 8]];
//     const emptyTile = { row: 2, col: 1 };
//     const moveTile = { row: 2, col: 2 };
//     const newTiles = makeMove(tiles, emptyTile, moveTile);
//     expect(newTiles).toEqual([[1, 2, 3], [4, 5, 6], [7, 8, 0]]);
//   });

//   it('puzzleIsSolved should return true for a solved puzzle', () => {
//     const tiles = [[1, 2, 3], [4, 5, 6], [7, 8, 0]];
//     expect(puzzleIsSolved(tiles, 3)).toBe(true);
//   });

//   it('puzzleIsSolved should return false for an unsolved puzzle', () => {
//     const tiles = [[1, 2, 3], [4, 5, 6], [7, 0, 8]];
//     expect(puzzleIsSolved(tiles, 3)).toBe(false);
//   });
// });
