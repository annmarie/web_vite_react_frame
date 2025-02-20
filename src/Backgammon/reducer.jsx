/**
 * backgammon reducer
 */
import { PLAYER_LEFT, PLAYER_RIGHT } from './globals';
import {
  SELECT_SPOT, MOVE_CHECKER,
  ROLL_DICE, UNDO, RESET,
} from './actionTypes';
import {
  togglePlayer, rollDie, updatePoints,
  generatePointIdToIndexMap, initializeBoard, calculateTargetPointId
} from './utils';

/**
 * Initial state of the game.
 * - `points`: Represents the board state with checkers and players.
 * - `diceValue`: The current dice values rolled.
 * - `player`: The current player (PLAYER_LEFT or PLAYER_RIGHT).
 * - `pointsHistory`: History of board states for undo functionality.
 * - `diceHistory`: History of dice rolls for undo functionality.
 * - `playerHistory`: History of player turns for undo functionality.
 * - `selectedSpot`: The currently selected spot on the board.
 * - `potentialSpots`: The potential spots a checker can move to.
 */
export const initialState = {
  points: initializeBoard(),
  diceValue: null,
  player: null,
  pointsHistory: [],
  diceHistory: [],
  playerHistory: [],
  selectedSpot: null,
  potentialSpots: [],
};

/**
 * Reducer function
 * @param {Object} state - The current state of the game.
 * @param {Object} action - The action to be performed.
 * @returns {Object} - The updated state.
 */
export const reducer = (state, action) => {
  switch (action.type) {
    case ROLL_DICE:
      return reduceRollDice(state);

    case SELECT_SPOT:
      return reduceSelectSpot(state, action);

    case MOVE_CHECKER:
      return reduceMoveChecker(state, action);

    case UNDO:
      return reduceUndo(state);

    case RESET:
      return { ...initialState, points: initializeBoard() };

    default:
      return state || initialState;
  }
};

/**
 * Determines potential spots a checker can move to based on dice values.
 * @param {Object} state - The current state.
 * @param {Object} action - The action containing the selected spot.
 * @returns {Object} - The updated state with potential spots.
 */
function reduceSelectSpot(state, action) {
  if (
    state.player === null ||
    state.diceValue.length === 0
  ) return state;

  const pointId = action.payload;
  const selectedIndex = pointId - 1;

  if (
    selectedIndex === -1 ||
    state.points[selectedIndex].player !== state.player
  ) {
    return state;
  }

  if (selectedIndex > 23) return { ...state, selectedSpot: pointId }

  const dice = [...new Set(state.diceValue)];
  const potentialSpots = [];

  for (const die of dice) {
    const targetPointId = calculateTargetPointId(state.player, selectedIndex, die);
    const targetPoint = state.points[targetPointId];
    if (
      targetPoint.checkers === 0 ||
      targetPoint.player === state.player ||
      (targetPoint.checkers === 1 && targetPoint.player !== state.player)
    ) {
      potentialSpots.push(targetPoint.id);
    }
  }

  return { ...state, selectedSpot: pointId, potentialSpots };
}

/**
 * Moves a checker from one spot to another and updates the game state.
 * @param {Object} state - The current state.
 * @param {Object} action - The action containing from and to point IDs.
 * @returns {Object} - The updated state after moving the checker.
 */
function reduceMoveChecker(state, action) {
  if (
    !state.player ||
    !state.diceValue ||
    state.diceValue.length === 0
  ) return state;

  const { fromPointId, toPointId } = action.payload;

  if (fromPointId === toPointId) {
    return {
      ...state,
      selectedSpot: null,
      potentialSpots: []
    };
  }

  const fromIndex = state.points.findIndex((point) => point.id === fromPointId);
  const toIndex = state.points.findIndex((point) => point.id === toPointId);

  if (
    fromIndex === -1 || toIndex === -1 ||
    state.points[fromIndex].checkers < 1
  ) {
    return state;
  }

  const pointKey = generatePointIdToIndexMap(state.player);
  const moveDistance = Math.abs(pointKey[toIndex] - pointKey[fromIndex]);
  const isValidDiceValue = state.diceValue.includes(moveDistance);

  if (
    !isValidDiceValue ||
    !(pointKey[toIndex] > pointKey[fromIndex])
  ) {
    return state;
  }

  const destinationPoint = state.points[toIndex];
  if (
    destinationPoint.checkers > 0 &&
    destinationPoint.player !== state.player
  ) {
    return state;
  }

  const updatedPoints = updatePoints(state.points, fromIndex, toIndex, state.player);
  const updatedDiceValue = state.diceValue.filter((die, index) =>
    index !== state.diceValue.findIndex((d) => d === moveDistance)
  );

  const moveInProcess = updatedDiceValue.length > 0;

  return {
    ...state,
    points: updatedPoints,
    diceValue: moveInProcess ? updatedDiceValue : initialState.diceValue,
    player: moveInProcess ? state.player : togglePlayer(state.player),
    pointsHistory: [...state.pointsHistory, state.points],
    diceHistory: [...state.diceHistory, state.diceValue],
    playerHistory: [...state.playerHistory, state.player],
    selectedSpot: null,
    potentialSpots: [],
  };
}

/**
 * Reverts the game state to the previous state.
 * @param {Object} state - The current state.
 * @returns {Object} - The updated state after undoing the last action.
 */
function reduceUndo(state) {
  const previousPoints = state.pointsHistory.pop() || initialState.points;
  const previousDice = state.diceHistory.pop() || initialState.diceValue;
  const previousPlayer = state.playerHistory.pop() || initialState.player;

  return {
    ...state,
    points: previousPoints,
    diceValue: previousDice,
    player: previousPlayer,
    pointsHistory: [...state.pointsHistory],
    diceHistory: [...state.diceHistory],
    playerHistory: [...state.playerHistory],
    selectedSpot: null,
    potentialSpots: [],
  };
}

/**
 * Rolls the dice and determines the starting player if it's the first roll.
 * @param {Object} state - The current state.
 * @returns {Object} - The updated state with new dice values and player.
 */
function reduceRollDice(state) {
  let die1, die2;

  let rollCnt = 0;
  const rollMax = 10;
  if (state.player === null) {
    while (die1 === die2 && rollCnt < rollMax) {
      die1 = rollDie();
      die2 = rollDie();
      rollCnt++;
      if (rollCnt >= rollMax) {
        console.error('Roll Error: manually setting dice');
        die1 = 1;
        die2 = 2;
      }
    }
  } else {
    die1 = rollDie();
    die2 = rollDie();
  }

  const newDiceValue = (die1 === die2)
    ? [die1, die2, die1, die2]
    : [die1, die2];

  return {
    ...state,
    diceValue: newDiceValue,
    player: state.player === null
      ? die2 > die1 ? PLAYER_RIGHT : PLAYER_LEFT
      : state.player,
  };
}
