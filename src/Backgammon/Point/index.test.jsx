import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { PLAYER_RIGHT } from '../globals';
import Point from '../Point';

describe('Point Component', () => {
  const mockPoint = {
    id: 1,
    checkers: 3,
    player: PLAYER_RIGHT,
  };

  const mockOnClick = jest.fn();

  it('renders with the correct class based on point id', async () => {
    await act(() => render(<Point point={mockPoint} onClick={mockOnClick} />));
    const point = screen.getByLabelText(/Point 1 with 3 checkers/);
    expect(point).toHaveClass('point dark top');
  });

  it('renders the correct number of checkers', async () => {
    await act(() => render(<Point point={mockPoint} onClick={mockOnClick} />));
    const checkers = screen.getAllByTestId('checker');
    expect(checkers).toHaveLength(3);
  });

  it('calls onClick with the correct point object when clicked', async () => {
    await act(() => render(<Point point={mockPoint} onClick={mockOnClick} />));
    const point = screen.getByLabelText(/Point 1 with 3 checkers/);
    await act(() => fireEvent.click(point));
    expect(mockOnClick).toHaveBeenCalledWith(mockPoint);
  });
});
