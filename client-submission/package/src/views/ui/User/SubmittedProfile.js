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
import { useNavigate } from 'react-router-dom';

function createData(sid, cid, name, experience, skill, status, clientname, remark, responseTime, lastWorkingDay) {
  return { sid, cid, name, experience, skill, status, clientname, remark, responseTime, lastWorkingDay };
}

export default function MyComponent() {
  const [selectedColumn, setSelectedColumn] = React.useState('name');
  const [searchTerm, setSearchTerm] = React.useState('');
  const [daysLeft, setDaysLeft] = React.useState('10'); // Default value set to 5
  const [responseTimeLimit, setResponseTimeLimit] = React.useState('');
  const [sortOrder, setSortOrder] = React.useState('asc');
  const [rows, setRows] = React.useState([]);
  const navigate = useNavigate();

  React.useEffect(() => {
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
        let clients_data = await axios.get('http://localhost:8092/api/admin/clients',{headers});
        let userObj = await axios.get(`http://localhost:8092/api/user/users`, { headers });
        let username = localStorage.getItem("username");
        let user = userObj.data.find((item) => item.userName === username);
    let clientData="";
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
    let listofcandidates=[];
    val.map(item=>{
      console.log(item);
      let user_data=item.users;
      console.log(user_data);
      if(user_data.userId===user.userId)
        listofcandidates.push(item);
    })

        const candidates = listofcandidates.map(item => {
          let skill = item.candidate.skills && Array.isArray(item.candidate.skills) ? item.candidate.skills.map(skill => skill.skill).join(', ') : ' ';
          let clientname = item.client.clientName || 'N/A';
          let responseTime = item.client.clientResponseTimeinDays || 'N/A';
          let lastWorkingDay = item.candidate.last_working_day || 'N/A';

          // Convert last working day timestamp to number of days from today
          if (lastWorkingDay !== 'N/A') {
            const lastWorkingDate = new Date(lastWorkingDay);
            const currentDate = new Date();
            const diffTime = Math.abs(currentDate - lastWorkingDate);
            lastWorkingDay = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
          }
          console.log(listofcandidates.length);

          // listofcandidates.forEach(async (submission)=>{
          //   let history= await axios.get(`http://localhost:8092/api/submissions/${submission.submissionId}/history`,{headers});
          //   //let latest_history=history.data;
          //   //console.log(history.data.length);
          //   // let latest_history=history.data[history.data.length-1];
          //   //console.log(history.data[history.data.length-1]);
          //   let latest_history=history.data[history.data.length-1];
          //   responseTime=new Date(latest_history[6]).toLocaleString();
          //   // console.log(latest_history);
          // });
          

          return createData(
            item.submissionId,
            item.candidate.candidateId,
            item.candidate.candidateName,
            item.candidate.experience,
            skill,
            item.candidate.candidateStatus,
            clientname,
            item.remark || 'N/A',
            responseTime,
            lastWorkingDay
          );
        });
        setRows(candidates);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [navigate]);

  const handleColumnChange = (event) => {
    const selectedValue = event.target.value.toLowerCase();
    setSelectedColumn(selectedValue);
    handleSort(selectedValue);
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

  const filteredRows = rows.map(row => {
    const lessThanDaysLeft = daysLeft !== '' && row.lastWorkingDay !== 'N/A' && row.lastWorkingDay <= parseInt(daysLeft);
    const lessThanResponseTime = responseTimeLimit !== '' && row.responseTime !== 'N/A' && parseInt(row.responseTime) <= parseInt(responseTimeLimit);
    return { ...row, lessThanDaysLeft, lessThanResponseTime };
  });

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
              <TableCell align="right"><b>Skill</b></TableCell>
              <TableCell align="right"><b>Status</b></TableCell>
              <TableCell align="right"><b>ClientName</b></TableCell>
              <TableCell align="right">
                <span
                  className={`th sortable-header ${sortOrder === 'asc' ? 'sort-asc' : 'sort-desc'}`}
                >
                  <b>Response Time</b>
                  <span onClick={() => handleSort('responseTime')} style={{ cursor: "pointer" }}>
                    {sortOrder === 'asc' ? ' ↑' : ' ↓'}
                  </span>
                </span>
              </TableCell>
              <TableCell align="right"><b>Remark</b></TableCell>
              <TableCell align="right"><b>Last Working Day</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredRows.map((row) => (
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
                <TableCell align="right">{row.skill}</TableCell>
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
    </div>
  );
}








