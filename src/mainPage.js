import React, { useState } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Container } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { Input } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save';
import 'bootstrap/dist/css/bootstrap.min.css';
import moment from 'moment';
import { Row } from 'react-bootstrap';
import './App.css';

export default function NewYearsResolution() {
    const [resolutions, setResolutions] = useState([]);
    const [name, setName] = useState("");
    const [searchText, setSearchText] = useState("");
    var filteredResolutions = [];

    const forceUpdate = useForceUpdate();

    function useForceUpdate(){
        const [value, setValue] = useState(0); 
        return () => setValue(value => value + 1);
    }

    function saveData() {
        if (name !== "") {
            setResolutions([{ name: name, createdAt: moment().toDate() }, ...resolutions]);
            setName("");
        }
    }

    function removeItem(index) {
        var _resolutions = resolutions;
        _resolutions.splice(index, 1);

        setResolutions(_resolutions);
        forceUpdate();
    }

    function DeleteTableCell(props) {
        if (searchText === "") {
            return (<TableCell align="center"><Button variant="danger" onClick={(e) => removeItem(props.index)}><DeleteIcon/></Button></TableCell>);
        }
        
        return <TableCell align="center"></TableCell>
    }

    return (
        <Container sm={8}>
            <Row><Input type ="text" style={{color: "white"}} onChange={(e) => setSearchText(e.target.value)}/></Row>
            <br/>
            <Row>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">New year's resolution</TableCell>
                            <TableCell align="center">Date created</TableCell>
                            <TableCell align="center">Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                            <TableRow key="input">
                                <TableCell align="center"><Input type="text" onChange={(e) => setName(e.target.value)} value={name}/></TableCell>
                                <TableCell/>
                                <TableCell align="center"><Button variant="success" onClick={saveData}><SaveIcon/></Button></TableCell>
                            </TableRow>
                        {resolutions.filter(reso => reso.name.includes(searchText)).map((obj, i) => (
                            <TableRow key={i}>
                                <TableCell align="center">{obj.name}</TableCell>
                                <TableCell align="center">{moment(obj.createdAt).format('MM/DD/YYYY HH:mm:ss') }</TableCell>
                                <DeleteTableCell index={i}/>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            </Row>
        </Container>
    );
}