import { MAKE_MOVE, RESET_GAME, UNDO_MOVE } from "./actionTypes";
import { initialState, reducer } from './reducer';

describe('TicTacToe Reducer', () => {

  it('should return the initial state when no action is provided', () => {
    const result = reducer(undefined, {});
    expect(result).toEqual(initialState);
  });

  it('should make a move', () => {
    const state = { ...initialState };
    const action = { type: MAKE_MOVE, payload: { index: 0 } };
    const newState = reducer(state, action);
    expect(newState.board[0]).toBe('X');
    expect(newState.currentPlayer).toBe('O');
    expect(newState.history).toHaveLength(1);
    expect(newState.history[0]).toEqual(state.board);
  });

  it('should not make a move on an occupied spot', () => {
    const state = reducer({ ...initialState }, { type: MAKE_MOVE, payload: { index: 0 } });
    const newState = reducer(state, { type: MAKE_MOVE, payload: { index: 0 } });
    expect(newState).toEqual(state);
  });

  it('should not undo after the game is won', () => {
    const state = reducer({ ...initialState }, { type: MAKE_MOVE, payload: { index: 0 } });
    const state2 = reducer(state, { type: MAKE_MOVE, payload: { index: 3 } });
    const state3 = reducer(state2, { type: MAKE_MOVE, payload: { index: 2 } });
    const state4 = reducer(state3, { type: MAKE_MOVE, payload: { index: 4 } });
    const state5 = reducer(state4, { type: MAKE_MOVE, payload: { index: 1 } });
    const state6 = reducer(state5, { type: UNDO_MOVE } );
    expect(state6).toEqual(state5);
  });

  it('should not make a move after the game is won', () => {
    const state = reducer({ ...initialState }, { type: MAKE_MOVE, payload: { index: 0 } });
    const state2 = reducer(state, { type: MAKE_MOVE, payload: { index: 3 } });
    const state3 = reducer(state2, { type: MAKE_MOVE, payload: { index: 2 } });
    const state4 = reducer(state3, { type: MAKE_MOVE, payload: { index: 4 } });
    const state5 = reducer(state4, { type: MAKE_MOVE, payload: { index: 1 } });
    const state6 = reducer(state5, { type: MAKE_MOVE, payload: { index: 3 } });
    expect(state6).toEqual(state5);
  });

  it('should undo a move', () => {
    const state = reducer({ ...initialState }, { type: MAKE_MOVE, payload: { index: 0 } });
    const state2 = reducer(state, { type: UNDO_MOVE });
    expect(state2.board).toEqual(initialState.board);
    expect(state2.history).toHaveLength(0);
    expect(state2.currentPlayer).toBe('X');
  });

  it('should reset the game', () => {
    const state = reducer({ ...initialState }, { type: MAKE_MOVE, payload: { index: 0 } });
    const state2 = reducer(state, { type: MAKE_MOVE, payload: { index: 1 } });
    const state3 = reducer(state2, { type: MAKE_MOVE, payload: { index: 2 } });
    const state4 = reducer(state3, { type: MAKE_MOVE, payload: { index: 3 } });
    const state5 = reducer(state4, { type: MAKE_MOVE, payload: { index: 4 } });
    const state6 = reducer(state5, { type: MAKE_MOVE, payload: { index: 6 } });
    const state7 = reducer(state6, { type: MAKE_MOVE, payload: { index: 5 } });
    const state8 = reducer(state7, { type: MAKE_MOVE, payload: { index: 8 } });
    const state9 = reducer(state8, { type: MAKE_MOVE, payload: { index: 7 } });
    const endState = reducer(state9, { type: RESET_GAME });
    expect(endState).toEqual(initialState);
  });
});
