import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Dice from './Dice';
import './styles.css';

const DiceRoll = ({ reset = false }) => {
  const [diceValue, setDiceValue] = useState(null);

  const rollDice = () => {
    const die1 = Math.floor(Math.random() * 6) + 1;
    const die2 = Math.floor(Math.random() * 6) + 1;
    setDiceValue([die1, die2]);
  };

  useEffect(() => {
    if (reset) {
      setDiceValue(null);
    }
  }, [setDiceValue, reset]);

  return (
    <div className="dice-game">
      <Dice diceValue={diceValue} />

      <button
        className="dice-button"
        aria-label="Roll Dice"
        onClick={() => rollDice()}
      >
        Roll Dice
      </button>
    </div>
  );
};

DiceRoll.propTypes = {
  reset: PropTypes.bool,
}


export default DiceRoll;
