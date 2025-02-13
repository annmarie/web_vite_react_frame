import { MAKE_MOVE, UNDO_MOVE, RESET_GAME, SELECT_PEG } from './actionTypes';

export const initialState = {
  board: [
    [null, null, 1, 1, 1, null, null],
    [null, null, 1, 1, 1, null, null],
    [1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 0, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1],
    [null, null, 1, 1, 1, null, null],
    [null, null, 1, 1, 1, null, null],
  ],
  selectedPeg: null,
  winner: false,
  movesLeft: true,
  history: [],
}

export const reducer = (state, action) => {

  function hasWinningMove(board) {
    let count = 0;

    for (let row = 0; row < board.length; row++) {
      for (let col = 0; col < board[row].length; col++) {
        if (board[row][col] === 1) {
          count++;
          if (count > 1) {
            return false;
          }
        }
      }
    }
    return count === 1;
  }

  function hasMovesLeft(board) {
    for (let row = 0; row < board.length; row++) {
      for (let col = 0; col < board[row].length; col++) {
        if (board[row][col] === 1 && canJump(board, row, col)) {
          return true;
        }
      }
    }
    return false;
  }

  function canJump(board, row, col) {
    const directions = [
      [-2, 0], // Up
      [2, 0],  // Down
      [0, -2], // Left
      [0, 2],  // Right
    ];

    for (const [x, y] of directions) {
      const midRow = row + x / 2;
      const midCol = col + y / 2;
      const newRow = row + x;
      const newCol = col + y;
      if (
        newRow >= 0 && newRow < board.length &&
        newCol >= 0 && newCol < board[0].length
      ) {
        if (
          board[midRow]?.[midCol] === 1 &&
          board[newRow]?.[newCol] === 0
        ) {
          return true;
        }
      }
    }
    return false;
  }

  const jumpPeg = (startRow, startCol, endRow, endCol) => {
    const newBoard = state.board.map((row) => [...row]);
    newBoard[startRow][startCol] = 0;
    newBoard[endRow][endCol] = 1;
    newBoard[(startRow + endRow) / 2][(startCol + endCol) / 2] = 0;
    return newBoard;
  }

  const validateJump = (startRow, startCol, endRow, endCol) => {
    const rowDiff = Math.abs(startRow - endRow);
    const colDiff = Math.abs(startCol - endCol);
    if ((rowDiff === 2 && colDiff === 0) || (rowDiff === 0 && colDiff === 2)) {
      const midRow = (startRow + endRow) / 2;
      const midCol = (startCol + endCol) / 2;
      return state.board[midRow][midCol] === 1;
    }
    return false;
  };

  switch (action.type) {
    case SELECT_PEG: {
      const { row, col } = action.payload;
      if (state.board[row][col] !== 1) return state;
      return { ...state, selectedPeg: action.payload };
    }
    case MAKE_MOVE: {
      if (state.winner || !state.selectedPeg ) return state;
      const { endRow, endCol } = action.payload;
      const { row: startRow, col: startCol } = state.selectedPeg;

      if (!validateJump(startRow, startCol, endRow, endCol)) return state;

      const newBoard = jumpPeg(startRow, startCol, endRow, endCol, state.board);

      // Only calculate winner and movesLeft if the board changes
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
    }
    case RESET_GAME: {
      return { ...initialState }
    }
    case UNDO_MOVE: {
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
    }
    default:
      return state || initialState;
  }
};

export default { reducer, initialState }
