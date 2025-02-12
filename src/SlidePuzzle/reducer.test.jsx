import { MOVE_TILE, RESET_PUZZLE } from "./actionTypes";
import { reducer, initialState } from './reducer';

describe('Reducer Tests', () => {
  test('should return the initial state when no action is provided', () => {
    const newState = reducer(undefined, {});
    expect(newState).toEqual(initialState);
  });

  it('should reset the puzzle when RESET_PUZZLE action is dispatched', () => {
    const state = {
      ...initialState,
      tiles: [[1, 2, 3], [4, 5, 6], [7, 8, 0]],
      isSolved: true,
    };
    const newState = reducer(state, { type: RESET_PUZZLE });
    expect(newState.isSolved).toBe(false);
    expect(newState.titles).not.toBe(state.tiles);
  });

  it('should move a tile when MOVE_TILE action is dispatched with a valid move', () => {
    const state = {
      ...initialState,
      tiles: [[1, 2, 3], [4, 5, 6], [7, 0, 8]],
    };
    const action = {
      type: MOVE_TILE,
      payload: { moveTile: { row: 2, col: 2 } },
    };
    const newState = reducer(state, action);
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
      type: MOVE_TILE,
      payload: { moveTile: { row: 0, col: 0 } },
    };
    const newState = reducer(currentState, action);
    expect(newState).toEqual(currentState); // State should remain unchanged
  });
});
