import { render, screen, fireEvent, act } from '@testing-library/react';
import PongGame from '../PongGame';

describe('PongGame Component', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  test('renders the game board with initial score', () => {
    render(<PongGame />);
    expect(screen.getByText(/Player 1: 0/i)).toBeInTheDocument();
    expect(screen.getByText(/Player 2: 0/i)).toBeInTheDocument();
  });

  test('moves paddle1 up and down', () => {
    render(<PongGame />);
    const paddle1 = screen.getByText(/Player 1: 0/i).closest('div').nextSibling;

    // Move paddle1 up
    fireEvent.keyDown(window, { key: 'w' });
    expect(paddle1).toHaveStyle({ top: '130px' }); // Assuming initial position is 150px

    // Move paddle1 down
    fireEvent.keyDown(window, { key: 's' });
    expect(paddle1).toHaveStyle({ top: '150px' }); // Back to original position
  });

  test('moves paddle2 up and down', () => {
    render(<PongGame />);
    const paddle2 = screen.getByText(/Player 2: 0/i).closest('div').nextSibling.nextSibling;

    // Move paddle2 up
    fireEvent.keyDown(window, { key: 'ArrowUp' });
    expect(paddle2).toHaveStyle({ top: '130px' }); // Assuming initial position is 150px

    // Move paddle2 down
    fireEvent.keyDown(window, { key: 'ArrowDown' });
    expect(paddle2).toHaveStyle({ top: '150px' }); // Back to original position
  });

  test('ball resets position and updates score when it goes out of bounds', async () => {
    await act(() => render(<PongGame />));
    const startButton = screen.getByRole('button', { name: /play/i });
    await act(() => fireEvent.click(startButton))
    // Advance time to ensure ball goes out of bounds
    await act(() => jest.advanceTimersByTime(5000));
    expect(screen.getByText(/Player 1: 1/i)).toBeInTheDocument();
  });

  afterEach(() => {
    jest.clearAllTimers();
  });
});
