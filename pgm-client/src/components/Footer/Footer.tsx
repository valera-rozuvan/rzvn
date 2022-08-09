import React, { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

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
    // {
    //   url: '/friends/add',
    // },
    // {
    //   url: '/friends/edit/',
    // },
    {
      url: '/groups',
    },
    // {
    //   url: '/groups/add/',
    // },
  ];
  // const linksFooterUserDeep = [
  //   {
  //     url: '/friends/add',
  //   },
  //   {
  //     url: '/friends/edit/',
  //   },
  //   {
  //     url: '/groups/add/',
  //   },
  //   {
  //     url: '/groups/members/',
  //   },
  // ];
  useEffect(() => {
    setPathName(locationUrl.pathname);
  }, [locationUrl]);

  useEffect(() => {
    const footerFirst = linksFooter.some((link) => pathName.match(link.url));
    const footerSecond = linksFooterUser.some((link) => pathName.match(link.url));
    // || linksFooterUserDeep.some((link) => pathName.match(link.url));
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
  const setActive = ({ isActive }: { isActive: boolean }) => (isActive ? s.active : s.inactive);
  return (
    <>
      {footerMain && (
        <footer className={s.footer}>
          <ul>
            <li><NavLink className={setActive} to="/about">about</NavLink></li>
            <li><NavLink className={setActive} to="/policy">policy</NavLink></li>
            <li><NavLink className={setActive} to="/contact">contact</NavLink></li>
          </ul>
        </footer>
      )}
      {footerUser && (
        <footer className={s.footer}>
          <ul>
            <li><NavLink className={setActive} to="/messaging">msg</NavLink></li>
            <li><NavLink className={setActive} to="/friends">friends</NavLink></li>
            <li><NavLink className={setActive} to="/groups">groups</NavLink></li>
            <li><NavLink className={setActive} to="/profile">profile</NavLink></li>
            <li><NavLink className={setActive} to="/">logout</NavLink></li>
          </ul>
        </footer>
      )}
    </>
  );
}

export default Footer;
