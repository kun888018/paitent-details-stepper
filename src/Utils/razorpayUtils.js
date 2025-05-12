import { loadRazorpayScript } from './loadRazorpayScript';

export const openRazorpay = async (orderData, onSuccess) => {
    const isScriptLoaded = await loadRazorpayScript();

    if (!isScriptLoaded) {
        console.error("Razorpay SDK failed to load.");
        alert("Payment system is unavailable. Please try again later.");
        return;
    }

    const options = {
        key: orderData?.options?.key,
        amount: orderData?.options?.amount,
        currency: orderData?.options?.currency,
        name: 'My Company',
        description: 'Product Description',
        image: 'https://your-logo.com/logo.png',
        order_id: orderData?.options?.order_id,
        handler: function (response) {
            console.log('Payment Success:', response);
            if (onSuccess) onSuccess(response);
        },
        prefill: orderData?.prefill,
        theme: {
            color: '#3399cc',
        },
    };

    console.log("options====>", options);

    if (!options?.key || !options?.amount || !options?.order_id) {
        console.error("Missing required Razorpay fields:", options);
        alert("Payment could not be initiated. Missing required details.");
        return;
    }

    const rzp = new window.Razorpay(options);
    rzp.open();
};








// // utils/razorpayUtils.js
// export const openRazorpay = (orderData, onSuccess) => {
//     const options = {
//         key: orderData?.options?.key, // Replace with your Razorpay Key ID
//         amount: orderData?.options?.amount,
//         currency: orderData?.options?.currency,
//         name: 'My Company',
//         description: 'Product Description',
//         image: 'https://your-logo.com/logo.png',
//         order_id: orderData?.options?.order_id,
//         handler: function (response) {
//             console.log('Payment Success:', response);
//             if (onSuccess) onSuccess(response); // Callback for success
//         },
//         //   prefill: {
//         //     name: 'Customer Name',
//         //     email: 'customer@example.com',
//         //     contact: '9999999999',
//         //   },
//         prefill: orderData?.prefill,
//         theme: {
//             color: '#3399cc',
//         },
//     };

//     const rzp = new window.Razorpay(options);
//     rzp.open();
// };



