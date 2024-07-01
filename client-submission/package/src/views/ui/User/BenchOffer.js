import React, { useState, useEffect } from 'react';
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
import { useNavigate } from 'react-router-dom';
import TablePagination from '@mui/material/TablePagination';

import '../../css/submittedprofile.css';

function createData(sid, cid, name, experience, status, clientname, remark, responseTime, lastWorkingDate, lastWorkingDaysLeft) {
  return { sid, cid, name, experience, status, clientname, remark, responseTime, lastWorkingDate, lastWorkingDaysLeft };
}

export default function BenchOffer() {
  const [selectedColumn, setSelectedColumn] = useState('name');
  const [searchTerm, setSearchTerm] = useState('');
  const [daysLeft, setDaysLeft] = useState('');
  const [responseTimeLimit, setResponseTimeLimit] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const role = localStorage.getItem('role');
        if (role !== 'user') {
          navigate('/loginform');
          return;
        }

        const token = localStorage.getItem('token');
        const headers = { Authorization: `Bearer ${token}` };

        const submissionsResponse = await axios.get('http://localhost:8092/api/submissions/getAll', { headers });
        const submissions = submissionsResponse.data;

        const clientsResponse = await axios.get('http://localhost:8092/api/admin/clients', { headers });
        const clients = clientsResponse.data;

        const userObjResponse = await axios.get('http://localhost:8092/api/user/users', { headers });
        const username = localStorage.getItem('username');
        const user = userObjResponse.data.find(item => item.userName === username);

        let clientData = '';
        clients.forEach(client => {
          client.users.forEach(item => {
            if (item.userId === user.userId) {
              clientData = client;
            }
          });
        });

        if (!clientData) {
          console.error('No matching client found for the user');
          return;
        }

        const latestSubmissionsPromises = submissions.map(async submission => {
          try {
            const historyResponse = await axios.get(`http://localhost:8092/api/submissions/${submission.submissionId}/history`, { headers });
            const history = historyResponse.data;

            if (history.length > 0) {
              return history[history.length - 1];
            } else {
              console.log(`No history found for submission ID: ${submission.submissionId}`);
              return null;
            }
          } catch (error) {
            console.error(`Error fetching history for submission ID: ${submission.submissionId}`, error);
            return null;
          }
        });

        const latestSubmissions = await Promise.all(latestSubmissionsPromises);

        const candidates = submissions.map((submission, index) => {
          const clientname = submission.client.clientName || 'N/A';
          const latestSubmission = latestSubmissions[index];

          let lastWorkingDaysLeft = 'N/A';
          if (submission.candidate.last_working_day && submission.candidate.last_working_day !== 'N/A') {
            const lastWorkingDate = new Date(submission.candidate.last_working_day);
            const currentDate = new Date();
            const diffTime = Math.abs(currentDate - lastWorkingDate);
            lastWorkingDaysLeft = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
          }

          let responseTime = 'N/A';
          if (latestSubmission) {
            const submissionDate = new Date(latestSubmission[6]).setHours(0, 0, 0, 0); // Set submission time to start of day
            const currentDate = new Date();
            const today = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()); // Get today's date without time
            const diffTime = Math.abs(today - submissionDate);
            const timestampDifference = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // Difference in days
            responseTime = timestampDifference === 0 ? clientData.clientResponseTimeinDays : timestampDifference;
          }

          return createData(
            submission.submissionId,
            submission.candidate.candidateId,
            submission.candidate.candidateName,
            submission.candidate.experience,
            submission.status,
            clientname,
            submission.remark || 'N/A',
            responseTime,
            //changes
            lastWorkingDaysLeft == 1 ? new Date(submission.candidate.last_working_day).toLocaleDateString() : 'N/A',
            lastWorkingDaysLeft
          );
        });

        setRows(candidates);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [navigate]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleColumnChange = event => {
    const selectedValue = event.target.value.toLowerCase();
    setSelectedColumn(selectedValue);
    if (selectedValue === 'name') {
      const sortedRows = [...rows].sort((a, b) =>
        sortOrder === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name),
      );
      setRows(sortedRows);
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    }
  };

  const handleClearSearch = () => {
    setSearchTerm('');
  };

  const handleSearchTermChange = event => {
    setSearchTerm(event.target.value);
  };

  const handleDaysFilterChange = event => {
    setDaysLeft(event.target.value);
  };

  const handleResponseTimeChange = event => {
    setResponseTimeLimit(event.target.value);
  };

  const filteredRows = rows.filter(row => {
    const lessThanDaysLeft = daysLeft !== '' && row.lastWorkingDate !== 'N/A' && parseInt(row.lastWorkingDaysLeft) == 1;
    //changes
    const lessThanResponseTime = responseTimeLimit !== '' && row.responseTime !== 'N/A' && parseInt(row.responseTime) <= parseInt(responseTimeLimit);
    return row.name.toLowerCase().includes(searchTerm.toLowerCase()) && lessThanDaysLeft && lessThanResponseTime;
  });

  const startIndex = page * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const paginatedRows = filteredRows.slice(startIndex, endIndex);

  return (
    <div style={{ marginTop: '20px' }}>
      <FormControl sx={{ m: 1, minWidth: 120 }} style={{ marginTop: '0.2px' }}>
        <InputLabel id="column-label">Column</InputLabel>
        <Select
          labelId="column-label"
          id="column-select"
          value={selectedColumn.charAt(0).toUpperCase() + selectedColumn.slice(1)}
          label="Select Column"
          onChange={handleColumnChange}
        >
          <MenuItem value="Name">Name</MenuItem>
          <MenuItem value="Experience">Experience</MenuItem>
          <MenuItem value="Status">Status</MenuItem>
          <MenuItem value="ClientName">ClientName</MenuItem>
          <MenuItem value="Remark">Remark</MenuItem>
          <MenuItem value="ResponseTime">Response Time</MenuItem>
        </Select>
      </FormControl>
      <TextField
        id="search"
        label="Search"
        variant="outlined"
        value={searchTerm}
        onChange={handleSearchTermChange}
      />
      {searchTerm && (
        <button onClick={handleClearSearch} className="clear-search-btn">
          Clear
        </button>
      )}

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell align="right">
                <b>Submission Id</b>
              </TableCell>
              <TableCell>
                <b>Candidate Id</b>
              </TableCell>
              <TableCell align="right">
                <b>Name</b>
              </TableCell>
              <TableCell align="right">
                <b>Experience</b>
              </TableCell>
              <TableCell align="right">
                <b>Status</b>
              </TableCell>
              <TableCell align="right">
                <b>ClientName</b>
              </TableCell>
              <TableCell align="right">
                <span className={`th sortable-header ${sortOrder === 'asc' ? 'sort-asc' : 'sort-desc'}`}>
                  <b>Response Time</b>
                  <span onClick={() => handleColumnChange({ target: { value: 'responseTime' } })} style={{ cursor: 'pointer' }}>
                    {sortOrder === 'asc' ? '🔼' : '🔽'}
                  </span>
                </span>
              </TableCell>
              <TableCell align="right">
                <b>Remark</b>
              </TableCell>
              <TableCell align="right">
                <b>Last Working Date</b>
              </TableCell>
              <TableCell align="right">
                <b>Days Left</b>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedRows.map(row => (
              <TableRow
                key={row.sid}
                sx={{ '&:last-child td, &:last-child th': { border: 0 }, backgroundColor: row.lessThanDaysLeft ? 'lightcoral' : row.lessThanResponseTime ? 'yellow' : 'inherit' }}
              >
                <TableCell align="right">{row.sid}</TableCell>
                <TableCell component="th" scope="row">
                  {row.cid}
                </TableCell>
                <TableCell align="right">{row.name}</TableCell>
                <TableCell align="right">{row.experience}</TableCell>
                <TableCell align="right">{row.status}</TableCell>
                <TableCell align="right">{row.clientname}</TableCell>
                <TableCell align="right">{row.responseTime}</TableCell>
                <TableCell align="right">{row.remark}</TableCell>
                <TableCell align="right">{row.lastWorkingDate}</TableCell>
                <TableCell align="right">{row.lastWorkingDaysLeft}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[3, 5, 10, 25]}
          component="div"
          count={filteredRows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </div>
  );
}
