import React, { useState, useEffect } from "react";
import axios from "axios";
import { navigate } from "@reach/router";
import { Link } from "@reach/router";
import {
	makeStyles,
	Button,
	Checkbox,
	Container,
	FormControl,
	FormControlLabel,
	Grid,
	InputLabel,
	MenuItem,
	Select,
	TextField,
} from "@material-ui/core";
// import Checkbox from "@material-ui/core/Checkbox";
// import Container from "@material-ui/core/Container";
// import FormControlLabel from "@material-ui/core/FormControlLabel";
// import FormControl from "@material-ui/core/FormControl";
// import Grid from "@material-ui/core/Grid";
// import InputLabel from "@material-ui/core/InputLabel";
// import MenuItem from "@material-ui/core/MenuItem";
// import Select from "@material-ui/core/Select";
// import TextField from "@material-ui/core/TextField";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider, KeyboardDatePicker } from "@material-ui/pickers";

const PetAdoptionForm = () => {
	const useStyles = makeStyles((theme) => ({
		root: {
			"& .MuiTextField-root": {
				margin: theme.spacing(1),
				width: 200,
			},
		},
		formControl: {
			margin: theme.spacing(1),
			minWidth: 120,
		},
		err: {
			color: "red",
		},
	}));

	const classes = useStyles();

	//const [selectedFile, setSelectedFile] = useState(null);
	const [ownerName, setOwnerName] = useState("");
	const [email, setEmail] = useState("");
	const [number, setPhoneNumber] = useState("");
	const [name, setName] = useState("");
	const [ageString, setAgeString] = useState("");
	const [primaryBreed, setPrimaryBreed] = useState("");
	const [secondaryBreed, setSecondaryBreed] = useState("");
	const [sex, setSex] = useState("");
	const [description, setDescription] = useState("");
	const [city, setCity] = useState("");
	const [state, setState] = useState("CA");
	const [postalCode, setPostalCode] = useState("");
	const [ageGroup, setAgeGroup] = useState("Young");
	const [birthDate, setBirthDate] = useState(new Date());
	const [breedString, setBreedString] = useState("");
	const [isBreedMixed, setIsBreedMixed] = useState(true);
	const [coatLength, setCoatLength] = useState("");
	const [pictureThumbnailUrl, setPictureThumbnailUrl] = useState("");
	const [sizeGroup, setSizeGroup] = useState("");
	const [species, setSpecies] = useState("Dog");
	const [errors, setErrors] = useState([]);
	const [breedsList, setBreedsList] = useState([]);

	// let catDict={
	//     "Breed":"Breed",
	//     "Husky":"Husky",
	//     "Corgi":"Corgi",
	//     "Golden Retriever":"Golden Retriever",
	//     "Labrador":"Labrador",
	//     "Rottweiler":"Rottweiler"
	// }
	// let dogDict={
	//     "Breed":"Breed",
	//     "Persian":"Persian",
	//     "Norwegian Forest Cat":"Norwegian Forest Cat",
	//     "Golden Retriever":"Golden Retriever",
	//     "Labrador":"Labrador",
	//     "Rottweiler":"Rottweiler"
	// }

	useEffect(() => {
		let loaded = true;
		let x = async () => {
			try {
				let z = await axios.get(
					"http://localhost:8080/breeds/species/" + species.toLowerCase()
				); //grabs the dog or the cat key and grabs the value of that key(1 or 2)
				console.log(z);
				if (loaded) {
					setBreedsList(z.data);
					setPrimaryBreed("");
					setSecondaryBreed("");
				}
			} catch (e) {
				console.log(e);
			}
		};
		x();
		return () => {
			loaded = false;
		};
	}, [species]);

	const ageKey = {
		Young: "1",
		Adult: "2",
		Mature: "3",
	};

	const SpeciesKey = {
		Dog: "1",
		Cat: "2",
	};

	const CreatePet = (e) => {
		e.preventDefault();
		console.log("in create pet function");
		let npet = {
			ageGroup:
				ageGroup === ""
					? null
					: {
							id: ageKey[ageGroup],
					  },
			species:
				species === ""
					? null
					: {
							id: SpeciesKey[species],
					  },
			breedPrimary:
				primaryBreed === ""
					? null
					: {
							id: primaryBreed,
					  },
			ownerName,
			name,
			email,
			number,
			ageString,
			sex,
			description,
			city,
			state,
			postalCode,
			birthDate: birthDate === "" ? null : birthDate,
			breedString,
			isBreedMixed: isBreedMixed,
			coatLength,
			pictureThumbnailUrl,
			sizeGroup,
			//"pictureThumbnailUrl": "https://cutewallpaper.org/21/sad-kitty-picture/Sad-Kitty-Blank-Template-Imgflip.jpg"
		};
		console.log(npet);
		axios
			.post("http://localhost:8080/pets/new", npet)
			.then((res) => {
				console.log(res);
				navigate("/");
			})
			.catch((err) => {
				console.log(err);
				console.log("****");
				console.log(err.response.data.data);
				// const errorResponse = err.response.data.data;
				// const errorArr = [];
				// for(const key of Object.keys(errorResponse)){
				//     errorArr.push(errorResponse[key].message)
				// }
				// // Set Errors
				setErrors(err.response.data.data);
			});
	};
	return (
		// <div style={{ width: "520px", margin: "auto" }}>
		<Container fixed>
			<MuiPickersUtilsProvider utils={DateFnsUtils}>
				<form className={classes.root} noValidate onSubmit={CreatePet} method='post'>
					<h2>Add a Pet: </h2>
					{errors.map((err, index) => (
						<p key={index} className={classes.err}>
							{err.field ? err.field : err.code}: {err.defaultMessage}
						</p>
					))}
					<Grid container justify='space-around' spacing='3'>
						<Grid item xs={4}>
							<TextField
								variant='filled'
								label='Pet Name:'
								fullWidth
								value={name}
								onChange={(e) => setName(e.target.value)}
							/>
							{/* <TextField defaultValue="Error" error inputProps={{ 'aria-label':'Required*' }} /> */}
						</Grid>
						<Grid item xs={4}>
							<FormControl variant='filled' className={classes.formControl}>
								<InputLabel id='selectSpeciesLabel'>Species:</InputLabel>
								<Select
									labelId='selectSpeciesLabel'
									fullWidth
									value={species}
									onChange={(e) => setSpecies(e.target.value)}>
									<MenuItem value='Cat'>Cat</MenuItem>
									<MenuItem value='Dog'>Dog</MenuItem>
								</Select>
							</FormControl>
						</Grid>
						<Grid item xs={4}>
							{/* <TextField type="file" value={ pictureThumbnailUrl } onChange = {(e) =>setPictureThumbnailUrl(e.target.value)}/> */}
							<TextField
								variant='filled'
								label='Add a photo:'
								fullWidth
								value={pictureThumbnailUrl}
								onChange={(e) => setPictureThumbnailUrl(e.target.value)}
							/>
						</Grid>
					</Grid>
					<Grid container justify='space-around' spacing='3'>
						<Grid item xs={4}>
							<FormControlLabel
								control={
									<Checkbox
										color='primary'
										checked={isBreedMixed}
										onChange={(e) => setIsBreedMixed(e.target.checked)}
									/>
								}
								label='Mixed Breed(Optional):'
							/>
						</Grid>
						<Grid item xs={4}>
							<FormControl variant='filled' className={classes.formControl}>
								<InputLabel id='selectPrimaryBreedLabel'>
									Primary Breed(Optional):
								</InputLabel>
								<Select
									labelId='selectPrimaryBreedLabel'
									fullWidth
									value={primaryBreed}
									onChange={(e) => setPrimaryBreed(e.target.value)}>
									<MenuItem value=''>----------------------------------</MenuItem>
									{breedsList.map((br, i) => (
										<MenuItem key={i} value={`${br.id}`}>
											{br.name}
										</MenuItem>
									))}
								</Select>
							</FormControl>
						</Grid>
						<Grid item xs={4}>
							<FormControl variant='filled' className={classes.formControl}>
								<InputLabel id='selectSecondaryBreedLabel'>
									Secondary Breed(Optional):
								</InputLabel>
								<Select
									labelId='selectSecondaryBreedLabel'
									fullWidth
									value={secondaryBreed}
									onChange={(e) => setSecondaryBreed(e.target.value)}>
									<MenuItem value=''>----------------------------------</MenuItem>
									{breedsList.map((br, i) => (
										<MenuItem key={i} value={`${br.id}`}>
											{br.name}
										</MenuItem>
									))}
								</Select>
							</FormControl>
						</Grid>
					</Grid>
					<Grid container justify='space-around' spacing='3'>
						<Grid item xs={12}>
							<TextField
								//style={{ width: "500px", height: "200px" }}
								variant='filled'
								label='Description:'
								fullWidth
								multiline
								rowsMax={4}
								value={description}
								onChange={(e) => setDescription(e.target.value)}
							/>
						</Grid>
					</Grid>
					<Grid container justify='space-around' spacing='3'>
						<Grid item xs={4}>
							<FormControl variant='filled' className={classes.formControl}>
								<InputLabel id='selectAgeGroupLabel'>
									AgeGroup(Optional):
								</InputLabel>
								<Select
									labelId='selectAgeGroupLabel'
									fullWidth
									value={ageGroup}
									onChange={(e) => setAgeGroup(e.target.value)}>
									<MenuItem value='Baby'>Baby</MenuItem>
									<MenuItem value='Young'>Young</MenuItem>
									<MenuItem value='Adult'>Adult</MenuItem>
									<MenuItem value='Mature'>Mature</MenuItem>
								</Select>
							</FormControl>
						</Grid>
						<Grid item xs={4}>
							<TextField
								variant='filled'
								label='Estimated Age(Optional):'
								fullWidth
								value={ageString}
								onChange={(e) => setAgeString(e.target.value)}
							/>
						</Grid>
						<Grid item xs={4}>
							<KeyboardDatePicker
								margin='normal'
								label='Birth Date(Optional)'
								fullWidth
								format='MM/dd/yyyy'
								value={birthDate}
								onChange={(e) => setBirthDate(e.target.value)}
								KeyboardButtonProps={{
									"aria-label": "change date",
								}}
							/>
						</Grid>
					</Grid>
					<Grid container justify='space-around' spacing='3'>
						<Grid item xs={4}>
							<FormControl variant='filled' className={classes.formControl}>
								<InputLabel id='selectGenderLabel'>Gender:</InputLabel>
								<Select
									labelId='selectGenderLabel'
									fullWidth
									value={sex}
									onChange={(e) => setSex(e.target.value)}>
									<MenuItem value='Male'>Male</MenuItem>
									<MenuItem value='Female'>Female</MenuItem>
								</Select>
							</FormControl>
						</Grid>
						<Grid item xs={4}>
							<FormControl variant='filled' className={classes.formControl}>
								<InputLabel id='selectCoatLengthLabel'>Coat Length:</InputLabel>
								<Select
									labelId='selectCoatLengthLabel'
									fullWidth
									value={coatLength}
									onChange={(e) => setCoatLength(e.target.value)}>
									<MenuItem value='Short'>Short</MenuItem>
									<MenuItem value='Medium'>Medium</MenuItem>
									<MenuItem value='Long'>Long</MenuItem>
								</Select>
							</FormControl>
							{/* <p>Description Text: </p>
                <TextField type="text" value={ AgeGroup } onChange = {(e) =>setAgeGroup(e.target.value)}/> */}
						</Grid>
						<Grid item xs={4}>
							<FormControl variant='filled' className={classes.formControl}>
								<InputLabel id='selectSizeLabel'>Size:</InputLabel>
								<Select
									labelId='selectSizeLabel'
									fullWidth
									value={sizeGroup}
									onChange={(e) => setSizeGroup(e.target.files[0])}>
									<MenuItem value='small'>Small</MenuItem>
									<MenuItem value='medium'>Medium</MenuItem>
									<MenuItem value='large'>Large</MenuItem>
								</Select>
							</FormControl>
						</Grid>
					</Grid>
					<Grid container justify='space-around' spacing='3'>
						<Grid item xs={4}>
							<TextField
								variant='filled'
								label='Your Name:'
								fullWidth
								value={ownerName}
								onChange={(e) => setOwnerName(e.target.value)}
							/>
						</Grid>
						<Grid item xs={4}>
							<TextField
								variant='filled'
								label='Email:'
								fullWidth
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
							{/* <TextField defaultValue="Error" error inputProps={{ 'aria-label':'Must include either email or phone number*' }} /> */}
						</Grid>
						<Grid item xs={4}>
							<TextField
								variant='filled'
								label='Phone Number(Optional):'
								fullWidth
								value={number}
								onChange={(e) => setPhoneNumber(e.target.value)}
							/>
							{/* <TextField defaultValue="Error" error inputProps={{ 'aria-label':'Must include either email or phone number*' }} /> */}
						</Grid>
					</Grid>
					<Grid container justify='space-around' spacing='3'>
						<Grid item xs={4}>
							<TextField
								variant='filled'
								label='City:'
								fullWidth
								value={city}
								onChange={(e) => setCity(e.target.value)}
							/>
						</Grid>
						<Grid item xs={4}>
							<FormControl variant='filled' className={classes.formControl}>
								<InputLabel id='selectStateLabel'>State:</InputLabel>
								<Select
									labelId='selectStateLabel'
									fullWidth
									value={state}
									onChange={(e) => setState(e.target.value)}>
									<MenuItem value='CA'>Ca</MenuItem>
									<MenuItem value='WA'>WA</MenuItem>
									<MenuItem value='CO'>CO</MenuItem>
								</Select>
							</FormControl>
						</Grid>
						<Grid item xs={4}>
							<TextField
								variant='filled'
								label='Postal Code:'
								fullWidth
								value={postalCode}
								onChange={(e) => setPostalCode(e.target.value)}
							/>
						</Grid>
					</Grid>
					<Grid container justify='space-around' spacing='3'>
						<Grid item xs={2}>
							<Link to='/'>
								<Button variant='contained' color='primary'>
									Cancel
								</Button>
							</Link>
						</Grid>
						<Grid item xs={2}>
							<Button variant='contained' color='primary' type='submit'>
								Submit
							</Button>
						</Grid>
					</Grid>
				</form>
			</MuiPickersUtilsProvider>
		</Container>
		//* </div> */
	);
};

