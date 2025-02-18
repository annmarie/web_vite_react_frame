import { render, screen, fireEvent, act } from '@testing-library/react';
import { createRef } from 'react';
import NumberInput from '../NumberInput';

describe('NumberInput Component', () => {
  const onChangeMock = jest.fn();
  const inputRefMock = createRef();

  it('should render the component correctly', () => {
    render(<NumberInput num={42} onChange={onChangeMock} inputRef={inputRefMock} />);
    expect(screen.getByLabelText('Num:')).toBeInTheDocument();
    const input = screen.getByTestId('num-input');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('type', 'number');
    expect(input).toHaveAttribute('placeholder', 'Input number');
    expect(input).toHaveValue(42);
  });

  it('should call onChange when the input value changes', async () => {
    await act(async () => render(<NumberInput num={42} onChange={onChangeMock} inputRef={inputRefMock} />));
    const input = screen.getByTestId('num-input');
    await act(async () => fireEvent.change(input, { target: { value: '100' } }));
    expect(onChangeMock).toHaveBeenCalledWith(100);
    await act(async () => fireEvent.change(input, { target: { value: '' } }));
    expect(onChangeMock).toHaveBeenCalledWith('');
  });

  it('should handle inputRef correctly', () => {
    render(<NumberInput num={42} onChange={onChangeMock} inputRef={inputRefMock} />);
    const input = screen.getByTestId('num-input');
    expect(inputRefMock.current).toBe(input);
  });

  it('should not log PropTypes warnings in the console', () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    render(<NumberInput num={42} onChange={onChangeMock} inputRef={inputRefMock} />);
    expect(consoleErrorSpy).not.toHaveBeenCalled();
    consoleErrorSpy.mockRestore();
  });

  it('should render correctly with a string value for num', () => {
    render(<NumberInput num="42" onChange={onChangeMock} inputRef={inputRefMock} />);
    const input = screen.getByTestId('num-input');
    expect(input).toHaveValue(42);
  });
});
