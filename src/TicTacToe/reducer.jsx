/**
 * TicTacToe reducer
 */
import { MAKE_MOVE, RESET_GAME, UNDO_MOVE } from './actionTypes';
import { PLAYER_ONE, PLAYER_TWO } from './globals';
import { calculateWinner, isBoardFull, initializeBoard } from './utils';

/**
 * Initial state of the game.
 * - `board`: Represents the game board
 * - `player`: Tracks the current player, starting with PLAYER_ONE.
 * - `winner`: Tracks the winner of the game, null if no winner yet.
 * - `boardFull`: Boolean indicating if the board is full.
 * - `history`: Array storing previous board states for undo functionality.
 */
export const initialState = {
  board: initializeBoard(),
  player: PLAYER_ONE,
  winner: null,
  boardFull: false,
  history: [],
};

/**
 * Reducer function to manage the state of the game.
 *
 * @param {Object} state - The current state of the game.
 * @param {Object} action - The action to be processed.
 * @returns {Object} - The new state after processing the action.
 */
export const reducer = (state, action) => {
  switch (action.type) {
    case MAKE_MOVE:
      return reduceMakeMove(state, action);

    case UNDO_MOVE:
      return reduceUndoMove(state);

    case RESET_GAME:
      // Resets the game to its initial state
      return { ...initialState, board: initializeBoard() };

    default:
      // Returns the current state if the action type is unrecognized
      return state || initialState;
  }
};

/**
 * Handles the logic for making a move.
 *
 * @param {Object} state - The current state of the game.
 * @param {Object} action - The action containing the move details.
 * @returns {Object} - The updated state after making the move.
 */
const reduceMakeMove = (state, action) => {
  const { index } = action.payload;

  if (state.winner || state.board[index]) {
    return state;
  }

  const newBoard = [...state.board];
  newBoard[index] = state.player;

  return {
    ...state,
    board: newBoard,
    player: togglePlayer(state.player),
    winner: calculateWinner(newBoard),
    boardFull: isBoardFull(newBoard),
    history: [...state.history, state.board],
  };
};

/**
 * Handles the logic for undoing the last move.
 *
 * @param {Object} state - The current state of the game.
 * @returns {Object} - The updated state after undoing the move.
 */
const reduceUndoMove = (state) => {
  if (
    state.history.length === 0 ||
    state.winner
  ) {
    return state;
  }

  const previousBoard = state.history[state.history.length - 1];
  return {
    ...state,
    board: previousBoard,
    player: togglePlayer(state.player),
    winner: null,
    history: state.history.slice(0, -1),
  };
};

/**
 * Toggles the current player between PLAYER_ONE and PLAYER_TWO.
 *
 * @param {string} player - The current player.
 * @returns {string} - The next player.
 */
export function togglePlayer(player) {
  return player === PLAYER_ONE ? PLAYER_TWO : PLAYER_ONE;
}
