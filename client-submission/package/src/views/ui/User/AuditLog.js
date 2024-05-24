// import React, { useState } from 'react';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
// import Paper from '@mui/material/Paper';
// import TextField from '@mui/material/TextField';
// import MenuItem from '@mui/material/MenuItem';
// import Select from '@mui/material/Select';
// import InputLabel from '@mui/material/InputLabel';
// import FormControl from '@mui/material/FormControl';
// import '../../css/auditlog.css';

// function createData(s_id, c_id, name, status, remark, revtype, rev) {
//     return { s_id, c_id, name, status, remark, revtype, rev };
// }

// export default function AuditLog() {
//     const [selectedColumn, setSelectedColumn] = useState('Name');
//     const [searchTerm, setSearchTerm] = useState('');
//     const [sortOrder, setSortOrder] = useState('asc');
//     const [rows, setRows] = useState([
//         createData(1, 1, 'abc', 'selected', 'good', 1, new Date(2024, 4, 22, 13, 4)),
//     ]);

//     const handleColumnChange = (event) => {
//         setSelectedColumn(event.target.value);
//     };

//     const handleSearchTermChange = (event) => {
//         setSearchTerm(event.target.value);
//     };

//     return (
//         <div>
//             <FormControl sx={{ m: 1, minWidth: 120 }} style={{ marginTop: "0.2px" }}>
//                 <InputLabel id="column-label">Column</InputLabel>
//                 <Select
//                     labelId="column-label"
//                     id="column-select"
//                     value={selectedColumn}
//                     label="Column"
//                     onChange={handleColumnChange}
//                 >
//                     <MenuItem value="S_id">SubmissionID</MenuItem>
//                     <MenuItem value="C_id">CandidateID</MenuItem>
//                     <MenuItem value="Name">Name</MenuItem>
//                     <MenuItem value="Status">Status</MenuItem>
//                     <MenuItem value="Remark">Remark</MenuItem>
//                     <MenuItem value="Revisions">No. of Revisions</MenuItem>
//                     <MenuItem value="RevOn">Revision</MenuItem>
//                 </Select>
//             </FormControl>
//             <TextField
//                 id="search"
//                 label="Search"
//                 variant="outlined"
//                 value={searchTerm}
//                 onChange={handleSearchTermChange}
//             />
//             <TableContainer component={Paper}>
//                 <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
//                     <TableHead>
//                         <TableRow>
//                             <TableCell><b>SubmissionID</b></TableCell>
//                             <TableCell><b>CandidateID</b></TableCell>
//                             <TableCell align="right"><b>Name</b></TableCell>
//                             <TableCell align="right"><b>Status</b></TableCell>
//                             <TableCell align="right"><b>Remark</b></TableCell>
//                             <TableCell align="right"><b>No. of Revisions</b></TableCell>
//                             <TableCell align="right"><b>Revision</b></TableCell>
//                         </TableRow>
//                     </TableHead>
//                     <TableBody>
//                         {rows
//                             .filter(row => row[selectedColumn.toLowerCase()] && row[selectedColumn.toLowerCase()].toString().toLowerCase().includes(searchTerm.toLowerCase()))
//                             .map((row) => (
//                                 <TableRow
//                                     key={row.s_id}
//                                     sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
//                                 >
//                                     <TableCell component="th" scope="row">
//                                         {row.s_id}
//                                     </TableCell>
//                                     <TableCell>{row.c_id}</TableCell>
//                                     <TableCell align="right">{row.name}</TableCell>
//                                     <TableCell align="right">{row.status}</TableCell>
//                                     <TableCell align="right">{row.remark}</TableCell>
//                                     <TableCell align="right">{row.revtype}</TableCell>
//                                     <TableCell align="right">{row.rev.toLocaleString()}</TableCell>
//                                 </TableRow>
//                             ))}
//                     </TableBody>
//                 </Table>
//             </TableContainer>
//         </div>
//     );
// }

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
// import Paper from '@mui/material/Paper';
// import TextField from '@mui/material/TextField';
// import MenuItem from '@mui/material/MenuItem';
// import Select from '@mui/material/Select';
// import InputLabel from '@mui/material/InputLabel';
// import FormControl from '@mui/material/FormControl';
// import '../../css/auditlog.css';

// function createData(s_id, c_id, name, status, remark, revtype, rev) {
//     return { s_id, c_id, name, status, remark, revtype, rev };
// }

