import React, { useEffect } from 'react';
import './PaymentSuccess.css';
import Header from '../../components/Header/Header';

const PaymentSuccess = () => {
    // useEffect(() => {
    //     const timer = setTimeout(() => {
    //         window.location.href = '/';
    //     }, 4000);
    //     return () => clearTimeout(timer);
    // }, []);

    return (
        <>
            <Header />
            <div className="payment-container">
                <div className="content">
                    <div className="checkmark-circle">
                        <span className="checkmark">✔</span>
                    </div>
                    <div className="status">Payment Successful</div>
                    <div className="amount">₹ 980</div>
                </div>

                <div className="payment-footer-container">
                    <div className="details">
                        <div>Manipal Hospital Malleshwarama, Bengaluru..</div>
                        <div>May 30, 2023 | 02:59 PM</div>
                        <br />
                        <div>
                            UPI - <a href="#" className="upi-link">pay_LvpDRVAM77tsRc</a>
                            <span className="copy-icon" title="Copy">📋</span>
                        </div>
                        <div className="support-text">
                            Visit <strong>Razorpay.Com/Support</strong> For Queries
                        </div>
                    </div>

                    <div className="redirect-message">Redirecting In 4 Seconds...</div>
                </div>
            </div>
        </>
    );
};

export default PaymentSuccess;
