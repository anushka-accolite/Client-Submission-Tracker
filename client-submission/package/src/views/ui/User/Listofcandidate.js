
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
import Checkbox from '@mui/material/Checkbox';
import '../../css/listofcandidate.css';
import Chart from 'chart.js/auto';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import TablePagination from '@mui/material/TablePagination';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {  Dialog, DialogTitle, DialogContent, DialogActions } from '@material-ui/core';



function createData(id, name, email, experience, skill, status, IsEmployee, daysToLWD, remark) {
  return { id, name, email, experience, skill, status, IsEmployee, daysToLWD, remark };
}

const statusOptions = ['Selected', 'Rejected', 'Submitted','Pending', 'OnHold', 'InterviewScheduled'];
// const skillsOptions = ['Angular', 'React', 'Java', 'Python', 'Spring', 'JavaScript'];
const skillsOptions = [
  'Agile Methodologies',
  'AWS',
  'Angular',
  'Azure',
  'Bitbucket',
  'CI',
  'CD',
  'C#',
  'Communication Skills',
  'Continuous Learning',
  'Creativity',
  'Debugging',
  'Design Patterns',
  'Django',
  'Docker',
  'Express.js',
  'Flask',
  'Git',
  'GitHub',
  'GitLab',
  'Google Cloud Platform',
  'GraphQL',
  'HTML/CSS',
  'Integration Testing',
  'Java',
  'Jenkins',
  'Kanban',
  'Kubernetes',
  'MongoDB',
  'MySQL',
  'Node.js',
  'OWASP Top 10',
  'PHP',
  'PostgreSQL',
  'Problem-Solving',
  'Python',
  'React.js',
  'Redis',
  'RESTful APIs',
  'Ruby on Rails',
  'Scrum',
  'Security Best Practices',
  'Software Architecture',
  'Spring Boot',
  'SQL',
  'Technical Writing',
  'Teamwork',
  'Time Management',
  'Unit Testing',
  'Vue.js'
];

const columns = [
  // { id: 'checkbox', label: '' },  
  { id:'id',label:"Candidate Id"},
  { id: 'name', label: 'Candidate Name',required: true },
  { id: 'email', label: 'Email',required: true },
  { id: 'experience', label: 'Exp ',required: true },
  { id: 'skill', label: 'Skill ',required: true },
  { id: 'status', label: 'Status' },
  { id: 'remark', label: 'Remark' },
  { id: 'IsEmployee', label: "Is Accolite\nEmployee ",required: true },
  { id: 'daysToLWD', label: 'Last Working Date'},
  { id: 'delete', label: 'Delete' },
  { id: 'add', label: 'Add' },
];

const createDataInd = (status, color) => {
  return { status, color };
};

const rowsInd = [
  createDataInd('Selected', 'Green'),
  createDataInd('Rejected', 'Red'),
  createDataInd('Submitted', 'Grey'),
  createDataInd('Pending', 'Yellow'),
  createDataInd('OnHold', 'Orange'),
  createDataInd('InterviewScheduled', 'Pink')
];

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 450,
  maxHeight: 550,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  overflowY: 'auto',
};

