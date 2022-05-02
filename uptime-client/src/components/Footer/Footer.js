import React from 'react';

import WrapperNoMargin from '../WrapperNoMargin';

import './style.css';

const Footer = () => {
  return (
    <footer className='footer'>
      <WrapperNoMargin>
        <span className='copyright'>&copy; RZVN networks</span>
      </WrapperNoMargin>
    </footer>
  );
};

export default Footer;
