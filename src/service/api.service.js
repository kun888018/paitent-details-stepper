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