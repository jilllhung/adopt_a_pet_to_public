import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {navigate} from '@reach/router';


const useStyles = makeStyles({
    root: {
        maxWidth: "275px",
        width:"18vw",
        minWidth: "194px",
        display: 'inline-block',
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
    img:{
        width:"100%",
        maxHeight: "275px",
    }
});

export default (props)=>{
    const classes = useStyles();
    let btnAct=()=>{
        navigate(`/animals/show/${props.pet.id}`);
    }
    return(
        // <div className="pet">
        //     <p>{props.pet.name}</p>
        // </div>
        <Card className={classes.root} variant="outlined" onClick={btnAct}>
            <CardContent>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                Looking for a good home
                </Typography>
                <img src={props.pet.pictureThumbnailUrl} alt="{props.pet.name}'s picture" className={classes.img}/>
                <Typography variant="h5" component="h2">
                    {props.pet.name}
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                Age group
                </Typography>
                <Typography variant="body2" component="p">
                {props.pet.ageGrp?props.pet.ageGrp.name:"Unknown"}
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                Location
                </Typography>
                <Typography variant="body2" component="p">
                {`${props.pet.city}, ${props.pet.state}`}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" onClick={btnAct}>Learn More</Button>
            </CardActions>
        </Card>
    )
}