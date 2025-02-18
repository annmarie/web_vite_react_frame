import { render, screen, fireEvent, act } from '@testing-library/react';
import PongGame from '../PongGame';

describe('PongGame Component', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  it('renders the game board with initial score', async () => {
    await act(() => render(<PongGame />));
    expect(screen.getByText(/Player 1: 0/i)).toBeInTheDocument();
    expect(screen.getByText(/Player 2: 0/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Reset Game'})).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /play/i })).toBeInTheDocument();
  });

  it('moves paddle left up and down', async () => {
    await act(() => render(<PongGame />));
    const paddleLeft = screen.getByRole('paddle_left');
    await act(() => fireEvent.keyDown(window, { key: 'w' }));
    expect(paddleLeft).toHaveStyle({ top: '130px' }); // 150px - 20px
    await act(() => fireEvent.keyDown(window, { key: 's' }));
    expect(paddleLeft).toHaveStyle({ top: '150px' });
  });

  it('moves paddle right up and down', async () => {
    await act(() => render(<PongGame />));
    const paddleRight = screen.getByRole('paddle_right');
    await act(() => fireEvent.keyDown(window, { key: 'o' }));
    expect(paddleRight).toHaveStyle({ top: '130px' }); // 150px - 20px
    await act(() => fireEvent.keyDown(window, { key: 'l' }));
    expect(paddleRight).toHaveStyle({ top: '150px' });
  });

  it('ball resets position and updates score when it goes out of bounds', async () => {
    await act(() => render(<PongGame />));
    await act(() => fireEvent.click(screen.getByRole('button', { name: /play/i })))
    // Advance time to ensure ball goes out of bounds
    await act(() => jest.advanceTimersByTime(5000));
    expect(screen.getByText(/Player 1: 1/i)).toBeInTheDocument();
  });

  afterEach(() => {
    jest.clearAllTimers();
  });
});
