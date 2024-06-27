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

function fetchClientsWithUsername(clients, userName) {
  console.log(clients, userName);
  let clientList = [];
  for (const client of clients) {
    const users = client.users; // Assuming users field is an array of user objects
    const matchingUser = users.find(user => user.userName === userName);
    if (matchingUser) clientList.push(client.clientName); // Fetch client names
  }
  console.log(clientList);
  return clientList;
}



export default function Listofam() {
  const [rows, setRows] = useState([]);
  const [selectedColumn, setSelectedColumn] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.role !== 'admin') {
      navigate('/loginform');
    }

    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const headers = { Authorization: 'Bearer ' + token };
        const userResponse = await axios.get('http://localhost:8092/api/user/users', { headers });
        let userDetails = userResponse.data;
        console.log('Fetched Details:', userDetails);
        const toBeSearched = 'Account Manager'.replace(/\s+/g, '').toLowerCase();
        userDetails = userDetails.filter(item => item.userRole.replace(/\s+/g, '').toLowerCase() === toBeSearched);
        
        const clientsResponse = await axios.get('http://localhost:8092/api/admin/clients', { headers });
        const clients = clientsResponse.data;
        console.log('Clients:', clients);
        console.log('Filtered Details:', userDetails);
        
        const mappedDetails = userDetails.map(item => ({
          Id: item.userId,
          Name: item.userName,
          Email: item.email,
          Clients: fetchClientsWithUsername(clients, item.userName)
        }));

        setRows(mappedDetails);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [navigate]);

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
    const columns = ['Id', 'Username', 'Email', 'Clients'];
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
        <TableCell>{row.Clients.join(', ')}</TableCell> {/* Joining the array for display */}
      </TableRow>
    ));
  };

  return (
    <>
      <h2 id="hd1">Account Manager Members</h2>
      <div className='uppercon'>
        <FormControl variant="outlined">
          <Select
            className="dropdown"
            value={selectedColumn}
            onChange={handleColumnChange}
            style={{ paddingLeft: "60px" }}
            displayEmpty
          >
            <MenuItem value="Id">Id</MenuItem>
            <MenuItem value="Name">Username</MenuItem>
            <MenuItem value="Email">Email</MenuItem>
            <MenuItem value="Clients">Clients</MenuItem>
          </Select>
        </FormControl>
        <TextField
          label="Search"
          variant="outlined"
          value={searchTerm}
          onChange={handleSearchTermChange}
          style={{ marginLeft: "20px" }}
        />
        {searchTerm && (
          <button onClick={handleClearSearch} className="clear-search-btn">Clear</button>
        )}
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

