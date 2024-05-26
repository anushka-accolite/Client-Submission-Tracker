// import React, { useState, useEffect } from 'react';
// import TextField from '@mui/material/TextField';
// import Button from '@mui/material/Button';
// import Autocomplete from '@mui/material/Autocomplete';
// import axios from 'axios';
// import Chip from '@mui/material/Chip';
// import '../../css/createclient.css';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { useNavigate } from 'react-router-dom';
// const skillsOptions = ['Java', 'Python', 'JavaScript', 'C#', 'Ruby'];

// const CreateClient = () => {
//   const [formData, setFormData] = useState({
//     clientId: '',
//     clientName: '',
//     clientRequirement: '',
//     clientResponseTimeinDays: '',
//     talentAcquisition: null,
//     projectManager: null,
//     accountManager: null,
//     skills: []
//   });

//   const [talentAcquisitionOptions, setTalentAcquisitionOptions] = useState([]);
//   const [projectManagerOptions, setProjectManagerOptions] = useState([]);
//   const [accountManagerOptions, setAccountManagerOptions] = useState([]);
//   const navigate=useNavigate();
//   useEffect(() => {
//     if(localStorage.role!=='admin'){
//       navigate('/loginform');
//     }
//     const fetchUsers = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         const headers = { 'Authorization': `Bearer ${token}` };
//         const response = await axios.get('http://localhost:8092/api/user/users', { headers });
//         const users = response.data;

//         setTalentAcquisitionOptions(users.filter(user => user.userRole === 'TalentAcquistion'));
//         setProjectManagerOptions(users.filter(user => user.userRole === 'ProjectManager'));
//         setAccountManagerOptions(users.filter(user => user.userRole === 'AccountManager'));
//       } catch (error) {
//         console.error('Error fetching users:', error);
//       }
//     };

//     fetchUsers();
//   }, []);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSkillChange = (event, value) => {
//     setFormData({ ...formData, skills: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const token = localStorage.getItem('token');
//     const headers = {
//       'Authorization': `Bearer ${token}`
//     };

//     const skillsString = formData.skills.join(', ');
//     const formDataWithSkillsString = {
//       ...formData,
//       skills: skillsString,
//       talentAcquisition: formData.talentAcquisition ? formData.talentAcquisition.userName : '',
//       projectManager: formData.projectManager ? formData.projectManager.userName : '',
//       accountManager: formData.accountManager ? formData.accountManager.userName : '',
//       isDeleted:false
//     };

//     try {
//       // Update client IDs of Talent Acquisition, Project Manager, and Account Manager
//       // console.log("AM",formData.accountManager);
//       console.log(formData.clientId);


//       const response = await axios.post('http://localhost:8092/api/admin', formDataWithSkillsString, { headers });
//       console.log('Data posted successfully:', response.data);
//       let taId=formData.talentAcquisition.userId;
//       let pmId=formData.projectManager.userId;
//       let amId=formData.accountManager.userId;
//       formData.clientId=response.data.clientId;
//       await axios.put(`http://localhost:8092/api/admin/${formData.clientId}/users`,{userId:taId},{headers});
//       // Clear form data after successful submission
//       await axios.put(`http://localhost:8092/api/admin/${formData.clientId}/users`,{userId:pmId},{headers});
//       await axios.put(`http://localhost:8092/api/admin/${formData.clientId}/users`,{userId:amId},{headers});
//       setFormData({
//         clientId: '',
//         clientName: '',
//         clientRequirement: '',
//         clientResponseTimeinDays: '',
//         talentAcquisition: null,
//         projectManager: null,
//         accountManager: null,
//         skills: []
//       });
//       toast.success("Client created successfully")
//     } catch (error) {
//       toast.error("Error creating client");
//       console.error('Error submitting data:', error);
//     }
//   };

