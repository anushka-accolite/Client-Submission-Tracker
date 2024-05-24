// import * as React from 'react';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
// import Paper from '@mui/material/Paper';
// import Select from '@mui/material/Select';
// import MenuItem from '@mui/material/MenuItem';
// import FormControl from '@mui/material/FormControl';
// import InputLabel from '@mui/material/InputLabel';
// import TextField from '@mui/material/TextField';
// import axios from 'axios';

// function createData(id, name, experience, skill, status, clientname, remark) {
//   return { id, name, experience, skill, status, clientname, remark };
// }

// export default function MyComponent() {
//   const [selectedColumn, setSelectedColumn] = React.useState('Name');
//   const [searchTerm, setSearchTerm] = React.useState('');
//   const [sortOrder, setSortOrder] = React.useState('asc');
//   const [rows, setRows] = React.useState([]);

  
//   React.useEffect(() => {
//     const fetchData = async () => {
//       try {
//         let token = localStorage.getItem("token");
//         let headers = { "Authorization": `Bearer ${token}` };
//         let response = await axios.get('http://localhost:8092/api/submissions/getAll', { headers });
//         let val = response.data;
//         console.log(val);
  
//         const candidates = val.map(item => {
//           let skill = item.candidate.skills && Array.isArray(item.candidate.skills) ? item.candidate.skills.map(skill => skill.skill).join(', ') : 'N/A';
//           let clients=item.candidate.clients && Array.isArray(item.candidate.clients) ? item.candidate.clients.map(client => client.clientName).join(', ') : 'N/A';
//           return createData(
//             item.candidate.candidateId,
//             item.candidate.candidateName,
//             item.candidate.experience,
//             skill,
//             item.status,
//             clients,
//             item.remark || 'N/A'
//           );
//         });
  
//         setRows(candidates);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };
  
//     fetchData();
//   }, []);
  
//   const handleColumnChange = (event) => {
//     const selectedValue = event.target.value;
//     setSelectedColumn(selectedValue);
//     if (selectedValue === 'Candidate Id') {
//       const sortedRows = [...rows].sort((a, b) => (sortOrder === 'asc' ? a.id - b.id : b.id - a.id));
//       setRows(sortedRows);
//       // Toggle the sort order
//       setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
//     }
//   };

//   const handleSearchTermChange = (event) => {
//     setSearchTerm(event.target.value);
//   };

