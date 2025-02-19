import PropTypes from 'prop-types';
import './styles.css';

const PongBoard = ({ gameRef, ball, paddle_left, paddle_right, score }) => {
  return (
    <div ref={gameRef} className="pong-game-board">
      <div className="score">
        Player 1: {score.player_left} | Player 2: {score.player_right}
      </div>

      <div
        className="paddle"
        role="paddle_left"
        style={{ top: paddle_left, left: 10 }}
      ></div>
      <div
        className="paddle"
        role="paddle_right"
        style={{ top: paddle_right, right: 10 }}
      ></div>
      <div
        className="ball"
        style={{ top: ball.y, left: ball.x }}
        role="ball"
      ></div>
    </div>
  );
};


PongBoard.propTypes = {
  gameRef: PropTypes.object.isRequired,
  ball: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  }).isRequired,
  paddle_left: PropTypes.number.isRequired,
  paddle_right: PropTypes.number.isRequired,
  score: PropTypes.shape({
    player_left: PropTypes.number.isRequired,
    player_right: PropTypes.number.isRequired,
  }).isRequired,
};

export default PongBoard;
