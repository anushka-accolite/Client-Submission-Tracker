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
import IconButton from '@mui/material/IconButton';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import '../../css/listofta.css';

const rows = [
  { Id: 1, Name: 'John Doe', Experience: 3, Project: 'Project A', Email: 'john.doe@example.com' },
  { Id: 2, Name: 'Jane Smith', Experience: 5, Project: 'Project B', Email: 'jane.smith@example.com' },
  { Id: 3, Name: 'Alice Johnson', Experience: 2, Project: 'Project C', Email: 'alice.johnson@example.com' },
];

export default function Listofta() {
  const [selectedColumn, setSelectedColumn] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');

  const handleColumnChange = (event) => {
    setSelectedColumn(event.target.value);
  };

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSortOrderChange = () => {
    setSortOrder((prevSortOrder) => (prevSortOrder === 'asc' ? 'desc' : 'asc'));
  };

  const filteredRows = rows.filter((row) => {
    if (selectedColumn === 'Id') {
      return row[selectedColumn] === parseInt(searchTerm);
    } else {
      return Object.values(row).some((value) =>
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
  });

  const sortedRows = [...filteredRows].sort((a, b) => {
    if (sortOrder === 'asc') {
      return a.Experience - b.Experience;
    } else {
      return b.Experience - a.Experience;
    }
  });


  const renderHeaderCells = () => {
    return (
      <TableRow>
        {Object.keys(rows[0]).map((column) => (
          <TableCell key={column}>
            {column === 'Experience' ? (
              <>
                <b>{column}</b>
                <IconButton 
                onClick={handleSortOrderChange}
                >
                  {sortOrder === 'asc' ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />}
                </IconButton>
              </>
            ) : (
              <b>{column}</b>
            )}
          </TableCell>
        ))}
      </TableRow>
    );
  };

  const renderBodyRows = () => {
    return sortedRows.map((row) => (
      <TableRow key={row.Id}>
        {Object.values(row).map((value, index) => (
          <TableCell key={index}>{value}</TableCell>
        ))}
      </TableRow>
    ));
  };

  return (
    <>
      <h1>List of Talent Acquisition</h1>
      <div className='uppercon'>
        <FormControl variant="outlined">
          <Select
            className="dropdown"
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
      <TableContainer component={Paper} className='table' style={{boxShadow:"0px 4px 8px rgba(0, 0, 0, 0.1)"}}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>{renderHeaderCells()}</TableHead>
          <TableBody>{renderBodyRows()}</TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
