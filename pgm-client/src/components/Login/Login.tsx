import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import * as OpenpgpTypeDefs from '../../openpgp.d';

import Header from '../Header';
import Footer from '../Footer';

type TOpenpgp = typeof OpenpgpTypeDefs;
declare global {
  interface Window { openpgp: TOpenpgp; }
}
const openpgp = (window as Window).openpgp as TOpenpgp;

function Login() {
  const [keyPair, setKeyPair] = useState('');

  async function generateNewKeyPair() {
    const { privateKey, publicKey } = await openpgp.generateKey({
      type: 'ecc',
      curve: 'curve25519',
      userIDs: [{ name: '', email: '' }],
      passphrase: '',
      format: 'armored',
    });

    setKeyPair(`${privateKey}\n${publicKey}`);
  }

  function keyPairTextAreaOnChange() {
    // Show "Copy" icon, if text area is not empty.
  }

  return (
    <>
      <Header />
      <section>
        <p>key pair</p>
        <textarea rows={10} value={keyPair} onChange={keyPairTextAreaOnChange} />
        <p>make sure to keep your keypair in a safe place!</p>
        <p>don’t have a key pair?</p>
        <button type="button" onClick={generateNewKeyPair}>generate keypair</button>
        <button type="button">login</button>
        <Link to="/profile">start messaging</Link>
      </section>
      <Footer />
    </>
  );
}

export default Login;
