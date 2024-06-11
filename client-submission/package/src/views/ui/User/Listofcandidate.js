import React, { useState, useEffect, useRef } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, TextField, MenuItem, Button, Modal, Box, TablePagination
} from '@mui/material';
import Chart from 'chart.js/auto';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../css/listofcandidate.css';

function createData(id, name, email, experience, skill, status, IsEmployee, daysToLWD, remark) {
  return { id, name, email, experience, skill, status, IsEmployee, daysToLWD, remark };
}


const statusOptions = ['Selected', 'Rejected', 'Pending', 'OnHold', 'InterviewScheduled'];
const skillsOptions = ['Angular', 'React', 'Java', 'Python', 'Spring', 'JavaScript'];

const columns = [
  { id: 'id', label: 'Candidate Id' },
  { id: 'name', label: 'Candidate Name' },
  { id: 'email', label: 'Email' },
  { id: 'experience', label: 'Exp (years)' },
  { id: 'skill', label: 'Skill' },
  { id: 'status', label: 'Status' },
  { id: 'remark', label: 'Remark' },
  { id: 'IsEmployee', label: 'IsEmployee' },
  { id: 'daysToLWD', label: 'Days to LWD' },
  { id: 'delete', label: 'Delete' },
  { id: 'add', label: 'Add' },
];

function createDataInd(status, color) {
  return { status, color };
}

const rowsInd = [
  createDataInd('Selected', 'Green'),
  createDataInd('Rejected', 'Red'),
  createDataInd('Pending', 'Yellow'),
  createDataInd('OnHold', 'Orange'),
  createDataInd('InterviewScheduled', 'Pink')
];

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 450,
  maxHeight: 550,
  bgcolor: 'background.paper',
  boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.5)',
  p: 4,
  overflowY: 'auto',
};

