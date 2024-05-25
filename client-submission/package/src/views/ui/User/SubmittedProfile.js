// 
import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import axios from 'axios';

function createData(id, name, experience, skill, status, clientname) {
  return { id, name, experience, skill, status, clientname };
}

export default function () {

   

  const [selectedColumn, setSelectedColumn] = React.useState('Name');
  const [searchTerm, setSearchTerm] = React.useState('');
  const [sortOrder, setSortOrder] = React.useState('asc');
  const [rows, setRows] = React.useState([
    createData(101, 'chirag', 1, 'selected', 'GS','good understanding of concepts'),
  ]);

  const handleColumnChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedColumn(selectedValue);
    if (selectedValue === 'Candidate Id') {
      const sortedRows = [...rows].sort((a, b) => (sortOrder === 'asc' ? a.id - b.id : b.id - a.id));
      setRows(sortedRows);
      // Toggle the sort order
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    }
  };

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const headers = { "Authorization": `Bearer ${token}` };
        const response = await axios.get('http://localhost:8092/api/submissions/getAll', { headers });
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, []);
  
  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 120 }} style={{marginTop:"0.2px"}}>
        <InputLabel id="column-label">Column</InputLabel>
        <Select
          labelId="column-label"
          id="column-select"
          value={selectedColumn}
          label="Column"
          onChange={handleColumnChange}
        >
          {/* <MenuItem value="Candidate Id">Candidate Id</MenuItem> */}
          <MenuItem value="Name">Name</MenuItem>
          <MenuItem value="Experience">Experience</MenuItem>
          {/* <MenuItem value="Skill">Skill</MenuItem> */}
          <MenuItem value="Status">Status</MenuItem>
          <MenuItem value="ClientName">ClientName</MenuItem>
          
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
              <TableCell><b>Candidate Id</b></TableCell>
              <TableCell align="right"><b>Name</b></TableCell>
              <TableCell align="right"><b>Experience</b></TableCell>
              {/* <TableCell align="right"><b>Skill</b></TableCell> */}
              <TableCell align="right"><b>Status</b></TableCell>
              <TableCell align="right"><b>ClientName</b></TableCell>
              <TableCell align="right"><b>Remark</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .filter(row => row[selectedColumn.toLowerCase()] && row[selectedColumn.toLowerCase()].toString().toLowerCase().includes(searchTerm.toLowerCase()))
              .map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.id}
                  </TableCell>
                  <TableCell align="right">{row.name}</TableCell>
                  <TableCell align="right">{row.experience}</TableCell>
                  <TableCell align="right">{row.skill}</TableCell>
                  <TableCell align="right">{row.status}</TableCell>
                  <TableCell align="right">{row.clientname}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
