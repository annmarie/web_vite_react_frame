import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ColorSelector from '../ColorSelector';

describe('ColorSelector Component', () => {
  const colorsMock = ['Red', 'Green', 'Blue'];
  const onChangeMock = jest.fn();

  it('should render the component correctly', () => {
    render(<ColorSelector colors={colorsMock} selected={1} onChange={onChangeMock} />);
    expect(screen.getByLabelText('Color:')).toBeInTheDocument();
    const select = screen.getByTestId('color-select');
    expect(select).toBeInTheDocument();
    expect(select).toHaveValue('1');
    const options = screen.getAllByRole('option');
    expect(options).toHaveLength(colorsMock.length);
    expect(options[0]).toHaveTextContent('Red');
    expect(options[1]).toHaveTextContent('Green');
    expect(options[2]).toHaveTextContent('Blue');
  });

  it('should call onChange when a new color is selected', () => {
    render(<ColorSelector colors={colorsMock} selected={1} onChange={onChangeMock} />);
    const select = screen.getByTestId('color-select');
    fireEvent.change(select, { target: { value: '2' } });
    expect(onChangeMock).toHaveBeenCalledWith(2);
  });

  it('should render the correct option as selected', () => {
    render(<ColorSelector colors={colorsMock} selected={0} onChange={onChangeMock} />);
    const select = screen.getByTestId('color-select');
    expect(select).toHaveValue('0');
    expect(screen.getByText('Red').selected).toBe(true);
  });

  it('should not log PropTypes warnings in the console', () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    render(<ColorSelector colors={colorsMock} selected={1} onChange={onChangeMock} />);
    expect(consoleErrorSpy).not.toHaveBeenCalled();
    consoleErrorSpy.mockRestore();
  });

  it('should handle an empty colors array gracefully', () => {
    render(<ColorSelector colors={[]} selected={0} onChange={onChangeMock} />);
    const select = screen.getByTestId('color-select');
    expect(select).toBeInTheDocument();
    expect(select.children).toHaveLength(0);
  });
});
