import './App.css';
import Minter from './components/Minter';
import Navbar from './components/Navbar';

function App() {
  return (
    <div className="App">
        <Navbar />
        <header className="App-header">
          <Minter />
        </header>
    </div>
  );
}

export default App;
