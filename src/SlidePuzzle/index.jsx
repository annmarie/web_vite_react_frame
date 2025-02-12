import { useReducer } from 'react';
import { reducer, initialState } from './reducer';
import './styles.css'

const SidePuzzle = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleTileClick = (row, col) => {
    dispatch({ type: "MOVE_TILE", payload: { moveTile: { row, col } } });
  };

  return (
    <div>
      <div className="slide-puzzle">
        <h3 className="slide-puzzle-title">Slide Puzzle</h3>
        <div
          aria-label="Game Status"
          className="slide-puzzle-status"
          role="status"
          aria-live="polite"
        >
          {state.isSolved ? `Game Won` : `Game On`}
        </div>
        <div
          className="slide-puzzle-board"
          role="grid"
          aria-label="Slide Puzzle Board"
        >
          {state.tiles.map((row, rowIdx) => (
            <div key={rowIdx} className="row">
              {row.map((tile, colIdx) => (
                <div
                  role='cell'
                  key={colIdx}
                  aria-label={`Tile row ${rowIdx + 1} and column ` +
                    `${colIdx + 1} with ${tile !== 0 ? tile : ''}`}
                  className={`tile ${tile === 0 ? "empty" : ""}`}
                  onClick={() => handleTileClick(rowIdx, colIdx)}
                >
                  {tile !== 0 ? tile : ""}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      <button
        aria-label="Reset the game to its initial state"
        onClick={() => dispatch({ type: "RESET_PUZZLE" })}
        disabled={false}
      >
        Reset Puzzle
      </button>
    </div>
  );
}

export default SidePuzzle;
