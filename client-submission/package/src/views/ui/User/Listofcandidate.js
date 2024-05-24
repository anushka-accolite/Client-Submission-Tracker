import React, { useState, useEffect, useRef } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import '../../css/listofcandidate.css';
import Chart from 'chart.js/auto';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function createData(id, name, email, experience, skill, status, IsEmployee, daysToLWD) {
  return { id, name, email, experience, skill, status, IsEmployee, daysToLWD };
}

const statusOptions = ['Selected', 'Rejected', 'Pending', 'OnHold'];

const columns = [
  { id: 'id', label: 'Candidate Id' },
  { id: 'name', label: 'Candidate Name' },
  { id: 'email', label: 'Email' },
  { id: 'experience', label: 'Exp (years)' },
  { id: 'skill', label: 'Skill' },
  { id: 'status', label: 'Status' },
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
];

export default function Listofcandidate() {
  const [rows, setRows] = useState([]);
  const [sortOrder, setSortOrder] = useState('asc');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedColumn, setSelectedColumn] = useState('');
  const pieChartRef = useRef(null);
  const chartInstance = useRef(null);
  const navigate = useNavigate();
  const [selectedRow,setSelectedRow]=useState();
  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        let token = localStorage.getItem("token");
        let headers = { "Authorization": `Bearer ${token}` };
        let response = await axios.get('http://localhost:8092/api/candidates/getAll', { headers });

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
              const daysToLWD = item.last_working_day ? Math.ceil((new Date(item.last_working_day) - new Date()) / (1000 * 60 * 60 * 24)) : null;
              return createData(
                item.candidateId,
                item.candidateName,
                item.candidateEmail,
                item.experience,
                skillsResponse.data + " ",
                item.candidateStatus,
                item.isAccoliteEmployee,
                daysToLWD
              );
            })
        );

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

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleColumnChange = (e) => {
    setSelectedColumn(e.target.value);
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
        navigate(0); }
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
     console.log(status)
    switch (status) {
      case 'Selected':
        return 'green';
      case 'Rejected':
        return 'red';
      case 'Pending':
        return 'yellow';
      case 'OnHold':
        return 'orange';
      default:
        return 'inherit';
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

  const filteredRows = rows.filter((row) =>
    selectedColumn && searchTerm
      ? row[selectedColumn] && row[selectedColumn].toString().toLowerCase().includes(searchTerm.toLowerCase())
      : !row.isDeleted
  );


//   const handleAdd = async (id) => {
//     try {
//         let token = localStorage.getItem("token");
//         let headers = { "Authorization": `Bearer ${token}` };
//         let response= await axios.get(`http://localhost:8092/api/candidates/${id}`, { headers });
//         let candidateToAdd = response.data;
//         candidateToAdd.isDeleted = false;
//         console.log("add ", response.data);
//         let userObj=await axios.get(`http://localhost:8092/api/user/users`,{headers});
//         let username=localStorage.getItem("username");
//         let userId=userObj.data.find((item)=>item.userName===username).userId;
//         let userObj1=userObj.data.find((item)=>item.userId===userId);
//         console.log(userObj1);
//         let clientObj=candidateToAdd.clients;
//         console.log(clientObj);
//         let clientObj1=clientObj[0];
//         const submissionData = {
//           users: userObj1?{
//               userId: userObj1.userId,
//               userName: userObj1.userName,
//               userRole: userObj1.userRole,
//               email: userObj1.email,
//               loginUserPassword: userObj1.loginUserPassword,
//               isDeleted: userObj1.isDeleted
//           }:null,
//           client: clientObj1?  {
//               clientId: clientObj1.clientId,
//               clientName: clientObj1.clientName,
//               clientResponseTimeinDays: clientObj1.clientResponseTimeinDays,
//               clientRequirement: clientObj1.clientRequirement,
//               skills: clientObj1.skills,
//               isDeleted: clientObj1.isDeleted
//           }:null,
//           candidate: candidateToAdd? {
//               candidateId: candidateToAdd.candidateId,
//               candidateName: candidateToAdd.candidateName,
//               candidateEmail: candidateToAdd.candidateEmail,
//               candidateStatus: candidateToAdd.candidateStatus,
//               last_working_day: candidateToAdd.last_working_day,
//               isAccoliteEmployee: candidateToAdd.isAccoliteEmployee,
//               experience: candidateToAdd.experience,
//               isDeleted: candidateToAdd.isDeleted,
//               skills:candidateToAdd.skills||[]
//           }:null,
//           submissionDate: new Date().getTime(), // Submission date in milliseconds
//           status: candidateToAdd.candidateStatus,
//           remark: 'Good Understanding', // Assuming 'Good Understanding' as default remark
//           isDeleted: false
//       };
//       console.log(submissionData);
//         let submission=await axios.post('http://localhost:8092/api/submissions',
//             submissionData
//         ,{headers});
//         setSelectedRow(id);
        
//     } catch (error) {
//         console.error('Error adding candidate:', error);
//     }
// };

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

    // Fetch user data
    let userObj = await axios.get(`http://localhost:8092/api/user/users`, { headers });
    let username = localStorage.getItem("username");
    let user = userObj.data.find((item) => item.userName === username);
    if (!user) {
      throw new Error("User not found");
    }

    let clientObj1=await axios.get('http://localhost:8092/api/admin/clients',{headers});
    //console.log(clientObj1.data);
    let clientData=null;

    const clients=clientObj1.data.map(client=>{
      const user1=client.users;
      const userArray=user1.map((item)=>{
        //console.log(item.userId);
        //console.log(user.userId);
         if(item.userId===user.userId){
          clientData=client;
         }
      })
    })
    console.log(clientData);
    console.log(headers);
    let client_candidate=await axios.post(`http://localhost:8092/api/candidate-client/link?candidateId=${candidateToAdd?.candidateId}&clientId=${clientData?.clientId}`,{},{headers});
    console.log(client_candidate);

    // Fetch client data from the candidate object
    // let clientObj = candidateToAdd.clients;
    // if (!clientObj || clientObj.length === 0) {
    //   throw new Error("Client data not found");
    // }
    // let client = clientObj[0];

    // Prepare submission data
    const submissionData ={
      users: user?{
        userId: user.userId,
        userName: user.userName,
        userRole: user.userRole,
        email: user.email,
        loginUserPassword: user.loginUserPassword,
        isDeleted: user.isDeleted,
      }:null,
      client: clientData?{
        clientId: clientData.clientId,
        clientName: clientData.clientName,
        clientResponseTimeinDays: clientData.clientResponseTimeinDays,
        clientRequirement: clientData.clientRequirement,
        skills: clientData.skills,
        isDeleted: clientData.isDeleted,
      }:null,
      candidate:candidateToAdd? {
        candidateId: candidateToAdd.candidateId,
        candidateName: candidateToAdd.candidateName,
        candidateEmail: candidateToAdd.candidateEmail,
        candidateStatus: candidateToAdd.candidateStatus,
        last_working_day: candidateToAdd.last_working_day,
        isAccoliteEmployee: candidateToAdd.isAccoliteEmployee,
        experience: candidateToAdd.experience,
        isDeleted: candidateToAdd.isDeleted,
        skills: candidateToAdd.skills || [],
      }:null,
      submissionDate: new Date().getTime(),
      //status: candidateToAdd.candidateStatus,
      remark: 'Good Understanding',
      isDeleted: false,
    };

    console.log(submissionData);

    // Submit the submission data
    await axios.post('http://localhost:8092/api/submissions', submissionData, { headers });

    setSelectedRow(id);
    toast.success("Candidate added successfully!");

  } catch (error) {
    console.error('Error adding candidate:', error);
    toast.error('Error adding candidate');
  }
};


  return (
    <>
    <ToastContainer/>
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
        />
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
              {filteredRows.map((row) => (
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
                      ) : column.id === 'delete' ? (
                        <Button id="delbtn" onClick={() => handleDelete(row.id)}>Delete</Button>
                      ) : column.id === 'add' ? (
                        <Button disabled={selectedRow===row.id} id="addbtn" onClick={() => handleAdd(row.id)}>Add</Button>
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
    </>
  );
}
