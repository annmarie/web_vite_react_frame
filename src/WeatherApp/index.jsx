import { useEffect, useReducer, useCallback } from 'react';
import axios from 'axios';
import './styles.css';


const initialState = {
  city: 'New York',
  weatherData: null,
  error: null,
  isLoading: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_CITY':
      return {
        ...state,
        city: action.payload,
      };
    case 'FETCH_START':
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case 'FETCH_DATA': {
      const { data, error } = action.payload;
      return {
        ...state,
        weatherData: (data || []).length === 0 ? null : data,
        error: error || null,
        isLoading: false,
      };
    }
    default:
      return state || initialState;
  }
};

function WeatherApp() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchWeatherData = useCallback(async () => {
    dispatch({ type: 'FETCH_START' });
    const apiUrl = `https://api.weatherapi.com/v1/current.json`
      + `?q=${encodeURIComponent(state.city)}&key=`;

    try {
      const { data } = await axios.get(apiUrl);
      dispatch({
        type: 'FETCH_DATA',
        payload: { data, error: null },
      });
    } catch (error) {
      console.error('Error fetching weather data:', error);
      dispatch({
        type: 'FETCH_DATA',
        payload: { data: null, error: 'Failed to fetch weather data.' },
      });
    }
  }, [state.city]);

  useEffect(() => {
    fetchWeatherData();
  }, [fetchWeatherData]);

  const handleCityChange = (event) => {
    dispatch({ type: 'SET_CITY', payload: event.target.value });
  };

  return (
    <div className="weather-app">
      <h1 className="app-title">Weather App</h1>
      <div className="input-container">
        <label htmlFor="city" className="input-label">Select a city:</label>
        <select
          id="city"
          value={state.city}
          onChange={handleCityChange}
          className="city-select"
        >
          <option value="New York">New York</option>
          <option value="London">London</option>
          <option value="Tokyo">Tokyo</option>
        </select>
      </div>
      {state.isLoading ? (
        <p className="loading-message">Loading...</p>
      ) : state.error ? (
        <p className="error-message">{state.error}</p>
      ) : state.weatherData ? (
        <div className="weather-info">
          <h2 className="weather-location">Weather in {state.weatherData.location.name}</h2>
          <p className="weather-temp">Temperature: {state.weatherData.current.temp_f}°F</p>
          <p className="weather-condition">Weather: {state.weatherData.current.condition.text}</p>
        </div>
      ) : (
        <p className="error-message">No Data</p>
      )}

      <div
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
        style={{ position: 'absolute', left: '-9999px' }}
      >
        {state.error
          ? `Error: ${state.error}`
          : state.weatherData
            ? `Weather in ${state.weatherData.location.name}:
              ${state.weatherData.current.temp_f}°F,
              ${state.weatherData.current.condition.text}`
            : 'No weather data available.'
        }
      </div>
    </div>
  );
}

export default WeatherApp;
