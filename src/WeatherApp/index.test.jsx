import { render, screen, fireEvent, act } from '@testing-library/react';
import axios from 'axios';
import WeatherApp from '../WeatherApp';

jest.mock('axios');

// Mock console.log
jest.spyOn(console, 'log').mockImplementation();
jest.spyOn(console, 'error').mockImplementation();

describe('WeatherApp Component', () => {
  const mockWeatherNY = {
    location: { name: 'New York' },
    current: { temp_f: 75, condition: { text: 'Sunny' } },
  }
  const mockWeatherLon = {
    location: { name: 'London' },
    current: { temp_f: 65, condition: { text: 'Clear' } },
  }

  it("should render error message when no data is found", async () => {
    axios.get.mockRejectedValueOnce(new Error('API Error'));
    await act(async () => render(<WeatherApp />));
    expect(screen.getAllByText(/failed to fetch weather data/i).length).toBeGreaterThan(0);
  });

  it('should render the UI', async () => {
    axios.get.mockResolvedValueOnce({ data: mockWeatherNY });
    await act(async () => render(<WeatherApp />));
    expect(screen.getByText(/Weather App/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Weather in New York/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/Temperature: 75°F/i)).toBeInTheDocument();
    expect(screen.getByText(/Weather: Sunny/i)).toBeInTheDocument();
  });

  it('should allow the user to change the city using the select dropdown', async () => {
    axios.get.mockResolvedValueOnce({ data: mockWeatherNY });
    await act(async () => render(<WeatherApp />));
    const selectElement = screen.getByLabelText(/Select a city:/i);
    expect(selectElement.value).toBe('New York');
    fireEvent.change(selectElement, { target: { value: 'London' } });
    expect(selectElement.value).toBe('London');
  });

  it('should render the selected city using the select dropdown', async () => {
    axios.get.mockResolvedValueOnce({ data: mockWeatherNY });
    await act(async () => render(<WeatherApp />));
    const selectElement = screen.getByLabelText(/Select a city:/i);
    axios.get.mockResolvedValueOnce({ data: mockWeatherLon });
    await act(async () => fireEvent.change(selectElement, { target: { value: 'London' } }));
    expect(selectElement.value).toBe('London');
    expect(screen.getAllByText(/Weather in London/i).length).toBeGreaterThan(0)
    expect(screen.getByText(/Temperature: 65°F/i)).toBeInTheDocument();
    expect(screen.getByText(/Weather: Clear/i)).toBeInTheDocument();
  });
});
