import * as React from 'react';
import './StyleCard.css';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

export default function ShowHorses(props) {

    function getEligibleHorses() {
        fetch("http://localhost:8080/api/v1/horses/eligible")
            .then((result) => result.json())
            .then((result) => props.setHorses(result));
    }

    function getAllHorses() {
        fetch("http://localhost:8080/api/v1/horses")
            .then((result) => result.json())
            .then((result) => props.setHorses(result));
    }

    function getHorsesWithLeftovers(){
        fetch("http://localhost:8080/api/v1/horses/leftovers")
        .then((result) => result.json())
        .then((result) => props.setHorses(result));
    }


    function getMissedFeedingHorses(){
        fetch("http://localhost:8080/api/v1/horses/missed-feedings")
        .then((result) => result.json())
        .then((result) => props.setHorses(result));
    }

    return (
        <div className='card-container'>
            <div className='style-card'>
                <div className="style-card-content">
                    <h3>Horses</h3>
                    <div className='form'>
                        <ButtonGroup variant="contained">
                            <Button onClick={getAllHorses}>All horses</Button>
                            <Button onClick={getEligibleHorses}>Eligible horses</Button>
                            <Button onClick={getMissedFeedingHorses}>Missed feeding horses</Button>
                            <Button onClick={getHorsesWithLeftovers}>Horses with leftovers</Button>
                        </ButtonGroup>
                    </div>
                    <div className='horsestable'>
                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>ID</TableCell>
                                        <TableCell>Name</TableCell>
                                        <TableCell align="right">Nickname</TableCell>
                                        <TableCell align="right">Owner</TableCell>
                                        <TableCell align="right">Breed</TableCell>
                                        <TableCell align="right">Max. amount of feedings per day</TableCell>
                                        <TableCell align="right">Stable</TableCell>
                                        <TableCell align="right">Preferences</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {props.horses.map((row) => (
                                        <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                                            <TableCell component="th" scope="row"> {row.id} </TableCell>
                                            <TableCell component="th" scope="row"> {row.name} </TableCell>
                                            <TableCell align="right">{row.nickname}</TableCell>
                                            <TableCell align="right">{row.owner}</TableCell>
                                            <TableCell align="right">{row.breed}</TableCell>
                                            <TableCell align="right">{row.maxFeedingsPerDay}</TableCell>
                                            <TableCell align="right">{(props.stables.find(stable => stable.id === row.stable)).name}</TableCell>
                                            <TableCell align="right">{row.preferences}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                </div>
            </div>
        </div>
    )
}