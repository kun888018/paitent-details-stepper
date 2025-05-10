import React from 'react';

const Button = ({handleSubmit, btnVal, disabled }) => {
    return (
        <button onClick={handleSubmit} className="submit-btn" disabled={disabled} >
            {btnVal}
        </button>
    );
};

export default Button;