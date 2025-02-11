import { useReducer } from 'react';
import { reducer, initialState, PLAYER_ONE, PLAYER_TWO } from "./reducer";
import './styles.css';

const Connect4 = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleCellClick = (col) => {
    dispatch({ type: 'MAKE_MOVE', payload: { col } });
  };

  const handleResetGame = () => dispatch({ type: "RESET_GAME" });
  const handleUndoMove = () => dispatch({ type: "UNDO_MOVE" });

  function getPlayerClass(cell) {
    return cell === PLAYER_ONE ? 'player_one' : cell === PLAYER_TWO ? 'player_two' : '';
  }

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
              <div
                key={colIndex}
                className="connect4-cell"
                onClick={() => handleCellClick(colIndex)}
                role="cell"
                aria-label={`Spot row ${rowIndex} and col ${colIndex} with ${cell || 'empty'}`}
              >
                {cell && <div
                  className={`checker ${getPlayerClass(cell)}`}
                  data-testid={`checker-${cell || 'empty'}`}
                ></div>}
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="connect4-actions">
        <button
          aria-label="Undo Move"
          onClick={handleUndoMove}
          disabled={state.history.length === 0 || state.winner}
        >
          Undo
        </button>
        <button
          aria-label="Reset Game"
          onClick={handleResetGame}
          disabled={state.history.length === 0}
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default Connect4;
