/* globals describe, expect, it */
import { PLAYER_LEFT, PLAYER_RIGHT } from './globals';
import {
  initializeBoard,
  rollDie,
  togglePlayer,
  getPointKey,
  updatePoints
} from './utils';

describe('Utility Functions', () => {
  describe('initializeBoard', () => {
    it('returns an array of 24 points', () => {
      const board = initializeBoard();
      expect(board).toHaveLength(24);
    });

    it('correctly initializes points with checkers and players', () => {
      const board = initializeBoard();

      expect(board[0]).toEqual({ id: 1, checkers: 5, player: PLAYER_LEFT });
      expect(board[11]).toEqual({ id: 12, checkers: 2, player: PLAYER_LEFT });
      expect(board[16]).toEqual({ id: 17, checkers: 3, player: PLAYER_LEFT });
      expect(board[18]).toEqual({ id: 19, checkers: 5, player: PLAYER_LEFT });

      expect(board[23]).toEqual({ id: 24, checkers: 2, player: PLAYER_RIGHT });
      expect(board[12]).toEqual({ id: 13, checkers: 5, player: PLAYER_RIGHT });
      expect(board[6]).toEqual({ id: 7, checkers: 5, player: PLAYER_RIGHT });
      expect(board[4]).toEqual({ id: 5, checkers: 3, player: PLAYER_RIGHT });

      expect(board[2]).toEqual({ id: 3, checkers: 0, player: null });
    });
  });

  describe('rollDie', () => {
    it('returns a number between 1 and 6', () => {
      for (let i = 0; i < 100; i++) {
        const roll = rollDie();
        expect(roll).toBeGreaterThanOrEqual(1);
        expect(roll).toBeLessThanOrEqual(6);
      }
    });
  });

  describe('togglePlayer', () => {
    it('toggles from PLAYER_RIGHT to PLAYER_LEFT', () => {
      expect(togglePlayer(PLAYER_RIGHT)).toBe(PLAYER_LEFT);
    });

    it('toggles from PLAYER_LEFT to PLAYER_RIGHT', () => {
      expect(togglePlayer(PLAYER_LEFT)).toBe(PLAYER_RIGHT);
    });
  });

  describe('getPointKey', () => {
    it('returns correct point mapping for PLAYER_RIGHT', () => {
      const pointKey = getPointKey(PLAYER_RIGHT);
      expect(pointKey[0]).toBe(12);
      expect(pointKey[11]).toBe(23);
      expect(pointKey[12]).toBe(11);
      expect(pointKey[23]).toBe(0);
    });

    it('returns correct point mapping for PLAYER_LEFT', () => {
      const pointKey = getPointKey(PLAYER_LEFT);
      expect(pointKey[0]).toBe(11);
      expect(pointKey[11]).toBe(0);
      expect(pointKey[12]).toBe(12);
      expect(pointKey[23]).toBe(23);
    });
  });

  describe('updatePoints', () => {
    it('moves a checker from one point to another', () => {
      const points = initializeBoard();
      const fromIndex = 0; // Point 1
      const toIndex = 5; // Point 6
      const player = PLAYER_LEFT;

      const updatedPoints = updatePoints(points, fromIndex, toIndex, player);

      expect(updatedPoints[fromIndex].checkers).toBe(4);
      expect(updatedPoints[fromIndex].player).toBe(PLAYER_LEFT);

      expect(updatedPoints[toIndex].checkers).toBe(1);
      expect(updatedPoints[toIndex].player).toBe(PLAYER_LEFT);
    });

    it('removes player from a point when checkers reach 0', () => {
      const points = initializeBoard();
      const fromIndex = 11; // Point 12 (2 checkers for PLAYER_LEFT)
      const toIndex = 5; // Point 6
      const player = PLAYER_LEFT;

      // Move both checkers away
      let updatedPoints = updatePoints(points, fromIndex, toIndex, player);
      updatedPoints = updatePoints(updatedPoints, fromIndex, toIndex, player);

      // Check the fromIndex point
      expect(updatedPoints[fromIndex].checkers).toBe(0);
      expect(updatedPoints[fromIndex].player).toBe(null);
    });

    it('adds player to a point when checkers reach 1', () => {
      const points = initializeBoard();
      const fromIndex = 0; // Point 1 (5 checkers for PLAYER_LEFT)
      const toIndex = 2; // Point 3 (0 checkers)

      const updatedPoints = updatePoints(points, fromIndex, toIndex, PLAYER_LEFT);

      // Check the toIndex point
      expect(updatedPoints[toIndex].checkers).toBe(1);
      expect(updatedPoints[toIndex].player).toBe(PLAYER_LEFT);
    });
  });
});