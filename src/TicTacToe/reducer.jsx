import { MAKE_MOVE, RESET_GAME, UNDO_MOVE } from './actionTypes';
import { PLAYER_ONE, PLAYER_TWO } from './globals';
import { calculateWinner, isBoardFull } from './utils';

export const initialState = {
  board: Array(9).fill(null),
  currentPlayer: PLAYER_ONE,
  winner: null,
  boardFull: false,
  history: [],
};

export const reducer = (state, action) => {
  switch (action.type) {
    case MAKE_MOVE:
      return reduceMakeMove(state, action);

    case UNDO_MOVE:
      return reduceUndoMove(state);

    case RESET_GAME:
      return initialState;

    default:
      return state || initialState;
  }
};


const reduceMakeMove = (state, action) => {
  const { index } = action.payload;

  if (state.winner || state.board[index]) {
    return state;
  }

  const newBoard = [...state.board];
  newBoard[index] = state.currentPlayer;

  return {
    ...state,
    board: newBoard,
    currentPlayer: state.currentPlayer === PLAYER_ONE ? PLAYER_TWO : PLAYER_ONE,
    winner: calculateWinner(newBoard),
    boardFull: isBoardFull(newBoard),
    history: [...state.history, state.board],
  };
};

const reduceUndoMove = (state) => {
  if (state.history.length === 0 || state.winner) {
    return state;
  }

  const previousBoard = state.history[state.history.length - 1];
  return {
    ...state,
    board: previousBoard,
    currentPlayer: state.currentPlayer === PLAYER_ONE ? PLAYER_TWO : PLAYER_ONE,
    winner: null,
    history: state.history.slice(0, -1),
  };
};
