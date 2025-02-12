import { useReducer, useRef } from "react";
import PropsTypes from 'prop-types';
import { SET_NUM, SET_COLOR, SET_SIZE, RESET_FORM } from './actionTypes';
import { reducer, initialState } from './reducer';
import "./styles.css";

// Selector Component
const ColorSelector = ({ options, selected, onChange }) => (
  <>
    <label htmlFor="color">Color:</label>
    <select
      id="color"
      data-testid="color-select"
      aria-label="Select a color"
      value={selected}
      onChange={(e) => onChange(Number(e.target.value))}
    >
      {options.map((item, index) => (
        <option key={index} value={index} aria-label={`Color: ${item}`}>
          {item}
        </option>
      ))}
    </select>
  </>
);

ColorSelector.propTypes = {
  options: PropsTypes.arrayOf(PropsTypes.string).isRequired,
  selected: PropsTypes.number.isRequired,
  onChange: PropsTypes.func.isRequired,
};

// Number Input Component
const NumberInput = ({ value, onChange, inputRef }) => (
  <>
    <label htmlFor="num">Num:</label>
    <input
      id="num"
      type="number"
      data-testid="num-input"
      aria-label="Enter a number"
      ref={inputRef}
      value={value}
      placeholder="Input number"
      onChange={(e) => onChange(Number(e.target.value) || "")}
    />
  </>
);

NumberInput.propTypes = {
  value: PropsTypes.oneOfType([PropsTypes.number, PropsTypes.string]).isRequired,
  onChange: PropsTypes.func.isRequired,
  inputRef: PropsTypes.shape({ current: PropsTypes.instanceOf(Element) })
}

// Slider Component
const SizeSlider = ({ options, selected, onChange }) => (
  <>
    <label htmlFor="size">Size:</label>
    <div className="slider-range">
      <input
        id="size"
        data-testid="size-slider"
        aria-label="Select a size value"
        type="range"
        min="0"
        max={options.length - 1}
        value={selected}
        onChange={(e) => onChange(Number(e.target.value))}
      />
      <div>
        {options.map((item, index) => (
          <span key={index} aria-label={`Size: ${item}`}>
            {item}
          </span>
        ))}
      </div>
    </div>
  </>
);

SizeSlider.propTypes = {
  options: PropsTypes.arrayOf(PropsTypes.string).isRequired,
  selected: PropsTypes.number.isRequired,
  onChange: PropsTypes.func.isRequired,
};


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
        <ColorSelector
          options={state.colors}
          selected={state.colorKey}
          onChange={(value) => dispatch({ type: SET_COLOR, payload: value })}
        />
      </div>

      <div className="row-item">
        <NumberInput
          value={state.num}
          onChange={(value) => dispatch({ type: SET_NUM, payload: value })}
          inputRef={numRef}
        />
      </div>

      <div className="row-item">
        <SizeSlider
          options={state.sizes}
          selected={state.sizeKey}
          onChange={(value) => dispatch({ type: SET_SIZE, payload: value })}
        />
      </div>

      <div className="row-item results">
        <ul>
          <li>Num: {state.num || 0}</li>
          <li>Size: {state.sizes[state.sizeKey] || ''}</li>
          <li>Color: {state.colors[state.colorKey] || ''}</li>
        </ul>
      </div>

      <div className="row-item form-buttons">
        <button
          aria-label="Reset the form and start over"
          data-testid="reset-button"
          onClick={resetForm}
        >
          Reset Form
        </button>
      </div>
    </div>
  );
};

export default FormParts;
