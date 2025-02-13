import { useReducer } from 'react';
import { MAKE_MOVE, UNDO_MOVE, RESET_GAME } from "./actionTypes";
import { reducer, initialState } from "./reducer";
import Cell from './Cell';
import './styles.css';


const Connect4 = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleCellClick = (col) => {
    dispatch({ type: MAKE_MOVE, payload: { col } });
  };

  return (
    <div className="connect4-game">
      <h2 className="connect4-title">Connect Four</h2>
      <div aria-label="Game Status" className="connect4-status">
        {state.winner
          ? `Winner: ${state.winner} Winning move (${state.winnerDesc})`
          : state.boardFull
            ? `It's a draw!`
            : `Current Player: ${state.currentPlayer}`}
      </div>
      <div className="connect4-board">
        {state.board.map((row, rowIndex) => (
          <div key={rowIndex} className="connect4-row">
            {row.map((cell, colIndex) => (
              <Cell
                key={colIndex}
                cell={cell}
                rowIndex={rowIndex}
                colIndex={colIndex}
                onCellClick={handleCellClick}
              />
            ))}
          </div>
        ))}
      </div>
      <div className="connect4-actions">
        <button
          aria-label="Undo Move"
          onClick={() => dispatch({ type: UNDO_MOVE })}
          disabled={state.history.length === 0 || state.winner}
        >
          Undo
        </button>
        <button
          aria-label="Reset Game"
          onClick={() => dispatch({ type: RESET_GAME })}
          disabled={state.history.length === 0}
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default Connect4;
