import './App.css';
import FormParts from './FormParts';
import CatCarousel from './CatCarousel';
import TicTacToe from './TicTacToe';
import DiceRoll from './DiceRoll';
import PegSolitaire from './PegSolitaire';

function App() {
  const components = [
    { id: "FormParts", component: <FormParts /> },
    { id: "DiceRoll", component: <DiceRoll defaultDiceValue={[4, 6]} /> },
    { id: "TicTackToe", component: <TicTacToe /> },
    { id: "CatCarousel", component: <CatCarousel /> },
    { id: "PegSolitaire", component: <PegSolitaire /> },
  ];

  return (<div className="main">
    <h1>hello</h1>
    <div className="well">
      {components.map(({ id, component }) => (
        <div key={id} className="well-item">
          {component}
        </div>
      ))}
    </div>
  </div>);
}

export default App
