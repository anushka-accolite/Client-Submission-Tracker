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
import TablePagination from '@mui/material/TablePagination';
import '../../css/listofta.css';
import axios from 'axios';

export default function Listofpm() {
  const [rows, setRows] = useState([]);
  const [selectedColumn, setSelectedColumn] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const headers = { "Authorization": "Bearer " + token };

        const response = await axios.get('http://localhost:8092/api/user/users', { headers });
        let details = response.data;

        console.log('Fetched Details:', details);

        const toBeSearched = 'Project Manager'.replace(/\s+/g, '').toLowerCase();

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
  // const handleColumnChange = (event) => {
  //   setSelectedColumn(event.target.value);
  //   setSearchTerm(''); // Reset search term when changing the column
  // };

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSortOrderChange = () => {
    setSortOrder((prevSortOrder) => (prevSortOrder === 'asc' ? 'desc' : 'asc'));
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
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
    const columns = ['Id', 'Name', 'Email'];
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
    return sortedRows
      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
      .map((row) => (
        <TableRow key={row.Id} className="tr">
          <TableCell>{row.Id}</TableCell>
          <TableCell>{row.Name}</TableCell>
          <TableCell>{row.Email}</TableCell>
        </TableRow>
      ));
  };

  const handleClearSearch = () => {
    setSearchTerm('');
  };

  return (
    <>
      <h2 id="hd1">Project Manager Members</h2>
      <div className='uppercon'>
        <div className="filter-container">
          {/* <FormControl variant="outlined">
            <Select
              id="dropdown"
              value={selectedColumn}
              onChange={handleColumnChange}
              displayEmpty
            >
              <MenuItem value="Id">Id</MenuItem>
              <MenuItem value="Name">Name</MenuItem>
              <MenuItem value="Email">Email</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label="Search"
            variant="outlined"
            value={searchTerm}
            onChange={handleSearchTermChange}
            className='searchip'
            style={{ marginLeft: "20px" }}
          />
          {searchTerm && (
            <button onClick={handleClearSearch} className="clear-search-btn">Clear</button>
          )} */}
          <div className='uppercon'>
        <FormControl variant="outlined">
          <Select
            className="dropdown"
            value={selectedColumn}
            onChange={handleColumnChange}
            style={{paddingLeft:"60px"}}
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
          style={{marginLeft:"20px"}}
        />
        {searchTerm && (
          <button onClick={handleClearSearch} className="clear-search-btn">Clear</button>
        )}
      </div>
        </div>
      </div>
      <TableContainer component={Paper} className='table'>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>{renderHeaderCells()}</TableHead>
          <TableBody>{renderBodyRows()}</TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[3, 5, 10, 25]}
        component="div"
        count={sortedRows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
}