//   return (
//     <div>
//       <FormControl sx={{ m: 1, minWidth: 120 }} style={{ marginTop: "0.2px" }}>
//         <InputLabel id="column-label">Column</InputLabel>
//         <Select
//           labelId="column-label"
//           id="column-select"
//           value={selectedColumn}
//           label="Select Column"
//           onChange={handleColumnChange}
//         >
//           <MenuItem value="Name">Name</MenuItem>
//           <MenuItem value="Experience">Experience</MenuItem>
//           <MenuItem value="Skill">Skill</MenuItem>
//           <MenuItem value="Status">Status</MenuItem>
//           <MenuItem value="ClientName">ClientName</MenuItem>
//           <MenuItem value="Remark">Remark</MenuItem> {/* Add Remark as a column option */}
//         </Select>
//       </FormControl>
//       <TextField
//         id="search"
//         label="Search"
//         variant="outlined"
//         value={searchTerm}
//         onChange={handleSearchTermChange}
//       />
//       <TableContainer component={Paper}>
//         <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
//           <TableHead>
//             <TableRow>
//               <TableCell><b>Candidate Id</b></TableCell>
//               <TableCell align="right"><b>Name</b></TableCell>
//               <TableCell align="right"><b>Experience</b></TableCell>
//               <TableCell align="right"><b>Skill</b></TableCell>
//               <TableCell align="right"><b>Status</b></TableCell>
//               <TableCell align="right"><b>ClientName</b></TableCell>
//               <TableCell align="right"><b>Remark</b></TableCell> {/* Add Remark column */}
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {rows
//               .filter(row => row[selectedColumn.toLowerCase()] && row[selectedColumn.toLowerCase()].toString().toLowerCase().includes(searchTerm.toLowerCase()))
//               .map((row) => (
//                 <TableRow
//                   key={row.id}
//                   sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
//                 >
//                   <TableCell component="th" scope="row">
//                     {row.id}
//                   </TableCell>
//                   <TableCell align="right">{row.name}</TableCell>
//                   <TableCell align="right">{row.experience}</TableCell>
//                   <TableCell align="right">{row.skill}</TableCell>
//                   <TableCell align="right">{row.status}</TableCell>
//                   <TableCell align="right">{row.clientname}</TableCell>
//                   <TableCell align="right">{row.remark}</TableCell> {/* Render Remark */}
//                 </TableRow>
//               ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//     </div>
//   );
// }


import * as React from 'react';
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

function createData(id, name, experience, skill, status, clientname, remark, responseTime) {
  return { id, name, experience, skill, status, clientname, remark, responseTime };
}

export default function MyComponent() {
  const [selectedColumn, setSelectedColumn] = React.useState('Name');
  const [searchTerm, setSearchTerm] = React.useState('');
  const [sortOrder, setSortOrder] = React.useState('asc');
  const [rows, setRows] = React.useState([]);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        let token = localStorage.getItem("token");
        let headers = { "Authorization": `Bearer ${token}` };
        let response = await axios.get('http://localhost:8092/api/submissions/getAll', { headers });
        let val = response.data;
        console.log(val);

        const candidates = val.map(item => {
          let skill = item.candidate.skills && Array.isArray(item.candidate.skills) ? item.candidate.skills.map(skill => skill.skill).join(', ') : ' ';
          let clients = item.candidate.clients && Array.isArray(item.candidate.clients) ? item.candidate.clients.map(client => client.clientName).join(', ') : ' ';
          let responseTime = item.responseTime || 'N/A'; // Assuming responseTime is directly available
          console.log(item.status);
          return createData(
            item.candidate.candidateId,
            item.candidate.candidateName,
            item.candidate.experience,
            skill,
            item.candidate.candidateStatus,
            clients,
            item.remark || 'N/A',
            item.client.clientResponseTimeinDays
          );
        });
        
        setRows(candidates);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleColumnChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedColumn(selectedValue);
    handleSort(selectedValue);
  };

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSort = (column) => {
    const sortedRows = [...rows].sort((a, b) => {
      let aValue = a[column.toLowerCase()];
      let bValue = b[column.toLowerCase()];

      if (typeof aValue === 'string') aValue = aValue.toLowerCase();
      if (typeof bValue === 'string') bValue = bValue.toLowerCase();

      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    setRows(sortedRows);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 120 }} style={{ marginTop: "0.2px" }}>
        <InputLabel id="column-label">Column</InputLabel>
        <Select
          labelId="column-label"
          id="column-select"
          value={selectedColumn}
          label="Select Column"
          onChange={handleColumnChange}
        >
          <MenuItem value="Name">Name</MenuItem>
          <MenuItem value="Experience">Experience</MenuItem>
          <MenuItem value="Skill">Skill</MenuItem>
          <MenuItem value="Status">Status</MenuItem>
          <MenuItem value="ClientName">ClientName</MenuItem>
          <MenuItem value="Remark">Remark</MenuItem>
          <MenuItem value="ResponseTime">Response Time</MenuItem>
        </Select>
      </FormControl>
      <TextField
        id="search"
        label="Search"
        variant="outlined"
        value={searchTerm}
        onChange={handleSearchTermChange}
      />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell><b>Candidate Id</b></TableCell>
              <TableCell align="right"><b>Name</b></TableCell>
              <TableCell align="right"><b>Experience</b></TableCell>
              <TableCell align="right"><b>Skill</b></TableCell>
              <TableCell align="right"><b>Status</b></TableCell>
              <TableCell align="right"><b>ClientName</b></TableCell>
              <TableCell align="right"><b>Response Time</b></TableCell> 
              <TableCell align="right"><b>Remark</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .filter(row => row[selectedColumn.toLowerCase()] && row[selectedColumn.toLowerCase()].toString().toLowerCase().includes(searchTerm.toLowerCase()))
              .map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.id}
                  </TableCell>
                  <TableCell align="right">{row.name}</TableCell>
                  <TableCell align="right">{row.experience}</TableCell>
                  <TableCell align="right">{row.skill}</TableCell>
                  <TableCell align="right">{row.status}</TableCell>
                  <TableCell align="right">{row.clientname}</TableCell>
                  <TableCell align="right">{row.responseTime}</TableCell> 
                  <TableCell align="right">{row.remark}</TableCell> 
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
