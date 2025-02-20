/**
 * SlidePuzzle reducer
 */
import { MOVE_TILE, RESET_PUZZLE } from './actionTypes';
import { SIZE } from './globals';

import {
  setTiles,
  findEmptyTile,
  moveIsValid,
  makeMove,
  puzzleIsSolved
} from './utils';

/**
 * The initial state of the puzzle.
 * @property {Array} tiles - A 2D array representing the shuffled tiles of the puzzle.
 * @property {boolean} isSolved - A flag indicating whether the puzzle is solved.
 */
export const initialState = {
  tiles: setTiles(SIZE, false),
  isSolved: false,
};

/**
 * Reducer function to handle state transitions based on actions.
 * @param {Object} state - The current state of the puzzle.
 * @param {Object} action - The action to be processed, containing a type and optional payload.
 * @returns {Object} - The new state after applying the action.
 */
export const reducer = (state, action) => {
  switch (action.type) {
    case MOVE_TILE:
      return reduceMoveTile(state, action);

    case RESET_PUZZLE:
      return { ...initialState, tiles: setTiles(SIZE, false) };

    default:
      return state || initialState;
  }
};

/**
 * Handles the MOVE_TILE action
 * @param {Object} state - The current state of the puzzle.
 * @param {Object} action - The action containing the tile to move in its payload.
 * @returns {Object} - The new state after attempting the move.
 */
function reduceMoveTile(state, action) {
  const { moveTile } = action.payload;
  const { tiles } = state;
  const emptyTile = findEmptyTile(tiles);

  if (moveIsValid(emptyTile, moveTile)) {
    const newTiles = makeMove(tiles, emptyTile, moveTile);
    const isSolved = puzzleIsSolved(newTiles);
    return { ...state, tiles: newTiles, isSolved };
  }

  return state;
}
