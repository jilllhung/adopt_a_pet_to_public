import axios from 'axios';
import { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import sanitizeHtml from 'sanitize-html';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import BookmarkIcon from '@material-ui/icons/Bookmark'; //for name
import DescriptionIcon from '@material-ui/icons/Description';
import FavoriteIcon from '@material-ui/icons/Favorite';
import RoomIcon from '@material-ui/icons/Room'; //for location
import CakeIcon from '@material-ui/icons/Cake'; // for birthday
import PaletteIcon from '@material-ui/icons/Palette';
import ContactPhoneIcon from '@material-ui/icons/ContactPhone';

const useStyles = makeStyles({
    showdiv: {
        margin: "auto",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "auto",
        width: "50vw",
    },
    individualPic: {
        width: "15vw",
    },
    listHead: {
        display: "flex",
        alignContent: "flex-start",
    },
    });

export default (props)=>{
    console.log(props)
    const classes = useStyles();
    let [pet,setPet]=useState({});
    const desc = pet.description;
    console.log(sanitizeHtml(desc, {
        allowedTags: [ 'b', 'i', 'em', 'strong', 'a', 'br' ]}));
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
            <h1>I am {pet.name}. Come Be My Human!!</h1>
            <img src={pet.pictureThumbnailUrl} alt="{pet.name}'s picture" className={classes.individualPic}/>
            <List className={classes.root}>
                <ListItem button>
                    <ListItemAvatar>
                    <Avatar>
                        <BookmarkIcon />
                    </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={`Name: ${pet.name}`}/>
                </ListItem>
                <ListItem button>
                    <ListItemAvatar>
                    <Avatar>
                        <FavoriteIcon />
                    </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={`Age Group: ${pet.ageGrp?pet.ageGrp.name:"Unknown"}`}/>
                </ListItem>
                <ListItem button>
                    <ListItemAvatar>
                    <Avatar>
                        <PaletteIcon />
                    </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={`Breed: ${pet.breedPrimary?pet.breedPrimary.name:"Unknown"}`}/>
                </ListItem>
                <ListItem button>
                    <ListItemAvatar>
                    <Avatar>
                        <CakeIcon />
                    </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={`Age: ${pet.ageString?pet.ageString:"Unknown"}, Birthday: ${pet.birthDate? pet.birthDate:"Unknown"}`}/>
                </ListItem>
                <ListItem button>
                    <ListItemAvatar>
                    <Avatar>
                        <RoomIcon />
                    </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={`Location: ${pet.city?pet.city:"City Unknown"},${pet.state?pet.state:"State Unknown"}`}/>
                </ListItem>
                <ListItem button className={classes.listHead}>
                    <ListItemAvatar>
                    <Avatar>
                        <DescriptionIcon />
                    </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={`Description: ${sanitizeHtml(pet.description)}`}/>
                </ListItem>
                <ListItem button>
                    <ListItemAvatar>
                    <Avatar>
                        <ContactPhoneIcon />
                    </Avatar>
                    </ListItemAvatar>
                    <List>
                        {(pet.email || pet.number)?
                            (<>
                                <ListItem><ListItemText primary={`Contact Person Name: ${pet.ownerName? pet.ownerName:"Unknown"}`}/></ListItem>
                                <ListItem><ListItemText primary={`Email: ${pet.email? pet.email:"Unknown"}`}/></ListItem>
                                <ListItem><ListItemText primary={`Contact Phone Number: ${pet.number? pet.number:"Unknown"}`}/></ListItem>
                            </>)
                            : (pet.organization)?(<>
                                <ListItem><ListItemText primary={`Organization Name: ${pet.organization? pet.organization.name:"Unknown"}`}/></ListItem>
                                <ListItem><ListItemText primary={`Email: ${pet.organization.email? pet.organization.email:"Unknown"}`}/></ListItem>
                                <ListItem><ListItemText primary={`Phone Number: ${pet.organization.phone? pet.organization.phone:"Unknown"}`}/></ListItem>
                                <ListItem><ListItemText primary={`URL: ${pet.organization.url? pet.organization.url:"Unknown"}`}/></ListItem>
                                <ListItem><ListItemText primary={`Location: ${pet.organization.city? pet.organization.city:"City Unknown"}, ${pet.organization.state? pet.organization.state:"State Unknown"}`}/></ListItem>
                            </>):("")
                        }
                    </List>
                </ListItem>
            </List>
            {/* <h1>{pet.name}</h1>
            <h4>
            Age group
            </h4>
            <p>
                {pet.ageGrp?pet.ageGrp.name:"Unknown"}
            </p> */}
            {/* <h4>
                Location
            </h4>
            <p>
                {`${pet.city},${pet.state}`}
            </p> */}
        </div>
    )
}