//   return (
//     <>
//     <ToastContainer/>
//       <h1 className="header">Add Client Details</h1>
//       <form onSubmit={handleSubmit} className="form-container">
//         <TextField
//           label="Client Id"
//           variant="outlined"
//           fullWidth
//           margin="normal"
//           name="clientId"
//           value={formData.clientId}
//           onChange={handleChange}
//           required
//           className="text-field"
//         />
//         <TextField
//           label="Client Name"
//           variant="outlined"
//           fullWidth
//           margin="normal"
//           name="clientName"
//           value={formData.clientName}
//           onChange={handleChange}
//           required
//           className="text-field"
//         />
//         <TextField
//           label="Client Requirement"
//           variant="outlined"
//           fullWidth
//           margin="normal"
//           name="clientRequirement"
//           value={formData.clientRequirement}
//           onChange={handleChange}
//           required
//           className="text-field"
//         />
//         <Autocomplete
//           multiple
//           id="skills-autocomplete"
//           options={skillsOptions}
//           getOptionLabel={(option) => option}
//           value={formData.skills}
//           onChange={handleSkillChange}
//           renderInput={(params) => (
//             <TextField
//               {...params}
//               variant="outlined"
//               label="Skills"
//               placeholder="Select skills"
//               fullWidth
//               margin="normal"
//               className="text-field"
//             />
//           )}
//           renderTags={(value, getTagProps) =>
//             value.map((option, index) => (
//               <Chip label={option} {...getTagProps({ index })} />
//             ))
//           }
//           className="chip-container"
//         />
//         <Autocomplete
//           id="talent-acquisition-dropdown"
//           options={talentAcquisitionOptions}
//           getOptionLabel={(option) => option.userName}
//           value={formData.talentAcquisition}
//           onChange={(event, newValue) => {
//             setFormData({ ...formData, talentAcquisition: newValue });
//           }}
//           renderInput={(params) => (
//             <TextField
//               {...params}
//               variant="outlined"
//               label="Talent Acquisition"
//               placeholder="Select Talent Acquisition"
//               fullWidth
//               margin="normal"
//               className="text-field"
//             />
//           )}
//         />
//         <Autocomplete
//           id="project-manager-dropdown"
//           options={projectManagerOptions}
//           getOptionLabel={(option) => option.userName}
//           value={formData.projectManager}
//           onChange={(event, newValue) => {
//             setFormData({ ...formData, projectManager: newValue });
//           }}
//           renderInput={(params) => (
//             <TextField
//               {...params}
//               variant="outlined"
//               label="Project Manager"
//               placeholder="Select Project Manager"
//               fullWidth
//               margin="normal"
//               className="text-field"
//             />
//           )}
//         />
//         <Autocomplete
//           id="account-manager-dropdown"
//           options={accountManagerOptions}
//           getOptionLabel={(option) => option.userName}
//           value={formData.accountManager}
//           onChange={(event, newValue) => {
//             setFormData({ ...formData, accountManager: newValue });
//           }}
//           renderInput={(params) => (
//             <TextField
//               {...params}
//               variant="outlined"
//               label="Account Manager"
//               placeholder="Select Account Manager"
//               fullWidth
//               margin="normal"
//               className="text-field"
//             />
//           )}
//         />
//         <TextField
//           label="Response Time"
//           variant="outlined"
//           fullWidth
//           margin="normal"
//           name="clientResponseTimeinDays"
//           value={formData.clientResponseTimeinDays}
//           onChange={handleChange}
//           required
//                     className="text-field"
//         />
//         <Button
//           variant="contained"
//           color="primary"
//           type="submit"
//           className="submit-button"
//         >
//           Submit
//         </Button>
//       </form>
//     </>
//   );
// };

// export default CreateClient;


import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Autocomplete from '@mui/material/Autocomplete';
import axios from 'axios';
import Chip from '@mui/material/Chip';
import '../../css/createclient.css';

const skillsOptions = ['Java', 'Python', 'JavaScript', 'C#', 'Ruby'];

const CreateClient = () => {
  const [formData, setFormData] = useState({
    clientId: '',
    clientName: '',
    clientRequirement: '',
    clientResponseTimeinDays: '',
    talentAcquisition: '',
    projectManager: '',
    accountManager: '',
    skills: []
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSkillChange = (event, value) => {
    setFormData({ ...formData, skills: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const headers = {
      'Authorization': `Bearer ${token}`
    };

    const skillsString = formData.skills.join(', ');
    const formDataWithSkillsString = {
      ...formData,
      skills: skillsString
    };

    axios.post('http://localhost:8092/api/admin', formDataWithSkillsString, { headers })
      .then(response => {
        console.log('Data posted successfully:', response.data);
      })
      .catch(error => {
        console.error('Error posting data:', error);
      });

    console.log(formData);
    setFormData({
      clientId: '',
      clientName: '',
      clientRequirement: '',
      clientResponseTimeinDays: '',
      talentAcquisition: '',
      projectManager: '',
      accountManager: '',
      skills: []
    });
  };

  return (
    <>
      <h2 className="header">Add Client Details</h2>
      <form onSubmit={handleSubmit} className="form-container">
        <TextField
          label="Client Id"
          variant="outlined"
          fullWidth
          margin="normal"
          name="clientId"
          value={formData.clientId}
          onChange={handleChange}
          required
          className="text-field"
        />
        <TextField
          label="Client Name"
          variant="outlined"
          fullWidth
          margin="normal"
          name="clientName"
          value={formData.clientName}
          onChange={handleChange}
          required
          className="text-field"
        />
        <TextField
          label="Client Requirement"
          variant="outlined"
          fullWidth
          margin="normal"
          name="clientRequirement"
          value={formData.clientRequirement}
          onChange={handleChange}
          required
          className="text-field"
        />
        <Autocomplete
          multiple
          id="skills-autocomplete"
          options={skillsOptions}
          getOptionLabel={(option) => option}
          value={formData.skills}
          onChange={handleSkillChange}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="outlined"
              label="Skills"
              placeholder="Select skills"
              fullWidth
              margin="normal"
              className="text-field"
            />
          )}
          renderTags={(value, getTagProps) =>
            value.map((option, index) => (
              <Chip label={option} {...getTagProps({ index })} />
            ))
          }
          className="chip-container"
        />
        <TextField
          label="Talent Acquisition"
          variant="outlined"
          fullWidth
          margin="normal"
          name="talentAcquisition"
          value={formData.talentAcquisition}
          onChange={handleChange}
          required
          className="text-field"
        />
        <TextField
          label="Project Manager"
          variant="outlined"
          fullWidth
          margin="normal"
          name="projectManager"
          value={formData.projectManager}
          onChange={handleChange}
          required
          className="text-field"
        />
        <TextField
          label="Account Manager"
          variant="outlined"
          fullWidth
          margin="normal"
          name="accountManager"
          value={formData.accountManager}
          onChange={handleChange}
          required
          className="text-field"
        />
        <TextField
          label="Response Time"
          variant="outlined"
          fullWidth
          margin="normal"
          name="clientResponseTimeinDays"
          value={formData.clientResponseTimeinDays}
          onChange={handleChange}
          required
          className="text-field"
        />
        <Button
          variant="contained"
          color="primary"
          type="submit"
          className="submit-button"
        >
          Submit
        </Button>
      </form>
    </>
  );
};

export default CreateClient;