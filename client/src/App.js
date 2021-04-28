import './App.css';
import PetList from './components/PetList';
import {Router} from '@reach/router';
import ShowPet from './components/ShowPet';

function App() {
  
  return (
    <div className="App">
      <Router>
        <ShowPet path="/animals/:id"/>
        <PetList path="/animals" default/>
      </Router>
    </div>
  );
}

export default App;
