import React, { useEffect, useState } from 'react';
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
import '../../css/listofta.css';
import axios from 'axios';

export default function Listofta() {
  const [rows, setRows] = useState([]);
  const [selectedColumn, setSelectedColumn] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');

  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const headers = { "Authorization": "Bearer " + token };
        const response = await axios.get('http://localhost:8092/api/user/users', { headers });
        let details = response.data;
        console.log('Fetched Details:', details);
        const toBeSearched = 'TalentAcquistion'.replace(/\s+/g, '').toLowerCase();
        details = details.filter(item => {
          return item.userRole.replace(/\s+/g, '').toLowerCase() === toBeSearched;
        });
        console.log('Filtered Details:', details);
        const mappedDetails = details.map(item => ({
          Id: item.userId,
          Name: item.userName,
          Email: item.email
        }));

        setRows(mappedDetails);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

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
    if (selectedColumn) {
      return row[selectedColumn]?.toString().toLowerCase().includes(searchTerm.toLowerCase());
    } else {
      return Object.values(row).some((value) =>
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
  });

  const sortedRows = [...filteredRows].sort((a, b) => {
    if (sortOrder === 'asc') {
      return a.Name.localeCompare(b.Name);
    } else {
      return b.Name.localeCompare(a.Name);
    }
  });

  const renderHeaderCells = () => {
    const columns = ['Id', 'Username', 'Email'];
    return (
      <TableRow>
        {columns.map((column) => (
          <TableCell key={column}>  
              <b>{column}</b>
          </TableCell>
        ))}
      </TableRow>
    );
  };

  const renderBodyRows = () => {
    return sortedRows.map((row) => (
      <TableRow className='tr' key={row.Id}>
        <TableCell>{row.Id}</TableCell>
        <TableCell>{row.Name}</TableCell>
        <TableCell>{row.Email}</TableCell>
      </TableRow>
    ));
  };

  return (
    <>
      <h1 id="hd">List of Talent Acquisition</h1>
      <div className='uppercon'>
        <FormControl variant="outlined">
          <Select
            className="dropdown"
            value={selectedColumn}
            onChange={handleColumnChange}
            displayEmpty
          >
            <MenuItem value="Id">Id</MenuItem>
            <MenuItem value="Name">Username</MenuItem>
            <MenuItem value="Email">Email</MenuItem>
          </Select>
        </FormControl>
        <TextField
          label="Search"
          variant="outlined"
          value={searchTerm}
          onChange={handleSearchTermChange}
        />
      </div>
      <TableContainer component={Paper} className='table'>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>{renderHeaderCells()}</TableHead>
          <TableBody>{renderBodyRows()}</TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
