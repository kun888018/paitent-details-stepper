import React from 'react';
import './Loader.css';

const Loader = () => {
    return (
        <div>
            <div className="parentDisable"></div>
            <div id="popup">
                {/* <CircularProgress style={{ color: '#7363D6' }} /> */}
                <img src='assets/loader_gif.gif' />
            </div>
        </div>
    )
}

export default Loader