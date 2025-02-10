import { reducer, initialState } from './reducer';

describe('CatCarousel Reducer', () => {

  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should handle setting images', () => {
    const state = { ...initialState  };
    const fetchStartState = {
      ...state,
      isLoading: true,
      error: null
    };
    expect(reducer(state, { type: 'FETCH_START'})).toEqual(fetchStartState);
    const action = {
      type: 'SET_IMAGES',
      payload: {
        images: [{ url: 'https://example.com/cat1.jpg' }, { url: 'https://example.com/cat2.jpg' }],
        error: null,
      }
    };
    const setImageState = {
      ...state,
      images: action.payload.images,
      isLoading: false,
      error: null
    };
    expect(reducer(state, action)).toEqual(setImageState);
  });

  it('should handle moving to next image', () => {
    const state = {
      ...initialState,
      images: [{ url: 'https://example.com/cat1.jpg' }, { url: 'https://example.com/cat2.jpg' }],
    };
    const action = { type: 'NEXT_IMAGE' };
    const expectedState = {
      ...state,
      currentIndex: 1,
    };
    expect(reducer(state, action)).toEqual(expectedState);
  });

  it('should handle getting previous image', () => {
    const state = {
      ...initialState,
      images: [{ url: 'https://example.com/cat1.jpg' }, { url: 'https://example.com/cat2.jpg' }],
      currentIndex: 1,
    };
    const action = { type: 'PREVIOUS_IMAGE' };
    const expectedState = {
      ...state,
      currentIndex: 0,
    };
    expect(reducer(state, action)).toEqual(expectedState);
  });

  it('should handle setting the error for the api call', () => {
    const state = { ...initialState  };
    const action = {
      type: 'SET_IMAGES',
      payload: { images: [], error: 'Failed to fetch cat images.' }
    };
    const expectedState = {
      ...state,
      error: action.payload.error,
    };
    expect(reducer(state, action)).toEqual(expectedState);
  });
});
