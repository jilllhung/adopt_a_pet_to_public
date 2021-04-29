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
        justifyContent:"space-between",
        gap:"15px",
        padding:"15px",
    },
    formEle: {
        margin: "auto",
        display:"flex",
        justifyContent:"space-between",
        gap:"15px",
        padding:"15px",
    },

});

export default (props)=>{
    const classes = useStyles();
    let [pets,setPets]=useState([]);
    let [age,setAge]=useState("");
    useEffect(()=>{
        let loaded=true;
        let x=async ()=>{
            try{
                let z=await axios.get(`http://localhost:8080/pets/${props.spec}`);
                console.log(z);
                if(loaded)setPets(z.data);
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
                        <option value="young">Young</option>
                        <option value="adult">Adult</option>
                        <option value="senior">Senior</option>
                    </select>
                </div>
            </div>
            <h1 style={{margin:"15px"}}>Adopt Me Please</h1>
            <div className={classes.showdiv}>
            {
            pets
            .filter(pet=>age===""||pet.ageGroup.name.toLowerCase()===age)
            .map((pet,i)=>
                <Pet key={i} pet={pet}/>
            )}
            </div>
        </div>
    )
}