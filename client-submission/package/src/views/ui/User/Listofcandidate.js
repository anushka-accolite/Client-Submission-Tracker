// import React, { useState, useEffect, useRef } from 'react';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
// import Paper from '@mui/material/Paper';
// import TextField from '@mui/material/TextField';
// import MenuItem from '@mui/material/MenuItem';
// import Button from '@mui/material/Button';
// import '../../css/listofcandidate.css';
// import Chart from 'chart.js/auto';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// function createData(id, name, email, experience, skill, status, IsEmployee, LastWorkingDay) {
  
//   return { id, name, email, experience, skill, status, IsEmployee, LastWorkingDay };
// }

// const statusOptions = ['Selected', 'Rejected', 'Pending', 'On-Hold'];

// const columns = [
//   { id: 'id', label: 'Candidate Id' },
//   { id: 'name', label: 'Candidate Name' },
//   { id: 'email', label: 'Email' },
//   { id: 'experience', label: 'Exp (years)' },
//   { id: 'skill', label: 'Skill' },
//   { id: 'status', label: 'Status' },
//   { id: 'IsEmployee', label: 'IsEmployee' },
//   { id: 'LastWorkingDay', label: 'LWD' },
//   { id: 'delete', label: 'Delete' },
// ];

// export default function Listofcandidate() {
//   const [rows, setRows] = useState([]);
//   const [sortOrder, setSortOrder] = useState('asc');
//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectedColumn, setSelectedColumn] = useState('');
//   const pieChartRef = useRef(null);
//   const chartInstance = useRef(null);
//   var response="";
//   useEffect(() => {
//     const fetchCandidates = async () => {
//       try {
//         let token = localStorage.getItem("token");
//         let headers = { "Authorization": `Bearer ${token}` };
//          response = await axios.get('http://localhost:8092/api/candidates/getAll', { headers });

//         console.log('Candidates API Response:', response.data); // Log the response to check its structure

//         if (!Array.isArray(response.data)) {
//           throw new Error('API response is not an array');
//         }

//         const candidateData = response.data;
//         console.log("look->",candidateData)
//         const candidatesWithSkills = await Promise.all(
//           candidateData
//           .filter(data=>data.isDeleted===false)
//           .map(async (item) => {
//             const skillsResponse = await axios.get(`http://localhost:8092/api/candidates/${item.candidateId}/skills`, { headers });
            
//             console.log(`Skills API Response for candidate ${item.candidateId}:`, skillsResponse.data); // Log the skills response
//             return createData(
//               item.candidateId,
//               item.candidateName,
//               item.candidateEmail,
//               item.experience,
//               skillsResponse.data+" ",
//               item.candidateStatus,
//               item.isAccoliteEmployee,
//               item.last_working_day
//             );
//           })
//         );

//         setRows(candidatesWithSkills);
//       } catch (error) {
//         console.error('Error fetching candidates or skills:', error);
//       }
//     };

//     fetchCandidates();
//   }, []);

//   const handleSort = () => {
//     const newRows = [...rows];
//     newRows.sort((a, b) => {
//       if (sortOrder === 'asc') {
//         return new Date(a.LastWorkingDay) - new Date(b.LastWorkingDay);
//       } else {
//         return new Date(b.LastWorkingDay) - new Date(a.LastWorkingDay);
//       }
//     });
//     setRows(newRows);
//     setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
//   };

//   const handleSearchChange = (e) => {
//     setSearchTerm(e.target.value);
//   };

//   const handleColumnChange = (e) => {
//     setSelectedColumn(e.target.value);
//   };

// const navigate=useNavigate();
//   const handleDelete = async (id) => {
//     try {
//       let token = localStorage.getItem("token");
//       let headers = { "Authorization": `Bearer ${token}`,'Content-Type':'application/json'};
//       let x = await axios.get(`http://localhost:8092/api/candidates/${id}`,{headers}) ;
//       x.data.isDeleted=true;
//       const val=x.data;
//       // console.log("New Rs "+x.data.candidateEmail);
//       await axios.put(`http://localhost:8092/api/candidates/${id}`, val, { headers });  

//       navigate(0);
//     } catch (error) {
//       console.error('Error deleting candidate:', error);
//     }
//   };
 
