import React, {useState} from 'react';
import axios from 'axios';
import { navigate } from '@reach/router';
import {Link} from '@reach/router';

export default() => {
    //const [selectedFile, setSelectedFile] = useState(null);
    const [Name, setName] = useState('');
    const [Email, setEmail] = useState('');
    const [PhoneNumber, setPhoneNumber] = useState('');
    const [PetName, setPetName] = useState('');
    const [AgeString, setAgeString] = useState('');
    const [PrimaryBreed, setPrimaryBreed] = useState('');
    const [SecondaryBreed, setSecondaryBreed] = useState('');
    const [Sex, setSex] = useState('');
    const [Description, setDescription] = useState('');
    const [City, setCity] = useState('');
    const [State, setState] = useState('');
    const [PostalCode, setPostalCode] = useState('');
    const [AgeGroup, setAgeGroup] = useState('');
    const [BirthDate, setBirthDate] = useState('');
    const [BreedString, setBreedString] = useState('');
    const [isBreedMixed, setIsBreedMixed] = useState('');
    const [CoatLength, setCoatLength] = useState('');
    const [DescriptionText, setDescriptionText] = useState('');
    const [pictureThumbnailUrl, setPictureThumbnailUrl] = useState(null);
    const [SizeGroup, setSizeGroup] = useState('');
    const [Species, setSpecies] = useState('');
    const[errors, setErrors] = useState([]);


    const CreatePet = e => {
        e.preventDefault();
        console.log('in create pet function')
        axios.post('http://localhost:8080/pets/new', {
            "AgeGroup":{
                "id":"1"
            },
            "organization":{
                "id":"1"
            },
            "species":{
                "id":"2"
            },
            "breedPrimary":{
                "id":"1"
            },
            "Name" : "Name",
            "Email" : "Email",
            "PhoneNumber" : "PhoneNumber",
            "AgeString" : "AgeString",
            "PrimaryBreed" : setPrimaryBreed("PrimaryBreed"),
            "SecondaryBreed" : "SecondaryBreed",
            "Sex" : setSex("Sex"),
            "Description" : "Description",
            "City":"City",
            "State":setState("State"),
            "PostalCode" : "PostalCode",
            "BirthDate" : setBirthDate("BirthDate"),
            "BreedString" : "isMixedBreed",
            "isBreedMixed" : "isBreedMixed",
            "CoatLength" : "CoatLength",
            "DescriptionText" : "DescriptionText",
            "pictureThumbnailUrl" : "pictureThumbnailUrl",
            "SizeGroup" : "SizeGroup"
            //"pictureThumbnailUrl": "https://cutewallpaper.org/21/sad-kitty-picture/Sad-Kitty-Blank-Template-Imgflip.jpg"
        })
        .then(res=>{console.log(res) 
            navigate('/')}
        )
        .catch(err=>{
            console.log(err)
            console.log('****')
            // const errorResponse = err.response.data.errors;
            // const errorArr = [];
            // for(const key of Object.keys(errorResponse)){
            //     errorArr.push(errorResponse[key].message)
            // }
            // // Set Errors
            // setErrors(errorArr);
        })
    }
    return(
        <div style={{width : "970px", margin : "auto 0px", outline: "2px red dotted"}}>
            <form onSubmit={ CreatePet } style={{marginLeft : "400px", marginTop : "25px"}}>
                <h2>Add a Pet: </h2>
                {errors.map((err, index) => <p key={index}>{err}</p>)} 
                <p>Your Name: </p>
                <input type="text" value={ Name } onChange = {(e) =>setName(e.target.value)}/>
                <p>Email: </p>
                <input type="text" value={ Email } onChange = {(e) =>setEmail(e.target.value)}/>
                <p>Phone Number(Optional): </p>
                <input type="text" value={ PhoneNumber } onChange = {(e) =>setPhoneNumber(e.target.value)}/>
                <p>Pet Name: </p>
                <input type="text" value={ PetName } onChange = {(e) =>setPetName(e.target.value)}/>
                <p>Species: </p>
                <select  onChange={(e) => setSpecies(e.target.value)} value={Species} id="">
                  <option value="Husky">Husky</option>
                  <option value="Malemute">Malemute</option>
                </select>
                <p>Add a photo: </p>
                <input type="file" value={ pictureThumbnailUrl } onChange = {(e) =>setPictureThumbnailUrl(e.target.value)}/>
                <p>Estimated Age(Optional): </p>
                <input type="text" value={ AgeString } onChange = {(e) =>setAgeString(e.target.value)}/>
                <p>Birth Date(Optional)</p>
                <input type="date" value={ BirthDate } />
                <p>Gender: </p>
                <select onChange={(e) => setSex(e.target.value)} value={Sex} id="">
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
                <p>Description: </p>
                <input style={{width : "500px", height : "200px"}} type="text" value={ Description } onChange = {(e) =>setDescription(e.target.value)}/>
                <p>City: </p>
                <input type="text" value={ City } onChange = {(e) =>setCity(e.target.value)}/>
                <p>State: </p>
                <select onChange={(e) => setState(e.target.value)} value={State} id="">
                  <option value="CA">Ca</option>
                  <option value="WA">WA</option>
                <option value="CO">CO</option>
                </select>
                <p>Postal Code: </p>
                <input type="text" value={ PostalCode } onChange = {(e) =>setPostalCode(e.target.value)}/>
                <p>Age Group(Optional): </p>
                <select onChange={(e) => setAgeGroup(e.target.value)} value={AgeGroup} id="">
                  <option value="Young">Young(Less than a year for cats and less than two years for dogs)</option>
                  <option value="Adult">Adult</option>
                <option value="Mature">Mature(Over 11 years for cats and over 7 years for dogs)</option>
                </select>
                <p>Mixed Breed(Optional): </p>
                <select onChange={(e) => setIsBreedMixed(e.target.value)} value={isBreedMixed} id="">
                <option value=""></option>  
                <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
                <p>Primary Breed(Optional): </p>
                <select onChange={(e) => setPrimaryBreed(e.target.value)} value={PrimaryBreed} id="">
                    <option value=""></option>
                    <option value="Husky">Husky</option>
                    <option value="Malemute">Malemute</option>
                </select>
                <p>Secondary Breed(Optional): </p>
                <select onChange={(e) => setSecondaryBreed(e.target.value)} value={SecondaryBreed} id="">
                    <option value=""></option>
                    <option value="Husky">Husky</option>
                    <option value="Malemute">Malemute</option>
                </select>
                <p>Coat Length: </p>
                <select onChange={(e) => setCoatLength(e.target.value)} value={CoatLength} id="">
                    <option value="Short">Short</option>
                    <option value="Medium">Medium</option>
                    <option value="Long">Long</option>
                </select>
                {/* <p>Description Text: </p>
                <input type="text" value={ AgeGroup } onChange = {(e) =>setAgeGroup(e.target.value)}/> */}
                <p>Size: </p>
                <select onChange={(e) => setSizeGroup(e.target.files[0])} value={SizeGroup} id="">
                    <option value="small">Small</option>
                    <option value="medium">Medium</option>
                    <option value="large">Large</option>
                </select>
                <p>
                    <Link to="/"><button>Cancel</button></Link> 
                    <input style={{margin : "10px"}} type="submit" value="Post"/>
                </p>
            </form>
        </div>
    )
}