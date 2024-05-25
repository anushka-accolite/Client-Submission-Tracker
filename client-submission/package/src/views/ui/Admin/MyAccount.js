// // import React from 'react';
// // import '../../css/myaccount.css';
// // import UserPic from '../../../assets/images/users/user1.jpg';
// // import TextField from '@mui/material/TextField';

// // // Assume this is the user account information data
// // const userAccountInfo = {
// //     userId: '123',
// //     username: 'john_doe',
// //     email: 'john@example.com',
// //     role: 'Admin',
// //     profilePicture: { UserPic } 
// // };

// // const MyAccount = ({ user }) => {
// //     return (
// //         <div className="account-info">
// //             <h2>Account Information</h2>

// //             <div className="body-container">
// //             <div className="profilePht">
// //                 <div>
// //                     <img src={UserPic} alt="Profile" />
// //                 </div>
// //             </div>
// //             <div className='ProfileInfo'>
// //                 <div className="user-info">
// //                     <label>User Id: </label>
// //                     <span>{userAccountInfo.userId}</span>
// //                 </div>
// //                 <div className="user-info">
// //                     <label>Username: </label>
// //                     <span>{userAccountInfo.username}</span>
// //                 </div>
// //                 <div className="user-info">
// //                     <label>Email: </label>
// //                     <span>{userAccountInfo.email}</span>
// //                 </div>
// //                 <div className="user-info">
// //                     <label>Role: </label>
// //                     <span>{userAccountInfo.role}</span>
// //                 </div>
// //             </div>
// //             </div>
// //         </div>
// //     );
// // };

// // export default MyAccount;






// // import React from 'react';
// // import '../../css/myaccount.css';
// // import UserPic from '../../../assets/images/users/user1.jpg';

// // const MyAccount = ({ userId, username, email, role, selectedFile }) => {
// //     return (
// //         <section className="bg-light">
// //             <div className="container">
// //                 <div className="row">
// //                     <div className="col-lg-12 mb-4 mb-sm-5">
// //                         <div className="card card-style1 border-0">
// //                             <div className="card-body p-1-9 p-sm-2-3 p-md-6 p-lg-7">
// //                                 <div className="row align-items-center">
// //                                     <div className="col-lg-6 mb-4 mb-lg-0">
// //                                         <img src={UserPic} alt="..." />
// //                                     </div>
// //                                     <div className="col-lg-6 px-xl-10">
// //                                         <div className="bg-secondary d-lg-inline-block py-1-9 px-1-9 px-sm-6 mb-1-9 rounded">
// //                                             <h3 className="h2 text-white mb-0">John Doe</h3>
// //                                             <span className="text-primary">Senior Software Engineer</span>
// //                                         </div>
// //                                         <ul className="list-unstyled mb-1-9">
// //                                             <li className="mb-2 mb-xl-3 display-28"><span className="display-26 text-secondary me-2 font-weight-600">Role:</span> Admin</li>
// //                                             <li className="mb-2 mb-xl-3 display-28"><span className="display-26 text-secondary me-2 font-weight-600">User Id:</span> 2</li>
// //                                             <li className="mb-2 mb-xl-3 display-28"><span className="display-26 text-secondary me-2 font-weight-600">Email:</span> edith@mail.com</li>
// //                                             {/* <li className="mb-2 mb-xl-3 display-28"><span className="display-26 text-secondary me-2 font-weight-600">Phone:</span> 507 - 541 - 4567</li> */}
// //                                         </ul>
// //                                     </div>
// //                                 </div>
// //                             </div>
// //                         </div>
// //                     </div>
// //                 </div>
// //             </div>
// //         </section>
// //     );
// // };

// // export default MyAccount;


// import React from 'react';
// import '../../css/myaccount.css';
// import UserPic from '../../../assets/images/users/user1.jpg';

