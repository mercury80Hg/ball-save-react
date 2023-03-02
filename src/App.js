import './App.css';
import AddButton from './components/AddButton';
import DynamicBox from './components/DynamicBox';
import NavDisplay from './components/NavDisplay';

function App() {
  return (
    <div className="App">
      <div className='dead-div top'></div>
      <div className='ball-save-title'>Ball Save</div>
      <NavDisplay />
      <DynamicBox />
      <AddButton />
      <div className='dead-div bottom'></div>

    </div>
  );
}

export default App;
