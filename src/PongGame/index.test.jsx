import { render, screen, fireEvent, act } from '@testing-library/react';
import PongGame from '../PongGame';

describe('PongGame Component', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  it('should render the game board with initial score', async () => {
    await act(async () => render(<PongGame />));
    expect(screen.getByText(/Player 1: 0/i)).toBeInTheDocument();
    expect(screen.getByText(/Player 2: 0/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Reset Game'})).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /play/i })).toBeInTheDocument();
  });

  it('should move paddle left up and down', async () => {
    await act(async () => render(<PongGame />));
    const paddleLeft = screen.getByRole('paddle_left');
    await act(async () => fireEvent.keyDown(window, { key: 'w' }));
    expect(paddleLeft).toHaveStyle({ top: '130px' }); // 150px - 20px
    await act(async () => fireEvent.keyDown(window, { key: 's' }));
    expect(paddleLeft).toHaveStyle({ top: '150px' });
  });

  it('should move paddle right up and down', async () => {
    await act(async () => render(<PongGame />));
    const paddleRight = screen.getByRole('paddle_right');
    await act(async () => fireEvent.keyDown(window, { key: 'o' }));
    expect(paddleRight).toHaveStyle({ top: '130px' }); // 150px - 20px
    await act(async () => fireEvent.keyDown(window, { key: 'l' }));
    expect(paddleRight).toHaveStyle({ top: '150px' });
  });

  it('should reset ball position and update score when it goes out of bounds', async () => {
    await act(async () => render(<PongGame />));
    await act(async () => fireEvent.click(screen.getByRole('button', { name: /play/i })))
    // Advance time to ensure ball goes out of bounds
    await act(async () => jest.advanceTimersByTime(5000));
    expect(screen.getByText(/Player 1: 1/i)).toBeInTheDocument();
  });

  it('should clean up the event listener on unmount', async () => {
    const { unmount } = await act(async () => render(<PongGame />));
    const removeEventListenerSpy = jest.spyOn(window, 'removeEventListener');
    unmount();
    expect(removeEventListenerSpy).toHaveBeenCalledWith('keydown', expect.any(Function));
  });

  afterEach(() => {
    jest.clearAllTimers();
  });
});
