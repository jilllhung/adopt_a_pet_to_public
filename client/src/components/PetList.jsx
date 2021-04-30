import axios from 'axios';
import { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles'; //styling for react similar to bootstrap
import Pet from './Pet';


const useStyles = makeStyles({
    showdiv: {
        margin: "auto",
        display:"flex",
        gap:"15px",
        padding:"15px",
        maxWidth:"100vw",
        flexWrap:"wrap",
    },
    form: {
        margin: "auto",
        display:"flex",
        justifyContent:"center",
        gap:"15px",
        padding:"15px",
        // border:"red dotted 1px"
    },
    formEle: {
        display:"flex",
        gap:"15px",
        padding:"15px",
        // border:"red dotted 1px"
    },

});

export default (props)=>{
    const classes = useStyles();
    let [pets,setPets]=useState([]);
    let [breedList,setBreedList]=useState([]);
    let [breed,setBreed]=useState("");
    let [age,setAge]=useState("");
    console.log(props)
    useEffect(()=>{
        let loaded=true;
        let x=async ()=>{
            try{
                let pls=await axios.get(`http://localhost:8080/pets/${props.spec}`);
                let bls=await axios.get(`http://localhost:8080/breeds/species/${props.spec}`);
                console.log(pls);
                console.log(bls);
                if(loaded){
                    setPets(pls.data);
                    setBreedList(bls.data)
                    setBreed("");
                }
            }
            catch(e){
                console.log(e)
            }
        }
        x();
        return ()=>{loaded=false;}
    },[props.spec])
    let AgeSelect=(e)=>{
        console.log(e.target.value);
        setAge(e.target.value);
    }
    return(
        <div>
            <div className={classes.form}>
                <div className={classes.formEle}>
                    <label htmlFor="ageGroup">Age Group</label>
                    <select onChange={AgeSelect} value={age}>
                        <option value="">--------</option>
                        <option value="baby">Baby</option>
                        <option value="young">Young</option>
                        <option value="adult">Adult</option>
                        <option value="senior">Senior</option>
                    </select>
                </div>
                <div className={classes.formEle}>
                    <label htmlFor="breed">Breed</label>
                    <select onChange={(e)=>setBreed(e.target.value)} value={breed}>
                        <option value="">--------</option>
                        {breedList.map((br,i)=>(
                            <option key={i} value={br.name}>{br.name}</option>
                        )
                        )}
                    </select>
                </div>
            </div>
            <h1 style={{margin:"15px"}}>Adopt Me Please</h1>
            <div className={classes.showdiv}>
            {
            pets
            .filter(pet=>age===""||(pet.ageGrp&&pet.ageGrp.name.toLowerCase()===age))
            .filter(pet=> breed===""||(pet.breedPrimary&&pet.breedPrimary.name===breed)||(pet.breedSecondary&&pet.breedSecondary.name===breed))
            .map((pet,i)=>
                <Pet key={i} pet={pet}/>
            )}
            </div>
        </div>
    )
}