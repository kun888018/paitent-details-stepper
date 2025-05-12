import axios from "axios";
import API_CONFIG from "./ApiDeclaration";

export function SendOtp(reqParm) {
    const URL = API_CONFIG.SEND_OTP;
    // const headers = {
    //     'Content-Type': 'application/json'
    // };
    return axios.post(URL, reqParm);
}

// export function SendOtp(param, token) {
//     const URL = API_CONFIG.SEND_OTP + param;
//     const headers = {
//         headers: { Authorization: `Bearer ${token}` },
//     };
//     return axios.get(URL, headers);
// }

export function VerifyOtp(reqParm) {
    const URL = API_CONFIG.VERIFY_OTP;
    // const headers = {
    //     'Content-Type': 'application/json'
    // };
    return axios.post(URL, reqParm);
}

export function DischargeUserDetails(reqParm) {
    const URL = API_CONFIG.DISCHARGE_USER_DETAILS;
    // const headers = {
    //     'Content-Type': 'application/json'
    // };
    return axios.post(URL, reqParm);
}

export function IpDepositPaymentDetails(reqParm) {
    const URL = API_CONFIG.IP_DEPOSIT_PAYMENT;
    // const headers = {
    //     'Content-Type': 'application/json'
    // };
    return axios.post(URL, reqParm);
}

export function IpPaymentResponseDetails(reqParm) {
    const URL = API_CONFIG.IP_PAYMENT_RESPONSE;
    // const headers = {
    //     'Content-Type': 'application/json'
    // };
    return axios.post(URL, reqParm);
}




// export function DischargeUserDetails(reqParm) {
//     const URL = API_CONFIG.DISCHARGE_USER_DETAILS;
//     return axios({
//         method: 'get',
//         url: URL,
//         data: reqParm, // manually add body
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         transformRequest: [(data, headers) => JSON.stringify(data)],
//     });
// }


