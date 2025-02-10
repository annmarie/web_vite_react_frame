export const PLAYER_ONE = 'X';
export const PLAYER_TWO = 'O';

export const initialState = {
  board: Array(9).fill(null),
  currentPlayer: PLAYER_ONE,
  winner: null,
  boardFull: false,
  history: [],
};

export const reducer = (state, action) => {
  switch (action.type) {
    case 'MAKE_MOVE': {
      const { index } = action.payload;
      if (state.winner || state.board[index]) return state;

      // Set new board and current move
      const newBoard = [...state.board]
      newBoard[index] = state.currentPlayer;

      const winner = calculateWinner(newBoard);
      const boardFull = isBoardFull(newBoard);

      return {
        ...state,
        board: newBoard,
        currentPlayer: state.currentPlayer === PLAYER_ONE ? PLAYER_TWO : PLAYER_ONE,
        winner,
        boardFull,
        history: [...state.history, state.board],
      };
    }
    case 'RESET_GAME': {
      return initialState;
    }
    case 'UNDO_MOVE': {
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
    default:
      return state || initialState;
  }
};

const calculateWinner = (squares) => {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6], // diagonals
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
};

const isBoardFull = (board) => {
  return board.every((square) => square !== null);
};

export default { initialState, reducer, PLAYER_ONE, PLAYER_TWO };
