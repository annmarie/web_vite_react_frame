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
      <h3>Cat Gallery</h3>
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
          <button
            onClick={() => dispatch(fetchCatImages()) }
            style={{ width: '200px', height: '200px', margin: '10px', fontSize: '24px' }}
          >
            update
          </button>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default CatGallery;
