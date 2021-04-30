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
  const [selectedTabColor, setSelectedTabColor] = useState(0);
  const [Icon, setIcon] = useState('')
  const [tab, setTab] = useState('');
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
      backgroundColor : "#EDEDED",
      minWidth:"970px",
    },
    selectedTab:{
      //background: 'linear-gradient(45deg, #1F368B 30%, #6363F7 90%)',
      background : "#05007C",
      borderRadius: 3,
      border: 0,
      color: 'white',
      padding: '0 30px',
      boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
      height : "100px",
      flexGrow:"1",
    }
  });

  
  const classes = useStyles();
  return (
    <div className={classes.app}>
      <header style={{height : "125px", backgroundColor : "#22327B", color : "white"}}>
        <h1 classes={{
        root: selectedTabColor===0 ? classes.selectedTab : classes.root}} style={{paddingTop : "35px", paddingLeft : "30px"}} onClick={()=>{navigate("/"); setSelectedTabColor(0)}}>WhereIsMyHuman</h1>
      </header>
      <div className={classes.buttonBar}>
        <Button startIcon={<PetsIcon />} classes={{
        root: selectedTabColor===1 ? classes.selectedTab : classes.root, // class name, e.g. `classes-nesting-root-x`
        label: classes.label // class name, e.g. `classes-nesting-label-x`
        }} type="button" name="dog" onClick={(e) => {navigate("/animals/dog"); setSelectedTabColor(1)}}>Find a Dog
        </Button>

        <Button startIcon={<PetsIcon />} classes={{
        root: selectedTabColor===2 ? classes.selectedTab : classes.root, // class name, e.g. `classes-nesting-root-x`
        label: classes.label // class name, e.g. `classes-nesting-label-x`
        }} name="cat" onClick={(e) =>{navigate("/animals/cat"); setSelectedTabColor(2)}}>Find a Cat
        </Button>

        <Button startIcon={<PetsIcon />} classes={{
        root: selectedTabColor===3 ? classes.selectedTab : classes.root, // class name, e.g. `classes-nesting-root-x`
        label: classes.label // class name, e.g. `classes-nesting-label-x`
        }} name="all" onClick={(e) =>{navigate("/animals/all"); setSelectedTabColor(3)}}>Find All
        </Button>

        <Button startIcon={<PetsIcon />} classes={{
        root: selectedTabColor===4 ? classes.selectedTab : classes.root, // class name, e.g. `classes-nesting-root-x`
        label: classes.label // class name, e.g. `classes-nesting-label-x`
        }} type="button" name="form" onClick={(e) =>{navigate("/animal_form"); setSelectedTabColor(4); setIcon("1")}}>Know of a pet in need?
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

//reset selected tab during an on click event
