import { SET_NUM, SET_COLOR, SET_SIZE, RESET_FORM } from './actionTypes'
import { reducer, initialState } from './reducer'

describe('Reducer Tests', () => {

  it('should return the initial state when no action is provided', () => {
    const result = reducer(undefined, {});
    expect(result).toEqual(initialState);
  });

  it('should set the number', () => {
    const state = { ...initialState }
    const action = { type: SET_NUM, payload: 10 };
    const result = reducer(state, action);
    expect(result).toEqual({ ...state, num: 10 });
  });

  it('should set the size id', () => {
    const state = { ...initialState }
    const action = { type: SET_SIZE, payload: 3 };
    const result = reducer(state, action);
    expect(result).toEqual({ ...state, sizeKey: 3 });
  });

  it('should set the color id', () => {
    const state = { ...initialState }
    const action = { type: SET_COLOR, payload: 2 };
    const result = reducer(state, action);
    expect(result).toEqual({ ...state, colorKey: 2 });
  });

  it('should reset form', () => {
    const state = { ...initialState, num: 5, pickid: 2, color: 'green' };
    const action = { type: RESET_FORM };
    const result = reducer(state, action);
    expect(result).toEqual(initialState);
  });
});
