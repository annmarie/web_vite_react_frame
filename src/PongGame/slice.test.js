/* globals describe, expect, it, beforeEach */
import { configureStore } from '@reduxjs/toolkit';
import reducer, {
  initialState, togglePause, resetGame,
  movePaddleLeft, movePaddleRight,
} from './slice';

describe('PongGame Slice', () => {
  let store;
  let state;

  beforeEach(() => {
    store = configureStore({ reducer });
    state = store.getState();
  });

  it('should initialize with the correct state', () => {
    expect(state).toStrictEqual(initialState);
  });

  it('should move paddle_left up within bounds', () => {
    store.dispatch(movePaddleLeft(-20));
    state = store.getState();
    expect(state.paddle_left).toBe(130); // 150 - 20
  });

  it('should move paddle_left down within bounds', () => {
    store.dispatch(movePaddleLeft(20));
    state = store.getState();
    expect(state.paddle_left).toBe(170); // 150 + 20
  });

  it('should move paddle_left down within bounds', () => {
    store.dispatch(movePaddleLeft(20));
    state = store.getState();
    expect(state.paddle_left).toBe(170); // 150 + 20
  });

  it('should not move paddle_left above the upper bound', () => {
    store.dispatch(movePaddleLeft(-200));
    state = store.getState();
    expect(state.paddle_left).toBe(0); // Cannot go below 0
  });

  it('should not move paddle_left below the lower bound', () => {
    store.dispatch(movePaddleLeft(200));
    state = store.getState();
    expect(state.paddle_left).toBe(300); // Cannot go above 300
  });

  it('should move paddle_right up within bounds', () => {
    store.dispatch(movePaddleRight(-20));
    state = store.getState();
    expect(state.paddle_right).toBe(130); // 150 - 20
  });

  it('should move paddle_right down within bounds', () => {
    store.dispatch(movePaddleRight(20));
    state = store.getState();
    expect(state.paddle_right).toBe(170); // 150 + 20
  });

  it('should not move paddle_right above the upper bound', () => {
    store.dispatch(movePaddleRight(-200));
    state = store.getState();
    expect(state.paddle_right).toBe(0); // Cannot go below 0
  });

  it('should not move paddle_right below the lower bound', () => {
    store.dispatch(movePaddleRight(200));
    state = store.getState();
    expect(state.paddle_right).toBe(300); // Cannot go above 300
  });

  it('should toggle the game pause state', () => {
    expect(state.pause).toBe(true);
    store.dispatch(togglePause());
    state = store.getState();
    expect(state.pause).toBe(false);
  });

  it('should reset the game state', () => {
    store.dispatch(movePaddleRight(20));
    store.dispatch(resetGame());
    state = store.getState();
    expect(state.paddle_right).toBe(150);
  });

  // TODO: set these tests up
  //it('should handle ball movement and wall collision', () => {
    //   const modifiedState = {
    //     ...initialState,
    //     ball: { x: 300, y: 0, dx: 2, dy: -2 }, // Ball at the top wall
    //   };
    //   const action = { type: MOVE_BALL };
    //   const newState = reducer(modifiedState, action);
    //   expect(newState.ball.dy).toBe(2); // Ball should bounce off the top wall
    // });

    // it('should handle ball collision with paddle_left', () => {
    //   const modifiedState = {
    //     ...initialState,
    //     ball: { x: 20, y: 150, dx: -2, dy: 2 }, // Ball at paddle_left
    //   };
    //   const action = { type: MOVE_BALL };
    //   const newState = reducer(modifiedState, action);
    //   expect(newState.ball.dx).toBe(2); // Ball should bounce off paddle_left
    // });

    // it('should handle ball collision with paddle_right', () => {
    //   const modifiedState = {
    //     ...initialState,
    //     ball: { x: 580, y: 150, dx: 2, dy: 2 }, // Ball at paddle_right
    //   };
    //   const action = { type: MOVE_BALL };
    //   const newState = reducer(modifiedState, action);
    //   expect(newState.ball.dx).toBe(-2); // Ball should bounce off paddle_right
    // });

    // it('should handle scoring for player_right', () => {
    //   const modifiedState = {
    //     ...initialState,
    //     ball: { x: 0, y: 200, dx: -2, dy: 2 }, // Ball out of bounds on the left
    //   };
    //   const action = { type: MOVE_BALL };
    //   const newState = reducer(modifiedState, action);
    //   expect(newState.score.player_right).toBe(1); // Player right scores
    //   expect(newState.ball).toEqual({ x: 300, y: 200, dx: 2, dy: 2 }); // Ball resets
    // });

    // it('should handle scoring for player_left', () => {
    //   const modifiedState = {
    //     ...initialState,
    //     ball: { x: 600, y: 200, dx: 2, dy: 2 }, // Ball out of bounds on the right
    //   };
    //   const action = { type: MOVE_BALL };
    //   const newState = reducer(modifiedState, action);
    //   expect(newState.score.player_left).toBe(1); // Player left scores
    //   expect(newState.ball).toEqual({ x: 300, y: 200, dx: -2, dy: 2 }); // Ball resets
    // });

});
