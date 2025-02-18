import PropsTypes from 'prop-types';

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
      onChange={(e) => onChange(Number(e.target.value) || '')}
    />
  </>
);

NumberInput.propTypes = {
  num: PropsTypes.oneOfType([PropsTypes.number, PropsTypes.string]).isRequired,
  onChange: PropsTypes.func.isRequired,
  inputRef: PropsTypes.shape({ current: PropsTypes.instanceOf(Element) })
}

export default NumberInput;
