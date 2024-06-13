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
import CircularProgress from '@mui/material/CircularProgress';
import '../../css/auditlog.css';

export default function AuditLog() {
    const [selectedColumn, setSelectedColumn] = useState('name');
    const [searchTerm, setSearchTerm] = useState('');
    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSubmissionsWithRevisions = async () => {
            try {
                let token = localStorage.getItem("token");
                let username = localStorage.getItem("username");
                let headers = { "Authorization": `Bearer ${token}` };
                
                let usersResponse = await axios.get('http://localhost:8092/api/user/users', { headers });
                let currentUser = usersResponse.data.find(user => user.userName === username);
                if (!currentUser) throw new Error('Current user not found');
                
                let submissionsResponse = await axios.get('http://localhost:8092/api/submissions/getAll', { headers });
                console.log('Submissions API Response:', submissionsResponse.data);

                if (!Array.isArray(submissionsResponse.data)) {
                    throw new Error('API response is not an array');
                }

                const submissionData = submissionsResponse.data.filter(submission => submission.users.userId === currentUser.userId);
                console.log("Fetched Submissions for current user:", submissionData);

                const submissionsWithRevisions = await Promise.all(submissionData.map(async submission => {
                    let historyResponse = await axios.get(`http://localhost:8092/api/submissions/${submission.submissionId}/history`, { headers });
                    console.log('Submission History API Response:', historyResponse.data);
                    
                    // Fetch client name
                    let submission_id = historyResponse.data[0][0];
                    let subObj = await axios.get(`http://localhost:8092/api/submissions/${submission_id}`, { headers });
                    let clientname = subObj.data.client.clientName;

                    // Map history data to expected format
                    let historyData = historyResponse.data.map(history => ({
                        s_id: history[0],
                        c_id: history[7],
                        name: history[9],
                        status: history[4],
                        remark: history[3],
                        revtype: history[2],
                        rev: new Date(history[6]).toLocaleString(),
                        clientName: clientname // Add clientName here
                    }));

                    return historyData.map(history => ({
                        s_id: submission.submissionId,
                        c_id: submission.candidate.candidateId,
                        name: submission.candidate.candidateName,
                        status: submission.status,
                        remark: submission.remark,
                        revtype: submission.revisionType || 0,
                        rev: new Date(submission.submissionDate).toLocaleString(),
                        clientName: clientname, // Add clientName here
                        ...history
                    }));
                }));

                setRows(submissionsWithRevisions.flat());
                setLoading(false); 
            } catch (error) {
                console.error('Error fetching submissions with revisions:', error);
                setLoading(false); 
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

    const handleClearSearch = () => {
        setSearchTerm('');
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
                    <MenuItem value="clientName">Client Name</MenuItem>
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
            {searchTerm && (
                <button onClick={handleClearSearch} className="clear-search-btn">Clear</button>
            )}
            {loading ? (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                    <CircularProgress />
                </div>
            ) : (
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                <TableCell><b>SubmissionID</b></TableCell>
                                <TableCell><b>CandidateID</b></TableCell>
                                <TableCell><b>Name</b></TableCell>
                                <TableCell><b>Client Name</b></TableCell>
                                <TableCell><b>Status</b></TableCell>
                                <TableCell><b>Remark</b></TableCell>
                                <TableCell><b>No. of Revisions</b></TableCell>
                                <TableCell><b>Revision</b></TableCell>
                               
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows
                                .filter(row => {
                                    const value = row[selectedColumn];
                                    return value && value.toString().toLowerCase().includes(searchTerm.toLowerCase());
                                })
                                .map((row, index) => (
                                    <TableRow className='trow'
                                        key={index}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell>{row.s_id}</TableCell>
                                        <TableCell>{row.c_id}</TableCell>
                                        <TableCell>{row.name}</TableCell>
                                        <TableCell>{row.clientName}</TableCell>
                                        <TableCell>{row.status}</TableCell>
                                        <TableCell>{row.remark}</TableCell>
                                        <TableCell>{row.revtype}</TableCell>
                                        <TableCell>{row.rev}</TableCell>
                                         
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </div>
    );
}
