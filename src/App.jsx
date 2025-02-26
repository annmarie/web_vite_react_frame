import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
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
  return (
    <ul>
      <li><Link to="/connect4">Connect4</Link></li>
      <li><Link to="/ponggame">PongGame</Link></li>
      <li><Link to="/tictactoe">TicTacToe</Link></li>
      <li><Link to="/catcarousel">CatCarousel</Link></li>
      <li><Link to="/pegsolitaire">PegSolitaire</Link></li>
      <li><Link to="/diceroll">DiceRoll</Link></li>
      <li><Link to="/backgammon">Backgammon</Link></li>
    </ul>
  )
}

const App = () => {
  return (
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
        <Route path="/PongGame" element={<PongGame />} />
        <Route path="/Backgammon" element={<Backgammon />} />
      </Routes>
    </Router>
  );
};

export default App;
