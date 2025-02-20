/**
 * FormParts reducer
 */
import {
  SET_NUM,
  SET_COLOR,
  SET_SIZE,
  RESET_FORM
} from './actionTypes';

/**
 * The initial state of the form reducer.
 * @type {Object}
 * @property {number} num - The current number value.
 * @property {number} sizeKey - The index of the selected size.
 * @property {number} colorKey - The index of the selected color.
 * @property {string[]} sizes - The list of available sizes.
 * @property {string[]} colors - The list of available colors.
 */
export const initialState = {
  num: 0,
  sizeKey: 2,
  colorKey: 1,
  sizes: ['XL', 'L', 'M', 'S'],
  colors: ['Blue', 'Green', 'Yellow', 'Black']
};

/**
 * Ensures the given key is within the specified range.
 * @param {number} key - The key to validate.
 * @param {number} min - The minimum allowed value.
 * @param {number} max - The maximum allowed value.
 * @returns {number} - The validated key, clamped between min and max.
 */
const cleanKey = (key, min, max) => {
  return Math.min(Math.max(key, min), max);
};

/**
 * Reducer function to manage the state of the form.
 * @param {Object} state - The current state of the form.
 * @param {Object} action - The action to process.
 * @param {string} action.type - The type of the action.
 * @param {*} [action.payload] - The payload of the action.
 * @returns {Object} - The new state after applying the action.
 */
export const reducer = (state, action) => {
  switch (action.type) {
    case SET_NUM:
      return {
        ...state,
        num: action.payload
      };
    case SET_SIZE:
      return {
        ...state,
        sizeKey: cleanKey(action.payload, 0, initialState.sizes.length)
      };
    case SET_COLOR:
      return {
        ...state,
        colorKey: cleanKey(action.payload, 0, initialState.colors.length)
      };
    case RESET_FORM:
      return initialState;
    default:
      return state || initialState;
  }
};
