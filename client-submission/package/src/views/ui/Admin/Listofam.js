<<<<<<< HEAD
// import React, { useEffect, useState } from 'react';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
// import Paper from '@mui/material/Paper';
// import MenuItem from '@mui/material/MenuItem';
// import FormControl from '@mui/material/FormControl';
// import Select from '@mui/material/Select';
// import TextField from '@mui/material/TextField';
// import '../../css/listofam.css';
// import axios from 'axios';

// const rows = [
//   { Id: 1, Name: 'John Doe', Client: 'ABC Corp', Project: 'Project X', Email: 'john.doe@example.com' },
//   { Id: 2, Name: 'Jane Smith', Client: 'XYZ Inc', Project: 'Project Y', Email: 'jane.smith@example.com' },
//   { Id: 3, Name: 'Alice Johnson', Client: 'DEF Ltd', Project: 'Project Z', Email: 'alice.johnson@example.com' },
// ];

// export default function Listofam() {
//   const[rows,setRows]=useState([]);
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
        
//         const token = localStorage.getItem("token");
//         const headers = { "Authorization": "Bearer " + token };

//         const response = await axios.get('http://localhost:8092/api/user/users', { headers });
//         let details = response.data;

//         console.log('Fetched Details:', details);

//         const toBeSearched = 'Account Manager'.replace(/\s+/g, '').toLowerCase();
//         console.log(toBeSearched);
//         details = details.filter(item => {
//           return item.userRole.replace(/\s+/g, '').toLowerCase() === toBeSearched;
//         });

//         console.log('Filtered Details:', details);

//         const mappedDetails = details.map(item => ({
//           Id: item.userId,
//           Name: item.userName,
//           Email: item.email
//         }));

//         setRows(mappedDetails);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     fetchData();
//   }, []);
  
//   const [selectedColumn, setSelectedColumn] = useState('');
//   const [searchTerm, setSearchTerm] = useState('');

//   const handleColumnChange = (event) => {
//     setSelectedColumn(event.target.value);
//   };

//   const handleSearchTermChange = (event) => {
//     setSearchTerm(event.target.value);
//   };

//   const filteredRows = rows.filter((row) => {
//     if (selectedColumn === '') {
//       return true; 
//     } else {
//       return row[selectedColumn].toString().toLowerCase().includes(searchTerm.toLowerCase());
//     }
//   });

//   const renderHeaderCells = () => {
//     return (
//       <TableRow>
//         {Object.keys(rows[0]).map((column) => (
//           <TableCell key={column}>
//             <b>{column}</b>
//           </TableCell>
//         ))}
//       </TableRow>
//     );
//   };

//   const renderBodyRows = () => {
//     return filteredRows.map((row) => (
//       <TableRow key={row.Id}>
//         {Object.values(row).map((value, index) => (
//           <TableCell key={index}>{value}</TableCell>
//         ))}
//       </TableRow>
//     ));
//   };

//   return (
//     <>
//       <h1 id='hd'>List of Account Manager</h1>
//       <div className='uppercontainer'>
//         <FormControl variant="outlined">
//           <Select
//             className='filter-select'
//             value={selectedColumn}
//             onChange={handleColumnChange}
//             displayEmpty
//           >
//             {Object.keys(rows[0]).map((column) => (
//               <MenuItem key={column} value={column}>
//                 {column}
//               </MenuItem>
//             ))}
//           </Select>
//         </FormControl>
//         <TextField
//           label="Search"
//           variant="outlined"
//           value={searchTerm}
//           onChange={handleSearchTermChange}
//         />
//       </div>
//       <TableContainer component={Paper} className="table-container">
//         <Table sx={{ minWidth: 650 }} aria-label="simple table">
//           <TableHead>{renderHeaderCells()}</TableHead>
//           <TableBody>{renderBodyRows()}</TableBody>
//         </Table>
//       </TableContainer>
//     </>
//   );
// }

=======
>>>>>>> e6a59da572eea0d77748591d993ddcecdf4bb2b3
import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import '../../css/listofam.css';  
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Listofam() {
  const [rows, setRows] = useState([]);
  const [selectedColumn, setSelectedColumn] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const navigate=useNavigate();
  useEffect(() => {
    if(localStorage.role!=='admin'){
      navigate('/loginform');
    }
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const headers = { "Authorization": "Bearer " + token };

        let response = await axios.get('http://localhost:8092/api/user/users', { headers }); //fetched all user details
        let details = response.data;

        const toBeSearched = 'Account Manager'.replace(/\s+/g, '').toLowerCase(); // searching account manager by replacing trimming spaces and changing to lower case
        details = details.filter(item => {
          return item.userRole.replace(/\s+/g, '').toLowerCase() === toBeSearched;  
        });

        const mappedDetails = details.map(item => ({
          Id: item.userId,
          Username: item.userName,
          Email: item.email
        }));

        setRows(mappedDetails);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleColumnChange = (event) => {
    setSelectedColumn(event.target.value);
  };

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredRows = rows.filter((row) => {
    if (selectedColumn === '') {
      return true;
    } else {
      return row[selectedColumn].toString().toLowerCase().includes(searchTerm.toLowerCase());
    }
  });

  const renderHeaderCells = () => {
    if (rows.length === 0) return null;
    return (
      <TableRow>
        {Object.keys(rows[0]).map((column) => (
          <TableCell key={column}>
            <b>{column}</b>
          </TableCell>
        ))}
      </TableRow>
    );
  };

  const renderBodyRows = () => {
    return filteredRows.map((row) => (
      <TableRow key={row.Id} className='tr'>
        {Object.values(row).map((value, index) => (
          <TableCell key={index}>{value}</TableCell>
        ))}
      </TableRow>
    ));
  };

  return (
    <>
      <h1 id='hd'>List of Account Manager</h1>
      <div className='uppercontainer'>
        <FormControl variant="outlined">
          <Select
            className='filter-select'
            value={selectedColumn}
            onChange={handleColumnChange}
            displayEmpty
           
          >
            {rows.length > 0 && Object.keys(rows[0]).map((column) => (
              <MenuItem key={column} value={column}>
                {column}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          label="Search"
          variant="outlined"
          value={searchTerm}
          onChange={handleSearchTermChange}
        />
      </div>
      <TableContainer component={Paper} className="table-container">
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>{renderHeaderCells()}</TableHead>
          <TableBody>{renderBodyRows()}</TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