// const MyAccount = ({ userId, username, email, role }) => {
//     return (
//         <section id='section' className="bg-light">
//             <div className="container">
//                 <div className="row">
//                     <div className="col-lg-12 mb-4 mb-sm-5">
//                         <div className="card card-style1 border-0">
//                             <div className="card-body p-1-9 p-sm-2-3 p-md-6 p-lg-7">
//                                 <div className="row align-items-center">
//                                     <div className="col-lg-6 mb-4 mb-lg-0">
//                                         <img src={UserPic} alt="User" />
//                                     </div>
//                                     <div className="col-lg-6 px-xl-10">
//                                         <div className="bg-secondary d-lg-inline-block py-1-9 px-1-9 px-sm-6 mb-1-9 rounded">
//                                             <h3 className="h2 text-white mb-0">John Doe</h3>
//                                             <span className="text-primary">Senior Software Engineer</span>
//                                         </div>
//                                         <ul className="list-unstyled mb-1-9">
//                                             <li className="mb-2 mb-xl-3 display-28"><span className="display-26 text-secondary me-2 font-weight-600">Role:</span> Admin </li>
//                                             <li className="mb-2 mb-xl-3 display-28"><span className="display-26 text-secondary me-2 font-weight-600">User Id:</span> 2 </li>
//                                             <li className="mb-2 mb-xl-3 display-28"><span className="display-26 text-secondary me-2 font-weight-600">Email:</span> xyz@gmail.com </li>
//                                         </ul>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </section>
//     );
// };

// export default MyAccount;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../css/myaccount.css';
import UserPic from '../../../assets/images/users/user1.jpg';
import { useNavigate } from 'react-router-dom';
const MyAccount = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate=useNavigate();
    useEffect(() => {
        const getAuthToken = () => {
            // Implement logic to retrieve the auth token from wherever it's stored
            // For example, from local storage
            return localStorage.getItem('token');
        };
        const authToken = getAuthToken();
        const fetchUserData = async () => {
            try {
                const username=localStorage.getItem("username");
                // console.log(username);
                const response= await axios.get(`http://localhost:8092/api/user/users`, {
                    headers:{
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }   
                })
                const user=response.data.find(item=>item.userName===username);
                console.log(user);
                if(user) {
                    let userID=user.userId;
                    console.log("userId: ",userID);
                }
                else{
                    console.log("User not found")
                }
                setUser(user);
                setLoading(false);
                // data=userobj.data;
                // data=data.find(item=>item.userName===username)[0];
                // console.log(data);
                // const response = await axios.get(`http://localhost:8092/api/user/${userId}`, {
                //     headers: {
                //         Authorization: `Bearer ${authToken}`
                //     }
                // });
                // setUser(response.data);
                // console.log(response.data);
                // setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };
        if (authToken) {
            fetchUserData();
        
        } else {
            setLoading(false);
        }
    }, []);
    if (loading) {
        return <div>Loading...</div>;
    }
    if (error) {
        return <div>Error: {error}</div>;
    }
    return (
        <section className="bg-light">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12 mb-4 mb-sm-5">
                        <div className="card card-style1 border-0">
                            <div className="card-body p-1-9 p-sm-2-3 p-md-6 p-lg-7">
                                <div className="row align-items-center">
                                    <div className="col-lg-6 mb-4 mb-lg-0">
                                        <img src={UserPic} alt="User" />
                                    </div>
                                    <div className="col-lg-6 px-xl-10">
                                        <div className="bg-secondary d-lg-inline-block py-1-9 px-1-9 px-sm-6 mb-1-9 rounded">
                                            <h3 className="h2 text-white mb-0">{user.userName}</h3>
                                             <span className="text-primary">{user.userRole}</span>
                                         </div>
                                        <ul className="list-unstyled mb-1-9">
                                            {user && (
                                                <>
                                                    <li className="mb-2 mb-xl-3 display-28">
                                                        <span className="display-26 text-secondary me-2 font-weight-600">Role:</span> {user.userRole}
                                                    </li>
                                                    <li className="mb-2 mb-xl-3 display-28">
                                                        <span className="display-26 text-secondary me-2 font-weight-600">User Id:</span> {user.userId}
                                                    </li>
                                                    <li className="mb-2 mb-xl-3 display-28">
                                                        <span className="display-26 text-secondary me-2 font-weight-600">Email:</span> {user.email}
                                                    </li>
                                                </>
                                            )}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
export default MyAccount;
