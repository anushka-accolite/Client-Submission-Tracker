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
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import '../../css/submittedprofile.css';
import { Modal } from '@mui/material';
import { Box, Typography } from '@material-ui/core';

function createData(sid, cid, name, experience, status, clientname, remark, responseTime, lastWorkingDate, lastWorkingDaysLeft) {
  return { sid, cid, name, experience, status, clientname, remark, responseTime, lastWorkingDate, lastWorkingDaysLeft };
}

export default function MyComponent() {
  const [selectedColumn, setSelectedColumn] = useState('name');
  const [searchTerm, setSearchTerm] = useState('');
  const [daysLeft, setDaysLeft] = useState('10');
  const [responseTimeLimit, setResponseTimeLimit] = useState('3');
  const [sortOrder, setSortOrder] = useState('asc');
  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [open, setOpen] = useState(false);
  const [selectedRemark, setSelectedRemark] = useState('');
  const [loading, setLoading] = useState(true);
  const [open2, setOpen2] = useState(false);
  const navigate = useNavigate();

  const truncateRemark = (remark) => {
    const words = remark.split(' ');
    if (words.length > 2) {
      return words.slice(0, 2).join(' ') + '...';
    }
    return remark;
  };

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
        let users_array=clientData.users;
        console.log(users_array);
        if (!clientData) {
          console.error('No matching client found for the user');
          return;
        }
        let listofcandidates = [];
        val.map(item => {
          console.log(item);
          let user_data = item.users;
          console.log(user_data);
          users_array.map((user_data_from_array)=>{
            if(user_data.userId===user_data_from_array.userId)
            {
              listofcandidates.push(item);
            }
          })
        })
        let timestampDifference = 'N/A';
        let latestSubmissions = [];
        console.log(listofcandidates);

        const submissionPromises = listofcandidates.map(async (submission) => {
          try {
            const response = await axios.get(`http://localhost:8092/api/submissions/${submission.submissionId}/history`, { headers });
            const history = response.data;
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
            console.log(latestSubmissions);
            //correct code
            const candidates = listofcandidates.map((item, index) => {
              console.log(item);
              let clientname = item.client.clientName || 'N/A';
              const latestSubmission = latestSubmissions[index];
              let lastWorkingDaysLeft = 'N/A';
              if (item.candidate.last_working_day && item.candidate.last_working_day !== 'N/A') {
                const lastWorkingDate = new Date(item.candidate.last_working_day);
                const currentDate = new Date();
                const diffTime = lastWorkingDate - currentDate;
                lastWorkingDaysLeft = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
              }
              console.log(item.client.clientResponseTimeinDays);
              let responseTime="N/A";  
              responseTime=item.client.clientResponseTimeinDays;
              //console.log(responseTime);
              let lastWorkingDate = 'N/A';
              if (lastWorkingDaysLeft !== 'N/A') {
                lastWorkingDate = item.candidate.last_working_day;
              }
              return createData(
                item.submissionId,
                item.candidate.candidateId,
                item.candidate.candidateName,
                item.candidate.experience,
                item.status,
                clientname,
                item.remark || 'N/A',
                responseTime,
                lastWorkingDate !== 'N/A' ? new Date(lastWorkingDate).toLocaleDateString() : 'N/A',
                lastWorkingDaysLeft
              );
            });

            setRows(candidates);
          });

      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false); // Stop loading after data is fetched
      }
    };
    fetchData();
  }, [navigate]);

  const modalStyle2 = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const handleOpen2 = () => setOpen2(true);
  const handleClose2 = () => setOpen2(false);


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

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
        return aValue < bValue ? -1 : 1;
      }
    });
    setRows(sortedRows);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const handleClickOpen = (remark) => {
    setSelectedRemark(remark);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const filteredRows = rows.filter(row => {
    const searchValue = searchTerm.toLowerCase();
    switch (selectedColumn) {
      case 'Name':
        return row.name.toLowerCase().includes(searchValue);
      case 'Experience':
        return row.experience.toString().toLowerCase().includes(searchValue);
      case 'Status':
        return row.status.toLowerCase().includes(searchValue);
      case 'ClientName':
        return row.clientname.toLowerCase().includes(searchValue);
      case 'Remark':
        return row.remark.toLowerCase().includes(searchValue);
      case 'ResponseTime':
        return row.responseTime.toString().toLowerCase().includes(searchValue);
      default:
        return true;
    }
  }).map(row => {
    const lessThanDaysLeft = daysLeft !== '' && row.lastWorkingDate !== 'N/A' && parseInt(row.lastWorkingDaysLeft) <= parseInt(daysLeft);
    const lessThanResponseTime = responseTimeLimit !== '' && row.responseTime !== 'N/A' && parseInt(row.responseTime) <= parseInt(responseTimeLimit);
    return { ...row, lessThanDaysLeft, lessThanResponseTime };
  });

  const startIndex = page * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;

  const paginatedRows = filteredRows.slice(startIndex, endIndex);

  return (
    <div style={{ marginTop: "20px" }}>
      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <CircularProgress />
        </div>
      ) : (
        <>
        <div style={{marginBottom:"30px",marginLeft:"10px"}}>
        <Button variant="contained" color="primary" onClick={handleOpen2}>
        Color Information
       </Button>
       </div>
          <FormControl sx={{ m: 1, minWidth: 120 }} style={{ marginTop: "0.2px" }}>
            <InputLabel id="column-label">Column</InputLabel>
            <Select
              labelId="column-label"
              id="column-select"
              size='small'
              value={selectedColumn.charAt(0).toUpperCase() + selectedColumn.slice(1)}
              label="Select Column"
              onChange={handleColumnChange}
            >
              <MenuItem value="Name">Name</MenuItem>
              {/* <MenuItem value="Experience">Experience</MenuItem> */}
              <MenuItem value="Status">Status</MenuItem>
              <MenuItem value="ClientName">ClientName</MenuItem>
              {/* <MenuItem value="Remark">Remark</MenuItem> */}
              {/* <MenuItem value="ResponseTime">Response Time</MenuItem> */}
            </Select>
          </FormControl>
          <TextField
            id="search"
            label="Search"
            variant="outlined"
            size='small'
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
            size='small'
            type="number"
            value={daysLeft}
            onChange={handleDaysFilterChange}
            style={{ marginLeft: "10px" }}
          />
          <TextField
            id="responseTimeLimit"
            label="Response Time Limit"
            variant="outlined"
            size='small'
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
                  <TableCell align='right'><b>Last Working Date</b></TableCell>
                  <TableCell align='right'><b>Days Left</b></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedRows.map((row) => (
                  <TableRow
                    key={row.sid}
                    // sx={{ '&:last-child td, &:last-child th': { border: 0 }, backgroundColor: row.lessThanDaysLeft ? 'lightcoral' : row.lessThanResponseTime ? 'yellow' : 'inherit' }}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 }, backgroundColor: row.lessThanDaysLeft && row.lessThanResponseTime?'red':row.lessThanDaysLeft?'orange':row.lessThanResponseTime?'greenyellow':'' }}
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
                    <TableCell align="right" style={{ cursor: "pointer", color: "blue" }} onClick={() => handleClickOpen(row.remark)}>
                        {truncateRemark(row.remark)}
                    </TableCell>
                    <TableCell align='right'>{row.lastWorkingDate}</TableCell>
                    <TableCell>{row.lastWorkingDaysLeft <= 0 ? 'Consider for Bench Offer' : row.lastWorkingDaysLeft}</TableCell>
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
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>
              Remark
              <Button onClick={handleClose} style={{ float: 'right' }}>X</Button>
            </DialogTitle>
            <DialogContent>
              <DialogContentText>
                {selectedRemark}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Close</Button>
            </DialogActions>
          </Dialog>
        </>
      )}
       <Modal
        open={open2}
        onClose={handleClose2}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle2}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            <b>Information :</b>
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          <b style={{fontSize:"20px",color:"greenyellow"}}>Green Yellow</b> - This color represents that number of days left is less than the specified response time.<br></br>
          <b style={{fontSize:"20px",color:"orange"}}>Orange</b> - This color represents that number of days left is less than the specified last working days left.<br></br>
          <b style={{fontSize:"20px",color:"red"}}>Red</b> - This color represents that number of days left is less than both specified response time and last working days left.
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}