// export default function AuditLog() {
//     const [selectedColumn, setSelectedColumn] = useState('name');
//     const [searchTerm, setSearchTerm] = useState('');
//     const [rows, setRows] = useState([]);

//     useEffect(() => {
//         const fetchSubmissionsWithRevisions = async () => {
//             try {
//                 let token = localStorage.getItem("token");
//                 let headers = { "Authorization": `Bearer ${token}` };

//                 // Fetch all submissions
//                 let submissionsResponse = await axios.get('http://localhost:8092/api/submissions/getAll', { headers });
//                 console.log('Submissions API Response:', submissionsResponse.data);

//                 if (!Array.isArray(submissionsResponse.data)) {
//                     throw new Error('API response is not an array');
//                 }

//                 const submissionData = submissionsResponse.data;
//                 console.log("Fetched Submissions:", submissionData);

//                 // Fetch revision history for each submission and combine them
//                 const submissionsWithRevisions = await Promise.all(submissionData.map(async submission => {
//                     let historyResponse = await axios.get(`http://localhost:8092/api/submissions/${submission.submissionId}/history`, { headers });
//                     console.log('Submission History API Response:', historyResponse.data);

//                     // Map history data to createData format
//                     let historyData = historyResponse.data.map(history => ({
//                         submissionId: history[0],
//                         candidateId: history[1],
//                         candidateName: history[8],
//                         status: history[4],
//                         remark: history[3],
//                         revisionType: history[6],
//                         submissionDate: new Date(history[13])
                
//                     }));

//                     return {
//                         submissionId: submission.submissionId,
//                         candidateId: submission.candidate.candidateId,
//                         candidateName: submission.candidate.candidateName,
//                         status: submission.status,
//                         remark: submission.remark,
//                         revisionType: submission.revisionType || 0,
//                         submissionDate: new Date(submission.submissionDate),
//                         history: historyData
//                     };
//                 }));

//                 setRows(submissionsWithRevisions);
//             } catch (error) {
//                 console.error('Error fetching submissions with revisions:', error);
//             }
//         };

//         fetchSubmissionsWithRevisions();
//     }, []);

//     const handleColumnChange = (event) => {
//         setSelectedColumn(event.target.value);
//     };

//     const handleSearchTermChange = (event) => {
//         setSearchTerm(event.target.value);
//     };

//     return (
//         <div>
//             <FormControl sx={{ m: 1, minWidth: 120 }} style={{ marginTop: "0.2px" }}>
//                 <InputLabel id="column-label">Column</InputLabel>
//                 <Select
//                     labelId="column-label"
//                     id="column-select"
//                     value={selectedColumn}
//                     label="Column"
//                     onChange={handleColumnChange}
//                 >
//                     <MenuItem value="s_id">SubmissionID</MenuItem>
//                     <MenuItem value="c_id">CandidateID</MenuItem>
//                     <MenuItem value="name">Name</MenuItem>
//                     <MenuItem value="status">Status</MenuItem>
//                     <MenuItem value="remark">Remark</MenuItem>
//                     <MenuItem value="revtype">No. of Revisions</MenuItem>
//                     <MenuItem value="rev">Revision</MenuItem>
//                 </Select>
//             </FormControl>
//             <TextField
//                 id="search"
//                 label="Search"
//                 variant="outlined"
//                 value={searchTerm}
//                 onChange={handleSearchTermChange}
//             />
//             <TableContainer component={Paper}>
//                 <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
//                     <TableHead>
//                         <TableRow>
//                             <TableCell><b>SubmissionID</b></TableCell>
//                             <TableCell><b>CandidateID</b></TableCell>
//                             <TableCell align="right"><b>Name</b></TableCell>
//                             <TableCell align="right"><b>Status</b></TableCell>
//                             <TableCell align="right"><b>Remark</b></TableCell>
//                             <TableCell align="right"><b>No. of Revisions</b></TableCell>
//                             <TableCell align="right"><b>Revision</b></TableCell>
//                         </TableRow>
//                     </TableHead>
//                     <TableBody>
//                 {rows
//                             .filter(row => {
//                                 const value = row[selectedColumn]; // Dynamically access property based on selected column
//                                 return value && value.toString().toLowerCase().includes(searchTerm.toLowerCase());
//                             })
//                             .map((row, index) => (
//                                 <TableRow
//                                     key={index}
//                                     sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
//                                 >
//                                     <TableCell component="th" scope="row">
//                                         {row.submissionId}
//                                     </TableCell>
//                                     <TableCell>{row.candidateId}</TableCell>
//                                     <TableCell align="right">{row.candidateName}</TableCell>
//                                     <TableCell align="right">{row.status}</TableCell>
//                                     <TableCell align="right">{row.remark}</TableCell>
//                                     <TableCell align="right">{row.revisionType}</TableCell>
//                                     <TableCell align="right">{row.submissionDate.toLocaleString()}</TableCell>
//                                 </TableRow>
//                             ))}
//                 </TableBody>

