import { useRef, useState } from 'react';
import ColorSelector from './ColorSelector';
import NumberInput from './NumberInput';
import SizeSlider from './SizeSlider';
import './styles.css';

const initialState = {
  num: 0,
  sizeKey: 2,
  colorKey: 1,
  sizes: ['XL', 'L', 'M', 'S'],
  colors: ['Blue', 'Green', 'Yellow', 'Black']
};

const cleanKey = (key, min, max) => {
  return Math.min(Math.max(key, min), max);
};

const FormParts = () => {
  const [state, setState] = useState(initialState);
  const numRef = useRef(null);

  const resetFormClick = () => {
    setState(initialState)
    numRef.current?.focus();
  };

  const colorFormClick = (value) => {
    setState({ ...state, colorKey: cleanKey(value, 0, state.colors.length) })
  }

  const sizeFormClick = (value) => {
    setState({ ...state, sizeKey: cleanKey(value, 0, state.sizes.length) })
  }

  const numFormClick = (value) => {
    setState({ ...state, num: value })
  }

  return (
    <div className="form-parts-container">
      <h3 className="row-item">Form Fun</h3>

      <div className="row-item">
        <ColorSelector
          colors={state.colors}
          selected={state.colorKey}
          onChange={colorFormClick}
        />
      </div>

      <div className="row-item">
        <NumberInput
          num={state.num}
          onChange={numFormClick}
          inputRef={numRef}
        />
      </div>

      <div className="row-item">
        <SizeSlider
          sizes={state.sizes}
          selected={state.sizeKey}
          onChange={sizeFormClick}
        />
      </div>

      <div
        aria-label="Form Status"
        className="row-item results"
        role="status"
        aria-live="polite"
      >
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
          onClick={resetFormClick}
        >
          Reset Form
        </button>
      </div>
    </div>
  );
};

export default FormParts;
