import React from 'react';

import Support from '../Support';
import FooterUser from '../FooterUser';

function Profile() {
  return (
    <>
      <p>Welcome, user!</p>
      <p>public key</p>
      <p>0x894tr789utyt8ut8t2...</p>
      <p>nickname</p>
      <input placeholder="user name" />
      <button type="submit">update</button>
      <button type="submit">delete all data</button>
      <Support />
      <FooterUser />
    </>
  );
}

export default Profile;
