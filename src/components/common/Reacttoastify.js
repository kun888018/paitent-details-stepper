import { toast } from 'react-toastify';

export const showToast = (message = 'Page loaded successfully!', type = 'info') => {
  toast[type](message, {
    position: 'top-right',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  });
};

