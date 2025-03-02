import { configureStore } from '@reduxjs/toolkit';
import reducer, { increment, decrement } from './slice';

describe('Main Slice', () => {
  let store;
  let state;

  beforeEach(() => {
    store = configureStore({ reducer });
    state = store.getState();
  });

  it('should initialize with the correct state', () => {
    const initialState = { value: 0 };
    expect(state).toEqual(initialState);
  });

  it('should increment the value', () => {
    expect(state.value).toBe(0);
    store.dispatch(increment());
    state = store.getState();
    expect(state.value).toBe(1);
  });

  it('should decrement the value', () => {
    expect(state.value).toBe(0);
    store.dispatch(increment());
    state = store.getState();
    expect(state.value).toBe(1);
    store.dispatch(decrement());
    state = store.getState();
    expect(state.value).toBe(0);
  });

});
