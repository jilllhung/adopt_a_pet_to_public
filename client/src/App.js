import './App.css';
import PetList from './components/PetList';
import {Router} from '@reach/router';
import ShowPet from './components/ShowPet';
import PetAdoptionForm from './components/PetAdoptionForm';
import Home from './components/Home';

function App() {
  
  return (
    <div className="App">
      <Router>
        <Home path="/"/>
        <ShowPet path="/animals/:id"/>
        <PetList path="/animals" default/>
        <PetAdoptionForm path="/animal_form"/>
      </Router>
    </div>
  );
}

export default App;
