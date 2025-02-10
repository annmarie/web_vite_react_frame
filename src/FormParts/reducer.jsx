
export const initialState = {
  num: 0,
  sizeKey: 2,
  colorKey: 1,
  sizes: ['XL', 'L', 'M', 'S'],
  colors: ["Blue", "Green", "Yellow", "Black"]
};

const cleanKey = (key, min, max) => {
  return Math.min(Math.max(key, min), max);
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "SET_NUM":
      return {
        ...state,
        num: action.payload
      };
    case "SET_SIZE":
      return {
        ...state,
        sizeKey: cleanKey(action.payload, 0, initialState.sizes.length)
      };
    case "SET_COLOR":
      return {
        ...state,
        colorKey: cleanKey(action.payload, 0, initialState.colors.length)
      };
    case "RESET_FORM":
      return initialState;
    default:
      return state || initialState;
  }
};

export default { reducer, initialState }
