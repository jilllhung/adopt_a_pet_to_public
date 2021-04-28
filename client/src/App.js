import logo from './logo.svg';
import './App.css';
import axios from 'axios';

function App() {
  let x=async ()=>{
    try{
      let z=await axios.get("http://localhost:8080/getpets");
      console.log(z);
    }
    catch(e){
      console.log(e)
    }
  }
  x();
  return (
    <div className="App">
    </div>
  );
}

export default App;
