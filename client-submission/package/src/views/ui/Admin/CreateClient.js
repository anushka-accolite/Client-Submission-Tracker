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
      <h1 className="header">Add Client Details</h1>
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
