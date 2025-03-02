import { configureStore } from '@reduxjs/toolkit';
import mainReducer from './slice';
import ticTacToeReducer from './TicTacToe/slice';
import slidepuzzleReducer from './SlidePuzzle/slice';
import pegSolitaireReducer from './PegSolitaire/slice';
import connect4Reducer from './Connect4/slice';
import catGalleryReducer from './CatGallery/slice';
import backgammonReducer from './Backgammon/slice';

export const reducer = {
    main: mainReducer,
    tictactoe: ticTacToeReducer,
    slidepuzzle: slidepuzzleReducer,
    pegsolitaire: pegSolitaireReducer,
    connect4: connect4Reducer,
    catgallery: catGalleryReducer,
    backgammon: backgammonReducer,
}

export const store = configureStore({ reducer });
