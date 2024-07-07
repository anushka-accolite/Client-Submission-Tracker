import { useState } from 'react';
import '../../css/forgotpwd.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const EmailVerificationPage = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const emailVerification = async (e) => {
        e.preventDefault();
        if (!email) {
            alert("Please enter a valid email");
            return;
        }
        setLoading(true);
        try {
            localStorage.setItem("email", email);
            let response = await axios.post(`http://localhost:8092/forgot-password/verifyEmail/${email}`);
            setTimeout(() => {
                alert("Email Verified");
                setLoading(false);
                navigate('/otp');
            }, 1000);
            console.log(response.data);
        } catch (error) {
            alert("Please enter a valid email");
            setLoading(false);
        }
    };
    return (
        <>
            <div id="maincon">
                <div className="verification-container">
                    <form>
                        <label style={{ fontSize: "30px", marginTop: "20px", marginBottom: "20px" }} htmlFor="email"><b>Verify Your Email Address</b></label><br></br>
                        <input type='email' onChange={(e) => { setEmail(e.target.value) }} className="formpart" id="email" placeholder="Enter email address"></input><br></br>
                        <button className="formpart" type="submit" onClick={emailVerification}>
                            {loading ? 'Verifying...' : 'Verify Email'}
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
};
export default EmailVerificationPage;
