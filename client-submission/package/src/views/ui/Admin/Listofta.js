// import * as React from 'react';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
// import Paper from '@mui/material/Paper';
// import '../../css/listofta.css';
// const rows = [
//   { id: 1, name: 'John Doe', experience: '3 years', project: 'Project A', email: 'john.doe@example.com' },
//   { id: 2, name: 'Jane Smith', experience: '5 years', project: 'Project B', email: 'jane.smith@example.com' },
//   { id: 3, name: 'Alice Johnson', experience: '2 years', project: 'Project C', email: 'alice.johnson@example.com' },
// ];

// export default function Listofta() {
//   return (
//     <>
//       <h1>List of Talent Acquisition</h1>
//       <TableContainer component={Paper}>
//         <Table sx={{ minWidth: 650 }} aria-label="simple table">
//           <TableHead>
//             <TableRow>
//               <TableCell>Id</TableCell>
//               <TableCell align="right"><b>Name</b></TableCell>
//               <TableCell align="right"><b>Experience</b></TableCell>
//               <TableCell align="right"><b>Project</b></TableCell>
//               <TableCell align="right"><b>Email</b></TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {rows.map((row) => (
//               <TableRow
//                 key={row.id}
//                 sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
//               >
//                 <TableCell component="th" scope="row">
//                   {row.id}
//                 </TableCell>
//                 <TableCell align="right">{row.name}</TableCell>
//                 <TableCell align="right">{row.experience}</TableCell>
//                 <TableCell align="right">{row.project}</TableCell>
//                 <TableCell align="right">{row.email}</TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//     </>
//   );
// }

import React, { useState } from 'react';
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
import '../../css/listofta.css';

const rows = [
  { Id: 1, Name: 'John Doe', Experience: 3, Project: 'Project A', Email: 'john.doe@example.com' },
  { Id: 2, Name: 'Jane Smith', Experience: 5, Project: 'Project B', Email: 'jane.smith@example.com' },
  { Id: 3, Name: 'Alice Johnson', Experience: 2, Project: 'Project C', Email: 'alice.johnson@example.com' },
];

export default function Listofta() {
  const [selectedColumn, setSelectedColumn] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const handleColumnChange = (event) => {
    setSelectedColumn(event.target.value);
  };

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredRows = rows.filter((row) => {
    if (selectedColumn === 'id') {
      return row[selectedColumn] === parseInt(searchTerm);
    } else {
      return Object.values(row).some((value) =>
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
  });

  const renderHeaderCells = () => {
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
      <TableRow key={row.id}>
        {Object.values(row).map((value, index) => (
          <TableCell key={index}>{value}</TableCell>
        ))}
      </TableRow>
    ));
  };

  return (
    <>
      <h1>List of Talent Acquisition</h1>
      <div className='uppercon'>
        <FormControl variant="outlined" style={{ marginRight: '16px', minWidth: '120px' }}>
          <Select
            className="dropdown"
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
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>{renderHeaderCells()}</TableHead>
          <TableBody>{renderBodyRows()}</TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
