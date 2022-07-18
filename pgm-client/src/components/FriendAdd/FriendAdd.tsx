import React from 'react';

import FooterUser from '../FooterUser';

function Friends() {
  return (
    <>
      <section>
        <h2>add friend</h2>
        <p>public key</p>
        <input />
        <p>notes</p>
        <input />
        <button type="submit">add</button>
      </section>
      <FooterUser />
    </>
  );
}

export default Friends;