export default function Listofcandidate() {
  const [rows, setRows] = useState([]);
  const [sortOrder, setSortOrder] = useState('asc');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedColumn, setSelectedColumn] = useState('');
  const [open, setOpen] = useState(false);
  const [newCandidate, setNewCandidate] = useState({});
  const pieChartRef = useRef(null);
  const chartInstance = useRef(null);
  const navigate = useNavigate();
  const [selectedRow, setSelectedRow] = useState();
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [uploadError, setUploadError] = useState(false);
  const [remark, setRemark] = useState("");
  const [remarkModalOpen, setRemarkModalOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  let response = "";


  useEffect(() => {
    const role = localStorage.getItem("role")
    if (role !== "user") {
      navigate("/loginform");
    }
    localStorage.setItem("remark", "");

    const fetchCandidates = async () => {
      try {
        let token = localStorage.getItem("token");
        let headers = { "Authorization": `Bearer ${token}` };
        response = await axios.get('http://localhost:8092/api/candidates/getAll', { headers });

        console.log('Candidates API Response:', response.data);

        if (!Array.isArray(response.data)) {
          throw new Error('API response is not an array');
        }

        const candidateData = response.data;
        console.log("look->", candidateData)
        const candidatesWithSkills = await Promise.all(
          candidateData
            .filter(data => data.isDeleted === false)
            .map(async (item) => {
              const skillsResponse = await axios.get(`http://localhost:8092/api/candidates/${item.candidateId}/skills`, { headers });

              console.log(`Skills API Response for candidate ${item.candidateId}:`, skillsResponse.data);

              const processedSkills = skillsResponse.data.map(skill => {
                if (skill.endsWith('=')) {
                  return skill.slice(0, -1);
                }
                return skill;
              });
              const skillsString = processedSkills.join(', ');

              const daysToLWD = item.last_working_day ? Math.ceil((new Date(item.last_working_day) - new Date()) / (1000 * 60 * 60 * 24)) : null;
              return createData(
                item.candidateId,
                item.candidateName,
                item.candidateEmail,
                item.experience,
                skillsString,
                item.candidateStatus,
                item.isAccoliteEmployee,
                daysToLWD,
                remark
              );
            })
        );
        console.log(candidatesWithSkills)
        setRows(candidatesWithSkills);
      } catch (error) {
        console.error('Error fetching candidates or skills:', error);
      }
    };
    fetchCandidates();
  }, []);

  const handleSort = () => {
    const newRows = [...rows];
    newRows.sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.daysToLWD - b.daysToLWD;
      } else {
        return b.daysToLWD - a.daysToLWD;
      }
    });
    setRows(newRows);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };
  const handleClearSearch = () => {
    setSearchTerm('');
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleColumnChange = (e) => {
    setSelectedColumn(e.target.value);
  };
  const handleFileChange = (e) => {
    console.log('File selected:', e.target.files[0]);
    setSelectedFile(e.target.files[0]);
    console.log(selectedFile);
    setUploadSuccess(false);
    setUploadError(false);
  };

  const handleUpload = async () => {
    try {
      let token = localStorage.getItem("token");
      if (!selectedFile) {
        console.error('No file selected');
        return;
      }

      const formData = new FormData();
      formData.append('file', selectedFile);

      const response = await axios.post('http://localhost:8092/api/candidates/product/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      });

      console.log('Upload Response:', response.data);
      setUploadSuccess(true);
    } catch (error) {
      console.error('Error uploading file:', error);
      setUploadError(true);
    }
    setTimeout(() => {
      window.location.reload();
    }, 3000);
  };
  const handleDelete = async (id) => {
    try {
      let token = localStorage.getItem("token");
      let headers = { "Authorization": `Bearer ${token}`, };
      let x = await axios.get(`http://localhost:8092/api/candidates/${id}`, { headers });
      console.log("Deleted id", x.data);
      x.data.isDeleted = true;
      const val = x.data;

      await axios.put(`http://localhost:8092/api/candidates/${id}`, val, { headers });

      toast.success("Deleted successfully");
      const timeoutId = setTimeout(() => {
        navigate(0);
      }
        , 8000);

    } catch (error) {
      toast.error("Error deleting candidate");
      console.error('Error deleting candidate:', error);
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      let token = localStorage.getItem("token");
      let headers = { "Authorization": `Bearer ${token}`, 'Content-Type': 'application/json' };
      let response = await axios.get(`http://localhost:8092/api/candidates/${id}`, { headers });
      let updatedCandidate = response.data;
      updatedCandidate.candidateStatus = status;
      await axios.put(`http://localhost:8092/api/candidates/${id}`, updatedCandidate, { headers });
      const updatedRows = rows.map(row => {
        if (row.id === id) {
          return { ...row, status };
        }
        return row;
      });
      setRows(updatedRows);
    } catch (error) {
      console.error('Error updating candidate status:', error);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Selected':
        return 'green';
      case 'Rejected':
        return 'red';
      case 'Pending':
        return 'yellow';
      case 'OnHold':
        return 'orange';
      case 'InterviewScheduled':
        return 'pink';
      default:
        return 'inherit';
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewCandidate(prevState => ({ ...prevState, [name]: value }));
  };


  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const displayRows = rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const filteredRows = rows.filter((row) =>
    selectedColumn && searchTerm
      ? row[selectedColumn] && row[selectedColumn].toString().toLowerCase().includes(searchTerm.toLowerCase())
      : !row.isDeleted
  );

  const handleAdd = async (id) => {
    try {
      let token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found");
      }

      let headers = { "Authorization": `Bearer ${token}` };

      // Fetch candidate data
      let response = await axios.get(`http://localhost:8092/api/candidates/${id}`, { headers });
      let candidateToAdd = response.data;
      candidateToAdd.isDeleted = false;
      console.log(candidateToAdd);
      // Fetch user data
      let userObj = await axios.get(`http://localhost:8092/api/user/users`, { headers });
      let username = localStorage.getItem("username");
      let user = userObj.data.find((item) => item.userName === username);
      if (!user) {
        throw new Error("User not found");
      }

      let clientObj1 = await axios.get('http://localhost:8092/api/admin/clients', { headers });
      let clientData = "";
      clientObj1.data.forEach(client => {
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

      const submissionData = {
        users: user ? {
          userId: user.userId,
          userName: user.userName,
          userRole: user.userRole,
          email: user.email,
          loginUserPassword: user.loginUserPassword,
          isDeleted: user.isDeleted,
        } : null,
        client: clientData ? {
          clientId: clientData.clientId,
          clientName: clientData.clientName,
          clientResponseTimeinDays: clientData.clientResponseTimeinDays,
          clientRequirement: clientData.clientRequirement,
          skills: clientData.skills,
          isDeleted: clientData.isDeleted,
        } : null,
        candidate: candidateToAdd ? {
          candidateId: candidateToAdd.candidateId,
          candidateName: candidateToAdd.candidateName,
          candidateEmail: candidateToAdd.candidateEmail,
          candidateStatus: candidateToAdd.candidateStatus,
          last_working_day: candidateToAdd.last_working_day,
          isAccoliteEmployee: candidateToAdd.isAccoliteEmployee,
          experience: candidateToAdd.experience,
          isDeleted: candidateToAdd.isDeleted,
          skills: candidateToAdd.skills ? candidateToAdd.skills || [] : null,
        } : null,
        submissionDate: new Date().getTime(),
        status: candidateToAdd.candidateStatus,
        remark: localStorage.getItem("remark"),
        isDeleted: false,
      };
      console.log(clientObj1.data);
      console.log(headers);
      console.log(submissionData);
      if (!(candidateToAdd.clients.some(candidateClient => candidateClient.clientId === clientData.clientId))) {
        console.log("Hello");
        await axios.post('http://localhost:8092/api/submissions', submissionData, { headers });
        toast.success("Candidate Added Successfully");
        let client_candidate = await axios.post(`http://localhost:8092/api/candidate-client/link?candidateId=${candidateToAdd.candidateId}&clientId=${clientData.clientId}`, {}, { headers });
        console.log("client_candidate", client_candidate);
        return;

      }
      try {
        var existingSubmissionResponse = await axios.get(`http://localhost:8092/api/submissions/candidate/${candidateToAdd.candidateId}`, { headers });

      // Submission found, parse the response data
        var existingSubmission = existingSubmissionResponse.data;
        console.log(existingSubmission);
      } catch (error) {
        if (error.response && error.response.status === 404) {
        // No submission found for the candidate
          var existingSubmission = false;
          console.log(existingSubmission);
        } else {
          console.error('Error:', error);
        }
      }

      console.log(submissionData);
      console.log("existingSubmission", existingSubmission);
      let flag = 0;
      if (existingSubmission) {

        console.log("bas update")
        submissionData.status = candidateToAdd.candidateStatus;
        let response = await axios.put(`http://localhost:8092/api/candidates/${candidateToAdd.candidateId}`, {
          candidateId: candidateToAdd.candidateId,
          candidateName: candidateToAdd.candidateName,
          candidateEmail: candidateToAdd.candidateEmail,
          candidateStatus: candidateToAdd.candidateStatus,
          last_working_day: candidateToAdd.last_working_day,
          isAccoliteEmployee: candidateToAdd.isAccoliteEmployee,
          experience: candidateToAdd.experience,
          isDeleted: candidateToAdd.isDeleted,
          skills: candidateToAdd.skills ? candidateToAdd.skills || [] : null,
        }, { headers });
        console.log(response.data);
        console.log("Status ....", submissionData.status);
        console.log(candidateToAdd.candidateId)
        let sid = await axios.get(`http://localhost:8092/api/submissions/candidate/${candidateToAdd.candidateId}`, { headers });
        console.log("sid", sid.data);
        sid = sid.data[sid.data.length - 1];

        let subObj = await axios.get(`http://localhost:8092/api/submissions/${sid}`, { headers });
        subObj = subObj.data;
        subObj.status = candidateToAdd.candidateStatus;
        subObj.remark = localStorage.getItem("remark");
        console.log("deleted", subObj.isDeleted);
        console.log("sid", sid);

        console.log(localStorage.getItem("remark"));
        const response1 = await axios.put(`http://localhost:8092/api/submissions/${sid}`, {
          status: subObj.status,
          submissionDate: subObj.submissionDate,
          isDeleted: subObj.isDeleted,
          ...subObj
        }, { headers });
        toast.success("Candidate submission updated successfully!");
      } else {
        console.log("first time")
        await axios.post('http://localhost:8092/api/submissions', submissionData, { headers });
        toast.success("Candidate added successfully!");
      }

      setSelectedRow(id);
      // toast.success("Candidate added successfully!");

    } catch (error) {
      console.error('Error adding candidate:', error);
      toast.error('Error adding candidate');
    }
  };


  const generateChartData = () => {
    const data = {};
    statusOptions.forEach(status => {
      data[status] = rows.filter(row => row.status === status).length;
    });
    return data;
  };

  const renderPieChart = () => {
    const chartData = generateChartData();
    const ctx = pieChartRef.current.getContext('2d');
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }
    chartInstance.current = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: statusOptions,
        datasets: [{
          label: 'Candidates',
          data: statusOptions.map(status => chartData[status]),
          backgroundColor: statusOptions.map(status => getStatusColor(status)),
          borderColor: 'transparent'
        }]
      },
      options: {
        plugins: {
          title: {
            display: true,
            text: 'Status of Candidates'
          },
          legend: {
            display: false
          },
          tooltips: {
            callbacks: {
              label: (tooltipItem, data) => {
                const dataset = data.datasets[tooltipItem.datasetIndex];
                const total = dataset.data.reduce((acc, value) => acc + value, 0);
                const value = dataset.data[tooltipItem.index];
                const percentage = ((value / total) * 100).toFixed(2);
                return `${data.labels[tooltipItem.index]}: ${percentage}%`;
              }
            }
          }
        }
      }
    });
  };

  useEffect(() => {
    renderPieChart();
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [rows]);

  const handleOpenModal = () => {
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCandidate((prev) => ({
      ...prev,
      [name]: value,
    }));
    console.log(newCandidate);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log(newCandidate.id);
    let skill_set = newCandidate.skill;
    const candidate = {
      candidateName: newCandidate.name,
      candidateEmail: newCandidate.email,
      candidateStatus: newCandidate.status,
      last_working_day: newCandidate.daysToLWD,
      isAccoliteEmployee: newCandidate.IsEmployee,
      experience: newCandidate.experience,
      isDeleted: false,
      skills: newCandidate.skill
    }
    try {
      let token = localStorage.getItem("token");
      let headers = { "Authorization": `Bearer ${token}` }
      console.log(candidate);
      skill_set = skill_set.map((skill) => skill);
      console.log(skill_set);
      let createCandidate = await axios.post('http://localhost:8092/api/candidates', candidate, { headers });
      console.log(createCandidate);

      console.log(skill_set);
      console.log(candidate.skills);
      candidate.skills.map(async (skills) => {
        console.log(skills);
        let candidateSkill = await axios.post(`http://localhost:8092/api/candidates/${createCandidate.data.candidateId}/skills`, skills, { headers });
        console.log(candidateSkill);
        console.log(skills);
        setTimeout(() => {
          window.location.reload();
        }, 3000);

      })
    }
    catch (error) {
      console.log(error);
    }
    setNewCandidate({});
  }

  const handleOpenRemarkModal = (candidate) => {
    setRemarkModalOpen(true);
  };

  const handleCloseRemarkModal = () => {
    setRemarkModalOpen(false);
  };
  const handleRemark = () => {
    toast.success("Remark updated successfully", { autoClose: 2000 });
    console.log(remark);
  }
  return (
    <>
      <ToastContainer />
      <div id='uppercon'>
        <TextField
          select className="search"
          label="Select Column"
          value={selectedColumn}
          onChange={handleColumnChange}
          variant="outlined"
          size="small"
        >
          {columns.map((column) => (
          // Filter out specific fields
            (column.label !== 'Days to LWD' && column.label !== 'Delete' && column.label !== 'Add') && (
              <MenuItem key={column.id} value={column.id}>
                {column.label}
              </MenuItem>
            )
          ))}
        </TextField>
        <TextField
          label="Search"
          value={searchTerm}
          onChange={handleSearchChange}
          variant="outlined"
          size="small"
          className='searchip'
          style={{ marginLeft: "20px" }}
        />
        {searchTerm && (
          <button onClick={handleClearSearch} className="clear-search-btn">Clear</button>
        )}
        <Button onClick={handleOpenModal} variant="contained" color="primary" style={{ marginLeft: '500px' }}>
          Add Candidate
        </Button>
        <div className='upload_data'>
          <input type="file" accept=".xlsx, .xls" onChange={handleFileChange} />
          <button className='upload_button' onClick={handleUpload}>Upload</button>
          {uploadSuccess && <div style={{ color: 'green' }}>File uploaded successfully!</div>}
          {uploadError && <div style={{ color: 'red' }}>Error uploading file. Please try again later.</div>}
        </div>
        <TableContainer component={Paper} style={{ maxWidth: "50vw !important", marginTop: "15px" }}>
          <Table sx={{ maxWidth: "10px" }} aria-label="simple table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell key={column.id}>
                    <b>{column.label}</b>
                    {column.id === 'daysToLWD' && (
                      <button onClick={handleSort} className='bg-primary text-white'>
                        {sortOrder === 'asc' ? '↓' : '↑'}
                      </button>
                    )}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                <TableRow key={row.id} className='tablerow'>
                  {columns.map((column) => (
                    <TableCell key={column.id}>
                      {column.id === 'daysToLWD' ? (
                        <span>{row[column.id] !== null ? `${row[column.id]} days` : 'N/A'}</span>

                      ) : column.id === 'status' ? (
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          <TextField className='dropdown'
                            select
                            value={row.status}
                            onChange={(e) => handleStatusChange(row.id, e.target.value)}
                            variant="outlined"
                            size="small"
                            style={{ color: getStatusColor(row?.status) }}
                          >
                            {statusOptions.map((option) => (
                              <MenuItem key={option} value={option}>
                                {option}
                              </MenuItem>
                            ))}
                          </TextField>
                          <div
                            className={`status-dot ${row.status.toLowerCase()}`}
                            style={{ marginLeft: '5px' }}
                          />
                        </div>
                      ) : column.id === 'remark' ? (
                        <Button id="remarkbtn" onClick={() => handleOpenRemarkModal(row)}>Add remark</Button>
                      ) : column.id === 'delete' ? (
                        <Button id="delbtn" onClick={() => handleDelete(row.id)}>Delete</Button>
                      ) : column.id === 'add' ? (
                        <Button disabled={selectedRow === row.id} id="addbtn" onClick={() => handleAdd(row.id)}>Add</Button>
                      ) : (
                        row[column.id]
                      )}

                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination rowsPerPageOptions={[5, 10, 25]} component="div" count={rows.length} rowsPerPage={rowsPerPage} page={page} onPageChange={handlePageChange} onRowsPerPageChange={handleRowsPerPageChange} />
      </div>
      <div className="bottom-table">
        <div style={{ display: 'flex' }}>
          <div style={{ width: '50%' }}>
            <div style={{ marginLeft: "50px", width: "375px", height: "375px" }}>
              <canvas ref={pieChartRef}></canvas>
            </div>
          </div>
          <div style={{ width: '50%' }}>
            <TableContainer component={Paper} style={{ marginTop: "15px" }}>
              <Table sx={{ maxWidth: '80vw' }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell><b>Status</b></TableCell>
                    <TableCell><b>Color</b></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rowsInd.map((r) => (
                    <TableRow
                      key={r.status}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {r.status}
                      </TableCell>
                      <TableCell align="left"> {r.color}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
      </div>
      <Modal
        open={open}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <h2>Add New Candidate</h2>
          <form onSubmit={handleFormSubmit}>
            {columns.slice(0, -2).map((column) => (
              column.id === 'skill' ? (
                <TextField className='modalip'
                  key={column.id}
                  label={column.label}
                  name={column.id}
                  value={newCandidate[column.id] || []} // Make sure value is an array for multiple selection
                  onChange={handleInputChange} // Pass the event handler for change events
                  fullWidth
                  margin="normal"
                  select
                  SelectProps={{ multiple: true }} // Enable multiple selection
                >
                  {skillsOptions.map((skill) => (
                    <MenuItem key={skill} value={skill}>
                      {skill}
                    </MenuItem>
                  ))}
                </TextField>
              ) : column.id === 'status' ? (
                <TextField className='modalip'
                  key={column.id}
                  label={column.label}
                  name={column.id}
                  value={newCandidate[column.id] || ''}
                  onChange={handleInputChange}
                  fullWidth
                  margin="normal"
                  select
                >
                  {statusOptions.map((status) => (
                    <MenuItem key={status} value={status}>
                      {status}
                    </MenuItem>
                  ))}
                </TextField>
              ) : (
                <TextField className='modalip'
                  key={column.id}
                  label={column.label}
                  name={column.id}
                  value={newCandidate[column.id] || ''}
                  onChange={handleInputChange}
                  fullWidth
                  margin="normal"
                />
              )
            ))}
            <Button id="addbtnmodal" type="submit" variant="contained" color="primary">
              Add
            </Button>
          </form>
        </Box>
      </Modal>
      <Modal
        open={remarkModalOpen}
        onClose={handleCloseRemarkModal}
        aria-labelledby="remark-modal-title"
        aria-describedby="remark-modal-description"
      >
        <Box sx={modalStyle}>
          <h2 id="remark-modal-title">Add Remark</h2>
          <TextField
            fullWidth
            label="Remark"
            value={remark}
            onChange={(e) => { setRemark(e.target.value); localStorage.setItem("remark", e.target.value) }}
          />
          <Button onClick={handleRemark}>Submit</Button>
        </Box>
      </Modal>
    </>
  );
}








