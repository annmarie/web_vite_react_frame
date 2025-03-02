import { configureStore } from '@reduxjs/toolkit';
import mainReducer from './slice';
import ticTacToeReducer from './TicTacToe/slice';
import slidepuzzleReducer from './SlidePuzzle/slice';
import pongReducer from './PongGame/slice';
import pegSolitaireReducer from './PegSolitaire/slice';

export const reducer = {
    main: mainReducer,
    tictactoe: ticTacToeReducer,
    slidepuzzle: slidepuzzleReducer,
    pong: pongReducer,
    pegsolitaire: pegSolitaireReducer,
}

export const store = configureStore({ reducer });
