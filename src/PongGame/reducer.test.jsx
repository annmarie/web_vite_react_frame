import { reducer, initialState } from "./reducer";
import {
  MOVE_PADDLE_LEFT, MOVE_PADDLE_RIGHT, MOVE_BALL,
  TOGGLE_GAME, RESET_GAME
} from './actionTypes'

describe("Pong Game Reducer", () => {

  it("should return the initial state when no action is provided", () => {
    const newState = reducer(undefined, {});
    expect(newState).toEqual(initialState);
  });

  it("should move paddle_left up within bounds", () => {
    const action = { type: MOVE_PADDLE_LEFT, payload: -20 };
    const newState = reducer(initialState, action);
    expect(newState.paddle_left).toBe(130); // 150 - 20
  });

  it("should move paddle_left down within bounds", () => {
    const action = { type: MOVE_PADDLE_LEFT, payload: 20 };
    const newState = reducer(initialState, action);
    expect(newState.paddle_left).toBe(170); // 150 + 20
  });

  it("should not move paddle_left above the upper bound", () => {
    const action = { type: MOVE_PADDLE_LEFT, payload: -200 };
    const newState = reducer(initialState, action);
    expect(newState.paddle_left).toBe(0); // Cannot go below 0
  });

  it("should not move paddle_left below the lower bound", () => {
    const action = { type: MOVE_PADDLE_LEFT, payload: 200 };
    const newState = reducer(initialState, action);
    expect(newState.paddle_left).toBe(300); // Cannot go above 300
  });

  it("should move paddle_right up within bounds", () => {
    const action = { type: MOVE_PADDLE_RIGHT, payload: -20 };
    const newState = reducer(initialState, action);
    expect(newState.paddle_right).toBe(130); // 150 - 20
  });

  it("should move paddle_right down within bounds", () => {
    const action = { type: MOVE_PADDLE_RIGHT, payload: 20 };
    const newState = reducer(initialState, action);
    expect(newState.paddle_right).toBe(170); // 150 + 20
  });

  it("should not move paddle_right above the upper bound", () => {
    const action = { type: MOVE_PADDLE_RIGHT, payload: -200 };
    const newState = reducer(initialState, action);
    expect(newState.paddle_right).toBe(0); // Cannot go below 0
  });

  it("should not move paddle_right below the lower bound", () => {
    const action = { type: MOVE_PADDLE_RIGHT, payload: 200 };
    const newState = reducer(initialState, action);
    expect(newState.paddle_right).toBe(300); // Cannot go above 300
  });

  it("should toggle the game pause state", () => {
    const action = { type: TOGGLE_GAME };
    const newState = reducer(initialState, action);
    expect(newState.pause).toBe(false);
  });

  it("should reset the game state", () => {
    const modifiedState = {
      ...initialState,
      paddle_left: 100,
      paddle_right: 200,
      ball: { x: 100, y: 100, dx: 5, dy: 5 },
      score: { player_left: 5, player_right: 3 },
      pause: false,
    };
    const action = { type: RESET_GAME };
    const newState = reducer(modifiedState, action);
    expect(newState).toEqual(initialState);
  });

  it("should handle ball movement and wall collision", () => {
    const modifiedState = {
      ...initialState,
      ball: { x: 300, y: 0, dx: 2, dy: -2 }, // Ball at the top wall
    };
    const action = { type: MOVE_BALL };
    const newState = reducer(modifiedState, action);
    expect(newState.ball.dy).toBe(2); // Ball should bounce off the top wall
  });

  it("should handle ball collision with paddle_left", () => {
    const modifiedState = {
      ...initialState,
      ball: { x: 20, y: 150, dx: -2, dy: 2 }, // Ball at paddle_left
    };
    const action = { type: MOVE_BALL };
    const newState = reducer(modifiedState, action);
    expect(newState.ball.dx).toBe(2); // Ball should bounce off paddle_left
  });

  it("should handle ball collision with paddle_right", () => {
    const modifiedState = {
      ...initialState,
      ball: { x: 580, y: 150, dx: 2, dy: 2 }, // Ball at paddle_right
    };
    const action = { type: MOVE_BALL };
    const newState = reducer(modifiedState, action);
    expect(newState.ball.dx).toBe(-2); // Ball should bounce off paddle_right
  });

  it("should handle scoring for player_right", () => {
    const modifiedState = {
      ...initialState,
      ball: { x: 0, y: 200, dx: -2, dy: 2 }, // Ball out of bounds on the left
    };
    const action = { type: MOVE_BALL };
    const newState = reducer(modifiedState, action);
    expect(newState.score.player_right).toBe(1); // Player right scores
    expect(newState.ball).toEqual({ x: 300, y: 200, dx: 2, dy: 2 }); // Ball resets
  });

  it("should handle scoring for player_left", () => {
    const modifiedState = {
      ...initialState,
      ball: { x: 600, y: 200, dx: 2, dy: 2 }, // Ball out of bounds on the right
    };
    const action = { type: MOVE_BALL };
    const newState = reducer(modifiedState, action);
    expect(newState.score.player_left).toBe(1); // Player left scores
    expect(newState.ball).toEqual({ x: 300, y: 200, dx: -2, dy: 2 }); // Ball resets
  });
});
