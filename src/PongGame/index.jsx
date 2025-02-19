import { useReducer, useEffect, useRef } from 'react';
import { reducer, initialState } from './reducer';
import {
  MOVE_PADDLE_LEFT, MOVE_PADDLE_RIGHT, MOVE_BALL,
  TOGGLE_GAME, RESET_GAME
} from './actionTypes'
import PongBoard from './PongBoard';
import './styles.css';

const PongGame = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const gameRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'w') dispatch({ type: MOVE_PADDLE_LEFT, payload: -20 });
      if (e.key === 's') dispatch({ type: MOVE_PADDLE_LEFT, payload: 20 });
      if (e.key === 'ArrowUp') dispatch({ type: MOVE_PADDLE_RIGHT, payload: -20 });
      if (e.key === 'ArrowDown') dispatch({ type: MOVE_PADDLE_RIGHT, payload: 20 });
      if (e.key === 'o') dispatch({ type: MOVE_PADDLE_RIGHT, payload: -20 });
      if (e.key === 'l') dispatch({ type: MOVE_PADDLE_RIGHT, payload: 20 });
      if (e.key === ' ') dispatch({ type: TOGGLE_GAME });
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const intervalRef = useRef(null);
  useEffect(() => {
    if (state.pause) {
      clearInterval(intervalRef.current);
    } else {
      intervalRef.current = setInterval(() => {
        dispatch({ type: MOVE_BALL });
      }, 16);
    }

    return () => clearInterval(intervalRef.current);
  }, [state.pause]);

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
        onClick={() => dispatch({ type: TOGGLE_GAME })}
      >
        {state.pause ? 'Play' : 'Pause'}
      </button>

      <button
        aria-label="Reset Game"
        onClick={() => dispatch({ type: RESET_GAME })}
      >
        Reset
      </button>
    </div>
  );
};

export default PongGame;
