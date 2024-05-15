import React, { useState } from 'react';
import EditProfile from './EditProfile';
import MyAccount from './MyAccount';

function ProfileContainer() {
  // State variables to store user data
  const [userId, setUserId] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);

  // Event handler for updating user data
  const updateUserProfile = (userData) => {
    // Update user data in the state
    setUserId(userData.userId);
    setUsername(userData.username);
    setEmail(userData.email);
    setRole(userData.role);
    setSelectedFile(userData.selectedFile);
  };

  return (
    <div>
      <EditProfile onUpdateProfile={updateUserProfile} />
      <MyAccount
        userId={userId}
        username={username}
        email={email}
        role={role}
        selectedFile={selectedFile}
      />
    </div>
  );
}

export default ProfileContainer;
