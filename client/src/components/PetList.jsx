import axios from 'axios';
import { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
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
    let [age,setAge]=useState("")
    let urlDict={
        "":"http://localhost:8080/pets/all",
        "young":"http://localhost:8080/pets/agegroup/young",
        "adult":"http://localhost:8080/pets/agegroup/adult",
        "senior":"http://localhost:8080/pets/agegroup/senior",

    }
    useEffect(()=>{
        let loaded=true;
        let x=async ()=>{
            if(urlDict[age]){
                try{
                    let z=await axios.get(urlDict[age]);
                    console.log(z);
                    if(loaded)setPets(z.data);
                }
                catch(e){
                    console.log(e)
                }
            }
        }
        x();
        return ()=>{loaded=false;}
    },[age])
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
            pets.map((pet,i)=>
                <Pet key={i} pet={pet}/>
            )}
            </div>
        </div>
    )
}