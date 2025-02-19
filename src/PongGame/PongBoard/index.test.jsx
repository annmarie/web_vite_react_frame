import React from 'react';
import { render, screen } from '@testing-library/react';
import PongBoard from '../PongBoard';

describe('PongBoard Component', () => {
  const mockGameRef = { current: null };
  const mockBall = { x: 50, y: 100 };
  const mockPaddleLeft = 150;
  const mockPaddleRight = 200;
  const mockScore = { player_left: 5, player_right: 3 };

  it('should render the PongBoard component correctly', () => {
    render(
      <PongBoard
        gameRef={mockGameRef}
        ball={mockBall}
        paddle_left={mockPaddleLeft}
        paddle_right={mockPaddleRight}
        score={mockScore}
      />
    );

    expect(screen.getByText(/Player 1: 5 \| Player 2: 3/i)).toBeInTheDocument();
    expect(screen.getByRole('paddle_left')).toBeInTheDocument();
    expect(screen.getByRole('paddle_right')).toBeInTheDocument();
    const ballElement = screen.getByRole('ball');
    expect(ballElement).toBeInTheDocument();
    expect(ballElement).toHaveStyle({ top: `${mockBall.y}px`, left: `${mockBall.x}px` });
  });

  it('should validate PropTypes correctly', () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    render(
      <PongBoard
        gameRef={null}
        ball={{ x: 'invalid', y: 'invalid' }}
        paddle_left="invalid"
        paddle_right="invalid"
        score={{ player_left: 'invalid', player_right: 'invalid' }}
      />
    );

    expect(consoleErrorSpy).toHaveBeenCalled();
    consoleErrorSpy.mockRestore();
  });
});
