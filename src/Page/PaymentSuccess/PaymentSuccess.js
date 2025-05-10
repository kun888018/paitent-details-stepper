import React, { useEffect } from 'react';
import './PaymentSuccess.css';
import Header from '../../components/Header/Header';
import { SendOtp } from '../../service/api.service';
import { encrypt, decrypt, compare } from 'n-krypta';
import SECRET_KEY_CONFIG from '../../service/SecretKeyDeclaration';

import CryptoJS from "crypto-js";




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
                    <img width={120} src='assets/successs_cirle_icon.svg' />
                    <div className="status">Payment Successful</div>
                    <div className="amount">₹ 980</div>
                </div>

                <div className="payment-footer-container">
                    <div className='details'>
                        <div className="details_container">
                            <div className='heading_name'>Manipal Hospital Malleshwarama, Bengaluru..</div>
                            <div className='sub_heading_name'>May 30, 2023 | 02:59 PM</div>
                            <br />
                            <div className='upi_id_details'>
                                <span className='upi_id'>UPI </span>
                                - 
                                <a href="#" className="upi-link"> pay_LvpDRVAM77tsRc </a>
                                -
                                <a href='#' ><img className="copy-icon" src='assets/prime_copy.svg' /></a>
                                {/* <span className="copy-icon" title="Copy">📋</span> */}
                            </div>
                            <div className="support-text">
                                <img src='assets/symbols_info.svg' /> Visit <strong> Razorpay.Com/Support </strong> For Queries
                            </div>
                        </div>
                    </div>

                    <div className="redirect-message" >Redirecting In 4 Seconds...</div>
                </div>
            </div>
        </>
    );
};

export default PaymentSuccess;
