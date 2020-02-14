import React from 'react';

import './Footer.css';

const Footer = ({isQuestion}) => {
  const wantedText = (question) => {
    if (question) {
      return (
        <>
          <span>any key</span> for the answer
        </>
      );
    } else {
      return (
        <>
          <span>any key</span> to continue
        </>
      );
    }
  };

  return (
    <div className='footer'>
      <small>{wantedText(isQuestion)}</small>
    </div>
  );
};


export default Footer;
