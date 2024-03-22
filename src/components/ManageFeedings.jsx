import './StyleCard.css';
import * as React from 'react'
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Switch from '@mui/material/Switch';
import Button from '@mui/material/Button';
import DoneIcon from '@mui/icons-material/Done';
import ClearIcon from '@mui/icons-material/Clear';
import { DataGrid } from '@mui/x-data-grid';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import 'dayjs/locale/de';

let selectedHorseId = '';
let feedingsDone = {};

export default function ManageFeedings(props) {

    let newFeeding = {
        startTime: '00:00',
        endTime: '00:00'
    };

    const horseNames = props.horses.map(horse => horse.name);

    const [feedings, setFeedings] = useState([{
        id: ' ',
        startTime: ' ',
        endTime: ' '
    }]);

    function handleHorseChange(event, value) {
        if (value == null) return;
        let horseByName = props.horses.find(horse => horse.name === value);
        selectedHorseId = horseByName.id;
        let selectedHorsesFeedingsURL = "http://localhost:8080/api/v1/horses/" + selectedHorseId + "/feedings";
        fetch(selectedHorsesFeedingsURL)
            .then((result) => result.json())
            .then((result) => {
                if(result.length == 0){
                    result = [{
                        id: ' ',
                        startTime: ' ',
                        endTime: ' '
                    }]
                }
                setFeedings(result);
            });
    }

    function handleStartTimeChange(value) {
        newFeeding.startTime = value.$d.toLocaleTimeString("de").slice(0, 5);
    }
    function handleEndTimeChange(value) {
        newFeeding.endTime = value.$d.toLocaleTimeString("de").slice(0, 5);
    }

    function handleDoneClick(id) {
        if (selectedHorseId == "") return;
        if (feedingsDone[id] == undefined) feedingsDone[id] = false;
        let feedingDoneURL = 'http://localhost:8080/api/v1/horses/feedings/' + selectedHorseId + '/done?ateAll=' + feedingsDone[id];
        fetch(feedingDoneURL, { method: "PUT", headers: { "Content-Type": "application/json" } })
            .then(response => {
                return response.json();
            })
            .then(data => {
                alert(data.message);
            });
        window.location.reload();
    };

    function handleAteAll(event, id) {
        feedingsDone[id] = event.target.checked;
    }

    function feedingControlsDisabled(feeding){
        let now = new Date();
        let start = new Date(new Date().toLocaleDateString() + " " + feeding.startTime);
        let end = new Date(new Date().toLocaleDateString() + " " + feeding.endTime);
        let ongoing = now > start && now < end;
        return !ongoing || feeding.done;
    }

    const columns = [
        { field: 'totalWeight', headerName: 'Weight', width: 90 },
        { field: 'startTime', headerName: 'Start Time', width: 90 },
        { field: 'endTime', headerName: 'End Time', width: 90, },

        {
            field: 'duration',
            headerName: 'Duration',
            description: 'This column has a value getter and is not sortable.',
            sortable: false,
            width: 90,
            valueGetter: (params) => {
                if (params.row.startTime == ' ') return ' ';
                let start = new Date("01/01/1970 " + params.row.startTime);
                let end = new Date("01/01/1970 " + params.row.endTime);
                let difference = end - start;
                return (difference / 1000 / 60 / 60).toFixed(2) + "h";
            }
        },
        {
            field: 'ateAllSwitch',
            headerName: 'Ate up',
            renderCell: (params) => (<Switch defaultChecked={Boolean(params.row.ateAll)} disabled={feedingControlsDisabled(params.row)} onChange={() => handleAteAll(event, params.id)} />),
        },
        {
            field: 'doneAction',
            headerName: 'Done',
            renderCell: (params) => (<Button disabled={feedingControlsDisabled(params.row)} onClick={() => handleDoneClick(params.id)}> {params.row.done || !feedingControlsDisabled(params.row)? <DoneIcon /> : <ClearIcon />} </Button>),
        },

    ];

    function handleSubmit(event) {
        if (selectedHorseId == "") return;
        let url = "http://localhost:8080/api/v1/horses/" + selectedHorseId + "/feeding";
        event.preventDefault();
        fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newFeeding)
        })
            .then(response => {
                if (response.headers.get('Content-Type') !== 'application/json') {
                    window.location.reload();
                }
                else return response.json();
            })
            .then(data => {
                alert(data.message);
            });
    }

    return (
        <div className='card-container'>
            <div className='style-card'>
                <div className="style-card-content">
                    <h3>Select Horse</h3>
                    <p> Add horse first if list empty </p>
                    <div className='form'>
                        <Autocomplete
                            className='form-element'
                            onChange={handleHorseChange}
                            options={horseNames}
                            renderInput={(params) => <TextField {...params} label='Horse' />}
                        />
                    </div>
                </div>
            </div>
            <div className='style-card'>
                <div className="style-card-content">
                    <h3>Add Feeding</h3>
                    <p>Press the submit button when you are done</p>
                    <form onSubmit={handleSubmit} className='form'>
                        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="de">
                            <TimePicker className='form-element' onChange={handleStartTimeChange} name='startTime' label="Start Time" />
                            <TimePicker className='form-element' onChange={handleEndTimeChange} name='endTime' label="End Time" />
                            <Button className='form-element' type='submit' variant='contained'>Submit</Button>
                        </LocalizationProvider>
                    </form>
                </div>
            </div>
            <div className='style-card'>
                <div className="style-card-content">
                    <h3>All Feedings of selected horse</h3>
                    <p>Control options are displayed for currently ongoing feedings</p>
                    <div className='form'>
                        <DataGrid
                            rows={feedings}
                            columns={columns}
                            initialState={{ pagination: { paginationModel: { pageSize: 5 } } }}
                            pageSizeOptions={[5]}
                            disableRowSelectionOnClick
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}