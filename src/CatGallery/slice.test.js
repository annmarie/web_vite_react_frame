/* globals jest, beforeEach, describe, expect, it */
import { configureStore } from '@reduxjs/toolkit';
import axios from 'axios';
import reducer, { initialState, fetchCatImages } from './slice';

jest.mock('axios');

describe('catGallerySlice', () => {
  let store;

  beforeEach(() => {
    jest.clearAllMocks();
    store = configureStore({ reducer });
  });

  it('should have the correct initial state', () => {
    const state = store.getState();
    expect(state).toEqual(initialState);
  });

  it('should handle fetchCatImages.pending', async () => {
    axios.get.mockResolvedValueOnce({ data: [] });

    const action = fetchCatImages.pending('fetchCatImages/pending');
    store.dispatch(action);

    const state = store.getState();
    expect(state.status).toBe('loading');
  });

  it('should handle fetchCatImages.fulfilled', async () => {
    const mockData = [
      { id: '1', url: 'https://example.com/cat1.jpg' },
      { id: '2', url: 'https://example.com/cat2.jpg' },
    ];
    axios.get.mockResolvedValueOnce({ data: mockData });

    await store.dispatch(fetchCatImages());

    const state = store.getState();
    expect(state.status).toBe('succeeded');
    expect(state.images).toEqual(mockData);
  });

  it('should handle fetchCatImages.rejected', async () => {
    const mockError = 'Network Error';
    axios.get.mockRejectedValueOnce(new Error(mockError));

    await store.dispatch(fetchCatImages());

    const state = store.getState();
    expect(state.status).toBe('failed');
    expect(state.error).toBe(mockError);
  });
});
