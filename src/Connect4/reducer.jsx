import { MAKE_MOVE, UNDO_MOVE, RESET_GAME } from "./actionTypes";
import { PLAYER_ONE, PLAYER_TWO } from "./globals";


export const initialState = {
  board:  Array.from({ length: 6 }, () => Array(7).fill(null)),
  currentPlayer: PLAYER_ONE,
  winner: null,
  winnerDesc: '',
  boardFull: false,
  history: [],
};

export const reducer = (state, action) => {
  switch (action.type) {
    case MAKE_MOVE: {
      const { col } = action.payload;

      // If winner state no more moves
      if (state.winner) return state;
      // Set new board and current move
      const { board, currentPlayer: player } = state;
      const { currentMove, newBoard } = dropChecker(col, board, player);
      // if no move found the column is full
      if (!currentMove) return state;

      // check is winning move
      const { haveWinner, desc } = checkWin(newBoard, currentMove);
      // check is board full
      const boardFull = isBoardFull(newBoard);

      return {
        ...state,
        board: newBoard,
        winner: haveWinner ? state.currentPlayer : null,
        winnerDesc: haveWinner ? desc : '',
        boardFull,
        currentPlayer: state.currentPlayer === PLAYER_ONE ? PLAYER_TWO : PLAYER_ONE,
        history: [...state.history, state.board],
      };
    }
    case UNDO_MOVE: {
      if (state.history.length === 0 || state.winner) return state;

      const previousBoard = state.history[state.history.length - 1];
      return {
        ...state,
        board: previousBoard,
        currentPlayer: state.currentPlayer === PLAYER_ONE ? PLAYER_TWO : PLAYER_ONE,
        winner: null,
        history: state.history.slice(0, -1),
      };
    }
    case RESET_GAME:
      return {
        ...initialState,
      };
    default:
      return state ? state : initialState;
  }
};

const dropChecker = (col, board, player) => {
  const newBoard = board.map(row => [ ...row ]);
  let currentMove = null;
  for (let row = newBoard.length - 1; row >= 0; row--) {
    if (!newBoard[row][col]) {
      newBoard[row][col] = player;
      currentMove = { row, col };
      break;
    }
  }
  return { currentMove, newBoard };
}

const isBoardFull = (board) => {
  return board.every(row => row.every(cell => cell !== null));
};

const checkWin = (board, move) => {
  const { row, col } = move;
  const player = board[row][col];
  const directions = [
    { x: 0, y: 1, desc: 'horizontal' },
    { x: 1, y: 0 , desc: 'vertical'},
    { x: 1, y: 1, desc: 'diagonal' },
    { x: 1, y: -1, desc: 'diagonal' }
  ];

  const checkSpot = (r, c) => {
    return (
      r >= 0  && r < board.length
      && c >= 0 && c < board[0].length
      && board[r][c] === player
    )
 };

  const countInDirection = (x, y) => {
    let count = 0;
    let r = row, c = col;

    // Count in the positive direction
    while (checkSpot(r, c)) {
      count++;
      r += x;
      c += y;
    }

    // Count in the negative direction
    r = row - x;
    c = col - y;
    while (checkSpot(r, c)) {
      count++;
      r -= x;
      c -= y;
    }

    return count;
  };

  for (const { x, y, desc } of directions) {
    if (countInDirection(x, y) >= 4) {
      return { haveWinner: true, desc };
    }
  }

  return { haveWinner: false, desc: '' };
};

export default ({ initialState, reducer, PLAYER_ONE, PLAYER_TWO });
