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

    const sampleString = {
        uhid: "MH016110626"
    }


    

    // Generate a random IV
    const generateIV = () => CryptoJS.lib.WordArray.random(16);

    // Encrypt data using AES-256-CBC
    const encryptData = (data, secretKey) => {
        const iv = generateIV();
        const encrypted = CryptoJS.AES.encrypt(JSON.stringify(data), CryptoJS.enc.Utf8.parse(secretKey), {
            iv: iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        });

        return {
            iv: iv.toString(CryptoJS.enc.Hex),
            data: encrypted.toString()
        };
    };

    // Send encrypted data via API
    const sendEncryptedData = async (data) => {
        const secretKey = process.env.REACT_APP_SECRET_KEY || "`;yEgY5R/G>Bz*vN-r";
        const encryptedData = encryptData(data, secretKey);

        try {
            const response = await fetch("https://your-api-endpoint.com", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(encryptedData),
            });

            const result = await response.json();
            console.log("Response:", result);
        } catch (error) {
            console.error("Error:", error);
        }
    };

    // Example Usage
    sendEncryptedData({ uhid: "MH016110626" });

    


    // const encryptData = (data, secretKey) => {
    //     return CryptoJS.AES.encrypt(JSON.stringify(data), secretKey).toString();
    // };
      
    // const secretKey = "`;yEgY5R/G>Bz*vN-r"; // Use a secure key
    // const encryptedData = encryptData({ uhid: "MH016110626" }, secretKey);
    


    // const encryptedString = encrypt(sampleString, SECRET_KEY_CONFIG.NKRYPTA ); // #Iblankartan!not!svreblankartwhfreblankartzpublankartase!gettiogblankartypvrblankartiofprmatipn,blankartcvtblankartgpoeblankarttopid.blankartI!oeedtblankartuoblankartspeodblankartspneblankarttjmfblankartlearoing!nore!osblankartundesstaoeing!mpre.blankartTiankt!for!eycelleotblankartiogoblankartI!wbsblankartlooling!gorblankartuhjsblankartinfpblankartfos!myblankartnitsion.#

    // console.log("encryptedString====>", encryptedString); // This prints out the encrypted string

    // const decryptedString = decrypt(encryptedString, SECRET_KEY_CONFIG.NKRYPTA); // decrypts the string

    // console.log("encryptedString====>1", decryptedString);


    const handleLogout = () => {
        // setLoading(true);

        let uhidObj = {
            uhid: "MH016110626"
        }


        

        let reqParm = {
            _data: "MH016110626"
        }

        SendOtp(reqParm).then(response => {
            if (response?.data?.statusCode === 200) {
                console.log(response);
                // ToastSuccessService(response?.data?.message);
                // history.push('/');
            } else if (response.data.statusCode === 400) {
                // ToastErrorService(response.data.message);
            }
        }).catch(error => {
            if (error?.response?.data?.statusCode === 401) {
                // history.push('/')
            }
            // ToastErrorService(error?.response?.data.message);
        }).finally(() => {
            // setLoading(false);
        })
    }

    return (
        <>
            <Header />
            {/* <div>{process.env.REACT_APP_API_URL}</div> */}
            <div className="payment-container">
                <div className="content">
                    {/* <div className="checkmark-circle">
                        <span className="checkmark">✔</span>
                    </div> */}
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

                    <div className="redirect-message" onClick={handleLogout}>Redirecting In 4 Seconds...</div>
                </div>
            </div>
        </>
    );
};

export default PaymentSuccess;
