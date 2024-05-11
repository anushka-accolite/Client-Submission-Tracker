import React, { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import { MenuItem } from '@mui/material';

const rows = [
  { Id: 1, name: 'John Doe', Experience: 5, Project: 'Project X', Email: 'john.doe@example.com' },
  { Id: 2, name: 'Jane Smith', Experience: 3, Project: 'Project Y', Email: 'jane.smith@example.com' },
  { Id: 3, name: 'Alice Johnson', Experience:2, Project: 'Project Z', Email: 'alice.johnson@example.com' },
];

function Listofpm() {
  const [selectedColumn, setSelectedColumn] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const handleColumnChange = (event) => {
    setSelectedColumn(event.target.value);
  };

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredRows = rows.filter((row) => {
    if (selectedColumn === '') {
      return Object.values(row).some((value) =>
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      );
    } else {
      return row[selectedColumn].toString().toLowerCase().includes(searchTerm.toLowerCase());
    }
  });

  return (
    <>
      <h1>List of Project Manager</h1>
      <div style={{ marginBottom: '16px' }}>
        <FormControl variant="outlined" style={{ marginRight: '16px', minWidth: '120px' }}>
          <Select className='uppercon'
            value={selectedColumn}
            onChange={handleColumnChange}
            displayEmpty
          >
            {Object.keys(rows[0]).map((column) => (
              <MenuItem key={column} value={column}>
                {column}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          label="Search"
          variant="outlined"
          value={searchTerm}
          onChange={handleSearchTermChange}
        />
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {Object.keys(rows[0]).map((column) => (
                <TableCell key={column}><b>{column}</b></TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredRows.map((row) => (
              <TableRow key={row.id}>
                {Object.values(row).map((value, index) => (
                  <TableCell key={index}>{value}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default Listofpm;
