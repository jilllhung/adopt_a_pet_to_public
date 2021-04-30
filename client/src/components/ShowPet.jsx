import axios from 'axios';
import { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles({
    showdiv: {
        margin: "auto",
        textAlign: "center",
    },
  });

export default (props)=>{
    console.log(props)
    const classes = useStyles();
    let [pet,setPet]=useState({});
    let x=async ()=>{
        try{
            let z=await axios.get(`http://localhost:8080/pets/show/${props.id}`);
            console.log(z);
            setPet(z.data);
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
            <img src={pet.pictureThumbnailUrl} alt="{pet.name}'s picture"/>
            <h1>{pet.name}</h1>
            <h4>
            Age group
            </h4>
            <p>
                {pet.ageGrp?pet.ageGrp.name:"Unknown"}
            </p>
            <h4>
                Location
            </h4>
            <p>
                {`${pet.city},${pet.state}`}
            </p>
        </div>
    )
}