const API_CONFIG = {
    SEND_OTP: process.env.REACT_APP_API_URL + 'tracker_login',
    VERIFY_OTP: process.env.REACT_APP_API_URL + 'verify_tracker_otp',
    DISCHARGE_USER_DETAILS: process.env.REACT_APP_API_URL + 'discharge_user_details',
    IP_DEPOSIT_PAYMENT:  process.env.REACT_APP_API_URL + 'ip_deposit_payment',
    IP_PAYMENT_RESPONSE:  process.env.REACT_APP_API_URL + 'ip_payment_response',
};

export default API_CONFIG;