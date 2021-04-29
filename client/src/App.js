import './App.css';
import PetList from './components/PetList';
import {navigate, Router} from '@reach/router';
import ShowPet from './components/ShowPet';
import PetAdoptionForm from './components/PetAdoptionForm';
import Home from './components/Home';
import { useState } from 'react';

function App() {
  const [spec, setSpec] = useState("all");
  return (
    <div className="App" style={{width : "970px", margin : "0px auto", outline : "dotted red 2px"}}>
      <header style={{width : "970px", height : "50px", color : "red"}}>
        <h1>Website Name</h1>
      </header>
      <div style={{display: "flex", marginLeft : "200px", marginTop : "75px"}}>
        <button  type="button" class="btn btn-primary" style={{margin : "10px"}} onClick={(e) => {setSpec("dog"); navigate("/animals/dog")}}>Find a Dog</button>
        <button  class="btn btn-primary" style={{margin : "10px"}} onClick={(e) =>{setSpec("cat");navigate("/animals/cat");}}>Find a Cat</button>
        <button  class="btn btn-primary" style={{margin : "10px"}} onClick={(e) =>{setSpec("all"); navigate("/animals/all")}}>Find All</button>
        <button type="button" class="btn btn-primary" style={{margin : "10px"}}>Do you know of a pet that needs a new home?</button>
      </div>
      <Router>
        <Home path="/"/>
        <ShowPet path="/animals/show/:id"/>
        <PetList path="/animals/*" default spec = {spec}/>
        <PetAdoptionForm path="/animal_form"/>
      </Router>
    </div>
  );
}

export default App;

