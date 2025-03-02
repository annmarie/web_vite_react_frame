import { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { moveBall, movePaddleLeft, movePaddleRight, togglePause, resetGame } from './slice'
import PongBoard from './PongBoard';
import './styles.css';

const PongGame = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.pong );
  const gameRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'w') dispatch(movePaddleLeft(-20));
      if (e.key === 's') dispatch(movePaddleLeft(20));
      if (e.key === 'ArrowUp') dispatch(movePaddleRight(-20));
      if (e.key === 'ArrowDown') dispatch(movePaddleRight(20));
      if (e.key === 'o') dispatch(movePaddleRight(-20));
      if (e.key === 'l') dispatch(movePaddleRight(20));
      if (e.key === ' ') dispatch(togglePause());
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [dispatch]);

  const intervalRef = useRef(null);
  useEffect(() => {
    if (state.pause) {
      clearInterval(intervalRef.current);
    } else {
      intervalRef.current = setInterval(() => {
        dispatch(moveBall());
      }, 16);
    }

    return () => clearInterval(intervalRef.current);
  }, [state.pause, dispatch]);

  const { ball, paddle_left, paddle_right, score } = state;

  return (
    <div className="pong-game-wrapper">

      <PongBoard
        gameRef={gameRef}
        ball={ball}
        paddle_left={paddle_left}
        paddle_right={paddle_right}
        score={score}
      />

      <div className="legend">
        <div>w - left up<br />s - left up</div>
        <div>spacebar to play/pause</div>
        <div>o - left up<br />l - left up</div>
      </div>

      <button
        aria-label="Play/Pause Game"
        onClick={() => dispatch(togglePause())}
      >
        {state.pause ? 'Play' : 'Pause'}
      </button>

      <button
        aria-label="Reset Game"
        onClick={() => dispatch(resetGame())}
      >
        Reset
      </button>
    </div>
  );
};

export default PongGame;
