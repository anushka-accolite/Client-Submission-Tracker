// import React, { useState } from 'react';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
// import Paper from '@mui/material/Paper';
// import FormControl from '@mui/material/FormControl';
// import Select from '@mui/material/Select';
// import TextField from '@mui/material/TextField';
// import { MenuItem } from '@mui/material';

// const rows = [
//   { Id: 1, name: 'John Doe', Experience: 5, Project: 'Project X', Email: 'john.doe@example.com' },
//   { Id: 2, name: 'Jane Smith', Experience: 3, Project: 'Project Y', Email: 'jane.smith@example.com' },
//   { Id: 3, name: 'Alice Johnson', Experience:2, Project: 'Project Z', Email: 'alice.johnson@example.com' },
// ];

// function Listofpm() {
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
//       return Object.values(row).some((value) =>
//         value.toString().toLowerCase().includes(searchTerm.toLowerCase())
//       );
//     } else {
//       return row[selectedColumn].toString().toLowerCase().includes(searchTerm.toLowerCase());
//     }
//   });

//   return (
//     <>
//       <h1>List of Project Manager</h1>
//       <div>
//         <FormControl variant="outlined" style={{ marginRight: '16px', minWidth: '120px' }}>
//           <Select className='uppercon'
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
//       <TableContainer component={Paper} className='pmtable' style={{marginTop:"10px"}} >
//         <Table sx={{ minWidth: 650 }} aria-label="simple table">
//           <TableHead>
//             <TableRow>
//               {Object.keys(rows[0]).map((column) => (
//                 <TableCell key={column}><b>{column}</b></TableCell>
//               ))}
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {filteredRows.map((row) => (
//               <TableRow key={row.id}>
//                 {Object.values(row).map((value, index) => (
//                   <TableCell key={index}>{value}</TableCell>
//                 ))}
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//     </>
//   );
// }

// export default Listofpm;

import React, { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import IconButton from '@mui/material/IconButton';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

const rows = [
  { Id: 1, name: 'John Doe', Experience: 5, Project: 'Project X', Email: 'john.doe@example.com' },
  { Id: 2, name: 'Jane Smith', Experience: 3, Project: 'Project Y', Email: 'jane.smith@example.com' },
  { Id: 3, name: 'Alice Johnson', Experience:2, Project: 'Project Z', Email: 'alice.johnson@example.com' },
];

function Listofpm() {
  const [selectedColumn, setSelectedColumn] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');

  const handleColumnChange = (event) => {
    setSelectedColumn(event.target.value);
  };

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSortToggle = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const sortedRows = [...rows].sort((a, b) => {
    if (sortOrder === 'asc') {
      return a.Experience - b.Experience;
    } else {
      return b.Experience - a.Experience;
    }
  });

  const filteredRows = sortedRows.filter((row) => {
    if (selectedColumn === '') {
      return Object.values(row).some((value) =>
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      );
    } else {
      return row[selectedColumn].toString().toLowerCase().includes(searchTerm.toLowerCase());
    }
  });

  return (
    <>
      <h1>List of Project Manager</h1>
      <div>
        <FormControl variant="outlined" style={{ marginRight: '16px', minWidth: '120px' }}>
          <Select className='uppercon'
            value={selectedColumn}
            onChange={handleColumnChange}
            displayEmpty
          >
            {Object.keys(rows[0]).map((column) => (
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
      <TableContainer component={Paper} className='pmtable' style={{marginTop:"10px",boxShadow:"0px 4px 8px rgba(0, 0, 0, 0.1)"}} >
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {Object.keys(rows[0]).map((column) => (
                <TableCell key={column}>
                  <b>{column}</b>
                  {column === 'Experience' &&
                    <IconButton onClick={handleSortToggle} size="small">
                      {sortOrder === 'asc' ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />}
                    </IconButton>
                  }
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredRows.map((row) => (
              <TableRow key={row.Id}>
                {Object.keys(row).map((key) => (
                  <TableCell key={key}>{row[key]}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default Listofpm;

