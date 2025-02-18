import { FETCH_START, SET_IMAGES, NEXT_IMAGE, PREVIOUS_IMAGE } from './actionTypes';

export const initialState = {
  images: [],
  currentIndex: 0,
  error: null,
  isLoading: false
};

export const reducer = (state, action) => {
  switch (action.type) {
    case FETCH_START:
      return {
        ...state,
        isLoading: true,
        error: null
      };
    case SET_IMAGES: {
      const { images, error } = action.payload;
      return {
        ...state,
        images: images ? images : [],
        error: error ? error : null,
        isLoading: false
      }
    };
    case NEXT_IMAGE:
      return {
        ...state,
        currentIndex: (state.currentIndex + 1) % state.images.length,
      };
    case PREVIOUS_IMAGE:
      return {
        ...state,
        currentIndex:
          state.currentIndex === 0
            ? state.images.length - 1
            : state.currentIndex - 1,
      };
    default:
      return state || initialState;
  }
};
