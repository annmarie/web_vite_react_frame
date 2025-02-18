import { MOVE_TILE, RESET_PUZZLE } from './actionTypes';
import { SIZE } from './globals';
import {
  setTiles,
  findEmptyTile,
  moveIsValid,
  makeMove,
  puzzleIsSolved
} from './utils'

export const initialState = {
  tiles: setTiles(SIZE, false),
  isSolved: false,
}

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
