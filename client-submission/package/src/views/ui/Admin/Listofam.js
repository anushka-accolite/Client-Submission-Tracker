import React, { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import '../../css/listofam.css';

const rows = [
  { Id: 1, Name: 'John Doe', Client: 'ABC Corp', Project: 'Project X', Email: 'john.doe@example.com' },
  { Id: 2, Name: 'Jane Smith', Client: 'XYZ Inc', Project: 'Project Y', Email: 'jane.smith@example.com' },
  { Id: 3, Name: 'Alice Johnson', Client: 'DEF Ltd', Project: 'Project Z', Email: 'alice.johnson@example.com' },
];

export default function Listofam() {
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
      return true; 
    } else {
      return row[selectedColumn].toString().toLowerCase().includes(searchTerm.toLowerCase());
    }
  });

  const renderHeaderCells = () => {
    return (
      <TableRow>
        {Object.keys(rows[0]).map((column) => (
          <TableCell key={column}>
            <b>{column}</b>
          </TableCell>
        ))}
      </TableRow>
    );
  };

  const renderBodyRows = () => {
    return filteredRows.map((row) => (
      <TableRow key={row.id}>
        {Object.values(row).map((value, index) => (
          <TableCell key={index}>{value}</TableCell>
        ))}
      </TableRow>
    ));
  };

  return (
    <>
      <h1>List of Account Manager</h1>
      <div className='uppercon'>
        <FormControl variant="outlined" style={{ marginRight: '16px', minWidth: '120px' }}>
          <Select
           className='uppercon'
            value={selectedColumn}
            onChange={handleColumnChange}
            displayEmpty
            sx={{ border: '1px solid #ccc', borderRadius: '4px' }} // Add border style here
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
          <TableHead>{renderHeaderCells()}</TableHead>
          <TableBody>{renderBodyRows()}</TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