//                 </Table>
//             </TableContainer>
//         </div>
//     );
// }

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import '../../css/auditlog.css';

export default function AuditLog() {
    const [selectedColumn, setSelectedColumn] = useState('name');
    const [searchTerm, setSearchTerm] = useState('');
    const [rows, setRows] = useState([]);

    useEffect(() => {
        const fetchSubmissionsWithRevisions = async () => {
            try {
                let token = localStorage.getItem("token");
                let headers = { "Authorization": `Bearer ${token}` };

                // Fetch all submissions
                let submissionsResponse = await axios.get('http://localhost:8092/api/submissions/getAll', { headers });
                console.log('Submissions API Response:', submissionsResponse.data);

                if (!Array.isArray(submissionsResponse.data)) {
                    throw new Error('API response is not an array');
                }

                const submissionData = submissionsResponse.data;
                console.log("Fetched Submissions:", submissionData);

                // Fetch revision history for each submission and combine them
                const submissionsWithRevisions = await Promise.all(submissionData.map(async submission => {
                    let historyResponse = await axios.get(`http://localhost:8092/api/submissions/${submission.submissionId}/history`, { headers });
                    console.log('Submission History API Response:', historyResponse.data);

                    // Map history data to expected format
                    let historyData = historyResponse.data.map(history => ({
                        s_id: history[0],
                        c_id: history[1],
                        name: history[12],
                        status: history[13],
                        remark: history[3],
                        revtype: history[2],
                        rev: new Date(history[6]).toLocaleString()
                    }));

                    return historyData.map(history => ({
                        s_id: submission.submissionId,
                        c_id: submission.candidate.candidateId,
                        name: submission.candidate.candidateName,
                        status: submission.status,
                        remark: submission.remark,
                        revtype: submission.revisionType || 0,
                        rev: new Date(submission.submissionDate).toLocaleString(),
                        ...history
                    }));
                }));

                setRows(submissionsWithRevisions.flat());
            } catch (error) {
                console.error('Error fetching submissions with revisions:', error);
            }
        };

        fetchSubmissionsWithRevisions();
    }, []);

    const handleColumnChange = (event) => {
        setSelectedColumn(event.target.value);
    };

    const handleSearchTermChange = (event) => {
        setSearchTerm(event.target.value);
    };

    return (
        <div>
            <FormControl sx={{ m: 1, minWidth: 120 }} style={{ marginTop: "0.2px" }}>
                <InputLabel id="column-label">Column</InputLabel>
                <Select
                    labelId="column-label"
                    id="column-select"
                    value={selectedColumn}
                    label="Column"
                    onChange={handleColumnChange}
                >
                    <MenuItem value="s_id">SubmissionID</MenuItem>
                    <MenuItem value="c_id">CandidateID</MenuItem>
                    <MenuItem value="name">Name</MenuItem>
                    <MenuItem value="status">Status</MenuItem>
                    <MenuItem value="remark">Remark</MenuItem>
                    <MenuItem value="revtype">No. of Revisions</MenuItem>
                    <MenuItem value="rev">Revision</MenuItem>
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
                            <TableCell><b>SubmissionID</b></TableCell>
                            <TableCell><b>CandidateID</b></TableCell>
                            <TableCell><b>Name</b></TableCell>
                            <TableCell><b>Status</b></TableCell>
                            <TableCell><b>Remark</b></TableCell>
                            <TableCell><b>No. of Revisions</b></TableCell>
                            <TableCell><b>Revision</b></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows
                            .filter(row => {
                                const value = row[selectedColumn]; // Dynamically access property based on selected column
                                return value && value.toString().toLowerCase().includes(searchTerm.toLowerCase());
                            })
                            .map((row, index) => (
                                <TableRow
                                    key={index}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell>{row.s_id}</TableCell>
                                    <TableCell>{row.c_id}</TableCell>
                                    <TableCell>{row.name}</TableCell>
                                    <TableCell>{row.status}</TableCell>
                                    <TableCell>{row.remark}</TableCell>
                                    <TableCell>{row.revtype}</TableCell>
                                    <TableCell>{row.rev}</TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}










