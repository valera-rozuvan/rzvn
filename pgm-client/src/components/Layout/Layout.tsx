import React, { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

import Header from '../Header';
import HeaderUser from '../HeaderUser';
import Footer from '../Footer';
import FooterUser from '../FooterUser';

function Landing() {
  const [footerMain, setFooterMain] = useState(false);
  const [footerUser, setFooterUser] = useState(false);
  const [headerMain, setHeaderMain] = useState(false);
  const [headerUser, setHeaderUser] = useState(false);
  const locationUrl = useLocation();
  const [pathName, setPathName] = useState(locationUrl.pathname);

  const linksHeader = [
    {
      url: '/',
    },
    {
      url: '/login',
    },
    {
      url: '/generator',
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
  const linksHeaderUser = [
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
    const headerFirst = linksHeader.some((link) => pathName.match(link.url));
    const headerSecond = linksHeaderUser.some((link) => pathName.match(link.url));
    const checkMessagingPageforHeader = pathName === '/messaging';

    if (headerFirst) {
      setHeaderUser(false);
      setHeaderMain(true);
    } if (headerSecond) {
      setHeaderMain(false);
      setHeaderUser(true);
    } if (checkMessagingPageforHeader) {
      setHeaderMain(false);
      setHeaderUser(false);
    }

    const footerFirst = linksFooter.some((link) => pathName.match(link.url));
    const footerSecond = linksFooterUser.some((link) => pathName.match(link.url));
    const checkMessagingPageforFooter = pathName === '/messaging';

    if (footerFirst) {
      setFooterUser(false);
      setFooterMain(true);
    } if (footerSecond) {
      setFooterMain(false);
      setFooterUser(true);
    } if (checkMessagingPageforFooter) {
      setFooterMain(false);
      setFooterUser(false);
    }
  }, [pathName]);

  return (
    <>
      {headerMain && (
        <Header />
      )}
      {headerUser && (
        <HeaderUser />
      )}
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
