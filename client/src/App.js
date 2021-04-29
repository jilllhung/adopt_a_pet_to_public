import './App.css';
import PetList from './components/PetList';
import {Router} from '@reach/router';
import ShowPet from './components/ShowPet';
import PetAdoptionForm from './components/PetAdoptionForm';
import Home from './components/Home';

function App() {
[spec, setSpec] = useState("all");
  return (
    <div className="App" style={{width : "970px", margin : "0px auto", outline : "dotted red 2px"}}>
      <header style={{width : "970px", height : "50px", color : "red"}}>
        <h1>Website Name</h1>
      </header>
      <div style={{display: "flex", marginLeft : "200px", marginTop : "75px"}}>
        <button  type="button" class="btn btn-primary" style={{margin : "10px"}} onClick={(e) => setSpec("dog")}>Find a Dog</button>
        <button  class="btn btn-primary" style={{margin : "10px"}} onClick={(e) => setSpec("cat")}>Find a Cat</button>
        <button type="button" class="btn btn-primary" style={{margin : "10px"}}>Do you know of a pet that needs a new home?</button>
      </div>
      <Router>
        <Home path="/"/>
        <ShowPet path="/animals/:id"/>
        <PetList path="/animals" default spec = {spec}/>
        <PetAdoptionForm path="/animal_form"/>
      </Router>
    </div>
  );
}

export default App;

