import * as React from 'react';
import './StyleCard.css'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default function ManageStables(props) {

    let newStable = {
        name: '',
        address: '',
        horses: []
    }

    function handleInputChange(event) {
        newStable[event.target.name] = event.target.value;
    }

    function handleSubmit(event) {
        event.preventDefault();
        fetch("http://localhost:8080/api/v1/stables", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newStable)
        }).then(() => console.log(JSON.stringify(newStable)));
        window.location.reload();
    }

    return (
        <div className='card-container'>
            <div className='style-card'>
                <div className="style-card-content">
                    <h3>Add Stable</h3>
                    <h1>Stable</h1>
                    <p>Add information about the stable and press submit when you are done</p>
                    <form onSubmit={handleSubmit} className='form'>
                        <TextField className='form-element' onChange={handleInputChange} name='name' label='Name' variant='outlined' />
                        <TextField className='form-element' onChange={handleInputChange} name='address' label='Address' variant='outlined' />
                        <Button className='form-element' type='submit' variant='contained'>Submit</Button>
                    </form>
                </div>
            </div>
            <div className='style-card'>
                <div className="style-card-content">
                    <h3>All Stables</h3>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>ID</TableCell>
                                    <TableCell align="right">Name</TableCell>
                                    <TableCell align="right">Address</TableCell>
                                    <TableCell align="right">#Horses</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {props.stables.map((row) => (
                                    <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                                        <TableCell component="th" scope="row"> {row.id} </TableCell>
                                        <TableCell align="right">{row.name}</TableCell>
                                        <TableCell align="right">{row.address}</TableCell>
                                        <TableCell align="right">{row.horses.length}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </div>
        </div>
    )
}