import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchCatImages = createAsyncThunk(
  'cats/fetchCatImages',
  async () => {
    const { data } = await axios.get('https://api.thecatapi.com/v1/images/search?limit=10');
    return data;
  }
);

export const initialState = {
  images: [],
  currentIndex: 0,
  status: 'idle',
  error: null,
};

const catGallerySlice = createSlice({
  name: 'cats',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCatImages.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCatImages.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.images = action.payload;
      })
      .addCase(fetchCatImages.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default catGallerySlice.reducer;
