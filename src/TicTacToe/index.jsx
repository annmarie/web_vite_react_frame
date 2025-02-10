import { useReducer } from 'react';
import { initialState, reducer } from "./reducer";
import './styles.css';

const TicTacToe = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleCellClick = (index) => {
    if (state.board[index] || state.winner) return;
    dispatch({ type: 'MAKE_MOVE', payload: { index } });
  };

  return (
    <div className="tic-tac-toe-game">
      <h3 className="tic-tac-toe-title">Tic Tac Toe</h3>
      <div
        aria-label="Game Status"
        className="tic-tac-toe-status"
        role="status"
        aria-live="polite"
      >
        {state.winner
          ? `Winner: ${state.winner}`
          : state.boardFull
            ? `It's a draw!`
            : `Current Player: ${state.currentPlayer}`}
      </div>
      <div className="tic-tac-toe-board">
        <div className="tic-tac-toe-cells">
          {state.board.map((cell, index) => (
            <div
              key={index}
              className={`tic-tac-toe-cell ${cell || 'empty'}`}
              onClick={() => handleCellClick(index)}
              aria-label={`Cell ${index}: ${cell || 'empty'}`}
              role="cell"
            >
              {cell}
            </div>
          ))}
        </div>
      </div>
      <div className="tic-tac-toe-actions">
        <button
          aria-label="Undo Move"
          onClick={() => dispatch({ type: "UNDO_MOVE" })}
          disabled={state.history.length === 0 || state.winner}
        >
          Undo
        </button>
        <button
          aria-label="Reset Game"
          onClick={() => dispatch({ type: "RESET_GAME" })}
          disabled={state.history.length === 0}
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default TicTacToe;
