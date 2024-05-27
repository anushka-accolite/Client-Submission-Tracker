// import '../../css/clients.css';
// import React, { useState, useEffect } from 'react';
// import Paper from '@mui/material/Paper';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
// import TextField from '@mui/material/TextField';
// import MenuItem from '@mui/material/MenuItem';
// import IconButton from '@mui/material/IconButton';
// import SortIcon from '@mui/icons-material/Sort';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const columns = [
//   { id: 'clientId', label: 'Client ID', minWidth: 170 },
//   { id: 'clientName', label: 'Client Name', minWidth: 100 },
//   { id: 'clientRequirement', label: 'Client Requirement', minWidth: 170 },
//   { id: 'skills', label: 'Skills', minWidth: 170 },
//   { id: 'clientResponseTimeinDays', label: 'Response Time', minWidth: 170 },
// ];

// export default function Clients() {
//   const [selectedColumn, setSelectedColumn] = useState('clientName');
//   const [searchTerm, setSearchTerm] = useState('');
//   const [clients, setClients] = useState([]);
//   const [filteredClients, setFilteredClients] = useState([]);
//   const [sortOrder, setSortOrder] = useState('asc');
//   let response="";
//   const navigate=useNavigate();
//   useEffect(() => {
//     if(localStorage.role!=='admin'){
//       navigate('/loginform');
//     }
//     const fetchClients = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         const headers = {
//           'Authorization': `Bearer ${token}`
//         };
//         response = await axios.get('http://localhost:8092/api/admin/clients', { headers }); // get all client details
//         const clientsData = response.data;
//         console.log(clientsData)
//         setClients(clientsData);
//         setFilteredClients(clientsData);
//         console.log(clientsData);
//       } catch (error) {
//         console.error('Error fetching clients:', error);
//       }
//     };

//     fetchClients();
//   }, [response]);

//   const handleColumnChange = (event) => {
//     const { value } = event.target;
//     setSelectedColumn(value);
//     setSearchTerm(''); // Reset search term when column changes
//     setFilteredClients(clients); // Reset filtered clients to display all
//   };

//   const handleSearchChange = (event) => {
//     const { value } = event.target;
//     setSearchTerm(value);

//     // Filter clients based on the selected column
//     let filteredResult;
//     if (selectedColumn === 'clientName') {
//       filteredResult = clients.filter(client => client.clientName.toLowerCase().includes(value.toLowerCase()));
//     } else if (selectedColumn === 'skills') {
//       filteredResult = clients.filter(client => client.skills?.toLowerCase().includes(value.toLowerCase()));
//     } else {
//       filteredResult = clients.filter(client => {
//         const columnValue = client[selectedColumn];
//         return columnValue && columnValue.toString().toLowerCase().includes(value.toLowerCase());
//       });
//     }
//     setFilteredClients(filteredResult);
//   };

//   const handleSortToggle = () => {
//     const order = sortOrder === 'asc' ? 'desc' : 'asc';
//     const sortedClients = [...filteredClients].sort((a, b) => {
//       if (order === 'asc') {
//         return a.clientResponseTimeinDays - b.clientResponseTimeinDays;
//       } else {
//         return b.clientResponseTimeinDays - a.clientResponseTimeinDays;
//       }
//     });
//     setSortOrder(order);
//     setFilteredClients(sortedClients);
//   };

