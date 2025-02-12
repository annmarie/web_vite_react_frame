import { useReducer } from 'react';
import PropTypes from 'prop-types';
import { MAKE_MOVE, UNDO_MOVE, RESET_GAME } from "./actionTypes";
import { PLAYER_ONE, PLAYER_TWO } from "./globals";
import { reducer, initialState } from "./reducer";
import './styles.css';

const Connect4Cell = ({ cell, rowIndex, colIndex, onCellClick }) => {
  const getPlayerClass = (cell) => {
    return cell === PLAYER_ONE ? 'player_one' : cell === PLAYER_TWO ? 'player_two' : '';
  };

  return (
    <div
      key={colIndex}
      className="connect4-cell"
      onClick={() => onCellClick(colIndex)}
      role="cell"
      aria-label={`Spot row ${rowIndex} and col ${colIndex} with ${cell || 'empty'}`}
    >
      {cell && (
        <div
          className={`checker ${getPlayerClass(cell)}`}
          data-testid={`checker-${cell || 'empty'}`}
        ></div>
      )}
    </div>
  );
};

Connect4Cell.propTypes = {
  cell: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  rowIndex: PropTypes.number.isRequired,
  colIndex: PropTypes.number.isRequired,
  onCellClick: PropTypes.func.isRequired,
};

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
              <Connect4Cell
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
