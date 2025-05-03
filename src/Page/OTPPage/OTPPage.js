import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import './OTPPageStyle.css';
import Header from '../../components/Header/Header';
// import { GoogleReCaptchaProvider, GoogleReCaptcha } from 'react-google-recaptcha-v3';
import ReCAPTCHA from "react-google-recaptcha";
import Button from '../../components/common/Button';

const OTPPage = () => {

  const [validateCaptcha, setValidateCaptcha] = useState(false);


  const OTP_LENGTH = 4;
  // const OTP_VALIDITY_PERIOD = 3 * 60 * 60 * 1000; // 3 hours in milliseconds
  const OTP_VALIDITY_PERIOD = 30 * 1000;
  const [otp, setOtp] = useState(new Array(OTP_LENGTH).fill(''));
  const [error, setError] = useState('');
  const inputRefs = useRef([]);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const patientId = searchParams.get('patient_id');
  const episodeNumber = searchParams.get('episode_number');

  useEffect(() => {
    // if (!patientId || !episodeNumber) {
    //   navigate('/404');
    //   return;
    // }

    const storedVerificationData = JSON.parse(localStorage.getItem('otpVerification')) || {};
    const { verifiedPatientId, verifiedEpisodeNumber, expirationTime } = storedVerificationData;

    if (
      verifiedPatientId === patientId &&
      verifiedEpisodeNumber === episodeNumber &&
      expirationTime &&
      Date.now() < expirationTime
    ) {
      navigate(`/stepper?patient_id=${patientId}&episode_number=${episodeNumber}`);
    }
  }, [patientId, episodeNumber, navigate]);

  const handleVerify = (value) => {
    console.log("value===>", value);
    if(value){
      setTimeout(() => {
        setValidateCaptcha(true);
      }, 1000)
    }
  }

  const handleChange = (value, index) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    if (value && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = () => {
    if (otp.includes('')) {
      setError('Please enter a valid OTP.');
      return;
    }

    const enteredOtp = otp.join('');
    if (enteredOtp === '1234') {
      const expirationTime = Date.now() + OTP_VALIDITY_PERIOD;
      localStorage.setItem(
        'otpVerification',
        JSON.stringify({
          verifiedPatientId: patientId,
          verifiedEpisodeNumber: episodeNumber,
          expirationTime,
        })
      );

      navigate(`/stepper?patient_id=${patientId}&episode_number=${episodeNumber}`);
    } else {
      setError('Invalid OTP. Please try again.');
    }
  };


  return (
    <>
      {!validateCaptcha ? 
      <ReCAPTCHA sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI" onChange={handleVerify} />
      :
      <>
        <Header/>
        <div className="otp_page_container">
          <div className="left">
            <img src="./assets/otp_img.svg" alt="OTP" />
          </div>
          <div className="right">
            <div className="otp-page">
              {error && <p className="error" aria-live="assertive">{error}</p>}
              <h2>OTP Verification</h2>
              <p>Please enter the verification code sent to your registered mobile number</p>
              <div className="otp-container">
                {otp.map((value, index) => (
                  <input
                    key={index}
                    type="text"
                    value={value}
                    maxLength="1"
                    onChange={(e) => handleChange(e.target.value, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    ref={(ref) => (inputRefs.current[index] = ref)}
                    className="otp-input"
                    autoFocus={index === 0}
                  />
                ))}
              </div>
              {/* <button onClick={handleSubmit} className="submit-btn">
                Verify
              </button> */}
              <Button handleSubmit={handleSubmit} btnVal={"Verify"} />
              <div class="resend">
                Didn’t Receive the OTP? <a href="#">Resend OTP</a>
              </div>
            </div>
          </div>
        </div>
      </>
      }
    </>
  );
};

export default OTPPage;