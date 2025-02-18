import { MAKE_MOVE, UNDO_MOVE, RESET_GAME } from './actionTypes';
import { PLAYER_ONE } from './globals';
import { dropChecker, checkWin, isBoardFull, togglePlayer } from './utils'

export const initialState = {
  board: Array.from({ length: 6 }, () => Array(7).fill(null)),
  currentPlayer: PLAYER_ONE,
  winner: null,
  winnerDesc: '',
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
      return { ...initialState }
    default:
      return state || initialState;
  }
};

const reduceMakeMove = (state, action) => {
  const { col } = action.payload;
  if (state.winner) return state;
  const { board, currentPlayer: player } = state;
  const { currentMove, newBoard } = dropChecker(col, board, player);
  if (!currentMove) return state;
  const { haveWinner, desc } = checkWin(newBoard, currentMove);
  const boardFull = isBoardFull(newBoard);

  return {
    ...state,
    board: newBoard,
    winner: haveWinner ? state.currentPlayer : null,
    winnerDesc: haveWinner ? desc : '',
    boardFull,
    currentPlayer: togglePlayer(state.currentPlayer),
    history: [...state.history, state.board],
  };
};

const reduceUndoMove = (state) => {
  if (state.history.length === 0 || state.winner) return state;

  const previousBoard = state.history[state.history.length - 1];
  return {
    ...state,
    board: previousBoard,
    currentPlayer: togglePlayer(state.currentPlayer),
    winner: null,
    history: state.history.slice(0, -1),
  };
};
