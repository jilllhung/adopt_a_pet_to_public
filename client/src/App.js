import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Pet from './components/Pet';


function App() {
  let [pets,setPets]=useState([]);
  let x=async ()=>{
    try{
      let z=await axios.get("http://localhost:8080/getpets");
      console.log(z);
      setPets(z.data);
    }
    catch(e){
      console.log(e)
    }
  }
  useEffect(()=>{
    x();
  },[])
  return (
    <div className="App">
      {
        pets.map((pet,i)=>
          <Pet key={i} pet={pet}/>
        )
      }
    </div>
  );
}

export default App;
