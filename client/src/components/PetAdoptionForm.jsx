import React, {useState} from 'react';
import axios from 'axios';
import { navigate } from '@reach/router';
import {Link} from '@reach/router';
import { Checkbox } from '@material-ui/core';

export default() => {
    //const [selectedFile, setSelectedFile] = useState(null);
    const [ownerName, setOwnerName] = useState('');
    const [email, setEmail] = useState('');
    const [number, setPhoneNumber] = useState('');
    const [name, setName] = useState('');
    const [ageString, setAgeString] = useState('');
    const [primaryBreed, setPrimaryBreed] = useState('');
    const [secondaryBreed, setSecondaryBreed] = useState('');
    const [sex, setSex] = useState('');
    const [description, setDescription] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('CA');
    const [postalCode, setPostalCode] = useState('');
    const [ageGroup, setAgeGroup] = useState('Young');
    const [birthDate, setBirthDate] = useState('');
    const [breedString, setBreedString] = useState('');
    const [isBreedMixed, setIsBreedMixed] = useState(true);
    const [coatLength, setCoatLength] = useState('');
    const [pictureThumbnailUrl, setPictureThumbnailUrl] = useState(null);
    const [sizeGroup, setSizeGroup] = useState('');
    const [species, setSpecies] = useState('Dog');
    const[errors, setErrors] = useState([]);

    const ageKey={
        "Young": "1",
        "Adult": "2",
        "Mature": "3"
    }

    const SpeciesKey={
        "Dog":"1",
        "Cat":"2"
    }

    const BreedKey={
        "":null,
        "Golden Retriever":"3",
        "Corgy":"4",
    }

    const CreatePet = e => {
        e.preventDefault();
        console.log('in create pet function')
        let npet={
            "ageGroup":(ageGroup===""?null:{
                "id":ageKey[ageGroup]
            }),
            "species":(species===""?null:{
                "id":SpeciesKey[species]
            }),
            "breedPrimary":(primaryBreed===""?null:{
                "id":BreedKey[primaryBreed]
            }),
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
            "birthDate":(birthDate===""?null:birthDate),
            breedString,
            "isBreedMixed" : isBreedMixed,
            coatLength,
            pictureThumbnailUrl,
            sizeGroup,
            //"pictureThumbnailUrl": "https://cutewallpaper.org/21/sad-kitty-picture/Sad-Kitty-Blank-Template-Imgflip.jpg"
        }
        console.log(npet)
        axios.post('http://localhost:8080/pets/new', npet)
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
                <input type="text" value={ ownerName } onChange = {(e) =>setOwnerName(e.target.value)}/>
                <p>Email: </p>
                <input type="text" value={ email } onChange = {(e) =>setEmail(e.target.value)}/>
                <p>Phone Number(Optional): </p>
                <input type="text" value={ number } onChange = {(e) =>setPhoneNumber(e.target.value)}/>
                <p>Pet Name: </p>
                <input type="text" value={ name } onChange = {(e) =>setName(e.target.value)}/>
                <p>Species: </p>
                <select  onChange={(e) => setSpecies(e.target.value)} value={species} id="">
                  <option value="Dog">Dog</option>
                  <option value="Cat">Cat</option>
                </select>
                <p>Add a photo: </p>
                {/* <input type="file" value={ pictureThumbnailUrl } onChange = {(e) =>setPictureThumbnailUrl(e.target.value)}/> */}
                <input type="text" value={ pictureThumbnailUrl } onChange = {(e) =>setPictureThumbnailUrl(e.target.value)}/>
                <p>Age Group(Optional): </p>
                <select onChange={(e) => setAgeGroup(e.target.value)} value={ageGroup} id="">
                  <option value="Young">Young(Less than a year for cats and less than two years for dogs)</option>
                  <option value="Adult">Adult</option>
                <option value="Mature">Mature(Over 11 years for cats and over 7 years for dogs)</option>
                </select>
                <p>Estimated Age(Optional): </p>
                <input type="text" value={ ageString } onChange = {(e) =>setAgeString(e.target.value)}/>
                <p>Birth Date(Optional)</p>
                <input type="date" value={ birthDate } onChange = {(e) =>setBirthDate(e.target.value)}/>
                <p>Gender: </p>
                <select onChange={(e) => setSex(e.target.value)} value={sex} id="">
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
                <p>Description: </p>
                <input style={{width : "500px", height : "200px"}} type="text" value={ description } onChange = {(e) =>setDescription(e.target.value)}/>
                <p>City: </p>
                <input type="text" value={ city } onChange = {(e) =>setCity(e.target.value)}/>
                <p>State: </p>
                <select onChange={(e) => setState(e.target.value)} value={state} id="">
                  <option value="CA">Ca</option>
                  <option value="WA">WA</option>
                  <option value="CO">CO</option>
                </select>
                <p>Postal Code: </p>
                <input type="text" value={ postalCode } onChange = {(e) =>setPostalCode(e.target.value)}/>
                <p>Mixed Breed(Optional): </p>
                <input type="Checkbox" onChange={(e) => setIsBreedMixed(e.target.checked)} checked={isBreedMixed} id=""/>
                <p>Primary Breed(Optional): </p>
                <select onChange={(e) => setPrimaryBreed(e.target.value)} value={primaryBreed} id="">
                    <option value=""></option>
                    <option value="Golden Retriever">Golden Retriever</option>
                    <option value="Corgy">Corgy</option>
                </select>
                <p>Secondary Breed(Optional): </p>
                <select onChange={(e) => setSecondaryBreed(e.target.value)} value={secondaryBreed} id="">
                    <option value=""></option>
                    <option value="Golden Retriever">Golden Retriever</option>
                    <option value="Corgy">Corgy</option>
                </select>
                <p>Coat Length: </p>
                <select onChange={(e) => setCoatLength(e.target.value)} value={coatLength} id="">
                    <option value="Short">Short</option>
                    <option value="Medium">Medium</option>
                    <option value="Long">Long</option>
                </select>
                {/* <p>Description Text: </p>
                <input type="text" value={ AgeGroup } onChange = {(e) =>setAgeGroup(e.target.value)}/> */}
                <p>Size: </p>
                <select onChange={(e) => setSizeGroup(e.target.files[0])} value={sizeGroup} id="">
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