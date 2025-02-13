import PropsTypes from 'prop-types';

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

export default ColorSelector;
