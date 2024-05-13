import * as React from 'react';
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

interface Column {
  id: string;
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: (value: number) => string;
}

const columns: Column[] = [
  { id: 'id', label: 'Client ID', minWidth: 170 },
  { id: 'name', label: 'Client Name', minWidth: 100 },
  { id: 'requirement', label: 'Client Requirement', minWidth: 170 }, // Added client requirement column
];

interface Data {
  id: number;
  name: string;
  requirement: number;
}

function createData(
  id: number,
  name: string,
  requirement: number
): Data {
  return { id, name, requirement };
}

const rows: Data[] = [
  createData(1, 'Client 1', 2),
  createData(2, 'Client 2', 3),
  createData(3, 'Client 3', 4),
];

export default function ColumnGroupingTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [selectedColumn, setSelectedColumn] = React.useState('name'); // Default selected column
  const [searchTerm, setSearchTerm] = React.useState('');

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleColumnChange = (event) => {
    setSelectedColumn(event.target.value);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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
      <Paper sx={{ width: '100%' }} className='table'>
        <TableContainer sx={{ maxHeight: 440 }}>
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
                          {column.format && typeof value === 'number'
                            ? column.format(value)
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
