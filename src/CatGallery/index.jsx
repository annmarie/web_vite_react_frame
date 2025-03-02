import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCatImages } from './slice';

const CatGallery = () => {
  const dispatch = useDispatch();
  const { images, status, error } = useSelector((state) => state.catgallery);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchCatImages());
    }
  }, [status, dispatch]);

  return (
    <div>
    <h1>Cat Gallery</h1>
    {status === 'failed' ? (
      <p>{error}</p>
    ) : status === 'succeeded' ? (
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {images.map((cat) => (
          <img
            key={cat.id}
            src={cat.url}
            alt="A cute cat"
            style={{ width: '200px', height: '200px', margin: '10px' }}
          />
        ))}
      </div>
    ) : (
      <p>Loading...</p>
    )}
  </div>
  );
};

export default CatGallery;
