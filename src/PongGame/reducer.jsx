import {
  MOVE_PADDLE1, MOVE_PADDLE2, MOVE_BALL,
  TOGGLE_GAME, RESET_GAME
} from './actionTypes'

export const initialState = {
  ball: { x: 300, y: 200, dx: 2, dy: 2 },
  paddle1: 150,
  paddle2: 150,
  score: { player_one: 0, player_two: 0 },
  pause: true,
};

export const reducer = (state, action) => {
  switch (action.type) {
    case MOVE_PADDLE1:
      return {
        ...state,
        paddle1: Math.max(0, Math.min(300, state.paddle1 + action.payload)),
      };

    case MOVE_PADDLE2:
      return {
        ...state,
        paddle2: Math.max(0, Math.min(300, state.paddle2 + action.payload)),
      };

    case MOVE_BALL: {
      let { x, y, dx, dy } = state.ball;
      const { paddle1, paddle2 } = state;

      // Ball movement
      x += dx;
      y += dy;
      // Wall collision
      if (y <= 0 || y >= 400) dy = -dy;
      // Paddle collision
      if (
        (x <= 20 && y >= paddle1 && y <= paddle1 + 100) || // Left paddle
        (x >= 580 && y >= paddle2 && y <= paddle2 + 100) // Right paddle
      ) {
        dx = -dx;
      }
      // Score
      if (x <= 0) {
        return {
          ...state,
          ball: { x: 300, y: 200, dx: 2, dy: 2 },
          score: { ...state.score, player_two: state.score.player_two + 1 },
          pause: true,
        };
      }
      if (x >= 600) {
        return {
          ...state,
          ball: { x: 300, y: 200, dx: -2, dy: 2 },
          score: { ...state.score, player_one: state.score.player_one + 1 },
          pause: true,
        };
      }

      return { ...state, ball: { x, y, dx, dy } };
    }
    case TOGGLE_GAME:
      return { ...state, pause: !state.pause };

    case RESET_GAME:
      return initialState;

    default:
      return state || initialState;
  }
};
