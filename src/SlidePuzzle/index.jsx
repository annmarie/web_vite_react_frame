import { useReducer } from 'react';
import { MOVE_TILE, RESET_PUZZLE } from './actionTypes';
import { reducer, initialState } from './reducer';
import Board from './Board';
import './styles.css';

const SidePuzzle = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleTileClick = (row, col) => {
    dispatch({ type: MOVE_TILE, payload: { moveTile: { row, col } } });
  };

  return (
    <div className="slide-puzzle-game">
      <h3 className="slide-puzzle-title">Slide Puzzle</h3>
      <div
        aria-label="Game Status"
        className="slide-puzzle-status"
        role="status"
        aria-live="polite"
      >
        {state.isSolved ? 'Game Won' : 'Game On'}
      </div>
      <Board tiles={state.tiles} onTileClick={handleTileClick} />
      <button
        aria-label="Reset the game to its initial state"
        data-testid="reset-button"
        onClick={() => dispatch({ type: RESET_PUZZLE })}
        disabled={false}
      >
        Reset Game
      </button>
    </div>
  );
};

export default SidePuzzle;
