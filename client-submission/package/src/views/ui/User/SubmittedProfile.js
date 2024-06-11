import React, { useEffect, useState } from 'react';
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
import '../../css/submittedprofile.css';
import TablePagination from '@mui/material/TablePagination';

function createData(sid, cid, name, experience, status, clientname, remark, responseTime, lastWorkingDay) {
  return { sid, cid, name, experience, status, clientname, remark, responseTime, lastWorkingDay };
}

export default function MyComponent() {
  const [selectedColumn, setSelectedColumn] = React.useState('name');
  const [searchTerm, setSearchTerm] = React.useState('');
  const [daysLeft, setDaysLeft] = React.useState('10'); // Default value set to 5
  const [responseTimeLimit, setResponseTimeLimit] = React.useState('3');
  const [sortOrder, setSortOrder] = React.useState('asc');
  const [rows, setRows] = React.useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const navigate = useNavigate();

  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role !== "user") {
      navigate("/loginform");
    }
    const fetchData = async () => {
      try {
        let token = localStorage.getItem("token");
        let headers = { "Authorization": `Bearer ${token}` };
        let response = await axios.get('http://localhost:8092/api/submissions/getAll', { headers });
        let val = response.data;
        let clients_data = await axios.get('http://localhost:8092/api/admin/clients', { headers });
        let userObj = await axios.get(`http://localhost:8092/api/user/users`, { headers });
        let username = localStorage.getItem("username");
        let user = userObj.data.find((item) => item.userName === username);
        let clientData = "";
        clients_data.data.forEach(client => {
          client.users.forEach(item => {
            if (item.userId === user.userId) {
              clientData = client;
            }
          });
        });
        console.log(clientData);
        if (!clientData) {
          console.error('No matching client found for the user');
          return;
        }
        let listofcandidates = [];
        val.map(item => {

          console.log(item);
          let user_data = item.users;
          console.log(user_data);
          if (user_data.userId === user.userId)
            listofcandidates.push(item);
        })
        let timestampDifference = 'N/A';
        let latestSubmissions = [];
        console.log(listofcandidates);

        const submissionPromises = listofcandidates.map(async (submission) => {
          try {
            const response = await axios.get(`http://localhost:8092/api/submissions/${submission.submissionId}/history`, { headers });
            const history = response.data;

            // Log the history for debugging
            console.log(`Submission ID: ${submission.submissionId}, History:`, history);

            if (history.length > 0) {
              console.log(history[history.length - 1]);
              return history[history.length - 1]; // Return the latest history
            } else {
              console.log(`No history found for submission ID: ${submission.submissionId}`);
              return null;
            }
          } catch (error) {
            console.error(`Error fetching history for submission ID: ${submission.submissionId}`, error);
            return null;
          }

        });


        Promise.all(submissionPromises)
          .then((latestSubmissions) => {
            console.log(latestSubmissions); // This will now contain all the latest submissions

            const candidates = listofcandidates.map((item, index) => {
              let clientname = item.client.clientName || 'N/A';

              // Access the corresponding latest submission
              const latestSubmission = latestSubmissions[index];
              console.log(item.candidate.last_working_day);
              console.log(index);
              console.log(latestSubmission); // Log the latest submission for debugging
              let lastWorkingDay = 'N/A';
              if (item.candidate.last_working_day && item.candidate.last_working_day !== 'N/A') {
                const lastWorkingDate = item.candidate.last_working_day;
                const currentDate = new Date();
                const diffTime = Math.abs(currentDate - lastWorkingDate);
                lastWorkingDay = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
              }
              let responseTime = 'N/A';
              if (latestSubmission) {
                const submissionDate = new Date(latestSubmission[6]).setHours(0, 0, 0, 0); // Set submission time to start of day
                const currentDate = new Date();
                const today = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()); // Get today's date without time
                const diffTime = Math.abs(today - submissionDate);
                const timestampDifference = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // Difference in days
                responseTime = timestampDifference === 0 ? item.client.clientResponseTimeinDays : timestampDifference;
              }
              lastWorkingDay = item.candidate.last_working_day || 'N/A';
              // // Convert last working day timestamp to number of days from today
              if (lastWorkingDay !== 'N/A') {
                const lastWorkingDate = lastWorkingDay
                const diffTime = Math.abs(new Date() - lastWorkingDate);
                lastWorkingDay = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
              }
              // console.log(skill);

              return createData(
                item.submissionId,
                item.candidate.candidateId,
                item.candidate.candidateName,
                item.candidate.experience,
                // skill,
                item.candidate.candidateStatus,
                clientname,
                item.remark || 'N/A',
                responseTime,
                lastWorkingDay
              );
            });
            setRows(candidates);
          });

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [navigate]);

  const handleColumnChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedColumn(selectedValue);
    if (selectedValue === 'Candidate Id') {
      const sortedRows = [...rows].sort((a, b) => (sortOrder === 'asc' ? a.id - b.id : b.id - a.id));
      setRows(sortedRows);
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    }
  };

  const handleClearSearch = () => {
    setSearchTerm('');
  };

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleDaysFilterChange = (event) => {
    setDaysLeft(event.target.value);
  };

  const handleResponseTimeChange = (event) => {
    setResponseTimeLimit(event.target.value);
  };

  const handleSort = (column) => {
    const sortedRows = [...rows].sort((a, b) => {
      let aValue = a[column];
      let bValue = b[column];
      if (typeof aValue === 'string') aValue = aValue.toLowerCase();
      if (typeof bValue === 'string') bValue = bValue.toLowerCase();
      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });
    setRows(sortedRows);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filteredRows = rows.filter(row => {
    return row.name.toLowerCase().includes(searchTerm.toLowerCase());
  }).map(row => {
    const lessThanDaysLeft = daysLeft !== '' && row.lastWorkingDay !== 'N/A' && row.lastWorkingDay <= parseInt(daysLeft);
    const lessThanResponseTime = responseTimeLimit !== '' && row.responseTime !== 'N/A' && parseInt(row.responseTime) <= parseInt(responseTimeLimit);
    return { ...row, lessThanDaysLeft, lessThanResponseTime };
  });

  const paginatedRows = filteredRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 120 }} style={{ marginTop: "0.2px" }}>
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
        <button onClick={handleClearSearch} className="clear-search-btn">Clear</button>
      )}
      <TextField
        id="daysLeft"
        label="Days Left for Last Working Day"
        variant="outlined"
        type="number"
        value={daysLeft}
        onChange={handleDaysFilterChange}
        style={{ marginLeft: "10px" }}
      />
      <TextField
        id="responseTimeLimit"
        label="Response Time Limit"
        variant="outlined"
        type="number"
        value={responseTimeLimit}
        onChange={handleResponseTimeChange}
        style={{ marginLeft: "10px" }}
      />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell align='right'><b>Submission Id</b></TableCell>
              <TableCell><b>Candidate Id</b></TableCell>
              <TableCell align="right"><b>Name</b></TableCell>
              <TableCell align="right"><b>Experience</b></TableCell>
              {/* <TableCell align="right"><b>Skill</b></TableCell> */}
              <TableCell align="right"><b>Status</b></TableCell>
              <TableCell align="right"><b>ClientName</b></TableCell>
              <TableCell align="right">
                <span
                  className={`th sortable-header ${sortOrder === 'asc' ? 'sort-asc' : 'sort-desc'}`}
                >
                  <b>Response Time</b>
                  <span onClick={() => handleSort('responseTime')} style={{ cursor: "pointer" }}>
                    {sortOrder === 'asc' ? '🔼' : '🔽'}
                  </span>
                </span>
              </TableCell>
              <TableCell align="right"><b>Remark</b></TableCell>
              <TableCell align="right"><b>Last Working Day</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedRows.map((row) => (
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
                {/* <TableCell align="right">{row.skill}</TableCell> */}
                <TableCell align="right">{row.status}</TableCell>
                <TableCell align="right">{row.clientname}</TableCell>
                <TableCell align="right">{row.responseTime}</TableCell>
                <TableCell align="right">{row.remark}</TableCell>
                <TableCell align="right">{row.lastWorkingDay}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filteredRows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
}






