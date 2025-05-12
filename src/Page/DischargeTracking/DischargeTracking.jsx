import React, {useEffect, useState} from "react";
import "./DischargeTracking.css";
import { decryptData, encryptData } from "../../Utils/cryptoUtils";
import { DischargeUserDetails } from "../../service/api.service";
import { calculateAge, formatDOB } from "../../Utils/dateUtils";
import { showToast } from "../../components/common/Reacttoastify";
import { useNavigate } from "react-router-dom";

const DischargeTracking = () => {
    const navigate = useNavigate();


    // let DischargeDetailsEncData = "U2FsdGVkX19ForvHG9kWAKDGbL+UNqOjSx5O+LZNIa5twtweC+mRMohEr35qlLqOJzUJh6+HrRph86lxhOd5DdkvjcInR9MWACCWOxB06vV7VhLnmZKRVUu6NVdwhphKJTQ6jITm2rWal+eeHZ2WKh6d6XGzxqGdCCgs+1otjJPlgma3qek1bN9Yq5fWkIoZkSPdP4DMan1404W3n5Z9JKRDH+HmZkwttu7JPoR114r6Lss2ir6gPOko/Z8K9h/B3yvAHcC5b812yX7mY0FwXKiskT5AheZ0nqdF8U3rJFjtjCeBCloRe6nVApalhF79w5IGnxF8EyXWRHBBI+Y2EcpTXzkJn+maZbCQgCMcRpudHsUuUNv5zpqpf5LJK0ETVqFnspw/WKCYxG5bN3rEs8mI1dqMlFMs5XwBZlyxa/sIPQmVg8JdpsnzRSUg2Dwbr2D3xpPtZuDraEei+0/sTT2ACVcDZXW5ejpCWwXJ6t2uhXOuqcA0Caf+gzpZJnaY2JlhViQ9VXd5JERCWdb0CP49ZzHUBQNA5PCuMIGBzxpVLCulVPmS9KEmTGPjeo6mPbcOVjBQHrkYDul806kZdGJmV2PauUQ4tszb/A9dD4j+KvAu6QTV2wm/DqpobR1JXff4lTvMjLTWLlQxVV86qpm8i9VPMa9i9Ap04QyOcwVHEj+goNSJrgHI7GvxGpxYXVSGdbaz4IAM+wzjGMjFpwqWydBZXTmvls+htWXvKiujtDv+vQ1UTFprYazlaqdw+BKftDbKNcq9DntFocbawwuo8x41exqs9g606LmxiK85h9T4LlD3ZEpsEiCFFiMLWVVRHtpvALyV8Ei0pxR3LKlJ79TyFhVxm+P1W7sGQ9JRuk8SXBc/reSxkdMIcesK6rnAX4++CQmQ7Qll2jMNwQxaED2ojuPaVIbwM9PtPkAnTz2YoY3USXtMupv2GmpaknC05LKa22OW+vDLhlSOaLj099JV26qMZRNTO7L67Qrd6AZ2UU9svszWZGo7hQCHTRwaftq7Mq1G4pTzPpWh5M7yc0Wc4NEASaN+IA1YMTMPxR4umUYZileMmm/RV71znq2jlSGlFd6bDUOapLoGkmt2nKdw3rm76qwsY4SMPvZMMoTmD/6dz0hSpEAdjJfq6Bd9jLYcuSwS7Y2stJ7ANTMMPrF4GZ2LxNUvYeILWjMPtccvbaZDapVMs9n/SgHA88C2VtiNZyw7hIMsIcoeAr/jFK+GNMdojbMZ/uatK2b4RZWybA9cjO75gtwEHVRUHyhzl9780ffsxcasqIm3KIq0FTqd4Czp47ZWXxeZ3u4BARa+l4bRavnNRBBMuT16J9RqCM70ATgiLWo3oODb77NuQq4NGIhCHn38CPjzdhgQkysdOkrJ4U6C2VqC3TThhQ083sDQgDfRqBl2WuH89JVwu/Qzub+yBHBVqdEtGHJmaejvKFD0nED9nzgTo7rwg1nkgh9uTPYeTR2AiUWc2A0RNCaAmw+SWjx8dF3AI7c=";
    // let parsVal = JSON.parse(decryptData(DischargeDetailsEncData));
    // setDischargeDetails();
    // console.log("parsVal=====>", parsVal)

    // const steps = [
    //     {
    //       title: 'Medical Discharge Initiated',
    //       time: 'Fri 22 Aug, 10:31 PM',
    //       status: 'completed',
    //     },
    //     {
    //       title: 'Discharge Summary Authorized',
    //       time: 'Fri 22 Aug, 10:31 PM',
    //       status: 'completed',
    //     },
    //     {
    //       title: 'Pharmacy Clearance',
    //       time: 'ETA by Fri 22 Aug, 10:31 PM',
    //       status: 'in-progress',
    //     },
    //     {
    //       title: 'Nursing Clearance',
    //       time: '',
    //       status: 'pending',
    //     },
    //     {
    //       title: 'Bill Prepared',
    //       time: '',
    //       status: 'pending',
    //     },
    //     {
    //       title: 'Bill Sent To Insurance',
    //       time: '',
    //       status: 'pending',
    //     },
    // ];

    const [loading, setLoading] = React.useState(false);
    const [expandedStep, setExpandedStep] = useState(null);
    const [dischargeDetails, setDischargeDetails] = useState(null);
    const [statusSteps, setStatusSteps] = useState([]);

    const handleToggle = (index) => {
        setExpandedStep(expandedStep === index ? null : index);
    };

    const otpVerificationData = JSON.parse(localStorage.getItem('otpVerification'));
    const userEmail = localStorage.getItem('userEmail');
    const PatientName = localStorage.getItem('PatientName');
    const MobileNo = localStorage.getItem('MobileNo');
    
    // const verifiedUhid = otpVerificationData?.verifiedUhid;

    useEffect(() => {
        handleDischargeUserDetails();
    }, [])

    const handleDischargeUserDetails = () => {
        setLoading(true);
        let parmObj = {
            uhid: otpVerificationData?.verifiedUhid,
            episode_number: otpVerificationData?.verifiedEpisodeNumber
        }
    
        let reqParm = {
            _data: encryptData(parmObj)
            // data : parmObj 
        }
    
        DischargeUserDetails(reqParm).then(response => {
            if (response?.status === 200) {
                showToast(JSON.parse(decryptData(response?.data?._data))?.message, 'success');
                let parsVal = JSON.parse(decryptData(response?.data?._data));
                console.log("response===>", parsVal);
                setDischargeDetails(parsVal?.data);
                localStorage.setItem('locationCode', parsVal?.data?.hospital?.code);
                localStorage.setItem('userId', parsVal?.data?.id);

                let steps = [
                    {
                        title: 'Medical Discharge Initiated',
                        // time: 'Fri 22 Aug, 10:31 PM',
                        time: '',
                        status: parsVal?.data?.status?.bill_ready_for_payment ? 'completed' : 'pending',
                        description: 'Here is some additional information about this step.',
                        files: [
                            // { label: 'Discharge.pdf', onClick: handleDischargeSummary },
                            { label: 'Medicaldischarge.pdf', onClick: () => handleDownload('Medicaldischarge.pdf') },
                        ]
                    },
                    {
                        title: 'Discharge Summary Authorized',
                        // time: 'Fri 22 Aug, 10:31 PM',
                        time: '',
                        status: parsVal?.data?.status?.discharge_summary_authorized ? 'completed' : 'pending',
                        description: 'Here is some additional information about this step.',
                        files: [
                            // { label: 'Discharge.pdf', onClick: handleDischargeSummary },
                            { label: 'Medicaldischarge.pdf', onClick: () => handleDownload('Medicaldischarge.pdf') },
                        ]
                    },
                    {
                        title: 'Pharmacy Clearance',
                        // time: 'ETA by Fri 22 Aug, 10:31 PM',
                        time: '',
                        status: parsVal?.data?.status?.pharmacy_clearence ? 'completed' : 'pending',
                        description: 'Here is some additional information about this step.',
                        files: [
                            // { label: 'Discharge.pdf', onClick: handleDischargeSummary },
                            { label: 'Medicaldischarge.pdf', onClick: () => handleDownload('Medicaldischarge.pdf') },
                        ]
                    },
                    {
                        title: 'Nursing Clearance',
                        time: '',
                        status: parsVal?.data?.status?.nursing_clearence ? 'completed' : 'pending',
                        description: 'Here is some additional information about this step.',
                        files: [
                            // { label: 'Discharge.pdf', onClick: handleDischargeSummary },
                            { label: 'Medicaldischarge.pdf', onClick: () => handleDownload('Medicaldischarge.pdf') },
                        ]
                    },
                    {
                        title: 'Bill Prepared',
                        time: '',
                        status: parsVal?.data?.status?.bill_prepared ? 'completed' : 'pending',
                        description: 'Here is some additional information about this step.',
                        files: [
                            // { label: 'Discharge.pdf', onClick: handleDischargeSummary },
                            { label: 'Medicaldischarge.pdf', onClick: () => handleDownload('Medicaldischarge.pdf') },
                        ]
                    },

                    {
                        title: 'Bill Sent To Insurance',
                        time: '',
                        status: parsVal?.data?.status?.bill_sent_to_insurance ? 'completed' : 'pending',
                        description: 'Here is some additional information about this step.',
                        files: [
                            // { label: 'Discharge.pdf', onClick: handleDischargeSummary },
                            { label: 'Medicaldischarge.pdf', onClick: () => handleDownload('Medicaldischarge.pdf') },
                        ],
                        key: 'insurance_only',
                    },
                    {
                        title: 'Insurance Query Raised',
                        time: '',
                        status: parsVal?.data?.status?.insurance_query_raised ? 'completed' : 'pending',
                        description: 'Here is some additional information about this step.',
                        files: [
                            // { label: 'Discharge.pdf', onClick: handleDischargeSummary },
                            { label: 'Medicaldischarge.pdf', onClick: () => handleDownload('Medicaldischarge.pdf') },
                        ],
                        key: 'insurance_only',
                    },
                    {
                        title: 'Insurance Query Replied',
                        time: '',
                        status: parsVal?.data?.status?.insurance_query_replied ? 'completed' : 'pending',
                        description: 'Here is some additional information about this step.',
                        files: [
                            // { label: 'Discharge.pdf', onClick: handleDischargeSummary },
                            { label: 'Medicaldischarge.pdf', onClick: () => handleDownload('Medicaldischarge.pdf') },
                        ],
                        key: 'insurance_only',
                    },

                    {
                        title: 'Final Approval Received',
                        time: '',
                        status: parsVal?.data?.status?.final_approval_received ? 'completed' : 'pending',
                        description: 'Here is some additional information about this step.',
                        files: [
                            // { label: 'Discharge.pdf', onClick: handleDischargeSummary },
                            { label: 'Medicaldischarge.pdf', onClick: () => handleDownload('Medicaldischarge.pdf') },
                        ]
                    },
                    {
                        title: 'Bill Ready for Payment',
                        time: '',
                        status: parsVal?.data?.status?.bill_ready_for_payment ? 'completed' : 'pending',
                        description: 'Here is some additional information about this step.',
                        files: [
                            { label: 'Discharge.pdf', onClick: handleDischargeSummary },
                            { label: 'Medicaldischarge.pdf', onClick: () => handleDownload('Medicaldischarge.pdf') },
                        ]
                    },
                    {
                        title: 'Bill Settled',
                        time: '',
                        status: parsVal?.data?.status?.bill_settled ? 'completed' : 'pending',
                        description: 'Here is some additional information about this step.',
                        files: [
                            // { label: 'Discharge.pdf', onClick: handleDischargeSummary },
                            { label: 'Medicaldischarge.pdf', onClick: () => handleDownload('Medicaldischarge.pdf') },
                        ]
                    },
                ];
                if (parsVal?.data?.payment_type !== "Insurance") {
                    steps = steps.filter(step => step.key !== 'insurance_only');
                }
                setStatusSteps(steps);
            }
        }).catch(error => {
            // showToast(JSON.parse(decryptData(response?.data?._data))?.message, 'error');
            showToast('Tracker User Details retrieve failed', 'error');
        }).finally(() => {
            setLoading(false);
        })
    }

    const handleDischargeSummary = () => {
        navigate(`/dischargePaymentSummary/?uhid=${otpVerificationData?.verifiedUhid}&episode_number=${otpVerificationData?.verifiedEpisodeNumber}`);
    }

    const handleDownload = (filename) => {
        console.log("Download file:", filename);
        // Real download logic here, e.g., window.open or fetch blob
    };

    


    return (
        <div className="discharge-container">
            <div className="banner-section">
                <div className="banner_bg_img">
                    {/* {dischargeDetails?.map((item, index) => ( */}
                        <div className="container banner-section-conatiner">
                            <div className="for_mobile">
                                <div className="back_btn_cont p20_lr_m">
                                    <img  className="pointer" src="assets/back_white_icon.svg" alt="" />
                                </div>
                                <div className="ward_payment_container p20_lr_m">
                                    <p>
                                        <span>{dischargeDetails?.ward_type}</span>&nbsp;
                                        <span>Ward</span>
                                    </p>
                                    <p>
                                        <span>{dischargeDetails?.payment_type}</span>&nbsp;
                                        <span>Payment</span>
                                    </p>
                                </div>
                            </div>
                            <div className="patient-details-heading for_desktop ">
                                <h2>Patient Details</h2>
                            </div>
                            <div className="patient-details-details p20_lr_m">
                                <div className="patient-details-container">
                                    {dischargeDetails?.first_name &&
                                    <p className="patient-name">{dischargeDetails?.gender === 'Male' ? 'Ms.' : 'Mrs.' } {""} {dischargeDetails?.first_name} {""} {dischargeDetails?.middle_name} {""} {dischargeDetails?.last_name}</p>
                                    }
                                    <div className="patient-details-patient">
                                        <p><b>{dischargeDetails?.gender === 'Male' ? 'M' : 'F' }/ { calculateAge(dischargeDetails?.dob)}</b> &nbsp; MR# {dischargeDetails?.uhid_number}</p>
                                        <p>Episode: <b>{dischargeDetails?.uhid_number}</b></p>
                                        <p className="patient-details-dob">
                                            DOA: {formatDOB(dischargeDetails?.date_of_addmission)} &nbsp; EDOD: {formatDOB(dischargeDetails?.date_of_discharge)}
                                        </p>
                                    </div>
                                    <div className="patient-details-doctor">
                                        <p><img src="/assets/doctor_icon.svg" alt="" /> <span>{dischargeDetails?.doctor?.name}</span></p>
                                        <p><img src="/assets/location_icon.svg" alt="" /> <span>{dischargeDetails?.hospital?.name}</span></p>
                                        <p className="patient-details-ward">Ward: {dischargeDetails?.ward_type} &nbsp; Payment: {dischargeDetails?.payment_type}</p>
                                    </div>
                                </div>
                                <div className="room-info">
                                    <p>Room No.</p>
                                    <div className="room-number-box"> {dischargeDetails?.room_number}</div>
                                </div>
                            </div>
                        </div>
                    {/* ))} */}
                </div>
            </div>

            <div className="container discharge_Tracking">
                <div className="discharge_Tracking_heading">
                    <h2>Discharge Tracking</h2>
                </div>
                <div>
                    <div className="timeline">
                        {statusSteps?.map((step, index) => (
                            <div key={index} className={`step ${step.status}`}>
                                {step.status === 'in-progress' && (
                                    <div className="badge">In-Progress</div>
                                )}
                                <div className="title" onClick={() => handleToggle(index)}>
                                    {step.title}

                                    <span className="toggle-icon">
                                        {expandedStep === index ? <img className="collapse_arrow" src="/assets/expand_arrow.svg" alt="" /> : <img src="/assets/expand_arrow.svg" alt="" /> }
                                    </span>
                                </div>
                                {step.time && <div className="time">{step.time}</div>}
                                
                                {/* {expandedStep === index && (
                                    <div className="additional-info">
                                        <p>Here is some additional information about this step.</p>
                                        <p><a href="" onClick={handleDischargeSummary}>Discharge.pdf</a></p>
                                        <p><a href="">Medicaldischarge.pdf</a></p>
                                    </div>
                                )} */}

                                {expandedStep === index && (
                                    <div className="additional-info">
                                        {step.description && <p>{step.description}</p>}

                                        {step.files?.map((file, idx) => (
                                            <p key={idx}>
                                                <a href="#" onClick={(e) => {
                                                    e.preventDefault();
                                                    file.onClick?.();
                                                }}>
                                                    {file.label}
                                                </a>
                                            </p>
                                        ))}
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
