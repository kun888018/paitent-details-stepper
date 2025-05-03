// import React from "react";

// const loadRazorpayScript = () => {
//   return new Promise((resolve) => {
//     const script = document.createElement("script");
//     script.src = "https://checkout.razorpay.com/v1/checkout.js";
//     script.onload = () => resolve(true);
//     script.onerror = () => resolve(false);
//     document.body.appendChild(script);
//   });
// };

// const RazorpayButton = () => {
//   const handleRazorpayPayment = async () => {
//     const res = await loadRazorpayScript();

//     if (!res) {
//       alert("Razorpay SDK failed to load. Check your internet.");
//       return;
//     }

//     const options = {
//       key: "YOUR_RAZORPAY_KEY_ID",
//       amount: 50000,
//       currency: "INR",
//       name: "Your Company Name",
//       description: "Test Payment",
//       image: "https://your-logo-url.com/logo.png",
//       handler: function (response) {
//         alert(`Payment Successful! Payment ID: ${response.razorpay_payment_id}`);
//       },
//       prefill: {
//         name: "John Doe",
//         email: "john@example.com",
//         contact: "9999999999",
//       },
//       theme: {
//         color: "#3399cc",
//       },
//     };

//     const rzp = new window.Razorpay(options);
//     rzp.open();
//   };

//   return <button onClick={handleRazorpayPayment}>Pay ₹500</button>;
// };

// export default RazorpayButton;






////////////////////////////////////////////////////////////////////////////////

// import React from "react";

// const loadRazorpayScript = () => {
//   return new Promise((resolve) => {
//     const script = document.createElement("script");
//     script.src = "https://checkout.razorpay.com/v1/checkout.js";
//     script.onload = () => resolve(true);
//     script.onerror = () => resolve(false);
//     document.body.appendChild(script);
//   });
// };

// const RazorpayButton = () => {
//   const handleRazorpayPayment = async () => {
//     const res = await loadRazorpayScript();

//     if (!res) {
//       alert("Failed to load Razorpay SDK. Check your internet.");
//       return;
//     }

//     const options = {
//       key: "rzp_test_YourKeyHere", 
//       amount: 50000, 
//       currency: "INR",
//       name: "My React App",
//       description: "Test Payment",
//       image: "https://your-logo-url.com/logo.png",
//       handler: function (response) {
//         alert(`Payment Successful! Payment ID: ${response.razorpay_payment_id}`);
//       },
//       prefill: {
//         name: "Demo User",
//         email: "demo@example.com",
//         contact: "9999999999",
//       },
//       notes: {
//         address: "Demo Corporate Office",
//       },
//       theme: {
//         color: "#0d6efd",
//       },
//     };

//     const rzp = new window.Razorpay(options);
//     rzp.open();
//   };

//   return (
//     <button
//       onClick={handleRazorpayPayment}
//       style={{
//         padding: "10px 20px",
//         fontSize: "16px",
//         backgroundColor: "#0d6efd",
//         color: "#fff",
//         border: "none",
//         borderRadius: "5px",
//         cursor: "pointer",
//       }}
//     >
//       Pay ₹500
//     </button>
//   );
// };

// export default RazorpayButton;





// import React, {useState} from "react";


// const RazorpayButton = () => {

//     const [paymentId, setPaymentId] = useState('');

//     const loadScript = (src) => {
//         return new Promise((resolve) => {
//             const script = document.createElement("script");
//             script.src = src;
//             script.onload = () => resolve(true);
//             script.onerror = () => resolve(false);
//             document.body.appendChild(script);
//         });
//     }

//     const displayRazorpay = async () => {
//         const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js');
//         if (!res) {
//             alert("Failed to load Razorpay SDK. Check your internet.");
//             return;
//         }
//         const options = {
//             key: "rzp_test_9XbJPu0vOzevBn", 
//             amount: 50000, 
//             currency: "INR",
//             name: "My React App",
//             description: "Test Payment",
//             image: "https://your-logo-url.com/logo.png",
//             handler: function (response) {
//               alert(`Payment Successful! Payment ID: ${response.razorpay_payment_id}`);
//               setPaymentId(response.razorpay_payment_id);
//             },
//             prefill: {
//               name: "Demo User",
//               email: "demo@example.com",
//               contact: "9999999999",
//             },
//             notes: {
//               address: "Demo Corporate Office",
//             },
//             theme: {
//               color: "#0d6efd",
//             },
//         };
      
//         const rzp = new window.Razorpay(options);
//         rzp.open();
//     };


//     return (
//         <button
//         onClick={displayRazorpay}
//         style={{
//             padding: "10px 20px",
//             fontSize: "16px",
//             backgroundColor: "#0d6efd",
//             color: "#fff",
//             border: "none",
//             borderRadius: "5px",
//             cursor: "pointer",
//         }}
//         >
//         Pay ₹500
//         </button>
//     );
// };

// export default RazorpayButton;


import React, { useState } from "react";

const RazorpayButton = () => {
  const [paymentId, setPaymentId] = useState("");

  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const displayRazorpay = async () => {
    const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");
    if (!res) {
      alert("Failed to load Razorpay SDK. Check your internet.");
      return;
    }

    const options = {
      key: "rzp_test_ZdQLUACUmakPWB", // Replace with your test/live key
      amount: 50000, // in paisa = ₹500
      currency: "INR",
      name: "My React App",
      description: "Test Payment",
      image: "https://your-logo-url.com/logo.png",
      handler: function (response) {
        alert(`✅ Payment Successful!\nPayment ID: ${response.razorpay_payment_id}`);
        setPaymentId(response.razorpay_payment_id);
      },
      prefill: {
        name: "Demo User",
        email: "demo@example.com",
        contact: "9999999999",
      },
      notes: {
        address: "Demo Corporate Office",
      },
      theme: {
        color: "#0d6efd",
      },
      modal: {
        ondismiss: function () {
          alert("⚠️ Payment cancelled by the user.");
        },
      },
    };

    const rzp = new window.Razorpay(options);

    // Optional: Handle failure events in detail
    rzp.on("payment.failed", function (response) {
      alert(
        `❌ Payment Failed!\nReason: ${response.error.description}\nCode: ${response.error.code}\nSource: ${response.error.source}\nStep: ${response.error.step}\nPayment ID: ${response.error.metadata.payment_id}`
      );
    });

    rzp.open();
  };

  return (
    <>
      <button
        onClick={displayRazorpay}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          backgroundColor: "#0d6efd",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Pay ₹500
      </button>
      {paymentId && (
        <p style={{ marginTop: "10px", color: "green" }}>
          Last Payment ID: {paymentId}
        </p>
      )}
    </>
  );
};

export default RazorpayButton;


