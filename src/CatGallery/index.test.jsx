import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import catgalleryReducer from './slice';
import CatGallery from '../CatGallery';

describe('CatGallery Component', () => {
  const renderWithStore = (preloadedState) => {
    const store = configureStore({
      reducer: {
        catgallery: catgalleryReducer,
      },
      preloadedState,
    });

    return render(
      <Provider store={store}>
        <CatGallery />
      </Provider>
    );
  };

  it('should render loading state', () => {
    renderWithStore({
      catgallery: {
        images: [],
        status: 'loading',
        error: null,
      },
    });

    expect(screen.getByText(/loading.../i)).toBeInTheDocument();
  });

  it('should render error state', () => {
    renderWithStore({
      catgallery: {
        images: [],
        status: 'failed',
        error: 'Failed to fetch cat images',
      },
    });

    expect(screen.getByText(/failed to fetch cat images/i)).toBeInTheDocument();
  });

  it('should render cat images when succeeded', () => {
    renderWithStore({
      catgallery: {
        images: [
          { id: '1', url: 'https://example.com/cat1.jpg' },
          { id: '2', url: 'https://example.com/cat2.jpg' },
        ],
        status: 'succeeded',
        error: null,
      },
    });

    const images = screen.getAllByRole('img');
    expect(images).toHaveLength(2);
    expect(images[0]).toHaveAttribute('src', 'https://example.com/cat1.jpg');
    expect(images[1]).toHaveAttribute('src', 'https://example.com/cat2.jpg');
  });
});
