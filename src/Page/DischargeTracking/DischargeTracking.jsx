import React, {useState} from "react";
import "./DischargeTracking.css";
// import {expandArrow} from  './../../../public/assets/expand_arrow.svg';

const DischargeTracking = () => {

    const steps = [
        {
          title: 'Medical Discharge Initiated',
          time: 'Fri 22 Aug, 10:31 PM',
          status: 'completed',
        },
        {
          title: 'Discharge Summary Authorized',
          time: 'Fri 22 Aug, 10:31 PM',
          status: 'completed',
        },
        {
          title: 'Pharmacy Clearance',
          time: 'ETA by Fri 22 Aug, 10:31 PM',
          status: 'in-progress',
        },
        {
          title: 'Nursing Clearance',
          time: '',
          status: 'pending',
        },
        {
          title: 'Bill Prepared',
          time: '',
          status: 'pending',
        },
        {
          title: 'Bill Sent To Insurance',
          time: '',
          status: 'pending',
        },
    ];


    const [expandedStep, setExpandedStep] = useState(null);

    const handleToggle = (index) => {
        setExpandedStep(expandedStep === index ? null : index);
    };
    return (
        <div className="discharge-container">
            <div className="banner-section">
                <div className="banner_bg_img">
                    <div className="container banner-section-conatiner">
                        <div className="for_mobile">
                            <div className="back_btn_cont p20_lr_m">
                                <img  className="pointer" src="assets/back_white_icon.svg" alt="" />
                            </div>
                            <div className="ward_payment_container p20_lr_m">
                                <p>
                                    <span>General</span> &nbsp;
                                    <span>Ward</span>
                                </p>
                                <p>
                                    <span>Insurance</span> &nbsp;
                                    <span>Payment</span>
                                </p>
                            </div>
                        </div>
                        <div className="patient-details-heading for_desktop ">
                            <h2>Patient Details</h2>
                        </div>
                        <div className="patient-details-details p20_lr_m">
                            <div className="patient-details-container">
                                <p className="patient-name">Ms. Mohit Kumar Herimath</p>
                                <div className="patient-details-patient">
                                    <p><b>M/37</b> &nbsp; MR# 1HD173598131</p>
                                    <p>Episode: <b>063978</b></p>
                                    <p className="patient-details-dob">
                                        DOB: 13/09/87 &nbsp; EDOD: 18/07/24
                                    </p>
                                </div>
                                <div className="patient-details-doctor">
                                    <p><img src="assets/doctor_icon.svg" alt="" /> <span>Dr. Partha Sarathi Mitra</span></p>
                                    <p><img src="assets/location_icon.svg" alt="" /> <span>Manipal Hospital Malleshwarama, Bengaluru</span></p>
                                    <p className="patient-details-ward">Ward: General &nbsp; Payment: Insurance</p>
                                </div>
                            </div>
                            <div className="room-info">
                                <p>Room No.</p>
                                <div className="room-number-box">101</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container discharge_Tracking">
                <div className="discharge_Tracking_heading">
                    <h2>Discharge Tracking</h2>
                </div>
                <div>
                    <div className="timeline">
                        {steps.map((step, index) => (
                            <div key={index} className={`step ${step.status}`}>
                                {step.status === 'in-progress' && (
                                    <div className="badge">In-Progress</div>
                                )}
                                <div className="title" onClick={() => handleToggle(index)}>
                                    {step.title}

                                    <span className="toggle-icon">
                                        {expandedStep === index ? <img className="collapse_arrow" src="assets/expand_arrow.svg" alt="" /> : <img src="assets/expand_arrow.svg" alt="" /> }
                                    </span>
                                </div>
                                {step.time && <div className="time">{step.time}</div>}
                                
                                {expandedStep === index && (
                                    <div className="additional-info">
                                        {/* Replace this content with relevant step details */}
                                        <p>Here is some additional information about this step.</p>
                                        <p><a href="">Discharge.pdf</a></p>
                                        <p><a href="">Medicaldischarge.pdf</a></p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DischargeTracking;
