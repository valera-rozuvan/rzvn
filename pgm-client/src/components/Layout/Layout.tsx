import React, { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

import Header from '../Header';
import Footer from '../Footer';
import FooterUser from '../FooterUser';

// import s from './layout.module.scss';

function Landing() {
  const [footerMain, setFooterMain] = useState(false);
  const [footerUser, setFooterUser] = useState(false);
  const locationUrl = useLocation();
  const [pathName, setPathName] = useState(locationUrl.pathname);
  const linksFooter = [
    {
      url: '/',
    },
    {
      url: '/login',
    },
    {
      url: '/login/challenge',
    },
    {
      url: '/about',
    },
    {
      url: '/policy',
    },
    {
      url: '/contact',
    },
  ];
  const linksFooterUser = [
    {
      url: '/generator',
    },
    {
      url: '/profile',
    },
    {
      url: '/friends',
    },
    {
      url: '/friends/add',
    },
    {
      url: '/friends/edit/',
    },
    {
      url: '/groups',
    },
    {
      url: '/groups/add/',
    },
  ];
  useEffect(() => {
    setPathName(locationUrl.pathname);
  }, [locationUrl]);

  useEffect(() => {
    const footerFirst = linksFooter.some((link) => pathName === link.url);
    const footerSecond = linksFooterUser.some((link) => pathName === link.url);
    const checkMessagingPage = pathName === '/messaging';

    if (footerFirst) {
      setFooterUser(false);
      setFooterMain(true);
    } if (footerSecond) {
      setFooterMain(false);
      setFooterUser(true);
    } if (checkMessagingPage) {
      setFooterMain(false);
      setFooterUser(false);
    }
  }, [pathName]);

  return (
    <>
      <Header />
      <Outlet />
      {footerMain && (
        <Footer />
      )}
      {footerUser && (
        <FooterUser />
      )}
    </>
  );
}

export default Landing;
