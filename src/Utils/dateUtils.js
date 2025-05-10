// src/utils/dateUtils.js

export function calculateAge(dobString) {
    const dob = new Date(dobString);
    const today = new Date();
  
    let age = today.getFullYear() - dob.getFullYear();
  
    const hasBirthdayPassedThisYear =
      today.getMonth() > dob.getMonth() ||
      (today.getMonth() === dob.getMonth() && today.getDate() >= dob.getDate());
  
    if (!hasBirthdayPassedThisYear) {
      age--;
    }
  
    return age;
}

// src/utils/dateUtils.js

// src/utils/dateUtils.js

export function formatDOB(dobString) {
    const date = new Date(dobString);
  
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const year = String(date.getFullYear()).slice(-2); // Last 2 digits
  
    return `${day}/${month}/${year}`;
}
  
  
  