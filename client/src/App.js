import './App.css';
import PetList from './components/PetList';
import {navigate, Router} from '@reach/router';
import ShowPet from './components/ShowPet';
import PetAdoptionForm from './components/PetAdoptionForm';
import Home from './components/Home';
import Test from './components/Test';
import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import PetsIcon from '@material-ui/icons/Pets';

function App() {

  const useStyles = makeStyles({
    root: {
      background: 'linear-gradient(45deg, #1F368B 30%, #6363F7 90%)',
      borderRadius: 3,
      border: 0,
      color: 'white',
      height: 48,
      padding: '0 30px',
      boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    },
    label: {
      textTransform: 'capitalize',
    },
  });

  
  const classes = useStyles();
  return (
    <div className="App" style={{width : "970px", margin : "0px auto", backgroundColor : "#EDEDED"}}>
      <header style={{width : "970px", height : "125px", backgroundColor : "#22327B", color : "white"}}>
        <h1 style={{paddingTop : "35px", paddingLeft : "30px"}}>Website Name</h1>
      </header>
      <div style={{display: "flex", marginLeft : "160px", marginTop : "25px"}}>
        <Button classes={{
        root: classes.root, // class name, e.g. `classes-nesting-root-x`
        label: classes.label // class name, e.g. `classes-nesting-label-x`
        }} type="button" style={{margin : "20px", height : "100px", width : "150px"}} onClick={(e) => {navigate("/animals/dog")}}>Find a Dog
        </Button>

        <Button classes={{
        root: classes.root, // class name, e.g. `classes-nesting-root-x`
        label: classes.label // class name, e.g. `classes-nesting-label-x`
        }}  style={{margin : "20px", height : "100px", width : "150px"}} onClick={(e) =>{navigate("/animals/cat");}}>Find a Cat
        </Button>

        <Button classes={{
        root: classes.root, // class name, e.g. `classes-nesting-root-x`
        label: classes.label // class name, e.g. `classes-nesting-label-x`
        }}  style={{margin : "20px", height : "100px", width : "150px"}} onClick={(e) =>{navigate("/animals/all");}}>Find All
        </Button>

        <Button classes={{
        root: classes.root, // class name, e.g. `classes-nesting-root-x`
        label: classes.label // class name, e.g. `classes-nesting-label-x`
        }} type="button"  style={{margin : "20px", height : "100px" ,width : "200px"}}>Do you know of a pet that needs a new home?
        </Button>

      </div>
      <Router>
        <Home path="/" default/> 
        <ShowPet path="/animals/show/:id"/>
        <PetList path="/animals" spec = "all"/>
        <PetList path="/animals/:spec"/>
        <PetAdoptionForm path="/animal_form"/>
        {/* <Test path="/test"/>  */}
      </Router>
    </div>
  );
}

export default App;

