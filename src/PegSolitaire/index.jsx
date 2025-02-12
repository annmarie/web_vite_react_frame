import { useReducer } from "react";
import { MAKE_MOVE, UNDO_MOVE, RESET_GAME, SELECT_PEG } from './actionTypes';
import { reducer, initialState } from "./reducer";
import "./styles.css";

const PegSolitaire = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleCellClick = (row, col) => {
    const cellValue = state.board[row][col];

    if (cellValue === 1) {
      dispatch({ type: SELECT_PEG, payload: { row, col } });
    } else if (cellValue === 0 && state.selectedPeg) {
      dispatch({ type: MAKE_MOVE, payload: { endRow: row, endCol: col } });
    }
  };

  return (
    <div className="peg-game">
      <div
        aria-label="Game Status"
        className="peg-game-status"
        role="status"
        aria-live="polite"
      >
        {state.winner
          ? "Game Won"
          : state.movesLeft === false
            ? `No moves left`
            : `Jump the pegs to the open spot`}
      </div>

      <div
        className="peg-board"
        role="grid"
        aria-label="Peg Solitaire Board"
      >
        {state.board.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              className={`cell ${cell === 1
                ? "peg"
                : cell === 0
                  ? "empty" : "invalid"
                } ${state.selectedPeg?.row === rowIndex &&
                  state.selectedPeg?.col === colIndex
                  ? "selected" : ""
                }`}
              onClick={() => handleCellClick(rowIndex, colIndex)}
              role="button"
              aria-label={`Cell at row ${rowIndex + 1}, column ${colIndex + 1
                } is ${cell === 1
                  ? "a peg"
                  : cell === 0 ? "empty" : "not playable"
                }${state.selectedPeg?.row === rowIndex &&
                  state.selectedPeg?.col === colIndex
                  ? " and selected" : ""
                }`}
              aria-disabled={cell === null || cell === "invalid"}
            ></div>
          ))
        )}
      </div>

      <div className="peg-actions">
        <button
          aria-label="Undo the last move"
          onClick={() => dispatch({ type: UNDO_MOVE })}
          disabled={state.history.length === 0 || state.winner}
        >
          Undo
        </button>
        <button
          aria-label="Reset the game to its initial state"
          onClick={() => dispatch({ type: RESET_GAME })}
          disabled={state.history.length === 0}
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default PegSolitaire;
