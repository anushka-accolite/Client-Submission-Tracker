import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import '../../css/clients.css';

const columns = [
  { id: 'id', label: 'Client ID', minWidth: 170 },
  { id: 'name', label: 'Client Name', minWidth: 100 },
  { id: 'requirement', label: 'Client Requirement', minWidth: 170 },
  { id: 'skills', label: 'Skills', minWidth: 170 }, 
  { id: 'responseTime', label: 'Response Time', minWidth: 170 }, 
];

function createData(id, name, requirement, skills, responseTime) {
  return { id, name, requirement, skills, responseTime };
}

const rows = [
  createData(1, 'Client 1', 2, { java: true, python: true }, 20),
  createData(2, 'Client 2', 3, { mysql: true, java: true }, 30),
  createData(3, 'Client 3', 4, { cpp: true, python: true }, 40),
];

export default function ColumnGroupingTable() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedColumn, setSelectedColumn] = useState('name');
  const [searchTerm, setSearchTerm] = useState('');

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleColumnChange = (event) => {
    setSelectedColumn(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <>
      <h1>List of Clients</h1>
      <div>
        <TextField className="dropdown" 
          select
          label="Select Column"
          value={selectedColumn}
          onChange={handleColumnChange}
        >
          {columns.map((column) => (
            <MenuItem key={column.id} value={column.id}>
              {column.label}
            </MenuItem>
          ))}
        </TextField>
        <TextField className='searchbar'
          label="Search"
          variant="outlined"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
      <Paper style={{ width: '100%' }} className='table'>
        <TableContainer style={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    <b>{column.label}</b>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .filter(row => row[selectedColumn].toString().toLowerCase().includes(searchTerm.toLowerCase()))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.id === 'skills' && typeof value === 'object' ? 
                            Object.keys(value).map((key, index) => (
                              <div key={index}>{`${index + 1}. ${key}`}</div>
                            )) 
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </>
  );
}
