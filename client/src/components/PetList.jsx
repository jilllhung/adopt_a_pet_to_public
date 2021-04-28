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
  });

export default (props)=>{
    const classes = useStyles();
    let [pets,setPets]=useState([]);
    let x=async ()=>{
        try{
            let z=await axios.get("http://localhost:8080/pets/all");
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
    return(
        <div className={classes.showdiv}>
            {
            pets.map((pet,i)=>
                <Pet key={i} pet={pet}/>
            )
            }
        </div>
    )
}