import '../../css/clients.css';
import React, { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import SortIcon from '@mui/icons-material/Sort';
import Button from '@mui/material/Button';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import TablePagination from '@mui/material/TablePagination';
import '../../css/listofclients.css';

const columns = [
  { id: 'clientId', label: 'Client ID', minWidth: 170 },
  { id: 'clientName', label: 'Client Name', minWidth: 100 },
  { id: 'clientRequirement', label: 'Client Requirement', minWidth: 170 },
  { id: 'skills', label: 'Skills', minWidth: 170 },
  { id: 'clientResponseTimeinDays', label: 'Response Time', minWidth: 170 },
  { id: 'addCandidate', label: 'Add Candidate', minWidth: 170 }, 
];

export default function Clients() {
  const [selectedColumn, setSelectedColumn] = useState('clientName');
  const [searchTerm, setSearchTerm] = useState('');
  const [clients, setClients] = useState([]);
  const [filteredClients, setFilteredClients] = useState([]);
  const [sortOrder, setSortOrder] = useState('asc');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const token = localStorage.getItem("token");
        const headers = {
          'Authorization': `Bearer ${token}`
        };
        let userObj = await axios.get(`http://localhost:8092/api/user/users`, { headers });
        let username = localStorage.getItem("username");
        let user = userObj.data.find((item) => item.userName === username);
        console.log(user);
        const response = await axios.get('http://localhost:8092/api/admin/clients', { headers });
        const clientsData = response.data;

        // Filter clients assigned to the logged-in user and not deleted
        const userClients = clientsData.filter(client => 
          client.users && client.users.some(users => users.userId === user.userId) && !client.isDeleted
        );

        // Log filtered client data
        console.log('Filtered clients for user:', userClients);

        setClients(userClients);
        setFilteredClients(userClients);
        console.log(userClients);
      } catch (error) {
        console.error('Error fetching clients:', error);
      }
    };

    fetchClients();
  }, []);

  const handleColumnChange = (event) => {
    const { value } = event.target;
    setSelectedColumn(value);
    setSearchTerm('');
    setFilteredClients(clients);
  };

  const handleSearchChange = (event) => {
    const { value } = event.target;
    setSearchTerm(value);

    let filteredResult;
    if (selectedColumn === 'clientName') {
      filteredResult = clients.filter(client => client.clientName && client.clientName.toLowerCase().includes(value.toLowerCase()));
    } else if (selectedColumn === 'skills') {
      filteredResult = clients.filter(client => client.skills && client.skills.toLowerCase().includes(value.toLowerCase()));
    } else {
      filteredResult = clients.filter(client => {
        const columnValue = client[selectedColumn];
        return columnValue && columnValue.toString().toLowerCase().includes(value.toLowerCase());
      });
    }
    setFilteredClients(filteredResult);
    setPage(0); // Reset to first page when search changes
  };

  const getResponseTimeStyle = (responseTime) => {
    let backgroundColor = {};
    if (responseTime === 0) {
      backgroundColor = { backgroundColor: 'Red' };
    } else if (responseTime >= 1 && responseTime <= 3) {
      backgroundColor = { backgroundColor: 'yellow' };
    }
    return { ...backgroundColor, borderRadius: '10px' }; // Apply rounded corners
  };

  const handleSortToggle = () => {
    const order = sortOrder === 'asc' ? 'desc' : 'asc';
    const sortedClients = [...filteredClients].sort((a, b) => {
      if (order === 'asc') {
        return a.clientResponseTimeinDays - b.clientResponseTimeinDays;
      } else {
        return b.clientResponseTimeinDays - a.clientResponseTimeinDays;
      }
    });
    setSortOrder(order);
    setFilteredClients(sortedClients);
  };

  const handleClearSearch = () => {
    setSearchTerm('');
    setFilteredClients(clients);
  };

  const handleAddCandidateClick = (clientId) => {
    // Navigate to the "Add Candidate" page for the specific client
    localStorage.setItem("clientId", clientId);
    const clientObj = clients.find(client => client.clientId === clientId);
    if (clientObj) {
      localStorage.setItem("clientName", clientObj.clientName);
      navigate(`/listofcandidates`);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
      <h2 id='hd'>Client List</h2>
      <div id="container">
        <div>
          <TextField 
            className="search"
            select
            label="Select Column"
            value={selectedColumn}
            onChange={handleColumnChange}
            variant="outlined"
          size="small"
          >
            {columns.map((column) => (
              column.label !== 'Client Requirement' && column.label !== 'Response Time' &&  column.id!="addCandidate" && (
                <MenuItem key={column.id} value={column.id}>
                  {column.label}
                </MenuItem>
              )
            ))}
          </TextField>
          <TextField 
            className='searchbar'
            label="Search"
            variant="outlined"
            size="small"
            value={searchTerm}
            onChange={handleSearchChange}
            style={{ marginLeft: "10px" }}
          />
          {searchTerm && (
            <button onClick={handleClearSearch} className="clear-search-btn">Clear</button>
          )}
        </div>
        <div className="response-time-container">
          <span className="response-time-indicator">Response Time : </span>
          <span className="response-time-red">0 Days - <div className="sort-circle red-circle" /></span>
          <span className="response-time-yellow">3 Days - <div className="sort-circle yellow-circle" /></span>
        </div>
      </div>
      <Paper className='table'>
        <TableContainer className='tableContainer'>
          <Table>
            <TableHead className='tableHead'>
              <TableRow id="topRow">
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    className='tableCell'
                  >
                    <b>{column.label}</b>
                    {column.id === 'clientResponseTimeinDays' && (
                      <IconButton size="small" onClick={handleSortToggle}>
                        <SortIcon />
                      </IconButton>
                    )}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredClients.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(client => (
                <TableRow key={client.clientId} className='tableRow'>
                  <TableCell className='tableCell'>{client.clientId}</TableCell>
                  <TableCell className='tableCell'>{client.clientName}</TableCell>
                  <TableCell className='tableCell'>{client.clientRequirement}</TableCell>
                  <TableCell className='tableCell'>{client.skills}</TableCell>
                  <TableCell id='responsecol' className='tableCell' style={getResponseTimeStyle(client.clientResponseTimeinDays)}>
                    {client.clientResponseTimeinDays}
                  </TableCell>
                  <TableCell className='tableCell'>
                    <Button variant="contained" onClick={() => handleAddCandidateClick(client.clientId)}>
                      Add Candidate
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[2,5, 10, 25]}
          component="div"
          count={filteredClients.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </>
  );
}

