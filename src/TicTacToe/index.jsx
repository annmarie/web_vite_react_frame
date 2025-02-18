import { useReducer } from 'react';
import { MAKE_MOVE, RESET_GAME, UNDO_MOVE } from './actionTypes';
import { DRAW_MESSAGE, UNDO_BUTTON_TEXT, RESET_BUTTON_TEXT } from './globals';
import { initialState, reducer } from './reducer';
import './styles.css';

const TicTacToe = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleCellClick = (index) => {
    if (state.board[index] || state.winner) return;
    dispatch({ type: MAKE_MOVE, payload: { index } });
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
            ? DRAW_MESSAGE
            : `Player: ${state.player}`}
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
          onClick={() => dispatch({ type: UNDO_MOVE })}
          disabled={state.history.length === 0 || state.winner}
        >
          {UNDO_BUTTON_TEXT}
        </button>
        <button
          aria-label="Reset Game"
          onClick={() => dispatch({ type: RESET_GAME })}
          disabled={state.history.length === 0}
        >
          {RESET_BUTTON_TEXT}
        </button>
      </div>
    </div>
  );
};

export default TicTacToe;
