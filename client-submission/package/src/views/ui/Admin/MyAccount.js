import React from 'react';
import '../../css/myaccount.css';
import UserPic from '../../../assets/images/users/user1.jpg';
import TextField from '@mui/material/TextField';

// Assume this is the user account information data
const userAccountInfo = {
    userId: '123',
    username: 'john_doe',
    email: 'john@example.com',
    role: 'Admin',
    profilePicture: { UserPic } // Assuming you have the profile picture file name
};

const MyAccount = ({ user }) => {
    return (
        <div className="account-info">
            <h2>Account Details :</h2>
            <div className="profilePht">
                <div>
                    <img src={UserPic} alt="Profile" />
                </div>
            </div>
            <div className='ProfileInfo'>
                <div className="user-info">
                    <label>User Id: </label>
                    <span>{userAccountInfo.userId}</span>
                </div>
                <div className="user-info">
                    <label>Username: </label>
                    <span>{userAccountInfo.username}</span>
                </div>
                <div className="user-info">
                    <label>Email: </label>
                    <span>{userAccountInfo.email}</span>
                </div>
                <div className="user-info">
                    <label>Role: </label>
                    <span>{userAccountInfo.role}</span>
                </div>
            </div>
        </div>
    );
};

export default MyAccount;

// import React from 'react';
// import '../../css/myaccount.css';
// import UserPic from '../../../assets/images/users/user1.jpg';
// import TextField from '@mui/material/TextField';

// // Assume this is the user account information data
// const userAccountInfo = {
//     userId: '123',
//     username: 'john_doe',
//     email: 'john@example.com',
//     role: 'Admin',
//     profilePicture: { UserPic } // Assuming you have the profile picture file name
// };

// const MyAccount = ({ user }) => {
//     return (
//         <div className="account-info">
//             <h2>Account Details :</h2>
//             <div className="profilePht">
//                 <div>
//                     <img src={UserPic} alt="Profile" />
//                 </div>
//             </div>
//             <div className='ProfileInfo'>
//                 <div className="user-info">
//                     <TextField
//                         label="User Id"
//                         value={userAccountInfo.userId}
//                         InputProps={{
//                             readOnly: true,
//                         }}
//                     />
//                 </div>
//                 <div className="user-info">
//                     <TextField
//                         label="Username"
//                         value={userAccountInfo.username}
//                         InputProps={{
//                             readOnly: true,
//                         }}
//                     />
//                 </div>
//                 <div className="user-info">
//                     <TextField
//                         label="Email"
//                         value={userAccountInfo.email}
//                         InputProps={{
//                             readOnly: true,
//                         }}
//                     />
//                 </div>
//                 <div className="user-info">
//                     <TextField
//                         label="Role"
//                         value={userAccountInfo.role}
//                         InputProps={{
//                             readOnly: true,
//                         }}
//                     />
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default MyAccount;

