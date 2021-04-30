import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { navigate } from "@reach/router";

const useStyles = makeStyles({
	root: {
		maxWidth: "275px",
		width: "18vw",
		minWidth: "194px",
		display: "inline-block",
	},
	bullet: {
		display: "inline-block",
		margin: "0 2px",
		transform: "scale(0.8)",
	},
	title: {
		fontSize: 14,
	},
	pos: {
		marginBottom: 12,
	},
	img: {
		width: "100%",
		maxHeight: "275px",
	},
});

const Pet = (props) => {
	const { pet } = props;
	const classes = useStyles();
	let btnAct = () => {
		navigate(`/animals/show/${pet.id}`);
	};
	return (
		<Card className={classes.root} variant='outlined' onClick={btnAct}>
			<CardContent>
				<Typography
					className={classes.title}
					color='textSecondary'
					gutterBottom
				>
					Looking for a good home
				</Typography>
				{pet.pictureThumbnailUrl && (
					<img
						src={pet.pictureThumbnailUrl}
						alt={`${pet.name}`}
						className={classes.img}
					/>
				)}
				<Typography variant='h5' component='h2'>
					{pet.name}
				</Typography>
				{pet.ageGrp && (
					<>
						<Typography
							className={classes.pos}
							color='textSecondary'
						>
							Age group
						</Typography>
						<Typography variant='body2' component='p'>
							{pet.ageGrp?pet.ageGrp.name:"Unknown"}
						</Typography>
					</>
				)}
				{(pet.city || pet.state) && (
					<>
						<Typography
							className={classes.pos}
							color='textSecondary'
						>
							Location
						</Typography>
						<Typography variant='body2' component='p'>
							{(pet.city&&pet.city.length) ? pet.city : ""},{" "}
							{(pet.state&&pet.state.length) ? pet.state : ""}
						</Typography>
					</>
				)}
			</CardContent>
			<CardActions>
				<Button size='small' onClick={btnAct}>
					Learn More
				</Button>
			</CardActions>
		</Card>
	);
};

export default Pet;

