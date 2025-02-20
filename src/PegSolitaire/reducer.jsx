/**
 * PegSolitaire reducer
 */
import {
  MAKE_MOVE, UNDO_MOVE,
  RESET_GAME, SELECT_PEG
} from './actionTypes';
import {
  initializeBoard, hasWinningMove, hasMovesLeft,
  jumpPeg, validateJump
} from './utils';

/**
 * The initial state of the game.
 * @type {Object}
 * @property {Array} board - The game board represented as a 2D array.
 * @property {Object|null} selectedPeg - The currently selected peg, containing row and column indices.
 * @property {boolean} winner - Indicates if there is a winner.
 * @property {boolean} movesLeft - Indicates if there are any valid moves left.
 * @property {Array} history - Stores the history of board states for undo functionality.
 */
export const initialState = {
  board: initializeBoard(),
  selectedPeg: null,
  winner: false,
  movesLeft: true,
  history: [],
};

/**
 * Reducer function to handle state transitions based on dispatched actions.
 * @param {Object} state - The current state of the game.
 * @param {Object} action - The action to be processed.
 * @param {string} action.type - The type of action being dispatched.
 * @param {Object} [action.payload] - The payload containing additional data for the action.
 * @returns {Object} The updated state after processing the action.
 */
export const reducer = (state, action) => {
  switch (action.type) {
    case SELECT_PEG:
      return reduceSelectPeg(state, action);

    case MAKE_MOVE:
      return reduceMakeMove(state, action);

    case UNDO_MOVE:
      return reduceUndoMove(state);

    case RESET_GAME:
      return { ...initialState, board: initializeBoard() };

    default:
      return state || initialState;
  }
};

/**
 * Handles the SELECT_PEG action to select a peg on the board.
 * @param {Object} state - The current state of the game.
 * @param {Object} action - The action containing the payload with the selected peg's position.
 * @param {Object} action.payload - The payload containing the row and column of the selected peg.
 * @param {number} action.payload.row - The row index of the selected peg.
 * @param {number} action.payload.col - The column index of the selected peg.
 * @returns {Object} The updated state with the selected peg.
 */
const reduceSelectPeg = (state, action) => {
  const { row, col } = action.payload;
  if (state.board[row][col] !== 1) return state;
  return { ...state, selectedPeg: action.payload };
};

/**
 * Handles the MAKE_MOVE action to perform a move on the board.
 * @param {Object} state - The current state of the game.
 * @param {Object} action - The action containing the payload with the move's target position.
 * @param {Object} action.payload - The payload containing the target row and column.
 * @param {number} action.payload.endRow - The target row index for the move.
 * @param {number} action.payload.endCol - The target column index for the move.
 * @returns {Object} The updated state after performing the move.
 */
const reduceMakeMove = (state, action) => {
  if (state.winner || !state.selectedPeg) return state;

  const { endRow, endCol } = action.payload;
  const { row: startRow, col: startCol } = state.selectedPeg;

  if (!validateJump(state.board, startRow, startCol, endRow, endCol)) return state;

  const newBoard = jumpPeg(state.board, startRow, startCol, endRow, endCol, state.board);

  const winner = hasWinningMove(newBoard);
  const movesLeft = winner ? false : hasMovesLeft(newBoard);

  return {
    ...state,
    board: newBoard,
    winner,
    movesLeft,
    selectedPeg: null,
    history: [...state.history, state.board],
  };
};

/**
 * Handles the UNDO_MOVE action to undo the last move.
 * @param {Object} state - The current state of the game.
 * @returns {Object} The updated state after undoing the last move.
 */
const reduceUndoMove = (state) => {
  if (state.history.length === 0 || state.winner) return state;

  const previousBoard = state.history[state.history.length - 1];

  return {
    ...state,
    board: previousBoard,
    winner: hasWinningMove(previousBoard),
    movesLeft: hasMovesLeft(previousBoard),
    selectedPeg: null,
    history: state.history.slice(0, -1),
  };
};