//   const handleStatusChange = async (id, status) => {
//     try {
//       let token = localStorage.getItem("token");
//       let headers = { "Authorization": `Bearer ${token}`, 'Content-Type': 'application/json' };
//       let response = await axios.get(`http://localhost:8092/api/candidates/${id}`, { headers });
//       let updatedCandidate = response.data;
//       updatedCandidate.candidateStatus = status;
//       console.log("Check STATUS ", updatedCandidate);
//       await axios.put(`http://localhost:8092/api/candidates/${id}`, updatedCandidate, { headers });
//       const updatedRows = rows.map(row => {
//         if (row.id === id) {
//           return { ...row, status };
//         }
//         return row;
//       });
//       setRows(updatedRows);
//     } catch (error) {
//       console.error('Error updating candidate status:', error);
//     }
//   };
  

//   const getStatusColor = (status) => {
//     switch (status) {
//       case 'Selected':
//         return 'green';
//       case 'Rejected':
//         return 'red';
//       case 'Pending':
//         return 'yellow';
//       case 'On-Hold':
//         return 'orange';
//       default:
//         return 'inherit';
//     }
//   };

//   const generateChartData = () => {
//     const data = {};
//     statusOptions.forEach(status => {
//       data[status] = rows.filter(row => row.status === status).length;
//     });
//     return data;
//   };

//   const renderPieChart = () => {
//     const chartData = generateChartData();
//     const ctx = pieChartRef.current.getContext('2d');
//     if (chartInstance.current) {
//       chartInstance.current.destroy();
//     }
//     chartInstance.current = new Chart(ctx, {
//       type: 'pie',
//       data: {
//         labels: statusOptions,
//         datasets: [{
//           label: 'Candidates',
//           data: statusOptions.map(status => chartData[status]),
//           backgroundColor: statusOptions.map(status => getStatusColor(status)),
//           borderColor: 'transparent'
//         }]
//       },
//       options: {
//         plugins: {
//           title: {
//             display: true,
//             text: 'Status of Candidates'
//           },
//           legend: {
//             display: false
//           },
//           tooltips: {
//             callbacks: {
//               label: (tooltipItem, data) => {
//                 const dataset = data.datasets[tooltipItem.datasetIndex];
//                 const total = dataset.data.reduce((acc, value) => acc + value, 0);
//                 const value = dataset.data[tooltipItem.index];
//                 const percentage = ((value / total) * 100).toFixed(2);
//                 return `${data.labels[tooltipItem.index]}: ${percentage}%`;
//               }
//             }
//           }
//         }
//       }
//     });
//   };

//   useEffect(() => {
//     renderPieChart();
//     return () => {
//       if (chartInstance.current) {
//         chartInstance.current.destroy();
//       }
//     };
//   }, [rows]);

//   const filteredRows = rows.filter((row) =>
//     selectedColumn && searchTerm
//       ? row[selectedColumn] && row[selectedColumn].toString().toLowerCase().includes(searchTerm.toLowerCase())
//       : !row.isDeleted
//   );

