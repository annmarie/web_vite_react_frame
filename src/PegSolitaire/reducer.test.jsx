import { reducer, initialState } from './reducer'

describe('Reducer Tests', () => {

  it('should return the initial state when no action is provided', () => {
    const result = reducer(undefined, {});
    expect(result).toEqual(initialState);
  });

  it('should be able to select a peg', () => {
    const state = { ...initialState }
    const result = reducer(state, { type: 'SELECT_PEG', payload: { row: 1, col: 3 } });
    expect(result.selectedPeg.row).toBe(1)
    expect(result.selectedPeg.col).toBe(3)
  });


  it('should be able to make the first move', () => {
    const state = {
      ...initialState,
      selectedPeg: { row: 1, col: 3 },
    }

    const newBoard = [
      [null, null, 1, 1, 1, null, null],
      [null, null, 1, 0, 1, null, null],
      [   1,   1,  1, 0, 1,   1,     1],
      [   1,   1,  1, 1, 1,   1,     1],
      [   1,   1,  1, 1, 1,   1,     1],
      [null, null, 1, 1, 1, null, null],
      [null, null, 1, 1, 1, null, null],
    ];

    const result = reducer(state,  { type: 'MAKE_MOVE', payload: { endRow: 3, endCol: 3} });
    expect(result.movesLeft).toEqual(true);
    expect(result.winner).toEqual(false);
    expect(result.board[3][3]).toBe(1)
    expect(result.board).toEqual(newBoard);

  });

  it('should be able to make a move in both directions', () => {
    const state = { ...initialState }

    const newBoard1 = [
      [null, null, 1, 1, 1, null, null],
      [null, null, 1, 0, 1, null, null],
      [   1,   1,  1, 0, 1,   1,     1],
      [   1,   1,  1, 1, 1,   1,     1],
      [   1,   1,  1, 1, 1,   1,     1],
      [null, null, 1, 1, 1, null, null],
      [null, null, 1, 1, 1, null, null],
    ];

    const select1 = reducer(state, { type: 'SELECT_PEG', payload: { row: 1, col: 3 } });
    const move1 = reducer(select1,  { type: 'MAKE_MOVE', payload: { endRow: 3, endCol: 3} });
    expect(move1.board).toEqual(newBoard1);

    const newBoard2 = [
      [null, null, 1, 1, 1, null, null],
      [null, null, 1, 0, 1, null, null],
      [   1,   0,  0, 1, 1,   1,     1],
      [   1,   1,  1, 1, 1,   1,     1],
      [   1,   1,  1, 1, 1,   1,     1],
      [null, null, 1, 1, 1, null, null],
      [null, null, 1, 1, 1, null, null],
    ];


    const select2 = reducer(move1, { type: 'SELECT_PEG', payload: { row: 2, col: 1} });
    const move2 = reducer(select2,  { type: 'MAKE_MOVE', payload: { endRow: 2, endCol: 3} });
    expect(move2.board).toEqual(newBoard2);
    expect(move2.movesLeft).toEqual(true);
    expect(move2.winner).toEqual(false);

  });

  it('should be able to make a winning move move', () => {
    const state = {
      ...initialState,
      board: [
        [null, null, 0, 0, 0, null, null],
        [null, null, 0, 1, 0, null, null],
        [   0,   0,  0, 1, 0,   0,     0],
        [   0,   0,  0, 0, 0,   0,     0],
        [   0,   0,  0, 0, 0,   0,     0],
        [null, null, 0, 0, 0, null, null],
        [null, null, 0, 0, 0, null, null],
      ],
      selectedPeg: { row: 1, col: 3 },
    }

    const result = reducer(state, { type: 'MAKE_MOVE', payload: { endRow: 3, endCol: 3} });
    expect(result.movesLeft).toEqual(false);
    expect(result.winner).toEqual(true);
  });

  it('should have at least one move left', () => {
    const state = {
      ...initialState,
      board: [
        [null, null, 0, 0, 0, null, null],
        [null, null, 0, 1, 0, null, null],
        [   0,   0,  0, 1, 0,   0,     0],
        [   0,   0,  0, 1, 0,   0,     0],
        [   0,   0,  0, 0, 0,   0,     0],
        [null, null, 0, 1, 0, null, null],
        [null, null, 0, 0, 0, null, null],
      ],
      selectedPeg: { row: 2, col: 3 },
    }
    const action = { type: 'MAKE_MOVE', payload: { endRow: 4, endCol: 3} }
    const result = reducer(state, action);
    expect(result.movesLeft).toEqual(true);
  });

  it('should have at no moves left', () => {
    const state = {
      ...initialState,
      board: [
        [null, null, 0, 0, 0, null, null],
        [null, null, 0, 1, 0, null, null],
        [   0,   0,  0, 1, 0,   0,     0],
        [   0,   0,  0, 1, 0,   0,     0],
        [   0,   0,  0, 0, 0,   0,     0],
        [null, null, 0, 0, 0, null, null],
        [null, null, 0, 0, 0, null, null],
      ],
      selectedPeg: { row: 2, col: 3 },
    }
    const action = { type: 'MAKE_MOVE', payload: { endRow: 4, endCol: 3} }
    const result = reducer(state, action);
    expect(result.movesLeft).toEqual(false);
  });;
});
