import { useReducer } from "react";
import { reducer, initialState } from "./reducer";
import './styles.css'

const SidePuzzle = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleTileClick = (row, col) => {
    dispatch({ type: "MOVE_TILE", payload: { moveTile: { row, col } } });
  };

  const handleReset = () => {
    dispatch({ type: "RESET_PUZZLE" });
  };

  return (
    <div>
      <div className="slide-puzzle">
        {state.tiles.map((row, rIdx) => (
          <div key={rIdx} className="row">
            {row.map((tile, cIdx) => (
              <div
                role='cell'
                key={cIdx}
                className={`tile ${tile === 0 ? "empty" : ""}`}
                onClick={() => handleTileClick(rIdx, cIdx)}
              >
                {tile !== 0 ? tile : ""}
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="status">
        {state.isSolved ? "You won!" : "Game on"}
      </div>
      <button onClick={handleReset}>Reset Puzzle</button>
    </div>
  );
}

export default SidePuzzle;
