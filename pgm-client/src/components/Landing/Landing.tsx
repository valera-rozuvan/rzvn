import React from 'react';
import { Link } from 'react-router-dom';

import Header from '../Header';
import Footer from '../Footer';

function Landing() {
  return (
    <>
      <Header />
      <p>
        Minimalistic, p2p encrypted, messaging system.
        Browser client, CLI client, open API available.
        Anonymous.
        {' '}
      </p>
      <Link to="/login">start messaging</Link>
      <Footer />
    </>
  );
}

export default Landing;
