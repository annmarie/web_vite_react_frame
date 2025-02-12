import { useReducer } from 'react';
import { reducer, initialState } from './reducer';
import PropTypes from 'prop-types'
import "./styles.css";

const SidePuzzle = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleTileClick = (row, col) => {
    dispatch({ type: "MOVE_TILE", payload: { moveTile: { row, col } } });
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
        {state.isSolved ? "Game Won" : "Game On"}
      </div>
      <SlidePuzzleBoard tiles={state.tiles} onTileClick={handleTileClick} />
      <button
        aria-label="Reset the game to its initial state"
        data-testid="reset-button"
        onClick={() => dispatch({ type: "RESET_PUZZLE" })}
        disabled={false}
      >
        Reset Game
      </button>
    </div>
  );
};

const SlidePuzzleBoard = ({ tiles, onTileClick }) => (
  <div
    className="slide-puzzle-board"
    aria-label="Slide Puzzle Board"
    role="grid"
  >
    {tiles.map((row, rowIdx) => (
      <div key={rowIdx} className="row">
        {row.map((tile, colIdx) => (
          <SlidePuzzleTile
            key={colIdx}
            tile={tile}
            rowIdx={rowIdx}
            colIdx={colIdx}
            onClick={onTileClick}
          />
        ))}
      </div>
    ))}
  </div>
);

SlidePuzzleBoard.propTypes = {
  tiles: PropTypes.arrayOf(
    PropTypes.arrayOf(PropTypes.number).isRequired
  ).isRequired,
  onTileClick: PropTypes.func.isRequired,
};

const SlidePuzzleTile = ({ tile, rowIdx, colIdx, onClick }) => {
  const ariaLabel = `Tile at row ${rowIdx + 1} and column ${colIdx + 1}`
    + ` with ${tile !== 0 ? tile : "empty"}`;
  return (
    <div
      role="cell"
      key={colIdx}
      aria-label={ariaLabel}
      className={`tile ${tile === 0 ? "empty" : ""}`}
      onClick={() => onClick(rowIdx, colIdx)}
    >
      {tile !== 0 ? tile : ""}
    </div>
  );
};

SlidePuzzleTile.propTypes = {
  tile: PropTypes.number.isRequired,
  rowIdx: PropTypes.number.isRequired,
  colIdx: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default SidePuzzle;
