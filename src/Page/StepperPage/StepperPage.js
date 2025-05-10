import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import DischargeTracking from './../DischargeTracking/DischargeTracking';
import Header from '../../components/Header/Header';

const StepperPage = () => {
  const [searchParams] = useSearchParams();
  const [steps, setSteps] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const uhid = searchParams.get('uhid');
  const episodeNumber = searchParams.get('episode_number');

  useEffect(() => {
    if (!uhid || !episodeNumber) {
      setError('Invalid URL parameters.');
      return;
    }

    const expirationTime = JSON.parse(localStorage.getItem('otpVerification'))?.expirationTime;
    if (!expirationTime || Date.now() > expirationTime) {
      navigate(`/?uhid=${uhid}&episode_number=${episodeNumber}`);
      return;
    }

    // Fetch step data (replace with actual API call)
    const fetchSteps = async () => {
      try {
        const response = await Promise.resolve([
          { id: 1, name: 'Medical Discharge Initiated', status: 'completed' },
          { id: 2, name: 'Discharge Summary Authorized', status: 'completed' },
          { id: 3, name: 'Pharmacy Clearance', status: 'active' },
          { id: 4, name: 'Nursing Clearance', status: 'pending' },
        ]);
        setSteps(response);
      } catch (err) {
        setError('Failed to load step data.');
      }
    };

    fetchSteps();
  }, [uhid, episodeNumber, navigate]);

  if (error) {
    return <p style={{ color: 'red' }}>{error}</p>;
  }

  return (
    <div className="stepper-page">
      <Header />
      <DischargeTracking />
    </div>
  );
};

export default StepperPage;
