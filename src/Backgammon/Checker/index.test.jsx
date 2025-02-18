import { render, screen } from '@testing-library/react';
import { PLAYER_RIGHT, PLAYER_LEFT } from '../globals';
import Checker from '../Checker';

describe('Checker Component', () => {
  it('renders the checker div', () => {
    render(<Checker player={PLAYER_RIGHT} selected={false} />);
    const checkerElement = screen.getByTestId('checker');
    expect(checkerElement).toBeInTheDocument();
  });

  it('applies the correct class for PLAYER_RIGHT', () => {
    render(<Checker player={PLAYER_RIGHT} selected={false} />);
    const checkerElement = screen.getByTestId('checker');
    expect(checkerElement).toHaveClass('checker player_right');
  });

  it('applies the correct class for PLAYER_LEFT', () => {
    render(<Checker player={PLAYER_LEFT} selected={false} />);
    const checkerElement = screen.getByTestId('checker');
    expect(checkerElement).toHaveClass('checker player_left');
  });

  it('applies the "selected" class when selected is true', () => {
    render(<Checker player={PLAYER_RIGHT} selected={true} />);
    const checkerElement = screen.getByTestId('checker');
    expect(checkerElement).toHaveClass('selected');
  });

  test('does not apply the "selected" class when selected is false', () => {
    render(<Checker player={PLAYER_RIGHT} selected={false} />);
    const checkerElement = screen.getByTestId('checker');
    expect(checkerElement).not.toHaveClass('selected');
  });

  test('renders with no additional player class if player prop is invalid', () => {
    render(<Checker player="INVALID_PLAYER" selected={false} />);
    const checkerElement = screen.getByTestId('checker');
    expect(checkerElement).toHaveClass('checker');
    expect(checkerElement).not.toHaveClass('player_right');
    expect(checkerElement).not.toHaveClass('player_left');
  });
});
