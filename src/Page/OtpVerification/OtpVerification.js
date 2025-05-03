import React, { useState, useRef } from 'react';


const OtpVerification = () => {
  const [otp, setOtp] = useState(['', '', '', '']);
  const inputsRef = useRef([]);

  const handleChange = (value, index) => {
    if (!/^\d*$/.test(value)) return; // Allow only digits

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Focus next input
    if (value && index < otp.length - 1) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  const handleVerify = () => {
    alert(`OTP entered: ${otp.join('')}`);
  };

  return (
    <div className="container">
      <div className="left">
        <img
          src="https://img.icons8.com/external-flat-juicy-fish/512/external-otp-online-security-flat-flat-juicy-fish.png"
          alt="OTP"
        />
      </div>
      <div className="right">
        <h2>OTP Verification</h2>
        <p>Please enter the verification code sent to your registered mobile number</p>
        <div className="otp-inputs">
          {otp.map((digit, idx) => (
            <input
              key={idx}
              type="text"
              maxLength="1"
              value={digit}
              onChange={(e) => handleChange(e.target.value, idx)}
              onKeyDown={(e) => handleKeyDown(e, idx)}
              ref={(el) => (inputsRef.current[idx] = el)}
            />
          ))}
        </div>
        <button className="verify-btn" onClick={handleVerify}>
          Verify
        </button>
        <div className="resend">
          Didn’t Receive the OTP? <a href="#">Resend OTP</a>
        </div>
      </div>
    </div>
  );
};

export default OtpVerification;
