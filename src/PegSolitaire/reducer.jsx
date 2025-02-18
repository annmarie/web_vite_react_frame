import { MAKE_MOVE, UNDO_MOVE, RESET_GAME, SELECT_PEG } from './actionTypes';
import { initializeBoard, hasWinningMove, hasMovesLeft, jumpPeg, validateJump } from './utils';

export const initialState = {
  board: initializeBoard(),
  selectedPeg: null,
  winner: false,
  movesLeft: true,
  history: [],
};

export const reducer = (state,  action) => {
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

const reduceSelectPeg = (state, action) => {
  const { row, col } = action.payload;
  if (state.board[row][col] !== 1) return state;
  return { ...state, selectedPeg: action.payload };
};

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
