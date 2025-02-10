import { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import "./styles.css";

const Dice = ({ diceValue = null }) => {

  const renderDots = (numDots, diceId) => {
    const dotPositions = {
      1: [4],
      2: [0, 8],
      3: [0, 4, 8],
      4: [0, 2, 6, 8],
      5: [0, 2, 4, 6, 8],
      6: [0, 2, 3, 5, 6, 8],
    };

    const positions = dotPositions[numDots] || [];
    return Array.from({ length: 9 }).map((_, index) => (
      <div
        key={index}
        className={positions.includes(index) ? `dice-dot` : ""}
        data-testid={positions.includes(index) ? `dice-dot-${diceId}` : ""}
      />
    ));
  };

  return (diceValue && <div className="dice-container">
    <div
      aria-label={`Dice 1 showing ${diceValue[0]}`}
      className="dice">{renderDots(diceValue[0], 'left')}</div>
    <div
      aria-label={`Dice 2 showing ${diceValue[1]}`}
      className="dice">{renderDots(diceValue[1], 'right')}</div>
  </div>)
};

Dice.propTypes = {
  diceValue: PropTypes.array
}

const getDefaultState = (defaultDiceValue) => {
  return Array.isArray(defaultDiceValue)
    ? defaultDiceValue
    : null;
}

const DiceRoll = ({
  defaultDiceValue = null,
  reset = false,
  rollDisabled = false,
  setData = () => { },
}) => {
  const defaultState = getDefaultState(defaultDiceValue);
  const [diceValue, setDiceValue] = useState(defaultState);

  const rollDice = () => {
    const die1 = Math.floor(Math.random() * 6) + 1;
    const die2 = Math.floor(Math.random() * 6) + 1;
    setDiceValue([die1, die2]);
    if (setData) setData([die1, die2]);
  };

  useEffect(() => {
    if (reset) {
      setDiceValue(null);
    }
  }, [reset]);

  return (
    <div className="dice-game">
      <Dice diceValue={diceValue} />

      <button
        className="dice-button"
        aria-label="Roll Dice"
        onClick={() => rollDice()}
        disabled={rollDisabled}
      >
        Roll Dice
      </button>
    </div>
  );
};

DiceRoll.propTypes = {
  defaultDiceValue: PropTypes.array,
  reset: PropTypes.bool,
  setData: PropTypes.func,
  rollDisabled: PropTypes.bool,
};

export default DiceRoll;
