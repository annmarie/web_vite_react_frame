import { PLAYER_LEFT, PLAYER_RIGHT } from './globals';

/**
 * Initializes the game board with 24 points.
 * Each point has an ID, a number of checkers, and an associated player.
 * @returns {Array} Array of points with their initial state.
 */
export const initializeBoard = () => {
  return Array.from({ length: 24 }, (_, i) => {
    const id = i + 1;
    let checkers = 0;
    let player = null;

    if (id === 1) {
      checkers = 5;
      player = PLAYER_LEFT;
    }
    if (id === 12) {
      checkers = 2;
      player = PLAYER_LEFT;
    }
    if (id === 17) {
      checkers = 3;
      player = PLAYER_LEFT;
    }
    if (id === 19) {
      checkers = 5;
      player = PLAYER_LEFT;
    }

    if (id === 24) {
      checkers = 2;
      player = PLAYER_RIGHT;
    }
    if (id === 13) {
      checkers = 5;
      player = PLAYER_RIGHT;
    }
    if (id === 7) {
      checkers = 5;
      player = PLAYER_RIGHT;
    }
    if (id === 5) {
      checkers = 3;
      player = PLAYER_RIGHT;
    }

    return { id, checkers, player };
  });
};

/**
 * Simulates rolling a six-sided die.
 * @returns {number} A random number between 1 and 6.
 */
export const rollDie = () => {
  return Math.floor(Math.random() * 6) + 1;
};

/**
 * Toggles the current player between PLAYER_LEFT and PLAYER_RIGHT.
 * @param {string} player - The current player.
 * @returns {string} The next player.
 */
export const togglePlayer = (player) => {
  return player === PLAYER_RIGHT ? PLAYER_LEFT : PLAYER_RIGHT;
};

/**
 * Right Player Point Order
 */
export const rightPlayerPointOrder = [
  24, 23, 22, 21, 20, 19, 18, 17, 16, 15, 14, 13,
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12,
];

/**
 * Left Player Point Order
 */
export const leftPlayerPointOrder = [...rightPlayerPointOrder].reverse();

/**
 * Generates a mapping of point IDs to their indices for a given player.
 * @param {string} player - The current player.
 * @returns {Object} A mapping of point IDs to indices.
 */
export const generatePointIdToIndexMap = (player) => {
  const pointOrder = player === PLAYER_RIGHT ? rightPlayerPointOrder : leftPlayerPointOrder;
  return Object.fromEntries(pointOrder.map((pointId, index) => [pointId - 1, index]));
};

/**
 * Generates a mapping of indices to point IDs for a given player.
 * @param {string} player - The current player.
 * @returns {Object} A mapping of indices to point IDs.
 */
export const generateIndexToPointIdMap = (player) => {
  const pointOrder = player === PLAYER_RIGHT ? rightPlayerPointOrder : leftPlayerPointOrder;
  return Object.fromEntries(pointOrder.map((pointId, index) => [index, pointId - 1]));
};

/**
 * Calculates the target point ID based on the current player, selected index, and die roll.
 * @param {string} player - The current player.
 * @param {number} selectedIndex - The index of the selected point.
 * @param {number} die - The die roll.
 * @returns {number} The target point ID.
 */
export const calculateTargetPointId = (player, selectedIndex, die) => {
  const pointIdToIndexMap = generatePointIdToIndexMap(player);
  const indexToPointIdMap = generateIndexToPointIdMap(player);
  const targetIndex = Math.abs(pointIdToIndexMap[selectedIndex] + die);
  return indexToPointIdMap[targetIndex] || 0;
};

/**
 * Updates the points on the board after a move.
 * @param {Array} points - The current state of the board.
 * @param {number} fromIndex - The index of the point to move from.
 * @param {number} toIndex - The index of the point to move to.
 * @param {string} player - The current player.
 * @returns {Array} The updated state of the board.
 */
export const updatePoints = (points, fromIndex, toIndex, player) => {
  const updatedPoints = [...points];

  updatedPoints[fromIndex] = {
    ...updatedPoints[fromIndex],
    checkers: updatedPoints[fromIndex].checkers - 1,
    player: updatedPoints[fromIndex].checkers - 1 === 0 ? null : player,
  };

  updatedPoints[toIndex] = {
    ...updatedPoints[toIndex],
    checkers: updatedPoints[toIndex].checkers + 1,
    player: updatedPoints[toIndex].checkers + 1 === 1 ? player : updatedPoints[toIndex].player,
  };

  return updatedPoints;
};