export default function Listofcandidate() {
  const [rows, setRows] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedColumn, setSelectedColumn] = useState('');
  const [open, setOpen] = useState(false);
  const [openBox, setOpenBox] = useState(false);
  const [newCandidate, setNewCandidate] = useState({});
  const pieChartRef = useRef(null);
  const chartInstance = useRef(null);
  const navigate = useNavigate();
  const [selectedRow, setSelectedRow] = useState();
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [uploadError, setUploadError] = useState(false);
  const [remark, setRemark] = useState("");
  const [remarkModalOpen, setRemarkModalOpen] = useState(false);
  const [newStatus, setNewStatus] = useState([]);
  const [selectedCandidates, setSelectedCandidates] = useState([]);
  const [masterChecked, setMasterChecked] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [sub,setSub] = useState([]);
  const [isEmployee,setIsEmployee]=useState("Yes");
  
 

    const fetchCandidates = async () => {
    try {
      let token = localStorage.getItem("token");
      let headers = { "Authorization": `Bearer ${token}` };
      const response = await axios.get('http://localhost:8092/api/candidates/getAll', { headers });
      console.log('Candidates API Response:', response.data);
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
            console.log(`Skills API Response for candidate ${item.candidateId}:`, skillsResponse.data);
            const processedSkills = skillsResponse.data.map(skill => {
              if (skill.endsWith('=')) {
                return skill.slice(0, -1);
              }
              return skill;
            });
            let clientRes=await axios.get(`http://localhost:8092/api/admin/${localStorage.getItem("clientId")}`,{headers});
            console.log(clientRes.data);
            let users_array = clientRes.data.users;
            let submissionRes='N/A';
            for(let user of users_array)
            {
              let submission = await axios.get(`http://localhost:8092/api/submissions/${localStorage.getItem("clientId")}/candidates/${item.candidateId}/users/${user.userId}`,{headers});
              console.log(submission.data);
              if(submission.data !== "Submission not found")
              {
                submissionRes=submission.data;
              }
            }
            let statusRes="Pending";
            if(submissionRes === "N/A")
            {
              statusRes="Pending";
            }
            else
            {
              statusRes=submissionRes.status;
            }
            console.log(statusRes);
           
            const skillsString = processedSkills.join(', ');
            const daysToLWD = item.last_working_day ? item.last_working_day : 'N/A';
            return createData(
              item.candidateId,
              item.candidateName,
              item.candidateEmail,
              item.experience,
              skillsString,
              // item.candidateStatus,
              statusRes,
              item.isAccoliteEmployee,
              daysToLWD !== 'N/A' ? new Date(daysToLWD).toLocaleDateString() : 'N/A',
              localStorage.getItem("remark")
            );
          })
      );
      console.log(candidatesWithSkills)
      setRows(candidatesWithSkills);
    } catch (error) {
      console.error('Error fetching candidates or skills:', error);
    }
  };

  const fetchSubmissions = async ()=>{
    let token = localStorage.getItem("token");
    let headers = { "Authorization": `Bearer ${token}` };
    let submission_data = await axios.get("http://localhost:8092/api/submissions/getAll",{headers});
    console.log(submission_data.data);
    submission_data.data.forEach((item)=>{
      sub.push(item);
    })
    setSub(sub);
    console.log(sub);
  }

  useEffect( ()=>{
    const role=localStorage.getItem("role");
    if(role!=="user"){
      navigate("/loginform");
    }
    fetchCandidates();
    console.log(rows);
   
    //let submission_data = await axios.get("http://localhost:8092/api/submissions/getAll",{headers});
    fetchSubmissions();

  },[])
  const handleClearSearch = () => {
    setSearchTerm('');
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleColumnChange = (e) => {
    setSelectedColumn(e.target.value);
  };

  const handleFileChange = (e) => {
    console.log('File selected:', e.target.files[0]);
    setSelectedFile(e.target.files[0]);
    console.log(selectedFile);
    setUploadSuccess(false);
    setUploadError(false);
  };

  const handleUpload = async () => {
    try {
      const requiredFields = ['name', 'email', 'experience', 'skill'];
    const missingFields = requiredFields.filter(field => !newCandidate[field]);

    // if (missingFields.length > 0) {
    //   alert(`Please fill in all required fields: ${missingFields.join(', ')}`);
    //   return;
    // }
      let token = localStorage.getItem("token");
      if (!selectedFile) {
        console.error('No file selected');
        return;
      }

      const formData = new FormData();
      formData.append('file', selectedFile);

      const response = await axios.post('http://localhost:8092/api/candidates/product/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      });

      console.log('Upload Response:', response.data);
      setUploadSuccess(true);
    } catch (error) {
      console.error('Error uploading file:', error);
      setUploadError(true);
    }
    setTimeout(() => {
      window.location.reload();
    }, 3000);
  };

  const handleDelete = async (id) => {
    try {
      let token = localStorage.getItem("token");
      let headers = { "Authorization": `Bearer ${token}`, };
      let x = await axios.get(`http://localhost:8092/api/candidates/${id}`, { headers });
      console.log("Deleted id", x.data);
      x.data.isDeleted = true;
      const val = x.data;

      await axios.put(`http://localhost:8092/api/candidates/${id}`, val, { headers });

      toast.success("Deleted successfully");
      const timeoutId = setTimeout(() => {
        navigate(0);
      }
        , 8000);

    } catch (error) {
      toast.error("Error deleting candidate");
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

      let userObj = await axios.get('http://localhost:8092/api/user/users', { headers });
      let clientId = localStorage.getItem("clientId");
      let username = localStorage.getItem("username");
      let client=await axios.get(`http://localhost:8092/api/admin/${clientId}`,{headers});
      let users_array=client.data.users;
      console.log(users_array);
      let user = userObj.data.find((item) => item.userName === username);
      let flag=false;
      for(let user of users_array)
      {
        var submission = await axios.get(`http://localhost:8092/api/submissions/${clientId}/candidates/${updatedCandidate.candidateId}/users/${user.userId}`, { headers });
      console.log(submission);
      if (submission.data !== "Submission not found") {
        let subId = submission.data.submissionId;
        let subData = submission.data;
        subData.status = status;
        subData.remark = localStorage.getItem("remark");
        console.log(remark);
        let updatedSubmission = await axios.put(`http://localhost:8092/api/submissions/${subId}`, {
          status: status,
          submissionDate: subData.submissionDate,
          isDeleted: subData.isDeleted,
          ...subData
        }, { headers });
        console.log(updatedSubmission.data);
        flag=true;
      }
      }
      if(flag===false)
      {
        let token = localStorage.getItem("token");
        let headers = { "Authorization": `Bearer ${token}`, 'Content-Type': 'application/json' };
    
        // Fetch candidate details and update status to "Pending"
        let response = await axios.get(`http://localhost:8092/api/candidates/${id}`, { headers });
        let updatedCandidate = response.data;
        updatedCandidate.candidateStatus = "Pending";
        await axios.put(`http://localhost:8092/api/candidates/${id}`, updatedCandidate, { headers });
    
        // Update the rows state with the "Pending" status
        const updatedRows = rows.map(row => (row.id === id ? { ...row, status: "Pending" } : row));
        setRows(updatedRows);
    
        alert("First add the candidate");
      }
        fetchCandidates();
      
    } catch (error) {
      
      console.error('Error updating candidate status:', error);

    // Set the candidate status to "Pending" in case of an error
    let token = localStorage.getItem("token");
    let headers = { "Authorization": `Bearer ${token}`, 'Content-Type': 'application/json' };

    // Fetch candidate details and update status to "Pending"
    let response = await axios.get(`http://localhost:8092/api/candidates/${id}`, { headers });
    let updatedCandidate = response.data;
    updatedCandidate.candidateStatus = "Pending";
    await axios.put(`http://localhost:8092/api/candidates/${id}`, updatedCandidate, { headers });

    // Update the rows state with the "Pending" status
    const updatedRows = rows.map(row => (row.id === id ? { ...row, status: "Pending" } : row));
    setRows(updatedRows);

    alert("First add the candidate");
    fetchCandidates();

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
      case 'Submitted':
        return 'grey';
      case 'OnHold':
        return 'orange';
      case 'InterviewScheduled':
        return 'pink';
      default:
        return 'inherit';
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  
  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
    setPage(0); 
  };

  const filteredRows = rows.filter((row) =>
    selectedColumn && searchTerm
      ? row[selectedColumn] && row[selectedColumn].toString().toLowerCase().includes(searchTerm.toLowerCase())
      : !row.isDeleted
  );

  const startIndex = page * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;

  const paginatedRows = filteredRows.slice(startIndex, endIndex);

  const handleAdd = async (id, newStatus) => {
    try {
      console.log(newStatus);
      let token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found");
      }

      let headers = { "Authorization": `Bearer ${token}` };
      let response = await axios.get(`http://localhost:8092/api/candidates/${id}`, { headers });
      let candidateToAdd = response.data;
      candidateToAdd.isDeleted = false;
      console.log(candidateToAdd);
      let userObj = await axios.get(`http://localhost:8092/api/user/users`, { headers });
      let username = localStorage.getItem("username");
      let user = userObj.data.find((item) => item.userName === username);
      if (!user) {
        throw new Error("User not found");
      }

      let clientId = localStorage.getItem("clientId");

      let clientObject = await axios.get(`http://localhost:8092/api/admin/${clientId}`, { headers });
      console.log(clientObject.data);
      let clientData = clientObject.data;

      console.log(headers);
      if (!(candidateToAdd.clients.some(candidateClient => candidateClient.clientId === clientData.clientId))) {
        console.log("Hello");
        let response = await axios.put(`http://localhost:8092/api/submissions/clients/${clientData.clientId}/candidates/${candidateToAdd.candidateId}/submit/${user.userId}`, {}, { headers });
        let resData = response.data;
        console.log(resData);
        let updatedSubmission = await axios.get(`http://localhost:8092/api/submissions/${clientData.clientId}/candidates/${candidateToAdd.candidateId}/users/${user.userId}`, { headers });
        updatedSubmission.data.status = newStatus;

        console.log(updatedSubmission.data);
        let data = updatedSubmission.data;
        console.log(remark);
        data.remark = remark;
        data.status="Submitted";
        let update = await axios.put(`http://localhost:8092/api/submissions/${updatedSubmission.data.submissionId}`, {
          // status: newStatus,
          status : "Submitted",
          ...data
        }, { headers });
        setTimeout(()=>{
          window.location.reload();

        },5000);
        toast.success("Candidate Added Successfully");
        let client_candidate = await axios.post(`http://localhost:8092/api/candidate-client/link?candidateId=${candidateToAdd.candidateId}&clientId=${clientData.clientId}`, {}, { headers });
        console.log("client_candidate", client_candidate);
        return;
      }
      try {
        var existingSubmissionResponse = await axios.get(`http://localhost:8092/api/submissions/candidate/${candidateToAdd.candidateId}`, { headers });

        var existingSubmission = existingSubmissionResponse.data;
        console.log(existingSubmission);
      } catch (error) {
        if (error.response && error.response.status === 404) {
          var existingSubmission = false;
          console.log(existingSubmission);
        } else {
          console.error('Error:', error);
        }
      }

      console.log("existingSubmission", existingSubmission);
      let flag = 0;

      if (existingSubmission) {
        let users_array=clientData.users;
        console.log(users_array);
        for (let user of users_array) {
            let submission = await axios.get(`http://localhost:8092/api/submissions/${clientData.clientId}/candidates/${candidateToAdd.candidateId}/users/${user.userId}`, { headers });
            console.log(submission);
            if (submission.data && submission.data !== "Submission not found") {
              let subData = submission.data;
              let subObj = await axios.get(`http://localhost:8092/api/submissions/${subData.submissionId}`, { headers });
              subObj = subObj.data;
              console.log(subData);
              subObj.status = newStatus;
              subObj.remark = localStorage.getItem("remark");
              console.log(subObj.remark);
              let updatedSubmission = await axios.put(`http://localhost:8092/api/submissions/${subData.submissionId}`, {
                status: newStatus,
                submissionDate: subObj.submissionDate,
                isDeleted: subObj.isDeleted,
                remark: subObj.remark,
                ...subObj
              }, { headers });
              console.log(updatedSubmission);
              toast.success("Candidate submission updated successfully!");
            }
          }
        }
        
            

      setSelectedRow(id);


    } catch (error) {
      console.error('Error adding candidate:', error);
      toast.error('Error submitting candidate');
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

  const handleOpenModal = () => {
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if(name==='IsEmployee'){
      setIsEmployee(value);
    }
    setNewCandidate((prev) => ({
      ...prev,
      [name]: value,
    }));
    console.log(newCandidate);
  };

  const handleFormSubmit = async (e) => {
    const requiredFields = ['name', 'email', 'experience', 'skill'];
    const missingFields = requiredFields.filter(field => !newCandidate[field]);

    if (missingFields.length > 0) {
      alert(`Please fill in all required fields: ${missingFields.join(', ')}`);
      return;
    }
    e.preventDefault();
    console.log(newCandidate.id);
    let skill_set = newCandidate.skill;
    console.log(skill_set);
    console.log(newCandidate.IsEmployee);
    const candidate = {
      candidateName: newCandidate.name,
      candidateEmail: newCandidate.email,
      candidateStatus: 'Pending' || newCandidate.status,
      last_working_day: newCandidate.daysToLWD,
      isAccoliteEmployee: newCandidate.IsEmployee || 'Yes',
      experience: newCandidate.experience,
      isDeleted: false,
      skills: newCandidate.skill
    }
    try {
      let token = localStorage.getItem("token");
      let headers = { "Authorization": `Bearer ${token}` }
      console.log(candidate);
      skill_set = skill_set.map((skill) => skill);
      console.log(skill_set);
      let createCandidate = await axios.post('http://localhost:8092/api/candidates', candidate, { headers });
      console.log(createCandidate);

      console.log(skill_set);
      console.log(candidate.skills);
      candidate.skills.map(async (skills) => {
        console.log(skills);
        let candidateSkill = await axios.post(`http://localhost:8092/api/candidates/${createCandidate.data.candidateId}/skills`, skills, { headers });
        console.log(candidateSkill);
        console.log(candidate);
        console.log(skills);
        toast.success("Candidate added successfully");
        setTimeout(() => {
          window.location.reload();
        }, 3000);

      })

    }
    catch (error) {
      toast.error("");
      console.log(error);
    }
    setNewCandidate({});
  }

  const handleOpenRemarkModal = (candidate) => {
    setRemarkModalOpen(true);
  };

  const handleCloseRemarkModal = () => {
    setRemarkModalOpen(false);
  };

  const handleRemark =async () => {
    try{
           
                  let headers={"Authorization":`Bearer ${localStorage.getItem("token")}`}
                  let users=await axios.get(`http://localhost:8092/api/user/users`,{headers});
                  console.log(users);
                  let user=users.data.filter((user)=>user.userName===localStorage.getItem("username"));
                  console.log(user[0]);
                  let client= await axios.get(`http://localhost:8092/api/admin/${localStorage.getItem("clientId")}`,{headers});
                  let users_array=client.data.users;
                  console.log(users_array);
                  let flag=false;
                  for(let user of users_array) {
                  let submission= await axios.get(`http://localhost:8092/api/submissions/${localStorage.getItem("clientId")}/candidates/${localStorage.getItem("rowNo")}/users/${user.userId}`,{headers});
                  console.log(submission);
                      if(submission.data !== "Submission not found"){
                      submission.data.remark=localStorage.getItem("remark");
                      console.log(submission.data);
                      let postSubmission = await axios.put(`http://localhost:8092/api/submissions/${submission.data.submissionId}`,submission.data,{headers});
                      console.log(postSubmission);
                      toast.success("Remark updated successfully", { autoClose: 2000 });
                      console.log(remark);
                      flag=true;
                      }
                  }
                  if(flag ===false)
                  {
                    alert("First add the candidate");
                  }
                   }
                      catch(error){
                         alert("First add the candidate");
                  }
  }

  const onHandleUpdate = async () => {
    try {
      let headers = { "Authorization": `Bearer ${localStorage.getItem("token")}` };

      // Fetch all submissions
      const allSubmissionsResponse = await axios.get("http://localhost:8092/api/submissions/getAll", { headers });
      const allSubmissions = allSubmissionsResponse.data;
      console.log(allSubmissions);

      // Fetch user object
      const userObjResponse = await axios.get('http://localhost:8092/api/user/users', { headers });
      const userObj = userObjResponse.data;

      let clientId = localStorage.getItem("clientId");
      let username = localStorage.getItem("username");
      let user = userObj.find((item) => item.userName === username);
      const allCandidatesResponse = await axios.get('http://localhost:8092/api/candidates/getAll', { headers });
      const allCandidates = allCandidatesResponse.data;
      console.log(allCandidates);
      const submissionPromises = selectedCandidates.map(async (candidateId) => {
        const candidate = allCandidates.find(c => c.candidateId === candidateId);
        if (candidate && candidate.clients.some(client => client.clientId == clientId)) {
          console.log("Hello");
          const submissionResponse = await axios.get(
            `http://localhost:8092/api/submissions/${clientId}/candidates/${candidate.candidateId}/users/${user.userId}`,
            { headers }
          );
          return submissionResponse.data;
        }
        return undefined; 
      });

      const submissions = await Promise.all(submissionPromises);
      console.log(submissions);
      console.log(rows);
      for (let index = 0; index < submissions.length; index++) {
        let submission = submissions[index];
        if (submission) {
          const rowIndex = rows.findIndex(row => row.id === submission.candidate.candidateId);
          if (rowIndex > -1) {
            submission.status = rows[rowIndex].status;
            try {
              const response = await axios.put(
                `http://localhost:8092/api/submissions/${submission.submissionId}`,
                submission,
                { headers }
              );
              console.log(response.data);
            } catch (error) {
              console.error(`Error updating submission ${submission.submissionId}:`, error);
            }
          }
        }
      }
      toast.success("Selected profiles are updated", { autoClose: 2000 });

    } catch (error) {
      console.log(error);
    }
  }

  const handleCheckboxChange = (id) => {
    setSelectedCandidates((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter(candidateId => candidateId !== id)
        : [...prevSelected, id]
    );
  };

  const handleMasterCheckboxChange = (e) => {
    const isChecked = e.target.checked;
    setMasterChecked(isChecked);
    if (isChecked) {
      const allCandidateIds = filteredRows.map(row => row.id);
      setSelectedCandidates(allCandidateIds);
    } else {
      setSelectedCandidates([]);
    }
  };

  useEffect(() => {
    const allChecked = filteredRows.length > 0 && filteredRows.every(row => selectedCandidates.includes(row.id));
    const anyChecked = filteredRows.some(row => selectedCandidates.includes(row.id));
    setMasterChecked(allChecked ? true : anyChecked ? "indeterminate" : false);
  }, [filteredRows, selectedCandidates]);

  const handleOpenUpdateModal = () => {
    setUpdateModalOpen(true);
  };

  const handleCloseUpdateModal = () => {
    setUpdateModalOpen(false);
  };

  const handleConfirmUpdate = () => {
    onHandleUpdate();
    setUpdateModalOpen(false);
  };


  const handleOpenAddModal = () => {
    setUpdateModalOpen(true);
  };

  const handleCloseAddModal = () => {
    setUpdateModalOpen(false);
  };

  const handleConfirmAdd = () => {
    // onHandleAddAll();
    onHandleUpdate();
    setUpdateModalOpen(false);
  };
  //change
  
  
    const handleCloseBox = () => {
      setOpenBox(false);
    };
  
    const handleOpenBBox = () => {
      setOpenBox(true);
    };
  
  //change

  return (
    <>
    <div className='status-info'>
    {/* <Button variant="contained" color="primary" onClick={handleOpenBBox}>
        Status Info
      </Button> */}
      <Dialog open={openBox} onClose={handleCloseBox}>
        <DialogTitle>Status Information</DialogTitle>
        <DialogContent dividers>
          <p><strong>Selected:</strong> Candidate has been selected for the position.</p>
          <p><strong>Rejected:</strong> Candidate has been declined for the position.</p>
          <p><strong>Submitted:</strong> Candidate profile has been submitted for consideration to the client.</p>
          <p><strong>Pending:</strong> Candidate profile has been created but not yet submitted for client requirement.</p>
          <p><strong>On Hold:</strong> Candidate's application is temporarily suspended or pending further review.</p>
          <p><strong>Interview Scheduled:</strong> Candidate has been scheduled for an interview.</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseBox} color="primary" autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
      </div>

      <ToastContainer />
      <div id='uppercon'>
        <h1 style={{ textAlign: "center", textShadow: "1px 1px 1px  ", fontFamily: "sans-serif", marginBottom: "20px", color: "#0f305c" }}>Client- {localStorage.getItem("clientName")}</h1>
        <div className='search-box'>
        <TextField
          select className="search"
          label="Select Column"
          value={selectedColumn}
          onChange={handleColumnChange}
          variant="outlined"
          size="small"
        >
          {columns.map((column) => (
            // Filter out specific fields
            (column.label !== 'Days to LWD' && column.label !== 'Delete' && column.label !== 'Add' && column.label!=='Email' && column.id!=="experience" && column.id!=='remark' ) && (
              <MenuItem key={column.id} value={column.id}>
                {column.label}
              </MenuItem>
            )
          ))}
        </TextField>
        <TextField
          label="Search"
          value={searchTerm}
          onChange={handleSearchChange}
          variant="outlined"
          size="small"
          className='searchip'
          style={{ marginLeft: "10px" }}
        />
        {searchTerm && (
          <button onClick={handleClearSearch} className="clear-search-btn">Clear</button>
        )}
        </div>
      <div className='add-candidate'>
        <Button onClick={handleOpenModal} variant="contained" color="primary" style={{float:"right" ,marginRight:"10px"}}>
          Add Candidate
        </Button>
        </div>
      
        <div className='upload_data'>
          <input type="file" accept=".xlsx, .xls" onChange={handleFileChange} />
          <button className='upload_button' onClick={handleUpload}>Upload</button>
          {uploadSuccess && <div style={{ color: 'green' }}>File uploaded successfully!</div>}
          {uploadError && <div style={{ color: 'red' }}>Error uploading file. Please try again later.</div>}
        </div>
        {/* <Button id='updateBtn' style={{float:"right",marginRight:"37px",marginBottom:"10px"}} onClick={handleOpenUpdateModal}>Update All</Button> */}
        <TableContainer component={Paper} style={{ maxWidth: "50vw !important", marginTop: "15px" }}>
          <Table sx={{ maxWidth: "10px" }} aria-label="simple table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell key={column.id}>
                    <b>{column.label}</b>
                    {column.id === 'checkbox' && (
                      <Checkbox
                        indeterminate={masterChecked === "indeterminate"}
                        checked={masterChecked === true}
                        onChange={handleMasterCheckboxChange}
                      />
                    )}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedRows.map((row) => (
                <TableRow key={row.id} className='tablerow'>
                  {columns.map((column) => (
                    <TableCell key={column.id}>
                      {column.id === 'checkbox' ? (
                        <Checkbox
                          checked={selectedCandidates.includes(row.id)}
                          onChange={() => handleCheckboxChange(row.id)}
                        />
                      ) : column.id === 'daysToLWD' ? (
                        <span>{row[column.id] !== null ? `${row[column.id]}` : 'N/A'}</span>
                      ) : column.id === 'status' ? (
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          <TextField className='dropdown'
                            select
                            value={row.status}
                            onChange={(e) => { handleStatusChange(row.id, e.target.value) }}
                            variant="outlined"
                            size="small"
                            style={{ color: getStatusColor(row?.status) }}
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
                      ) : column.id === 'remark' ? (
                        <Button id="remarkbtn" onClick={() => {handleOpenRemarkModal(row);localStorage.setItem("rowNo",row.id)}}>Add remark</Button>
                      ) : column.id === 'delete' ? (
                        <Button id="delbtn" onClick={() => handleDelete(row.id)}>Delete</Button>
                      ) : column.id === 'add' ? (
                        <Button
                          disabled={selectedRow === row.id || row.status.toLowerCase() === 'selected' || sub.some((submission)=> submission.candidate.candidateId === row.id && submission.client.clientId == localStorage.getItem("clientId"))}
                          id="addbtn"
                          onClick={() => handleAdd(row.id, row.status)}
                        >
                          Add
                        </Button>
                      ) : (
                        row[column.id]
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={filteredRows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableContainer>
      </div>
      <div className="bottom-table">
        <div style={{ display: 'flex' }}>
          <div style={{ width: '50%' }}>
            <div style={{ marginLeft: "50px", width: "375px", height: "375px" }}>
              <canvas ref={pieChartRef}></canvas>
            </div>
          </div>
          <div style={{ width: '50%' }}>
            <TableContainer component={Paper} style={{ marginTop: "15px" }}>
              <Table sx={{ maxWidth: '80vw' }} aria-label="simple table">
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
                      <TableCell align="left"> {r.color}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
      </div>
      <Modal
        open={open}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <h2>Add New Candidate</h2>
          <form onSubmit={handleFormSubmit}>
            {columns
              .filter(column => column.label !== "Candidate Id" && column.id !== 'delete' && column.id !== 'add' && column.id!=='remark' && column.id!=="checkbox") // Exclude the 'id', 'delete', and 'add' columns
              .map((column) => (
                column.id === 'skill' ? (
                  <TextField className='modalip'
                    key={column.id}
                    label={column.label}
                    name={column.id}
                    value={newCandidate[column.id] || []} // Ensure value is an array for multiple selection
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                    select
                    SelectProps={{ multiple: true }} // Enable multiple selection
                  >
                    {skillsOptions.map((skill) => (
                      <MenuItem key={skill} value={skill}>
                        {skill}
                      </MenuItem>
                    ))}
                  </TextField>
                ) : column.id === 'status' ? (
                  <TextField className='modalip'
                    key={column.id}
                    label={column.label}
                    name={column.id}
                    value={newCandidate[column.id] || 'Pending'} // Set default value to 'Pending'
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                    select
                  >
                    {statusOptions.map((status) => (
                      <MenuItem key={status} value={status}>
                        {status}
                      </MenuItem>
                    ))}
                  </TextField>
                ) : column.id === 'daysToLWD' ? (
                  <TextField className='modalip'
                    key={column.id}
                    label={column.label}
                    name={column.id}
                    type="date" // Use date input
                    value={newCandidate[column.id] || ''}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                    InputLabelProps={{
                      shrink: true, // Ensure the label is displayed correctly for date inputs
                    }}
                    disabled={isEmployee === 'Yes'}
                  />
                ) :
              column.id === 'IsEmployee' ? (
                           
                            <TextField className='modalip'
                            key={column.id}
                            label={column.label}
                            name={column.id}
                            value={newCandidate[column.id] || 'Yes'} // Set default value to 'Yes'
                            onChange={handleInputChange}
                            fullWidth
                            margin="normal"
                            select
                          >
                            <MenuItem value="Yes">Yes</MenuItem>
                            <MenuItem value="No">No</MenuItem>
                          </TextField>
                          ) :  (
                  <TextField className='modalip'
                    key={column.id}
                    label={column.label}
                    name={column.id}
                    value={newCandidate[column.id] || ''}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                  />
                )
              ))}
            <Button id="addbtnmodal" type="submit" variant="contained" color="primary">
              Add
            </Button>
          </form>
        </Box>
      </Modal>
      <Modal
        open={remarkModalOpen}
        onClose={handleCloseRemarkModal}
        aria-labelledby="remark-modal-title"
        aria-describedby="remark-modal-description"
      >
        <Box sx={modalStyle}>
          <h2 id="remark-modal-title">Add Remark</h2>
          <TextField
            fullWidth
            label="Remark"
            value={remark}
            onChange={(e) => { setRemark(e.target.value); localStorage.setItem("remark", e.target.value) }}
          />
          <Button onClick={handleRemark}>Submit</Button>
        </Box>
      </Modal>
      <Modal
        open={updateModalOpen}
        onClose={handleCloseUpdateModal}
        aria-labelledby="update-modal-title"
        aria-describedby="update-modal-description"
      >
        <Box sx={modalStyle}>
          <h2 id="update-modal-title">Confirm Update</h2>
          <p id="update-modal-description">Are you sure you want to update the selected candidates?</p>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
            <Button onClick={handleCloseUpdateModal} style={{ marginRight: '8px' }}>
              Cancel
            </Button>
            <Button onClick={handleConfirmUpdate} variant="contained" color="primary">
              Confirm
            </Button>
          </div>
        </Box>
      </Modal>



       <Modal
        open={updateModalOpen}
        onClose={handleCloseUpdateModal}
        aria-labelledby="update-modal-title"
        aria-describedby="update-modal-description"
      >
        <Box sx={modalStyle}>
          <h2 id="update-modal-title">Confirm Update</h2>
          <p id="update-modal-description">Are you sure you want to update the selected candidates?</p>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
            <Button onClick={handleCloseUpdateModal} style={{ marginRight: '8px' }}>
              Cancel
            </Button>
            <Button onClick={handleConfirmUpdate} variant="contained" color="primary">
              Confirm
            </Button>
          </div>
        </Box>
      </Modal>
    </>
  );
}