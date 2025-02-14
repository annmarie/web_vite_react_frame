import { reducer, initialState } from "./reducer";
import {
  MOVE_PADDLE1, MOVE_PADDLE2, MOVE_BALL,
  TOGGLE_GAME, RESET_GAME
} from './actionTypes'


describe("Pong Game Reducer", () => {
  it("should return the initial state when no action is provided", () => {
    const newState = reducer(undefined, {});
    expect(newState).toEqual(initialState);
  });

  it("should move paddle1 up within bounds", () => {
    const action = { type: MOVE_PADDLE1, payload: -20 };
    const newState = reducer(initialState, action);
    expect(newState.paddle1).toBe(130); // 150 - 20
  });

  it("should move paddle1 down within bounds", () => {
    const action = { type: MOVE_PADDLE1, payload: 20 };
    const newState = reducer(initialState, action);
    expect(newState.paddle1).toBe(170); // 150 + 20
  });

  it("should not move paddle1 above the upper bound", () => {
    const action = { type: MOVE_PADDLE1, payload: -200 };
    const newState = reducer(initialState, action);
    expect(newState.paddle1).toBe(0); // Cannot go below 0
  });

  it("should not move paddle1 below the lower bound", () => {
    const action = { type: MOVE_PADDLE1, payload: 200 };
    const newState = reducer(initialState, action);
    expect(newState.paddle1).toBe(300); // Cannot go above 300
  });

  it("should move paddle2 up within bounds", () => {
    const action = { type: MOVE_PADDLE2, payload: -20 };
    const newState = reducer(initialState, action);
    expect(newState.paddle2).toBe(130); // 150 - 20
  });

  it("should move paddle2 down within bounds", () => {
    const action = { type: MOVE_PADDLE2, payload: 20 };
    const newState = reducer(initialState, action);
    expect(newState.paddle2).toBe(170); // 150 + 20
  });

  it("should not move paddle2 above the upper bound", () => {
    const action = { type: MOVE_PADDLE2, payload: -200 };
    const newState = reducer(initialState, action);
    expect(newState.paddle2).toBe(0); // Cannot go below 0
  });

  it("should not move paddle2 below the lower bound", () => {
    const action = { type: MOVE_PADDLE2, payload: 200 };
    const newState = reducer(initialState, action);
    expect(newState.paddle2).toBe(300); // Cannot go above 300
  });

  it("should toggle the game pause state", () => {
    const action = { type: TOGGLE_GAME };
    const newState = reducer(initialState, action);
    expect(newState.pause).toBe(false); // Initial state is true, so it toggles to false
  });

  it("should reset the game state", () => {
    const modifiedState = {
      ...initialState,
      paddle1: 100,
      paddle2: 200,
      ball: { x: 100, y: 100, dx: 5, dy: 5 },
      score: { player_one: 5, player_two: 3 },
      pause: false,
    };
    const action = { type: RESET_GAME };
    const newState = reducer(modifiedState, action);
    expect(newState).toEqual(initialState); // Should reset to initial state
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

  it("should handle ball collision with paddle1", () => {
    const modifiedState = {
      ...initialState,
      ball: { x: 20, y: 150, dx: -2, dy: 2 }, // Ball at paddle1
    };
    const action = { type: MOVE_BALL };
    const newState = reducer(modifiedState, action);
    expect(newState.ball.dx).toBe(2); // Ball should bounce off paddle1
  });

  it("should handle ball collision with paddle2", () => {
    const modifiedState = {
      ...initialState,
      ball: { x: 580, y: 150, dx: 2, dy: 2 }, // Ball at paddle2
    };
    const action = { type: MOVE_BALL };
    const newState = reducer(modifiedState, action);
    expect(newState.ball.dx).toBe(-2); // Ball should bounce off paddle2
  });

  it("should handle scoring for player_two", () => {
    const modifiedState = {
      ...initialState,
      ball: { x: 0, y: 200, dx: -2, dy: 2 }, // Ball out of bounds on the left
    };
    const action = { type: MOVE_BALL };
    const newState = reducer(modifiedState, action);
    expect(newState.score.player_two).toBe(1); // Player two scores
    expect(newState.ball).toEqual({ x: 300, y: 200, dx: 2, dy: 2 }); // Ball resets
  });

  it("should handle scoring for player_one", () => {
    const modifiedState = {
      ...initialState,
      ball: { x: 600, y: 200, dx: 2, dy: 2 }, // Ball out of bounds on the right
    };
    const action = { type: MOVE_BALL };
    const newState = reducer(modifiedState, action);
    expect(newState.score.player_one).toBe(1); // Player one scores
    expect(newState.ball).toEqual({ x: 300, y: 200, dx: -2, dy: 2 }); // Ball resets
  });
});
