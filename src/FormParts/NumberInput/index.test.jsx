import { render, screen, fireEvent, act } from '@testing-library/react';
import { createRef } from 'react';
import NumberInput from '../NumberInput';

describe('NumberInput Component', () => {
  const onChangeMock = jest.fn();
  const inputRefMock = createRef();

  it('renders the component correctly', () => {
    render(<NumberInput num={42} onChange={onChangeMock} inputRef={inputRefMock} />);

    // Check if the label is rendered
    expect(screen.getByLabelText('Num:')).toBeInTheDocument();

    // Check if the input is rendered with correct attributes
    const input = screen.getByTestId('num-input');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('type', 'number');
    expect(input).toHaveAttribute('placeholder', 'Input number');
    expect(input).toHaveValue(42);
  });

  it('calls onChange when the input value changes', async () => {
    await act(() => render(<NumberInput num={42} onChange={onChangeMock} inputRef={inputRefMock} />));
    const input = screen.getByTestId('num-input');
    await act(() => fireEvent.change(input, { target: { value: '100' } }));
    expect(onChangeMock).toHaveBeenCalledWith(100);
    await act(() => fireEvent.change(input, { target: { value: '' } }));
    expect(onChangeMock).toHaveBeenCalledWith('');
  });

  it('handles inputRef correctly', () => {
    render(<NumberInput num={42} onChange={onChangeMock} inputRef={inputRefMock} />);
    const input = screen.getByTestId('num-input');
    expect(inputRefMock.current).toBe(input);
  });

  it('does not log PropTypes warnings in the console', () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    render(<NumberInput num={42} onChange={onChangeMock} inputRef={inputRefMock} />);
    expect(consoleErrorSpy).not.toHaveBeenCalled();
    consoleErrorSpy.mockRestore();
  });

  it('renders correctly with a string value for num', () => {
    render(<NumberInput num="42" onChange={onChangeMock} inputRef={inputRefMock} />);
    const input = screen.getByTestId('num-input');
    expect(input).toHaveValue(42);
  });
});
