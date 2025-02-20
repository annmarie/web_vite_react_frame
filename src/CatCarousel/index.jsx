import { useReducer, useEffect, useCallback } from 'react';
import axios from 'axios';
import { FETCH_START, SET_IMAGES, NEXT_IMAGE, PREVIOUS_IMAGE } from './actionTypes'
import { REFRESH_BUTTON_TEXT, NEXT_BUTTON_TEXT, PREV_BUTTON_TEXT } from './globals';
import { initialState, reducer } from './reducer';
import './styles.css';

const CatCarousel = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const currentImage = state.images[state.currentIndex] || { url: '' };
  const handleRefresh = () => fetchCatImages();

  const fetchCatImages = useCallback(async () => {
    dispatch({ type: FETCH_START });
    const catUrl = 'https://api.thecatapi.com/v1/images/search?limit=10';
    try {
      const { data } = await axios.get(catUrl);
      if (data) {
        dispatch({
          type: SET_IMAGES,
          payload: { images: data, error: null }
        });
      } else {
        dispatch({
          type: SET_IMAGES,
          payload: { images: null, error: 'Failed to fetch valid cat images.' }
        });
      }
    } catch (error) {
      console.error('Error fetching cat images:', error);
      dispatch({
        type: SET_IMAGES,
        payload: { images: null, error: 'Failed to fetch cat images.' }
      });
    }
  }, []);

  useEffect(() => {
    fetchCatImages();
  }, [fetchCatImages]);

  return (
    <div className="cat-carousel">
      <h3 className="cat-title">Cat Carousel</h3>
      {state.error ? (
        <p className="error-message">{state.error}</p>
      ) : state.isLoading ? (
        <p>Loading...</p>
      ) : state.images.length > 0 ? (
        <div>
          <div>
            <button
              onClick={() => dispatch({ type: PREVIOUS_IMAGE })}
              aria-label="Previous Image"
            >
             {PREV_BUTTON_TEXT}
            </button>
            <button
              onClick={() => dispatch({ type: NEXT_IMAGE })}
              aria-label="Next Image"
            >
             {NEXT_BUTTON_TEXT}
            </button>
            <button
              onClick={handleRefresh}
              aria-label="Refresh Images"
            >
             {REFRESH_BUTTON_TEXT}
            </button>
          </div>
          <div className="cat-pictures">
            <img
              src={currentImage.url}
              className="cat-image"
              alt={currentImage.url ? `Cat Image ${state.currentIndex}` : 'No image available'} />
          </div>
        </div>
      ) : (
        <p className="error-message">No Data</p>
      )}
    </div>
  );
};

export default CatCarousel;
