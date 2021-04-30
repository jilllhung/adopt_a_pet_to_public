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
      padding: '0 30px',
      boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
      height : "100px",
      flexGrow:"1",
      // width : "250px"
    },
    label: {
      textTransform: 'capitalize',
      fontSize:"1.3rem",
    },
    buttonBar:{
      display: "flex",
      margin: "auto",
      justifyContent:"center",
      padding: "20px",
      gap:"20px",
      width : "75vw",
      minWidth:"690px",
      // border:"red dotted 1px",
    },
    app:{
      minHeight:"100vh",
      // backgroundColor : "#EDEDED",
      backgroundImage:"linear-gradient(to bottom,rgba(237, 237 , 237 , 0.85) 0%, rgba(237, 237 , 237 , 0.85) 100%), url(http://localhost:8080/img/bkg.png)",
      backgroundPosition: "center",
      backgroundSize: "200px",
      minWidth:"970px",
    }
  });
  
  const classes = useStyles();
  return (
    <div className={classes.app}>
      <header style={{height : "125px", backgroundColor : "#22327B", color : "white"}}>
        <h1 style={{paddingTop : "35px", paddingLeft : "30px"}} onClick={()=>{navigate("/");}}>Website Name</h1>
      </header>
      <div className={classes.buttonBar}>
        <Button startIcon={<PetsIcon />} classes={{
        root: classes.root, // class name, e.g. `classes-nesting-root-x`
        label: classes.label // class name, e.g. `classes-nesting-label-x`
        }} type="button" onClick={(e) => {navigate("/animals/dog")}}>Find a Dog
        </Button>

        <Button startIcon={<PetsIcon />} classes={{
        root: classes.root, // class name, e.g. `classes-nesting-root-x`
        label: classes.label // class name, e.g. `classes-nesting-label-x`
        }} onClick={(e) =>{navigate("/animals/cat");}}>Find a Cat
        </Button>

        <Button startIcon={<PetsIcon />} classes={{
        root: classes.root, // class name, e.g. `classes-nesting-root-x`
        label: classes.label // class name, e.g. `classes-nesting-label-x`
        }} onClick={(e) =>{navigate("/animals/all");}}>Find All
        </Button>

        <Button startIcon={<PetsIcon />} classes={{
        root: classes.root, // class name, e.g. `classes-nesting-root-x`
        label: classes.label // class name, e.g. `classes-nesting-label-x`
        }} type="button" onClick={(e) =>{navigate("/animal_form");}}>Know of a pet in need?
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

