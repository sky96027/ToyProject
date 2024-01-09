/* Footer.js */
import React from 'react';

const Footer = () => {
    const footerStyle = {
        backgroundColor: '#333',
        color: '#fff',
        padding: '10px',
        textAlign: 'center',
        position: 'fixed',
        bottom: '0',
        width: '100%',
    };

    return (
        <footer style={footerStyle}>
            <hr />
            This place is footer.
        </footer>
    );
};

export default Footer;