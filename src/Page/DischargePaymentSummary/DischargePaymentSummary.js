import React from 'react';
import './DischargePaymentSummary.css';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import BackIconText from '../../components/common/BackIconText';
import { decryptData, encryptData } from '../../Utils/cryptoUtils';
import { IpDepositPaymentDetails, IpPaymentResponseDetails } from '../../service/api.service';
import { openRazorpay } from '../../Utils/razorpayUtils';

const DischargePaymentSummary = () => {

    const otpVerificationData = JSON.parse(localStorage.getItem('otpVerification'));
    const userEmail = localStorage.getItem('userEmail');
    const PatientName = localStorage.getItem('PatientName');
    const MobileNo = localStorage.getItem('MobileNo');

    const [loading, setLoading] = React.useState(false);

    const handleIpDepositPaymentDetails = () => {
        setLoading(true);

        const parmObj = {
            account: {
                account_number: otpVerificationData?.verifiedUhid,
                amount: "300",
                email: userEmail,
                patient_name: PatientName,
                phone: MobileNo,
            },
            location_code: localStorage.getItem('locationCode'),
            user_id: localStorage.getItem('userId'),
        };

        const reqParm = {
            _data: encryptData(parmObj),
        };

        IpDepositPaymentDetails(reqParm).then((response) => {
            const decryptedData = JSON.parse(decryptData(response?.data?._data));
            const tokenData = decryptedData?.token;

            console.log("Decrypted Razorpay Token:", tokenData);

            if (!tokenData || !tokenData?.order_id || !tokenData?.auth?.key) {
                console.error("Invalid token data received:", tokenData);
                alert("Unable to initiate payment. Please try again.");
                return;
            }

            const orderData = {
                options: {
                    key: tokenData?.auth?.key,
                    amount: tokenData?.accounts[0]?.amount,
                    currency: "INR",
                    order_id: tokenData?.order_id,
                },
                prefill: {
                    name: tokenData?.accounts[0]?.patient_name,
                    email: tokenData?.accounts[0]?.email,
                    contact: tokenData?.accounts[0]?.phone,
                },
            };

            if (response?.status === 200 && tokenData?.order_id) {
                openRazorpay(orderData, (paymentResult) => {
                    // alert("Payment was successful!");
                    // console.log("Payment Result:", paymentResult);
                    const parmObj = {
                        uhid: otpVerificationData?.verifiedUhid,
                        episode: otpVerificationData?.verifiedEpisodeNumber,
                        amount: "300",
                        trans_id: paymentResult?.razorpay_payment_id,
                        tracker_user_id: paymentResult?.razorpay_signature
                    };
                    handleIpPaymentResponseDetails(parmObj)
                });
            } else {
                console.error("Order data missing or invalid:", orderData);
            }
        }).catch((error) => {
            console.error("Error in IP Deposit API:", error);
            alert("Failed to start payment. Please try again later.");
        }).finally(() => {
            setLoading(false);
        });
    };

    const handleIpPaymentResponseDetails = (parmObj) => {
        setLoading(true);

        console.log("handleIpPaymentResponseDetails=======>2", parmObj)

        const reqParm = {
            _data: encryptData(parmObj),
        };

        IpPaymentResponseDetails(reqParm).then((response) => {
            console.log("IpPaymentResponseDetails====>", response)
            // const decryptedData = JSON.parse(decryptData(response?.data?._data));
        }).catch((error) => {
            console.error("Error in IP Deposit API:", error);
        }).finally(() => {
            setLoading(false);
        });
    };

    const handleBtnFunction = () => {
        handleIpDepositPaymentDetails();
    }



    return (
        <>
            <Header />

            <div className="receipt_container container">
                <BackIconText />
                <div className="receipt_body">

                    <div className="header">
                        <img src="/assets/manipal_hospitals_logo.svg" alt="Manipal Hospitals Logo" className="logo" />
                        <div className="headerRight">
                            <div><strong>Receipt Number:</strong> MHWP100073</div>
                            <div><strong>Date:</strong> 07-12-2023</div>
                        </div>
                    </div>

                    <h2 className="sectionTitle">Vaccination Package Appointment Confirmation Receipt</h2>

                    <p>Dear Uyd M Hhh</p>
                    <p className="successMessage">
                        Your Payment has been successfully received with the following package details.
                    </p>

                    <h3 className="sectionTitle">Payment Details</h3>
                    <table className="table">
                        <tbody>
                            <tr><td className="tdBold">UHID</td><td className="td">MH011380133</td></tr>
                            <tr><td className="tdBold">Transaction Status</td><td className="td">Success</td></tr>
                            <tr><td className="tdBold">Receipt Number</td><td className="td">MHWP100073</td></tr>
                            <tr><td className="tdBold">Amount</td><td className="td">Rs. 2000</td></tr>
                            <tr><td className="tdBold">Transaction Date & Time</td><td className="td">December 7th 2023, 9:51:38 am</td></tr>
                        </tbody>
                    </table>

                    <h3 className="sectionTitle">Package Details</h3>
                    <table className="table">
                        <tbody>
                            <tr><td className="tdBold">Hospital Name</td><td className="td">Whitefield - Bengaluru</td></tr>
                            <tr><td className="tdBold">Patient Name</td><td className="td">Uyd M Hhh</td></tr>
                            <tr><td className="tdBold">Mobile Number</td><td className="td">9849055640</td></tr>
                            <tr><td className="tdBold">Email ID</td><td className="td">muthugeetha10@gmail.com</td></tr>
                            <tr><td className="tdBold">Package Details</td><td className="td">Guardian HPV Vaccine package</td></tr>
                            <tr><td className="tdBold">Appointment Date & Time</td><td className="td">December 9th 2023, 10:20 am</td></tr>
                        </tbody>
                    </table>

                    <p className="footerMessage">
                        Thank you for giving us the opportunity to serve you. We value our relationship.
                    </p>

                    <div className="footer">
                        <div>Appointment Helpline: 1800 102 5555</div>
                        <div>
                            Website: <a href="https://www.manipalhospitals.com" target="_blank" rel="noreferrer" className="link">
                                www.manipalhospitals.com
                            </a>
                        </div>
                        <div>
                            Email: <a href="mailto:info@manipalhospitals.com" className="link">
                                info@manipalhospitals.com
                            </a>
                        </div>
                    </div>
                </div>
            </div>


            <Footer handleBtnFunction={handleBtnFunction} />
        </>
    );
};


export default DischargePaymentSummary;
