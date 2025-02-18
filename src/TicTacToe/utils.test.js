/* globals describe, expect, it */
import { calculateWinner, isBoardFull } from './utils';

describe('calculateWinner', () => {
  it('should return the winner when a row is completed', () => {
    const squares = ['X', 'X', 'X', null, null, null, null, null, null];
    expect(calculateWinner(squares)).toBe('X');
  });

  it('should return the winner when a column is completed', () => {
    const squares = ['O', null, null, 'O', null, null, 'O', null, null];
    expect(calculateWinner(squares)).toBe('O');
  });

  it('should return the winner when a diagonal is completed', () => {
    const squares = ['X', null, null, null, 'X', null, null, null, 'X'];
    expect(calculateWinner(squares)).toBe('X');
  });

  it('should return null when there is no winner', () => {
    const squares = ['X', 'O', 'X', 'O', 'X', 'O', 'O', 'X', 'O'];
    expect(calculateWinner(squares)).toBe(null);
  });

  it('should return null for an empty board', () => {
    const squares = [null, null, null, null, null, null, null, null, null];
    expect(calculateWinner(squares)).toBe(null);
  });
});

describe('isBoardFull', () => {
  it('should return true when the board is full', () => {
    const board = ['X', 'O', 'X', 'O', 'X', 'O', 'O', 'X', 'O'];
    expect(isBoardFull(board)).toBe(true);
  });

  it('should return false when the board is not full', () => {
    const board = ['X', 'O', 'X', null, 'X', 'O', 'O', 'X', 'O'];
    expect(isBoardFull(board)).toBe(false);
  });

  it('should return false for an empty board', () => {
    const board = [null, null, null, null, null, null, null, null, null];
    expect(isBoardFull(board)).toBe(false);
  });
});
