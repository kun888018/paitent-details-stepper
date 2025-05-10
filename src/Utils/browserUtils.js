export const generateBrowserId = () => {
    return `${navigator.userAgent}-${Date.now()}-${Math.random().toString(36).substring(2, 15)}`;
};
  
export const getStoredBrowserId = () => {
    return localStorage.getItem('browserId');
};
  