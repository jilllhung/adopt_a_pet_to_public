import React, {useState} from 'react';
import Carousel from 'react-material-ui-carousel'
import { Paper, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';

export default() => {
    var items = [
        {
            name: "https://i.dailymail.co.uk/i/pix/2013/06/27/article-2349770-1A89D9DC000005DC-814_634x420.jpg",

        },
        {
            name: "https://media.istockphoto.com/photos/family-having-fun-outdoor-with-dog-and-basketball-ball-picture-id1154596591?k=6&m=1154596591&s=612x612&w=0&h=UPwvalJPUoIdGMpahgkkzN_ORYd4B8gStk9_PoN8fjM=",
        },
        {
            name: "https://resc-files-prod.s3.us-west-1.amazonaws.com/s3fs-public/styles/large/public/2018-12/gray-white-cat-worried_1.jpg?itok=gyRH7EIW"
        },
        {
            name: "https://www.nydailynews.com/resizer/YAT7iKQZMo7oPX0r1vcEWtUtTqo=/800x534/top/arc-anglerfish-arc2-prod-tronc.s3.amazonaws.com/public/GQAMIZMB4AEAAMEYTRPVNM2ZVE.jpg"
        },
        {
            name : "https://g77v3827gg2notadhhw9pew7-wpengine.netdna-ssl.com/wp-content/uploads/2017/11/are-beagles-good-family-dogs_canna-pet-e1510609386664.jpg"
        },
        {
            name : "https://www.worldsbestcatlitter.com/WBCL/wp-content/uploads/2019/07/body-img_4-match-1.jpg"
        },
        {
            name : "https://resveralife.com/wp-content/uploads/2015/08/Vine-Vera-Best-Pets-For-Your-Family-Dogs.jpg"
        }
    ]

    const useStyles = makeStyles({
        start:{
            display:"flex",
            justifyContent:"center",
        },
        paper:{
            backgroundColor : "#EDEDED",
            margin:"0px",
            padding:"0px",
        },
        img:{
            width : "75vw",
            minWidth:"690px",
        }
    });
    
    const classes = useStyles();

    return(
        <div className={classes.start}>
            <Carousel >
            {
                items.map((item, i) => 
                    <Paper className={classes.paper}>
                        <img className={classes.img} src={item.name}/>
                        {/* <p>{item.description}</p> */}
                        {/* <Button className="CheckButton">
                        </Button> */}
                    </Paper>
                )
            }
            </Carousel>
        </div>
    )
}

