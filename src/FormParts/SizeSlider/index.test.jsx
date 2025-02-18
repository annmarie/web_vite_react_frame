import { render, screen, fireEvent } from '@testing-library/react';
import SizeSlider from '../SizeSlider';

describe('SizeSlider Component', () => {
  const sizes = ['Small', 'Medium', 'Large'];
  const selected = 1;
  const onChangeMock = jest.fn();

  it('should render the component correctly', () => {
    render(<SizeSlider sizes={sizes} selected={selected} onChange={onChangeMock} />);
    expect(screen.getByLabelText('Size:')).toBeInTheDocument();
    const slider = screen.getByTestId('size-slider');
    expect(slider).toBeInTheDocument();
    expect(slider).toHaveAttribute('type', 'range');
    expect(slider).toHaveAttribute('min', '0');
    expect(slider).toHaveAttribute('max', `${sizes.length - 1}`);
    expect(slider).toHaveValue(`${selected}`);
  });

  it('should render the sizes correctly', () => {
    render(<SizeSlider sizes={sizes} selected={selected} onChange={onChangeMock} />);
    sizes.forEach((size) => {
      expect(screen.getByLabelText(`Size: ${size}`)).toBeInTheDocument();
    });
  });

  it('should call onChange when the slider value changes', () => {
    render(<SizeSlider sizes={sizes} selected={selected} onChange={onChangeMock} />);
    const slider = screen.getByTestId('size-slider');
    fireEvent.change(slider, { target: { value: '2' } });
    expect(onChangeMock).toHaveBeenCalledWith(2);
  });

  it('should not log PropTypes warnings in the console', () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    render(<SizeSlider sizes={sizes} selected={selected} onChange={onChangeMock} />);
    expect(consoleErrorSpy).not.toHaveBeenCalled();
    consoleErrorSpy.mockRestore();
  });
});
