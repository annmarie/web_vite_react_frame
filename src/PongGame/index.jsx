import { useReducer, useEffect, useRef } from "react";
import { reducer, initialState } from "./reducer";
import {
  MOVE_PADDLE1, MOVE_PADDLE2, MOVE_BALL,
  TOGGLE_GAME, RESET_GAME
} from './actionTypes'
import "./styles.css";


const PongGame = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const gameRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "w") dispatch({ type: MOVE_PADDLE1, payload: -20 });
      if (e.key === "s") dispatch({ type: MOVE_PADDLE1, payload: 20 });
      if (e.key === "ArrowUp") dispatch({ type: MOVE_PADDLE2, payload: -20 });
      if (e.key === "ArrowDown") dispatch({ type: MOVE_PADDLE2, payload: 20 });
      if (e.key === "o") dispatch({ type: MOVE_PADDLE2, payload: -20 });
      if (e.key === "l") dispatch({ type: MOVE_PADDLE2, payload: 20 });
      if (e.key === " ") dispatch({ type: TOGGLE_GAME });
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
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

  const { ball, paddle1, paddle2, score } = state;

  return (
    <div className="pong-game-wrapper">
      <div ref={gameRef} className="pong-game-board">
        <div className="score">
          Player 1: {score.player_one} | Player 2: {score.player_two}
        </div>
        <div
          className="paddle"
          style={{ top: paddle1, left: 10 }}
        ></div>
        <div
          className="paddle"
          style={{ top: paddle2, right: 10 }}
        ></div>
        <div
          className="ball"
          style={{ top: ball.y, left: ball.x }}
        ></div>
      </div>

      <button
        aria-label="Play/Pause Game"
        onClick={() => dispatch({ type: TOGGLE_GAME })}
      >
        {state.pause ? "Play" : "Pause"}
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
