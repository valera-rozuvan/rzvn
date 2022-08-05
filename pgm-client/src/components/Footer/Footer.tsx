import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import s from './footer.module.scss';

function Footer() {
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
      {footerMain && (
        <footer className={s.footer}>
          <ul>
            <li><Link to="/about">about</Link></li>
            <li><Link to="/policy">policy</Link></li>
            <li><Link to="/contact">contact</Link></li>
          </ul>
        </footer>
      )}
      {footerUser && (
        <footer className={s.footer}>
          <ul>
            <li><Link to="/messaging">msg</Link></li>
            <li><Link to="/friends">friends</Link></li>
            <li><Link to="/groups">groups</Link></li>
            <li><Link to="/profile">profile</Link></li>
            <li><Link to="/">logout</Link></li>
          </ul>
        </footer>
      )}
    </>
  );
}

export default Footer;
