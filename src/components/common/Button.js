import React from 'react';

const Button = ({handleSubmit, btnVal}) => {
    return (
        <button onClick={handleSubmit} className="submit-btn">
            {btnVal}
        </button>
    );
};

export default Button;