import { useReducer, useRef } from "react";
import PropsTypes from 'prop-types';
import { SET_NUM, SET_COLOR, SET_SIZE, RESET_FORM } from './actionTypes';
import { reducer, initialState } from './reducer';
import "./styles.css";

const ColorSelector = ({ colors, selected, onChange }) => (
  <>
    <label htmlFor="color">Color:</label>
    <select
      id="color"
      data-testid="color-select"
      aria-label="Select a color"
      value={selected}
      onChange={(e) => onChange(Number(e.target.value))}
    >
      {colors.map((item, index) => (
        <option key={index} value={index} aria-label={`Color: ${item}`}>
          {item}
        </option>
      ))}
    </select>
  </>
);

ColorSelector.propTypes = {
  colors: PropsTypes.arrayOf(PropsTypes.string).isRequired,
  selected: PropsTypes.number.isRequired,
  onChange: PropsTypes.func.isRequired,
};

const NumberInput = ({ num, onChange, inputRef }) => (
  <>
    <label htmlFor="num">Num:</label>
    <input
      id="num"
      type="number"
      data-testid="num-input"
      aria-label="Enter a number"
      ref={inputRef}
      value={num}
      placeholder="Input number"
      onChange={(e) => onChange(Number(e.target.value) || "")}
    />
  </>
);

NumberInput.propTypes = {
  num: PropsTypes.oneOfType([PropsTypes.number, PropsTypes.string]).isRequired,
  onChange: PropsTypes.func.isRequired,
  inputRef: PropsTypes.shape({ current: PropsTypes.instanceOf(Element) })
}

const SizeSlider = ({ sizes, selected, onChange }) => (
  <>
    <label htmlFor="size">Size:</label>
    <div className="slider-range">
      <input
        id="size"
        data-testid="size-slider"
        aria-label="Select a size value"
        type="range"
        min="0"
        max={sizes.length - 1}
        value={selected}
        onChange={(e) => onChange(Number(e.target.value))}
      />
      <div>
        {sizes.map((size, index) => (
          <span key={index} aria-label={`Size: ${size}`}>
            {size}
          </span>
        ))}
      </div>
    </div>
  </>
);

SizeSlider.propTypes = {
  sizes: PropsTypes.arrayOf(PropsTypes.string).isRequired,
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
          colors={state.colors}
          selected={state.colorKey}
          onChange={(value) => dispatch({ type: SET_COLOR, payload: value })}
        />
      </div>

      <div className="row-item">
        <NumberInput
          num={state.num}
          onChange={(num) => dispatch({ type: SET_NUM, payload: num })}
          inputRef={numRef}
        />
      </div>

      <div className="row-item">
        <SizeSlider
          sizes={state.sizes}
          selected={state.sizeKey}
          onChange={(size) => dispatch({ type: SET_SIZE, payload: size})}
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
