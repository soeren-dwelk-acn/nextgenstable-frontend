import * as React from 'react';
import './StyleCard.css'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import InputLabel from '@mui/material/InputLabel';
import Button from '@mui/material/Button';
import Slider from '@mui/material/Slider';

export default function AddHorse(props) {

    let newHorse = {
        name: '',
        nickname: '',
        owner: '',
        breed: '',
        stable: '',
        preferences: ['Hay'],
        maxFeedingsPerDay: 1
    }

    function handleInputChange(event) {
        newHorse[event.target.name] = event.target.value;
    }

    function handleBreedChange(event, value) {
        newHorse.breed = value;
    }
    function handleStableChange(event, value) {
        let stableByName = props.stables.find(stable => stable.name === value);
        newHorse.stable = stableByName.id;
    }
    const stableNames = props.stables.map(stable => stable.name);

    function handleSubmit(event) {
        event.preventDefault();
        fetch("http://localhost:8080/api/v1/horses", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newHorse)
        }).then(() => console.log(JSON.stringify(newHorse)));
        window.location.reload();
    }

    const horseBreeds = [
        'Mustang', 'White Horse', 'French Trotter', 'British Warmblood', 'Haflinger', 'Latvian horse', 'Dareshuri', 'Boerperd', 'Criollo horse', 'One of the Meras if my eyes are not cheated by some spell'
    ];

    return (
        <div className='card-container'>
            <div className='style-card'>
                <div className="style-card-content">
                    <h3>Add Horse</h3>
                    <p>Provide the horses information and press submit</p>
                    <form onSubmit={handleSubmit} className='form'>
                        <TextField className='form-element' onChange={handleInputChange} name='name' label='Name' variant='outlined' />
                        <TextField className='form-element' onChange={handleInputChange} name='nickname' label='Nickname' variant='outlined' />
                        <TextField className='form-element' onChange={handleInputChange} name='owner' label='Owner' variant='outlined' />
                        <Autocomplete className='form-element' onChange={handleBreedChange} options={horseBreeds} renderInput={(params) => <TextField {...params} label='Breed' />} />
                        <Autocomplete className='form-element' onChange={handleStableChange} options={stableNames} renderInput={(params) => <TextField {...params} label='Stable' />} />
                        <InputLabel id='feedings-label'>Maximum amount of feedings per day</InputLabel>
                        <Slider className='form-element' name='maxFeedingsPerDay' onChange={handleInputChange} lableid='feedings-label' valueLabelDisplay='auto' defaultValue={1} step={1} marks min={1} max={5} />
                        <Button className='form-element' type='submit' variant='contained'>Submit</Button>
                    </form>
                </div>
            </div>
        </div>
    )
}