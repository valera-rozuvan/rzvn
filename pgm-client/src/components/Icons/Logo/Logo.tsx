import React from 'react';

import s from './logo.module.scss';

function Logo({ superClick }: { superClick: (event: React.MouseEvent<HTMLDivElement>) => void }) {
  return (
    <div
      className={s.logoContainer}
      role="button"
      tabIndex={0}
      onClick={superClick}
      onKeyUp={() => { console.log('clicked on logo'); }}
    >
      <div
        className={s.logoScreen}
        role="button"
        tabIndex={0}
        onClick={superClick}
        onKeyUp={() => { console.log('clicked on logo'); }}
      >
        &nbsp;
      </div>
      <object
        className={s.logo}
        data="logo.svg"
        type="image/svg+xml"
        width="100"
      >
        <img
          alt="pg-messaging logo"
          src="logo.svg"
        />
      </object>
    </div>
  );
}
export default Logo;
