import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useSelector, useDispatch, Provider } from 'react-redux';
import { store } from './store';
import { increment, decrement, incrementByAmount } from './counterSlice';
import DiceRoll from './DiceRoll';
import FormParts from './FormParts';
import SlidePuzzle from './SlidePuzzle';
import Connect4 from './Connect4';
import PegSolitaire from './PegSolitaire';
import CatCarousel from './CatCarousel';
import TicTacToe from './TicTacToe';
import PongGame from './PongGame';
import Backgammon from './Backgammon';

const Hello = () => {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <>
      <ul>
        <li><Link to="/connect4">Connect4</Link></li>
        <li><Link to="/ponggame">PongGame</Link></li>
        <li><Link to="/tictactoe">TicTacToe</Link></li>
        <li><Link to="/slidepuzzle">SlidePuzzle</Link></li>
        <li><Link to="/catcarousel">CatCarousel</Link></li>
        <li><Link to="/pegsolitaire">PegSolitaire</Link></li>
        <li><Link to="/backgammon">Backgammon</Link></li>
      </ul>
      <div>
        <p>Count: {count}</p>
        <button onClick={() => dispatch(increment())}>Increment</button>
        <button onClick={() => dispatch(decrement())}>Decrement</button>
        <button onClick={() => dispatch(incrementByAmount(5))}>Increment by 5</button>
      </div>
    </>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Hello />} />
          <Route path="/diceroll" element={<DiceRoll />} />
          <Route path="/formparts" element={<FormParts />} />
          <Route path="/slidepuzzle" element={<SlidePuzzle />} />
          <Route path="/connect4" element={<Connect4 />} />
          <Route path="/pegsolitaire" element={<PegSolitaire />} />
          <Route path="/catcarousel" element={<CatCarousel />} />
          <Route path="/tictactoe" element={<TicTacToe />} />
          <Route path="/ponggame" element={<PongGame />} />
          <Route path="/backgammon" element={<Backgammon />} />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
