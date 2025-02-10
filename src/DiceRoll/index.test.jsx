import { render, screen, fireEvent, act } from "@testing-library/react";
import { useState } from "react";
import DiceRoll from ".";

const ROLL_DICE_BUTTON_TEXT = /roll dice/i;
const DICE_DOT_LEFT_TEST_ID = /dice-dot-left/i;
const DICE_DOT_RIGHT_TEST_ID = /dice-dot-right/i;
const RESET_DICE_BUTTON_TEXT = 'Reset Dice';

describe("DiceRoll Component", () => {
  let DiceRollWrapper;

  beforeEach(async () => {
    DiceRollWrapper = () => {
      const [diceValue, setDiceValue] = useState(null);
      return (
        <>
          <button onClick={() => setDiceValue(null)}>{RESET_DICE_BUTTON_TEXT}</button>
          <DiceRoll reset={diceValue === null} setData={setDiceValue} />
        </>
      );
    };
  });

  it("should render the roll button", async () => {
    await act(async () => render(<DiceRollWrapper />));
    const rollButton = screen.getByRole("button", { name: ROLL_DICE_BUTTON_TEXT });
    expect(rollButton).toBeInTheDocument();
  });

  it("should roll the dice and display results", async () => {
    await act(async () => render(<DiceRollWrapper />));
    const rollButton = screen.getByRole("button", { name: ROLL_DICE_BUTTON_TEXT });
    expect(screen.queryAllByTestId(DICE_DOT_LEFT_TEST_ID).length).toBe(0);
    expect(screen.queryAllByTestId(DICE_DOT_RIGHT_TEST_ID).length).toBe(0);
    await act(async () => fireEvent.click(rollButton));
    expect(screen.queryAllByTestId(DICE_DOT_LEFT_TEST_ID).length).toBeGreaterThanOrEqual(1);
    expect(screen.queryAllByTestId(DICE_DOT_RIGHT_TEST_ID).length).toBeGreaterThanOrEqual(1);
  });

  it("should render the correct number of dots for each die", async () => {
    await act(async () => render(<DiceRollWrapper />));
    const rollButton = screen.getByRole("button", { name: ROLL_DICE_BUTTON_TEXT });
    for (let i = 0; i < 6; i++) { // Roll the dice 6 times
      await act(async () => fireEvent.click(rollButton));
      const diceDotsLeft = screen.getAllByTestId(DICE_DOT_LEFT_TEST_ID);
      expect(diceDotsLeft.length).toBeGreaterThanOrEqual(1);
      expect(diceDotsLeft.length).toBeLessThanOrEqual(6);
      const diceDotsRight = screen.getAllByTestId(DICE_DOT_RIGHT_TEST_ID);
      expect(diceDotsRight.length).toBeGreaterThanOrEqual(1);
      expect(diceDotsRight.length).toBeLessThanOrEqual(6);
    }
  });

  it("should reset the dice", async () => {
    await act(async () => render(<DiceRollWrapper />));
    const rollButton = screen.getByRole("button", { name: ROLL_DICE_BUTTON_TEXT });
    const resetButton = screen.getByRole("button", { name: RESET_DICE_BUTTON_TEXT });
    await act(async () => fireEvent.click(rollButton));
    expect(screen.queryAllByTestId(DICE_DOT_LEFT_TEST_ID).length).toBeGreaterThanOrEqual(1);
    expect(screen.queryAllByTestId(DICE_DOT_RIGHT_TEST_ID).length).toBeGreaterThanOrEqual(1);
    await act(async () => fireEvent.click(resetButton));
    expect(screen.queryAllByTestId(DICE_DOT_LEFT_TEST_ID).length).toBe(0);
    expect(screen.queryAllByTestId(DICE_DOT_RIGHT_TEST_ID).length).toBe(0);
  });
});