//   return (
//     <>
//       <div id='uppercon'>
//         <TextField
//           select className="search"
//           label="Select Column"
//           value={selectedColumn}
//           onChange={handleColumnChange}
//           variant="outlined"
//           size="small"
//           style={{ marginRight: '10px' }}
//         >
//           {columns.map((column) => (
//             <MenuItem key={column.id} value={column.id}>
//               {column.label !== 'LWD' && column.label !== 'Delete' ? column.label : ''}
//             </MenuItem>
//           ))}
//         </TextField>
//         <TextField
//           label="Search"
//           value={searchTerm}
//           onChange={handleSearchChange}
//           variant="outlined"
//           size="small"
//           style={{ marginBottom: '10px' }}
//         />
//         <TableContainer component={Paper} style={{ maxWidth: "50vw !important", marginTop: "15px" }}>
//           <Table sx={{ maxWidth: "10px" }} aria-label="simple table">
//             <TableHead>
//               <TableRow>
//                 {columns.map((column) => (
//                   <TableCell key={column.id}>
//                     <b>{column.label}</b>
//                     {column.id === 'LastWorkingDay' && (
//                       <button onClick={handleSort} className='bg-primary text-white'>
//                         {sortOrder === 'asc' ? '↓' : '↑'}
//                       </button>
//                     )}
//                   </TableCell>
//                 ))}
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {filteredRows.map((row) => (
//   <TableRow key={row.id} className='tablerow' >
//     {columns.map((column) => (
//       <TableCell key={column.id} >
//         {column.id === 'LastWorkingDay' ? (
          
//           <span>{row[column.id] && new Date(row[column.id].replace('T', ' ')).toLocaleString()}</span>

//         ) : column.id === 'status' ? (
//           <div style={{ display: 'flex', alignItems: 'center' }}>
//             <TextField className='dropdown'
//               select
//               value={row.status}
//               onChange={(e) => handleStatusChange(row.id, e.target.value)}
//               variant="outlined"
//               size="small"
//               style={{ color: getStatusColor(row.status) }}
//             >
//               {statusOptions.map((option) => (
//                 <MenuItem key={option} value={option}>
//                   {option}
//                 </MenuItem>
//               ))}
//             </TextField>
//             <div
//               className={`status-dot ${row.status.toLowerCase()}`}
//               style={{ marginLeft: '5px' }}
//             />
//           </div>
//         ) : column.id === 'delete' ? (
//           <Button id="delbtn" onClick={() => handleDelete(row.id)}>Delete</Button>
//         ) : (
//           row[column.id]
//         )}
//       </TableCell>
//     ))}
//   </TableRow>
// ))}
//           </TableBody>
//           </Table>
//         </TableContainer>
//         <div style={{ marginLeft: "200px", width: "500px", height: "500px" }}>
//           <canvas ref={pieChartRef}></canvas>
//         </div>
//       </div>
//     </>
//   );
// }

// import React, { useState, useEffect, useRef } from 'react';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
// import Paper from '@mui/material/Paper';
// import TextField from '@mui/material/TextField';
// import MenuItem from '@mui/material/MenuItem';
// import Button from '@mui/material/Button';
// import '../../css/listofcandidate.css';
// import Chart from 'chart.js/auto';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// function createData(id, name, email, experience, skill, status, IsEmployee, daysToLWD) {
//   return { id, name, email, experience, skill, status, IsEmployee, daysToLWD };
// }

// const statusOptions = ['Selected', 'Rejected', 'Pending', 'On-Hold'];

// const columns = [
//   { id: 'id', label: 'Candidate Id' },
//   { id: 'name', label: 'Candidate Name' },
//   { id: 'email', label: 'Email' },
//   { id: 'experience', label: 'Exp (years)' },
//   { id: 'skill', label: 'Skill' },
//   { id: 'status', label: 'Status' },
//   { id: 'IsEmployee', label: 'IsEmployee' },
//   { id: 'daysToLWD', label: 'Days to LWD' },
//   { id: 'delete', label: 'Delete' },
// ];

// export default function Listofcandidate() {
//   const [rows, setRows] = useState([]);
//   const [sortOrder, setSortOrder] = useState('asc');
//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectedColumn, setSelectedColumn] = useState('');
//   const pieChartRef = useRef(null);
//   const chartInstance = useRef(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchCandidates = async () => {
//       try {
//         let token = localStorage.getItem("token");
//         let headers = { "Authorization": `Bearer ${token}` };
//         let response = await axios.get('http://localhost:8092/api/candidates/getAll', { headers });

//         console.log('Candidates API Response:', response.data); // Log the response to check its structure

//         if (!Array.isArray(response.data)) {
//           throw new Error('API response is not an array');
//         }

//         const candidateData = response.data;
//         console.log("look->", candidateData)
//         const candidatesWithSkills = await Promise.all(
//           candidateData
//             .filter(data => data.isDeleted === false)
//             .map(async (item) => {
//               const skillsResponse = await axios.get(`http://localhost:8092/api/candidates/${item.candidateId}/skills`, { headers });

//               console.log(`Skills API Response for candidate ${item.candidateId}:`, skillsResponse.data); // Log the skills response
//               const daysToLWD = item.last_working_day ? Math.ceil((new Date(item.last_working_day) - new Date()) / (1000 * 60 * 60 * 24)) : null;
//               return createData(
//                 item.candidateId,
//                 item.candidateName,
//                 item.candidateEmail,
//                 item.experience,
//                 skillsResponse.data + " ",
//                 item.candidateStatus,
//                 item.isAccoliteEmployee,
//                 daysToLWD
//               );
//             })
//         );

//         setRows(candidatesWithSkills);
//       } catch (error) {
//         console.error('Error fetching candidates or skills:', error);
//       }
//     };

//     fetchCandidates();
//   }, []);

//   const handleSort = () => {
//     const newRows = [...rows];
//     newRows.sort((a, b) => {
//       if (sortOrder === 'asc') {
//         return a.daysToLWD - b.daysToLWD;
//       } else {
//         return b.daysToLWD - a.daysToLWD;
//       }
//     });
//     setRows(newRows);
//     setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
//   };

//   const handleSearchChange = (e) => {
//     setSearchTerm(e.target.value);
//   };

//   const handleColumnChange = (e) => {
//     setSelectedColumn(e.target.value);
//   };

//   const handleDelete = async (id) => {
//     try {
//       let token = localStorage.getItem("token");
//       let headers = { "Authorization": `Bearer ${token}`, 'Content-Type': 'application/json' };
//       let x = await axios.get(`http://localhost:8092/api/candidates/${id}`, { headers });
//       x.data.isDeleted = true;
//       const val = x.data;
//       await axios.put(`http://localhost:8092/api/candidates/${id}`, val, { headers });

//       navigate(0);
//     } catch (error) {
//       console.error('Error deleting candidate:', error);
//     }
//   };

//   const handleStatusChange = async (id, status) => {
//     try {
//       let token = localStorage.getItem("token");
//       let headers = { "Authorization": `Bearer ${token}`, 'Content-Type': 'application/json' };
//       let response = await axios.get(`http://localhost:8092/api/candidates/${id}`, { headers });
//       let updatedCandidate = response.data;
//       updatedCandidate.candidateStatus = status;
//       await axios.put(`http://localhost:8092/api/candidates/${id}`, updatedCandidate, { headers });
//       const updatedRows = rows.map(row => {
//         if (row.id === id) {
//           return { ...row, status };
//         }
//         return row;
//       });
//       setRows(updatedRows);
//     } catch (error) {
//       console.error('Error updating candidate status:', error);
//     }
//   };

//   const getStatusColor = (status) => {
//     switch (status) {
//       case 'Selected':
//         return 'green';
//       case 'Rejected':
//         return 'red';
//       case 'Pending':
//         return 'yellow';
//       case 'On-Hold':
//         return 'orange';
//       default:
//         return 'inherit';
//     }
//   };

//   const generateChartData = () => {
//     const data = {};
//     statusOptions.forEach(status => {
//       data[status] = rows.filter(row => row.status === status).length;
//     });
//     return data;
//   };

//   const renderPieChart = () => {
//     const chartData = generateChartData();
//     const ctx = pieChartRef.current.getContext('2d');
//     if (chartInstance.current) {
//       chartInstance.current.destroy();
//     }
//     chartInstance.current = new Chart(ctx, {
//       type: 'pie',
//       data: {
//         labels: statusOptions,
//         datasets: [{
//           label: 'Candidates',
//           data: statusOptions.map(status => chartData[status]),
//           backgroundColor: statusOptions.map(status => getStatusColor(status)),
//           borderColor: 'transparent'
//         }]
//       },
//       options: {
//         plugins: {
//           title: {
//             display: true,
//             text: 'Status of Candidates'
//           },
//           legend: {
//             display: false
//           },
//           tooltips: {
//             callbacks: {
//               label: (tooltipItem, data) => {
//                 const dataset = data.datasets[tooltipItem.datasetIndex];
//                 const total = dataset.data.reduce((acc, value) => acc + value, 0);
//                 const value = dataset.data[tooltipItem.index];
//                 const percentage = ((value / total) * 100).toFixed(2);
//                 return `${data.labels[tooltipItem.index]}: ${percentage}%`;
//               }
//             }
//           }
//         }
//       }
//     });
//   };

//   useEffect(() => {
//     renderPieChart();
//     return () => {
//       if (chartInstance.current) {
//         chartInstance.current.destroy();
//       }
//     };
//   }, [rows]);

//   const filteredRows = rows.filter((row) =>
//     selectedColumn && searchTerm
//       ? row[selectedColumn] && row[selectedColumn].toString().toLowerCase().includes(searchTerm.toLowerCase())
//       : !row.isDeleted
//   );

//   return (
//     <>
//       <div id='uppercon'>
//         <TextField
//           select className="search"
//           label="Select Column"
//           value={selectedColumn}
//           onChange={handleColumnChange}
//           variant="outlined"
//           size="small"
          
//         >
//           {columns.map((column) => (
//             <MenuItem key={column.id} value={column.id}>
//               {column.label !== 'Days to LWD' && column.label !== 'Delete' ? column.label : ''}
//             </MenuItem>
//           ))}
//         </TextField>
//         <TextField
//           label="Search"
//           value={searchTerm}
//           onChange={handleSearchChange}
//           variant="outlined"
//           size="small"
//           className='searchip'
//         />
//         <TableContainer component={Paper} style={{ maxWidth: "50vw !important", marginTop: "15px" }}>
//           <Table sx={{ maxWidth: "10px" }} aria-label="simple table">
//             <TableHead>
//               <TableRow>
//                 {columns.map((column) => (
//                   <TableCell key={column.id}>
//                     <b>{column.label}</b>
//                     {column.id === 'daysToLWD' && (
//                       <button onClick={handleSort} className='bg-primary text-white'>
//                         {sortOrder === 'asc' ? '↓' : '↑'}
//                       </button>
//                     )}
//                   </TableCell>
//                 ))}
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {filteredRows.map((row) => (
//                 <TableRow key={row.id} className='tablerow'>
//                   {columns.map((column) => (
//                     <TableCell key={column.id}>
//                       {column.id === 'daysToLWD' ? (
//                         <span>{row[column.id] !== null ? `${row[column.id]} days` : 'N/A'}</span>
//                       ) : column.id === 'status' ? (
//                         <div style={{ display: 'flex', alignItems: 'center' }}>
//                           <TextField className='dropdown'
//                             select
//                             value={row.status}
//                             onChange={(e) => handleStatusChange(row.id, e.target.value)}
//                             variant="outlined"
//                             size="small"
//                             style={{ color: getStatusColor(row.status) }}
//                           >
//                             {statusOptions.map((option) => (
//                               <MenuItem key={option} value={option}>
//                                 {option}
//                               </MenuItem>
//                             ))}
//                           </TextField>
//                           <div
//                             className={`status-dot ${row.status.toLowerCase()}`}
//                             style={{ marginLeft: '5px' }}
//                           />
//                         </div>
//                       ) : column.id === 'delete' ? (
//                         <Button id="delbtn" onClick={() => handleDelete(row.id)}>Delete</Button>
//                       ) : (
//                         row[column.id]
//                       )}
//                     </TableCell>
//                   ))}
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </TableContainer>
//         <div style={{ marginLeft: "200px", width: "500px", height: "500px" }}>
//           <canvas ref={pieChartRef}></canvas>
//         </div>
//       </div>
//     </>
//   );
// }

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
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import '../../css/listofcandidate.css';
import Chart from 'chart.js/auto';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function createData(id, name, email, experience, skill, status, IsEmployee, daysToLWD) {
  return { id, name, email, experience, skill, status, IsEmployee, daysToLWD };
}

const statusOptions = ['Selected', 'Rejected', 'Pending', 'On-Hold'];
const skillsOptions = ['JavaScript', 'Python', 'Java', 'C++', 'Ruby'];

const columns = [
  { id: 'id', label: 'Candidate Id' },
  { id: 'name', label: 'Candidate Name' },
  { id: 'email', label: 'Email' },
  { id: 'experience', label: 'Exp (years)' },
  { id: 'skill', label: 'Skill' },
  { id: 'status', label: 'Status' },
  { id: 'IsEmployee', label: 'IsEmployee' },
  { id: 'daysToLWD', label: 'Days to LWD' },
  { id: 'update', label: 'Update' },
  { id: 'delete', label: 'Delete' },
];

const modalStyle = {
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

export default function Listofcandidate() {
  const [rows, setRows] = useState([]);
  const [sortOrder, setSortOrder] = useState('asc');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedColumn, setSelectedColumn] = useState('');
  const [open, setOpen] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
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
                skillsResponse.data.join(", "),
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
  const filteredRows = rows.filter((row) =>
    selectedColumn && searchTerm
      ? row[selectedColumn] && row[selectedColumn].toString().toLowerCase().includes(searchTerm.toLowerCase())
      : !row.isDeleted
  );
  
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
  

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleColumnChange = (e) => {
    setSelectedColumn(e.target.value);
  };

  const handleDelete = async (id) => {
    try {
      let token = localStorage.getItem("token");
      let headers = { "Authorization": `Bearer ${token}`, 'Content-Type': 'application/json' };
      let x = await axios.get(`http://localhost:8092/api/candidates/${id}`, { headers });
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

  const handleOpen = (candidate) => {
    setSelectedCandidate({
      id: candidate.id,
      name: candidate.name,
      email: candidate.email,
      experience: candidate.experience,
      skill: candidate.skill,
      status: candidate.status,
      IsEmployee: candidate.IsEmployee,
      daysToLWD: candidate.daysToLWD
    });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedCandidate(null);
  };

  const handleUpdate = async () => {
    try {
      let token = localStorage.getItem("token");
      let headers = { "Authorization": `Bearer ${token}`};
      const updatedCandidate = {
        // ...selectedCandidate,
        candidateId:selectedCandidate.id,
        candidateName: selectedCandidate.name,
        candidateEmail: selectedCandidate.email,
        candidateStatus:selectedCandidate.status, 
        last_working_day:selectedCandidate.daysToLWD,
        isAccoliteEmployee:selectedCandidate. IsEmployee,
        experience:selectedCandidate.experience
      };
      console.log("updatedCandidate",updatedCandidate);
       await axios.put(`http://localhost:8092/api/candidates/${selectedCandidate.id}`, updatedCandidate, { headers });

       const updatedRows = rows.map(row =>
        row.id === selectedCandidate.id ? { ...updatedCandidate } : row
      );
      
      console.log(updatedRows);
      setRows(updatedRows);
      handleClose();
    } catch (error) {
      console.error('Error updating candidate:', error);
    }
  };

  return (
    <>
      <div id='uppercon'>
        <TextField
          select
          className="search"
          label="Select Column"
          value={selectedColumn}
          onChange={handleColumnChange}
          variant="outlined"
          size="small"
        >
          {columns.map((column) => (
            <MenuItem key={column.id} value={column.id}>
              {column.label !== 'Days to LWD' && column.label !== 'Delete' && column.label !== 'Update' ? column.label : ''}
            </MenuItem>
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
                        <Button id="delbtn" onClick={() => handleDelete(row.id)}>Delete</Button>
                      ) : column.id === 'update' ? (
                        <Button id="updatebtn" onClick={() => handleOpen(row)}>Update</Button>
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
        <div style={{ marginLeft: "200px", width: "500px", height: "500px" }}>
          <canvas ref={pieChartRef}></canvas>
        </div>
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={modalStyle}>
          <h2 id="modal-title">Update Candidate</h2>
          {selectedCandidate && (
            <>
              {columns.map((column) => (
              column.id!=='IsEmployee' &&  column.id!=='status' && column.id!=='id' && column.id!=='name' &&   column.id !== 'delete' && column.id !== 'daysToLWD' && column.id !== 'update' && (
                  column.id === 'skill' ? (
                    <TextField
                      key={column.id}
                      select
                      label={column.label}
                      value={selectedCandidate[column.id]}
                      onChange={(e) => setSelectedCandidate({ ...selectedCandidate, [column.id]: e.target.value })}
                      variant="outlined"
                      margin="normal"
                      fullWidth
                    >
                      {skillsOptions.map((skill) => (
                        <MenuItem key={skill} value={skill}>
                          {skill}
                        </MenuItem>
                      ))}
                    </TextField>
                  ) : (
                    <TextField
                      key={column.id}
                      label={column.label}
                      value={selectedCandidate[column.id]}
                      onChange={(e) => setSelectedCandidate({ ...selectedCandidate, [column.id]: e.target.value })}
                      variant="outlined"
                      margin="normal"
                      fullWidth
                    />
                  )
                )
              ))}
              <Button variant="contained" color="primary" onClick={handleUpdate}>
                Save
              </Button>
              <Button variant="outlined" color="secondary" onClick={handleClose}>
                Cancel
              </Button>
            </>
          )}
        </Box>
      </Modal>
    </>
  );
}

       
