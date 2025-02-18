import { MOVE_TILE, RESET_PUZZLE } from './actionTypes';
import { reducer, initialState } from './reducer';

describe('Reducer Tests', () => {
  test('should return the initial state when no action is provided', () => {
    const newState = reducer(undefined, {});
    expect(newState).toStrictEqual(initialState);
  });

  it('should return current state for unknown action type', () => {
    const state = {
      ...initialState,
      tiles:  [[1, 2], [3, 0]],
      isSolved: true
    };
    const newState = reducer(state, { type: 'UNKNOWN_ACTION' });
    expect(newState).toStrictEqual(state);
  });

  it('should reset the puzzle to initial state', () => {
    const state = {
      ...initialState,
      tiles: [[1, 2, 3], [4, 5, 6], [7, 8, 0]],
      isSolved: true,
    };
    const newState = reducer(state, { type: RESET_PUZZLE });
    expect(newState.isSolved).toBe(false);
    expect(newState.titles).not.toBe(state.tiles);
  });

  it('should move a tile when with a valid Winning move', () => {
    const state = {
      ...initialState,
      tiles: [[1, 2, 3], [4, 5, 6], [7, 0, 8]],
    };
    const newState = reducer(
      state,
      { type: MOVE_TILE, payload: { moveTile: { row: 2, col: 2 }}}
    );
    expect(newState.tiles).toEqual([[1, 2, 3], [4, 5, 6], [7, 8, 0]]);
    expect(newState.isSolved).toBe(true);
  });

  it('should not move a tile with an invalid move', () => {
    const state = {
      tiles: [[1, 2, 3], [4, 5, 6], [7, 0, 8]],
      isSolved: false,
    };
    const newState = reducer(
      state,
      { type: MOVE_TILE, payload: { moveTile: { row: 0, col: 0 }}}
    );
    expect(newState).toStrictEqual(state);
  });
});
