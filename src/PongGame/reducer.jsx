/**
 * PongGame reducer
 */
import {
  MOVE_PADDLE_LEFT, MOVE_PADDLE_RIGHT, MOVE_BALL,
  TOGGLE_GAME, RESET_GAME
} from './actionTypes';

/**
 * Initial state of the game.
 * - `ball`: Represents the ball's position (`x`, `y`) and its velocity (`dx`, `dy`).
 * - `paddle_left`: The vertical position of the left paddle.
 * - `paddle_right`: The vertical position of the right paddle.
 * - `score`: Tracks the scores of both players.
 * - `pause`: Boolean indicating whether the game is paused.
 */
export const initialState = {
  ball: { x: 300, y: 200, dx: 2, dy: 2 },
  paddle_left: 150,
  paddle_right: 150,
  score: { player_left: 0, player_right: 0 },
  pause: true,
};

/**
 * Reducer function to manage the state of the game.
 *
 * @param {Object} state - The current state of the game.
 * @param {Object} action - The action to be processed.
 * @returns {Object} - The new state after processing the action.
 */
export const reducer = (state, action) => {
  switch (action.type) {
    case MOVE_PADDLE_LEFT:
      return reduceMovePaddleLeft(state, action);

    case MOVE_PADDLE_RIGHT:
      return reduceMovePaddleRight(state, action);

    case MOVE_BALL:
      return reduceMoveBall(state);

    case TOGGLE_GAME:
      return { ...state, pause: !state.pause };

    case RESET_GAME:
      return { ...initialState };

    default:
      return state || initialState;
  }
};

/**
 * Handles the logic for moving the left paddle.
 *
 * @param {Object} state - The current state of the game.
 * @param {Object} action - The action containing the movement details.
 * @returns {Object} - The updated state after moving the left paddle.
 */
const reduceMovePaddleLeft = (state, action) => {
  return {
    ...state,
    paddle_left: Math.max(0, Math.min(300, state.paddle_left + action.payload)),
  };
};

/**
 * Handles the logic for moving the right paddle.
 *
 * @param {Object} state - The current state of the game.
 * @param {Object} action - The action containing the movement details.
 * @returns {Object} - The updated state after moving the right paddle.
 */
const reduceMovePaddleRight = (state, action) => {
  return {
    ...state,
    paddle_right: Math.max(0, Math.min(300, state.paddle_right + action.payload)),
  };
};

/**
 * Handles the logic for moving the ball.
 *
 * @param {Object} state - The current state of the game.
 * @returns {Object} - The updated state after moving the ball.
 */
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
