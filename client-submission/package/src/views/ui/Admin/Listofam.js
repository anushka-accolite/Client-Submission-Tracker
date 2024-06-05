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
import '../../css/listofpm.css'; 
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Listofam() {
  const [rows, setRows] = useState([]);
  const [selectedColumn, setSelectedColumn] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const navigate=useNavigate();
  useEffect(() => {
    if(localStorage.role!=='admin'){
      navigate('/loginform');
    }
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const headers = { "Authorization": "Bearer " + token };

        let response = await axios.get('http://localhost:8092/api/user/users', { headers }); //fetched all user details
        let details = response.data;

        const toBeSearched = 'Account Manager'.replace(/\s+/g, '').toLowerCase(); // searching account manager by replacing trimming spaces and changing to lower case
        details = details.filter(item => {
          return item.userRole.replace(/\s+/g, '').toLowerCase() === toBeSearched;  
        });

        const mappedDetails = details.map(item => ({
          Id: item.userId,
          Username: item.userName,
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
  const handleClearSearch = () => {
    setSearchTerm('');
  };

  const filteredRows = rows.filter((row) => {
    if (selectedColumn === '') {
      return true;
    } else {
      return row[selectedColumn].toString().toLowerCase().includes(searchTerm.toLowerCase());
    }
  });

  const renderHeaderCells = () => {
    if (rows.length === 0) return null;
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
      <TableRow key={row.Id} className='tr'>
        {Object.values(row).map((value, index) => (
          <TableCell key={index}>{value}</TableCell>
        ))}
      </TableRow>
    ));
  };

  return (
    <>
      <h1 id='hd1'>List of Account Manager</h1>
      <div className='uppercontainer'>
        <FormControl variant="outlined">
          <Select
            className='filter-select'
            value={selectedColumn}
            onChange={handleColumnChange}
            style={{paddingLeft:"60px"}}
            displayEmpty
          >
            {rows.length > 0 && Object.keys(rows[0]).map((column) => (
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
          style={{marginLeft:"20px"}}
        />
        {searchTerm && (
            <button onClick={handleClearSearch} className="clear-search-btn">Clear</button>
          )}
      </div>
      <TableContainer component={Paper} className="table-container">
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>{renderHeaderCells()}</TableHead>
          <TableBody>{renderBodyRows()}</TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
