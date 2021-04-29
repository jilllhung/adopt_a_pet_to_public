import './App.css';
import PetList from './components/PetList';
import {Router} from '@reach/router';
import ShowPet from './components/ShowPet';
import PetAdoptionForm from './components/PetAdoptionForm';
import Home from './components/Home';

function App() {
  
  return (
    <div className="App" style={{width : "970px", margin : "0px auto", outline : "dotted red 2px"}}>
      <header style={{width : "970px", height : "50px", color : "red"}}>
        <h1>Website Name</h1>
      </header>
      <div style={{display: "flex", marginLeft : "200px", marginTop : "75px"}}>
        <button path="/pets/name/" type="button" class="btn btn-primary" style={{margin : "10px"}}>Find a Dog</button>
        <button type="button" class="btn btn-primary" style={{margin : "10px"}}>Find a Cat</button>
        <button type="button" class="btn btn-primary" style={{margin : "10px"}}>Do you know of a pet that needs a new home?</button>
      </div>
      <Router>
        <Home path="/pet/species/{spec}"/>
        <ShowPet path="/animals/:id"/>
        <PetList path="/animals" default/>
        <PetAdoptionForm path="/animal_form"/>
      </Router>
    </div>
  );
}

export default App;
