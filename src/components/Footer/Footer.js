import React from 'react';
import './footer.css';
import Button from '../common/Button';


const Footer = () => {

    const handleSubmit = () => {
        console.log("=====>");
    }

    return (
        <footer class="app-Footer">
            <Button handleSubmit={handleSubmit} btnVal={"Pay Now"} />
            <p class="note_text">You can also choose to pay by cash at payment desk</p>
        </footer>
    );
};

export default Footer;