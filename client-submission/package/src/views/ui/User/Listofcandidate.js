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
import Chart from 'chart.js/auto';
import '../../css/listofcandidate.css'

function createData(id, name, email, experience, skill, status, IsEmployee, LastWorkingDay) {
  return { id, name, email, experience, skill, status, IsEmployee, LastWorkingDay };
}

const initialRows = [
  createData('C101', 'Chirag', 'arorachirag709@gmail.com', 5, 'JAVA', 'Selected', 'Yes', 2),
  createData('C102', 'Deepak', 'aroradeepak102@gmail.com', 3, 'NA', 'Pending', 'No', 6),
  createData('C103', 'Ram', 'aroraram102@gmail.com', 2 , 'Python', 'On-Hold', 'No', 4),
  createData('C104', 'Priya', 'aroraPriya102@gmail.com', 4, 'C++', 'Rejected', 'No', 4),
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
  { id: 'LastWorkingDay', label: 'LWD' },
  { id: 'delete', label: 'Delete' },
];

export default function Listofcandidate() {
  const [rows, setRows] = useState(initialRows);
  const [sortOrder, setSortOrder] = useState('asc');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedColumn, setSelectedColumn] = useState('');
  const pieChartRef = useRef(null);
  const chartInstance = useRef(null);

  const handleSort = () => {
    const newRows = [...rows];
    newRows.sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.LastWorkingDay - b.LastWorkingDay;
      } else {
        return b.LastWorkingDay - a.LastWorkingDay;
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

  const handleDelete = (id) => {
    const updatedRows = rows.filter(row => row.id !== id);
    setRows(updatedRows);
  };

  const handleStatusChange = (id, status) => {
    const updatedRows = rows.map(row => {
      if (row.id === id) {
        return { ...row, status };
      }
      return row;
    });
    setRows(updatedRows);
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
    searchTerm
      ? row[selectedColumn].toLowerCase().includes(searchTerm.toLowerCase())
      : true
  );

  return (
    <>
    <div>
      <TextField
        select
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
      <TableContainer component={Paper} style={{maxWidth:"50vw !important"
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
                    {column.id === 'status' ? (
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <TextField
                          select
                          value={row.status}
                          onChange={(e) => handleStatusChange(row.id, e.target.value)}
                          variant="outlined"
                          size="small"
                          style={{ color: getStatusColor(row.status) }}
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
                      <Button onClick={() => handleDelete(row.id)}>Delete</Button>
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
      <div style={{marginLeft:"200px",width:"500px",height:"500px"}}>
      <canvas ref={pieChartRef}></canvas>
      </div>
      </div>
    </>
  );
}
