import PropsTypes from 'prop-types';
import './styles.css'

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

export default SizeSlider;
