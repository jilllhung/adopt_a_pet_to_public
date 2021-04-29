import './App.css';
import PetList from './components/PetList';
import {Router} from '@reach/router';
import ShowPet from './components/ShowPet';
import PetAdoptionForm from './components/PetAdoptionForm';
import Home from './components/Home';

function App() {
  
  return (
    <div className="App" style={{width : "970px", margin : "0px auto", outline : "dotted red 2px"}}>
      <header style={{width : "970px", height : "50px", color : "red"}}></header>
      <div style={{display: "flex", marginLeft : "200px"}}>
        <button style={{width : "75px", height : "height 50px", margin : "10px"}}>Find a Dog</button>
        <button style={{width : "75px", height : "height 50px", margin : "10px"}}>Find a Cat</button>
        <button style={{width : "200px", height : "height 50px", margin : "10px"}}>Do you know of a pet that needs a new home?</button>
      </div>
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
