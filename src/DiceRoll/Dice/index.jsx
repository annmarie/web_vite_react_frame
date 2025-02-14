import PropTypes from 'prop-types';
import './styles.css';
import { useEffect, useState } from 'react';

const Dice = ({ diceValue = null }) => {
  const [rolling, setRolling] = useState(false);

  useEffect(() => {
    if (diceValue) {
      setRolling(true);
      const timer = setTimeout(() => setRolling(false), 1000); // Animation duration
      return () => clearTimeout(timer);
    }
  }, [diceValue]);

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
        className={`die-dot ${positions.includes(index) ? 'visible' : ''} ${rolling ? 'animate' : ''}`}
        data-testid={positions.includes(index) ? `die-dot-${diceId}` : ""}
      />
    ));
  };

  return (
    diceValue && (
      <div className="dice-container">
        <div
          aria-label={`Dice 1 showing ${diceValue[0]}`}
          className="die">{renderDots(diceValue[0], 'left')}</div>
        <div
          aria-label={`Dice 2 showing ${diceValue[1]}`}
          className="die">{renderDots(diceValue[1], 'right')}</div>
      </div>
    )
  );
};

Dice.propTypes = {
  diceValue: PropTypes.array
};

export default Dice;