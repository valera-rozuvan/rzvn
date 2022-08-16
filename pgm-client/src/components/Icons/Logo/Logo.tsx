import React from 'react';

function Logo({ superClick }: { superClick: (event: React.MouseEvent<HTMLObjectElement>) => void }) {
  return (
    <object
      role="presentation"
      onClick={superClick}
      onKeyUp={() => { console.log('clicked on logo'); }}
      data="logo.svg"
      type="image/svg+xml"
      width="100"
    >
      <img alt="pg-messaging logo" src="logo.svg" />
    </object>
  );
}
export default Logo;
