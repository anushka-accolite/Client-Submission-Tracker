import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
// import MenuItem from '@mui/material/MenuItem';
// import Select from '@mui/material/Select';
import '../../css/createclient.css';
// import { FormControl, InputLabel } from '@mui/material';
// import AdapterDateFns from '@mui/lab/AdapterDateFns';
// import LocalizationProvider from '@mui/lab/LocalizationProvider';
// import DatePicker from '@mui/lab/DatePicker';
const CreateClient = () => {
  const [formData, setFormData] = useState({
    clientId:'',
    clientName: '',
    clientemail:'',
    // projectName: '',
    // projectDuration: '',
    // startDate: null,
    // endDate: null,
    // skills: [],
    responseTime: '',
    talentAcquisition: '', 
    projectManager: '', 
    accountManager: ''
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  // const handleSkillsChange = (e) => {
  //   const { value } = e.target;
  //   setFormData({ ...formData, skills: value });
  // };
  // const handleStartDateChange = (date) => {
  //   setFormData({ ...formData, startDate: date });
  // };
  // const handleEndDateChange = (date) => {
  //   setFormData({ ...formData, endDate: date });
  // };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    setFormData({
      clientId:'',
      clientName: '',
      clientemail:'',
      responseTime: '',
      talentAcquisition: '',
      projectManager: '',
      accountManager: ''
    });
  };
  return (
    <>
      <h1>Add Client Details</h1>
      <form onSubmit={handleSubmit}>
      <TextField
          label="Client Id"
          variant="outlined"
          fullWidth
          margin="normal"
          name="clientId"
          value={formData.clientId}
          onChange={handleChange} required
        />
        <TextField
          label="Client Name"
          variant="outlined"
          fullWidth
          margin="normal"
          name="clientName"
          value={formData.clientName}
          onChange={handleChange} required
        />
         <TextField
          label="Client Requirement"
          variant="outlined"
          fullWidth
          margin="normal"
          name="clientemail"
          value={formData.clientemail}
          onChange={handleChange} required
        />
        {/* <TextField
          label="Project Duration"
          variant="outlined"
          fullWidth
          margin="normal"
          name="projectDuration"
          value={formData.projectDuration}
          onChange={handleChange}
        /> */}
        {/* Start Date Datepicker */}
        
        {/* <TextField
          label="Start Date"
          variant="outlined"
          fullWidth
          margin="normal"
          name="startDate"
          value={formData.startDate}
          onChange={handleChange}
        />
        <TextField
          label="End Date"
          variant="outlined"
          fullWidth
          margin="normal"
          name="endDate"
          value={formData.endDate}
          onChange={handleChange}
        />  */}
        {/* Skills Select */}
        {/* <FormControl fullWidth variant="outlined" margin="normal">
          <InputLabel id="skills-label">Skills</InputLabel> */}
          {/* <Select
            labelId="skills-label"
            id="skills"
            multiple
            value={formData.skills}
            onChange={handleSkillsChange}
            renderValue={(selected) => selected.join(', ')}
            fullWidth
          > */}
            {/* <MenuItem value="Java">Java</MenuItem>
            <MenuItem value="SQL">SQL</MenuItem>
            <MenuItem value="Unix">Unix</MenuItem>
            <MenuItem value="Spring">Spring</MenuItem>
            <MenuItem value="ReactJS">ReactJS</MenuItem>
            <MenuItem value="Angular">Angular</MenuItem>
            <MenuItem value="Python">Python</MenuItem>
          </Select> */}
        {/* </FormControl> */}
        {/* Talent Acquisition field */}
        <TextField
          label="Talent Acquisition"
          variant="outlined"
          fullWidth
          margin="normal"
          name="talentAcquisition"
          value={formData.talentAcquisition}
          onChange={handleChange} required
        />
        {/* Project Manager field */}
        <TextField
          label="Project Manager"
          variant="outlined"
          fullWidth
          margin="normal"
          name="projectManager"
          value={formData.projectManager}
          onChange={handleChange} required
        />
        {/* Account Manager field */}
        <TextField
          label="Account Manager"
          variant="outlined"
          fullWidth
          margin="normal"
          name="accountManager"
          value={formData.accountManager}
          onChange={handleChange} required
        />
        {/* Response Time field */}
        <TextField
          label="Response Time"
          variant="outlined"
          fullWidth
          margin="normal"
          name="responseTime"
          value={formData.responseTime}
          onChange={handleChange} required
        />
        <Button
          variant="contained"
          color="primary"
          type="submit"
        >Submit
        </Button>
      </form>
    </>
  );
};
export default CreateClient;