//   return (
//     <>
//       <h1 id='hd'>List of Clients</h1>
//       <div id="container">
//         <div>
//           <TextField className="dropdown"
//             select
//             label="Select Column"
//             value={selectedColumn}
//             onChange={handleColumnChange}
//           >
//             {columns.map((column) => (
//               column.label !== 'Client Requirement' && column.label !== 'Response Time' && column.label !== 'Client ID' && (
//                 <MenuItem key={column.id} value={column.id}>
//                   {column.label}
//                 </MenuItem>
//               )
//             ))}
//           </TextField>
//           <TextField className='searchbar'
//             label="Search"
//             variant="outlined"
//             value={searchTerm}
//             onChange={handleSearchChange}
//           />
//         </div>
//       </div>
//       <Paper className='table'>
//         <TableContainer className='tableContainer'>
//           <Table>
//             <TableHead className='tableHead'>
//               <TableRow id="topRow">
//                 {columns.map((column) => (
//                   <TableCell 
//                     key={column.id}
//                     align={column.align}
//                     className='tableCell'
//                   >
//                     <b>{column.label}</b>
//                     {column.id === 'clientResponseTimeinDays' && (
//                       <IconButton size="small" onClick={handleSortToggle}>
//                         <SortIcon />
//                       </IconButton>
//                     )}
//                   </TableCell>
//                 ))}
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {Array.isArray(filteredClients) && filteredClients.map(client => (
//                 <TableRow key={client.clientId} className='tableRow'>
//                   <TableCell className='tableCell'>{client.clientId}</TableCell>
//                   <TableCell className='tableCell'>{client.clientName}</TableCell>
//                   <TableCell className='tableCell'>{client.clientRequirement}</TableCell>
//                   <TableCell className='tableCell'>{client.skills}</TableCell>
//                   <TableCell id='responsecol' className='tableCell'>
//                     {client.clientResponseTimeinDays}
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       </Paper>
//     </>
//   );
// }

import '../../css/clients.css';
import React, { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import SortIcon from '@mui/icons-material/Sort';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const columns = [
  { id: 'clientId', label: 'Client ID', minWidth: 170 },
  { id: 'clientName', label: 'Client Name', minWidth: 100 },
  { id: 'clientRequirement', label: 'Client Requirement', minWidth: 170 },
  { id: 'skills', label: 'Skills', minWidth: 170 },
  { id: 'clientResponseTimeinDays', label: 'Response Time', minWidth: 170 },
];

export default function Clients() {
  const [selectedColumn, setSelectedColumn] = useState('clientName');
  const [searchTerm, setSearchTerm] = useState('');
  const [clients, setClients] = useState([]);
  const [filteredClients, setFilteredClients] = useState([]);
  const [sortOrder, setSortOrder] = useState('asc');
  let response = "";
  useEffect(() => {
    const fetchClients = async () => {
      try {
        const token = localStorage.getItem("token");
        const headers = {
          'Authorization': `Bearer ${token}`
        };
        response = await axios.get('http://localhost:8092/api/admin/clients', { headers });
        const clientsData = response.data;
        setClients(clientsData);
        // setFilteredClients(clientsData);
        const data=clientsData.filter(client => client.isDeleted !== true);
    
        setFilteredClients(clientsData.filter(client => client.isDeleted !== true));

        console.log(clientsData);
      } catch (error) {
        console.error('Error fetching clients:', error);
      }
    };

    fetchClients();
  }, [response]);

  const handleColumnChange = (event) => {
    const { value } = event.target;
    setSelectedColumn(value);
    setSearchTerm(''); // Reset search term when column changes
    setFilteredClients(clients); // Reset filtered clients to display all
  };

  const handleSearchChange = (event) => {
    const { value } = event.target;
    setSearchTerm(value);
  
    // Filter clients based on the selected column
    let filteredResult;
    if (selectedColumn === 'clientName') {
      filteredResult = clients.filter(client => client.clientName && client.clientName.toLowerCase().includes(value.toLowerCase()));
    } else if (selectedColumn === 'skills') {
      filteredResult = clients.filter(client => client.skills && client.skills.toLowerCase().includes(value.toLowerCase()));
    } else {
      filteredResult = clients.filter(client => {
        const columnValue = client[selectedColumn];
        return columnValue && columnValue.toString().toLowerCase().includes(value.toLowerCase());
      });
    }
    setFilteredClients(filteredResult);
  };
  

  // const handleSearchChange = (event) => {
  //   const { value } = event.target;
  //   setSearchTerm(value);

  //   // Filter clients based on the selected column
  //   let filteredResult;
  //   if (selectedColumn === 'clientName') {
  //     filteredResult = clients.filter(client => client.clientName.toLowerCase().includes(value.toLowerCase()));
  //   } else if (selectedColumn === 'skills') {
  //     filteredResult = clients.filter(client => client.skills?.toLowerCase().includes(value.toLowerCase()));
  //   } else {
  //     filteredResult = clients.filter(client => {
  //       const columnValue = client[selectedColumn];
  //       return columnValue && columnValue.toString().toLowerCase().includes(value.toLowerCase());
  //     });
  //   }
  //   setFilteredClients(filteredResult);
  // };

  const getResponseTimeStyle = (responseTime) => {
    let backgroundColor = {};
    if (responseTime === 0) {
      backgroundColor = { backgroundColor: 'Red' };
    } else if (responseTime >= 1 && responseTime <= 3) {
      backgroundColor = { backgroundColor: 'yellow' };
    }
    return { ...backgroundColor, borderRadius: '10px' }; // Apply rounded corners
  };

  const handleSortToggle = () => {
    const order = sortOrder === 'asc' ? 'desc' : 'asc';
    const sortedClients = [...filteredClients].sort((a, b) => {
      if (order === 'asc') {
        return a.clientResponseTimeinDays - b.clientResponseTimeinDays;
      } else {
        return b.clientResponseTimeinDays - a.clientResponseTimeinDays;
      }
    });
    setSortOrder(order);
    setFilteredClients(sortedClients);
  };

  const handleClearSearch = () => {
    setSearchTerm('');
  };

  return (
    <>
      <h2 id='hd'>List of Clients</h2>
      <div id="container">
        <div>
          <TextField className="dropdown"
            select
            label="Select Column"
            value={selectedColumn}
            onChange={handleColumnChange}
          >
            
            {columns.map((column) => (
              column.label !== 'Client Requirement' && column.label !== 'Response Time' && column.label !== 'Client ID' && (
                <MenuItem key={column.id} value={column.id}>
                  {column.label}
                </MenuItem>
              )
            ))}
            
          </TextField>
          <TextField className='searchbar'
            label="Search"
            variant="outlined"
            value={searchTerm}
            onChange={handleSearchChange}
            style={{marginLeft:"10px"}}
          />
            {searchTerm && (
              <button onClick={handleClearSearch} className="clear-search-btn">Clear</button>
            )}
        </div>
        <div className="response-time-container">
          <span className="response-time-indicator">Response Time : </span>
          <span className="response-time-red">0 Days - <div className="sort-circle red-circle" /></span>
          <span className="response-time-yellow">3 Days - <div className="sort-circle yellow-circle" /></span>
        </div>
      </div>
      <Paper className='table'>
        <TableContainer className='tableContainer'>
          <Table>
            <TableHead className='tableHead'>
              <TableRow id="topRow">
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    className='tableCell'
                  >
                    <b>{column.label}</b>
                    {column.id === 'clientResponseTimeinDays' && (
                      <IconButton size="small" onClick={handleSortToggle}>
                        <SortIcon />
                      </IconButton>
                    )}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {Array.isArray(filteredClients) && filteredClients.map(client => (
                <TableRow key={client.clientId} className='tableRow'>
                  <TableCell className='tableCell'>{client.clientId}</TableCell>
                  <TableCell className='tableCell'>{client.clientName}</TableCell>
                  <TableCell className='tableCell'>{client.clientRequirement}</TableCell>
                  <TableCell className='tableCell'>{client.skills}</TableCell>
                  <TableCell id='responsecol' className='tableCell' style={getResponseTimeStyle(client.clientResponseTimeinDays)}>
                    {client.clientResponseTimeinDays}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </>
  );
}
