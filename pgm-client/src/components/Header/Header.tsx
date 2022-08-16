import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import Logo from '../Icons/Logo/Logo';
import s from './header.module.scss';

function Header() {
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
      setHeaderUser(false); // change on true if u need header on user pages
    } if (checkMessagingPageforHeader) {
      setHeaderMain(false);
      setHeaderUser(false);
    }
  }, [pathName]);
  return (
    <>
      {headerMain && (
        <header className={`${s.header} ${s.headerMain}`}>
          <div className={s.innerContainer}>
            <Link to="/">logo</Link>
          </div>
        </header>
      )}
      {headerUser && (
        <header className={`${s.header} ${s.headerUser}`}>
          <div className={s.innerContainerMini}>
            <Link to="/">on main</Link>
            <Logo />
            <h1>
              PGM
            </h1>
          </div>

        </header>
      )}
    </>
  );
}

export default Header;
