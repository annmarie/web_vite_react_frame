import { initialState, reducer } from './reducer';

describe('TicTacToe Reducer', () => {

  it('should return the initial state when no action is provided', () => {
    const result = reducer(undefined, {});
    expect(result).toEqual(initialState);
  });

  it('should make a move', () => {
    const state = { ...initialState };
    const action = { type: 'MAKE_MOVE', payload: { index: 0 } };
    const newState = reducer(state, action);
    expect(newState.board[0]).toBe('X');
    expect(newState.currentPlayer).toBe('O');
    expect(newState.history).toHaveLength(1);
    expect(newState.history[0]).toEqual(state.board);
  });

  it('should not make a move on an occupied spot', () => {
    const state = {
      ...initialState,
      board: ['X', null, null, null, null, null, null, null, null],
    };
    const action = { type: 'MAKE_MOVE', payload: { index: 0 } };
    const newState = reducer(state, action);
    expect(newState).toEqual(state);
  });

  it('should not make a move after the game is won', () => {
    const state = {
      ...initialState,
      board: ['X', 'X', 'X', null, null, null, null, null, null],
      winner: 'X',
    };
    const action = { type: 'MAKE_MOVE', payload: { index: 3 } };
    const newState = reducer(state, action);
    expect(newState).toEqual(state);
  });

  it('should reset the game', () => {
    const state = {
      ...initialState,
      board: ['X', 'O', 'X', 'O', 'X', 'O', 'X', 'O', 'X'],
      currentPlayer: 'O',
    };
    const action = { type: 'RESET_GAME' };
    const newState = reducer(state, action);
    expect(newState).toEqual(initialState);
  });

  it('should undo a move', () => {
    const state = {
      ...initialState,
      board: ['X', null, null, null, null, null, null, null, null],
      currentPlayer: 'O',
      history: [initialState.board],
    };
    const action = { type: 'UNDO_MOVE' };
    const newState = reducer(state, action);
    expect(newState.board).toEqual(initialState.board);
    expect(newState.history).toHaveLength(0);
    expect(newState.currentPlayer).toBe('X');
  });

  it('should not undo if there is no history', () => {
    const state = { ...initialState }
    const action = { type: 'UNDO_MOVE' };
    const newState = reducer(state, action);
    expect(newState).toEqual(state);
  });

  it('should not undo after the game is won', () => {
    const state = {
      ...initialState,
      board: ['X', 'X', 'X', null, null, null, null, null, null],
      winner: 'X',
      history: [initialState.board],
    };
    const action = { type: 'UNDO_MOVE' };
    const newState = reducer(state, action);
    expect(newState).toEqual(state);
  });
});
