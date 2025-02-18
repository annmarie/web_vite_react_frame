import { useReducer, useRef } from 'react';
import { SET_NUM, SET_COLOR, SET_SIZE, RESET_FORM } from './actionTypes';
import { reducer, initialState } from './reducer';
import ColorSelector from './ColorSelector';
import NumberInput from './NumberInput';
import SizeSlider from './SizeSlider';
import './styles.css';

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
