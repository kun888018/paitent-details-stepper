import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useSearchParams, useLocation } from 'react-router-dom';
import './OTPPageStyle.css';
import Header from '../../components/Header/Header';
import Button from '../../components/common/Button';
import { SendOtp, VerifyOtp } from '../../service/api.service';
import { decryptData, encryptData } from '../../Utils/cryptoUtils';
import { showToast } from '../../components/common/Reacttoastify';
import Loader from '../../components/common/Loader/Loader';
// import { GoogleReCaptchaProvider, GoogleReCaptcha } from 'react-google-recaptcha-v3';
import ReCAPTCHA from "react-google-recaptcha";
import SECRET_KEY_CONFIG from '../../service/SecretKeyDeclaration';
import { generateBrowserId, getStoredBrowserId } from '../../Utils/browserUtils';


const OTPPage = () => {
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const uhid = queryParams.get('uhid');
  const episodeNumber = queryParams.get('episode_number');
  const [validateCaptcha, setValidateCaptcha] = useState(false);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const OTP_LENGTH = 6;
  // const OTP_VALIDITY_PERIOD = 3 * 60 * 60 * 1000; // 3 hours in milliseconds
  const OTP_VALIDITY_PERIOD = 30 * 1000;
  const [otp, setOtp] = useState(new Array(OTP_LENGTH).fill(''));
  const [error, setError] = useState('');
  const [loading, setLoading] = React.useState(false);
  const inputRefs = useRef([]);
  const navigate = useNavigate();

  // useEffect(() => {
  //   handleOtp();
  // }, []);

  useEffect(() => {
    if (!uhid || !episodeNumber) {
      navigate('/404');
      return;
    }
    const storedVerificationData = JSON.parse(localStorage.getItem('otpVerification')) || {};
    const storedBrowserId = storedVerificationData.browserId;
    const currentBrowserId = getStoredBrowserId();
    const { verifiedUhid, verifiedEpisodeNumber, expirationTime } = storedVerificationData;
    if (
      verifiedUhid === uhid &&
      verifiedEpisodeNumber === episodeNumber &&
      expirationTime &&
      Date.now() < expirationTime &&
      storedBrowserId === currentBrowserId
    ) {
      navigate(`/stepper/?uhid=${uhid}&episode_number=${episodeNumber}`);
    } else {
      // handleOtp();
      localStorage.removeItem('otpVerification');
      localStorage.removeItem('browserId');
      handleOtp();
    }
  }, [uhid, episodeNumber, navigate]);

  const handleVerify = (value) => {
    console.log("value===>", value);
    if (value) {
      setValidateCaptcha(true);
      // setTimeout(() => {
      //   setValidateCaptcha(true);
      // }, 1000)
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

  const handleOtp = () => {
    setLoading(true);

    let parmObj = {
      uhid: uhid
    }

    let reqParm = {
      _data: encryptData(parmObj)
    }

    SendOtp(reqParm).then(response => {
      if (response?.status === 200) {
        showToast(JSON.parse(decryptData(response?.data?._data))?.message, 'success');
        setIsOtpSent(true);
        setLoading(false);
      }
    }).catch(error => {
      setIsOtpSent(false);
      setLoading(false);
    })
  }

  const handleSubmit = async () => {
    const enteredOtp = otp.join('');
  
    if (!/^\d{6}$/.test(enteredOtp)) {
      showToast('Please enter a valid 6-digit OTP.', 'error');
      return;
    }
  
    setError('');
  
    const isVerified = await handleVerifyOtp(enteredOtp, uhid);
  
    if (!isVerified) {
      return; // 🔐 Don't proceed if OTP verification failed
    }
  
    const expirationTime = Date.now() + OTP_VALIDITY_PERIOD;
    const browserId = generateBrowserId();
  
    localStorage.setItem('browserId', browserId);
    localStorage.setItem(
      'otpVerification',
      JSON.stringify({
        verifiedUhid: uhid,
        verifiedEpisodeNumber: episodeNumber,
        expirationTime,
        browserId
      })
    );
  
    setTimeout(() => {
      navigate(`/stepper/?uhid=${uhid}&episode_number=${episodeNumber}`);
      setLoading(false);
    }, 5000);
  };
  
  const handleVerifyOtp = async (otpVal, uhid) => {
    setLoading(true);
  
    const parmObj = {
      uhid,
      otp: otpVal
    };
  
    const reqParm = {
      _data: encryptData(parmObj)
    };
  
    try {
      const response = await VerifyOtp(reqParm);
      if (response?.status === 200) {
        showToast(JSON.parse(decryptData(response?.data?._data))?.message, 'success');
        let getDataObj = JSON.parse(decryptData(response?.data?._data))
        let getAccountData = JSON.parse(getDataObj?.data)
        console.log("handleVerifyOtp=====>", getDataObj, getAccountData);
        localStorage.setItem( 'userEmail', getAccountData[0]?.Email);
        localStorage.setItem( 'MobileNo', getAccountData[0]?.MobileNo);
        localStorage.setItem( 'PatientName', getAccountData[0]?.PatientName);
        localStorage.setItem( 'prefillData', JSON.stringify({
          name: getAccountData[0]?.PatientName,
          email: getAccountData[0]?.Email,
          contact: getAccountData[0]?.MobileNo,
        }) )
        return true;
      } else {
        showToast('OTP verification failed', 'error');
        setLoading(false);
        return false;
      }
    } catch (error) {
      showToast('OTP verification failed', 'error');
      setLoading(false);
      return false;
    } 
    // finally {
    //   setLoading(false);
    // }
  };
  

  return (
    <>
      {/* {!validateCaptcha ? 
      <ReCAPTCHA sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI" onChange={handleVerify} />
      : */}
      <>
        <Header />
        <div className="otp_page_container">
          <div className="left">
            <img src="./assets/otp_img.svg" alt="OTP" />
          </div>
          <div className="right">
            <div className="otp-page">
              {error && <p className="error" aria-live="assertive">{error}</p>}
              <div className='welcome_back_section'>
                <p>Hi</p>
                <h2>Welcome Back!</h2>
                <img className='for_mobile' src="./assets/welcome_back_icon.svg" alt="OTP" />
              </div>
              <div className='for_mobile'>
                <p>Enter Your 4 Digit MPIN</p>
              </div>
              <div className='for_desktop'>
                <h2>OTP Verification</h2>
                <p>Please enter the verification code sent to your registered mobile number</p>
              </div>
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
              <div className='submit_resend_cont'>
                <Button handleSubmit={handleSubmit} btnVal={"Verify"} disabled={!isOtpSent} />
                <div class="resend">
                  Didn’t Receive the OTP? <a href="#">Resend OTP</a>
                </div>
                <div class="forgot">
                  <a href="#">Forgot MPIN ?</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
      {/* } */}
      {loading && <Loader />}
    </>
  );
};

export default OTPPage;