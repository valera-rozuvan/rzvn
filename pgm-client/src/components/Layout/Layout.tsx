import React, { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

import Header from '../Header';
import Footer from '../Footer';
import FooterUser from '../FooterUser';

function Landing() {
  const [footerMain, setFooterMain] = useState(false);
  const locationUrl = useLocation();
  const [pathName, setPathName] = useState(locationUrl.pathname);

  useEffect(() => {
    // debugger;
    if ((pathName === '/') || (pathName === '/login')) {
      setFooterMain(true);
    } else {
      setFooterMain(false);
    }
  }, [pathName]);
  useEffect(() => {
    setPathName(locationUrl.pathname);
  }, [locationUrl]);

  return (
    <>
      <Header />
      <Outlet />
      {footerMain === true
        ? <Footer />
        : <FooterUser />}

    </>
  );
}

export default Landing;
