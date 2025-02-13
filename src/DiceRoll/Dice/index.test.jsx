
import { render, screen, act } from "@testing-library/react";
import Dice from "../Dice";

const DICE_DOT_LEFT_TEST_ID = /die-dot-left/i;
const DICE_DOT_RIGHT_TEST_ID = /die-dot-right/i;

describe("Dice Component", () => {

  it("should render nothing when no props are passed", async () => {
    await act(async () => render(<Dice />));
    expect(screen.queryAllByTestId(DICE_DOT_LEFT_TEST_ID).length).toBe(0);
    expect(screen.queryAllByTestId(DICE_DOT_RIGHT_TEST_ID).length).toBe(0);
  });

  it("should render nothing when diceValue passed is null", async () => {
    await act(async () => render(<Dice diceValue={null} />));
    expect(screen.queryAllByTestId(DICE_DOT_LEFT_TEST_ID).length).toBe(0);
    expect(screen.queryAllByTestId(DICE_DOT_RIGHT_TEST_ID).length).toBe(0);
  });

  it("should render dice with diceValue", async () => {
    const [leftDie, rightDie] = [ 4, 6 ]
    await act(async () => render(<Dice diceValue={[leftDie, rightDie]} />));
    expect(screen.queryAllByTestId(DICE_DOT_LEFT_TEST_ID).length).toBe(leftDie);
    expect(screen.queryAllByTestId(DICE_DOT_RIGHT_TEST_ID).length).toBe(rightDie);
  });
});
