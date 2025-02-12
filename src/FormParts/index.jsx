import { useReducer, useRef } from "react";
import { SET_NUM, SET_COLOR, SET_SIZE, RESET_FORM } from './actionTypes'
import { reducer, initialState } from './reducer';
import "./styles.css";

const FormParts = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const numRef = useRef(null);

  const resetForm = () => {
    dispatch({ type: RESET_FORM });
    numRef.current?.focus();
  };

  return (
    <div className="form-parts-container">
      <h3 className="row-item">Form Parts</h3>

      <div className="row-item">
        <label htmlFor="color">Color:</label>
        <select
          id="color"
          data-testid="color-select"
          aria-label="Select a color"
          value={state.colorKey}
          onChange={(e) => dispatch({ type: SET_COLOR, payload: e.target.value })}
        >
          {state.colors.map((str, index) => (
            <option
              aria-label={`Color: ${str}`}
              value={index}
              key={index}
            >
              {str}
            </option>
          ))}
        </select>
      </div>

      <div className="row-item">
        <label htmlFor="num">Num:</label>
        <input
          id="num"
          type="number"
          data-testid="num-input"
          aria-label="Enter a number"
          ref={numRef}
          value={state.num}
          placeholder="input number"
          onChange={(e) => dispatch({ type: SET_NUM, payload: Number(e.target.value) || "" })}
        />
      </div>

      <div className="row-item">
        <label htmlFor="size">Size:</label>
        <div className="slider-range">
          <input
            id="size"
            data-testid="size-slider"
            aria-label="Select a size value"
            type="range"
            min="0"
            max="3"
            value={state.sizeKey}
            onChange={(e) => dispatch({ type: SET_SIZE, payload: e.target.value })}
          />
          <div>
            {state.sizes.map((str, index) => (
              <span
                aria-label={`Size: ${str}`}
                value={index}
                key={index}
              >
                {str}
              </span>
            ))}
          </div>
        </div>
      </div>


      <div className="row-item results">
        <div>
          <ul>
            <li>Num: {state.num}</li>
            <li>Size: {state.sizes[state.sizeKey]}</li>
            <li>Color: {state.colors[state.colorKey]}</li>
          </ul>
        </div>
      </div>

      <div className="row-item form-buttons">
        <span>
          <button
            aria-label="Reset the form and start over"
            data-testid="reset-button"
            onClick={resetForm}
          >
            Reset Form
          </button>
        </span>
      </div>
    </div>
  );
};

export default FormParts;
