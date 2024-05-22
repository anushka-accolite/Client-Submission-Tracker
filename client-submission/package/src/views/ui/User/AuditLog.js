import React, { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import '../../css/auditlog.css';

function createData(s_id, c_id, name, status, remark, revtype, rev) {
    return { s_id, c_id, name, status, remark, revtype, rev };
}

export default function AuditLog() {
    const [selectedColumn, setSelectedColumn] = useState('Name');
    const [searchTerm, setSearchTerm] = useState('');
    const [sortOrder, setSortOrder] = useState('asc');
    const [rows, setRows] = useState([
        createData(1, 1, 'abc', 'selected', 'good', 1, new Date(2024, 4, 22, 13, 4)),
    ]);

    const handleColumnChange = (event) => {
        setSelectedColumn(event.target.value);
    };

    const handleSearchTermChange = (event) => {
        setSearchTerm(event.target.value);
    };

    return (
        <div>
            <FormControl sx={{ m: 1, minWidth: 120 }} style={{ marginTop: "0.2px" }}>
                <InputLabel id="column-label">Column</InputLabel>
                <Select
                    labelId="column-label"
                    id="column-select"
                    value={selectedColumn}
                    label="Column"
                    onChange={handleColumnChange}
                >
                    <MenuItem value="S_id">SubmissionID</MenuItem>
                    <MenuItem value="C_id">CandidateID</MenuItem>
                    <MenuItem value="Name">Name</MenuItem>
                    <MenuItem value="Status">Status</MenuItem>
                    <MenuItem value="Remark">Remark</MenuItem>
                    <MenuItem value="Revisions">No. of Revisions</MenuItem>
                    <MenuItem value="RevOn">Revision</MenuItem>
                </Select>
            </FormControl>
            <TextField
                id="search"
                label="Search"
                variant="outlined"
                value={searchTerm}
                onChange={handleSearchTermChange}
            />
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell><b>SubmissionID</b></TableCell>
                            <TableCell><b>CandidateID</b></TableCell>
                            <TableCell align="right"><b>Name</b></TableCell>
                            <TableCell align="right"><b>Status</b></TableCell>
                            <TableCell align="right"><b>Remark</b></TableCell>
                            <TableCell align="right"><b>No. of Revisions</b></TableCell>
                            <TableCell align="right"><b>Revision</b></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows
                            .filter(row => row[selectedColumn.toLowerCase()] && row[selectedColumn.toLowerCase()].toString().toLowerCase().includes(searchTerm.toLowerCase()))
                            .map((row) => (
                                <TableRow
                                    key={row.s_id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {row.s_id}
                                    </TableCell>
                                    <TableCell>{row.c_id}</TableCell>
                                    <TableCell align="right">{row.name}</TableCell>
                                    <TableCell align="right">{row.status}</TableCell>
                                    <TableCell align="right">{row.remark}</TableCell>
                                    <TableCell align="right">{row.revtype}</TableCell>
                                    <TableCell align="right">{row.rev.toLocaleString()}</TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}