export default PetAdoptionForm;

// return (
// 	<div style={{ width: "520px", margin: "auto" }}>
// 		<form onSubmit={CreatePet}>
// 			<h2>Add a Pet: </h2>
// 			{errors.map((err, index) => (
// 				<p key={index} className={classes.err}>
// 					{err.field ? err.field : err.code}: {err.defaultMessage}
// 				</p>
// 			))}
// 			<p>Your Name: </p>
// 			<input
// 				type='text'
// 				value={ownerName}
// 				onChange={(e) => setOwnerName(e.target.value)}
// 			/>
// 			<p>Email: </p>
// 			<input
// 				type='text'
// 				value={email}
// 				onChange={(e) => setEmail(e.target.value)}
// 			/>
// 			{/* <Input defaultValue="Error" error inputProps={{ 'aria-label':'Must include either email or phone number*' }} /> */}
// 			<p>Phone Number(Optional): </p>
// 			<input
// 				type='text'
// 				value={number}
// 				onChange={(e) => setPhoneNumber(e.target.value)}
// 			/>
// 			{/* <Input defaultValue="Error" error inputProps={{ 'aria-label':'Must include either email or phone number*' }} /> */}
// 			<p>Pet Name: </p>
// 			<input
// 				type='text'
// 				value={name}
// 				onChange={(e) => setName(e.target.value)}
// 			/>
// 			{/* <Input defaultValue="Error" error inputProps={{ 'aria-label':'Required*' }} /> */}
// 			<p>Species: </p>
// 			<select
// 				onChange={(e) => setSpecies(e.target.value)}
// 				value={species}
// 				id=''
// 			>
// 				  <option value='Dog'>Dog</option> {" "}
// 				<option value='Cat'>Cat</option>
// 			</select>
// 			<p>Mixed Breed(Optional): </p>
// 			<input
// 				type='Checkbox'
// 				onChange={(e) => setIsBreedMixed(e.target.checked)}
// 				checked={isBreedMixed}
// 				id=''
// 			/>
// 			<p>Primary Breed(Optional): </p>
// 			<select
// 				onChange={(e) => setPrimaryBreed(e.target.value)}
// 				value={primaryBreed}
// 				id=''
// 			>
// 				<option value=''>----------------------------------</option>
// 				{breedsList.map((br, i) => (
// 					<option key={i} value={`${br.id}`}>
// 						{br.name}
// 					</option>
// 				))}
// 			</select>
// 			<p>Secondary Breed(Optional): </p>
// 			<select
// 				onChange={(e) => setSecondaryBreed(e.target.value)}
// 				value={secondaryBreed}
// 				id=''
// 			>
// 				<option value=''>----------------------------------</option>
// 				{breedsList.map((br, i) => (
// 					<option key={i} value={`${br.id}`}>
// 						{br.name}
// 					</option>
// 				))}
// 			</select>
// 			<p>Add a photo: </p>
// 			{/* <input type="file" value={ pictureThumbnailUrl } onChange = {(e) =>setPictureThumbnailUrl(e.target.value)}/> */}
// 			<input
// 				type='text'
// 				value={pictureThumbnailUrl}
// 				onChange={(e) => setPictureThumbnailUrl(e.target.value)}
// 			/>
// 			<p>Age Group(Optional): </p>
// 			<select
// 				onChange={(e) => setAgeGroup(e.target.value)}
// 				value={ageGroup}
// 				id=''
// 			>
// 				 {" "}
// 				<option value='Young'>
// 					Young(Less than a year for cats and less than two years for
// 					dogs)
// 				</option>
// 				  <option value='Adult'>Adult</option>
// 				<option value='Mature'>
// 					Mature(Over 11 years for cats and over 7 years for dogs)
// 				</option>
// 			</select>
// 			<p>Estimated Age(Optional): </p>
// 			<input
// 				type='text'
// 				value={ageString}
// 				onChange={(e) => setAgeString(e.target.value)}
// 			/>
// 			<p>Birth Date(Optional)</p>
// 			<input
// 				type='date'
// 				value={birthDate}
// 				onChange={(e) => setBirthDate(e.target.value)}
// 			/>
// 			<p>Gender: </p>
// 			<select onChange={(e) => setSex(e.target.value)} value={sex}>
// 				  <option value='Male'>Male</option> {" "}
// 				<option value='Female'>Female</option>
// 			</select>
// 			<p>Description: </p>
// 			<input
// 				style={{ width: "500px", height: "200px" }}
// 				type='text'
// 				value={description}
// 				onChange={(e) => setDescription(e.target.value)}
// 			/>
// 			<p>City: </p>
// 			<input
// 				type='text'
// 				value={city}
// 				onChange={(e) => setCity(e.target.value)}
// 			/>
// 			<p>State: </p>
// 			<select
// 				onChange={(e) => setState(e.target.value)}
// 				value={state}
// 				id=''
// 			>
// 				  <option value='CA'>Ca</option>  <option value='WA'>WA</option>
// 				  <option value='CO'>CO</option>
// 			</select>
// 			<p>Postal Code: </p>
// 			<input
// 				type='text'
// 				value={postalCode}
// 				onChange={(e) => setPostalCode(e.target.value)}
// 			/>
// 			<p>Coat Length: </p>
// 			<select
// 				onChange={(e) => setCoatLength(e.target.value)}
// 				value={coatLength}
// 				id=''
// 			>
// 				<option value='Short'>Short</option>
// 				<option value='Medium'>Medium</option>
// 				<option value='Long'>Long</option>
// 			</select>
// 			{/* <p>Description Text: </p>
//                 <input type="text" value={ AgeGroup } onChange = {(e) =>setAgeGroup(e.target.value)}/> */}
// 			<p>Size: </p>
// 			<select
// 				onChange={(e) => setSizeGroup(e.target.files[0])}
// 				value={sizeGroup}
// 				id=''
// 			>
// 				<option value='small'>Small</option>
// 				<option value='medium'>Medium</option>
// 				<option value='large'>Large</option>
// 			</select>
// 			<p>
// 				<Link to='/'>
// 					<button>Cancel</button>
// 				</Link>
// 				<input style={{ margin: "10px" }} type='submit' value='Post' />
// 			</p>
// 		</form>
// 	</div>
// );
