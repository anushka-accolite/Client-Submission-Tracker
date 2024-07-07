import React, { useState, useRef, useEffect } from 'react';
import '../../css/otp.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const OtpPage = () => {
  const [otp, setOtp] = useState(Array(6).fill(''));
  const inputRefs = useRef([]);
  const [unmatch, setUnmatch] = useState(0);
  const [disabled, setDisabled] = useState(false);
  const [timer, setTimer] = useState(0);
  const navigate = useNavigate();
  useEffect(() => {
    if (unmatch >= 3) {
      setDisabled(true);
      setTimer(60); // Set timer to 60 seconds
      const interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
      // Clear interval after 60 seconds
      setTimeout(() => {
        setDisabled(false);
        setUnmatch(0);
        clearInterval(interval);
      }, 60000);
    }
  }, [unmatch]);
  const otpVerification = async (e) => {
    e.preventDefault();
    if (disabled) return; // Prevent submission if disabled
    let combinedOtp = otp.join('');
    try {
      const response = await axios.post(`http://localhost:8092/forgot-password/verifyOtp/${combinedOtp}/${localStorage.getItem("email")}`);
      // Handle success response
      console.log(response.data);
      alert("OTP verified successfully!");
      navigate("/reset");
    } catch (error) {
      setUnmatch(unmatch + 1);
      if (unmatch >= 2) {
        alert("You have reached the maximum number of attempts. Please try again later after 1 minute.");
      } else {
        alert(`OTP is not matching. You have ${2 - unmatch} attempts left.`);
      }
    }
  };
  const handleChange = (e, index) => {
    const value = e.target.value;
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    // Automatically move to the next input field
    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };
  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && otp[index] === '') {
      if (index > 0) {
        inputRefs.current[index - 1].focus();
      }
    } else if (e.key === 'Backspace') {
      const newOtp = [...otp];
      newOtp[index] = '';
      setOtp(newOtp);
    }
  };
  return (
    <div className='forgotpwdcon'>
      <div className="otp-form">
        <h1>{timer > 0 ? `Retry in ${timer} seconds` : ''}</h1>
        <form className="mobile-otp" onSubmit={otpVerification}>
          <h2>OTP Verification</h2>
          <h6 style={{marginBottom:"20px"}}>Enter OTP code send via Email</h6>
          <div className="otp-container">
            {otp.map((digit, index) => (
              <input
                key={index}
                type="text"
                className="otp-input"
                pattern="\d*"
                maxLength="1"
                value={digit}
                onChange={(e) => handleChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                ref={(el) => (inputRefs.current[index] = el)}
                disabled={disabled}
              />
            ))}
          </div>
          <button type="submit" id="verifyMobileOTP" disabled={disabled}>
            VERIFY & PROCEED
          </button>
        </form>
      </div>
    </div>
  );
};
export default OtpPage;