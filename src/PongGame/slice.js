import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  ball: { x: 300, y: 200, dx: 2, dy: 2 },
  paddle_left: 150,
  paddle_right: 150,
  score: { player_left: 0, player_right: 0 },
  pause: true,
};

export const slice = createSlice({
  name: 'pong',
  initialState,
  reducers: {
    moveBall: (state, action) => reduceMoveBall(state, action),
    movePaddleLeft: (state, action) => reduceMovePaddleLeft(state, action),
    movePaddleRight: (state, action) => reduceMovePaddleRight(state, action),
    togglePause: (state) => ({ ...state, pause: !state.pause }),
    resetGame: () => ({ ...initialState }),
  },
});

const reduceMovePaddleLeft = (state, action) => {
  return {
    ...state,
    paddle_left: Math.max(0, Math.min(300, state.paddle_left + action.payload)),
  };
};

const reduceMovePaddleRight = (state, action) => {
  return {
    ...state,
    paddle_right: Math.max(0, Math.min(300, state.paddle_right + action.payload)),
  };
};

const reduceMoveBall = (state) => {
  let { x, y, dx, dy } = state.ball;
  const { paddle_left, paddle_right } = state;

  // Update ball position
  x += dx;
  y += dy;

  // Wall collision (top and bottom)
  if (y <= 0 || y >= 400) dy = -dy;

  // Paddle collision
  if (
    (x <= 20 && y >= paddle_left && y <= paddle_left + 100) || // Left paddle
    (x >= 580 && y >= paddle_right && y <= paddle_right + 100) // Right paddle
  ) {
    dx = -dx;
  }

  // Scoring logic
  if (x <= 0) {
    return {
      ...state,
      ball: { x: 300, y: 200, dx: 2, dy: 2 },
      score: { ...state.score, player_right: state.score.player_right + 1 },
      pause: true,
    };
  }
  if (x >= 600) {
    return {
      ...state,
      ball: { x: 300, y: 200, dx: -2, dy: 2 },
      score: { ...state.score, player_left: state.score.player_left + 1 },
      pause: true,
    };
  }

  return { ...state, ball: { x, y, dx, dy } };
};

export const { moveBall, movePaddleLeft, movePaddleRight, togglePause, resetGame } = slice.actions;

export default slice.reducer;
