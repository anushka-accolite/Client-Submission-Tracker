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
//import { Chart } from 'chart.js';


function createData(id, name, email, experience, skill, status, IsEmployee, daysToLWD) {
  return { id, name, email, experience, skill, status, IsEmployee, daysToLWD };
}

const initialRows = [
  createData('C101', 'Chirag', 'arorachirag709@gmail.com', 5, 'JAVA', 'Selected', 'Yes', 2),
  createData('C102', 'Deepak', 'aroradeepak102@gmail.com', 3, 'NA', 'Pending', 'No', 6),
  createData('C103', 'Ram', 'aroraram102@gmail.com', 2 , 'Python', 'On-Hold', 'No', 4),
  createData('C104', 'Priya', 'aroraPriya102@gmail.com', 4, 'C++', 'Rejected', 'No', 4),
];

function createDataInd(status, color) {
  return { status, color};
}

const rowsInd = [
  createDataInd('Selected', 'Green'),
  createDataInd('Rejected', 'Red'),
  createDataInd('Pending', 'Yellow'),
  createDataInd('On-hold', 'Orange'),
];

const statusOptions = ['Selected', 'Rejected', 'Pending', 'On-Hold'];

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
];

export default function Listofcandidate() {
  const [rows, setRows] = useState([]);
  const [sortOrder, setSortOrder] = useState('asc');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedColumn, setSelectedColumn] = useState('');
  const pieChartRef = useRef(null);
  const chartInstance = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        let token = localStorage.getItem("token");
        let headers = { "Authorization": `Bearer ${token}` };
        let response = await axios.get('http://localhost:8092/api/candidates/getAll', { headers });

        console.log('Candidates API Response:', response.data); // Log the response to check its structure

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

              console.log(`Skills API Response for candidate ${item.candidateId}:`, skillsResponse.data); // Log the skills response
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
      console.log("Deleted id",x.data);
      x.data.isDeleted = true;
      const val = x.data;

      await axios.put(`http://localhost:8092/api/candidates/${id}`, val, { headers });

       navigate(0);
    } catch (error) {
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
      case 'On-Hold':
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
    chartInstance.current = new Chart(ctx,  {
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

  return (
    <>
    <div id='uppercon'>
      <div className="top-table">
      <TextField
        select className="search"
        label="Select Column"
        value={selectedColumn}
        onChange={handleColumnChange}
        variant="outlined"
        size="small"
        style={{ marginRight: '10px' }}
      >
        {columns.map((column) => (
          <MenuItem key={column.id} value={column.id}>
            {column.label!=='LWD' && column.label!=='Delete'?column.label:''}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        label="Search"
        value={searchTerm}
        onChange={handleSearchChange}
        variant="outlined"
        size="small"
        style={{ marginBottom: '10px' }}
      />
      <TableContainer component={Paper} style={{maxWidth:"50vw !important",marginTop:"15px"
      }}>
        <Table sx={{maxWidth:"10px"}} aria-label="simple table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.id}>
                  <b>{column.label}</b>
                  {column.id === 'LastWorkingDay' && (
                    <button onClick={handleSort}>
                      {sortOrder === 'asc' ? '↓' : '↑'}
                    </button>
                  )}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredRows.map((row) => (
              <TableRow key={row.id}>
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
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      </div>
      {/* <div style={{marginLeft:"200px",width:"500px",height:"500px"}}>
      <canvas ref={pieChartRef}></canvas>
      </div> */}
      <div className="bottom-table">
      <div style={{ display: 'flex' }}>
      <div style={{ width: '50%' }}>
      <div style={{ marginLeft: "50px", width: "375px", height: "375px" }}>
      <canvas ref={pieChartRef}></canvas>
    
  </div>
  </div>
  <div style={{ width: '50%' }}>
  <TableContainer component={Paper} style={{ marginTop: "15px" }}>
    <Table sx={{ maxWidth: '80vw'}} aria-label="simple table">
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
            <TableCell align="left"> { r.color }
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
  </div>
  </div>
  </div>
  </div>
    </>
  );
}
