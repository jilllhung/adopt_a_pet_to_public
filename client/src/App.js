import logo from './logo.svg';
import './App.css';
import axios from "axios";

function App() {
  let x=async()=>{
    let z= await axios.get("http://localhost:8080/testing");
    console.log(z);
  }
  x();
  return (
    <div className="App">
    </div>
  );
}

export default App;
